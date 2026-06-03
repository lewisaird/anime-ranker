// netlify/functions/push-send-invite.js
//
// POST /api/push-send-invite
// Body: {
//   token?     | malToken?    , // inviter's auth — server verifies
//   targetName: 'lewis-aird',   // invitee's AniList username
//   sessionCode: 'TM5Y5G8',     // the WT/LC join code
//   kind:       'wt' | 'lc',    // which feature is sending the invite
// }
//
// Flow:
//   1. Verify inviter's token → get inviter's userId + display name
//   2. Resolve targetName → invitee's userId
//   3. Load invitee's push subscription record
//   4. Check they've opted in for this category (watchTogether / liveChallenge)
//   5. Cooldown — same (inviter, invitee, code) triple within 60s is dropped
//   6. Send push with deep-link payload
//   7. Save the cooldown stamp + prune any 410 Gone subscriptions
//
// Failure modes (return as { ok: true, status: 'reason' } NOT errors —
// the inviter doesn't need to know whether the invitee exists, just whether
// the push could be delivered):
//   - 'no-subscription'    — invitee never opted into push
//   - 'opted-out'          — invitee disabled this category
//   - 'unknown-user'       — username didn't resolve on AniList
//   - 'cooldown'           — same invite was just sent
//   - 'sent'               — push delivered to ≥1 device
//   - 'self'               — inviter == invitee (typo / shared account)
//
// On 5xx error: returns { ok: false, error }.

import { getStore } from '@netlify/blobs';
import {
  resolveUserId,
  resolveAniListUsername,
  loadPushRecord,
  savePushRecord,
  sendPushToUser,
  PUSH_BLOB_STORE,
} from './_push-shared.js';

const COOLDOWN_MS = 60 * 1000;       // 1 minute between identical invites
const MAX_NAME_CHARS = 60;
const MAX_CODE_CHARS = 10;

const SAFE_KINDS = new Set(['wt', 'lc']);

function categoryFor(kind) {
  if (kind === 'wt') return 'watchTogether';
  if (kind === 'lc') return 'liveChallenge';
  return null;
}

async function fetchInviterDisplayName(token) {
  if (!token) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ query: '{ Viewer { name } }' }),
      signal: controller.signal,
    });
    const data = await res.json();
    return data?.data?.Viewer?.name || null;
  } catch { return null; } finally { clearTimeout(timer); }
}

export default async (request, context) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body;
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const { token, malToken, targetName, sessionCode, kind, fromName } = body;
  const category = categoryFor(kind);
  if (!category) {
    return Response.json({ error: 'Invalid kind' }, { status: 400 });
  }
  if (!targetName || typeof targetName !== 'string') {
    return Response.json({ error: 'targetName required' }, { status: 400 });
  }
  if (!sessionCode || typeof sessionCode !== 'string') {
    return Response.json({ error: 'sessionCode required' }, { status: 400 });
  }
  const cleanCode = sessionCode.trim().slice(0, MAX_CODE_CHARS).toUpperCase();
  const cleanName = targetName.trim().slice(0, MAX_NAME_CHARS);

  // Step 1 — verify inviter
  const inviterId = await resolveUserId({ token, malToken });
  if (!inviterId) return Response.json({ error: 'Invalid token' }, { status: 401 });

  // Step 2 — resolve target AniList username
  const inviteeId = await resolveAniListUsername(cleanName);
  if (!inviteeId) {
    return Response.json({ ok: true, status: 'unknown-user' });
  }
  if (inviteeId === inviterId) {
    return Response.json({ ok: true, status: 'self' });
  }

  // Step 3 — load invitee's subscription record
  const record = await loadPushRecord(inviteeId, context);
  if (!record.subscriptions.length) {
    return Response.json({ ok: true, status: 'no-subscription' });
  }
  if (!record.categories?.[category]) {
    return Response.json({ ok: true, status: 'opted-out' });
  }

  // Step 5 — cooldown check (after we know invitee exists + opted in)
  const cooldownStore = getStore({ name: PUSH_BLOB_STORE, context });
  const cdKey = `cooldown_${inviterId}_${inviteeId}_${cleanCode}`;
  const cdRaw = await cooldownStore.get(cdKey, { type: 'json' });
  const now = Date.now();
  if (cdRaw && (now - cdRaw.at) < COOLDOWN_MS) {
    return Response.json({ ok: true, status: 'cooldown' });
  }

  // Step 6 — send push
  const inviterName = (fromName && String(fromName).trim().slice(0, 60))
    || await fetchInviterDisplayName(token)
    || 'A Kessen user';
  const kindLabel = kind === 'wt' ? 'Watch Together' : 'Live Challenge';
  const payload = {
    kind:  `${kind}-invite`,
    title: `${inviterName} invited you to ${kindLabel}`,
    body:  `Tap to join session ${cleanCode}.`,
    url:   `/?${kind}=${encodeURIComponent(cleanCode)}`,
    tag:   `${kind}-${cleanCode}`,
    data:  { sessionCode: cleanCode, fromName: inviterName, kind },
  };

  let result;
  try {
    result = await sendPushToUser(record, payload);
  } catch (e) {
    return Response.json({ ok: false, error: e.message || 'Push send failed' }, { status: 500 });
  }

  // Step 7 — persist cooldown + prune any dead subscriptions
  await cooldownStore.setJSON(cdKey, { at: now });
  if (result.removed > 0) {
    await savePushRecord(inviteeId, record, context);
  }

  return Response.json({
    ok:     true,
    status: result.sent > 0 ? 'sent' : 'no-subscription',
    devices: result.sent,
  });
};
