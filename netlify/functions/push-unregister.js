// netlify/functions/push-unregister.js
//
// POST /api/push/unregister
// Body: { token? , malToken? , endpoint? }
//
// - token / malToken: standard auth pattern
// - endpoint: optional. If provided, removes ONLY that device's subscription.
//             If omitted, removes ALL of this user's subscriptions (master
//             opt-out). Settings UI "Disable on this device" uses endpoint;
//             "Disable everywhere" omits it.
//
// On success: { ok: true, remaining: <count> }

import {
  resolveUserId,
  loadPushRecord,
  savePushRecord,
  deletePushRecord,
  removeSubscription,
} from './_push-shared.js';

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

  const { token, malToken, endpoint } = body;
  const userId = await resolveUserId({ token, malToken });
  if (!userId) {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const record = await loadPushRecord(userId, context);
    removeSubscription(record, endpoint);
    if (record.subscriptions.length === 0) {
      // No devices left — drop the blob entirely so we don't keep an
      // empty record hanging around.
      await deletePushRecord(userId, context);
    } else {
      await savePushRecord(userId, record, context);
    }
    return Response.json({ ok: true, remaining: record.subscriptions.length });
  } catch (e) {
    return Response.json({ error: 'Storage error: ' + e.message }, { status: 500 });
  }
};
