// netlify/functions/push-mark-seen.js
//
// POST /api/push-mark-seen
// Body: { token? | malToken?, mediaIds: [123, 456, ...] }
//
// Tells the server "the client already showed an in-app prompt for these
// media IDs — don't fire a phone push for them on the next scheduled poll".
//
// Lets the in-app "you just finished X" bell prompt and the hourly Tower
// retry push coexist without doubling up. The client calls this whenever
// _queueFinishPrompt fires, so by the time the cron poll runs the server
// already considers those IDs "notified".
//
// Returns: { ok: true, added: <count> }
//
// Quiet no-op if the user doesn't have push enabled or has Tower-retry
// turned off — we still accept the call so the client doesn't need to
// check state before sending. No data is created for un-registered users.

import {
  resolveUserId,
  loadPushRecord,
  savePushRecord,
} from './_push-shared.js';

const MAX_IDS_PER_CALL = 100;

export default async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body;
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const { token, malToken, mediaIds } = body;
  if (!Array.isArray(mediaIds) || mediaIds.length === 0) {
    return Response.json({ error: 'mediaIds required (non-empty array)' }, { status: 400 });
  }

  const userId = await resolveUserId({ token, malToken });
  if (!userId) {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const record = await loadPushRecord(userId, context);
    // If the user has no subscription or Tower-retry off, silently accept and
    // do nothing — caller doesn't need to know our internal state.
    if (!record.subscriptions?.length || !record.categories?.towerRetry) {
      return Response.json({ ok: true, added: 0, skipped: 'not-tower-opted-in' });
    }

    const known = new Set((record.notifiedCompletions || []).map(Number));
    let added = 0;
    for (const raw of mediaIds.slice(0, MAX_IDS_PER_CALL)) {
      const id = Number(raw);
      if (!Number.isFinite(id)) continue;
      if (!known.has(id)) { known.add(id); added++; }
    }
    record.notifiedCompletions = [...known];
    await savePushRecord(userId, record, context);
    return Response.json({ ok: true, added });
  } catch (e) {
    return Response.json({ error: 'Storage error: ' + e.message }, { status: 500 });
  }
};
