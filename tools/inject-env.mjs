/**
 * inject-env.mjs
 *
 * Substitutes %%PLACEHOLDER%% tokens in app.js with real values from
 * environment variables. Run automatically by Netlify before publishing.
 *
 * Required env vars (set in Netlify → Site configuration → Environment variables):
 *   FIREBASE_API_KEY
 *   FIREBASE_AUTH_DOMAIN
 *   FIREBASE_DATABASE_URL
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_STORAGE_BUCKET
 *   FIREBASE_MESSAGING_SENDER_ID
 *   FIREBASE_APP_ID
 */

import { readFileSync, writeFileSync } from 'fs';

const VARS = {
  FIREBASE_API_KEY:             process.env.FIREBASE_API_KEY             || '',
  FIREBASE_AUTH_DOMAIN:         process.env.FIREBASE_AUTH_DOMAIN         || '',
  FIREBASE_DATABASE_URL:        process.env.FIREBASE_DATABASE_URL        || '',
  FIREBASE_PROJECT_ID:          process.env.FIREBASE_PROJECT_ID          || '',
  FIREBASE_STORAGE_BUCKET:      process.env.FIREBASE_STORAGE_BUCKET      || '',
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  FIREBASE_APP_ID:              process.env.FIREBASE_APP_ID              || '',
};

const missing = Object.entries(VARS).filter(([, v]) => !v).map(([k]) => k);
if (missing.length) {
  console.error('❌  Missing Firebase environment variables:', missing.join(', '));
  console.error('    Add them in Netlify → Site configuration → Environment variables.');
  process.exit(1);
}

let src = readFileSync('app.js', 'utf8');
for (const [key, val] of Object.entries(VARS)) {
  src = src.replaceAll(`%%${key}%%`, val);
}
writeFileSync('app.js', src, 'utf8');
console.log('✅  Firebase config injected into app.js');
