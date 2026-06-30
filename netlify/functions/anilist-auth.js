// Netlify Function — AniList OAuth token exchange
// Exchanges an authorization code for an access token without exposing
// the client secret in client-side code.
//
// Required Netlify environment variable:
//   ANILIST_CLIENT_SECRET  — from anilist.co/settings/developer

const https = require('https');

// v1.0.152 — Origin allowlist parallel to mal-api.js. Without it the
// function is reachable cross-origin; while the OAuth code itself is
// short-lived and bound to the client_id, an attacker could still use
// this endpoint as a free oracle to validate scraped codes or burn the
// AniList client_secret rate-limit budget. Keep this list in sync with
// mal-api.js. Can be extended via the ALLOWED_ORIGINS env var.
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
  // No generic *.netlify.app — see mal-api.js. Use ALLOWED_ORIGINS env var.
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

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const origin = event.headers?.origin || event.headers?.Origin || '';
  if (!isOriginAllowed(origin)) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Origin not allowed' }) };
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
          // v1.0.152 — was leaking the raw upstream body via { raw: data },
          // which can include internal AniList error structures, partial
          // tokens, request IDs, etc. Return a generic message and log
          // the body server-side instead.
          console.error('[anilist-auth] parse error, raw body:', data);
          resolve({ statusCode: 502, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Upstream parse error' }) });
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
