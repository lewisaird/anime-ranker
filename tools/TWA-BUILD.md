# TWA build & verification

How to wrap Kessen as a Trusted Web Activity for Google Play. This file captures
the exact values to keep the wrapper in lockstep with the web app.

The TWA wrapper lives in a **separate Android project**, not in this repo.
Generate / update it with [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap).

---

## One-time generate

    npm install -g @bubblewrap/cli
    bubblewrap init --manifest https://kessen.co.uk/manifest.json

Bubblewrap will ask a series of questions. Use the values in the
[reference config](#reference-configuration) below when prompted.

## Build

    cd /path/to/kessen-twa-wrapper
    bubblewrap build

Outputs `app-release-bundle.aab` (what Play wants) and
`app-release-signed.apk` (for local `adb install` testing).

## Update (after any change to manifest.json or version)

    bubblewrap update
    bubblewrap build

`bubblewrap update` re-reads `https://kessen.co.uk/manifest.json` and pulls in
any new icon / shortcut / colour values. Re-sign by re-running `build`.

---

## Play Store target-SDK requirement

Google's floor as of **Aug 2025**: new submissions must target **API 34+**
(Android 14). App updates must follow the same floor from **Nov 2025**.
Future bumps happen roughly yearly; always check
[Play Console target API requirements](https://developer.android.com/distribute/best-practices/develop/target-sdk)
before a release.

Bubblewrap's generated `build.gradle` sets this. After `bubblewrap init`,
confirm the value:

    grep -E 'targetSdkVersion|compileSdkVersion' app/build.gradle

Both should read `34` or higher. If not, bump them and re-run `bubblewrap build`.

---

## Signing — where the assetlinks SHA comes from

1. Create the upload keystore **once**, keep it safe:

        keytool -genkey -v -keystore android.keystore \
                -alias android -keyalg RSA -keysize 2048 -validity 10000

2. First upload to Play Console enrols you in **Play App Signing**. Google
   now holds the *signing key* (separate from your *upload key*). After
   enrolment, the SHA that must appear in
   `.well-known/assetlinks.json` is the **App Signing Key SHA**, which
   Play Console shows at:

   *Setup → App integrity → App signing key certificate → SHA-256
   certificate fingerprint.*

3. Update `.well-known/assetlinks.json` and run
   `tools/verify-assetlinks.sh --sha '<that SHA>' --remote` after deploying.

A mismatch shows a browser URL bar inside the TWA shell (the "unverified"
chrome) and is the #1 cause of Play Store rejection for PWAs.

---

## Reference configuration

Merge these into the TWA project's `twa-manifest.json`. Any field not listed
here can keep Bubblewrap's defaults.

```jsonc
{
  "packageId":        "uk.co.kessen.app",
  "host":             "kessen.co.uk",
  "name":             "Kessen",
  "launcherName":     "Kessen",
  "display":          "standalone",
  "orientation":      "any",
  "themeColor":       "#161b22",
  "backgroundColor":  "#0d1117",
  "navigationColor":  "#0d1117",
  "startUrl":         "/?source=twa",
  "webManifestUrl":   "https://kessen.co.uk/manifest.json",
  "fullScopeUrl":     "https://kessen.co.uk/",
  "iconUrl":          "https://kessen.co.uk/icon-512.png",
  "maskableIconUrl":  "https://kessen.co.uk/icon-512.png",
  "enableNotifications": false,
  "fallbackType":     "customtabs",
  "minSdkVersion":    21,
  "targetSdkVersion": 34,
  "appVersionName":   "1.0.0",
  "appVersionCode":   1,
  "shortcuts": [
    { "name": "Continue battling", "shortName": "Battle",
      "url": "/?action=battle",    "chosenIconUrl": "https://kessen.co.uk/icon-192.png" },
    { "name": "See rankings",      "shortName": "Rankings",
      "url": "/?action=rankings",  "chosenIconUrl": "https://kessen.co.uk/icon-192.png" }
  ]
}
```

### Version bump protocol

Each Play release must have a **monotonically increasing** `appVersionCode`
(an integer). `appVersionName` should match `package.json > version` in this
repo and the `<meta name="version">` tag in `index.html`.

    package.json                         1.0.3
    sw.js            APP_VERSION         1.0.3
    index.html       <meta name=version> 1.0.3
    twa-manifest.json appVersionName     1.0.3
    twa-manifest.json appVersionCode     4     ← increments by 1 per release

---

## Pre-submission checklist

- [ ] `bubblewrap update && bubblewrap build` produced a fresh `.aab`.
- [ ] `app/build.gradle` targets API 34+.
- [ ] `appVersionName` matches the four lockstep places above.
- [ ] `appVersionCode` is greater than the previously-uploaded Play bundle.
- [ ] `./tools/verify-assetlinks.sh --sha '<App Signing Key SHA>' --remote` passes.
- [ ] TWA smoke-test on a real device (see `tools/TWA-OAUTH-TEST.md`).
- [ ] Play Console privacy policy URL set to `https://kessen.co.uk/privacy.html`.
- [ ] Content rating questionnaire completed (`isAdult: true` titles are
      filtered in the AniList fetch, so the honest answer to "sexual content"
      is *no*).
