// Admin function to manually delete a user's stored session data.
// Used to fulfil data deletion requests received via email.
//
// v1.0.268 — POST only, with the key in an Authorization header and the account in a JSON body (decision 26). The
// key used to go in the query string, where it could end up in logs and shell history; a key there is now ignored
// (401), and anything but POST gets 405 before the key is checked.
//
//   POST /.netlify/functions/admin-delete-user
//   Authorization: Bearer <ADMIN_DELETE_KEY>
//   Content-Type: application/json
//
//   {"id":"12345"}                                   AniList account id
//   {"id":"mal_67890"}                               MyAnimeList account id
//   {"username":"AniELOTest"}                        AniList username (looked up on AniList)
//   {"username":"name","platform":"mal"}             refused (400): MAL usernames can't be looked up here; run
//                                                    tools/find-mal-id.mjs, or ask them to use Delete all
//
// Bad JSON gives 400. The secret key is set via the ADMIN_DELETE_KEY environment variable in Netlify.
// From zsh, so the key never appears in the command line or the shell history:
//
//   read -rs KESSEN_ADMIN_KEY        # paste ADMIN_DELETE_KEY, press Enter (nothing shows)
//   curl -sS -X POST 'https://kessen.co.uk/.netlify/functions/admin-delete-user' \
//     -H "Authorization: Bearer $KESSEN_ADMIN_KEY" -H 'Content-Type: application/json' \
//     --data '{"id":"12345"}'
//   unset KESSEN_ADMIN_KEY
//
// A safe check: --data '{"id":"check"}' answers 400 "Invalid id format" (the key passed, nothing was deleted).
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

// (v1.0.268 — the MAL username lookup through a public MAL mirror is gone: see the header)

// v1.0.268 — the key from "Authorization: Bearer <key>", or null
function _bearerKey(request) {
  const m = /^Bearer\s+(.+)$/i.exec(request.headers.get('authorization') || '');
  return m ? m[1].trim() : null;
}

// v1.0.264 — the handler takes its store factory as a parameter so the tests can hand it an in-memory
// store (as share.js does); Netlify gets the real @netlify/blobs one below.
export function createHandler(storeFactory = getStore) {
  return async (request, context) => {
  // v1.0.268 — POST only, checked before the key (see the header)
  if (request.method !== 'POST') {
    return Response.json({ error: 'Use POST with the key in an Authorization header' }, { status: 405 });
  }

  // Validate secret key (constant-time compare — see _adminKeyMatches above). v1.0.268 — from the Authorization
  // header only; a key in the query string is ignored.
  const adminKey = process.env.ADMIN_DELETE_KEY;
  if (!adminKey || !_adminKeyMatches(_bearerKey(request), adminKey)) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }

  // v1.0.268 — the account comes from a JSON body (was query parameters)
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const str = (v) => (typeof v === 'string' || typeof v === 'number' ? String(v).trim() : '');
  const id       = str(body.id);
  const username = str(body.username);
  const platform = (str(body.platform) || 'anilist').toLowerCase();

  if (!id && !username) {
    return Response.json({ error: 'Missing id or username' }, { status: 400 });
  }

  let userId = id;

  // If username supplied, look up the numeric ID
  if (!userId && username) {
    // v1.0.268 — MAL usernames are no longer looked up (nothing is fetched): tools/find-mal-id.mjs finds the id
    if (platform === 'mal') {
      return Response.json({ error: "MAL usernames can't be looked up here: run tools/find-mal-id.mjs, or ask them to use Delete all." }, { status: 400 });
    }
    try {
      const anilistId = await lookupAniListId(username);
      if (!anilistId) return Response.json({ error: `AniList user not found: ${username}` }, { status: 404 });
      userId = String(anilistId);
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
