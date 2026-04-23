// ESLint flat config (§6.3.20) — pragmatic, catches real bugs without forcing
// a mass refactor. Three sections cover the three places JS lives in this
// repo: the main browser bundle (app.js), the service worker (sw.js), and
// the Node scripts under tools/, tests/, and netlify/functions/.
import globals from 'globals';

export default [
  // Global ignores — apply to every block below.
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'tools/screenshots/**', // generated assets, not source
      'styles.css',
    ],
  },

  // ── app.js ────────────────────────────────────────────────────────────────
  // Classic (non-module) browser script. Declarations at top level create
  // script-scope globals that the app's inline onclick= handlers resolve
  // against; ESLint sees them as "undefined" unless we whitelist or rely on
  // sourceType: 'script' + the browser globals bundle.
  {
    files: ['app.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.worker, // ClipboardItem + friends
        // App-level declarations referenced across the codebase; safer to
        // whitelist than to enable a rule that flags every top-level const.
        IDS: 'readonly',
        byId: 'readonly',
      },
    },
    rules: {
      // Correctness (errors — real bugs)
      'no-const-assign':     'error',
      'no-dupe-keys':        'error',
      'no-duplicate-case':   'error',
      'no-func-assign':      'error',
      'no-irregular-whitespace': 'error',
      'no-unreachable':      'error',
      'no-unsafe-negation':  'error',
      'use-isnan':           'error',
      'valid-typeof':        'error',
      // Style / hygiene (warnings — surfacing rot without blocking builds)
      'eqeqeq':              ['warn', 'smart'],
      'no-empty':            ['warn', { allowEmptyCatch: true }],
      'no-sparse-arrays':    'warn',
      // `vars: 'local'` is the critical knob for this file: app.js is a
      // classic script, so top-level declarations are script-globals — and
      // many of them are functions called ONLY from HTML inline onclick=
      // handlers. ESLint can't see those references, so without `local` it
      // would fire ~90 false-positive "never used" warnings on every run.
      // Args + catch params still get checked inside function bodies.
      'no-unused-vars':      ['warn', {
        vars: 'local',
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      }],
      'semi':                ['warn', 'always'],
      // Silence: `no-undef` would flame on every DOM global we haven't listed;
      // the `globals.browser` bundle covers the common ones but there are a
      // few (like gtag) that the app doesn't use anyway.
      'no-undef':            'off',
    },
  },

  // ── sw.js ─────────────────────────────────────────────────────────────────
  {
    files: ['sw.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'script',
      globals: { ...globals.serviceworker },
    },
    rules: {
      'no-const-assign': 'error',
      'no-dupe-keys':    'error',
      'no-unused-vars':  ['warn', { argsIgnorePattern: '^_' }],
      'eqeqeq':          ['warn', 'smart'],
      'semi':            ['warn', 'always'],
    },
  },

  // ── Node scripts (tools, tests, netlify functions) ────────────────────────
  {
    files: ['tools/**/*.{js,mjs}', 'tests/**/*.{js,mjs}', 'netlify/functions/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.node },
    },
    rules: {
      'no-const-assign':    'error',
      'no-dupe-keys':       'error',
      'no-duplicate-case':  'error',
      'no-unreachable':     'error',
      'use-isnan':          'error',
      'valid-typeof':       'error',
      'no-unused-vars':     ['warn', {
        argsIgnorePattern:       '^_',
        varsIgnorePattern:       '^_',
        caughtErrors:            'all',
        caughtErrorsIgnorePattern: '^_',
      }],
      'eqeqeq':             ['warn', 'smart'],
      'semi':               ['warn', 'always'],
    },
  },
];
