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

import { getStore } from '@netlify/blobs';

async function lookupAniListId(username) {
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ query: `{ User(name: "${username}") { id } }` }),
  });
  const data = await res.json();
  return data?.data?.User?.id ?? null;
}

async function lookupMALId(username) {
  const res = await fetch(`https://api.jikan.moe/v4/users/${encodeURIComponent(username)}`);
  const data = await res.json();
  return data?.data?.mal_id ?? null;
}

export default async (request, context) => {
  const url = new URL(request.url);
  const key      = url.searchParams.get('key');
  const id       = url.searchParams.get('id');
  const username = url.searchParams.get('username');
  const platform = (url.searchParams.get('platform') || 'anilist').toLowerCase();

  // Validate secret key
  const adminKey = process.env.ADMIN_DELETE_KEY;
  if (!adminKey || key !== adminKey) {
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
    const store = getStore({ name: 'anime-elo-sessions', context });
    const blobKey = `session_${userId}`;

    const existing = await store.get(blobKey);
    if (!existing) {
      return Response.json({ ok: false, message: `No data found for id: ${userId}` }, { status: 404 });
    }

    await store.delete(blobKey);
    return Response.json({ ok: true, message: `Data deleted for id: ${userId}` });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
};
