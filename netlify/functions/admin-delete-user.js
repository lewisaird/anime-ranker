// Admin function to manually delete a user's stored session data.
// Used to fulfil data deletion requests received via email.
//
// Usage:
//   GET /.netlify/functions/admin-delete-user?id=12345&key=YOUR_SECRET
//   GET /.netlify/functions/admin-delete-user?id=mal_67890&key=YOUR_SECRET
//
// The secret key is set via the ADMIN_DELETE_KEY environment variable in Netlify.
// AniList users: pass their numeric user ID (e.g. 12345)
// MAL users:     pass their ID prefixed with mal_ (e.g. mal_67890)

import { getStore } from '@netlify/blobs';

export default async (request, context) => {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  const id  = url.searchParams.get('id');

  // Validate secret key
  const adminKey = process.env.ADMIN_DELETE_KEY;
  if (!adminKey || key !== adminKey) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }

  if (!id) {
    return Response.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  // Sanitise: only allow numeric IDs or mal_ prefixed numeric IDs
  if (!/^(mal_)?\d+$/.test(id)) {
    return Response.json({ error: 'Invalid id format' }, { status: 400 });
  }

  try {
    const store = getStore({ name: 'anime-elo-sessions', context });
    const blobKey = `session_${id}`;

    // Check if it exists first so we can give a useful response
    const existing = await store.get(blobKey);
    if (!existing) {
      return Response.json({ ok: false, message: `No data found for id: ${id}` }, { status: 404 });
    }

    await store.delete(blobKey);
    return Response.json({ ok: true, message: `Data deleted for id: ${id}` });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
};
