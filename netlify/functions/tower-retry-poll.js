// netlify/functions/tower-retry-poll.js
//
// Scheduled function — runs every 15 minutes (config at the bottom of this file). v1.0.267 — each run reads every push
// record (10 at a time) and checks only the Tower retry users whose last check is about 3 hours old
// (CHECK_EVERY_HOURS), oldest first: at most MAX_CHECKS_PER_RUN, none started after TIME_BUDGET_MS (Netlify stops a
// scheduled function at 30 seconds). Push users without Tower retry cost one read and no wait.
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
//     to re-enable Tower-retry to opt back in. (v1.0.264 — Tower retry is
//     turned off too, with the completed list: turnOffTowerRetry.)
//   - v1.0.264 — the record is written back only if it is unchanged since it
//     was read (writePushRecordChange): a Delete all during the AniList call
//     is never undone.
//   - AniList 429 (rate limit) — v1.0.267 — nothing is written and the run
//     stops; that user and the rest go first next run. (A late first
//     snapshot was already stamped before its read, so that user waits.)
//   - v1.0.267 — any other error (AniList or the push send) still counts as a
//     check (lastPolledAt moves on), so the user is tried again about 3 hours
//     later.
//   - Push delivery 410 Gone — the device subscription is dead; the
//     sendPushToUser helper already prunes it from the record.
//     v1.0.268 — if that leaves no device, Tower retry is turned off too
//     (turnOffTowerRetry: token, completed list and poll time go with it), so
//     no AniList token is kept for a record nobody can be told about.
//
// v1.0.268 — each run also tidies up to TIDY_PER_RUN records the scan finds (after the checks, within the time
// budget): it removes the browser identifier string (ua) older registrations stored on each device, and turns Tower
// retry off where no device is left but a token is kept or Tower retry is on. Each write is conditional on the
// record's etag (writePushRecordChange), so a deleted record stays deleted and a device added meanwhile is kept.
// The Tower retry push lives one day (TOWER_PUSH_TTL_S): a phone offline longer doesn't get a stale prompt.

// v1.0.264 — conditional write-backs (writePushRecordChange) replace savePushRecord
// v1.0.267 — + loadPushRecordVersioned: each due user is read again just before its check
import {
  iteratePushRecords,
  loadPushRecordVersioned,
  writePushRecordChange,
  turnOffTowerRetry,
  dropSubscriptions,
  fetchCompletedAnime,
  callAniList,
  sendPushToUser,
} from './_push-shared.js';

const MINUTE_MS = 60 * 1000;
// v1.0.268 — how long a push service keeps a Tower retry push for a device that is offline (decision 25), in seconds
const TOWER_PUSH_TTL_S = 24 * 60 * 60;
// v1.0.268 — at most this many records tidied a run (see the header)
const TIDY_PER_RUN = 10;
// v1.0.267 — each Tower retry user is checked about every 3 hours (Lewis, 12 Oct 2026; was every run, every 15 minutes).
// privacy.html and the app's Tower retry notice (app.js _pushConfirmTowerRetry) say the same; tests/privacy-links checks it.
const CHECK_EVERY_HOURS = 3;
// Due 10 minutes early: a check is stamped a few seconds into a run, so the run 3 hours later finds it due, not the one after.
const DUE_AFTER_MS = CHECK_EVERY_HOURS * 60 * MINUTE_MS - 10 * MINUTE_MS;
// At most 8 AniList requests a run, so at most 8 in any minute (AniList allows 30 a minute at the moment, lowered from 90,
// counted for Netlify's shared addresses). 8 a run x 12 runs = about 96 users every 3 hours.
const MAX_CHECKS_PER_RUN = 8;
// Netlify stops a scheduled function after 30 seconds. No check starts later than 15 s into the run: its AniList request
// can take 8 s (callAniList's timeout), the push 3 s (sendPushToUser) and the reads and save about 1 s, so the run ends
// by about 27 s. A late first snapshot (records from before 1.0.218 only) can take longer; it is stamped before its
// read (pollOne), so if Netlify stops the run, that user waits about 3 hours like anyone checked. Users not reached go
// first next run (oldest first).
const TIME_BUDGET_MS = 15000;
// v1.0.267 — who the poll checks (pollOne's first lines skip anyone else): Tower retry on, the AniList token and id it
// reads with, and a device to tell. Everyone else costs one record read and no wait.
const canCheck = (r) => !!r.categories?.towerRetry && !!r.subscriptions?.length && !!r.aniListToken && !!r.aniListUserId;
// v1.0.267 — due when the last check (or the opt-in, which push-register stamps) is at least DUE_AFTER_MS old
const isDue = (r, at) => (Number(r.lastPolledAt) || 0) <= at - DUE_AFTER_MS;
// v1.0.268 — a record to tidy: a device still carries the old browser identifier string, or no device is left but
// an AniList token is kept or Tower retry is on
const needsTidy = (r) => (r.subscriptions || []).some(s => s && typeof s === 'object' && 'ua' in s)
  || (!r.subscriptions?.length && (!!r.aniListToken || !!r.categories?.towerRetry));
// v1.0.268 — the tidy-up itself, applied by writePushRecordChange to the newest copy of the record
const tidyRecord = (r) => {
  (r.subscriptions || []).forEach(s => { if (s && typeof s === 'object') delete s.ua; });
  if (!r.subscriptions?.length) turnOffTowerRetry(r);
};
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

async function pollOne(userId, record, context, etag) {
  // Sanity gates
  if (!record.categories?.towerRetry)   return { skipped: 'not-opted-in' };
  if (!record.subscriptions?.length)    return { skipped: 'no-subscriptions' };
  if (!record.aniListToken)             return { skipped: 'no-token' };
  if (!record.aniListUserId)            return { skipped: 'no-anilist-id' };

  // v1.0.264 — every write below comes after an AniList call, and a whole-record write put back a record that Delete
  // all removed meanwhile, with its token. Each is now conditional on the record read before the call (etag), and is
  // skipped ({ stale }) if it was deleted or no longer holds this token with Tower retry on (writePushRecordChange).
  const token = record.aniListToken;
  const read = { record, etag, exists: true };
  const sameOptIn = (r) => r.aniListToken === token && !!r.categories?.towerRetry;
  const save = async (change, stillApplies = sameOptIn) =>
    writePushRecordChange(userId, context, read, change, stillApplies);
  // v1.0.264 — AniList rejected the token: Tower retry is turned off and its completed list, opt-in time and poll time
  // go with the token (as push-register does on an untick), so no completed list is kept without a token.
  const revoke = async () =>
    (await save(turnOffTowerRetry, (r) => r.aniListToken === token)) ? { revoked: true } : { stale: true };
  // v1.0.267 — a failed check (other than 401/403/429) still counts as a check: lastPolledAt moves on, so the user is
  // tried again in about 3 hours. Oldest first would otherwise put them at the front of every run.
  const failed = async (message) => {
    const at = Date.now();
    return (await save((r) => { r.lastPolledAt = at; })) ? { error: message } : { error: message, stale: true };
  };

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
    // v1.0.267 — stamped before the read: it can take up to 20 AniList pages, longer than Netlify's 30 s, and a run
    // stopped mid-read wrote nothing, so this user stayed the oldest and stopped every run after it. Now, like anyone
    // checked, they are not due again for about 3 hours (after a 429 here too).
    const stillSnapshotting = (r) => sameOptIn(r) && !r.initialSnapshotDone;
    const stampedAt = Date.now();
    if (!(await save((r) => { r.lastPolledAt = stampedAt; }, stillSnapshotting))) return { stale: true };
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
      const now = Date.now();
      // v1.0.264 — conditional (see above); also skipped if push-register took the snapshot meanwhile. Merged with
      // the stored ids, so ones push-mark-seen added during the AniList call are kept
      const written = await save((r) => {
        r.notifiedCompletions = [...new Set([...asIdSet(r.notifiedCompletions), ...completed.map(c => c.id)])];
        r.initialSnapshotDone = true;
        r.lastPolledAt        = now;
        if (!r.optedInAt) r.optedInAt = now;
      }, stillSnapshotting);
      return written ? { snapshot: completed.length } : { stale: true };
    } catch (e) {
      if (e.status === 401 || e.status === 403) return revoke(); // v1.0.264 — was: only the token dropped
      if (e.status === 429) return { rateLimited: true }; // v1.0.267 — the run stops (this user was stamped above)
      return failed(e.message); // v1.0.267 — was: { error } with nothing written, so the user was first in every run
    }
  }

  // Normal check: only the first page, the 50 most recently changed completed entries. If more than 50 completed
  // entries change between two checks (about 3 hours), for example finished or re-scored (Kessen's score sync re-scores
  // many at once), older new completions on later pages are missed. (v1.0.267 — was: "picked up on the next cycle")
  let completed;
  try {
    completed = await fetchCompletedAnime(record.aniListToken, record.aniListUserId, 1);
  } catch (e) {
    // v1.0.264 — was: token, user id and snapshot flag dropped, but the completed list and Tower retry kept
    if (e.status === 401 || e.status === 403) return revoke();
    if (e.status === 429) {
      // v1.0.267 — nothing written; the run stops and this user goes first next run
      return { rateLimited: true };
    }
    return failed(e.message); // v1.0.267 — lastPolledAt moves on (see failed)
  }

  const knownIds = asIdSet(record.notifiedCompletions);
  const newOnes  = [];
  for (const item of completed) {
    if (!knownIds.has(item.id)) newOnes.push(item);
    if (newOnes.length >= MAX_BATCH) break;
  }

  if (newOnes.length === 0) {
    const now = Date.now();
    return (await save((r) => { r.lastPolledAt = now; })) ? { noNew: true } : { stale: true }; // v1.0.264 — conditional
  }

  // Send the push BEFORE persisting the new known-set, so a delivery failure
  // doesn't permanently mark these IDs as "already pushed" without the user
  // actually being notified.
  let pushResult = { sent: 0, failed: 0, removed: 0 };
  try {
    pushResult = await sendPushToUser(record, buildPushPayload(newOnes), { TTL: TOWER_PUSH_TTL_S }); // v1.0.268 — + TTL
  } catch (e) {
    return failed('push: ' + e.message); // v1.0.267 — lastPolledAt moves on (see failed); nothing else is saved
  }

  // Always mark as notified — even if push failed transiently — so we don't
  // re-fire the same notification on every cycle. The user opted in; the
  // push pipeline did its job; transient delivery failures are the push
  // provider's problem to retry.
  // v1.0.264 — conditional (see above), merged into the stored list so ids marked seen meanwhile are kept;
  // `gone` (dead endpoints) stays out of the result, which is logged
  const { gone, ...pushCounts } = pushResult;
  const now = Date.now();
  let towerRetryOff = false; // v1.0.268 — set by the copy that is written
  const written = await save((r) => {
    dropSubscriptions(r, gone);
    const known = asIdSet(r.notifiedCompletions);
    for (const item of newOnes) known.add(item.id);
    r.notifiedCompletions = [...known];
    r.lastPolledAt        = now;
    // v1.0.268 — no device left (every one answered 410/404): Tower retry off, last, so the completed list and poll
    // time go with the token (decision 15). A device registered meanwhile is in the newer copy, so it stays on.
    towerRetryOff = !r.subscriptions?.length;
    if (towerRetryOff) turnOffTowerRetry(r);
  });

  // v1.0.268 — + towerRetryOff, for the per-user log line
  return { pushed: newOnes.length, ...pushCounts, ...(written ? (towerRetryOff ? { towerRetryOff: true } : {}) : { stale: true }) };
}

// v1.0.267 — was: one record at a time, a 0.8 s wait after every record (Tower retry or not), every Tower retry user
// checked every run, and a 10-minute limit assumed (Netlify allows 30 seconds).
export default async (_request, context) => {
  const startedAt = Date.now();
  const summary = {
    users: 0,          // push records read
    towerUsers: 0,     // Tower retry on and checkable (canCheck)
    due: 0,            // last checked about 3 hours ago or more
    polled: 0,         // AniList checks made this run
    backlog: 0,        // due but not reached this run; they go first next run
    stoppedBy: 'done', // or 'cap', 'time', 'rate-limited'
    oldestDueMin: 0,   // minutes since the longest-waiting due user was last checked
    pushed: 0, devices: 0, newCompletions: 0,
    rateLimited: 0, revoked: 0, snapshots: 0, stale: 0, errors: 0,
    tidied: 0,         // v1.0.268 — records tidied (old ua removed, or Tower retry off with no device left)
    scanMs: 0, durationMs: 0,
  };
  // 1. Read every push record and note the Tower retry users who are due. Nothing is written here.
  const due = [];
  const tidy = []; // v1.0.268 — up to TIDY_PER_RUN records to tidy after the checks, each with the etag it was read with
  try {
    for await (const { userId, record, etag } of iteratePushRecords(context)) {
      summary.users++;
      if (tidy.length < TIDY_PER_RUN && needsTidy(record)) tidy.push({ userId, record, etag }); // v1.0.268
      if (!canCheck(record)) continue;
      summary.towerUsers++;
      if (isDue(record, startedAt)) due.push({ userId, lastPolledAt: Number(record.lastPolledAt) || 0 });
    }
  } catch (e) {
    // the users found so far are still checked: each is read again just before its check
    summary.errors++;
    console.error('[tower-retry-poll] reading push records stopped after', summary.users, ':', e?.message);
  }
  summary.scanMs = Date.now() - startedAt;
  due.sort((a, b) => a.lastPolledAt - b.lastPolledAt); // oldest first (never checked = 0 = first)
  summary.due = due.length;
  // v1.0.267 — the longest wait among users checked before (a never-checked user, 0, has none to measure and must not
  // hide the others' wait)
  const oldestStamped = due.find((d) => d.lastPolledAt);
  if (oldestStamped) summary.oldestDueMin = Math.round((startedAt - oldestStamped.lastPolledAt) / MINUTE_MS);
  // 2. Check them, oldest first, until the cap or the time limit.
  let next = 0;
  for (; next < due.length; next++) {
    if (summary.polled >= MAX_CHECKS_PER_RUN) { summary.stoppedBy = 'cap'; break; }
    if (Date.now() - startedAt > TIME_BUDGET_MS) { summary.stoppedBy = 'time'; break; }
    const { userId } = due[next];
    try {
      // read again just before the check: the token stored now, and its etag for the write-back (v1.0.264)
      const read = await loadPushRecordVersioned(userId, context);
      if (!read.exists || !canCheck(read.record) || !isDue(read.record, startedAt)) { summary.stale++; continue; }
      summary.polled++;
      const r = await pollOne(userId, read.record, context, read.etag);
      if (r.rateLimited) {
        summary.rateLimited++;
        summary.stoppedBy = 'rate-limited';
        console.warn('[tower-retry-poll] AniList answered 429 for user', userId, '- run stopped; they go first next run');
        break; // skips next++, so this user counts as backlog
      }
      // counts and the per-user log line as today (pushed / error / revoked / snapshot / stale)
      if (r.revoked)        summary.revoked++;
      if (r.snapshot)       summary.snapshots++;
      if (r.error)          summary.errors++;
      if (r.stale)          summary.stale++; // v1.0.264
      if (r.pushed) {
        summary.pushed++;
        summary.newCompletions += r.pushed;
        summary.devices        += r.sent || 0;
      }
      // v1.0.224 — per-user log for any non-boring outcome (push sent,
      // error, revoked token, initial snapshot). "noNew" is the healthy
      // quiet path and doesn't need per-user log spam.
      if (r.pushed || r.error || r.revoked || r.snapshot || r.stale) { // v1.0.264 — + stale
        console.log('[tower-retry-poll] user', userId, '->', JSON.stringify(r));
      }
    } catch (e) {
      summary.errors++;
      console.error('[tower-retry-poll] user', userId, 'failed:', e?.message);
    }
  }
  summary.backlog = due.length - next;
  // 3. v1.0.268 — tidy-up, within the same time budget. Applied to the newest copy (a device added since the scan is
  // kept, and keeps Tower retry on), skipped if the record was deleted or no longer needs it.
  for (const { userId, record, etag } of tidy) {
    if (Date.now() - startedAt >= TIME_BUDGET_MS) break;
    try {
      if (await writePushRecordChange(userId, context, { record, etag, exists: true }, tidyRecord, needsTidy)) summary.tidied++;
    } catch (e) {
      summary.errors++;
      console.error('[tower-retry-poll] tidying user', userId, 'failed:', e?.message);
    }
  }
  summary.durationMs = Date.now() - startedAt;
  // v1.0.224 — the summary goes to Netlify's function log (console output is
  // shown there; the Response body is not), so each run documents itself.
  console.log('[tower-retry-poll] summary:', JSON.stringify(summary));
  // v1.0.267 — these replace the capacity block (a share of a 10-minute limit Netlify doesn't give scheduled functions)
  if (summary.oldestDueMin > 210) console.warn(`[tower-retry-poll] the longest-waiting Tower retry user was last checked ${summary.oldestDueMin} min ago (over 3 h 30 min). The app and privacy.html say about every 3 hours: more than about 96 Tower retry users, or AniList refusing requests.`);
  if (summary.users > 200) console.warn(`[tower-retry-poll] ${summary.users} push records are read every run (over 200): reading them all every 15 minutes is getting costly. Next step: run every 30 minutes, or read a twelfth of the records per run.`);
  return Response.json(summary);
};

// Every 15 minutes (UTC; scheduled functions run only on the published
// production deploy). v1.0.267 — a run with nobody due only reads the push
// records (about half a second). Each Tower retry user is checked about every
// CHECK_EVERY_HOURS hours, at most MAX_CHECKS_PER_RUN a run (about 96 users
// every 3 hours). Netlify allows a scheduled function 30 seconds
// (TIME_BUDGET_MS). The summary's oldestDueMin and backlog show when that is
// not enough.
export const config = {
  schedule: '*/15 * * * *',
};
