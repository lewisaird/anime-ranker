// Netlify Function — MAL OAuth token exchange & refresh
// Proxies token requests to avoid exposing MAL_CLIENT_SECRET in client-side code
// and to work around CORS restrictions on the MAL token endpoint.
//
// Required Netlify environment variables:
//   MAL_CLIENT_ID      — from myanimelist.net/apiconfig
//   MAL_CLIENT_SECRET  — from myanimelist.net/apiconfig
//
// POST body for initial token exchange:
//   { code, code_verifier, redirect_uri }
//
// POST body for token refresh:
//   { refresh_token }

const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const clientId     = process.env.MAL_CLIENT_ID;
  const clientSecret = process.env.MAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error('MAL_CLIENT_ID or MAL_CLIENT_SECRET environment variable is not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfiguration' }) };
  }

  let params;
  if (body.refresh_token) {
    // Token refresh flow
    params = new URLSearchParams({
      grant_type:    'refresh_token',
      refresh_token: body.refresh_token,
      client_id:     clientId,
      client_secret: clientSecret,
    });
  } else if (body.code && body.code_verifier && body.redirect_uri) {
    // Initial authorization code exchange
    params = new URLSearchParams({
      grant_type:    'authorization_code',
      code:          body.code,
      code_verifier: body.code_verifier,
      redirect_uri:  body.redirect_uri,
      client_id:     clientId,
      client_secret: clientSecret,
    });
  } else {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required parameters (code+code_verifier+redirect_uri or refresh_token)' }) };
  }

  const reqBody = params.toString();

  return new Promise((resolve) => {
    const options = {
      hostname: 'myanimelist.net',
      path:     '/v1/oauth2/token',
      method:   'POST',
      headers: {
        'Content-Type':   'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(reqBody),
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
              body: JSON.stringify({
                access_token:  parsed.access_token,
                refresh_token: parsed.refresh_token || null,
                expires_in:    parsed.expires_in    || 2678400, // 31 days default
              }),
            });
          } else {
            console.error('MAL token error:', data);
            resolve({
              statusCode: 400,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(parsed),
            });
          }
        } catch (e) {
          resolve({ statusCode: 500, body: JSON.stringify({ error: 'Parse error', raw: data }) });
        }
      });
    });

    req.on('error', (e) => {
      resolve({ statusCode: 500, body: JSON.stringify({ error: e.message }) });
    });

    req.write(reqBody);
    req.end();
  });
};
