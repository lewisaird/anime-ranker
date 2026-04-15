// Netlify Function — MAL OAuth token exchange & refresh
// Proxies token requests to avoid exposing MAL_CLIENT_SECRET in client-side code
// and to work around CORS restrictions on the MAL token endpoint.
// After a successful exchange it also fetches the MAL user profile server-side
// (api.myanimelist.net doesn't send CORS headers, so the browser can't call it directly).
//
// Required Netlify environment variables:
//   MAL_CLIENT_ID      — from myanimelist.net/apiconfig
//   MAL_CLIENT_SECRET  — from myanimelist.net/apiconfig
//
// POST body for initial token exchange:
//   { code, code_verifier, redirect_uri }
//   → returns { access_token, refresh_token, expires_in, user: { id, name, picture } }
//
// POST body for token refresh:
//   { refresh_token }
//   → returns { access_token, refresh_token, expires_in, user: { id, name, picture } }

const https = require('https');

// Simple HTTPS GET helper (MAL API doesn't support CORS, so we call it from here)
function httpsGet(url, headers) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path:     parsed.pathname + parsed.search,
      method:   'GET',
      headers,
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: {} }); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// HTTPS POST helper for the token endpoint
function httpsPost(hostname, path, body, headers) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname, path, method: 'POST',
      headers: { ...headers, 'Content-Length': Buffer.byteLength(body) },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: {} }); }
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

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const clientId     = process.env.MAL_CLIENT_ID;
  const clientSecret = process.env.MAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error('MAL_CLIENT_ID or MAL_CLIENT_SECRET not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfiguration' }) };
  }

  let tokenParams;
  if (body.refresh_token) {
    tokenParams = new URLSearchParams({
      grant_type:    'refresh_token',
      refresh_token: body.refresh_token,
      client_id:     clientId,
      client_secret: clientSecret,
    });
  } else if (body.code && body.code_verifier && body.redirect_uri) {
    tokenParams = new URLSearchParams({
      grant_type:    'authorization_code',
      code:          body.code,
      code_verifier: body.code_verifier,
      redirect_uri:  body.redirect_uri,
      client_id:     clientId,
      client_secret: clientSecret,
    });
  } else {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required parameters' }) };
  }

  try {
    // 1. Exchange/refresh tokens with MAL
    const tokenReqBody = tokenParams.toString();
    const tokenRes = await httpsPost(
      'myanimelist.net', '/v1/oauth2/token',
      tokenReqBody,
      { 'Content-Type': 'application/x-www-form-urlencoded' }
    );

    if (!tokenRes.body.access_token) {
      console.error('MAL token error:', JSON.stringify(tokenRes.body));
      return {
        statusCode: tokenRes.status || 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenRes.body),
      };
    }

    const { access_token, refresh_token, expires_in } = tokenRes.body;

    // 2. Fetch user profile server-side (MAL API has no CORS headers for browsers)
    // No fields param — MAL returns id and name by default for @me
    const profileRes = await httpsGet(
      'https://api.myanimelist.net/v2/users/@me',
      { 'Authorization': 'Bearer ' + access_token, 'Accept': 'application/json' }
    );

    console.log('MAL profile status:', profileRes.status);
    if (profileRes.status !== 200) {
      console.error('MAL profile error body:', JSON.stringify(profileRes.body));
    }

    if (profileRes.status !== 200) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token,
          refresh_token: refresh_token || null,
          expires_in:    expires_in    || 2678400,
          user: null,
          profile_error: { status: profileRes.status, body: profileRes.body },
        }),
      };
    }

    const user = {
      id:      profileRes.body.id      || null,
      name:    profileRes.body.name    || '',
      picture: profileRes.body.picture || '',
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token,
        refresh_token: refresh_token || null,
        expires_in:    expires_in    || 2678400,
        user,
      }),
    };

  } catch (e) {
    console.error('mal-token handler error:', e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
