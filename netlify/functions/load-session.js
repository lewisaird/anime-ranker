const https = require('https');
const { getStore } = require('@netlify/blobs');

function anilistRequest(query, token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query });
    const options = {
      hostname: 'graphql.anilist.co',
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Parse error: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let token;
  try {
    ({ token } = JSON.parse(event.body));
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!token) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing token' }) };
  }

  // Verify token by fetching viewer identity
  let userId;
  try {
    const result = await anilistRequest('{ Viewer { id } }', token);
    userId = result?.data?.Viewer?.id;
    if (!userId) throw new Error('No viewer id');
  } catch (e) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Invalid AniList token' }) };
  }

  // Load session from Netlify Blobs
  try {
    const store = getStore('anime-elo-sessions');
    const key = `session_${userId}`;
    const value = await store.get(key);
    if (value === null || value === undefined) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session: null })
      };
    }
    // value is already a string; parse to validate, then re-stringify for consistent output
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session: parsed })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Blob store error: ' + e.message }) };
  }
};
