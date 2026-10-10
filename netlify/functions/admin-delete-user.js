// Admin function to manually delete a user's stored session data.
// Used to fulfil data deletion requests received via email.
//
// Usage by numeric ID:
//   GET /.netlify/functions/admin-delete-user?id=12345&key=YOUR_SECRET
//   GET /.netlify/functions/admin-delete-user?id=mal_67890&key=YOUR_SECRET
//
// Usage by username (AniList only — looks up ID automatically):
//   GET /.netlify/functions/admin-delete-user?username=AniELOTest&key=YOUR_SECRET
//
// The secret key is set via the ADMIN_DELETE_KEY environment variable in Netlify.
//
// v1.0.264 — deletes the cloud save AND the push data: the push record (device subscriptions and any AniList
// token Tower retry polls with) and the invite stamps naming the account. Names the Firebase node to remove
// by hand (this function has no Firebase access).

import { getStore } from '@netlify/blobs';
import { timingSafeEqual } from 'node:crypto';
import { PUSH_BLOB_STORE, pushUserIdFromSessionId, deleteInviteStamps } from './_push-shared.js';

async function lookupAniListId(username) {
  // v1.0.152 — use a GraphQL variable instead of string interpolation.
  // Blast radius was already limited by the admin-key gate, but a leaked
  // key plus a crafted username could read arbitrary AniList fields.
  // Variables defang the injection entirely.
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      query: 'query($name: String) { User(name: $name) { id } }',
      variables: { name: username },
    }),
  });
  const data = await res.json();
  return data?.data?.User?.id ?? null;
}

// v1.0.152 — Constant-time string comparison so the admin key can't be
// brute-forced char-by-char via response-time analysis. Both inputs need
// to be the same length for timingSafeEqual; we pad / detect-length first.
function _adminKeyMatches(provided, expected) {
  if (typeof provided !== 'string' || typeof expected !== 'string') return false;
  if (provided.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  } catch {
    return false;
  }
}

async function lookupMALId(username) {
  const res = await fetch(`https://api.jikan.moe/v4/users/${encodeURIComponent(username)}`);
  const data = await res.json();
  return data?.data?.mal_id ?? null;
}

// v1.0.264 — the handler takes its store factory as a parameter so the tests can hand it an in-memory
// store (as share.js does); Netlify gets the real @netlify/blobs one below.
export function createHandler(storeFactory = getStore) {
  return async (request, context) => {
  const url = new URL(request.url);
  const key      = url.searchParams.get('key');
  const id       = url.searchParams.get('id');
  const username = url.searchParams.get('username');
  const platform = (url.searchParams.get('platform') || 'anilist').toLowerCase();

  // Validate secret key (constant-time compare — see _adminKeyMatches above)
  const adminKey = process.env.ADMIN_DELETE_KEY;
  if (!adminKey || !_adminKeyMatches(key, adminKey)) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }

  if (!id && !username) {
    return Response.json({ error: 'Missing id or username parameter' }, { status: 400 });
  }

  let userId = id;

  // If username supplied, look up the numeric ID
  if (!userId && username) {
    try {
      if (platform === 'mal') {
        const malId = await lookupMALId(username);
        if (!malId) return Response.json({ error: `MAL user not found: ${username}` }, { status: 404 });
        userId = `mal_${malId}`;
      } else {
        const anilistId = await lookupAniListId(username);
        if (!anilistId) return Response.json({ error: `AniList user not found: ${username}` }, { status: 404 });
        userId = String(anilistId);
      }
    } catch (e) {
      return Response.json({ error: 'Username lookup failed: ' + e.message }, { status: 500 });
    }
  }

  // Sanitise: only allow numeric IDs or mal_ prefixed numeric IDs
  if (!/^(mal_)?\d+$/.test(userId)) {
    return Response.json({ error: 'Invalid id format' }, { status: 400 });
  }

  try {
    const store = storeFactory({ name: 'anime-elo-sessions', context });
    const blobKey = `session_${userId}`;
    // v1.0.264 — the push record and invite stamps too (they were left behind, and an account with only push
    // data got "No data found"). The two stores name the account differently: <id> / mal_<id> here,
    // anilist_<id> / mal_<id> there. A MAL account without an id in the app is filed in Firebase by username.
    const pushStore = storeFactory({ name: PUSH_BLOB_STORE, context });
    const pushId    = pushUserIdFromSessionId(userId);
    const pushKey   = `subs_${pushId}`;
    const firebase  = `users/${userId.startsWith('mal_') ? userId : `al_${userId}`}`;
    const fbNote    = `${firebase}${userId.startsWith('mal_') ? ' (or users/mal_<their MAL username>)' : ''}`;

    const existing     = await store.get(blobKey);
    const existingPush = await pushStore.get(pushKey);
    const stamps       = await deleteInviteStamps(pushStore, pushId);
    if (!existing && !existingPush && !stamps) {
      return Response.json({ ok: false, message: `No data found for id: ${userId}. Check ${fbNote} in the Firebase console.`, firebase }, { status: 404 });
    }

    const deleted = [];
    if (existing)     { await store.delete(blobKey);   deleted.push('cloud save'); }
    if (existingPush) { await pushStore.delete(pushKey); deleted.push('push record'); }
    if (stamps)       deleted.push(`${stamps} invite stamp${stamps === 1 ? '' : 's'}`);
    return Response.json({
      ok: true, deleted, firebase,
      message: `Deleted for id ${userId}: ${deleted.join(', ')}. Also remove ${fbNote} in the Firebase console.`,
    });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
  };
}

export default createHandler();
