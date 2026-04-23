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
  // delete any MAL user's saved session by guessing their numeric id.
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
    await store.delete(`session_${userId}`);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
};
