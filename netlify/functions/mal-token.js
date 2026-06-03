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

// v1.0.152 — Origin allowlist parallel to mal-api.js / anilist-auth.js.
// Without it the function is reachable cross-origin; while the OAuth code
// + verifier pair is one-time and PKCE-bound, an attacker could still use
// this endpoint as a free oracle to validate scraped codes or burn the
// MAL client_secret rate-limit budget. Keep in sync with mal-api.js.
const DEFAULT_ALLOWED_ORIGINS = [
  'https://kessen.co.uk',
  'https://www.kessen.co.uk',
];
const EXTRA_ALLOWED = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(s => s.trim()).filter(Boolean);
const ALLOWED_ORIGIN_PATTERNS = [
  ...DEFAULT_ALLOWED_ORIGINS,
  ...EXTRA_ALLOWED,
  /^https:\/\/[a-z0-9-]+--kessen\.netlify\.app$/,
  /^https:\/\/kessen\.netlify\.app$/,
  /^https:\/\/[a-z0-9-]+\.netlify\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];
function isOriginAllowed(origin) {
  if (!origin) return false;
  for (const p of ALLOWED_ORIGIN_PATTERNS) {
    if (typeof p === 'string' && p === origin) return true;
    if (p instanceof RegExp && p.test(origin)) return true;
  }
  return false;
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

  const origin = event.headers?.origin || event.headers?.Origin || '';
  if (!isOriginAllowed(origin)) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Origin not allowed' }) };
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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token,
        refresh_token: refresh_token || null,
        expires_in:    expires_in    || 2678400,
      }),
    };

  } catch (e) {
    console.error('mal-token handler error:', e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
