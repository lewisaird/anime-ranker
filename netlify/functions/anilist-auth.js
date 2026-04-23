// Netlify Function — AniList OAuth token exchange
// Exchanges an authorization code for an access token without exposing
// the client secret in client-side code.
//
// Required Netlify environment variable:
//   ANILIST_CLIENT_SECRET  — from anilist.co/settings/developer

const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let code, redirect_uri;
  try {
    ({ code, redirect_uri } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!code || !redirect_uri) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing code or redirect_uri' }) };
  }

  const clientSecret = process.env.ANILIST_CLIENT_SECRET;
  if (!clientSecret) {
    console.error('ANILIST_CLIENT_SECRET environment variable is not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfiguration' }) };
  }

  const body = JSON.stringify({
    grant_type:    'authorization_code',
    client_id:     '37947',
    client_secret: clientSecret,
    redirect_uri,
    code,
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'anilist.co',
      path:     '/api/v2/oauth/token',
      method:   'POST',
      headers: {
        'Content-Type':   'application/json',
        'Accept':         'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) {
            resolve({
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ access_token: parsed.access_token }),
            });
          } else {
            resolve({
              statusCode: 400,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(parsed),
            });
          }
        } catch (_e) {
          resolve({ statusCode: 500, body: JSON.stringify({ error: 'Parse error', raw: data }) });
        }
      });
    });

    req.on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });

    req.write(body);
    req.end();
  });
};
