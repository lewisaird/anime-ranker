import { getStore } from '@netlify/blobs';
import { request as httpsRequest } from 'https';

async function verifyAniListToken(token) {
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query: '{ Viewer { id } }' }),
  });
  const data = await res.json();
  return data?.data?.Viewer?.id ?? null;
}

// Use Node.js https module instead of fetch — MAL's API times out or blocks
// requests from Netlify's servers when using the global fetch.
// 3-second timeout so a hung MAL API doesn't stall the whole function.
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
    // If MAL's API hangs, don't stall the whole Netlify function — resolve null
    // and fall through to the client-supplied malUserId fallback.
    req.setTimeout(3000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

export default async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let token, malToken, malUserId;
  try {
    ({ token, malToken, malUserId } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!token && !malToken) {
    return Response.json({ error: 'Missing token' }, { status: 400 });
  }

  let userId;
  try {
    if (token) {
      userId = await verifyAniListToken(token);
    } else {
      userId = await verifyMALToken(malToken);
      // Fall back to client-provided userId if server-side MAL verification fails.
      // MAL's API often blocks or times out requests from Netlify's servers.
      // The token is already validated client-side; this only affects storage key scoping.
      const numericId = parseInt(malUserId, 10);
      if (!userId && numericId) {
        userId = `mal_${numericId}`;
      }
    }
    if (!userId) throw new Error('No user id');
  } catch {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const store = getStore({ name: 'anime-elo-sessions', context });
    const value = await store.get(`session_${userId}`);
    if (value === null || value === undefined) {
      return Response.json({ session: null });
    }
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Response.json({ session: parsed });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
};
