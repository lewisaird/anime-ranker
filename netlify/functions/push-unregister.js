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

// v1.0.264 — the versioned read and conditional write replace loadPushRecord / savePushRecord (see below)
import {
  resolveUserId,
  loadPushRecordVersioned,
  writePushRecordChange,
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
    // v1.0.264 — this read the record and wrote the whole of it back, so a Logout on one device undid a Delete all on
    // another (the record and its AniList token came back). Now only this removal is written, into the copy still
    // stored (writePushRecordChange, by etag): a record deleted meanwhile stays deleted, a device added meanwhile stays.
    const read = await loadPushRecordVersioned(userId, context);
    let remaining = 0;
    const written = read.exists && await writePushRecordChange(userId, context, read, (record) => {
      remaining = removeSubscription(record, endpoint).subscriptions.length;
    });
    if (!written) {
      // v1.0.264 — not written: the record is gone (nothing to remove), or it kept changing under us (say so)
      if (read.exists && (await loadPushRecordVersioned(userId, context)).exists) {
        return Response.json({ error: 'Storage error: record busy, try again' }, { status: 500 });
      }
      return Response.json({ ok: true, remaining: 0 });
    }
    if (remaining === 0) {
      // No devices left — drop the blob entirely so we don't keep an
      // empty record hanging around.
      // v1.0.264 — only while the stored copy is still empty: a device registered since the write above is kept
      const now = await loadPushRecordVersioned(userId, context);
      remaining = now.exists ? now.record.subscriptions.length : 0;
      if (now.exists && remaining === 0) await deletePushRecord(userId, context);
    }
    return Response.json({ ok: true, remaining });
  } catch (e) {
    return Response.json({ error: 'Storage error: ' + e.message }, { status: 500 });
  }
};
