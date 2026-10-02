#!/usr/bin/env bash
# tools/verify-assetlinks.sh
#
# Verifies that /.well-known/assetlinks.json contains the correct SHA-256
# fingerprint for the Android App Signing Key registered in Play Console.
#
# A wrong SHA shows a browser URL bar in the TWA shell ("verified apps lock
# off") and is the #1 reason Play reviewers reject PWA submissions.
#
# ─── Usage ──────────────────────────────────────────────────────────────────
#
# Mode 1 — check against a local keystore (upload key pre-Play enrolment):
#     ./tools/verify-assetlinks.sh --keystore path/to/upload-key.keystore --alias android
#
# Mode 2 — check against a SHA pasted from Play Console (post enrolment):
#     ./tools/verify-assetlinks.sh --sha 'AB:CD:...:12'
#
# Mode 3 — also verify the deployed file at kessen.co.uk matches the committed one:
#     ./tools/verify-assetlinks.sh --sha 'AB:...:12' --remote
#
# ─── Which SHA is the right one? ────────────────────────────────────────────
#
# After enrolling in Play App Signing (default for new apps since Aug 2021),
# Google holds the real App Signing Key. The SHA that must appear in
# assetlinks.json is the *App Signing Key* SHA, NOT the upload key.
#
# Find it in: Play Console → your app → Setup → App integrity →
#             "App signing key certificate" → SHA-256 certificate fingerprint
#
# Pre-enrolment (first upload only), the upload keystore fingerprint doubles
# as the signing key.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ASSETLINKS="$REPO_ROOT/.well-known/assetlinks.json"
REMOTE_URL="https://kessen.co.uk/.well-known/assetlinks.json"

KEYSTORE=""
ALIAS=""
EXPECTED_SHA=""
CHECK_REMOTE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --keystore) KEYSTORE="$2"; shift 2 ;;
    --alias)    ALIAS="$2"; shift 2 ;;
    --sha)      EXPECTED_SHA="$2"; shift 2 ;;
    --remote)   CHECK_REMOTE=1; shift ;;
    -h|--help)
      sed -n '2,30p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *) echo "Unknown flag: $1" >&2; exit 2 ;;
  esac
done

if [[ ! -f "$ASSETLINKS" ]]; then
  echo "✖ $ASSETLINKS not found" >&2
  exit 1
fi

# Extract the committed SHA(s) from the assetlinks file.
COMMITTED_SHAS="$(
  python3 -c '
import json, sys
with open(sys.argv[1]) as f:
    data = json.load(f)
for entry in data:
    for s in entry.get("target", {}).get("sha256_cert_fingerprints", []):
        print(s.upper())
' "$ASSETLINKS"
)"

if [[ -z "$COMMITTED_SHAS" ]]; then
  echo "✖ No SHA fingerprints found in $ASSETLINKS" >&2
  exit 1
fi

echo "Committed SHA(s) in $(basename "$ASSETLINKS"):"
echo "$COMMITTED_SHAS" | sed 's/^/  • /'
echo

# ─── Extract expected SHA ──────────────────────────────────────────────────
if [[ -n "$KEYSTORE" ]]; then
  if [[ -z "$ALIAS" ]]; then
    echo "✖ --keystore requires --alias" >&2
    exit 2
  fi
  command -v keytool >/dev/null || { echo "✖ 'keytool' not on PATH. Install a JDK." >&2; exit 1; }
  echo "→ Reading SHA-256 from $KEYSTORE (alias=$ALIAS)"
  EXPECTED_SHA="$(
    keytool -list -v -keystore "$KEYSTORE" -alias "$ALIAS" 2>/dev/null \
      | awk -F': ' '/SHA256:/ {print $2; exit}'
  )"
  if [[ -z "$EXPECTED_SHA" ]]; then
    echo "✖ keytool did not emit a SHA256 line (wrong password / alias?)" >&2
    exit 1
  fi
fi

if [[ -z "$EXPECTED_SHA" ]]; then
  echo "✖ Supply one of --keystore+--alias or --sha" >&2
  exit 2
fi

EXPECTED_SHA="$(echo "$EXPECTED_SHA" | tr '[:lower:]' '[:upper:]' | tr -d '[:space:]')"
echo "Expected SHA (from signing key): $EXPECTED_SHA"
echo

# ─── Compare ───────────────────────────────────────────────────────────────
MATCH=0
while IFS= read -r sha; do
  [[ "$sha" == "$EXPECTED_SHA" ]] && MATCH=1
done <<< "$COMMITTED_SHAS"

if [[ $MATCH -eq 1 ]]; then
  echo "✓ Match: assetlinks.json contains the expected signing key SHA."
else
  echo "✖ Mismatch: expected SHA is NOT in assetlinks.json." >&2
  echo "  Fix: update .well-known/assetlinks.json and redeploy, or upload the matching keystore." >&2
  exit 1
fi

# ─── Remote drift check ────────────────────────────────────────────────────
if [[ $CHECK_REMOTE -eq 1 ]]; then
  echo
  echo "→ Fetching deployed copy: $REMOTE_URL"
  REMOTE_JSON="$(curl -fsSL -H 'Accept: application/json' "$REMOTE_URL")"
  CT="$(curl -fsSLI "$REMOTE_URL" | awk -F': ' '/^[Cc]ontent-[Tt]ype/ {print tolower($2)}' | tr -d '\r\n')"
  if [[ "$CT" != *"application/json"* ]]; then
    echo "⚠ Deployed Content-Type is '$CT' — Play expects application/json." >&2
  fi

  # Simple textual diff (normalise whitespace)
  LOCAL_NORM="$(python3 -c 'import json,sys; print(json.dumps(json.load(open(sys.argv[1])), sort_keys=True))' "$ASSETLINKS")"
  REMOTE_NORM="$(echo "$REMOTE_JSON" | python3 -c 'import json,sys; print(json.dumps(json.load(sys.stdin), sort_keys=True))')"
  if [[ "$LOCAL_NORM" == "$REMOTE_NORM" ]]; then
    echo "✓ Deployed assetlinks.json matches the committed file."
  else
    echo "✖ Deployed assetlinks.json differs from the committed file." >&2
    diff <(echo "$LOCAL_NORM") <(echo "$REMOTE_NORM") || true
    exit 1
  fi
fi

echo
echo "✓ All assetlinks checks passed."
