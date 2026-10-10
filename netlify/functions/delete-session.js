import { getStore } from '@netlify/blobs';
import { request as httpsRequest } from 'https';
import { PUSH_BLOB_STORE, pushUserIdFromSessionId, deleteInviteStamps } from './_push-shared.js'; // v1.0.264 — Delete all also removes the push data

async function verifyAniListToken(token) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query: '{ Viewer { id } }' }),
      signal: controller.signal,
    });
    const data = await res.json();
    return data?.data?.Viewer?.id ?? null;
  } finally {
    clearTimeout(timer);
  }
}

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
      res.on('data', chunk => { data += chunk; });
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

// v1.0.264 — AniList token first, as before (the app sends one provider's token per call).
function verifyUserFromTokens({ token, malToken }) {
  return token ? verifyAniListToken(token) : verifyMALToken(malToken);
}

// v1.0.264 — the handler takes its store factory and token check as parameters so the tests can hand it
// in-memory ones (as share.js does); Netlify gets the real ones below.
export function createHandler(storeFactory = getStore, verifyUser = verifyUserFromTokens) {
  return async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let token, malToken, deleteAll;
  try {
    ({ token, malToken, deleteAll } = await request.json()); // v1.0.264 — deleteAll: see below
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!token && !malToken) {
    return Response.json({ error: 'Missing token' }, { status: 400 });
  }

  // The session blob key is derived ONLY from a server-verified token.
  // Never fall back to a client-supplied user id — doing so would let anyone
  // delete any MAL user's saved session by guessing their numeric id.
  let userId;
  try {
    userId = await verifyUser({ token, malToken }); // v1.0.264 — injectable for tests (same checks)
    if (!userId) throw new Error('No user id');
  } catch {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }

  // v1.0.264 — the save first, so the push-data step below (a store-wide scan) can't hold it up.
  let saveError = null;
  try {
    const store = storeFactory({ name: 'anime-elo-sessions', context });
    await store.delete(`session_${userId}`);
  } catch (e) {
    saveError = e;
  }

  // v1.0.264 — "Delete all my data" (deleteAll) also deletes the account's push record (its device
  // subscriptions and the AniList token Tower retry polls with) and its invite history (push-send-invite's
  // stamps naming it as inviter or invitee). Reset sends no deleteAll, so its notifications keep working.
  // Each is best-effort and reported; the app also removes the record via push-unregister.
  let pushRecord, inviteStamps;
  if (deleteAll === true) {
    const pushId = pushUserIdFromSessionId(userId);
    const pushStore = () => storeFactory({ name: PUSH_BLOB_STORE, context });
    try { await pushStore().delete(`subs_${pushId}`); pushRecord = 'deleted'; } catch { pushRecord = 'error'; }
    try { await deleteInviteStamps(pushStore(), pushId); inviteStamps = 'deleted'; } catch { inviteStamps = 'error'; }
  }

  if (saveError) {
    return Response.json({ error: 'Blob store error: ' + saveError.message, pushRecord, inviteStamps }, { status: 500 });
  }
  return Response.json({ ok: true, pushRecord, inviteStamps });
  };
}

export default createHandler();
