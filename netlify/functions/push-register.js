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

// v1.0.177 — Take an immediate snapshot of the user's COMPLETED list when
// they first enable Tower-retry. Stores all IDs as "already notified" so
// the scheduled poll only fires for newly-completed shows from this point
// forward. Best-effort: a failure here doesn't fail the register call,
// it just leaves initialSnapshotDone=false and the scheduled poll's
// first-run code path takes over.
async function takeInitialSnapshot(record, token) {
  try {
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
  } catch (e) {
    // Don't block registration — leave a flag so the scheduled poll
    // takes the slow path on its first run.
    record.initialSnapshotDone = false;
    record.aniListToken        = token; // still store it so polling can try
    record.notifiedCompletions = [];
    record.lastPolledAt        = 0;
  }
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
    if (isAniListUser) {
      if (wantsTowerRetry && !prevTowerRetry) {
        // OFF → ON: take initial snapshot, store token.
        await takeInitialSnapshot(record, token);
      } else if (!wantsTowerRetry && record.aniListToken) {
        // ON → OFF: clear the stored token + snapshot.
        record.aniListToken        = null;
        record.aniListUserId       = null;
        record.notifiedCompletions = [];
        record.initialSnapshotDone = false;
        record.lastPolledAt        = 0;
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
      towerRetryReady: isAniListUser && wantsTowerRetry && !!record.initialSnapshotDone,
    });
  } catch (e) {
    return Response.json({ error: 'Storage error: ' + e.message }, { status: 500 });
  }
};
