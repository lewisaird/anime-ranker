import { getStore } from '@netlify/blobs';

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

export default async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let token;
  try {
    ({ token } = await request.json());
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!token) {
    return Response.json({ error: 'Missing token' }, { status: 400 });
  }

  let userId;
  try {
    userId = await verifyAniListToken(token);
    if (!userId) throw new Error('No viewer id');
  } catch {
    return Response.json({ error: 'Invalid AniList token' }, { status: 401 });
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
