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
// v1.0.177 — schema bumped to 2. Adds Tower-retry polling state:
//   - aniListToken / aniListUserId  : present only while towerRetry is on
//   - notifiedCompletions[]         : media IDs we've already pushed for
//   - lastPolledAt                  : ms timestamp of last scheduled poll
//   - initialSnapshotDone           : true after register-time backfill catch-up
// All fields default safely so reading an older v1 record continues to work.
export async function loadPushRecord(userId, context) {
  const store = getStore({ name: PUSH_BLOB_STORE, context });
  const raw = await store.get(`subs_${userId}`, { type: 'json' });
  if (!raw || typeof raw !== 'object') {
    return {
      subscriptions: [],
      categories: { towerRetry: true, watchTogether: true, liveChallenge: true },
      aniListToken:          null,
      aniListUserId:         null,
      notifiedCompletions:   [],
      lastPolledAt:          0,
      initialSnapshotDone:   false,
      schemaVersion: 2,
    };
  }
  // Migrate v1 → v2 on read so older records get the new fields filled in.
  return {
    aniListToken:          null,
    aniListUserId:         null,
    notifiedCompletions:   [],
    lastPolledAt:          0,
    initialSnapshotDone:   false,
    ...raw,
    schemaVersion: 2,
  };
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

// v1.0.177 — AniList polling helpers for Phase 2C (Tower retry pushes).
//
// Authenticated GraphQL call against AniList. Token is the user's long-lived
// access token (AniList tokens last ~1 year; no refresh flow needed).
export async function callAniList(token, query, variables = {}) {
  if (!token) throw new Error('AniList token missing');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Accept':        'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });
    const data = await res.json();
    if (!res.ok || data.errors) {
      const code = res.status;
      const err = data.errors?.[0]?.message || `HTTP ${code}`;
      const e = new Error(err);
      e.status = code;
      throw e;
    }
    return data.data;
  } finally {
    clearTimeout(timer);
  }
}

// Fetch all COMPLETED anime media IDs for a user. Paginates 50 per page.
// Returns: [{ id, titleEn, titleRo, cover, updatedAt }]. Most-recently-updated
// first.
//
// v1.0.218 — added `updatedAt` (AniList list-entry updatedAt, seconds since
// epoch) and an optional `opts.beforeSeconds` cutoff. When the cutoff is set,
// entries with `updatedAt >= beforeSeconds` are filtered out. This lets the
// delayed-snapshot path in tower-retry-poll.js take a snapshot of the user's
// state *as of opt-in time* even when running hours later — closing the
// race condition where a register-time snapshot failure caused the
// delayed snapshot to capture (and silently swallow) anime the user
// completed in the gap between opting in and the next poll.
export async function fetchCompletedAnime(token, userId, maxPages = 20, opts = {}) {
  const query = `
    query($userId:Int,$page:Int){
      Page(page:$page,perPage:50){
        pageInfo{ hasNextPage }
        mediaList(userId:$userId,status:COMPLETED,type:ANIME,sort:UPDATED_TIME_DESC){
          mediaId
          updatedAt
          media{
            id
            title{ english romaji }
            coverImage{ medium }
          }
        }
      }
    }`;
  const beforeSeconds = Number.isFinite(opts.beforeSeconds) ? opts.beforeSeconds : null;
  const all = [];
  pages: for (let page = 1; page <= maxPages; page++) {
    const data = await callAniList(token, query, { userId, page });
    const entries = data?.Page?.mediaList || [];
    for (const e of entries) {
      const updatedAt = Number.isFinite(e.updatedAt) ? e.updatedAt : 0;
      // With the cutoff in play, skip anything updated at-or-after it. The
      // list is UPDATED_TIME_DESC, so as we walk a page we hit older entries.
      // Mid-page entries with updatedAt >= cutoff are dropped; older ones
      // are kept. We don't break inside the loop because a single skipped
      // entry doesn't tell us the rest of the page is uniformly newer or
      // older (the sort is stable per second; ties can interleave).
      if (beforeSeconds !== null && updatedAt >= beforeSeconds) continue;
      all.push({
        id:        e.media?.id || e.mediaId,
        titleEn:   e.media?.title?.english || null,
        titleRo:   e.media?.title?.romaji  || null,
        cover:     e.media?.coverImage?.medium || null,
        updatedAt,
      });
    }
    // Cheap pagination shortcut: when a cutoff is set and the last entry on
    // this page is already much older than the cutoff (>30d), the next page
    // is also all older — no value in continuing past pageInfo guidance.
    if (beforeSeconds !== null && entries.length > 0) {
      const last = entries[entries.length - 1];
      const lastUpd = Number.isFinite(last.updatedAt) ? last.updatedAt : 0;
      if (lastUpd > 0 && (beforeSeconds - lastUpd) > 30 * 24 * 60 * 60) break pages;
    }
    if (!data?.Page?.pageInfo?.hasNextPage) break;
    // Polite delay between pages to stay well clear of AniList's 90 req/min cap.
    await new Promise(r => setTimeout(r, 700));
  }
  return all;
}

// Iterate every push record in the kessen-push blob store. Yields one record
// per user with their userId attached. The scheduled tower-retry function
// uses this to find opted-in users; future maintenance functions (cleanup of
// dead subscriptions, etc.) can reuse it.
export async function* iteratePushRecords(context) {
  const store = getStore({ name: PUSH_BLOB_STORE, context });
  let cursor;
  do {
    const page = await store.list({ prefix: 'subs_', cursor });
    for (const blob of page.blobs || []) {
      const userId = blob.key.replace(/^subs_/, '');
      const record = await store.get(blob.key, { type: 'json' });
      if (record && typeof record === 'object') {
        yield { userId, record };
      }
    }
    cursor = page.cursor;
  } while (cursor);
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
