// firebase-config.js
// Serves the Firebase client config from Netlify environment variables.
// Keeps the API key out of the static bundle so it's never in source control
// or scanned by Netlify's secrets controller.
//
// Called by app.js on page load via fetch('/.netlify/functions/firebase-config').

exports.handler = async () => {
  const config = {
    apiKey:            process.env.FIREBASE_API_KEY             || '',
    authDomain:        process.env.FIREBASE_AUTH_DOMAIN         || '',
    databaseURL:       process.env.FIREBASE_DATABASE_URL        || '',
    projectId:         process.env.FIREBASE_PROJECT_ID          || '',
    storageBucket:     process.env.FIREBASE_STORAGE_BUCKET      || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId:             process.env.FIREBASE_APP_ID              || '',
  };

  // If env vars aren't configured (local dev without .env), return an empty config.
  // The client will see _FIREBASE_READY = false and silently disable Firebase features.
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      // Short cache — the config never changes, but we don't want a stale key
      // stuck in a CDN if the project is ever rotated.
      'Cache-Control': 'public, max-age=300',
    },
    body: JSON.stringify(config),
  };
};
