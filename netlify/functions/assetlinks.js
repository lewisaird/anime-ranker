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
        '08:FE:9A:8F:68:26:26:0B:92:5C:DC:3E:29:DB:D0:66:A0:51:6E:79:60:E8:08:F5:F1:01:20:37:24:AF:55:65',
      ],
    },
  }]),
});
