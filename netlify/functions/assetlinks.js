// netlify/functions/assetlinks.js
//
// Serves /.well-known/assetlinks.json via the redirect in netlify.toml.
// The .well-known folder is hidden and can't be pushed via GitHub's web UI,
// so the fingerprint is hardcoded here instead. Update this if you rotate
// your signing key.

exports.handler = async () => ({
  statusCode: 200,
  headers: {
    'Content-Type':  'application/json',
    'Cache-Control': 'public, max-age=3600, must-revalidate',
    'X-Robots-Tag':  'noindex',
  },
  body: JSON.stringify([{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'uk.co.kessen.app',
      sha256_cert_fingerprints: [
        // Upload key certificate (v1.0.180) — the local signing.keystore
        // used by PWA Builder when building the AAB. This is what local
        // sideloaded installs are signed with. Kept here so dev builds also
        // verify as TWA.
        '9D:67:0F:C3:C7:1E:89:EE:12:D7:D9:BB:59:72:4E:D4:55:EE:CF:7D:AA:0F:EF:31:E0:4F:56:2D:D2:50:56:C0',
        // App signing key certificate (v1.0.198) — Google's Play App
        // Signing key. When users install from Play Store, Google
        // re-signs the binary with THIS cert (not the upload cert) before
        // shipping it to the device. Android's TWA verifier checks
        // against whatever cert actually signed the installed APK, so
        // installs from Play Store need this fingerprint to verify.
        // Pre-fix, the TWA fell back to Custom Tabs mode — visible URL
        // bar, push notifications routed through Chrome instead of the
        // app. SHA copied directly from Play Console → Protected with
        // Play → App signing → App signing key certificate.
        '9F:00:20:26:8C:E4:D8:49:C2:38:3B:DD:BB:F8:61:C7:0F:22:E6:92:D2:28:39:5E:54:D7:0E:45:91:9B:6B:96',
      ],
    },
  }]),
});
