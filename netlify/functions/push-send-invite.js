// netlify/functions/push-send-invite.js
//
// v1.0.272 — invites by username are gone (decision 30b): every request gets 410 with a readable error, and nothing
// is read or written. Players send the join link instead (Copy join link in Watch Together and Live Challenge).
// The file is kept, not deleted, so an app copy from before 1.0.272 (a tab or the Android app left open across the
// upload) gets this answer and shows `error` in its invite box, instead of a 404 it reads as "Could not send".
// Invite records it kept before (cooldown_<inviter>_<invitee>_<code> in the kessen-push store) are still removed by
// Delete all (delete-session) and the admin delete, through deleteInviteStamps in _push-shared.js.

// v1.0.272 — the error names the code as well as the link: a Watch Together lobby before 1.0.272 shows only the code
// (Copy join link is new in 1.0.272); Live Challenge had Copy link
const REMOVED = {
  ok: false,
  status: 'removed',
  error: 'Invites by username have been removed. Share the session code or join link instead.',
};

export default async () => Response.json(REMOVED, { status: 410 });
