// share.js — short share links for the "Top 10" shared-rankings page.
// v1.0.271 — rewritten for decisions 5 and 30a: a link holds IDs only and a server-checked username, and lasts 12 months.
//
// The app POSTs a payload when the sharer taps Create link (1.0.271; it used to POST as the Share window opened) and
// gets back a short id; the link is https://kessen.co.uk/s/<id>. The page at /s/<id> is index.html (netlify.toml
// rewrite); tryLoadSharedView fetches the payload back with GET and looks up titles and covers on AniList by id.
//
//   POST { payload, token? | malToken? } → { id }   (validated + size-capped, stored in Blobs as { v: 2, createdAt, payload })
//   GET  ?id=<id>                         → payload  (404 unknown; 410 { error: 'expired' } after 365 days;
//                                                     410 { error: 'unavailable' } for an old record with no ids)
//
// What a link holds: per entry the rank, ELO, AniList id, MAL id and tier letter; the battle count; p:'mal' for a MAL
// sharer; and u, the sharer's AniList or MyAnimeList username, only when the request carried that account's own sign-in
// token and the site confirmed it (accountNameFromToken). The token is used for that one lookup and is never stored or
// logged. Names, titles, cover addresses and milestone text sent by the app are never kept, so nothing typed by a
// person reaches a public page.
//
// Records made before 1.0.271 (v1) also hold a name, titles and covers. GET strips them on the way out, and answers
// 410 'unavailable' when no entry has an AniList id (every link made before 1.0.258's share.js, live 8 Oct 2026).
import { getStore } from '@netlify/blobs';
import { randomBytes } from 'crypto';
import { request as httpsRequest } from 'https';

export const STORE_NAME = 'kessen-shares';
export const MAX_ENTRIES = 50;         // v1.0.258 — the app shares a top 10 (a top 20 before); leave headroom
export const MAX_BODY_BYTES = 16_000;   // v1.0.271 — a 10-entry payload is under 1 KB; a sign-in token is up to MAX_TOKEN_CHARS
export const MAX_TOKEN_CHARS = 4_000;   // v1.0.271 — longer than any AniList or MAL access token; anything longer is ignored
export const NAME_LOOKUP_MS = 3_000;    // v1.0.271 — the name lookup's cap; the app waits 12 s for the whole request
export const LINK_LIFETIME_MS = 365 * 24 * 60 * 60 * 1000; // v1.0.271 — decision 5: links last 12 months
const ID_RE = /^[A-Za-z0-9]{6,16}$/;
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'; // no 0/O/1/l/I
// v1.0.271 — 200 and 410 answers: a takedown or an expiry reaches the CDN's copy within an hour (was 86400, a day)
const SHARE_HEADERS = Object.freeze({ 'Cache-Control': 'public, max-age=3600', 'X-Robots-Tag': 'noindex' });

const clampInt = (v, max = 1_000_000) => Math.min(max, Math.max(0, parseInt(v, 10) || 0));

// v1.0.258 — optional per-entry details: i AniList id, m MAL id, k tier letter. Each is kept only when valid (the page
// re-checks with the same rules). v1.0.271 — f format, y year and n episodes are no longer kept: the page gets them
// from AniList by id, with the title and cover.
const TIERS = new Set(['S', 'A', 'B', 'C', 'D']);
const intIn = (v, min, max) => (Number.isInteger(v) && v >= min && v <= max ? v : undefined);
function entryDetails(a) {
  return Object.fromEntries(Object.entries({
    i: intIn(a.i, 1, 10_000_000), m: intIn(a.m, 1, 10_000_000), k: TIERS.has(a.k) ? a.k : undefined,
  }).filter(([, v]) => v !== undefined));
}

// Returns a cleaned copy of the payload, or null when it isn't a share payload.
// v1.0.271 — keeps only b, p:'mal' and top[{ r, e, i, m?, k? }]; an entry without an AniList id is dropped. u, ms and
// each entry's t, c, f, y and n are never kept (decision 30a): the name comes only from accountNameFromToken.
export function sanitisePayload(payload) {
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.top)) return null;
  const top = payload.top
    .filter(a => a && typeof a === 'object')
    .slice(0, MAX_ENTRIES)
    .map(a => ({ r: clampInt(a.r, 10_000), e: clampInt(a.e, 10_000), ...entryDetails(a) }))
    .filter(a => a.i);
  if (!top.length) return null;
  const out = { b: clampInt(payload.b), top };
  if (payload.p === 'mal') out.p = 'mal'; // v1.0.258 — MAL sharer: the page opens MyAnimeList where an entry has a MAL id
  return out;
}

// v1.0.271 — AniList usernames are letters and digits, MAL ones also _ and -; anything else is not shown.
const NAME_RE = /^[A-Za-z0-9_-]{1,40}$/;
const cleanName = (v) => (typeof v === 'string' && NAME_RE.test(v) ? v : '');

function aniListName(token, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ query: '{ Viewer { name } }' }),
    signal: controller.signal,
  })
    .then(res => (res.ok ? res.json() : null))
    .then(data => cleanName(data?.data?.Viewer?.name))
    .catch(() => '')
    .finally(() => clearTimeout(timer));
}

// Node's https module, as save-session.js does: MAL times out or blocks Netlify's servers on the global fetch.
function malName(token, timeoutMs) {
  return new Promise((resolve) => {
    const req = httpsRequest({
      hostname: 'api.myanimelist.net', path: '/v2/users/@me', method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try { resolve(res.statusCode === 200 ? cleanName(JSON.parse(data)?.name) : ''); } catch { resolve(''); }
      });
      res.on('error', () => resolve(''));
    });
    req.on('error', () => resolve(''));
    req.setTimeout(timeoutMs, () => { req.destroy(); resolve(''); });
    req.end();
  });
}

// v1.0.271 — the username a link shows: the AniList (token) or MyAnimeList (malToken) account the sign-in token
// belongs to, as that site reports it. '' on any failure or after timeoutMs. The token goes only to that site.
export async function accountNameFromToken({ token, malToken } = {}, timeoutMs = NAME_LOOKUP_MS) {
  try {
    if (typeof token === 'string' && token) return await aniListName(token, timeoutMs);
    if (typeof malToken === 'string' && malToken) return await malName(malToken, timeoutMs);
  } catch { /* '' below */ }
  return '';
}

// v1.0.271 — a token the lookup may use: a non-empty string no longer than MAX_TOKEN_CHARS (anything else is ignored).
const usableToken = (v) => (typeof v === 'string' && v.length > 0 && v.length <= MAX_TOKEN_CHARS ? v : undefined);

// v1.0.271 — decision 5: older than 365 days is expired. A missing or unreadable createdAt counts as not expired
// (links began in 1.0.249, so none is a year old yet).
export function isExpired(createdAt, now = Date.now()) {
  const t = Date.parse(createdAt);
  return Number.isFinite(t) && now - t > LINK_LIFETIME_MS;
}

export function newId(bytes = randomBytes(8)) {
  let s = '';
  for (const b of bytes) s += ALPHABET[b % ALPHABET.length];
  return s.slice(0, 8);
}

// The handler takes its store factory (and, since 1.0.271, the name lookup and its cap) as parameters so the tests
// can hand in an in-memory store and a stub; Netlify gets the real @netlify/blobs store and lookup below.
export function createHandler(storeFactory, lookupName = accountNameFromToken, { lookupMs = NAME_LOOKUP_MS } = {}) {
  return async (request, context) => {
  const url = new URL(request.url);

  if (request.method === 'GET') {
    const id = url.searchParams.get('id') || '';
    if (!ID_RE.test(id)) return Response.json({ error: 'Bad id' }, { status: 400 });
    try {
      const store = storeFactory({ name: STORE_NAME, context });
      // v1.0.253 — strong read: the default (eventual) read 404'd a new id for ~15 s after POST.
      // Strong needs the uncached edge URL; where the environment lacks it, read normally.
      let record;
      try {
        record = await store.get(id, { type: 'json', consistency: 'strong' });
      } catch (e) {
        if (e?.name !== 'BlobsConsistencyError') throw e;
        record = await store.get(id, { type: 'json' });
      }
      if (!record || !record.payload) return Response.json({ error: 'Not found' }, { status: 404 });
      // v1.0.271 — decision 5: a link stops working 12 months after it was made
      if (isExpired(record.createdAt)) return Response.json({ error: 'expired' }, { status: 410, headers: SHARE_HEADERS });
      // v1.0.271 — a v2 record is already IDs only; an older one loses its name, titles, covers and milestone text
      // here, and an old record with no AniList ids has nothing left to show
      const payload = record.v === 2 ? record.payload : sanitisePayload(record.payload);
      if (!payload) return Response.json({ error: 'unavailable' }, { status: 410, headers: SHARE_HEADERS });
      return Response.json(payload, { headers: SHARE_HEADERS });
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

  // v1.0.271 — decision 30a: the name shown is the account the sign-in token belongs to, looked up once, capped at
  // lookupMs (a lookup that never answers just leaves the link without a name). An app from before 1.0.271 sends no
  // token, so its link has no name. The token is not stored, logged or returned.
  const token = usableToken(body?.token);
  const malToken = token ? undefined : usableToken(body?.malToken);
  if (token || malToken) {
    let timer;
    const cap = new Promise(resolve => { timer = setTimeout(() => resolve(''), lookupMs); });
    const name = await Promise.race([
      Promise.resolve().then(() => lookupName(token ? { token } : { malToken }, lookupMs)).catch(() => ''),
      cap,
    ]).finally(() => clearTimeout(timer));
    const shown = cleanName(name);
    if (shown) payload.u = shown;
  }

  try {
    const store = storeFactory({ name: STORE_NAME, context });
    // 48+ bits of randomness — a collision is vanishingly unlikely, but a
    // second attempt costs nothing.
    // v1.0.253 — create-only write replaces read-then-write (that read could cache a 404 for the new id).
    // set(JSON string), not setJSON: in @netlify/blobs 10.7.4 setJSON drops onlyIfNew's if-none-match header.
    const rec = JSON.stringify({ v: 2, createdAt: new Date().toISOString(), payload }); // v1.0.271 — v2: IDs only
    for (let attempt = 0; attempt < 3; attempt++) {
      const id = newId();
      const { modified, etag } = await store.set(id, rec, { onlyIfNew: true });
      // v1.0.253 — @netlify/blobs reports modified:true for any non-412 status, so only an
      // etag proves the write landed; otherwise fail and the app says it couldn't create the link.
      if (modified && etag) return Response.json({ id });
      if (modified) return Response.json({ error: 'Write not confirmed' }, { status: 500 });
    }
    return Response.json({ error: 'Could not allocate an id' }, { status: 500 });
  } catch (e) {
    return Response.json({ error: 'Blob store error: ' + e.message }, { status: 500 });
  }
  };
}

export default createHandler(getStore);
