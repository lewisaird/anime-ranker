// netlify/functions/tower-retry-poll.js
//
// Scheduled function — runs every hour (see netlify.toml).
// For each opted-in AniList user:
//   1. Fetch their CURRENT completed list (most-recent first, just first page).
//   2. Diff against the stored `notifiedCompletions` set.
//   3. If 1 new: push "You finished {title} — battle it in the Tower".
//      If 2+ new: push "You finished N anime — bring them to the Tower".
//   4. Append the new IDs to notifiedCompletions and bump lastPolledAt.
//   5. Save the record.
//
// Failure handling:
//   - AniList 401/403 means the user revoked Kessen's access. We mark the
//     token null + clear the snapshot so we stop polling them. They'll need
//     to re-enable Tower-retry to opt back in.
//   - AniList 429 (rate limit) — back off. The next scheduled run picks them up.
//   - Push delivery 410 Gone — the device subscription is dead; the
//     sendPushToUser helper already prunes it from the record.
//   - We yield to the event loop between users (300ms) to keep AniList
//     happy across users.

import {
  iteratePushRecords,
  savePushRecord,
  fetchCompletedAnime,
  callAniList,
  sendPushToUser,
} from './_push-shared.js';

// Per-user polite delay between AniList requests. AniList's published
// rate limit is 90 req/min PER authenticated user — we send 1 req/user/hr
// so individual users are nowhere near their cap. But ALL requests egress
// from Netlify's shared IP pool, so the aggregate rate could trigger
// anti-abuse heuristics if multiple polls run concurrently on the same IP.
// 800ms = 75 req/min aggregate ceiling, well under AniList's per-user cap
// with comfortable headroom. Scales to ~700 users per 10-min cron execution.
// Past that we'd want to shard the work across multiple scheduled functions
// or hash-distribute users across the hour rather than burst at :00.
const PER_USER_DELAY_MS = 800;
// Soft cap on how many "new completions" we'll list in one push session,
// per user. Prevents an enormous import event firing a giant push payload.
const MAX_BATCH = 100;

// Treat anything stored as a different format from a Set as fresh ground.
function asIdSet(ids) {
  return new Set((ids || []).map(n => Number(n)).filter(Number.isFinite));
}

function displayTitle(item) {
  return item.titleEn || item.titleRo || 'New anime';
}

function buildPushPayload(newOnes) {
  if (newOnes.length === 1) {
    const t = displayTitle(newOnes[0]);
    return {
      kind:  'tower-retry',
      title: 'Ready for the Tower',
      body:  `You finished ${t}. Take it to the Tower?`,
      // v1.0.219 — deep link now includes the specific anime's media ID,
      // so the client can start a Tower run with that exact anime as the
      // climber instead of just opening the Tower picker.
      url:   `/?tower=1&mediaId=${newOnes[0].id}`,
      tag:   `tower-retry-${newOnes[0].id}`,
      icon:  newOnes[0].cover || '/icon-192.png',
      data:  { mediaIds: [newOnes[0].id] },
    };
  }
  return {
    kind:  'tower-retry',
    title: 'Ready for the Tower',
    body:  `You finished ${newOnes.length} anime. Bring them to the Tower?`,
    // Batch push: no single anime to deep-link to, so the client falls back
    // to opening the Tower picker (where the user can scan their list).
    url:   '/?tower=1',
    tag:   `tower-retry-batch`,
    data:  { mediaIds: newOnes.map(n => n.id) },
  };
}

async function pollOne(userId, record, context) {
  // Sanity gates
  if (!record.categories?.towerRetry)   return { skipped: 'not-opted-in' };
  if (!record.subscriptions?.length)    return { skipped: 'no-subscriptions' };
  if (!record.aniListToken)             return { skipped: 'no-token' };
  if (!record.aniListUserId)            return { skipped: 'no-anilist-id' };

  // If we didn't manage the initial snapshot at register time (network blip,
  // etc.) take it now and skip any push this round — the user's existing
  // backlog isn't what they wanted notified.
  //
  // v1.0.218 — when filling in a delayed snapshot, use `optedInAt` as a
  // cutoff so we only capture completions that existed at the moment the
  // user opted in. Without this, the user could mark anime X complete after
  // opting in but before this delayed snapshot runs, and X would silently
  // enter `notifiedCompletions` as "already pushed". When `optedInAt` is
  // absent (very old records from before register-time stamping), we fall
  // back to the original behaviour — there's nothing better we can do.
  if (!record.initialSnapshotDone) {
    try {
      const cutoffSec = Number.isFinite(record.optedInAt) && record.optedInAt > 0
        ? Math.floor(record.optedInAt / 1000)
        : null;
      const completed = await fetchCompletedAnime(
        record.aniListToken,
        record.aniListUserId,
        20,
        cutoffSec !== null ? { beforeSeconds: cutoffSec } : {},
      );
      record.notifiedCompletions = completed.map(c => c.id);
      record.initialSnapshotDone = true;
      record.lastPolledAt        = Date.now();
      if (!record.optedInAt) record.optedInAt = Date.now();
      await savePushRecord(userId, record, context);
      return { snapshot: completed.length };
    } catch (e) {
      if (e.status === 401 || e.status === 403) {
        record.aniListToken = null;
        await savePushRecord(userId, record, context);
        return { revoked: true };
      }
      return { error: e.message };
    }
  }

  // Normal poll path — only need the first page (most-recent first). If the
  // user has completed more than 50 since last poll the rest will be picked
  // up on the next cycle, which is acceptable.
  let completed;
  try {
    completed = await fetchCompletedAnime(record.aniListToken, record.aniListUserId, 1);
  } catch (e) {
    if (e.status === 401 || e.status === 403) {
      record.aniListToken = null;
      record.aniListUserId = null;
      record.initialSnapshotDone = false;
      await savePushRecord(userId, record, context);
      return { revoked: true };
    }
    if (e.status === 429) {
      // Rate-limited — skip this user for this cycle, try again next hour.
      return { rateLimited: true };
    }
    return { error: e.message };
  }

  const knownIds = asIdSet(record.notifiedCompletions);
  const newOnes  = [];
  for (const item of completed) {
    if (!knownIds.has(item.id)) newOnes.push(item);
    if (newOnes.length >= MAX_BATCH) break;
  }

  if (newOnes.length === 0) {
    record.lastPolledAt = Date.now();
    await savePushRecord(userId, record, context);
    return { noNew: true };
  }

  // Send the push BEFORE persisting the new known-set, so a delivery failure
  // doesn't permanently mark these IDs as "already pushed" without the user
  // actually being notified.
  let pushResult = { sent: 0, failed: 0, removed: 0 };
  try {
    pushResult = await sendPushToUser(record, buildPushPayload(newOnes));
  } catch (e) {
    return { error: 'push: ' + e.message };
  }

  // Always mark as notified — even if push failed transiently — so we don't
  // re-fire the same notification on every cycle. The user opted in; the
  // push pipeline did its job; transient delivery failures are the push
  // provider's problem to retry.
  for (const item of newOnes) knownIds.add(item.id);
  record.notifiedCompletions = [...knownIds];
  record.lastPolledAt        = Date.now();
  await savePushRecord(userId, record, context);

  return { pushed: newOnes.length, ...pushResult };
}

// Soft capacity ceiling — based on Netlify scheduled function 10-minute soft
// limit (600s) divided by PER_USER_DELAY_MS. Past this we'd want to start
// sharding or hash-distributing. Used to flag headroom in the summary.
const SOFT_USER_LIMIT = Math.floor((10 * 60 * 1000) / PER_USER_DELAY_MS);

export default async (_request, context) => {
  const startTs = Date.now();
  const summary = {
    started:               new Date().toISOString(),
    users:                 0,    // total push records seen
    optedInTowerRetry:     0,    // users with categories.towerRetry on AND a valid token
    polled:                0,    // users we actually made an AniList request for
    pushed:                0,    // users who got a push this run
    devices:               0,    // total push deliveries (a user with phone+tablet = 2)
    newCompletions:        0,    // total media IDs newly notified about
    skipped:               0,    // had no subscription / not opted in
    revoked:               0,    // AniList returned 401/403; we cleared the token
    rateLimited:           0,    // AniList returned 429; will retry next cron
    snapshots:             0,    // late initial-snapshot runs (carryover from register-time blip)
    errors:                0,
  };

  try {
    for await (const { userId, record } of iteratePushRecords(context)) {
      summary.users++;
      const wasOptedIn = !!record.categories?.towerRetry && !!record.aniListToken;
      if (wasOptedIn) summary.optedInTowerRetry++;
      try {
        const r = await pollOne(userId, record, context);
        if (r.skipped)        summary.skipped++;
        if (r.revoked)        summary.revoked++;
        if (r.rateLimited)    summary.rateLimited++;
        if (r.snapshot)       summary.snapshots++;
        if (r.error)          summary.errors++;
        // pollOne actually called AniList iff we got a real outcome (not skipped/no-token)
        if (r.pushed != null || r.noNew || r.snapshot != null) summary.polled++;
        if (r.pushed) {
          summary.pushed++;
          summary.newCompletions += r.pushed;
          summary.devices        += r.sent || 0;
        }
      } catch (e) {
        summary.errors++;
        console.error('[tower-retry-poll] user', userId, 'failed:', e?.message);
      }
      // Only delay between AniList requests, not between blob reads. If we
      // skipped the user (no token, opted out), no point in waiting.
      await new Promise(r => setTimeout(r, PER_USER_DELAY_MS));
    }
  } catch (e) {
    console.error('[tower-retry-poll] fatal:', e?.message);
    summary.errors++;
  }

  summary.finished  = new Date().toISOString();
  summary.durationMs = Date.now() - startTs;
  // Capacity headroom — tells us when we're approaching Netlify's scheduled-
  // function runtime limit. Past 80% utilisation: start planning to shard the
  // work or hash-distribute users across the hour.
  summary.capacity = {
    optedIn:     summary.optedInTowerRetry,
    softLimit:   SOFT_USER_LIMIT,
    percentUsed: Math.round((summary.optedInTowerRetry / SOFT_USER_LIMIT) * 100),
    nearLimit:   summary.optedInTowerRetry >= Math.floor(SOFT_USER_LIMIT * 0.8),
  };
  // Log capacity at WARN level once we're past 80% so Netlify's function logs
  // surface it without requiring a dashboard.
  if (summary.capacity.nearLimit) {
    console.warn(
      `[tower-retry-poll] capacity ${summary.capacity.percentUsed}% — ` +
      `${summary.optedInTowerRetry}/${SOFT_USER_LIMIT} users opted in. ` +
      `Consider sharding the poll function.`
    );
  }
  return Response.json(summary);
};

// Netlify scheduled-function syntax. The cron string says "every 15 minutes
// (at :00, :15, :30, :45)". Bumped from hourly in v1.0.218 so Tower-retry
// pushes feel near-real-time — worst-case lag between marking an anime
// COMPLETED on AniList and getting the push drops from ~60 min to ~15 min.
// Per-user AniList load is unchanged (each user is still queried once per
// cycle); aggregate function invocation count is 4× hourly. At current
// scale that's negligible against Netlify's free-tier function quota and
// well under the 10-minute per-execution soft limit (see SOFT_USER_LIMIT
// above for the cap; with the 15-min schedule, soft limit applies per
// 15-min window rather than per hour, but still calculated the same way).
export const config = {
  schedule: '*/15 * * * *',
};
