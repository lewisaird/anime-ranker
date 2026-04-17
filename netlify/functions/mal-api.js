// Netlify Function — MAL API proxy
// api.myanimelist.net does not send CORS headers, so browser fetch calls fail.
// This function proxies authenticated GET and PATCH requests to the MAL API server-side.
//
// POST body:
//   { path: string, token: string, method?: string, body?: string }
//   path   — API path + query string, e.g. "/users/@me/animelist?status=completed&..."
//   token  — MAL Bearer access token
//   method — HTTP method to use against MAL API (default: "GET")
//   body   — Request body for PATCH requests (application/x-www-form-urlencoded string)
//
// Returns the MAL API JSON response with the original HTTP status code.

const https = require('https');

// Make one HTTPS request to api.myanimelist.net and return { statusCode, headers, body }
function malRequest(path, token, method, reqBody) {
  return new Promise((resolve, reject) => {
    const bodyBuf = (reqBody && method !== 'GET') ? Buffer.from(reqBody, 'utf8') : null;
    // Include MAL_CLIENT_ID alongside Bearer token — some MAL write endpoints
    // expect both to be present. Also send a User-Agent so MAL's WAF doesn't
    // treat the request as a headless bot (MAL blocks many server-side user agents).
    const clientId = process.env.MAL_CLIENT_ID;
    const options = {
      hostname: 'api.myanimelist.net',
      path,
      method: method || 'GET',
      headers: {
        'Authorization':  'Bearer ' + token,
        'Accept':         'application/json',
        'User-Agent':     'Mozilla/5.0 (compatible; Kessen/1.0)',
        ...(clientId ? { 'X-MAL-Client-ID': clientId } : {}),
        ...(bodyBuf ? {
          'Content-Type':   'application/x-www-form-urlencoded',
          'Content-Length': bodyBuf.length,
        } : {}),
      },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        // Log response headers for debugging when a non-2xx status comes back
        if (res.statusCode >= 300) {
          console.warn(`MAL ${method} ${path} → ${res.statusCode}`, JSON.stringify(res.headers));
        }
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('MAL API request timed out')); });
    if (bodyBuf) req.write(bodyBuf);
    req.end();
  });
}

// Pause for ms milliseconds
const sleep = ms => new Promise(r => setTimeout(r, ms));

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let path, token, method, body;
  try {
    ({ path, token, method, body } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!token) return { statusCode: 401, body: JSON.stringify({ error: 'Missing token' }) };
  if (!path)  return { statusCode: 400, body: JSON.stringify({ error: 'Missing path' }) };

  method = (method || 'GET').toUpperCase();

  // Safety: only allow safe methods and paths under /v2/
  const ALLOWED_METHODS = new Set(['GET', 'PATCH']);
  if (!ALLOWED_METHODS.has(method)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Method not permitted' }) };
  }
  if (!path.startsWith('/')) path = '/' + path;
  if (!path.startsWith('/v2/')) path = '/v2' + path;

  // Retry up to 3 times on 429 (rate limited), respecting Retry-After header.
  // Netlify Functions time out at ~10s so we cap individual waits at 8s.
  const MAX_RETRIES = 3;
  let attempt = 0;
  while (attempt <= MAX_RETRIES) {
    try {
      const result = await malRequest(path, token, method, body);

      if (result.statusCode === 429 && attempt < MAX_RETRIES) {
        const retryAfter = parseInt(result.headers['retry-after'] || '2', 10);
        const waitMs = Math.min(retryAfter * 1000, 8000);
        console.warn(`MAL 429 on attempt ${attempt + 1}, retrying after ${waitMs}ms`);
        await sleep(waitMs);
        attempt++;
        continue;
      }

      return {
        statusCode: result.statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: result.body || '{}',
      };
    } catch (e) {
      if (attempt < MAX_RETRIES) {
        await sleep(Math.min(1000 * 2 ** attempt, 8000)); // exponential backoff
        attempt++;
        continue;
      }
      return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
    }
  }
};
