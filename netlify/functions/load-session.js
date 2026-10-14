import { getStore } from '@netlify/blobs';
import { request as httpsRequest } from 'https';

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

// Use Node.js https module instead of fetch — MAL's API times out or blocks
// requests from Netlify's servers when using the global fetch.
// 8-second timeout is generous enough that transient MAL slowness does not
// masquerade as an auth failure. If MAL is truly down, we return 401 and the
// client can retry — we never trust a client-asserted user id.
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

// v1.0.270 — the store and the token checks are parameters so a test can hand in fakes (as share.js); Netlify gets the real ones.
export function createHandler(storeFactory = getStore, verify = { anilist: verifyAniListToken, mal: verifyMALToken }) {
  return async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let token, malToken;
  try {
    ({ token, malToken } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!token && !malToken) {
    return Response.json({ error: 'Missing token' }, { status: 400 });
  }

  // The session blob key is derived ONLY from a server-verified token.
  // Never fall back to a client-supplied user id — doing so would let anyone
  // read/write/delete any MAL user's saved session by guessing their numeric id.
  let userId;
  try {
    if (token) {
      userId = await verify.anilist(token);
    } else {
      userId = await verify.mal(malToken);
    }
    if (!userId) throw new Error('No user id');
  } catch {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const store = storeFactory({ name: 'anime-elo-sessions', context });
    // v1.0.270 — strong read. The default (eventual) read can return the previous copy for up to 60 s after a save
    // (Netlify Blobs docs), and live sync reads about half a second after the other device's save: it got the copy it
    // already had, so that round never arrived. share.js has read this way since 1.0.253. Where the environment lacks
    // the uncached edge URL a strong read throws BlobsConsistencyError: read normally then (the app reads again).
    const key = `session_${userId}`;
    let value, read = 'strong';
    try {
      value = await store.get(key, { consistency: 'strong' });
    } catch (e) {
      if (e?.name !== 'BlobsConsistencyError') throw e;
      value = await store.get(key);
      read = 'eventual';
    }
    const headers = { 'X-Kessen-Read': read }; // v1.0.270 — visible in DevTools → Network: which read Netlify served
    if (value === null || value === undefined) {
      return Response.json({ session: null }, { headers });
    }
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Response.json({ session: parsed }, { headers });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
};
}

export default createHandler();
