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

import {
  resolveUserId,
  loadPushRecord,
  savePushRecord,
  upsertSubscription,
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
    record.categories = sanitizeCategories(categories, record.categories);
    await savePushRecord(userId, record, context);
    return Response.json({
      ok: true,
      userId,
      deviceCount: record.subscriptions.length,
      categories: record.categories,
    });
  } catch (e) {
    return Response.json({ error: 'Storage error: ' + e.message }, { status: 500 });
  }
};
