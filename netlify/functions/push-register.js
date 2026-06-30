// netlify/functions/push-register.js
//
// POST /api/push/register
// Body: { token? , malToken? , subscription, categories?, ua? }
//
// - token / malToken: standard auth pattern — server verifies, derives userId
// - subscription: the PushSubscription.toJSON() output from the client
//                 { endpoint, expirationTime, keys: { p256dh, auth } }
// - categories: optional partial category prefs to merge
// - ua: User-Agent string for debugging (which device is this?)
//
// On success: { ok: true, userId, deviceCount, categories }
//
// Multi-device: each (userId, endpoint) pair is a separate row in the
// subscriptions array. Same userId from a different device = new entry.
// Same userId + same endpoint = update lastSeen / keys.
//
// v1.0.177 — Phase 2C: also handles Tower-retry token storage. When
// categories.towerRetry transitions OFF→ON we save the AniList token and
// take an immediate snapshot of the user's current COMPLETED list (marks
// them all as "already notified" so the user doesn't get a spam push for
// their existing backlog). When towerRetry transitions ON→OFF we delete
// the stored token + completion snapshot. MAL users skip the Tower-retry
// flow entirely (Phase 2C is AniList-only).

import {
  resolveUserId,
  loadPushRecord,
  savePushRecord,
  upsertSubscription,
  fetchCompletedAnime,
} from './_push-shared.js';

const SAFE_CATEGORIES = new Set(['towerRetry', 'watchTogether', 'liveChallenge']);

function sanitizeCategories(input, current) {
  if (!input || typeof input !== 'object') return current;
  const out = { ...current };
  for (const [k, v] of Object.entries(input)) {
    if (SAFE_CATEGORIES.has(k)) out[k] = Boolean(v);
  }
  return out;
}

function isValidSubscription(sub) {
  return sub
      && typeof sub.endpoint === 'string'
      && sub.endpoint.startsWith('https://')
      && sub.keys
      && typeof sub.keys.p256dh === 'string'
      && typeof sub.keys.auth === 'string';
}

// Take an immediate snapshot of the user's COMPLETED list when they first
// enable Tower-retry. Stores all IDs as "already notified" so the scheduled
// poll only fires for newly-completed shows from this point forward.
//
// v1.0.218 — was previously "best-effort with silent swallow", which created
// a nasty race condition: if the snapshot fetch failed at register time
// (transient AniList blip, network hiccup, etc.), the record was saved with
// `initialSnapshotDone = false` AND `aniListToken = token`. The hourly poll
// then ran its own snapshot path — but by then the user may have already
// marked one or more anime COMPLETED on AniList in the gap between opting
// in and the next poll, and those entries silently entered the snapshot
// as "already notified" without ever firing a push. The user thinks
// Tower-retry is on; in reality their first new completion never pushes.
//
// Now: throw on any failure. The caller catches it, forces towerRetry off
// in the saved record, and reports the failure back to the client so the
// UI can surface it. Defence in depth: also stamp `optedInAt` so any record
// that somehow ends up with initialSnapshotDone=false (e.g. older saves
// from before this fix) gets the time-filtered snapshot path in the poll
// rather than capturing post-opt-in completions.
async function takeInitialSnapshot(record, token) {
  // We need the numeric AniList user id for future polling.
  const viewerData = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query: '{ Viewer { id } }' }),
  }).then(r => r.json());
  const userId = viewerData?.data?.Viewer?.id;
  if (!userId) throw new Error('Could not resolve AniList user id');

  const completed = await fetchCompletedAnime(token, userId);
  record.aniListToken        = token;
  record.aniListUserId       = userId;
  record.notifiedCompletions = completed.map(c => c.id);
  record.initialSnapshotDone = true;
  record.lastPolledAt        = Date.now();
  record.optedInAt           = Date.now();
  return record;
}

export default async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { token, malToken, subscription, categories, ua } = body;
  if (!isValidSubscription(subscription)) {
    return Response.json({ error: 'Invalid subscription' }, { status: 400 });
  }

  const userId = await resolveUserId({ token, malToken });
  if (!userId) {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const record = await loadPushRecord(userId, context);
    upsertSubscription(record, subscription, ua);
    const prevTowerRetry = !!record.categories?.towerRetry && !!record.aniListToken;
    record.categories = sanitizeCategories(categories, record.categories);
    const wantsTowerRetry = !!record.categories.towerRetry;

    // Phase 2C state transitions — only meaningful for AniList users.
    const isAniListUser = userId.startsWith('anilist_') && !!token;
    let towerRetryError = null;
    if (isAniListUser) {
      if (wantsTowerRetry && !prevTowerRetry) {
        // OFF → ON: take initial snapshot, store token.
        // v1.0.218 — snapshot now throws on failure. We catch here so the
        // rest of the registration (subscription, WT/LC categories) still
        // succeeds. Tower-retry gets forced off in the saved record and we
        // report the failure to the client. The user can retry the toggle
        // once the underlying issue (usually AniList transient) clears.
        try {
          await takeInitialSnapshot(record, token);
        } catch (e) {
          record.categories.towerRetry = false;
          record.aniListToken          = null;
          record.aniListUserId         = null;
          record.notifiedCompletions   = [];
          record.initialSnapshotDone   = false;
          record.lastPolledAt          = 0;
          record.optedInAt             = 0;
          towerRetryError = e?.message || 'Snapshot failed';
        }
      } else if (!wantsTowerRetry && record.aniListToken) {
        // ON → OFF: clear the stored token + snapshot.
        record.aniListToken        = null;
        record.aniListUserId       = null;
        record.notifiedCompletions = [];
        record.initialSnapshotDone = false;
        record.lastPolledAt        = 0;
        record.optedInAt           = 0;
      } else if (wantsTowerRetry && prevTowerRetry) {
        // Already on — refresh the stored token in case the user re-signed in.
        record.aniListToken = token;
      }
    } else if (wantsTowerRetry) {
      // MAL users can't get Tower-retry pushes in Phase 2C — silently force off.
      record.categories.towerRetry = false;
    }

    await savePushRecord(userId, record, context);
    return Response.json({
      ok: true,
      userId,
      deviceCount: record.subscriptions.length,
      categories: record.categories,
      towerRetryReady: isAniListUser && !!record.categories.towerRetry && !!record.initialSnapshotDone,
      ...(towerRetryError ? { towerRetryError } : {}),
    });
  } catch (e) {
    return Response.json({ error: 'Storage error: ' + e.message }, { status: 500 });
  }
};
