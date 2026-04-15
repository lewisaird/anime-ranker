// Netlify Function — MAL API proxy
// api.myanimelist.net does not send CORS headers, so browser fetch calls fail.
// This function proxies authenticated GET requests to the MAL API server-side.
//
// POST body:
//   { path: string, token: string }
//   path  — API path + query string, e.g. "/users/@me/animelist?status=completed&..."
//   token — MAL Bearer access token
//
// Returns the MAL API JSON response with the original HTTP status code.

const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let path, token;
  try {
    ({ path, token } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!token) return { statusCode: 401, body: JSON.stringify({ error: 'Missing token' }) };
  if (!path)  return { statusCode: 400, body: JSON.stringify({ error: 'Missing path' }) };

  // Safety: only allow paths under /v2/
  if (!path.startsWith('/')) path = '/' + path;
  if (!path.startsWith('/v2/')) path = '/v2' + path;

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.myanimelist.net',
      path,
      method:  'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept':        'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: { 'Content-Type': 'application/json' },
          body: data, // forward raw JSON from MAL
        });
      });
    });

    req.on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });

    req.end();
  });
};
