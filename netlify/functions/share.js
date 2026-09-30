// share.js — short share links for the "Top 20" shared-rankings page.
//
// v1.0.249 — the share link used to carry the whole payload in the URL hash
// (~3,700 characters), which some chat apps truncate or refuse to unfurl.
// Now the client POSTs the same payload here, gets back a short id, and the
// link becomes https://kessen.co.uk/s/<id>. The page at /s/<id> is index.html
// (netlify.toml rewrite); tryLoadSharedView fetches the payload back with GET.
//
//   POST { payload }   → { id }            (validated + size-capped, stored in Blobs)
//   GET  ?id=<id>      → payload JSON       (404 when unknown)
//
// Security: the payload is treated as untrusted on both ends. This function
// re-validates every field and clamps lengths before storing, and the client
// renders everything via textContent with cover URLs host-allowlisted — the
// same rules the long #r= links have always lived under.
import { getStore } from '@netlify/blobs';
import { randomBytes } from 'crypto';

export const STORE_NAME = 'kessen-shares';
export const MAX_ENTRIES = 50;         // the app shares a top 20; leave headroom
export const MAX_BODY_BYTES = 16_000;   // a 20-entry payload is ~3–4 KB
const ID_RE = /^[A-Za-z0-9]{6,16}$/;
const ALLOWED_IMG_HOSTS = new Set(['s4.anilist.co', 'img.anili.st', 'cdn.myanimelist.net']);
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'; // no 0/O/1/l/I

const clampStr = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max);
const clampInt = (v, max = 1_000_000) => Math.min(max, Math.max(0, parseInt(v, 10) || 0));

function safeCover(raw) {
  try {
    const u = new URL(String(raw ?? ''));
    if (u.protocol !== 'https:' || !ALLOWED_IMG_HOSTS.has(u.hostname)) return '';
    return u.href.slice(0, 300);
  } catch { return ''; }
}

// Returns a cleaned copy of the payload, or null when it isn't a share payload.
export function sanitisePayload(payload) {
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.top)) return null;
  const top = payload.top
    .filter(a => a && typeof a === 'object')
    .slice(0, MAX_ENTRIES)
    .map(a => ({ r: clampInt(a.r, 10_000), t: clampStr(a.t, 200), e: clampInt(a.e, 10_000), c: safeCover(a.c) }))
    .filter(a => a.t);
  if (!top.length) return null;
  const out = { u: clampStr(payload.u, 80), b: clampInt(payload.b), top };
  if (payload.ms) out.ms = clampStr(payload.ms, 80);
  return out;
}

export function newId(bytes = randomBytes(8)) {
  let s = '';
  for (const b of bytes) s += ALPHABET[b % ALPHABET.length];
  return s.slice(0, 8);
}

// The handler takes its store factory as a parameter so the tests can hand
// it an in-memory store; Netlify gets the real @netlify/blobs one below.
export function createHandler(storeFactory) {
  return async (request, context) => {
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const id = url.searchParams.get('id') || '';
    if (!ID_RE.test(id)) return Response.json({ error: 'Bad id' }, { status: 400 });
    try {
      const store = storeFactory({ name: STORE_NAME, context });
      const record = await store.get(id, { type: 'json' });
      if (!record || !record.payload) return Response.json({ error: 'Not found' }, { status: 404 });
      return Response.json(record.payload, {
        headers: { 'Cache-Control': 'public, max-age=86400', 'X-Robots-Tag': 'noindex' },
      });
    } catch (e) {
      return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
    }
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // Lenient origin check: a browser that sends Origin must be sending ours
  // (production URL, this request's origin, or a deploy preview). Not a
  // security boundary — just keeps casual scripted spam off the store.
  const origin = request.headers.get('origin');
  const ours = new Set([url.origin, process.env.URL, process.env.DEPLOY_PRIME_URL].filter(Boolean));
  if (origin && !ours.has(origin)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  let raw;
  try {
    raw = await request.text();
  } catch {
    return Response.json({ error: 'Unreadable body' }, { status: 400 });
  }
  if (raw.length > MAX_BODY_BYTES) return Response.json({ error: 'Payload too large' }, { status: 413 });

  let body;
  try { body = JSON.parse(raw); } catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }
  const payload = sanitisePayload(body?.payload);
  if (!payload) return Response.json({ error: 'Not a share payload' }, { status: 400 });

  try {
    const store = storeFactory({ name: STORE_NAME, context });
    // 48+ bits of randomness — a collision is vanishingly unlikely, but a
    // second attempt costs nothing.
    for (let attempt = 0; attempt < 3; attempt++) {
      const id = newId();
      const existing = await store.get(id, { type: 'json' });
      if (existing) continue;
      await store.setJSON(id, { v: 1, createdAt: new Date().toISOString(), payload });
      return Response.json({ id });
    }
    return Response.json({ error: 'Could not allocate an id' }, { status: 500 });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
  };
}

export default createHandler(getStore);
