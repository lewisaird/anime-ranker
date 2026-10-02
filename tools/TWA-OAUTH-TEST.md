# TWA OAuth smoke-test

End-to-end test plan for the two OAuth flows running inside the Android TWA
wrapper. This MUST pass before submitting a build to the Play Store.

Why it matters: `window.open()` inside a TWA opens a Chrome Custom Tab, not a
popup. The desktop popup-postMessage flow silently hangs on Android. The TWA
code path skips the popup and does a full-page redirect (`IS_TWA` branch in
`index.html`). This test confirms that branch actually fires and that the
Chrome Custom Tab → verified-origin intent → TWA deep-link round-trip works.

---

## Prerequisites

- Android device (or emulator) running Android 7.0+ with Chrome ≥ 88 installed.
- A debug build of the TWA (`bubblewrap build` then `adb install
  app-release-signed.apk`), **or** the published Play store build.
- `.well-known/assetlinks.json` deployed and serving the matching SHA
  (`./tools/verify-assetlinks.sh --sha '<App Signing Key SHA>' --remote`).
- USB debugging enabled (for `adb logcat`) so you can observe Chrome errors.

If the assetlinks SHA is wrong, a URL bar will appear above the TWA content —
that's the smoking gun. Fix before proceeding.

---

## Test 1 — AniList login (fresh install)

1. Uninstall any existing build: `adb uninstall uk.co.kessen.app`.
2. Install the build: `adb install app-release-signed.apk`.
3. Launch Kessen from the app drawer. Expected: app opens chrome-less
   (no URL bar, no browser buttons).
4. Tap **Log in with AniList**. Expected:
   - Button reads `⏳ Redirecting…` briefly.
   - Chrome Custom Tab opens at `anilist.co/api/v2/oauth/authorize?...`
     (URL bar visible — this is correct, AniList is unverified).
5. Enter your AniList credentials. Authorize the app.
6. AniList redirects to `https://kessen.co.uk/?code=...&state=...`.
   Expected: the Custom Tab closes automatically and you land back in the
   TWA, which shows `⏳ Logging in…` then `Loading your list…`.
7. Confirm your list loads. Confirm your display name and avatar appear in
   the header.

**Pass criteria:** Button never stuck on `Waiting for AniList…`, URL bar
never appears on `kessen.co.uk` pages, final state is an authenticated
session with list loaded.

---

## Test 2 — MyAnimeList login

Repeat Test 1 with **Log in with MyAnimeList** in the sync modal.

Additional checks:
- The PKCE `code_verifier` must survive the redirect. If you see
  "PKCE code_verifier missing" in logcat or on screen, sessionStorage
  did not persist across the Chrome Custom Tab round-trip — file a bug.
- Token exchange goes through the Netlify function
  `/.netlify/functions/mal-token`. Check `adb logcat *:S chromium` for
  any 4xx responses.

---

## Test 3 — Re-launch with existing session

1. With an authenticated session from Test 1 or 2, force-stop the app:
   `adb shell am force-stop uk.co.kessen.app`.
2. Re-launch from the drawer. Expected: the app loads directly into the
   logged-in state (auth token persisted in localStorage). No login
   prompt, no loading spinner longer than a list fetch.

---

## Test 4 — Logout + re-login

1. Open the header menu. Tap **Logout**.
2. Tap **Log in with AniList** again. Repeat Test 1 steps 4-7.
3. Confirm the previous user's data is not shown transiently during the
   re-login.

---

## Test 5 — Popup fallback sanity (desktop)

On a desktop browser, `_isInTWA()` must return `false`. The popup path
should still work there.

1. Open `https://kessen.co.uk/` in desktop Chrome.
2. Tap **Log in with AniList**. A 600×720 popup should open.
3. Authorize. Popup should close, main window should show logged-in state.

This is a regression guard — the TWA change must not break the desktop flow.

---

## Debugging

| Symptom | Likely cause |
| ------- | ------------ |
| URL bar appears on `kessen.co.uk` pages | assetlinks SHA mismatch |
| Button stuck on `⏳ Waiting for AniList…` | `IS_TWA` returned false (TWA not detected); check `document.referrer` and `?source=twa` in start_url |
| `⏳ Redirecting…` but Custom Tab never returns | AniList redirect URL mismatch (must exactly equal `https://kessen.co.uk/`) |
| Token exchange fails after redirect back | sessionStorage lost between TWA → Custom Tab → TWA; dig into `adb logcat` |
| App goes white after redirect | Service worker serving stale shell; hard-refresh (`adb shell am start -a android.intent.action.VIEW -d "https://kessen.co.uk/?nocache=1" uk.co.kessen.app`) |

### Inspecting the TWA via DevTools

    chrome://inspect/#devices   (desktop Chrome)

The running TWA shows up as a debuggable WebContents. You can inspect
`sessionStorage`, `localStorage`, `document.referrer`, and the `IS_TWA`
const directly.

---

## Known-good values

After successful login you should see, in DevTools console on the TWA:

    document.referrer              → "android-app://uk.co.kessen.app"
    sessionStorage.kessen_is_twa   → "1"
    IS_TWA                         → true
    localStorage.anime_elo_auth    → '{"token":"...","user":{...},"saved":...}'

If `document.referrer` is empty and `?source=twa` isn't in the URL,
`IS_TWA` will be false and the popup path will be taken — that's a
Bubblewrap misconfiguration (`start_url` in `manifest.json` isn't
appending the source tag, or the TWA wrapper is stripping it).
