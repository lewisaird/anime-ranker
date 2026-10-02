#!/usr/bin/env node
// tools/metrics-report.mjs — aggregate feature-usage report from cloud saves.
//
// Kessen keeps lightweight usage counters per user (see `_metrics` in app.js:
// counters only, no timestamps per event, no PII). They ride along in each
// user's cloud save, which lives in the Netlify Blobs store
// `anime-elo-sessions` (NOT Firebase — Firebase only carries the sync ping).
// This script reads every session blob, aggregates the counters, and prints
// one report. Nothing per-user is printed: the point is keep/cut decisions on
// features, not looking at anyone's list.
//
// Usage (needs a Netlify personal access token + the site id; never commit
// either — pass them as environment variables):
//
//   NETLIFY_AUTH_TOKEN=… NETLIFY_SITE_ID=… node tools/metrics-report.mjs
//   NETLIFY_AUTH_TOKEN=… NETLIFY_SITE_ID=… node tools/metrics-report.mjs --json > report.json
//
// The site id is on the Netlify dashboard (Site configuration → Site details →
// Site ID); the token comes from User settings → Applications → Personal
// access tokens. Read access is all the script needs.

import { getStore } from '@netlify/blobs';

const STORE_NAME = 'anime-elo-sessions';
const DAY = 24 * 60 * 60 * 1000;

// Pure aggregation over an array of session objects (only the fields used
// here are read: metrics.counts, metrics.sessions, battleCount, animeList
// length, savedAt). Exported for the unit test.
export function aggregate(sessions, now = Date.now()) {
  const features = new Map(); // key → { total, users }
  let users = 0, active7 = 0, active30 = 0, battles = 0, sessionsTotal = 0;
  const listSizes = [], battleCounts = [];
  for (const s of sessions) {
    if (!s || typeof s !== 'object') continue;
    users++;
    const savedAt = Date.parse(s.savedAt || '') || 0;
    if (savedAt && now - savedAt <= 7 * DAY) active7++;
    if (savedAt && now - savedAt <= 30 * DAY) active30++;
    const bc = Number(s.battleCount) || 0;
    battles += bc; battleCounts.push(bc);
    listSizes.push(Array.isArray(s.animeList) ? s.animeList.length : 0);
    const m = s.metrics && typeof s.metrics === 'object' ? s.metrics : {};
    sessionsTotal += Number(m.sessions) || 0;
    for (const [key, n] of Object.entries(m.counts || {})) {
      const count = Number(n) || 0;
      if (count <= 0) continue;
      const f = features.get(key) || { total: 0, users: 0 };
      f.total += count; f.users++;
      features.set(key, f);
    }
  }
  const rows = [...features.entries()]
    .map(([key, f]) => ({ key, total: f.total, users: f.users, pctUsers: users ? Math.round((f.users / users) * 100) : 0, perUser: f.users ? +(f.total / f.users).toFixed(1) : 0 }))
    .sort((a, b) => b.users - a.users || b.total - a.total);
  return {
    users, active7, active30, battles, sessions: sessionsTotal,
    medianList: median(listSizes), medianBattles: median(battleCounts),
    features: rows,
  };
}

function median(arr) {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

export function formatReport(r) {
  const lines = [];
  lines.push(`Kessen usage report — ${new Date().toISOString().slice(0, 10)}`);
  lines.push(`Users with a cloud save: ${r.users}   active 7d: ${r.active7}   active 30d: ${r.active30}`);
  lines.push(`Battles (all users): ${r.battles}   median per user: ${r.medianBattles}   median list size: ${r.medianList}   app sessions: ${r.sessions}`);
  lines.push('');
  lines.push(pad('feature', 28) + pad('users', 8) + pad('% users', 9) + pad('total', 9) + 'per user');
  for (const f of r.features) {
    lines.push(pad(f.key, 28) + pad(String(f.users), 8) + pad(f.pctUsers + '%', 9) + pad(String(f.total), 9) + String(f.perUser));
  }
  if (!r.features.length) lines.push('(no counters found — metrics started shipping in 1.0.239)');
  return lines.join('\n');
}
const pad = (s, n) => String(s).padEnd(n);

async function main() {
  const siteID = process.env.NETLIFY_SITE_ID;
  const token  = process.env.NETLIFY_AUTH_TOKEN;
  if (!siteID || !token) {
    console.error('Set NETLIFY_SITE_ID and NETLIFY_AUTH_TOKEN in the environment (see the header of this file).');
    process.exit(2);
  }
  const store = getStore({ name: STORE_NAME, siteID, token });
  const sessions = [];
  let cursor;
  do {
    const page = await store.list({ cursor, paginate: false });
    for (const { key } of page.blobs || []) {
      if (!key.startsWith('session_')) continue;
      try { sessions.push(await store.get(key, { type: 'json' })); }
      catch { /* one unreadable blob shouldn't sink the report */ }
    }
    cursor = page.cursor;
  } while (cursor);
  const report = aggregate(sessions);
  if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else console.log(formatReport(report));
}

// Only run when executed directly (the test imports aggregate/formatReport).
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main().catch(e => { console.error('Report failed:', e.message); process.exit(1); });
}
