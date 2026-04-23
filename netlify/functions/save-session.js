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

export default async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let token, malToken, session;
  try {
    ({ token, malToken, session } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if ((!token && !malToken) || !session) {
    return Response.json({ error: 'Missing token or session' }, { status: 400 });
  }

  // The session blob key is derived ONLY from a server-verified token.
  // Never fall back to a client-supplied user id — doing so would let anyone
  // overwrite any MAL user's saved session by guessing their numeric id.
  let userId;
  try {
    if (token) {
      userId = await verifyAniListToken(token);
    } else {
      userId = await verifyMALToken(malToken);
    }
    if (!userId) throw new Error('No user id');
  } catch {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const store = getStore({ name: 'anime-elo-sessions', context });
    const value = typeof session === 'string' ? session : JSON.stringify(session);
    await store.set(`session_${userId}`, value);
    const parsed = JSON.parse(value);
    return Response.json({ ok: true, savedAt: parsed.savedAt ?? null });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
};
