// netlify/functions/assetlinks.js
//
// Serves /.well-known/assetlinks.json via the redirect in netlify.toml.
// The SHA fingerprint is the source of truth in .well-known/assetlinks.json —
// we `require()` it here so esbuild inlines the content at build time and the
// two files can never drift. To rotate the key, edit the JSON file only;
// redeploying will pick it up automatically.
const assetlinks = require('../../.well-known/assetlinks.json');

exports.handler = async () => ({
  statusCode: 200,
  headers: {
    'Content-Type':  'application/json',
    'Cache-Control': 'public, max-age=3600, must-revalidate',
    'X-Robots-Tag':  'noindex',
  },
  body: JSON.stringify(assetlinks),
});
