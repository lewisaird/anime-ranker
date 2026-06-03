// netlify/functions/_push-shared.js
//
// Internal helpers shared by the push notification endpoints. Underscore
// prefix prevents Netlify from auto-publishing this as a callable function —
// it's imported by push-register / push-unregister / future invite endpoints.
//
// Storage schema (blob store "kessen-push"):
//   key:   `subs_${userId}`      (userId is "anilist_<id>" or "mal_<id>")
//   value: {
//     subscriptions: [
//       { endpoint, keys: { p256dh, auth }, ua, createdAt, lastSeen }
//     ],
//     categories: { towerRetry, watchTogether, liveChallenge },
//     schemaVersion: 1,
//   }
//
// Multi-device support: one user can register from multiple devices (phone +
// tablet, Chrome on Android + Edge on desktop). Each device's PushSubscription
// has a unique endpoint, and we de-dupe + merge on register.

import { getStore } from '@netlify/blobs';
import { request as httpsRequest } from 'https';

export const PUSH_BLOB_STORE = 'kessen-push';

// Verify an AniList OAuth token by calling Viewer { id }. Returns the
// canonical user id "anilist_<numeric>", or null on failure.
async function verifyAniListToken(token) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Accept':        'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query: '{ Viewer { id } }' }),
      signal: controller.signal,
    });
    const data = await res.json();
    const id = data?.data?.Viewer?.id;
    return id ? `anilist_${id}` : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Verify a MAL token by calling /v2/users/@me. Uses Node https module
// because fetch() against MAL often hangs on Netlify infrastructure.
// Returns "mal_<id>" or null.
function verifyMALToken(token) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.myanimelist.net',
      path: '/v2/users/@me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    };
    const req = httpsRequest(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(res.statusCode === 200 && json?.id ? `mal_${json.id}` : null);
        } catch { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

// Verify whichever token the request provided. Returns the canonical userId
// ("anilist_…" or "mal_…") or null. Never trusts a client-asserted id.
export async function resolveUserId({ token, malToken }) {
  if (token)    return await verifyAniListToken(token);
  if (malToken) return await verifyMALToken(malToken);
  return null;
}

// Load the push blob for a user. Returns a fully-formed object with default
// shape, so callers don't have to handle "subscription not registered yet".
export async function loadPushRecord(userId, context) {
  const store = getStore({ name: PUSH_BLOB_STORE, context });
  const raw = await store.get(`subs_${userId}`, { type: 'json' });
  if (!raw || typeof raw !== 'object') {
    return {
      subscriptions: [],
      categories: { towerRetry: true, watchTogether: true, liveChallenge: true },
      schemaVersion: 1,
    };
  }
  return raw;
}

export async function savePushRecord(userId, record, context) {
  const store = getStore({ name: PUSH_BLOB_STORE, context });
  await store.setJSON(`subs_${userId}`, record);
}

export async function deletePushRecord(userId, context) {
  const store = getStore({ name: PUSH_BLOB_STORE, context });
  await store.delete(`subs_${userId}`);
}

// Merge a new device subscription into the array, deduping by endpoint
// (the endpoint URL is the unique identifier per device per browser).
export function upsertSubscription(record, subscription, ua) {
  const now = Date.now();
  const endpoint = subscription.endpoint;
  const existing = record.subscriptions.find(s => s.endpoint === endpoint);
  if (existing) {
    existing.lastSeen = now;
    existing.keys = subscription.keys;
    existing.ua = ua || existing.ua;
  } else {
    record.subscriptions.push({
      endpoint,
      keys: subscription.keys,
      ua: ua || null,
      createdAt: now,
      lastSeen: now,
    });
  }
  return record;
}

// Remove one device's subscription by endpoint. If endpoint omitted, removes
// all subscriptions for this user (full opt-out).
export function removeSubscription(record, endpoint) {
  if (!endpoint) {
    record.subscriptions = [];
  } else {
    record.subscriptions = record.subscriptions.filter(s => s.endpoint !== endpoint);
  }
  return record;
}

// v1.0.173 — Resolve an AniList username (e.g. "lewis-aird") to the
// canonical userId ("anilist_<numeric>"). Used by /push-send-invite to find
// the invitee's subscription record from the username the inviter typed.
// Returns null if the user doesn't exist on AniList or the request fails.
export async function resolveAniListUsername(name) {
  if (!name || typeof name !== 'string') return null;
  const cleaned = name.trim().slice(0, 50);
  if (!cleaned) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        query: 'query($n:String){User(name:$n){id name}}',
        variables: { n: cleaned },
      }),
      signal: controller.signal,
    });
    const data = await res.json();
    const id = data?.data?.User?.id;
    return id ? `anilist_${id}` : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// v1.0.173 — Send a VAPID-signed push message to every device subscription
// in the user's record. Returns { sent, failed, removed }: `removed` is
// the number of expired/invalid subscriptions cleaned out of the record.
// Caller is responsible for re-saving the record if removed > 0.
export async function sendPushToUser(record, payload) {
  if (!record || !record.subscriptions?.length) {
    return { sent: 0, failed: 0, removed: 0 };
  }
  const { default: webpush } = await import('web-push');
  const publicKey  = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject    = process.env.VAPID_SUBJECT;
  if (!publicKey || !privateKey || !subject) {
    throw new Error('VAPID env vars missing — set VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT');
  }
  webpush.setVapidDetails(subject, publicKey, privateKey);

  const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const results = await Promise.allSettled(
    record.subscriptions.map(s =>
      webpush.sendNotification({ endpoint: s.endpoint, keys: s.keys }, body)
    )
  );

  let sent = 0, failed = 0;
  const keep = [];
  results.forEach((r, i) => {
    const sub = record.subscriptions[i];
    if (r.status === 'fulfilled') {
      sent++;
      keep.push(sub);
    } else {
      // 410 Gone / 404 Not Found = subscription is dead, prune it.
      // Anything else = transient, keep the subscription and retry on next push.
      const status = r.reason?.statusCode || 0;
      failed++;
      if (status === 410 || status === 404) {
        // drop
      } else {
        keep.push(sub);
      }
    }
  });
  const removed = record.subscriptions.length - keep.length;
  record.subscriptions = keep;
  return { sent, failed, removed };
}
