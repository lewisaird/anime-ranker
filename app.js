// Kessen — app.js
// Extracted from index.html by §6.2.15 refactor. See CHANGELOG.
// Shipped as a classic (non-module) script so existing inline onclick
// handlers continue to resolve against window-scoped functions.

// ─── DOM-ID REGISTRY (§4.2.15) ─────────────────────────────────────────────
// Every HTML `id` the script touches is declared once here; reference it via
// the frozen object below and call byId(...) instead of document.getElementById.
// A typo on the registry becomes `undefined` immediately, not a silent null.
const IDS = Object.freeze({
  achievementsContent:    'achievements-content',
  anilistA:               'anilist-a',
  anilistB:               'anilist-b',
  anilistNewHint:         'anilist-new-hint',
  archiveConfirmList:     'archive-confirm-list',
  archiveConfirmModal:    'archive-confirm-modal',
  authBadgeAvatar:        'auth-badge-avatar',
  authBadgeName:          'auth-badge-name',
  authErrorMsg:           'auth-error-msg',
  authHdrAvatar:          'auth-hdr-avatar',
  authHdrName:            'auth-hdr-name',
  authHeaderBadge:        'auth-header-badge',
  authLoginBtn:           'auth-login-btn',
  authUsernameBadge:      'auth-username-badge',
  backupImportInput:      'backup-import-input',
  backupImportMsg:        'backup-import-msg',
  battlePromptH2:         'battle-prompt-h2',
  battlePromptP:          'battle-prompt-p',
  battleScreen:           'battle-screen',
  blindBanner:            'blind-banner',
  cardA:                  'card-a',
  cardB:                  'card-b',
  changeUserBtn:          'change-user-btn',
  cloudSyncBtns:          'cloud-sync-btns',
  cloudSyncIndicator:     'cloud-sync-indicator',
  compatResults:          'compat-results',
  compatUsernameInput:    'compat-username-input',
  confirmModal:           'confirm-modal',
  confirmModalBody:       'confirm-modal-body',
  confirmModalOk:         'confirm-modal-ok',
  confirmModalTitle:      'confirm-modal-title',
  copyBtn:                'copy-btn',
  detailModal:            'detail-modal',
  disagreeEloHigher:      'disagree-elo-higher',
  disagreeScoreHigher:    'disagree-score-higher',
  discoverRefreshBtn:     'discover-refresh-btn',
  eloA:                   'elo-a',
  eloB:                   'elo-b',
  epMetaA:                'ep-meta-a',
  epMetaB:                'ep-meta-b',
  errorMsg:               'error-msg',
  excludedList:           'excluded-list',
  exportArea:             'export-area',
  exportImageBtn:         'export-image-btn',
  friendRecsInput:        'friend-recs-input',
  friendRecsResults:      'friend-recs-results',
  fuzzyA:                 'fuzzy-a',
  fuzzyB:                 'fuzzy-b',
  fuzzyFilterBtn:         'fuzzy-filter-btn',
  genreDiveGrid:          'genre-dive-grid',
  genreDiveHeading:       'genre-dive-heading',
  guestMergeDetail:       'guest-merge-detail',
  guestMergeModal:        'guest-merge-modal',
  guestMergeSub:          'guest-merge-sub',
  helpAnilistSection:     'help-anilist-section',
  helpAnilistSection2:    'help-anilist-section-2',
  helpMalSection:         'help-mal-section',
  helpModal:              'help-modal',
  hiddenGemsGrid:         'hidden-gems-grid',
  historyList:            'history-list',
  historySearch:          'history-search',
  imgA:                   'img-a',
  imgB:                   'img-b',
  kbFirstTip:             'kb-first-tip',
  langToggleBtn:          'lang-toggle-btn',
  loadingCancelBtn:       'loading-cancel-btn',
  loadingMsg:             'loading-msg',
  longPressTip:           'long-press-tip',
  malAuthBadge:           'mal-auth-badge',
  malBadgeAvatar:         'mal-badge-avatar',
  malBadgeName:           'mal-badge-name',
  malContinueBtn:         'mal-continue-btn',
  malFileInput:           'mal-file-input',
  malHdrAvatar:           'mal-hdr-avatar',
  malHdrName:             'mal-hdr-name',
  malHeaderBadge:         'mal-header-badge',
  malNewHint:             'mal-new-hint',
  malOauthBtn:            'mal-oauth-btn',
  malOauthSeedNote:       'mal-oauth-seed-note',
  malSyncActionBtns:      'mal-sync-action-btns',
  malSyncBarFill:         'mal-sync-bar-fill',
  malSyncCountLabel:      'mal-sync-count-label',
  malSyncDoneMsg:         'mal-sync-done-msg',
  malSyncModal:           'mal-sync-modal',
  malSyncPreviewWrap:     'mal-sync-preview-wrap',
  malSyncProgressText:    'mal-sync-progress-text',
  malSyncProgressWrap:    'mal-sync-progress-wrap',
  malSyncRetryBtn:        'mal-sync-retry-btn',
  malWarmStartChk:        'mal-warm-start-chk',
  manageAnilistSection:   'manage-anilist-section',
  manageMalSection:       'manage-mal-section',
  milestoneOverlay:       'milestone-overlay',
  modalAnilistBtn:        'modal-anilist-btn',
  modalConfidenceWrap:    'modal-confidence-wrap',
  modalCover:             'modal-cover',
  modalDescription:       'modal-description',
  modalEloVal:            'modal-elo-val',
  modalGenres:            'modal-genres',
  modalLosses:            'modal-losses',
  modalMetaLine:          'modal-meta-line',
  modalRankLine:          'modal-rank-line',
  modalRecent:            'modal-recent',
  modalSparkline:         'modal-sparkline',
  modalSparklineWrap:     'modal-sparkline-wrap',
  modalTitle:             'modal-title',
  modalUnfuzzyBtn:        'modal-unfuzzy-btn',
  modalWinrateVal:        'modal-winrate-val',
  modalWins:              'modal-wins',
  modeBtn:                'mode-btn',
  modePopover:            'mode-popover',
  msEmoji:                'ms-emoji',
  msMsg:                  'ms-msg',
  msTitle:                'ms-title',
  msTop5:                 'ms-top5',
  newAnimeBanner:         'new-anime-banner',
  newAnimeMsg:            'new-anime-msg',
  oauthSeedNote:          'oauth-seed-note',
  poolWarningBanner:      'pool-warning-banner',
  poolWarningText:        'pool-warning-text',
  predictorDropdown:      'predictor-dropdown',
  predictorInput:         'predictor-input',
  predictorResults:       'predictor-results',
  predictorSection:       'predictor-section',
  progressBar:            'progress-bar',
  progressInfo:           'progress-info',
  rankingList:            'ranking-list',
  rankingTable:           'ranking-table',
  rankingTableBody:       'ranking-table-body',
  rankingTableWrap:       'ranking-table-wrap',
  recsGrid:               'recs-grid',
  recsSubText:            'recs-sub-text',
  recsTabForyou:          'recs-tab-foryou',
  recsTabPredict:         'recs-tab-predict',
  recsTabSeasonal:        'recs-tab-seasonal',
  refreshListBtn:         'refresh-list-btn',
  refreshListMalBtn:      'refresh-list-mal-btn',
  refreshMetadataBtn:     'refresh-metadata-btn',
  refreshMetadataMsg:     'refresh-metadata-msg',
  removedAnimeBanner:     'removed-anime-banner',
  removedAnimeMsg:        'removed-anime-msg',
  reseedAnilistBtn:       'reseed-anilist-btn',
  reseedMalBtn:           'reseed-mal-btn',
  resultsScreen:          'results-screen',
  resultsSubtitle:        'results-subtitle',
  rivalryList:            'rivalry-list',
  rivalrySection:         'rivalry-section',
  savedComparisons:       'saved-comparisons',
  searchInput:            'search-input',
  sessionSummaryList:     'session-summary-list',
  sessionSummaryModal:    'session-summary-modal',
  sessionSummarySubtitle: 'session-summary-subtitle',
  settleBanner:           'settle-banner',
  shareCopyImageBtn:      'share-copy-image-btn',
  sharedList:             'shared-list',
  sharedSubtitle:         'shared-subtitle',
  sharedTitle:            'shared-title',
  shareModal:             'share-modal',
  sharePrimaryBtn:        'share-primary-btn',
  shareUrl:               'share-url',
  skipBtn:                'skip-btn',
  socialPlatformRow:      'social-platform-row',
  spAnilist:              'sp-anilist',
  spMal:                  'sp-mal',
  statBestWinrate:        'stat-best-winrate',
  statEraChart:           'stat-era-chart',
  statFormatChart:        'stat-format-chart',
  statFuzzy:              'stat-fuzzy',
  statGenreChart:         'stat-genre-chart',
  statMostBattled:        'stat-most-battled',
  statScoreDist:          'stat-score-dist',
  statStability:          'stat-stability',
  statStudioAffinity:     'stat-studio-affinity',
  statTotalBattles:       'stat-total-battles',
  statUpsets:             'stat-upsets',
  syncActionBtns:         'sync-action-btns',
  syncBarFill:            'sync-bar-fill',
  syncCountLabel:         'sync-count-label',
  syncDoneMsg:            'sync-done-msg',
  syncModal:              'sync-modal',
  syncPreviewWrap:        'sync-preview-wrap',
  syncProgressText:       'sync-progress-text',
  syncProgressWrap:       'sync-progress-wrap',
  syncRetryBtn:           'sync-retry-btn',
  synopsisA:              'synopsis-a',
  synopsisB:              'synopsis-b',
  tabPanelAchievements:   'tab-panel-achievements',
  tabPanelSocial:         'tab-panel-social',
  thSc:                   'th-sc',
  titleA:                 'title-a',
  titleB:                 'title-b',
  toast:                  'toast',
  towerAnimeList:         'tower-anime-list',
  towerFirstTip:          'tower-first-tip',
  towerModal:             'tower-modal',
  towerProgressBar:       'tower-progress-bar',
  towerProgressWrap:      'tower-progress-wrap',
  towerResultsList:       'tower-results-list',
  towerSearch:            'tower-search',
  towerStatus:            'tower-status',
  towerSummaryScreen:     'tower-summary-screen',
  towerSummarySub:        'tower-summary-sub',
  towerSummaryTitle:      'tower-summary-title',
  undoBtn:                'undo-btn',
  usernameInput:          'username-input',
  viewGridBtn:            'view-grid-btn',
  viewListBtn:            'view-list-btn',
  warmStartChk:           'warm-start-chk',
  welcomeModal:           'welcome-modal',
});

// Shorthand for document.getElementById — paired with IDS.* to make a typo in
// an ID an immediate undefined reference rather than a silent null element.
const byId = (id) => document.getElementById(id);

// ─── CONFIG ────────────────────────────────────────────────────────────────
const K = 32;           // ELO K-factor
const ELO_FLOOR = 400;  // minimum ELO — prevents outliers from being buried indefinitely
const TARGET_BATTLES_PER_ANIME = 10; // battles each anime needs to be "confident" — used for progress bar & confidence labels

// ─── STATE ─────────────────────────────────────────────────────────────────
let animeList    = [];
let battleCount  = 0;
let currentA     = null;
let currentB     = null;
let saveKey      = '';
let prevState       = null;  // kept for back-compat (skipBattle still uses this directly)
let undoStack       = [];    // stack of up to MAX_UNDO_DEPTH snapshots (most recent last)
const MAX_UNDO_DEPTH = 5;
let nextPairOverride = null; // [idxA, idxB] — used once after an undo to restore the original "next" pair
let battleHistory   = [];    // [{winnerTitle, loserTitle, winnerEloAfter, loserEloAfter, eloSwing}]
const MAX_HISTORY   = 1000;
let excludedIds     = new Set(); // anime IDs permanently removed from battle pool
let hiddenFormats   = new Set(); // formats hidden from battles AND rankings (e.g. 'OVA', 'ONA')
let hiddenEpRanges  = new Set(); // episode-length buckets hidden from rankings
let _pendingNewAnime    = [];    // anime on AniList not yet in rankings (new anime detection)
let _pendingRemovedAnime = [];   // anime in rankings but no longer on the external list (§5.2.7)
let _newAnimePollingTimer = null;
let preferRomaji    = false;     // title language preference
let currentSort     = 'elo';     // active sort in rankings view
let sortAsc         = false;     // false = descending (highest first)
let _renderGen      = 0;         // cancel in-flight chunked grid renders
let _vsTableData    = [];        // pre-computed rows for table virtual scroll
let _vsScrollRaf    = null;      // rAF handle for table scroll throttling
const VS_ROW_H      = 54;        // estimated table row height in px
const VS_BUFFER     = 8;         // extra rows to render above/below viewport
let rankingView     = 'grid';    // 'grid' or 'list'
let showFuzzyOnly   = false;     // fuzzy filter toggle
let franchiseMode   = false;     // group sequels/seasons in rankings view
let settleMode      = false;     // targeted low-confidence matchmaking
let blindMode       = false;     // hide titles & covers until a pick is made

// ─── PERSISTENT STATS (survive the 200-battle history cap) ──────────────────
// matchupStats: { 'minId-maxId': { wins: {[id]: N}, total: N, titleA, titleB } }
// Rivalries are derived from this rather than from battleHistory.
// Streaks are stored per-anime on the anime object itself (anime.streak).
let matchupStats = {};

// ─── TOWER OF POWER ──────────────────────────────────────────────────────────
let towerMode       = false;
let towerChampIdx   = null;      // index in animeList of the chosen champion
let towerRound      = 0;         // 0-9
let towerOpponents  = [];        // pre-selected array of 10 opponent indices
let towerResults    = [];        // [{opponentIdx, championWon}]
const TOWER_ROUNDS  = 10;

// ─── HTML ESCAPE HELPER ──────────────────────────────────────────────────────
// Use this on ANY value that comes from user input, AniList/MAL API, or the
// network before interpolating into innerHTML. Without it, a malicious anime
// title (or crafted username) could inject <script> / onerror= / javascript:
// attributes into the DOM. Escapes &, <, >, ", ' — which is sufficient for
// both element text and quoted attribute values.
function esc(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Renders "Error: <message>" into a container using textContent only, so an
// attacker-controlled error message from a remote API can never inject HTML
// or a <script> tag — even if the esc() sweep regresses in a future refactor.
// Replaces the old `el.innerHTML = `<p …>Error: ${esc(e.message)}</p>`` pattern.
function renderErrorInto(el, message, extraStyle = '') {
  if (!el) return;
  // Clear any existing children safely.
  while (el.firstChild) el.removeChild(el.firstChild);
  const p = document.createElement('p');
  p.style.cssText = 'color:#f85149;text-align:center' + (extraStyle ? ';' + extraStyle : '');
  p.textContent = 'Error: ' + (message || 'unknown');
  el.appendChild(p);
}
// Validate a URL is safe to interpolate into an attribute (href/src).
// Only allows http(s) and protocol-relative URLs — blocks javascript:, data:, etc.
function safeUrl(u) {
  if (!u) return '';
  const str = String(u).trim();
  if (/^(https?:)?\/\//i.test(str) || str.startsWith('/')) return esc(str);
  return '';
}

// ─── ANILIST AUTH ────────────────────────────────────────────────────────────
let authToken = null;
let authUser  = null; // { id, name, avatar }

function anilistHeaders() {
  const h = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
  if (authToken) h['Authorization'] = 'Bearer ' + authToken;
  return h;
}

// Central AniList fetch wrapper with 429 rate-limit retry.
// Respects the Retry-After header; falls back to exponential backoff.
// onStatus(msg): optional callback used to surface wait-time in the loading screen.
async function _anilistFetch(body, { onStatus, maxRetries = 3 } = {}) {
  let attempt = 0;
  while (true) {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: anilistHeaders(),
      body: JSON.stringify(body),
    });
    if (res.status !== 429) return res;
    if (attempt >= maxRetries) {
      throw new Error('AniList rate limit reached — please wait a moment and try again.');
    }
    const retryAfter = parseInt(res.headers.get('retry-after') || '0', 10);
    const waitMs = retryAfter > 0 ? retryAfter * 1000 : Math.min(5000 * 2 ** attempt, 60000);
    const secs = Math.ceil(waitMs / 1000);
    if (onStatus) onStatus(`⏳ AniList rate limit — retrying in ${secs}s…`);
    await new Promise(r => setTimeout(r, waitMs));
    attempt++;
  }
}

// ─── localStorage key namespace ─────────────────────────────────────────────
// Everything Kessen writes to localStorage lives under `kessen.*`. The app
// migrates from the legacy `anime_elo_*` / `kessen_*` keys once per browser
// (see _migrateLocalStorageV1 below). All callers should use these constants
// or helpers — no raw strings anywhere else in the codebase.
const KESSEN_KEYS = {
  auth: {
    anilist: 'kessen.auth.anilist',
    mal:     'kessen.auth.mal',
  },
  session: {
    anilist: (user) => 'kessen.session.anilist.' + String(user || '').toLowerCase(),
    mal:     (user) => 'kessen.session.mal.'     + String(user || '').toLowerCase(),
    guest:   'kessen.session.guest',
  },
  ui: {
    helpSeen:         'kessen.ui.helpSeen',
    kbSeen:           'kessen.ui.kbSeen',
    welcomeSeen:      'kessen.ui.welcomeSeen',
    towerFirstTipSeen:'kessen.ui.towerFirstTipSeen',
    longPressTipSeen: 'kessen.ui.longPressTipSeen',
    // (§5.2.12) JSON array of saveKeys for which the guest-merge prompt has
    // already been shown (accepted or declined). Prevents repeat pestering.
    guestMergeDismissed: 'kessen.ui.guestMergeDismissed',
  },
  settings: {
    allowAdult:  'kessen.settings.allowAdult',
    viewPrefs:   'kessen.settings.viewPrefs', // local-only: rankingView + franchiseMode
  },
  data: {
    savedComparisons: 'kessen.data.savedComparisons',
    // Per-session archive of anime that were removed from the user's external
    // list (AniList / MAL) but whose battle history is preserved on request.
    // (§5.2.7) Keyed by the user's save key so archives don't collide.
    archive: (saveKey) => 'kessen.archive.' + String(saveKey || 'guest'),
  },
  _migrationFlagV1: 'kessen.meta.migratedV1',
};

// Runs once per browser. Walks every legacy key, copies it to the new
// namespace (if the new key doesn't already exist — protects against
// half-migrated state), then removes the old key. Sets a flag so subsequent
// loads skip the work. Idempotent.
function _migrateLocalStorageV1() {
  try {
    if (localStorage.getItem(KESSEN_KEYS._migrationFlagV1) === '1') return;

    // 1-to-1 singleton keys
    const singletons = [
      ['anime_elo_auth',              KESSEN_KEYS.auth.anilist],
      ['kessen_mal_auth',             KESSEN_KEYS.auth.mal],
      ['anime_elo_help_seen',         KESSEN_KEYS.ui.helpSeen],
      ['anime_elo_kb_seen',           KESSEN_KEYS.ui.kbSeen],
      ['kessen_welcome_seen',         KESSEN_KEYS.ui.welcomeSeen],
      ['kessen_allow_adult',          KESSEN_KEYS.settings.allowAdult],
      ['anime_elo_saved_comparisons', KESSEN_KEYS.data.savedComparisons],
      ['anime_elo_guest',             KESSEN_KEYS.session.guest],
    ];
    for (const [oldK, newK] of singletons) {
      const v = localStorage.getItem(oldK);
      if (v !== null) {
        if (localStorage.getItem(newK) === null) localStorage.setItem(newK, v);
        localStorage.removeItem(oldK);
      }
    }

    // Per-user session blobs — anything left with the anime_elo_ prefix is a
    // ranked session; route it into kessen.session.{anilist,mal}.<user>.
    const legacy = Object.keys(localStorage).filter(k => k.startsWith('anime_elo_'));
    for (const oldK of legacy) {
      const newK = oldK.startsWith('anime_elo_mal_')
        ? 'kessen.session.mal.'     + oldK.slice('anime_elo_mal_'.length)
        : 'kessen.session.anilist.' + oldK.slice('anime_elo_'.length);
      const v = localStorage.getItem(oldK);
      if (v !== null && localStorage.getItem(newK) === null) {
        localStorage.setItem(newK, v);
      }
      localStorage.removeItem(oldK);
    }

    localStorage.setItem(KESSEN_KEYS._migrationFlagV1, '1');
  } catch { /* private-mode / quota-exhausted / storage disabled — skip */ }
}
_migrateLocalStorageV1();

function saveAuth() {
  localStorage.setItem(KESSEN_KEYS.auth.anilist, JSON.stringify({
    token: authToken, user: authUser,
    saved: Date.now()
  }));
}

function loadAuthFromStorage() {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.auth.anilist);
    if (!raw) return false;
    const { token, user, saved } = JSON.parse(raw);
    if (!token || !user) return false;
    // AniList tokens expire after 1 year — clear if saved > 365 days ago
    const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
    if (saved && Date.now() - saved > ONE_YEAR_MS) {
      localStorage.removeItem(KESSEN_KEYS.auth.anilist);
      showToast('Your AniList session expired — please log in again.');
      return false;
    }
    authToken = token;
    authUser  = user;
    return true;
  } catch { return false; }
}

// Global 401 interceptor — catches expired AniList tokens across all fetch calls
(function _installAnilistInterceptor() {
  const _origFetch = window.fetch;
  window.fetch = async function(...args) {
    const url = typeof args[0] === 'string' ? args[0] : (args[0]?.url || '');
    const res = await _origFetch.apply(this, args);
    if (res.status === 401 && url.includes('graphql.anilist.co') && authToken) {
      clearAuth();
      showToast('⚠️ AniList session expired — please log in again.');
    }
    return res;
  };
})();

// Clears all per-user ranking/battle state, cancels pending save debounces,
// and returns the UI to the username screen. Does NOT touch auth — callers
// that want to log the user out should call clearAuth/logoutMAL first.
// Extracted so we can do in-place resets (no location.reload flash) from
// resetAll / deleteAllData / logout without re-flowing boot code.
function _clearRankingState() {
  animeList         = [];
  battleCount       = 0;
  currentA          = null;
  currentB          = null;
  battleHistory     = [];
  excludedIds       = new Set();
  hiddenFormats     = new Set();
  hiddenEpRanges    = new Set();
  saveKey           = '';
  prevState         = null;
  undoStack         = [];
  achievements      = {};
  comparedFriends   = new Set();
  _cloudSyncEnabled = false;
  nextPairOverride  = null;
  matchupStats      = {};

  // Cancel any in-flight save debounces — they would fire against stale state.
  clearTimeout(_cloudSaveTimer);
  _cloudSaveTimer = null;
  clearInterval(_newAnimePollingTimer);
  _newAnimePollingTimer = null;
  byId(IDS.newAnimeBanner)?.classList.remove('active');
  byId(IDS.removedAnimeBanner)?.classList.remove('active');
  _pendingRemovedAnime = [];

  // Clear discover cache so a different user gets fresh recommendations
  Object.keys(_recsCache).forEach(k => delete _recsCache[k]);
  _recsLoadedTab = null;

  // Return to the home screen
  hide('battle-screen');
  hide('results-screen');
  const chgBtn = byId(IDS.changeUserBtn);
  if (chgBtn) chgBtn.style.display = 'none';
  const progress = byId(IDS.progressInfo);
  if (progress) progress.textContent = '';
  showFlex('username-screen');
}

function clearAuth() {
  authToken = null;
  authUser  = null;
  localStorage.removeItem(KESSEN_KEYS.auth.anilist);
  _updateAuthUI();
  _clearRankingState();
}

// Update the "AniList Avg" sort button and table header to reflect the active service.
function _updateScoreLabel() {
  const label = _isMalCloudSession() ? 'MAL Avg' : 'AniList Avg';
  const btn = document.querySelector('.sort-btn[data-sort="score"]');
  if (btn) {
    btn.dataset.label = label;
    // If this button is currently active it will have an arrow appended — preserve that.
    const arrow = btn.textContent.match(/ [↑↓]$/)?.[0] ?? '';
    btn.textContent = label + arrow;
  }
  const th = byId(IDS.thSc);
  if (th) {
    const arrow = th.textContent.match(/ [▾▴]$/)?.[0] ?? '';
    th.textContent = label + arrow;
  }
}

function _updateAuthUI() {
  const loggedIn = !!(authToken && authUser);

  // Header badge
  const hdrBadge = byId(IDS.authHeaderBadge);
  if (hdrBadge) {
    hdrBadge.style.display = loggedIn ? 'flex' : 'none';
    if (loggedIn) {
      const hdrAvatar = byId(IDS.authHdrAvatar);
      const hdrName   = byId(IDS.authHdrName);
      if (hdrAvatar) hdrAvatar.src = authUser.avatar || '';
      if (hdrName)   hdrName.textContent = authUser.name;
    }
  }

  // Username screen badge
  const loginBtn  = byId(IDS.authLoginBtn);
  const loggedBadge = byId(IDS.authUsernameBadge);
  const newHint   = byId(IDS.anilistNewHint);
  if (loginBtn)    loginBtn.style.display    = loggedIn ? 'none' : '';
  if (loggedBadge) loggedBadge.style.display = loggedIn ? 'flex'  : 'none';
  if (newHint)     newHint.style.display     = loggedIn ? 'none'  : '';
  if (loggedIn && loggedBadge) {
    const av = byId(IDS.authBadgeAvatar);
    const nm = byId(IDS.authBadgeName);
    if (av) av.src = authUser.avatar || '';
    if (nm) nm.textContent = authUser.name;
  }

  // Auto-fill username input when logged in
  if (loggedIn) {
    const inp = byId(IDS.usernameInput);
    if (inp && !inp.value) inp.value = authUser.name;
  }

  // Show/hide the AniList manage section (only when logged in)
  const manageAnilist = byId(IDS.manageAnilistSection);
  if (manageAnilist) manageAnilist.style.display = loggedIn ? '' : 'none';

  // Show the auto-seed note when OAuth-logged-in (warm-start checkbox is inside the
  // "Having trouble?" disclosure so it doesn't need explicit hiding)
  const oauthNote = byId(IDS.oauthSeedNote);
  if (oauthNote) oauthNote.style.display = loggedIn ? '' : 'none';

  // Show/hide help sections in the help modal
  const helpAnilist  = byId(IDS.helpAnilistSection);
  const helpAnilist2 = byId(IDS.helpAnilistSection2);
  const malLoggedInNow = !!(malAuthToken && malAuthUser);
  // Cloud sync help shows for either login; AniList-specific section only for AniList
  if (helpAnilist)  helpAnilist.style.display  = (loggedIn || malLoggedInNow) ? '' : 'none';
  if (helpAnilist2) helpAnilist2.style.display = loggedIn ? '' : 'none';

  // Start new-anime polling when logged in; stop only if neither AniList nor MAL is active
  if (loggedIn && animeList.length) {
    _startNewAnimePolling();
  } else if (!loggedIn && _newAnimePollingTimer && !malLoggedInNow) {
    clearInterval(_newAnimePollingTimer);
    _newAnimePollingTimer = null;
    byId(IDS.newAnimeBanner)?.classList.remove('active');
  }

  // Enable/disable cloud sync — also consider MAL auth
  const malLoggedIn = !!(malAuthToken && malAuthUser);
  _cloudSyncEnabled = loggedIn || malLoggedIn;
  if (!_cloudSyncEnabled) _setSyncIndicator('hidden');

  // Show cloud push/pull buttons when any auth is active
  const cloudBtns = byId(IDS.cloudSyncBtns);
  if (cloudBtns) cloudBtns.style.display = (loggedIn || malLoggedIn) ? '' : 'none';

  _updateScoreLabel();
}

const ANILIST_CLIENT_ID = '37947';
const MAL_CLIENT_ID     = '9df64609e910d4c125fce4d254b32bb5';
// Client secret is kept server-side in the Netlify Function — never in client code.

function _getRedirectUri() {
  // Must exactly match the Redirect URL registered in AniList developer settings
  return window.location.origin + window.location.pathname;
}

// ─── TWA detection ───────────────────────────────────────────────────────────
// Inside a Trusted Web Activity on Android, `window.open()` opens a Chrome
// Custom Tab rather than a popup window. Custom Tabs do not share a DOM link
// with the opener — `window.opener.postMessage()` never reaches us, so the
// popup-based OAuth flow hangs on "⏳ Waiting for AniList…" forever.
//
// The fix is to skip the popup attempt entirely when we're in a TWA and go
// straight to a full-page redirect. Chrome then routes the OAuth callback
// back into the TWA via the verified-origin Android intent, and our existing
// redirect-fallback branch in _checkOAuthCallback handles the code exchange.
//
// Detection signals (any one is sufficient; result is cached for the session):
//   • document.referrer = 'android-app://<package>'  — set by Chrome on TWA launch
//   • ?source=twa query param                         — from start_url in twa-manifest
const IS_TWA = (() => {
  try {
    if (sessionStorage.getItem('kessen_is_twa') === '1') return true;
    if (document.referrer && document.referrer.startsWith('android-app://')) {
      sessionStorage.setItem('kessen_is_twa', '1');
      return true;
    }
    if (new URLSearchParams(window.location.search).get('source') === 'twa') {
      sessionStorage.setItem('kessen_is_twa', '1');
      return true;
    }
  } catch { /* sessionStorage unavailable in some locked-down contexts */ }
  return false;
})();

let _oauthPopup     = null;
let _oauthPollTimer = null;

// OAuth `state` parameter — defence against CSRF on the callback. Generated
// once per flow, stored in sessionStorage, echoed in the authorize URL, and
// verified when the callback code arrives. If the callback state doesn't match
// what we stored, we refuse to exchange the code — an attacker cannot force a
// victim's browser to log in as the attacker's account.
function _generateOAuthState() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

function startOAuthFlow() {
  const btn   = byId(IDS.authLoginBtn);
  const errEl = byId(IDS.authErrorMsg);
  if (errEl) errEl.style.display = 'none';

  const state = _generateOAuthState();
  sessionStorage.setItem('anilist_oauth_state', state);

  const authUrl = 'https://anilist.co/api/v2/oauth/authorize?client_id='
    + ANILIST_CLIENT_ID
    + '&redirect_uri=' + encodeURIComponent(_getRedirectUri())
    + '&response_type=code'
    + '&state=' + encodeURIComponent(state);

  // Inside a TWA, window.open becomes a Custom Tab — postMessage won't make it
  // back. Skip the popup and let Chrome bounce the callback through the
  // verified-origin intent into our redirect-fallback handler.
  if (IS_TWA) {
    if (btn) { btn.textContent = '⏳ Redirecting…'; btn.disabled = true; }
    window.location.href = authUrl;
    return;
  }

  // Try a popup first — much better for installed PWAs where a full redirect
  // would open the system browser and never return to the PWA window.
  const pw = 600, ph = 720;
  const pl = Math.round(window.screenX + (window.outerWidth  - pw) / 2);
  const pt = Math.round(window.screenY + (window.outerHeight - ph) / 2);
  _oauthPopup = window.open(authUrl, 'anilist_oauth',
    `width=${pw},height=${ph},left=${pl},top=${pt},scrollbars=yes,resizable=yes`);

  if (_oauthPopup && !_oauthPopup.closed) {
    // Popup opened — wait for postMessage from the callback page
    if (btn) { btn.textContent = '⏳ Waiting for AniList…'; btn.disabled = true; }

    // Poll so we can re-enable the button if the user manually closes the popup
    clearInterval(_oauthPollTimer);
    _oauthPollTimer = setInterval(() => {
      if (_oauthPopup && _oauthPopup.closed) {
        clearInterval(_oauthPollTimer);
        _oauthPopup = null;
        if (btn && btn.disabled) {
          btn.textContent = '🔐 Login with AniList';
          btn.disabled = false;
        }
      }
    }, 500);
  } else {
    // Popup blocked — fall back to full-page redirect
    if (btn) { btn.textContent = '⏳ Redirecting…'; btn.disabled = true; }
    window.location.href = authUrl;
  }
}

// Shared logic: exchange an auth code for a token and start the session.
// Called by both the popup path (via postMessage) and the redirect fallback.
async function _handleOAuthCode(code) {
  const btn   = byId(IDS.authLoginBtn);
  const errEl = byId(IDS.authErrorMsg);
  if (btn) { btn.textContent = '⏳ Logging in…'; btn.disabled = true; }

  try {
    const res = await fetch('/.netlify/functions/anilist-auth', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ code, redirect_uri: _getRedirectUri() }),
    });
    const data = await res.json();
    if (!data.access_token) throw new Error(data.message || 'No access token in response');

    authToken = data.access_token;
    const viewer = await _fetchViewer();
    if (viewer?.name) {
      authUser = {
        id: viewer.id, name: viewer.name,
        avatar: viewer.avatar?.medium || '',
        scoreFormat: viewer.mediaListOptions?.scoreFormat || 'POINT_10'
      };
      saveAuth();
      _updateAuthUI();
      startLoading();
    } else {
      authToken = null;
      if (btn) { btn.textContent = '🔐 Login with AniList'; btn.disabled = false; }
    }
  } catch (err) {
    console.error('AniList OAuth token exchange failed:', err);
    authToken = null;
    if (btn) { btn.textContent = '🔐 Login with AniList'; btn.disabled = false; }
    if (errEl) { errEl.textContent = 'Login failed: ' + (err.message || 'unknown error'); errEl.style.display = 'block'; }
  }
}

// Listen for the auth code posted back from the OAuth popup
window.addEventListener('message', async event => {
  if (event.origin !== window.location.origin) return;
  if (event.data?.type !== 'anilist_oauth_code') return;
  clearInterval(_oauthPollTimer);
  if (_oauthPopup && !_oauthPopup.closed) { _oauthPopup.close(); _oauthPopup = null; }

  // Verify the state nonce we stored before opening the popup matches the one
  // AniList echoed back. Without this check a malicious page could craft a
  // postMessage with an attacker-controlled `code` and log the victim into the
  // attacker's account.
  const expected = sessionStorage.getItem('anilist_oauth_state') || '';
  sessionStorage.removeItem('anilist_oauth_state');
  const received = event.data?.state || '';
  // Legacy: allow through if no state was stored (pre-patch saves mid-flow).
  const legacyOk = !expected && !received;
  if (!legacyOk && (!expected || expected !== received)) {
    console.warn('AniList OAuth state mismatch — refusing token exchange');
    const btn = byId(IDS.authLoginBtn);
    if (btn) { btn.textContent = '🔐 Login with AniList'; btn.disabled = false; }
    return;
  }

  await _handleOAuthCode(event.data.code);
});

// ─── MAL OAuth ────────────────────────────────────────────────────────────────
let malAuthToken    = null;
let malRefreshToken = null;
let malAuthUser     = null; // { id, name, picture }

// PKCE: MAL supports the 'plain' method — code_challenge === code_verifier
// Uses rejection sampling so each of the 66 chars has equal probability
// (a naive `byte % 66` biases the first 58 chars since 256 mod 66 ≠ 0).
function _generateCodeVerifier() {
  const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const LEN    = 128;
  const MAX_OK = Math.floor(256 / chars.length) * chars.length; // 198 — drop bytes ≥ this
  const out    = new Array(LEN);
  const buf    = new Uint8Array(LEN);
  let filled   = 0;
  while (filled < LEN) {
    crypto.getRandomValues(buf);
    for (let i = 0; i < buf.length && filled < LEN; i++) {
      if (buf[i] < MAX_OK) out[filled++] = chars[buf[i] % chars.length];
    }
  }
  return out.join('');
}

function saveMALAuth() {
  localStorage.setItem(KESSEN_KEYS.auth.mal, JSON.stringify({
    token: malAuthToken, refreshToken: malRefreshToken,
    user: malAuthUser, saved: Date.now(),
  }));
}

async function loadMALAuthFromStorage() {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.auth.mal);
    if (!raw) return false;
    const { token, refreshToken, user, saved } = JSON.parse(raw);
    if (!token || !user) return false;
    const THIRTY_ONE_DAYS = 31 * 24 * 60 * 60 * 1000;
    if (saved && Date.now() - saved > THIRTY_ONE_DAYS) {
      // Token expired — try refresh
      if (refreshToken) {
        const refreshed = await _refreshMALToken(refreshToken);
        if (refreshed) { malAuthUser = user; saveMALAuth(); return true; }
      }
      localStorage.removeItem(KESSEN_KEYS.auth.mal);
      return false;
    }
    malAuthToken    = token;
    malRefreshToken = refreshToken || null;
    malAuthUser     = user;
    return true;
  } catch { return false; }
}

async function _refreshMALToken(refreshToken) {
  try {
    const res = await fetch('/.netlify/functions/mal-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    const data = await res.json();
    if (!data.access_token) return false;
    malAuthToken    = data.access_token;
    malRefreshToken = data.refresh_token || refreshToken;
    return true;
  } catch { return false; }
}

function clearMALAuth() {
  malAuthToken    = null;
  malRefreshToken = null;
  malAuthUser     = null;
  localStorage.removeItem(KESSEN_KEYS.auth.mal);
}

function logoutMAL() {
  clearMALAuth();
  _updateMALAuthUI();
  _clearRankingState();
}

function _updateMALAuthUI() {
  const loggedIn  = !!(malAuthToken && malAuthUser);
  const btn         = byId(IDS.malOauthBtn);
  const badge       = byId(IDS.malAuthBadge);
  const hint        = byId(IDS.malNewHint);
  const continueBtn = byId(IDS.malContinueBtn);
  if (btn)         btn.style.display         = loggedIn ? 'none' : '';
  if (hint)        hint.style.display        = loggedIn ? 'none' : '';
  // Show "Continue" when logged in but no session is running (animeList is empty)
  if (continueBtn) continueBtn.style.display = (loggedIn && !animeList.length) ? '' : 'none';
  if (badge) {
    badge.style.display = loggedIn ? 'flex' : 'none';
    if (loggedIn) {
      const nameEl   = byId(IDS.malBadgeName);
      const avatarEl = byId(IDS.malBadgeAvatar);
      if (nameEl) nameEl.textContent = malAuthUser.name;
      if (avatarEl && malAuthUser.picture) {
        avatarEl.src = malAuthUser.picture;
        avatarEl.style.display = '';
      }
    }
  }

  // Header badge
  const hdrBadge = byId(IDS.malHeaderBadge);
  if (hdrBadge) {
    hdrBadge.style.display = loggedIn ? 'flex' : 'none';
    if (loggedIn) {
      const hdrAvatar = byId(IDS.malHdrAvatar);
      const hdrName   = byId(IDS.malHdrName);
      if (hdrAvatar) {
        hdrAvatar.src = malAuthUser.picture || '';
        hdrAvatar.style.display = malAuthUser.picture ? '' : 'none';
      }
      if (hdrName) hdrName.textContent = malAuthUser.name;
    }
  }

  // Show/hide MAL manage section
  const manageMal = byId(IDS.manageMalSection);
  if (manageMal) manageMal.style.display = loggedIn ? '' : 'none';

  // Enable cloud sync when MAL is logged in (or AniList already is)
  const aniListLoggedIn = !!(authToken && authUser);
  _cloudSyncEnabled = loggedIn || aniListLoggedIn;
  if (!_cloudSyncEnabled) _setSyncIndicator('hidden');

  // Show cloud push/pull buttons when any auth is active
  const cloudBtns = byId(IDS.cloudSyncBtns);
  if (cloudBtns) cloudBtns.style.display = (loggedIn || aniListLoggedIn) ? '' : 'none';

  // Show the auto-seed note when OAuth-logged-in (warm-start checkbox is inside the
  // "Having trouble?" disclosure so it doesn't need explicit hiding)
  const malSeedNote = byId(IDS.malOauthSeedNote);
  if (malSeedNote) malSeedNote.style.display = loggedIn ? '' : 'none';

  // Help modal sections
  const helpCloud  = byId(IDS.helpAnilistSection);
  const helpMal    = byId(IDS.helpMalSection);
  if (helpCloud) helpCloud.style.display = (loggedIn || aniListLoggedIn) ? '' : 'none';
  if (helpMal)   helpMal.style.display   = loggedIn ? '' : 'none';

  // New-anime polling — start for MAL, stop if neither service is active
  if (loggedIn && animeList.length) {
    _startNewAnimePolling();
  } else if (!loggedIn && _newAnimePollingTimer && !aniListLoggedIn) {
    clearInterval(_newAnimePollingTimer);
    _newAnimePollingTimer = null;
    byId(IDS.newAnimeBanner)?.classList.remove('active');
  }

  _updateScoreLabel();

  // If the social tab is already open, re-render it so the platform toggle reflects
  // the newly-set (or cleared) malAuthToken. This fixes the race where renderSocialTab()
  // runs before _restoreMALAuth completes and incorrectly hides the MAL toggle.
  const socialPane = byId(IDS.tabPanelSocial);
  if (socialPane && socialPane.style.display !== 'none') renderSocialTab();
}

let _malOAuthPopup     = null;
let _malOAuthPollTimer = null;

function startMALOAuthFlow() {
  const btn   = byId(IDS.malOauthBtn);
  const errEl = byId(IDS.errorMsg);
  if (errEl) errEl.style.display = 'none';

  const codeVerifier = _generateCodeVerifier();
  sessionStorage.setItem('mal_code_verifier', codeVerifier);

  // State = fixed `mal:` prefix (so the callback can route to MAL) + random nonce.
  // The nonce is what actually defends against CSRF — we verify it on callback.
  const stateNonce = _generateOAuthState();
  const state      = 'mal:' + stateNonce;
  sessionStorage.setItem('mal_oauth_state', stateNonce);

  const authUrl = 'https://myanimelist.net/v1/oauth2/authorize'
    + '?response_type=code'
    + '&client_id='               + MAL_CLIENT_ID
    + '&code_challenge='          + codeVerifier
    + '&code_challenge_method=plain'
    + '&state='                   + encodeURIComponent(state)
    + '&redirect_uri='            + encodeURIComponent(_getRedirectUri());

  // TWA: skip popup attempt (see the _isInTWA rationale on startOAuthFlow).
  if (IS_TWA) {
    if (btn) { btn.textContent = '⏳ Redirecting…'; btn.disabled = true; }
    window.location.href = authUrl;
    return;
  }

  const pw = 600, ph = 720;
  const pl = Math.round(window.screenX + (window.outerWidth  - pw) / 2);
  const pt = Math.round(window.screenY + (window.outerHeight - ph) / 2);
  _malOAuthPopup = window.open(authUrl, 'mal_oauth',
    `width=${pw},height=${ph},left=${pl},top=${pt},scrollbars=yes,resizable=yes`);

  if (_malOAuthPopup && !_malOAuthPopup.closed) {
    if (btn) { btn.textContent = '⏳ Waiting for MyAnimeList…'; btn.disabled = true; }
    clearInterval(_malOAuthPollTimer);
    _malOAuthPollTimer = setInterval(() => {
      if (_malOAuthPopup && _malOAuthPopup.closed) {
        clearInterval(_malOAuthPollTimer);
        _malOAuthPopup = null;
        if (btn && btn.disabled) {
          btn.textContent = '🔐 Login with MyAnimeList';
          btn.disabled = false;
        }
      }
    }, 500);
  } else {
    // Popup blocked — fall back to full-page redirect
    if (btn) { btn.textContent = '⏳ Redirecting…'; btn.disabled = true; }
    window.location.href = authUrl;
  }
}

// Called once we have the auth code (from popup postMessage or redirect fallback)
async function _handleMALOAuthCode(code) {
  const btn   = byId(IDS.malOauthBtn);
  const errEl = byId(IDS.errorMsg);
  if (btn) { btn.textContent = '⏳ Logging in…'; btn.disabled = true; }

  const codeVerifier = sessionStorage.getItem('mal_code_verifier') || '';
  sessionStorage.removeItem('mal_code_verifier');

  try {
    // 1. Exchange code for tokens via Netlify function
    let res;
    try {
      res = await fetch('/.netlify/functions/mal-token', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ code, code_verifier: codeVerifier, redirect_uri: _getRedirectUri() }),
      });
    } catch (netErr) {
      throw new Error('Could not reach token function — check network or Netlify deployment. (' + netErr.message + ')');
    }
    if (!res.ok) {
      const raw = await res.text().catch(() => '');
      throw new Error('Token function returned HTTP ' + res.status + (raw ? ': ' + raw.slice(0, 120) : ''));
    }
    let data;
    try { data = await res.json(); }
    catch { throw new Error('Token function returned non-JSON (HTTP ' + res.status + ')'); }
    if (!data.access_token) throw new Error(data.error_description || data.error || data.message || 'No access token in response');

    malAuthToken    = data.access_token;
    malRefreshToken = data.refresh_token || null;

    // Fetch user profile via the mal-api proxy (MAL API has no CORS headers for browsers)
    const profileRes = await fetch('/.netlify/functions/mal-api', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ path: '/users/@me', token: malAuthToken }),
    });
    const profileData = await profileRes.json();
    if (!profileData.name) throw new Error(`Could not fetch MAL user profile (HTTP ${profileRes.status}: ${JSON.stringify(profileData).slice(0, 120)})`);

    malAuthUser = { id: profileData.id || null, name: profileData.name, picture: profileData.picture || '' };
    saveMALAuth();
    _updateMALAuthUI();

    // 3. Load the anime list and start the session
    await _startMALOAuthSession();

  } catch (err) {
    console.error('MAL OAuth failed:', err);
    malAuthToken = null; malRefreshToken = null;
    if (btn) { btn.textContent = '🔐 Login with MyAnimeList'; btn.disabled = false; }
    if (errEl) { errEl.textContent = 'MAL login failed: ' + (err.message || 'unknown error'); errEl.style.display = 'block'; }
  }
}

// Listen for the auth code posted back from the MAL OAuth popup
window.addEventListener('message', async event => {
  if (event.origin !== window.location.origin) return;
  if (event.data?.type !== 'mal_oauth_code') return;
  clearInterval(_malOAuthPollTimer);
  if (_malOAuthPopup && !_malOAuthPopup.closed) { _malOAuthPopup.close(); _malOAuthPopup = null; }

  // Verify the state nonce we stored before opening the popup matches what
  // MAL echoed back (same CSRF protection as the AniList flow).
  const expected = sessionStorage.getItem('mal_oauth_state') || '';
  sessionStorage.removeItem('mal_oauth_state');
  const stateIn  = event.data?.state || '';
  const received = stateIn.startsWith('mal:') ? stateIn.slice(4) : '';
  // Legacy: allow through if the old literal 'mal' state comes back (pre-patch).
  const legacyOk = !expected && stateIn === 'mal';
  if (!legacyOk && (!expected || expected !== received)) {
    console.warn('MAL OAuth state mismatch — refusing token exchange');
    const btn = byId(IDS.malOauthBtn);
    if (btn) { btn.textContent = '🔐 Login with MyAnimeList'; btn.disabled = false; }
    return;
  }

  await _handleMALOAuthCode(event.data.code);
});

// Fetch the user's completed + watching list via the mal-api.js proxy
// (api.myanimelist.net has no CORS headers — all calls go through Netlify)
async function _fetchMALAnimeListViaAPI() {
  const entries  = [];
  const fields   = 'list_status,num_episodes,mean,genres,media_type,start_season,main_picture,synopsis,nsfw,rating';
  const statuses = ['completed', 'watching'];
  // Match the AniList path: filter out NSFW/adult titles unless the user opts in.
  // MAL tags hentai via genre id 12 / rating `rx`; nsfw field is also populated
  // on newer entries. We check all three to be defensive.
  const ALLOW_ADULT = localStorage.getItem(KESSEN_KEYS.settings.allowAdult) === '1';

  for (const status of statuses) {
    // Start path — the proxy prepends /v2 automatically. We request nsfw=true
    // from MAL (so their API doesn't pre-filter) and decide ourselves below.
    let path = `/users/@me/animelist?status=${status}`
             + `&fields=${encodeURIComponent(fields)}&limit=1000&nsfw=true&sort=list_score`;
    let page = 1;

    while (path) {
      byId(IDS.loadingMsg).textContent =
        `Fetching MAL list… (${status}, page ${page})`;

      const res = await fetch('/.netlify/functions/mal-api', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ path, token: malAuthToken }),
      });

      if (res.status === 401) {
        // Token may have expired — try refresh once then retry
        if (malRefreshToken) {
          const ok = await _refreshMALToken(malRefreshToken);
          if (ok) { saveMALAuth(); continue; }
        }
        throw new Error('MAL session expired. Please log in again.');
      }
      if (!res.ok) throw new Error(`MAL API proxy error (HTTP ${res.status})`);

      const data = await res.json();
      (data.data || []).forEach(item => {
        const node = item.node;
        // Skip adult/hentai entries unless user opted in.
        if (!ALLOW_ADULT) {
          const isNsfw = node.nsfw === 'black' || node.nsfw === 'gray';
          const isRx   = typeof node.rating === 'string' && node.rating.toLowerCase().startsWith('rx');
          const hentai = Array.isArray(node.genres) && node.genres.some(g => (g?.name || '').toLowerCase() === 'hentai');
          if (isNsfw || isRx || hentai) return;
        }
        if (!entries.some(e => e.malId === node.id)) {
          entries.push({ malId: node.id, score: item.list_status?.score || 0, title: node.title || '' });
        }
      });

      // MAL pagination: next URL contains the full path+query
      const nextUrl = data.paging?.next || null;
      if (nextUrl) {
        // Extract just the path+query from the full URL for the proxy
        try { path = new URL(nextUrl).pathname + new URL(nextUrl).search; }
        catch { path = null; }
      } else {
        path = null;
      }
      page++;
      if (path) await new Promise(r => setTimeout(r, 250));
    }
  }
  return entries;
}

// Start a full MAL OAuth session: fetch list → build anime list → start battles
// autoResume: true when called automatically on page load (not by explicit user action).
//   On failure the user is silently returned to the home screen — they're still logged
//   in and can press "Login with MyAnimeList" to retry, rather than seeing a raw error.
async function _startMALOAuthSession({ autoResume = false } = {}) {
  const username        = malAuthUser.name;
  const existingSaveKey = KESSEN_KEYS.session.mal(username);
  // Seed from scores on a fresh load only — same behaviour as AniList OAuth.
  // Existing saves are restored as-is; re-seeding is done via Manage → Re-seed.
  const hasSave        = !!localStorage.getItem(existingSaveKey);
  const seedFromScores = !hasSave;

  const myGen = ++_loadGeneration;

  hide('username-screen');
  showFlex('loading-screen');
  _startLoadCancelTimer();
  // Hide the resume button immediately — we're now loading
  const _cb = byId(IDS.malContinueBtn);
  if (_cb) _cb.style.display = 'none';

  // Check for a cloud save newer than what's stored locally
  if (_cloudSyncEnabled) {
    byId(IDS.loadingMsg).textContent = '☁️ Checking for cloud save…';
    const applied = await checkAndApplyCloudSave(existingSaveKey);
    if (applied) {
      byId(IDS.loadingMsg).textContent = '☁️ Cloud save loaded!';
      await new Promise(r => setTimeout(r, 500));
      _clearLoadCancelTimer();
      hide('loading-screen');
      if (myGen !== _loadGeneration) return;
      show('battle-screen');
      _showChangeUserBtn();
      snapshotSessionStart();
      maybeShowKbTip();
      if (currentA !== null && currentB !== null) renderCurrentPair(); else renderBattle();
      _migrateMalIds(); // background — populate idMal on old saves so links go to MAL
      return;
    }
  }

  // Restore existing local save (when not doing a warm-start reset)
  if (!seedFromScores && loadState(username, 'mal')) {
    byId(IDS.loadingMsg).textContent = 'Restoring your saved MAL session…';
    await new Promise(r => setTimeout(r, 600));
    _clearLoadCancelTimer();
    hide('loading-screen');
    if (myGen !== _loadGeneration) return;
    show('battle-screen');
    _showChangeUserBtn();
    snapshotSessionStart();
    maybeShowKbTip();
    if (currentA !== null && currentB !== null) renderCurrentPair(); else renderBattle();
    _migrateMalIds(); // background — populate idMal on old saves so links go to MAL
    return;
  }

  try {
    const entries = await _fetchMALAnimeListViaAPI();
    if (entries.length === 0) throw new Error('No completed or watching anime found on your MAL list.');
    await _buildAnimeListFromMalEntries(entries, username, seedFromScores, existingSaveKey, myGen);
  } catch (err) {
    _clearLoadCancelTimer();
    hide('loading-screen');
    showFlex('username-screen');
    if (autoResume) {
      // Page-load auto-resume: don't show an error — the user is still logged in and
      // can press "Login with MyAnimeList" to retry when ready.
      console.warn('MAL auto-resume failed, returning to home screen:', err.message);
    } else {
      const errEl = byId(IDS.errorMsg);
      if (errEl) { errEl.textContent = err.message || 'Failed to load MAL list.'; errEl.style.display = 'block'; }
    }
  }
}


async function _fetchViewer() {
  const query = `query {
    Viewer {
      id name
      avatar { medium }
      mediaListOptions { scoreFormat }
    }
  }`;
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: anilistHeaders(),
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  return data?.data?.Viewer ?? null;
}

// On page load: check URL query params for OAuth authorization code callback
(async function _checkOAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const code  = params.get('code');
  const state = params.get('state') || '';
  if (!code) return;

  // Clean the URL immediately so a refresh doesn't re-trigger the flow
  history.replaceState(null, '', window.location.pathname);

  // MAL state is prefixed `mal:` so the callback can route to the right handler
  // *before* we have access to sessionStorage (the popup has its own storage).
  // A legacy `state=mal` value is still accepted for saves issued pre-patch.
  const isMal = state === 'mal' || state.startsWith('mal:');

  // If this page loaded inside the OAuth popup, hand the code AND state back to
  // the opener window — that's the window that stored the expected state nonce
  // in sessionStorage. The popup has its own sessionStorage and can't verify.
  if (window.opener && !window.opener.closed) {
    try {
      const type = isMal ? 'mal_oauth_code' : 'anilist_oauth_code';
      window.opener.postMessage({ type, code, state }, window.location.origin);
    } catch {}
    window.close();
    return;
  }

  // Redirect fallback: verify state in *this* window (it started the flow).
  if (isMal) {
    const expected  = sessionStorage.getItem('mal_oauth_state') || '';
    const received  = state.startsWith('mal:') ? state.slice(4) : '';
    sessionStorage.removeItem('mal_oauth_state');
    // Legacy: if we never stored a state (pre-patch save) and the incoming
    // state is the literal 'mal', allow it through so existing flows don't break.
    const legacyOk = !expected && state === 'mal';
    if (!legacyOk && (!expected || expected !== received)) {
      console.warn('MAL OAuth state mismatch — refusing token exchange');
      return;
    }
    await _handleMALOAuthCode(code);
  } else {
    const expected = sessionStorage.getItem('anilist_oauth_state') || '';
    sessionStorage.removeItem('anilist_oauth_state');
    // Legacy: allow through if no state was stored (pre-patch saved redirects).
    const legacyOk = !expected && !state;
    if (!legacyOk && (!expected || expected !== state)) {
      console.warn('AniList OAuth state mismatch — refusing token exchange');
      return;
    }
    await _handleOAuthCode(code);
  }
})();

// On page load: restore AniList token from localStorage
if (loadAuthFromStorage()) {
  document.addEventListener('DOMContentLoaded', _updateAuthUI);
  if (document.readyState !== 'loading') _updateAuthUI();
}

// On page load: restore MAL token from localStorage, then auto-resume session
(async function _restoreMALAuth() {
  const ok = await loadMALAuthFromStorage();
  if (!ok) return;

  // Update login UI badges
  if (document.readyState === 'loading') {
    await new Promise(r => document.addEventListener('DOMContentLoaded', r, { once: true }));
  }
  _updateMALAuthUI();

  // Auto-resume the MAL session on page reload — mirrors AniList's auto-start behaviour.
  // Skip if a shared ranking is in the URL (tryLoadSharedView in window.load handles that).
  // Skip if AniList is also active — it will take the lead via the username input trick.
  if (location.hash.startsWith('#r=') || authToken) return;

  const doStart = () => _startMALOAuthSession({ autoResume: true });
  if (document.readyState === 'complete') {
    doStart();
  } else {
    window.addEventListener('load', doStart, { once: true });
  }
})();

// ─── ANILIST FETCH ──────────────────────────────────────────────────────────
// AniList lets editors embed limited HTML in descriptions; a regex strip
// gets confused by unescaped `<`/`>` inside text, by nested tags, and by
// HTML entities. DOMParser handles all of that and also decodes entities
// like &amp;, &#8220;, &rsquo; — which the regex version would leave raw.
const _stripHtmlParser = (typeof DOMParser !== 'undefined') ? new DOMParser() : null;
function stripHtml(str) {
  if (!str) return '';
  if (_stripHtmlParser) {
    const doc = _stripHtmlParser.parseFromString(String(str), 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  }
  // Fallback for environments without DOMParser (shouldn't happen in browsers).
  return String(str).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreToElo(score) {
  // Maps AniList 1-10 score to starting ELO: 10→1500, 7→1200, 4→900
  if (!score || score === 0) return 1200;
  return Math.max(800, Math.min(1600, 1200 + (score - 7) * 100));
}

async function fetchAllAnime(username, seedFromScores = false) {
  // isAdult lets us filter out hentai / adult titles before they hit the
  // battle pool. Play Store's IARC questionnaire treats the presence of
  // adult content as a rating escalator, so filtering keeps the app in the
  // Teen bucket. Users who want NSFW stays in can flip the exclude toggle
  // in Manage (see ALLOW_ADULT below).
  const query = `
    query ($username: String) {
      MediaListCollection(userName: $username, type: ANIME) {
        lists {
          name
          entries {
            score
            status
            media {
              id
              title { romaji english }
              coverImage { medium large }
              description(asHtml: false)
              format
              episodes
              averageScore
              genres
              seasonYear
              popularity
              isAdult
            }
          }
        }
      }
    }
  `;

  const msgEl = byId(IDS.loadingMsg);
  const res = await _anilistFetch(
    { query, variables: { username } },
    { onStatus: msg => { if (msgEl) msgEl.textContent = msg; } }
  );

  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  if (data.errors) throw new Error(data.errors[0].message);

  const collection = data.data?.MediaListCollection;
  if (!collection) throw new Error('Could not read your AniList — the list may be private or the account may not exist.');

  const lists = collection.lists ?? [];
  // Use status field so custom-named lists are handled correctly.
  // Include Completed, Currently Watching, and Rewatching only — skip Dropped, Paused, Planning.
  const WATCHED_STATUSES = new Set(['COMPLETED', 'CURRENT', 'REPEATING']);
  const allEntries = lists.flatMap(l => l.entries ?? []).filter(e => WATCHED_STATUSES.has(e.status));

  // AniList occasionally returns null media for delisted/removed shows — skip those silently
  // but surface the count to the caller so they can warn the user.
  // Also filter out AniList-flagged adult titles unless the user has opted in
  // via localStorage (KESSEN_KEYS.settings.allowAdult = '1'). Keeps Play Store IARC Teen.
  const ALLOW_ADULT = localStorage.getItem(KESSEN_KEYS.settings.allowAdult) === '1';
  const skipped = allEntries.filter(e => !e.media).length;
  const entries = allEntries
    .filter(e => e.media)
    .filter(e => ALLOW_ADULT || !e.media.isAdult);

  const mapped = entries.map(e => {
    const startElo = seedFromScores ? scoreToElo(e.score) : 1200;
    const titleEn  = e.media.title.english || e.media.title.romaji;
    const titleRo  = e.media.title.romaji  || e.media.title.english;
    return {
      id: e.media.id,
      title: titleEn,
      titleEn, titleRo,
      cover: e.media.coverImage.large || e.media.coverImage.medium,
      description: stripHtml(e.media.description).slice(0, 500),
      format: e.media.format || 'TV',
      episodes: e.media.episodes || 0,
      globalScore: e.media.averageScore || 0,
      genres: e.media.genres || [],
      seasonYear: e.media.seasonYear || null,
      popularity: e.media.popularity || 0,
      status: e.status || 'COMPLETED',
      elo: startElo,
      wins: 0, losses: 0, comparisons: 0, battles: 0,
      fuzzy: false,
      eloHistory: [startElo],
      anilistScore: e.score || 0,
    };
  });
  return { entries: mapped, skipped };
}

// ─── STORAGE ────────────────────────────────────────────────────────────────

// Detects when the current save-key belongs to a different OAuth user than
// the one currently logged in. Two users on the same browser profile who
// happen to share a username (AniList vs MAL, or two MAL accounts with the
// same display name) would otherwise silently overwrite each other's data.
// On collision we refuse to save, and loadState() returns a fresh slate.
let _saveCollision = false;

function _currentOwnerTag() {
  if (authUser)    return { source: 'anilist', id: authUser.id };
  if (malAuthUser) return { source: 'mal',     id: malAuthUser.id };
  return null; // guest / username-only — can't reliably disambiguate
}

function saveState() {
  if (!saveKey) return;
  if (_saveCollision) return; // another user's data lives at this key — don't clobber
  const owner = _currentOwnerTag();
  localStorage.setItem(saveKey, JSON.stringify({
    animeList, battleCount, currentA, currentB, battleHistory,
    excludedIds: [...excludedIds],
    hiddenFormats:  [...hiddenFormats],
    hiddenEpRanges: [...hiddenEpRanges],
    rankingView,
    franchiseMode,
    currentSort,
    sortAsc,
    achievements,
    comparedFriends: [...comparedFriends],
    matchupStats,
    _owner: owner, // { source, id } or null — used to detect collisions on next load
  }));
  scheduleCloudSave();
}

// ─── CLOUD SYNC ──────────────────────────────────────────────────────────────
// Auto-saves to Netlify Blobs keyed by AniList user ID.
// The Netlify Function verifies the AniList token server-side.

let _cloudSaveTimer    = null;  // debounce handle
let _cloudSyncEnabled  = false; // true when AniList or MAL authenticated
let _suppressCloudSave = false; // true while applying a cloud save to avoid an immediate re-save

// ─── LOADING CANCELLATION ─────────────────────────────────────────────────────
// Each load function increments _loadGeneration and captures the value.
// cancelLoading() increments it so in-flight async checks fail → no battle-screen nav.
let _loadGeneration  = 0;
let _loadCancelTimer = null; // setTimeout handle — reveals cancel button after 8s

function _setSyncIndicator(state) {
  // state: 'saving' | 'saved' | 'error' | 'hidden'
  const el = byId(IDS.cloudSyncIndicator);
  if (!el) return;
  if (state === 'hidden' || !_cloudSyncEnabled) { el.style.display = 'none'; return; }
  el.style.display = 'inline';
  if (state === 'saving') { el.textContent = '☁️ Saving…';  el.style.color = '#8b949e'; }
  if (state === 'saved')  { el.textContent = '☁️ Synced';   el.style.color = '#3fb950'; }
  if (state === 'error')  { el.textContent = '☁️ Sync err'; el.style.color = '#f85149'; }
}

// Call this after saveState() for anything battle-related.
// Debounced — fires 5 s after the last change to avoid hammering the function.
// Returns whichever auth token is active (AniList takes priority)
function _activeCloudToken() { return authToken || malAuthToken || null; }
function _activeCloudUser()  { return authUser  || malAuthUser  || null; }
function _isMalCloudSession() { return !authToken && !!malAuthToken; }

function scheduleCloudSave() {
  if (_suppressCloudSave || !_cloudSyncEnabled || !_activeCloudUser()) return;
  clearTimeout(_cloudSaveTimer);
  _setSyncIndicator('saving');
  _cloudSaveTimer = setTimeout(_doCloudSave, 5000);
}

async function _doCloudSave() {
  if (!_cloudSyncEnabled || !_activeCloudUser() || !animeList.length) return;
  try {
    const session = {
      saveKey,
      animeList,
      battleCount,
      currentA,
      currentB,
      battleHistory,
      excludedIds:    [...excludedIds],
      hiddenFormats:  [...hiddenFormats],
      hiddenEpRanges: [...hiddenEpRanges],
      rankingView,
      currentSort,
      sortAsc,
      achievements,
      comparedFriends: [...comparedFriends],
      matchupStats,
      savedAt: new Date().toISOString(),
    };
    const body = _isMalCloudSession()
      ? { malToken: malAuthToken, malUserId: malAuthUser?.id, session }
      : { token: authToken, session };
    const res = await fetch('/.netlify/functions/save-session', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    _setSyncIndicator('saved');
    setTimeout(() => _setSyncIndicator('hidden'), 3000);
  } catch (err) {
    console.warn('Cloud save failed:', err);
    _setSyncIndicator('error');
  }
}

// Called on login / page load (when already logged in).
// Returns the session object or null.
async function _loadCloudSave() {
  if (!_activeCloudUser()) return null;
  try {
    const body = _isMalCloudSession()
      ? { malToken: malAuthToken, malUserId: malAuthUser?.id }
      : { token: authToken };
    const res = await fetch('/.netlify/functions/load-session', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return data?.session ?? null;
  } catch (err) {
    console.warn('Cloud load failed:', err);
    return null;
  }
}

// Compare cloud vs local and prompt if cloud is newer.
// Returns true if the cloud save was applied (caller should skip normal load).
// Applies a cloud save object directly into memory and navigates to battle screen.
// Avoids a full page reload so _cloudSyncEnabled stays true and auto-save keeps working.
function _applyCloudSaveToMemory(cloud) {
  animeList      = cloud.animeList;
  battleCount    = cloud.battleCount    ?? 0;
  currentA       = cloud.currentA       ?? null;
  currentB       = cloud.currentB       ?? null;
  battleHistory  = cloud.battleHistory  ?? [];
  excludedIds    = new Set(cloud.excludedIds    ?? []);
  hiddenFormats  = new Set(cloud.hiddenFormats  ?? []);
  hiddenEpRanges = new Set(cloud.hiddenEpRanges ?? []);
  rankingView    = cloud.rankingView    ?? 'grid';
  franchiseMode  = cloud.franchiseMode  ?? false;
  currentSort    = cloud.currentSort    ?? 'elo';
  sortAsc        = cloud.sortAsc        ?? false;
  // Normalise: Title/Tier/Confidence sort naturally ascending — correct stale saved state
  if (_ascFirstSorts.has(currentSort) && !sortAsc) sortAsc = true;
  achievements    = cloud.achievements   ?? {};
  comparedFriends = new Set(cloud.comparedFriends ?? []);
  matchupStats    = cloud.matchupStats   ?? {};

  // Migrate old data fields
  const _cloudAvgBattles = Math.round((cloud.battleCount || 0) * 2 / Math.max(cloud.animeList.length, 1));
  animeList.forEach(a => {
    if (!a.titleEn)                a.titleEn     = a.title || '';
    if (!a.titleRo)                a.titleRo     = a.title || '';
    if (a.description === undefined) a.description = '';
    if (!a.format)                 a.format      = 'TV';
    if (a.globalScore === undefined) a.globalScore = 0;
    if (a.episodes === undefined)  a.episodes    = 0;
    if (a.status === undefined)    a.status      = 'COMPLETED';
    if (a.battles === undefined)   a.battles     = _cloudAvgBattles;
  });

  if (cloud.saveKey) saveKey = cloud.saveKey;
  _suppressCloudSave = true;
  saveState(); // persist to localStorage — suppress cloud save since we just loaded from cloud
  _suppressCloudSave = false;
}

async function checkAndApplyCloudSave(localSaveKey) {
  if (!_cloudSyncEnabled || !_activeCloudUser()) return false;
  const cloud = await _loadCloudSave();

  // Wipe marker — another device deleted all data. Clear local copy and start fresh.
  if (cloud && cloud._wiped) {
    localStorage.removeItem(localSaveKey);
    showToast('Your data was deleted from another device. Starting fresh.');
    return false; // caller proceeds as if no local data
  }

  if (!cloud || !cloud.animeList || !cloud.saveKey) return false;

  const cloudDate = cloud.savedAt ? new Date(cloud.savedAt) : null;

  // Compare with local — only prompt if cloud has more battles
  const localRaw = localStorage.getItem(localSaveKey);
  if (localRaw) {
    try {
      const local = JSON.parse(localRaw);
      const cloudBattles = cloud.battleCount || 0;
      const localBattles = local.battleCount || 0;
      if (cloudBattles <= localBattles) return false; // local is at least as fresh
    } catch { /* corrupt local save — fall through */ }
  }

  const dateStr    = cloudDate ? cloudDate.toLocaleString() : 'an unknown time';
  const cloudBattles = cloud.battleCount || 0;
  const cloudCount   = cloud.animeList.length;
  const ok = await _confirmAsync(
    '☁️ Newer cloud save found',
    `Saved ${dateStr} — ${cloudBattles} battles across ${cloudCount} anime.\n\nLoad the cloud save? Your local data will be replaced.`,
    'Load cloud save'
  );
  if (!ok) return false;

  try {
    _applyCloudSaveToMemory(cloud);
    return true; // caller should navigate to battle screen
  } catch (err) {
    console.error('Failed to apply cloud save:', err);
    return false;
  }
}

// Manual cloud push — accessible from Manage tab
async function manualCloudPush() {
  if (!_activeCloudUser()) return;
  if (!animeList.length) { showToast('Nothing to save yet — start ranking first.'); return; }
  _setSyncIndicator('saving');
  clearTimeout(_cloudSaveTimer);
  await _doCloudSave();
}

// Manual cloud pull — accessible from Manage tab
async function manualCloudPull() {
  if (!_activeCloudUser()) { showToast('Log in to use cloud sync.'); return; }
  const cloud = await _loadCloudSave();
  if (!cloud || !cloud.animeList) { showToast('No cloud save found yet.'); return; }

  const cloudDate    = cloud.savedAt ? new Date(cloud.savedAt).toLocaleString() : 'unknown time';
  const cloudBattles = cloud.battleCount || 0;
  const cloudCount   = cloud.animeList.length;
  const localBattles = battleCount || 0;

  const ok = await _confirmAsync(
    '☁️ Load cloud save?',
    `Cloud: ${cloudBattles} battles across ${cloudCount} anime (saved ${cloudDate})\nLocal: ${localBattles} battles\n\nThis will replace your local rankings.`,
    'Load cloud save'
  );
  if (!ok) return;

  try {
    _applyCloudSaveToMemory(cloud);
    // Navigate to battle screen if not already there
    const onBattle  = byId(IDS.battleScreen).style.display  !== 'none';
    const onResults = byId(IDS.resultsScreen).style.display !== 'none';
    if (!onBattle && !onResults) {
      hide('username-screen');
      show('battle-screen');
      _showChangeUserBtn();
      if (currentA !== null && currentB !== null) renderCurrentPair(); else renderBattle();
    } else if (onBattle) {
      syncFormatButtons(); syncEpRangeButtons();
      if (currentA !== null && currentB !== null) renderCurrentPair(); else renderBattle();
    } else {
      renderRankingList();
    }
    showToast('✓ Cloud save loaded.');
  } catch (err) {
    showToast('Failed to load cloud save: ' + (err.message || 'unknown error'));
  }
}

// ─── METADATA REFRESH ────────────────────────────────────────────────────────
// Background-fetches title + description from AniList for existing animeList
// objects, patching them in place without touching any battle data.
async function refreshAnimeMetadata() {
  if (!animeList.length) return;
  const btn = byId(IDS.langToggleBtn);
  // The finally block below restores the label from `preferRomaji`, so there's
  // no need to stash the original text here.
  if (btn) { btn.textContent = '⏳ Loading…'; btn.disabled = true; }

  const ids = animeList.map(a => a.id);
  const PAGE_SIZE = 50;
  const metaMap = {};

  try {
    for (let i = 0; i < ids.length; i += PAGE_SIZE) {
      const chunk = ids.slice(i, i + PAGE_SIZE);
      const query = `
        query ($ids: [Int]) {
          Page(perPage: 50) {
            media(id_in: $ids, type: ANIME) {
              id
              title { romaji english }
              description(asHtml: false)
              format
              episodes
              averageScore
            }
          }
        }`;
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { ids: chunk } })
      });
      const json = await res.json();
      const mediaList = json?.data?.Page?.media ?? [];
      mediaList.forEach(m => { metaMap[m.id] = m; });
      if (i + PAGE_SIZE < ids.length) await new Promise(r => setTimeout(r, 350));
    }

    // Patch each anime in place
    animeList.forEach(a => {
      const m = metaMap[a.id];
      if (!m) return;
      a.titleEn = m.title.english || m.title.romaji || a.title;
      a.titleRo = m.title.romaji  || m.title.english || a.title;
      a.description = stripHtml(m.description).slice(0, 500);
      if (m.format) a.format = m.format;
      if (m.episodes) a.episodes = m.episodes;
      if (m.averageScore) a.globalScore = m.averageScore;
    });

    saveState();

    // Re-render wherever we currently are
    if (currentA !== null && currentB !== null &&
        byId(IDS.battleScreen).style.display !== 'none') {
      renderPair(currentA, currentB);
    }
    if (byId(IDS.resultsScreen).style.display !== 'none') {
      renderRankingList();
    }
  } catch (err) {
    console.warn('refreshAnimeMetadata failed:', err);
  } finally {
    if (btn) {
      btn.textContent = preferRomaji ? 'Titles: Romaji' : 'Titles: EN';
      btn.disabled = false;
    }
  }
}

function loadState(username, source = 'anilist') {
  saveKey = source === 'mal'
    ? KESSEN_KEYS.session.mal(username)
    : KESSEN_KEYS.session.anilist(username);
  _saveCollision = false;
  const raw = localStorage.getItem(saveKey);
  if (!raw) return false;
  try {
    const s = JSON.parse(raw);
    // Wipe marker written by another device — clear and start fresh
    if (s._wiped) { localStorage.removeItem(saveKey); return false; }
    // Collision guard: if the saved payload belongs to a different OAuth
    // account than the one currently logged in, treat it as "no save" and
    // block further writes so we don't silently overwrite someone else.
    const owner = _currentOwnerTag();
    if (owner && s._owner && (s._owner.source !== owner.source || String(s._owner.id) !== String(owner.id))) {
      console.warn('[saveKey collision] key', saveKey, 'owned by', s._owner, 'but current user is', owner);
      _saveCollision = true;
      showToast('Another account has saved data under this name. Starting fresh — your existing data is preserved.', 6000);
      return false;
    }
    animeList     = s.animeList;
    battleCount   = s.battleCount;
    currentA      = s.currentA      ?? null;
    currentB      = s.currentB      ?? null;
    battleHistory = s.battleHistory ?? [];
    excludedIds   = new Set(s.excludedIds ?? []);
    hiddenFormats  = new Set(s.hiddenFormats  ?? []);
    hiddenEpRanges = new Set(s.hiddenEpRanges ?? []);
    rankingView    = s.rankingView  ?? 'grid';
    franchiseMode  = s.franchiseMode ?? false;
    currentSort    = s.currentSort  ?? 'elo';
    sortAsc        = s.sortAsc      ?? false;
    // Normalise: Title/Tier/Confidence sort naturally ascending — correct stale saved state
    if (_ascFirstSorts.has(currentSort) && !sortAsc) sortAsc = true;
    achievements    = s.achievements    ?? {};
    comparedFriends = new Set(s.comparedFriends ?? []);
    matchupStats    = s.matchupStats    ?? {};
    // Migrate old saves that predate titleEn/titleRo/description/format fields
    const _avgBattles = Math.round((s.battleCount || 0) * 2 / Math.max(animeList.length, 1));
    animeList.forEach(a => {
      if (!a.titleEn) a.titleEn = a.title || '';
      if (!a.titleRo) a.titleRo = a.title || '';
      if (a.description === undefined) a.description = '';
      if (!a.format) a.format = 'TV';
      if (a.globalScore === undefined) a.globalScore = 0;
      if (a.episodes === undefined) a.episodes = 0;
      if (a.status     === undefined) a.status     = 'COMPLETED';
      if (a.popularity === undefined) a.popularity = 0;
      if (a.battles    === undefined) a.battles    = _avgBattles; // estimated from average
    });
    return true;
  } catch { return false; }
}

// ─── UI HELPERS ─────────────────────────────────────────────────────────────
function show(id)  { document.getElementById(id).style.display = 'block'; }
function hide(id)  { document.getElementById(id).style.display = 'none'; }
function showFlex(id) { document.getElementById(id).style.display = 'flex'; }

let _toastTimer = null;
function showToast(msg, duration = 3000) {
  const el = byId(IDS.toast);
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

function updateProgress() {
  // Confidence = weighted average of per-anime settlement.
  // Each anime contributes linearly from 0 → 1 as its battle count grows toward
  // TARGET_BATTLES_PER_ANIME. This means adding unseen anime pulls the bar back down,
  // and every battle nudges the two participants forward individually.
  const active = animeList.filter(a => !excludedIds.has(a.id));
  const n = active.length;
  if (!n) {
    byId(IDS.progressBar).style.width = '0%';
    byId(IDS.progressInfo).textContent = '0 battles';
    return;
  }
  const totalConf = active.reduce((sum, a) =>
    sum + Math.min(1, (a.battles || 0) / TARGET_BATTLES_PER_ANIME), 0);
  const pct = Math.round(totalConf / n * 100);
  byId(IDS.progressBar).style.width = pct + '%';
  byId(IDS.progressInfo).textContent =
    `${battleCount} battles · ${n} anime`;
}

// ─── ELO ────────────────────────────────────────────────────────────────────
function expectedScore(ra, rb) {
  return 1 / (1 + Math.pow(10, (rb - ra) / 400));
}

function updateElo(winner, loser) {
  const ea = expectedScore(winner.elo, loser.elo);
  const eb = expectedScore(loser.elo, winner.elo);
  winner.elo = Math.round(winner.elo + K * (1 - ea));
  loser.elo  = Math.max(ELO_FLOOR, Math.round(loser.elo + K * (0 - eb)));
  winner.wins++;
  loser.losses++;
  winner.comparisons++;
  loser.comparisons++;
  // ELO history for sparklines (cap at 30 data points each)
  if (!winner.eloHistory) winner.eloHistory = [1200];
  winner.eloHistory.push(winner.elo);
  if (winner.eloHistory.length > 30) winner.eloHistory.shift();
  if (!loser.eloHistory) loser.eloHistory = [1200];
  loser.eloHistory.push(loser.elo);
  if (loser.eloHistory.length > 30) loser.eloHistory.shift();
}

// ─── MATCHMAKING ────────────────────────────────────────────────────────────
// Prefer pairing anime with similar ELO and few comparisons; skip excluded
function pickOpponents() {
  const n = animeList.length;

  // weight: 0 for excluded, lower for fuzzy, higher for fewer comparisons
  const weights = animeList.map(a => {
    if (excludedIds.has(a.id) || hiddenFormats.has(a.format)) return 0;
    const base = 1 / (a.comparisons + 1);
    return a.fuzzy ? base * 0.1 : base;
  });
  const totalW = weights.reduce((s, w) => s + w, 0);

  // Warn user if pool is very small; hide warning when healthy
  const activeCount = weights.filter(w => w > 0).length;
  const poolBanner  = byId(IDS.poolWarningBanner);
  const poolText    = byId(IDS.poolWarningText);
  if (poolBanner) {
    if (activeCount < 2) {
      const msg = animeList.length < 2
        ? '⚠️ You need at least 2 anime in your list to start battling.'
        : '⚠️ All anime are filtered out — remove some filters to keep battling.';
      poolText.textContent = msg;
      poolBanner.classList.add('active');
    } else if (activeCount <= 5) {
      poolText.textContent = `⚠️ Only ${activeCount} anime in your battle pool — remove some filters to see more matchups.`;
      poolBanner.classList.add('active');
    } else {
      poolBanner.classList.remove('active');
    }
  }

  // Fallback: if almost everything is excluded, use first two available
  if (activeCount < 2) {
    const fallback = animeList.map((_, i) => i).filter(i => weights[i] > 0);
    return [fallback[0] ?? 0, fallback[1] ?? 1];
  }

  function weightedPick(exclude) {
    let r = Math.random() * totalW;
    for (let i = 0; i < n; i++) {
      if (i === exclude) continue;
      r -= weights[i];
      if (r <= 0) return i;
    }
    // fallback: find first eligible index
    for (let i = 0; i < n; i++) {
      if (i !== exclude && weights[i] > 0) return i;
    }
    return exclude === 0 ? 1 : 0;
  }

  const idxA = weightedPick(-1);

  // For B: pick from anime with similar ELO to A (within 300 pts), not excluded
  const eloA = animeList[idxA].elo;
  const candidates = animeList
    .map((a, i) => ({ i, a }))
    .filter(({ i }) => i !== idxA && weights[i] > 0 && Math.abs(animeList[i].elo - eloA) < 300)
    .sort((x, y) => x.a.comparisons - y.a.comparisons);

  let idxB;
  if (candidates.length > 0) {
    const pool = candidates.slice(0, Math.min(20, candidates.length));
    idxB = pool[Math.floor(Math.random() * pool.length)].i;
  } else {
    idxB = weightedPick(idxA);
  }

  return [idxA, idxB];
}

// ─── BATTLE RENDERING ────────────────────────────────────────────────────────

// Background migration: fetch idMal (MAL ID) from AniList for any anime in the list
// that were saved before idMal was stored (older saves). Runs silently after session restore.
async function _migrateMalIds() {
  if (!_isMalCloudSession()) return;
  const missing = animeList.filter(a => !a.idMal);
  if (missing.length === 0) return;

  try {
    const ids = missing.map(a => a.id);
    const PAGE_SIZE = 50;
    const idMalMap = {};

    for (let i = 0; i < ids.length; i += PAGE_SIZE) {
      const chunk = ids.slice(i, i + PAGE_SIZE);
      const query = `query ($ids: [Int]) {
        Page(perPage: 50) {
          media(id_in: $ids, type: ANIME) { id idMal }
        }
      }`;
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ query, variables: { ids: chunk } }),
      });
      const data = await res.json();
      (data?.data?.Page?.media ?? []).forEach(m => { if (m.idMal) idMalMap[m.id] = m.idMal; });
      if (i + PAGE_SIZE < ids.length) await new Promise(r => setTimeout(r, 250));
    }

    let migrated = 0;
    animeList.forEach(a => {
      if (!a.idMal && idMalMap[a.id]) { a.idMal = idMalMap[a.id]; migrated++; }
    });

    if (migrated > 0) {
      saveState();
      scheduleCloudSave();
      // Re-render current pair so links immediately show MAL
      if (currentA !== null && currentB !== null) renderCurrentPair();
    }
  } catch (err) {
    console.warn('[kessen] idMal migration failed:', err);
  }
}

// Single shared render — always sets globals AND updates DOM together
// Returns the appropriate external URL for an anime — MAL for MAL sessions, AniList otherwise.
// Falls back to AniList if the anime doesn't have an idMal stored (e.g. old saves).
function _animeExternalUrl(anime) {
  if (_isMalCloudSession() && anime.idMal) {
    return `https://myanimelist.net/anime/${anime.idMal}`;
  }
  return `https://anilist.co/anime/${anime.id}`;
}
function _animeExternalLabel(anime) {
  return (_isMalCloudSession() && anime.idMal) ? 'MAL' : 'AniList';
}

function renderPair(ia, ib) {
  currentA = ia;
  currentB = ib;
  const a = animeList[ia];
  const b = animeList[ib];
  const imgA = byId(IDS.imgA);
  const imgB = byId(IDS.imgB);
  imgA.classList.remove('img-broken');
  imgB.classList.remove('img-broken');
  imgA.src = a.cover;
  imgA.alt = displayTitle(a);
  byId(IDS.titleA).textContent = displayTitle(a);
  byId(IDS.eloA).textContent   = `ELO ${a.elo}`;
  byId(IDS.epMetaA).innerHTML =
    (a.format === 'MOVIE' ? '<span class="ep-badge">Movie</span>'
      : a.episodes ? `<span class="ep-badge">${a.episodes} ep</span>` : '') +
    _statusBadge(a.status);
  imgB.src = b.cover;
  imgB.alt = displayTitle(b);
  byId(IDS.titleB).textContent = displayTitle(b);
  byId(IDS.eloB).textContent   = `ELO ${b.elo}`;
  byId(IDS.epMetaB).innerHTML =
    (b.format === 'MOVIE' ? '<span class="ep-badge">Movie</span>'
      : b.episodes ? `<span class="ep-badge">${b.episodes} ep</span>` : '') +
    _statusBadge(b.status);

  // External links — AniList or MAL depending on session type
  const linkA = byId(IDS.anilistA);
  const linkB = byId(IDS.anilistB);
  linkA.href        = _animeExternalUrl(a);
  linkA.textContent = `↗ ${_animeExternalLabel(a)}`;
  linkB.href        = _animeExternalUrl(b);
  linkB.textContent = `↗ ${_animeExternalLabel(b)}`;

  // Fuzzy button states
  const fuzzyBtnA = byId(IDS.fuzzyA);
  fuzzyBtnA.classList.toggle('active', !!a.fuzzy);
  fuzzyBtnA.textContent = a.fuzzy ? '🌫 Fuzzy' : "🌫 Can't remember";

  const fuzzyBtnB = byId(IDS.fuzzyB);
  fuzzyBtnB.classList.toggle('active', !!b.fuzzy);
  fuzzyBtnB.textContent = b.fuzzy ? '🌫 Fuzzy' : "🌫 Can't remember";

  // Synopsis panels — reset, scroll back to top, and pre-fill content
  const synA = byId(IDS.synopsisA);
  const synB = byId(IDS.synopsisB);
  synA.style.display = 'none';
  synB.style.display = 'none';
  synA.textContent = a.description || 'No description available.';
  synB.textContent = b.description || 'No description available.';

  updateProgress();
  _applyBlindState();
  // Collapse per-card secondary actions between battles so each new pair
  // starts clean (§5.3). Tip is a no-op on desktop / after first dismiss.
  _resetCardActionsExpansion();
  maybeShowLongPressTip();
}

function renderCurrentPair() {
  renderPair(currentA, currentB);
}

function renderBattle() {
  let ia, ib;
  if (nextPairOverride && nextPairOverride.length > 0) {
    [ia, ib] = nextPairOverride.shift();
    if (nextPairOverride.length === 0) nextPairOverride = null;
  } else if (settleMode) {
    const pair = pickSettlePair();
    [ia, ib] = pair ?? pickOpponents();
  } else {
    [ia, ib] = pickOpponents();
  }
  renderPair(ia, ib);
  saveState();
}

function pickWinner(side) {
  if (towerMode) { pickWinnerTower(side); return; }
  const winnerIdx = side === 0 ? currentA : currentB;
  const loserIdx  = side === 0 ? currentB : currentA;

  // Capture everything needed to undo BEFORE any mutations
  // Also snapshot the matchup entry so undo can restore it exactly
  const wId = animeList[winnerIdx].id;
  const lId = animeList[loserIdx].id;
  const _mKey = [Math.min(wId, lId), Math.max(wId, lId)].join('-');
  const snap = {
    winnerIdx, loserIdx,
    winnerSnap:   { ...animeList[winnerIdx] },
    loserSnap:    { ...animeList[loserIdx] },
    battleCount,
    pairA: currentA,
    pairB: currentB,
    matchupKey:  _mKey,
    matchupSnap: matchupStats[_mKey] ? { ...matchupStats[_mKey], wins: { ...matchupStats[_mKey].wins } } : null,
  };

  // Apply ELO changes and record history
  const eloBefore     = animeList[winnerIdx].elo;
  const loserEloBefore = animeList[loserIdx].elo;
  const eloDiffBefore = loserEloBefore - eloBefore; // positive = winner was underdog
  updateElo(animeList[winnerIdx], animeList[loserIdx]);
  animeList[winnerIdx].battles = (animeList[winnerIdx].battles || 0) + 1;
  animeList[loserIdx].battles  = (animeList[loserIdx].battles  || 0) + 1;

  // Update per-anime streaks (stored on anime object — survives history truncation)
  const w = animeList[winnerIdx];
  const l = animeList[loserIdx];
  w.streak = (w.streak?.type === 'win') ? { type: 'win', count: (w.streak.count || 0) + 1 } : { type: 'win', count: 1 };
  l.streak = (l.streak?.type === 'loss') ? { type: 'loss', count: (l.streak.count || 0) + 1 } : { type: 'loss', count: 1 };

  // Update persistent matchup stats (used for rivalries)
  if (!matchupStats[_mKey]) {
    matchupStats[_mKey] = {
      wins: {}, total: 0,
      titleA: wId < lId ? w.title : l.title,
      titleB: wId < lId ? l.title : w.title,
    };
  }
  matchupStats[_mKey].wins[wId] = (matchupStats[_mKey].wins[wId] || 0) + 1;
  matchupStats[_mKey].total++;
  battleHistory.unshift({
    winnerId:       animeList[winnerIdx].id,
    loserId:        animeList[loserIdx].id,
    winnerTitle:    animeList[winnerIdx].title,
    loserTitle:     animeList[loserIdx].title,
    winnerEloAfter: animeList[winnerIdx].elo,
    loserEloAfter:  animeList[loserIdx].elo,
    eloSwing:       animeList[winnerIdx].elo - eloBefore,
    eloDiffBefore,
  });
  if (battleHistory.length > MAX_HISTORY) battleHistory.pop();

  const prevCount = battleCount;
  battleCount++;
  checkMilestone(prevCount, battleCount);
  checkSessionSummary();
  _checkAchievements();
  saveState();

  // Pick and show the next pair FIRST — then push a snapshot onto the undo stack
  renderBattle();
  _pushUndoSnapshot({ ...snap, nextA: currentA, nextB: currentB });
}

function _pushUndoSnapshot(snap) {
  undoStack.push(snap);
  if (undoStack.length > MAX_UNDO_DEPTH) undoStack.shift(); // evict oldest
  prevState = undoStack[undoStack.length - 1]; // keep prevState in sync for any legacy reads
  _updateUndoBtn();
}

function _updateUndoBtn() {
  const btn = byId(IDS.undoBtn);
  if (!btn) return;
  btn.disabled = undoStack.length === 0;
  btn.title    = undoStack.length > 1 ? `Undo (${undoStack.length} available)` : 'Undo last battle';
}

function undoLast() {
  if (undoStack.length === 0) return;

  const { winnerIdx, loserIdx, winnerSnap, loserSnap, battleCount: savedCount, pairA, pairB, nextA, nextB, matchupKey, matchupSnap } = undoStack.pop();

  // Restore anime ELO/stats (including streak)
  animeList[winnerIdx] = { ...winnerSnap };
  animeList[loserIdx]  = { ...loserSnap };

  // Restore matchup stats
  if (matchupKey) {
    if (matchupSnap) matchupStats[matchupKey] = matchupSnap;
    else delete matchupStats[matchupKey];
  }

  // Restore battle count and remove last history entry
  battleCount = savedCount;
  if (battleHistory.length > 0) battleHistory.shift();

  // After undo, if the user re-picks from pairA/pairB, restore the same next pair
  nextPairOverride = [[nextA, nextB], ...(nextPairOverride || [])];

  prevState = undoStack.length > 0 ? undoStack[undoStack.length - 1] : null;
  _updateUndoBtn();

  // Show the original pair
  renderPair(pairA, pairB);
  updateProgress();
  saveState();
}

function skipBattle() {
  const snap = {
    winnerIdx:  currentA,  // reuse winnerIdx/loserIdx fields for the two anime
    loserIdx:   currentB,
    winnerSnap: { ...animeList[currentA] },
    loserSnap:  { ...animeList[currentB] },
    battleCount,
    pairA: currentA,
    pairB: currentB,
  };

  animeList[currentA].comparisons++;
  animeList[currentB].comparisons++;

  renderBattle(); // sets currentA/currentB to next pair

  _pushUndoSnapshot({ ...snap, nextA: currentA, nextB: currentB });
}

// ─── RESULTS ────────────────────────────────────────────────────────────────
function getSortedList() {
  const dir = sortAsc ? 1 : -1;
  switch (currentSort) {
    case 'winrate':
      return [...animeList].sort((a, b) => {
        const ra = (a.wins + a.losses) > 0 ? a.wins / (a.wins + a.losses) : 0;
        const rb = (b.wins + b.losses) > 0 ? b.wins / (b.wins + b.losses) : 0;
        return (ra - rb) * dir;
      });
    case 'battles':  return [...animeList].sort((a, b) => ((a.battles || 0) - (b.battles || 0)) * dir);
    case 'score':    return [...animeList].sort((a, b) => ((a.globalScore || 0) - (b.globalScore || 0)) * dir);
    case 'title':    return [...animeList].sort((a, b) => displayTitle(a).localeCompare(displayTitle(b)) * dir);
    case 'tier': {
      const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
      const eloSorted = [...animeList].sort((a, b) => b.elo - a.elo);
      const rankMap   = new Map(eloSorted.map((a, i) => [a.id, i]));
      return [...animeList].sort((a, b) => {
        const ta = tierOrder[getTier(rankMap.get(a.id) ?? 0, animeList.length)] ?? 5;
        const tb = tierOrder[getTier(rankMap.get(b.id) ?? 0, animeList.length)] ?? 5;
        return ta !== tb ? (ta - tb) * dir : (b.elo - a.elo); // within tier, sort by ELO
      });
    }
    case 'confidence': {
      const confOrder = { confident: 0, settling: 1, uncertain: 2 };
      return [...animeList].sort((a, b) => {
        const ca = confOrder[confidenceLabel(a.battles || 0).cls] ?? 3;
        const cb = confOrder[confidenceLabel(b.battles || 0).cls] ?? 3;
        return ca !== cb ? (ca - cb) * dir : (b.elo - a.elo); // within confidence, sort by ELO
      });
    }
    default:         return [...animeList].sort((a, b) => (a.elo - b.elo) * dir);
  }
}

function _buildRankCard(anime, i, eloRankMap, totalLen) {
  const eloRank = eloRankMap.get(anime.id) ?? i;
  const displayRank = eloRank + 1; // always show true ELO rank, regardless of current sort
  const numClass = displayRank === 1 ? 'gold' : displayRank === 2 ? 'silver' : displayRank === 3 ? 'bronze' : '';
  const conf = confidenceLabel(anime.battles || 0);
  const tier = getTier(eloRank, totalLen);

  const card = document.createElement('div');
  card.className = 'rank-card';
  card.dataset.format  = anime.format || 'TV';
  card.dataset.epRange = epRange(anime.episodes, anime.format);
  card.dataset.tier    = tier;
  card.dataset.conf    = conf.cls;
  card.dataset.animeId = anime.id;
  card.style.cursor = 'pointer';
  card.title = 'Click for details';
  card.addEventListener('click', () => showAnimeDetail(anime.id));
  const sortExtra = currentSort === 'winrate'
    ? `<div class="rank-elo">${(a => (a.wins+a.losses)>0 ? Math.round(a.wins/(a.wins+a.losses)*100)+'% WR' : '–')(anime)}</div>`
    : currentSort === 'battles' ? `<div class="rank-elo">${anime.battles || 0} battles</div>`
    : currentSort === 'score'   ? `<div class="rank-elo">${anime.globalScore ? anime.globalScore+'%' : 'Unscored'}</div>`
    : `<div class="rank-elo">ELO ${anime.elo}</div>`;
  const epBadge = anime.format === 'MOVIE'
    ? `<span class="ep-badge">Movie</span>`
    : anime.episodes ? `<span class="ep-badge">${anime.episodes} ep</span>` : '';
  card.innerHTML = `
    <span class="rank-number ${numClass}">#${displayRank}</span>
    <span class="tier-badge t-${tier.toLowerCase()}">${tier}</span>
    <img src="${anime.cover}" alt="${displayTitle(anime)}" loading="lazy" />
    <div class="rank-title">${displayTitle(anime)}</div>
    ${epBadge}
    ${_statusBadge(anime.status)}
    ${sortExtra}
    <span class="confidence ${conf.cls}" title="${conf.title}">${conf.dot} ${conf.label}</span>
    ${anime.fuzzy ? '<span class="fuzzy-tag" title="Can&#39;t Remember \u2014 you selected this option during a battle. This anime appears less often until you&#39;ve refreshed your memory of it.">&#x1F32B; Fuzzy</span>' : ''}
    ${streakBadge(anime)}
  `;
  if (showFuzzyOnly && !anime.fuzzy)                             card.style.display = 'none';
  if (hiddenFormats.has(anime.format))                           card.style.display = 'none';
  if (hiddenEpRanges.has(epRange(anime.episodes, anime.format))) card.style.display = 'none';
  if (excludedIds.has(anime.id))                                 card.style.display = 'none';
  return card;
}

// ─── FRANCHISE GROUPING ───────────────────────────────────────────────────────
// Strips common sequel/season suffixes to find a base franchise name.
// e.g. "Attack on Titan Season 2" → "Attack on Titan"
//      "My Hero Academia 2nd Season" → "My Hero Academia"
//      "Sword Art Online: Alicization" → "Sword Art Online"
function _franchiseBaseName(title) {
  return title
    // Strip parenthetical format/year qualifiers e.g. "(TV)", "(2019)", "(Movie)"
    .replace(/\s*\([^)]*\)\s*$/, '')
    // Strip -Japanese Subtitle- wrappers (e.g. "Demon Slayer -Kimetsu no Yaiba-")
    .replace(/\s*-[^-\s][^-]*-/g, '')
    // Strip "tri." franchise label (e.g. "Digimon Adventure tri. Chapter 1")
    .replace(/\s+tri\.?\s*(Chapter.*)?$/i, '')
    // Strip "Chapter N" markers (e.g. "Digimon Adventure tri. Chapter 1: Reunion")
    .replace(/\s+Chapter\s*[\d]+.*$/i, '')
    // Strip all-caps subtitle word + colon (e.g. "SPY x FAMILY CODE: White" → "SPY x FAMILY")
    .replace(/\s+[A-Z]{2,}:.*$/, '')
    // Strip everything from colon onwards (e.g. ": Kimetsu no Yaiba", ": The Final Season")
    .replace(/\s*:.*$/, '')
    // Strip OVA/Special/Recap suffixes (e.g. "Baccano! Specials", "Series Name OVA")
    .replace(/[!\s]+(Specials?|OVAs?|ONAs?|Recaps?|Extra|Encore)$/i, s => s.startsWith('!') ? '!' : '')
    // Normalise trailing ! count so "Show!" and "Show!!" match
    .replace(/!+$/, '!')
    // Strip "The Movie" and anything after
    .replace(/\s+(The\s+)?Movie\b.*/i, '')
    // Strip "Final Season/Part/Chapter" as a phrase first
    .replace(/\s+(Final|The\s+Final)\s+(Season|Part|Chapter|Arc|Cour).*$/i, '')
    // Strip season/part/cour markers with number
    .replace(/\s+(Season|Part|Cour)\s*[IVXivx\d]+.*$/i, '')
    .replace(/\s+\d+(?:st|nd|rd|th)\s+Season.*$/i, '')
    // Strip bare "Season" with nothing after
    .replace(/\s+Season\s*$/i, '')
    // Strip trailing Roman numerals (II, III etc.) but NOT single I or X
    // to avoid mangling titles like "To Be Hero X" or "Danmachi I"
    .replace(/\s+(II|III|IV|VI|VII|VIII|IX|XI|XII|XX?)$/i, '')
    .replace(/[\s×✕✗]+[\d×✕✗]+$/, '')
    // Strip common spin-off/sequel single-word suffixes
    .replace(/\s+(Twin|Twins|Origins?|Returns?|Revenge|Reborn|Reload|Revolution)$/i, '')
    // Strip trailing standalone numbers
    .replace(/\s+\d+$/, '')
    // Normalise trailing ? after all sequel markers removed
    .replace(/\?+$/, '')
    .trim();
}

function _franchiseKey(title) {
  return _franchiseBaseName(title).toLowerCase();
}

// Build franchise groups from the current animeList.
// Returns an array of group objects sorted by best ELO descending.
function _buildFranchiseGroups(sorted) {
  // keyMap: any normalised key (English or Romaji) → canonical group key
  // This lets an anime stored with its Romaji title still find a group that
  // was created under the English title, and vice-versa.
  const keyMap = new Map();
  const groups = new Map(); // canonical key → { name, members }

  for (const a of sorted) {
    const enRaw = a.titleEn || a.title || '';
    const roRaw = a.titleRo || a.title || '';
    const enKey = _franchiseKey(enRaw);
    const roKey = _franchiseKey(roRaw);

    // Check if either key already has a group
    const canon = keyMap.get(enKey) || keyMap.get(roKey) || enKey;

    if (!groups.has(canon)) {
      // Display name uses the current language preference
      const displayRaw = preferRomaji ? (a.titleRo || a.title || '') : enRaw;
      groups.set(canon, { name: _franchiseBaseName(displayRaw) || _franchiseBaseName(enRaw), members: [] });
    }

    // Register both keys so future anime with either title variant find this group
    keyMap.set(enKey, canon);
    if (roKey !== enKey) keyMap.set(roKey, canon);

    groups.get(canon).members.push(a);
  }

  const result = [];
  for (const group of groups.values()) {
    group.members.sort((a, b) => b.elo - a.elo);
    group.bestElo = Math.round(group.members.reduce((s, a) => s + a.elo, 0) / group.members.length);
    group.cover   = group.members[0].cover;
    group.format  = group.members[0].format;
    // Aggregate stats across all members
    const totalWins    = group.members.reduce((s, a) => s + (a.wins    || 0), 0);
    const totalLosses  = group.members.reduce((s, a) => s + (a.losses  || 0), 0);
    const totalBattles = group.members.reduce((s, a) => s + (a.battles || 0), 0);
    const scoredMembers = group.members.filter(a => a.globalScore > 0);
    group.totalBattles = totalBattles;
    group.winRate      = (totalWins + totalLosses) > 0
      ? Math.round(totalWins / (totalWins + totalLosses) * 100) : null;
    group.avgScore     = scoredMembers.length
      ? Math.round(scoredMembers.reduce((s, a) => s + a.globalScore, 0) / scoredMembers.length) : 0;
    if (group.members.length === 1) {
      group.name = displayTitle(group.members[0]);
    }
    result.push(group);
  }
  // Compute ELO rank for each group (used for tier badge regardless of sort order)
  const eloSorted = [...result].sort((a, b) => b.bestElo - a.bestElo);
  eloSorted.forEach((g, i) => { g.eloRank = i; });

  // Sort groups by the current sort metric using aggregated values
  const dir = sortAsc ? 1 : -1;
  switch (currentSort) {
    case 'title':
      result.sort((a, b) => a.name.localeCompare(b.name) * dir);
      break;
    case 'winrate':
      result.sort((a, b) => ((a.winRate ?? -1) - (b.winRate ?? -1)) * dir);
      break;
    case 'battles':
      result.sort((a, b) => (a.totalBattles - b.totalBattles) * dir);
      break;
    case 'score':
      result.sort((a, b) => (a.avgScore - b.avgScore) * dir);
      break;
    case 'tier':
      result.sort((a, b) => (a.eloRank - b.eloRank) * dir);
      break;
    case 'confidence':
      result.sort((a, b) => (a.totalBattles - b.totalBattles) * dir);
      break;
    default: // elo
      result.sort((a, b) => (a.bestElo - b.bestElo) * dir);
  }
  return result;
}

function toggleFranchiseMode() {
  franchiseMode = !franchiseMode;
  const btn = document.getElementById('franchise-btn');
  if (btn) {
    btn.classList.toggle('active', franchiseMode);
    btn.setAttribute('aria-pressed', franchiseMode ? 'true' : 'false');
  }
  _applyRankingViewState();
  _saveViewPrefs();
  renderRankingList();
}

// Single source of truth for showing/hiding ranking-list vs table.
// Franchise mode always uses ranking-list; otherwise respects rankingView.
function _applyRankingViewState() {
  const list  = byId(IDS.rankingList);
  const table = byId(IDS.rankingTableWrap);
  if (!list || !table) return;
  if (franchiseMode) {
    // Grid: use ranking-list (normal grid). List: use ranking-table-wrap.
    list.style.display  = rankingView === 'grid' ? '' : 'none';
    table.style.display = rankingView === 'list' ? '' : 'none';
    list.classList.remove('franchise-view');
  } else {
    list.classList.remove('franchise-view');
    list.style.display  = rankingView === 'grid' ? '' : 'none';
    table.style.display = rankingView === 'list' ? '' : 'none';
  }
}

function _buildFranchiseCard(group, rank, totalGroups) {
  const isSingle = group.members.length === 1;
  const card = document.createElement('div');
  card.className = 'rank-card franchise-group' + (isSingle ? ' franchise-single' : '');
  card.dataset.franchiseName = group.name;

  // Tier is always based on ELO rank, not current sort position
  const tier = getTier(group.eloRank ?? rank, totalGroups);
  const tierColors = { S:'#ff9b00', A:'#3fb950', B:'#58a6ff', C:'#d29922', D:'#f85149' };
  const tierColor = tierColors[tier] || '#8b949e';
  const tierBadge = `<span class="rank-tier" style="background:${tierColor}22;color:${tierColor};border-color:${tierColor}44">${tier}</span>`;
  const countBadge = !isSingle ? `<span class="franchise-count">${group.members.length} entries</span>` : '';
  const conf = confidenceLabel(group.totalBattles || 0);
  const wrStr = group.winRate !== null ? group.winRate + '%' : '–';
  const membersHtml = !isSingle ? `
    <div class="franchise-members" style="display:none">
      ${group.members.map(a => `
        <div class="franchise-member" onclick="showAnimeDetail(${a.id})">
          <img src="${esc(a.cover || '')}" alt="" onerror="this.style.display='none'" />
          <span class="franchise-member-title">${esc(a.titleEn || a.title)}</span>
          <span class="franchise-member-elo">${a.elo}</span>
        </div>`).join('')}
    </div>` : '';

  if (rankingView === 'grid') {
    card.classList.add('franchise-grid-card');
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      if (!e.target.closest('.franchise-expand-btn') && !e.target.closest('.franchise-members'))
        showFranchiseDetail(group.name);
    });
    card.innerHTML = `
      <span class="rank-number">#${rank + 1}</span>
      <span class="tier-badge t-${tier.toLowerCase()}">${tier}</span>
      <img src="${esc(group.cover || '')}" alt="" onerror="this.style.display='none'" />
      <div class="rank-title">${esc(group.name)}</div>
      ${countBadge ? `<div class="franchise-grid-meta">${countBadge}</div>` : ''}
      <div class="rank-elo">ELO ${group.bestElo}</div>
      <span class="confidence ${conf.cls}">${conf.dot} ${conf.label}</span>
      ${!isSingle ? `<button class="franchise-expand-btn" onclick="toggleFranchiseExpand(this.closest('.franchise-group'))">▸ See all entries</button>` : ''}
      ${membersHtml}
    `;
  } else {
    card.innerHTML = `
      <div class="franchise-header" onclick="toggleFranchiseExpand(this.closest('.franchise-group'))" ondblclick="event.stopPropagation();showFranchiseDetail('${esc(group.name)}')" title="Double-click for franchise overview">
        <img src="${esc(group.cover || '')}" alt="" onerror="this.style.display='none'" />
        <div class="franchise-info">
          <div class="franchise-name rank-title">${esc(group.name)}</div>
          <div class="franchise-meta">
            ${tierBadge}
            <span class="franchise-elo">ELO ${group.bestElo}</span>
            <span class="franchise-elo">${wrStr} WR · ${group.totalBattles} battles</span>
            ${countBadge}
          </div>
        </div>
        ${!isSingle ? '<span class="franchise-chevron">▸</span>' : ''}
      </div>
      ${membersHtml}
    `;
  }
  return card;
}

function showFranchiseDetail(groupName) {
  // Use unfiltered list so all franchise members show regardless of active filters
  const groups = _buildFranchiseGroups(getSortedList());
  const group  = groups.find(g => g.name === groupName);
  if (!group) return;

  const tier = getTier(group.eloRank ?? 0, groups.length);
  const wrStr = group.winRate !== null ? group.winRate + '%' : '–';
  const conf  = confidenceLabel(group.totalBattles || 0);
  const fmtLabel = { TV:'TV Series', MOVIE:'Movie', OVA:'OVA', ONA:'ONA', TV_SHORT:'Short', SPECIAL:'Special' };

  const membersHtml = group.members.map((a, i) => {
    const memberTier = getTier(
      [...animeList].sort((x,y) => y.elo - x.elo).findIndex(x => x.id === a.id),
      animeList.length
    );
    const wr = (a.wins + a.losses) > 0
      ? Math.round(a.wins / (a.wins + a.losses) * 100) + '%' : '–';
    return `<div class="franchise-detail-member" onclick="closeDetailModal();showAnimeDetail(${a.id})">
      <img src="${esc(a.cover || '')}" alt="" onerror="this.style.display='none'" />
      <div class="franchise-detail-member-info">
        <div class="franchise-detail-member-title">${esc(displayTitle(a))}</div>
        <div class="franchise-detail-member-stats">
          <span class="tier-badge t-${memberTier.toLowerCase()}" style="position:static;display:inline-flex">${memberTier}</span>
          <span>ELO ${a.elo}</span>
          <span>${wr} WR</span>
        </div>
      </div>
    </div>`;
  }).join('');

  // Reuse the detail modal
  const coverEl = byId(IDS.modalCover);
  coverEl.classList.remove('img-broken');
  coverEl.src = group.cover;
  coverEl.alt = group.name;
  byId(IDS.modalTitle).textContent = group.name;
  const tierHtml = `<span class="tier-badge t-${tier.toLowerCase()}" style="position:static;display:inline-flex;margin-right:6px">${tier}</span>`;
  byId(IDS.modalRankLine).innerHTML = `${tierHtml}${group.members.length} entries · Avg ELO ${group.bestElo}`;
  byId(IDS.modalMetaLine).textContent = `${wrStr} win rate · ${group.totalBattles} total battles · ${conf.label}`;
  byId(IDS.modalGenres).style.display = 'none';
  const totalWins   = group.members.reduce((s,a) => s + (a.wins||0), 0);
  const totalLosses = group.members.reduce((s,a) => s + (a.losses||0), 0);
  byId(IDS.modalWins).textContent    = totalWins;
  byId(IDS.modalLosses).textContent  = totalLosses;
  byId(IDS.modalEloVal).textContent  = group.bestElo;
  byId(IDS.modalWinrateVal).textContent = wrStr;

  byId(IDS.modalConfidenceWrap).innerHTML =
    `<span class="confidence ${conf.cls}">${conf.dot} ${conf.label} · ${group.totalBattles} battles</span>`;

  // Hide fields that don't apply to a franchise
  byId(IDS.modalGenres).style.display = 'none';
  byId(IDS.modalAnilistBtn).style.display = 'none';
  byId(IDS.modalUnfuzzyBtn).style.display = 'none';

  // Sparkline — average ELO history across all members that have one.
  // Each history is resampled to a common length so they can be averaged point-by-point.
  const sparkWrap = byId(IDS.modalSparklineWrap);
  const histories = group.members.map(a => a.eloHistory).filter(h => h && h.length >= 2);
  if (histories.length > 0) {
    const POINTS = Math.max(...histories.map(h => h.length));
    const combined = Array.from({ length: POINTS }, (_, i) => {
      const vals = histories.map(h => {
        // Interpolate shorter histories to fit POINTS length
        const t = i / (POINTS - 1);
        const idx = t * (h.length - 1);
        const lo = Math.floor(idx), hi = Math.ceil(idx);
        return h[lo] + (h[hi] - h[lo]) * (idx - lo);
      });
      return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
    });
    byId(IDS.modalSparkline).innerHTML = buildSparkline(combined);
    sparkWrap.style.display = 'block';
  } else {
    sparkWrap.style.display = 'none';
  }

  // Combined recent battles from all members
  const memberIds = new Set(group.members.map(a => a.id));
  const memberTitles = new Set(group.members.map(a => a.title));
  const related = battleHistory
    .filter(h => h.winnerId != null
      ? memberIds.has(h.winnerId) || memberIds.has(h.loserId)
      : memberTitles.has(h.winnerTitle) || memberTitles.has(h.loserTitle))
    .slice(0, 10);
  const recentEl = byId(IDS.modalRecent);
  if (related.length > 0) {
    recentEl.innerHTML = '<h4>Recent Battles</h4>' + related.map(h => {
      const isWin = h.winnerId != null ? memberIds.has(h.winnerId) : memberTitles.has(h.winnerTitle);
      const subject = isWin ? h.winnerTitle : h.loserTitle;
      const opponent = isWin ? h.loserTitle : h.winnerTitle;
      return `<div class="modal-recent-item">
        <span class="${isWin ? 'modal-win' : 'modal-loss'}">${isWin ? '✓ W' : '✗ L'} <em style="color:#8b949e;font-size:0.75rem">${esc(subject)}</em> vs ${esc(opponent)}</span>
        <span style="color:#8b949e">${isWin ? '+' : '−'}${h.eloSwing} ELO</span>
      </div>`;
    }).join('');
  } else {
    recentEl.innerHTML = '';
  }

  // Replace description with the member list
  const descEl = byId(IDS.modalDescription);
  if (descEl) {
    descEl.innerHTML = `<div class="franchise-detail-members">${membersHtml}</div>`;
    descEl.style.display = 'block';
    descEl.style.opacity = '1';
  }

  byId(IDS.detailModal).style.display = 'flex';
  byId(IDS.detailModal).scrollTop = 0;
}

function closeDetailModal() {
  byId(IDS.detailModal).style.display = 'none';
}

function toggleFranchiseExpand(el) {
  const card = el.classList.contains('franchise-group') ? el : el.closest('.franchise-group');
  const members = card?.querySelector('.franchise-members');
  const chevron = card?.querySelector('.franchise-chevron');
  if (!members) return;
  const isOpen = members.style.display !== 'none';
  members.style.display = isOpen ? 'none' : 'block';
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(90deg)';
}

// Returns the sorted list with format/ep-range/excluded filters applied —
// used as input to franchise grouping so hidden anime are excluded from groups.
function _franchiseSortedList() {
  return getSortedList().filter(a =>
    !excludedIds.has(a.id) &&
    !hiddenFormats.has(a.format) &&
    !hiddenEpRanges.has(epRange(a.episodes, a.format)) &&
    (!showFuzzyOnly || a.fuzzy)
  );
}

function renderRankingList() {
  const gen = ++_renderGen;
  const list = byId(IDS.rankingList);
  list.innerHTML = '';

  if (franchiseMode) {
    ++_renderGen; // invalidate any pending non-franchise renderChunk callbacks
    if (rankingView === 'list') {
      renderFranchiseTable();
    } else {
      const sorted = _franchiseSortedList();
      let groups = _buildFranchiseGroups(sorted);
      const frag = document.createDocumentFragment();
      groups.forEach((group, i) => frag.appendChild(_buildFranchiseCard(group, i, groups.length)));
      list.appendChild(frag);
    }
    _filterFranchise(); // apply any active search term
    return;
  }

  const sorted = getSortedList();
  const eloSorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const eloRankMap = new Map(eloSorted.map((a, i) => [a.id, i]));

  const CHUNK = 60;
  function renderChunk(start) {
    if (_renderGen !== gen) return; // newer render started — abort
    const frag = document.createDocumentFragment();
    const end = Math.min(start + CHUNK, sorted.length);
    for (let i = start; i < end; i++) {
      frag.appendChild(_buildRankCard(sorted[i], i, eloRankMap, sorted.length));
    }
    list.appendChild(frag);
    filterRankings(); // re-apply search + format filters after each batch
    if (end < sorted.length) {
      const schedule = window.requestIdleCallback || (fn => setTimeout(fn, 0));
      schedule(() => renderChunk(end));
    }
  }
  renderChunk(0);

  if (rankingView === 'list') renderRankingTable();
}

function showResults() {
  hide('battle-screen');
  hide('username-screen');
  hide('tower-summary-screen');

  // Reset search and fuzzy filter — preserve sort, view, and format filters
  byId(IDS.searchInput).value = '';
  showFuzzyOnly = false;
  if (!currentSort) currentSort = 'elo';
  const ffBtn = byId(IDS.fuzzyFilterBtn);
  if (ffBtn) ffBtn.classList.remove('active');
  // Sync sort buttons and table headers to restored sort state
  _syncSortUI();
  // Sync view buttons and panels to current rankingView
  _applyRankingViewState();
  // Load local-only view preferences (grid/list, franchise) before rendering
  _loadViewPrefs();
  byId(IDS.viewGridBtn)?.classList.toggle('active', rankingView === 'grid');
  byId(IDS.viewListBtn)?.classList.toggle('active', rankingView === 'list');
  const franchiseBtn = document.getElementById('franchise-btn');
  if (franchiseBtn) {
    franchiseBtn.classList.toggle('active', franchiseMode);
    franchiseBtn.setAttribute('aria-pressed', franchiseMode ? 'true' : 'false');
  }
  _applyRankingViewState();

  byId(IDS.resultsSubtitle).textContent =
    `After ${battleCount} battles · Rankings update as you keep going`;

  syncFormatButtons();
  syncEpRangeButtons();
  renderRankingList();
  show('results-screen');
  switchResultsTab('rankings');
  // Check achievements on load so existing saves are retroactively credited
  setTimeout(_checkAchievements, 500);
  // Start polling for new anime if logged in via either service (deferred so ranking renders first)
  if ((authToken && authUser) || (malAuthToken && malAuthUser)) setTimeout(_startNewAnimePolling, 2000);
}

// ─── CONFIDENCE ──────────────────────────────────────────────────────────────
// Uses a.battles (actual picks only) so skips don't inflate confidence.
// Thresholds are relative to TARGET_BATTLES_PER_ANIME (= 10).
function confidenceLabel(battles) {
  if (battles < 3)  return { cls: 'uncertain', dot: '●', label: 'Uncertain', title: `${battles} battles — fewer than 3, ranking not reliable yet` };
  if (battles < TARGET_BATTLES_PER_ANIME) return { cls: 'settling',  dot: '●', label: 'Settling',  title: `${battles} battles — ranking is stabilising` };
  return                                         { cls: 'confident', dot: '●', label: 'Confident', title: `${battles} battles — ranking is well established` };
}

// ─── STREAKS ─────────────────────────────────────────────────────────────────
function _titleMatches(stored, anime) {
  // Match against all title variants to handle legacy history entries robustly
  return stored && (stored === anime.title || stored === anime.titleEn || stored === anime.titleRo);
}

function getStreak(anime) {
  // Read from the persistent per-anime streak field.
  // Falls back to scanning history for legacy saves that predate this field.
  if (anime.streak?.type) return { type: anime.streak.type, count: anime.streak.count || 0 };

  // Legacy fallback: scan recent history (capped at 200)
  let streak = 0, streakType = null;
  for (const h of battleHistory) {
    const isWin  = h.winnerId != null ? h.winnerId === anime.id : _titleMatches(h.winnerTitle, anime);
    const isLoss = h.loserId  != null ? h.loserId  === anime.id : _titleMatches(h.loserTitle,  anime);
    if (!isWin && !isLoss) continue;
    if (streakType === null) streakType = isWin ? 'win' : 'loss';
    if ((streakType === 'win' && isWin) || (streakType === 'loss' && isLoss)) streak++;
    else break;
  }
  return { type: streakType, count: streak };
}

function _statusBadge(status) {
  if (status === 'CURRENT')   return '<span class="status-badge watching">👁️ Watching</span>';
  if (status === 'REPEATING') return '<span class="status-badge rewatching">🔄 Rewatching</span>';
  return '';
}

function streakBadge(anime) {
  const { type, count } = getStreak(anime);
  if (type === 'win'  && count >= 3) return `<span class="streak-badge streak-hot" title="${count} wins in a row">🔥${count}</span>`;
  if (type === 'loss' && count >= 3) return `<span class="streak-badge streak-cold" title="${count} losses in a row">📉${count}</span>`;
  return '';
}

// ─── HISTORY ─────────────────────────────────────────────────────────────────
function toggleHistory() { switchResultsTab('history'); }

function renderHistory() {
  const list = byId(IDS.historyList);
  const countEl = document.getElementById('history-count');
  if (countEl) countEl.textContent = battleHistory.length > 0
    ? `${battleHistory.length} battle${battleHistory.length !== 1 ? 's' : ''} recorded (most recent first)`
    : '';
  list.innerHTML = '';
  if (battleHistory.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:#8b949e;padding:24px">No battles recorded yet.</p>';
    return;
  }
  const frag = document.createDocumentFragment();
  battleHistory.forEach((h, i) => {
    const row = document.createElement('div');
    row.className = 'history-item';
    row.dataset.titles = ((h.winnerTitle || '') + ' ' + (h.loserTitle || '')).toLowerCase();
    const num = battleHistory.length - i;
    const swing = h.eloSwing > 0 ? `+${h.eloSwing}` : String(h.eloSwing);
    row.innerHTML = `
      <span class="history-num">#${num}</span>
      <span class="winner">🏆 ${esc(h.winnerTitle || '–')}</span>
      <span class="elo-change">${swing} ELO</span>
      <span class="loser">${esc(h.loserTitle || '–')}</span>
    `;
    frag.appendChild(row);
  });
  list.appendChild(frag);
  const searchEl = byId(IDS.historySearch);
  if (searchEl && searchEl.value) filterHistory(searchEl.value);
}

function _filterFranchise() {
  const q = (byId(IDS.searchInput)?.value || '').toLowerCase().trim();
  if (rankingView === 'grid') {
    document.querySelectorAll('#ranking-list .franchise-group').forEach(card => {
      const name = (card.dataset.franchiseName || '').toLowerCase();
      card.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
  } else {
    // List mode — filter group header rows and hide/show their members together
    document.querySelectorAll('#ranking-table-body .franchise-table-group').forEach(row => {
      const title = row.querySelector('.tbl-title')?.textContent?.toLowerCase() || '';
      const show  = !q || title.includes(q);
      row.style.display = show ? '' : 'none';
      const gid = row.dataset.gid;
      if (gid) document.querySelectorAll(`[data-member-gid="${gid}"]`).forEach(r => {
        r.style.display = show ? (r.style.display === 'none' && !r.dataset.expanded ? 'none' : '') : 'none';
      });
    });
  }
}

function filterHistory(q) {
  const term = q.trim().toLowerCase();
  const rows = document.querySelectorAll('#history-list .history-item');
  rows.forEach(row => {
    row.style.display = (!term || row.dataset.titles.includes(term)) ? '' : 'none';
  });
}

function resumeBattle() {
  hide('results-screen');
  show('battle-screen');
  maybeShowKbTip();
}

function exportRankings() {
  const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const text = sorted.map((a, i) =>
    `${(i+1).toString().padStart(3, ' ')}. ${a.title} (ELO: ${a.elo})`
  ).join('\n');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('📋 Rankings copied to clipboard.'))
      .catch(() => _exportRankingsFallback(text));
  } else {
    _exportRankingsFallback(text);
  }
}

function _exportRankingsFallback(text) {
  const area = byId(IDS.exportArea);
  area.value = text;
  const isHidden = window.getComputedStyle(area).display === 'none';
  area.style.display = isHidden ? 'block' : 'none';
}

function exportCSV() {
  const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const headers = ['Rank','Title','ELO','Tier','Win Rate','Wins','Losses','Battles','AniList Avg','Format','Season Year'];
  const rows = sorted.map((a, i) => {
    const tier = getTier(i, sorted.length);
    const battles = a.battles || 0;
    const winRate = (a.wins + a.losses) > 0 ? Math.round((a.wins || 0) / (a.wins + a.losses) * 100) + '%' : 'N/A';
    const avgScore = a.globalScore != null ? a.globalScore + '%' : '';
    const fmt = a.format || '';
    const year = a.seasonYear || '';
    // Escape any commas or quotes in title
    const safeTitle = '"' + (a.title || '').replace(/"/g, '""') + '"';
    return [i + 1, safeTitle, a.elo, tier, winRate, a.wins || 0, a.losses || 0, battles, avgScore, fmt, year].join(',');
  });
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const nameFromKey = saveKey ? saveKey.replace(/^kessen\.session\.(anilist|mal)\./, '') : '';
  link.download = (nameFromKey ? nameFromKey + '_' : '') + 'anime_rankings.csv';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ─── TIER LIST IMAGE EXPORT ──────────────────────────────────────────────────
// Load a cover image for canvas drawing by fetching it fresh as a blob URL.
// This bypasses any cached non-CORS version (which would taint the canvas),
// and works regardless of whether the user is on AniList, MAL, or guest mode.
async function _loadCoverForCanvas(url, timeoutMs = 3000) {
  if (!url) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { mode: 'cors', cache: 'no-cache', signal: controller.signal });
    clearTimeout(timer);
    if (!resp.ok) return null;
    const blob = await resp.blob();
    const objectUrl = URL.createObjectURL(blob);
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(objectUrl); resolve(img); };
      img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(null); };
      img.src = objectUrl;
    });
  } catch {
    clearTimeout(timer);
    return null;
  }
}

// ─── TIER LIST IMAGE GENERATION (§5.2.5) ─────────────────────────────────────
// Builds a PNG blob of the current tier list. Shared by the download button
// (exportTierListImage) and the share modal's native-share / copy / download
// flows (shareTierListImage, copyTierListImageToClipboard).
async function _buildTierListBlob() {
  const COVER_W = 65, COVER_H = 92;
  const LABEL_W = 58, GAP = 4, H_PAD = 10, V_PAD = 8;
  const CANVAS_W = 900;
  const PER_ROW = Math.floor((CANVAS_W - LABEL_W - H_PAD * 2 + GAP) / (COVER_W + GAP));

  const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const TIER_ORDER  = ['S', 'A', 'B', 'C', 'D'];
  const TIER_COLORS = { S: '#ff9b00', A: '#3fb950', B: '#58a6ff', C: '#d29922', D: '#f85149' };
  const TIER_BG     = { S: '#2d1f00', A: '#0d2016', B: '#0d1b2e', C: '#1e1600', D: '#200d0d' };

  // Group by tier
  const groups = {};
  TIER_ORDER.forEach(t => groups[t] = []);
  sorted.forEach((a, i) => groups[getTier(i, sorted.length)].push(a));

  // Row height for a tier (covers + padding)
  const tierH = t => {
    const n = groups[t].length;
    if (!n) return 0;
    const rows = Math.ceil(n / PER_ROW);
    return V_PAD + rows * COVER_H + (rows - 1) * GAP + V_PAD;
  };

  const HEADER_H = 72, FOOTER_H = 32, DIVIDER = 1;
  const totalH = HEADER_H + TIER_ORDER.reduce((s, t) => s + (groups[t].length ? tierH(t) + DIVIDER : 0), 0) + FOOTER_H;

  // Load all covers fresh via fetch → blob URL so canvas is never tainted.
  // Works for AniList, MAL, and guest mode — no crossOrigin cache conflicts.
  const imgCache = new Map();
  await Promise.all(sorted.map(async a => {
    if (!a.cover) return;
    const img = await _loadCoverForCanvas(a.cover);
    if (img) imgCache.set(a.cover, img);
  }));

  const canvas = document.createElement('canvas');
  canvas.width  = CANVAS_W;
  canvas.height = totalH;
  const ctx = canvas.getContext('2d');

  // ── Background ──────────────────────────────────────────────────────────
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, CANVAS_W, totalH);

  // ── Header ───────────────────────────────────────────────────────────────
  const user = (saveKey || '').replace(/^kessen\.session\.(anilist|mal)\./, '');
  ctx.fillStyle = '#e6edf3';
  ctx.font = 'bold 26px ui-sans-serif, system-ui, Arial, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText('⚔️  Kessen Tier List', 20, 30);
  ctx.fillStyle = '#8b949e';
  ctx.font = '14px ui-sans-serif, system-ui, Arial, sans-serif';
  ctx.fillText(`${user}  ·  ${sorted.length} anime  ·  ${battleCount} battles`, 22, 56);

  // ── Tiers ────────────────────────────────────────────────────────────────
  let y = HEADER_H;
  for (const t of TIER_ORDER) {
    const anime = groups[t];
    if (!anime.length) continue;
    const rh = tierH(t);

    // Tier tinted background
    ctx.fillStyle = TIER_BG[t];
    ctx.fillRect(0, y, CANVAS_W, rh);

    // Tier colour strip on the left
    ctx.fillStyle = TIER_COLORS[t];
    ctx.fillRect(0, y, LABEL_W, rh);

    // Tier letter
    ctx.fillStyle = '#000';
    ctx.font = 'bold 30px ui-sans-serif, system-ui, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(t, LABEL_W / 2, y + rh / 2);
    ctx.textAlign = 'left';

    // Covers
    anime.forEach((a, idx) => {
      const row = Math.floor(idx / PER_ROW);
      const col = idx % PER_ROW;
      const cx  = LABEL_W + H_PAD + col * (COVER_W + GAP);
      const cy  = y + V_PAD + row * (COVER_H + GAP);
      const img = imgCache.get(a.cover);
      if (img) {
        ctx.drawImage(img, cx, cy, COVER_W, COVER_H);
      } else {
        // Placeholder: tinted block + title initials
        ctx.fillStyle = '#21262d';
        ctx.fillRect(cx, cy, COVER_W, COVER_H);
        ctx.fillStyle = TIER_COLORS[t] + '88';
        ctx.font = '9px ui-sans-serif, system-ui, Arial, sans-serif';
        ctx.textBaseline = 'top';
        const words = (a.title || '').replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean).slice(0, 5);
        words.forEach((w, wi) => ctx.fillText(w.slice(0, 10), cx + 3, cy + 4 + wi * 13));
        ctx.textBaseline = 'middle';
      }
    });

    // Divider
    y += rh;
    ctx.fillStyle = '#21262d';
    ctx.fillRect(0, y, CANVAS_W, DIVIDER);
    y += DIVIDER;
  }

  // ── Footer ───────────────────────────────────────────────────────────────
  ctx.fillStyle = '#30363d';
  ctx.font = '12px ui-sans-serif, system-ui, Arial, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'right';
  ctx.fillText('kessen.co.uk', CANVAS_W - 16, y + FOOTER_H / 2);

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Canvas.toBlob returned null');
  const filename = `kessen-tierlist${user ? '-' + user : ''}.png`;
  return { blob, filename, canvas };
}

async function exportTierListImage() {
  const btns = [
    byId(IDS.exportImageBtn),
    byId(IDS.sharePrimaryBtn),
  ].filter(Boolean);
  const origText = new Map(btns.map(b => [b, b.textContent]));
  btns.forEach(b => { b.disabled = true; b.textContent = '⏳ Generating…'; });

  try {
    const { blob, filename } = await _buildTierListBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } catch (e) {
    showToast('⚠️ Image export failed: ' + e.message);
  } finally {
    btns.forEach(b => { b.disabled = false; b.textContent = origText.get(b); });
  }
}

// ─── BACKUP / RESTORE ────────────────────────────────────────────────────────
function downloadBackup() {
  if (!animeList || !animeList.length) {
    showToast('Nothing to back up yet — start ranking first.');
    return;
  }
  const payload = {
    _version:     4,
    _exportedAt:  new Date().toISOString(),
    saveKey,
    animeList,
    battleCount,
    currentA,
    currentB,
    battleHistory,
    excludedIds:    [...excludedIds],
    hiddenFormats:  [...hiddenFormats],
    hiddenEpRanges: [...hiddenEpRanges],
    rankingView,
    franchiseMode,
    currentSort,
    sortAsc,
    achievements,
    comparedFriends: [...comparedFriends],
    matchupStats,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href  = url;
  const name = saveKey ? saveKey.replace(/^kessen\.session\.(anilist|mal)\./, '') : 'backup';
  link.download = name + '_anime_backup.json';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

async function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  // Reset so the same file can be re-imported if needed
  event.target.value = '';

  const msgEl = byId(IDS.backupImportMsg);
  msgEl.style.display = 'block';
  msgEl.style.color = '#8b949e';
  msgEl.textContent = 'Reading file…';

  let payload;
  try {
    const text = await file.text();
    payload = JSON.parse(text);
  } catch {
    msgEl.style.color = '#f85149';
    msgEl.textContent = '✗ Could not read file — make sure it is a valid backup JSON.';
    return;
  }

  if (!payload.saveKey || !Array.isArray(payload.animeList) || !payload.animeList.length) {
    msgEl.style.color = '#f85149';
    msgEl.textContent = '✗ File does not look like a valid anime ranker backup.';
    return;
  }

  const count    = payload.animeList.length;
  const battles  = payload.battleCount || 0;
  const exported = payload._exportedAt ? new Date(payload._exportedAt).toLocaleDateString() : 'unknown date';
  const ok = await _confirmAsync(
    '📦 Import backup?',
    `Backup from ${exported} — ${count} anime, ${battles} battles.\n\nThis will replace your current rankings for "${payload.saveKey.replace(/^kessen\.session\.(anilist|mal)\./, '').replace(/^anime_elo_(mal_)?/, '')}". Your existing data will be lost.`,
    'Import'
  );
  if (!ok) {
    msgEl.style.display = 'none';
    return;
  }

  try {
    localStorage.setItem(payload.saveKey, JSON.stringify({
      animeList:      payload.animeList,
      battleCount:    payload.battleCount    ?? 0,
      currentA:       payload.currentA       ?? null,
      currentB:       payload.currentB       ?? null,
      battleHistory:  payload.battleHistory  ?? [],
      excludedIds:    payload.excludedIds    ?? [],
      hiddenFormats:  payload.hiddenFormats  ?? [],
      hiddenEpRanges: payload.hiddenEpRanges ?? [],
      rankingView:    payload.rankingView    ?? 'grid',
      currentSort:    payload.currentSort    ?? 'elo',
      sortAsc:        payload.sortAsc        ?? false,
      achievements:    payload.achievements   ?? {},
      comparedFriends: payload.comparedFriends ?? [],
      matchupStats:    payload.matchupStats    ?? {},
    }));
    msgEl.style.color = '#3fb950';
    msgEl.textContent = `✓ Imported ${count} anime — reloading…`;
    setTimeout(() => location.reload(), 800);
  } catch (err) {
    msgEl.style.color = '#f85149';
    msgEl.textContent = '✗ Failed to save: ' + (err.message || 'unknown error');
  }
}

let _confirmCancelCb = null;
function _showConfirm(title, body, okLabel, onOk, onCancel) {
  byId(IDS.confirmModalTitle).textContent = title;
  byId(IDS.confirmModalBody).textContent  = body;
  const okBtn = byId(IDS.confirmModalOk);
  okBtn.textContent = okLabel;
  okBtn.onclick = () => { _confirmCancelCb = null; _confirmCancel(); onOk(); };
  _confirmCancelCb = onCancel || null;
  byId(IDS.confirmModal).classList.add('open');
}
function _confirmCancel() {
  byId(IDS.confirmModal).classList.remove('open');
  if (_confirmCancelCb) { const cb = _confirmCancelCb; _confirmCancelCb = null; cb(); }
}
// Promise-based wrapper — lets async functions await the user's choice
function _confirmAsync(title, body, okLabel) {
  return new Promise(resolve => {
    _showConfirm(title, body, okLabel, () => resolve(true), () => resolve(false));
  });
}

function resetAll() {
  _showConfirm(
    '🔄 Reset everything?',
    'This will permanently delete all your battle history, rankings, and achievements for this account. There is no undo.',
    'Yes, reset',
    () => {
      if (saveKey) localStorage.removeItem(saveKey);
      // Remember who was logged in so we can re-trigger their list load
      // without asking them to sign in again. We capture BEFORE clearing
      // ranking state since saveKey / tokens may be touched downstream.
      const wasAniList      = !!(authToken && authUser);
      const wasMAL          = !!(malAuthToken && malAuthUser);
      const rememberedName  = authUser?.name || '';
      _clearRankingState();
      // Re-enter the normal loading flow so the user gets a fresh session
      // with the same list they started from. Guest mode just lands on home.
      if (wasAniList) {
        const input = byId(IDS.usernameInput);
        if (input) input.value = rememberedName;
        startLoading();
      } else if (wasMAL) {
        _startMALOAuthSession();
      }
      // Guest: already on the username screen via _clearRankingState
      showToast('✓ Reset — starting fresh.');
    }
  );
}

async function deleteAllData() {
  const ok = await _confirmAsync(
    '🗑️ Delete all my data?',
    'This permanently deletes your rankings from this device and from cloud storage. You will be logged out. There is no undo.',
    'Yes, delete everything'
  );
  if (!ok) return;

  // 1. Replace the cloud save with a wipe marker — do NOT delete the blob.
  //    Leaving the marker means other devices will see it on next login and
  //    clear themselves. It will be overwritten naturally when the user next saves.
  let cloudDeleteOk = true;
  try {
    const body = authToken
      ? { token: authToken }
      : { malToken: malAuthToken, malUserId: malAuthUser?.id };
    if (body.token || body.malToken) {
      const resp = await fetch('/.netlify/functions/save-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...body,
          session: JSON.stringify({ _wiped: true, wipedAt: new Date().toISOString() }),
        }),
      });
      if (!resp.ok) cloudDeleteOk = false;
    }
  } catch { cloudDeleteOk = false; }

  // 2. Remove every Kessen key from localStorage. Covers the consolidated
  //    `kessen.*` namespace (§6.2.17) plus legacy `anime_elo_*` and `kessen_*`
  //    (single-underscore) keys that pre-dated the migration.
  const keysToRemove = Object.keys(localStorage).filter(k =>
    k.startsWith('anime_elo_') ||
    k.startsWith('kessen.')    ||
    k.startsWith('kessen_')
  );
  keysToRemove.forEach(k => localStorage.removeItem(k));

  // 3. In-memory reset: auth first, then ranking state. Avoids a
  //    location.reload flash and cancels any in-flight cloud-save debounce.
  authToken       = null;
  authUser        = null;
  malAuthToken    = null;
  malRefreshToken = null;
  malAuthUser     = null;
  _updateAuthUI();
  _updateMALAuthUI();
  _clearRankingState();

  if (cloudDeleteOk) {
    showToast('✓ All your data has been deleted.');
  } else {
    showToast('⚠️ Local data cleared, but cloud data could not be deleted. Log back in and try again, or email feedback@kessen.co.uk.', 6000);
  }
}

// Show the Change User button unless the current session IS the user's own OAuth account.
// OAuth users viewing their own list use the header logout button instead.
// If they're browsing someone else's list (or have no OAuth at all), show it.
function _showChangeUserBtn() {
  const ownAniList = !!(authToken && authUser && saveKey === KESSEN_KEYS.session.anilist(authUser.name));
  const ownMAL     = !!(malAuthToken && malAuthUser && saveKey === KESSEN_KEYS.session.mal(malAuthUser.name));
  if (ownAniList || ownMAL) return;
  byId(IDS.changeUserBtn).style.display = 'block';
}

function changeUser() {
  if (battleCount > 0) {
    _showConfirm(
      'Switch user?',
      'Your progress is saved and will resume next time you enter this username.',
      'Switch',
      () => _doChangeUser()
    );
    return;
  }
  _doChangeUser();
}
function _doChangeUser() {
  hide('battle-screen');
  hide('results-screen');
  byId(IDS.changeUserBtn).style.display = 'none';
  byId(IDS.progressInfo).textContent = '';
  byId(IDS.usernameInput).value = '';
  showFlex('username-screen');
}

// ─── SOURCE TOGGLE (AniList / MAL) ──────────────────────────────────────────
let importSource = 'anilist'; // 'anilist' | 'mal'

function setSource(src) {
  importSource = src;
  // Both service cards are always visible — no toggling needed.
  byId(IDS.errorMsg).style.display = 'none';
}

// ─── MAL IMPORT (Jikan API + XML fallback) ───────────────────────────────────
async function handleMalFile(file) {
  if (!file) return;
  const errEl = byId(IDS.errorMsg);
  errEl.style.display = 'none';
  try {
    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('Invalid XML file.');

    const userEl = doc.querySelector('myinfo user_name');
    const malUsername = userEl ? userEl.textContent.trim() : 'mal_user';
    const seedFromScores = byId(IDS.malWarmStartChk).checked;

    const WATCHED = new Set(['Completed', 'Watching', 'Rewatching']);
    const entries = [];
    doc.querySelectorAll('anime').forEach(node => {
      const status = node.querySelector('my_status')?.textContent?.trim();
      if (!WATCHED.has(status)) return;
      const malId = parseInt(node.querySelector('series_animedb_id')?.textContent || '0');
      const score = parseInt(node.querySelector('my_score')?.textContent || '0');
      const title = node.querySelector('series_title')?.textContent?.trim() || '';
      if (malId) entries.push({ malId, score, title });
    });
    if (entries.length === 0) throw new Error('No completed anime found in export.');

    const existingSaveKey = KESSEN_KEYS.session.mal(malUsername);
    const myGen = ++_loadGeneration;
    hide('username-screen');
    errEl.style.display = 'none';
    showFlex('loading-screen');
    _startLoadCancelTimer();
    await _buildAnimeListFromMalEntries(entries, malUsername, seedFromScores, existingSaveKey, myGen);
  } catch (err) {
    _clearLoadCancelTimer();
    errEl.textContent = 'MAL import failed: ' + err.message;
    errEl.style.display = 'block';
  }
}

// Shared: fetch AniList metadata for MAL entries and launch the session.
// genCheck: optional generation value from the calling load function; when provided,
//   the navigation to battle-screen is skipped if the load was cancelled.
async function _buildAnimeListFromMalEntries(entries, malUsername, seedFromScores, existingSaveKey, genCheck) {
  const malIds  = entries.map(e => e.malId);
  const scoreMap = new Map(entries.map(e => [e.malId, e.score]));
  const PAGE_SIZE = 50;
  const mediaMap = {};

  byId(IDS.loadingMsg).textContent =
    `Found ${entries.length} anime. Fetching metadata from AniList…`;

  for (let i = 0; i < malIds.length; i += PAGE_SIZE) {
    const chunk = malIds.slice(i, i + PAGE_SIZE);
    const query = `
      query ($ids: [Int]) {
        Page(perPage: 50) {
          media(idMal_in: $ids, type: ANIME) {
            id idMal
            title { romaji english }
            coverImage { medium large }
            description(asHtml: false)
            format
            averageScore
            genres
            seasonYear
            popularity
          }
        }
      }`;
    const msgEl2 = byId(IDS.loadingMsg);
    const res = await _anilistFetch(
      { query, variables: { ids: chunk } },
      { onStatus: msg => { if (msgEl2) msgEl2.textContent = msg; } }
    );
    const json = await res.json();
    (json?.data?.Page?.media ?? []).forEach(m => { mediaMap[m.idMal] = m; });
    byId(IDS.loadingMsg).textContent =
      `Matching to AniList… ${Math.min(i + PAGE_SIZE, malIds.length)}/${malIds.length}`;
    if (i + PAGE_SIZE < malIds.length) await new Promise(r => setTimeout(r, 350));
  }

  animeList = entries
    .filter(e => mediaMap[e.malId])
    .map(e => {
      const m = mediaMap[e.malId];
      const userScore = scoreMap.get(e.malId) || 0;
      const startElo  = seedFromScores ? scoreToElo(userScore) : 1200;
      const titleEn   = m.title.english || m.title.romaji;
      const titleRo   = m.title.romaji  || m.title.english;
      return {
        id: m.id, title: titleEn, titleEn, titleRo,
        cover: m.coverImage.large || m.coverImage.medium,
        description: stripHtml(m.description || '').slice(0, 500),
        format: m.format || 'TV',
        globalScore: m.averageScore || 0,
        genres: m.genres || [],
        seasonYear: m.seasonYear || null,
        popularity: m.popularity || 0,
        elo: startElo, wins: 0, losses: 0, comparisons: 0, battles: 0,
        fuzzy: false, eloHistory: [startElo],
        anilistScore: 0, malScore: userScore,
        idMal: m.idMal || null,
      };
    });

  if (animeList.length === 0) throw new Error('Could not match any MAL entries to AniList data. Make sure your MAL list is public and has completed anime.');
  if (animeList.length === 1) throw new Error('Only 1 anime matched — you need at least 2 to start ranking. Add more completed anime on MAL first.');

  const seedMsg = seedFromScores ? ' · ELO seeded from MAL scores' : '';
  byId(IDS.loadingMsg).textContent =
    `Loaded ${animeList.length} anime from MAL${seedMsg}. Preparing first battle…`;
  await new Promise(r => setTimeout(r, 800));

  saveKey = existingSaveKey;
  battleCount = 0;
  excludedIds = new Set();
  saveState();
  _clearLoadCancelTimer();
  hide('loading-screen');
  if (genCheck !== undefined && genCheck !== _loadGeneration) return;
  show('battle-screen');
  _showChangeUserBtn();
  renderBattle();
  // §5.2.12 — Offer to merge guest progress (MAL OAuth path).
  maybeOfferGuestMerge(saveKey);
}

// ─── RECOMMENDATIONS ─────────────────────────────────────────────────────────
let recsTab = 'foryou'; // 'foryou' | 'seasonal' | 'predict'

// Cache rendered HTML per sub-tab so switching back doesn't re-hit the API.
// null means "not yet loaded".
const _recsCache = {};   // tab → { html: string, gridDisplay: string }
let _recsLoadedTab = null; // which tab's content is currently in the grid

function refreshDiscover() {
  if (recsTab === 'predict') return;
  // Bust cache for the current tab and force a fresh fetch
  delete _recsCache[recsTab];
  _recsLoadedTab = null;
  const grid = byId(IDS.recsGrid);
  const btn  = byId(IDS.discoverRefreshBtn);
  grid.innerHTML = '';
  grid.style.display = 'grid';
  if (btn) { btn.textContent = '↻ Refreshing…'; btn.disabled = true; }
  const tabAtLoad = recsTab;
  _loadRecsGrid().then(() => {
    _recsCache[tabAtLoad] = { html: grid.innerHTML, gridDisplay: grid.style.display };
    _recsLoadedTab = tabAtLoad;
    if (btn) { btn.textContent = '↻ Refresh'; btn.disabled = false; }
  });
}

function setRecsTab(tab) {
  recsTab = tab;
  byId(IDS.recsTabForyou).classList.toggle('active', tab === 'foryou');
  byId(IDS.recsTabSeasonal).classList.toggle('active', tab === 'seasonal');
  byId(IDS.recsTabPredict).classList.toggle('active', tab === 'predict');

  const isPredict = tab === 'predict';
  const sub        = byId(IDS.recsSubText);
  const grid       = byId(IDS.recsGrid);
  const predictSec = byId(IDS.predictorSection);
  const refreshBtn = byId(IDS.discoverRefreshBtn);

  if (sub)        sub.style.display        = isPredict ? 'none' : '';
  if (grid)       grid.style.display       = isPredict ? 'none' : (grid.style.display || '');
  if (predictSec) predictSec.style.display = isPredict ? ''     : 'none';
  if (refreshBtn) refreshBtn.style.display = isPredict ? 'none' : '';

  if (!isPredict) {
    if (tab === 'foryou') {
      sub.textContent = 'Based on your top-ranked anime — titles you haven\'t seen yet that AniList thinks you\'ll love.';
    } else {
      const { season, year } = getCurrentSeason();
      const nextS = getNextSeason(season, year);
      sub.textContent = `Airing this season (${season} ${year}) and next (${nextS.season} ${nextS.year}) — filtered to titles you haven't watched.`;
    }

    // Restore from cache if available — avoids redundant API calls
    if (_recsCache[tab]) {
      grid.innerHTML     = _recsCache[tab].html;
      grid.style.display = _recsCache[tab].gridDisplay;
      _recsLoadedTab     = tab;
    } else {
      // First visit to this sub-tab: fetch and then cache the result
      const tabAtLoad = tab;
      grid.style.display = 'grid';
      _loadRecsGrid().then(() => {
        _recsCache[tabAtLoad] = { html: grid.innerHTML, gridDisplay: grid.style.display };
        _recsLoadedTab = tabAtLoad;
      });
    }
  }
}

function getCurrentSeason() {
  const now = new Date();
  const m = now.getMonth(); // 0-11
  const y = now.getFullYear();
  const season = m < 3 ? 'WINTER' : m < 6 ? 'SPRING' : m < 9 ? 'SUMMER' : 'FALL';
  return { season, year: y };
}

function getNextSeason(season, year) {
  const order = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
  const idx = order.indexOf(season);
  const nextIdx = (idx + 1) % 4;
  return { season: order[nextIdx], year: nextIdx === 0 ? year + 1 : year };
}

async function fetchRecommendationsForYou() {
  // Returns { grouped: true, groups: [{seed, recs[]}] } or { grouped: false, items: [...] }
  const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const seeds  = sorted.slice(0, 3); // top 3 seeds — one group each
  const ownIds = new Set(animeList.map(a => a.id));
  const usedIds = new Set(); // dedup across groups
  const groups = [];

  const query = `
    query ($id: Int) {
      Media(id: $id) {
        recommendations(perPage: 25, sort: RATING_DESC) {
          nodes {
            rating
            mediaRecommendation {
              id idMal title { romaji english } coverImage { large medium }
              averageScore format status
            }
          }
        }
      }
    }`;

  for (let rank = 0; rank < seeds.length; rank++) {
    const anime = seeds[rank];
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { id: anime.id } })
      });
      const json = await res.json();
      const nodes = json?.data?.Media?.recommendations?.nodes ?? [];
      const recs = [];
      for (const n of nodes) {
        const rec = n.mediaRecommendation;
        if (!rec || ownIds.has(rec.id) || usedIds.has(rec.id) || rec.status === 'NOT_YET_RELEASED') continue;
        recs.push({ media: rec, score: n.rating || 1 });
        usedIds.add(rec.id);
        if (recs.length >= 4) break;
      }
      if (recs.length >= 2) groups.push({ seed: anime, recs });
    } catch { /* individual seed failure — keep going */ }
    if (rank < seeds.length - 1) await new Promise(r => setTimeout(r, 700));
  }

  // Fallback: if recommendations are too sparse, return flat highly-rated list
  const totalRecs = groups.reduce((s, g) => s + g.recs.length, 0);
  if (totalRecs < 4) {
    const items = await _fetchHighlyRatedUnseen(ownIds);
    return { grouped: false, items: items.slice(0, 10) };
  }

  return { grouped: true, groups };
}

// ─── RELATION NOTE ────────────────────────────────────────────────────────────
let _recRelationsCache = new Map(); // mediaId → relations object, populated by _fetchRecRelations

async function _fetchRecRelations(ids) {
  if (!ids.length) return;
  const query = `
    query($ids: [Int]) {
      Page(perPage: 50) {
        media(id_in: $ids, type: ANIME) {
          id
          relations { edges { relationType node { id title { romaji english } } } }
        }
      }
    }`;
  try {
    const res  = await fetch('https://graphql.anilist.co', {
      method: 'POST', headers: anilistHeaders(),
      body: JSON.stringify({ query, variables: { ids } })
    });
    const json = await res.json();
    (json?.data?.Page?.media ?? []).forEach(m => _recRelationsCache.set(m.id, m.relations));
  } catch { /* relations are decorative — silently skip */ }
}

function _getRelationNote(media) {
  const relations = media.relations ?? _recRelationsCache.get(media.id);
  const edges = relations?.edges;
  if (!edges?.length) return '';
  const eloSorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const eloRankMap = new Map(eloSorted.map((a, i) => [a.id, i + 1]));
  const ownMap     = new Map(animeList.map(a => [a.id, a]));

  // Priority: PREQUEL first (most actionable), then PARENT, SEQUEL, SIDE_STORY
  const priority = ['PREQUEL', 'PARENT', 'SEQUEL', 'SIDE_STORY', 'ALTERNATIVE'];
  const matches = edges
    .filter(e => priority.includes(e.relationType) && ownMap.has(e.node.id))
    .sort((a, b) => priority.indexOf(a.relationType) - priority.indexOf(b.relationType));

  if (!matches.length) return '';

  const { relationType, node } = matches[0];
  const relTitle = node.title.english || node.title.romaji;
  const rank = eloRankMap.get(node.id);

  if (relationType === 'PREQUEL')
    return `<div class="rec-relation-note">📺 Sequel to <strong>${relTitle}</strong> — you have it at <strong>#${rank}</strong></div>`;
  if (relationType === 'SEQUEL')
    return `<div class="rec-relation-note">⏮ Watch this before <strong>${relTitle}</strong> (your <strong>#${rank}</strong>)</div>`;
  if (relationType === 'PARENT')
    return `<div class="rec-relation-note">🔗 Part of <strong>${relTitle}</strong> — you have it at <strong>#${rank}</strong></div>`;
  return `<div class="rec-relation-note">🔗 Related to <strong>${relTitle}</strong> (your <strong>#${rank}</strong>)</div>`;
}

// ─── REC CARD HTML HELPER ─────────────────────────────────────────────────────
function recCardHtml(media, opts = {}) {
  const { seasonLabel = '', watched = false, tasteScore = null } = opts;
  const title        = media.title.english || media.title.romaji;
  const cover        = media.coverImage?.large || media.coverImage?.medium;
  const avg          = media.averageScore ? (media.averageScore / 10).toFixed(1) : '–';
  const relationNote = _getRelationNote(media);
  const watchedTag   = watched
    ? '<span style="font-size:0.65rem;background:#21262d;color:#8b949e;padding:2px 6px;border-radius:8px;margin-top:2px;display:inline-block">✓ Watched</span>'
    : '';
  // Show a taste badge on seasonal cards that match the user's genres well
  const tasteTag = (tasteScore !== null && tasteScore >= 0.65 && !watched)
    ? '<span style="font-size:0.65rem;background:#1a2d1a;color:#3fb950;border:1px solid #238636;padding:2px 6px;border-radius:8px;margin-top:2px;display:inline-block">✓ Matches your taste</span>'
    : '';
  const recUrl = (_isMalCloudSession() && media.idMal)
    ? `https://myanimelist.net/anime/${media.idMal}`
    : `https://anilist.co/anime/${media.id}`;
  return `
    <a class="rec-card" href="${recUrl}" target="_blank"
       style="${watched ? 'opacity:0.45' : ''}">
      <img src="${cover}" alt="Cover art for ${esc(title)}" loading="lazy" />
      <div class="rec-card-body">
        <div class="rec-card-title">${title}</div>
        <div class="rec-card-meta">${media.format || ''}${seasonLabel ? ' · ' + seasonLabel : ''}</div>
        <span class="rec-score-pill">⭐ ${avg}</span>
        ${tasteTag}
        ${relationNote}
        ${watchedTag}
      </div>
    </a>`;
}

// Fallback: top-rated anime on AniList that the user hasn't seen.
// Avoids id_not_in (hits AniList complexity limits for large lists) — fetches a pool
// and filters client-side instead.
async function _fetchHighlyRatedUnseen(ownIds) {
  const query = `
    {
      Page(perPage: 50) {
        media(type: ANIME, sort: SCORE_DESC,
              status: FINISHED, averageScore_greater: 78, popularity_greater: 30000) {
          id idMal title { romaji english } coverImage { large medium } averageScore format
        }
      }
    }`;
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: anilistHeaders(),
      body: JSON.stringify({ query })
    });
    const json = await res.json();
    return (json?.data?.Page?.media ?? [])
      .filter(m => !ownIds.has(m.id))
      .map(m => ({ media: m, score: 0 }));
  } catch { return []; }
}

// Genre deep-dive: top-rated unseen anime in one of the user's top genres.
// Rotates daily among the top 3 genres so repeated visits feel fresh.
async function fetchGenreDeepDive() {
  const genreMap = {};
  animeList.forEach(a => {
    (a.genres || []).forEach(g => {
      if (!genreMap[g]) genreMap[g] = { sum: 0, count: 0 };
      genreMap[g].sum   += a.elo;
      genreMap[g].count += 1;
    });
  });
  const genres = Object.entries(genreMap)
    .filter(([, v]) => v.count >= 3)
    .map(([name, v]) => ({ name, avg: Math.round(v.sum / v.count) }))
    .sort((a, b) => b.avg - a.avg);

  if (!genres.length) return { genre: null, items: [] };

  // Rotate among top 3 genres (or however many exist) using day-of-year as seed
  // so it's stable within a day but changes daily
  const pool = genres.slice(0, 3);
  const dayOfYear = Math.floor(Date.now() / 86400000); // ms → days
  const topGenre = pool[dayOfYear % pool.length].name;
  const ownIds = new Set(animeList.map(a => a.id));
  const query = `
    query ($genre: String) {
      Page(perPage: 20) {
        media(type: ANIME, genre_in: [$genre], sort: SCORE_DESC,
              averageScore_greater: 72, status_not_in: [NOT_YET_RELEASED, CANCELLED]) {
          id idMal title { romaji english } coverImage { large medium } averageScore format
        }
      }
    }`;
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST', headers: anilistHeaders(),
      body: JSON.stringify({ query, variables: { genre: topGenre } })
    });
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);
    const items = (json?.data?.Page?.media ?? [])
      .filter(m => !ownIds.has(m.id))
      .map(m => ({ media: m }))
      .slice(0, 4);
    return { genre: topGenre, items };
  } catch (e) { console.warn('Genre dive fetch failed:', e); return { genre: topGenre, items: [] }; }
}

// Hidden gems: highly rated but under the radar (low popularity)
async function fetchHiddenGems() {
  const ownIds = new Set(animeList.map(a => a.id));
  // No id_not_in — large arrays can hit AniList query complexity limits.
  // Fetch a big pool and filter client-side instead.
  // Step 1: fetch candidates — simple query, no nested data
  const candidateQuery = `
    {
      Page(perPage: 20) {
        media(type: ANIME, format: TV, sort: SCORE_DESC,
              averageScore_greater: 70,
              popularity_lesser: 150000,
              status_in: [FINISHED, RELEASING]) {
          id idMal title { romaji english } coverImage { large medium } averageScore format
        }
      }
    }`;
  try {
    const r1 = await fetch('https://graphql.anilist.co', {
      method: 'POST', headers: anilistHeaders(),
      body: JSON.stringify({ query: candidateQuery })
    });
    const j1 = await r1.json();
    if (j1.errors) throw new Error(j1.errors[0].message);
    const candidates = (j1?.data?.Page?.media ?? []).filter(m => !ownIds.has(m.id));
    if (!candidates.length) return [];

    // Step 2: check only those candidate IDs for popular prequels — tiny query
    const ids = candidates.map(m => m.id);
    const relQuery = `
      query ($ids: [Int]) {
        Page(perPage: 20) {
          media(id_in: $ids, type: ANIME) {
            id
            relations {
              edges {
                relationType(version: 2)
                node { popularity }
              }
            }
          }
        }
      }`;
    await new Promise(r => setTimeout(r, 600)); // small gap to avoid rate limit
    const r2 = await fetch('https://graphql.anilist.co', {
      method: 'POST', headers: anilistHeaders(),
      body: JSON.stringify({ query: relQuery, variables: { ids } })
    });
    const j2 = await r2.json();
    // Build a set of IDs that are sequels to popular franchises
    const franchiseIds = new Set();
    for (const m of (j2?.data?.Page?.media ?? [])) {
      const isSequel = (m.relations?.edges ?? []).some(e =>
        e.relationType === 'PREQUEL' && (e.node?.popularity ?? 0) > 50000
      );
      if (isSequel) franchiseIds.add(m.id);
    }

    return candidates
      .filter(m => !franchiseIds.has(m.id))
      .map(m => ({ media: m }))
      .slice(0, 4);
  } catch (e) {
    console.warn('Hidden gems fetch failed:', e);
    return [];
  }
}

async function fetchSeasonalRecommendations() {
  const ownIds = new Set(animeList.map(a => a.id));
  const { season, year } = getCurrentSeason();
  const next = getNextSeason(season, year);
  const genreAffinityMap = _buildGenreAffinity();
  const eloValues = animeList.map(a => a.elo);
  const eloMin = eloValues.length ? Math.min(...eloValues) : 0;
  const eloMax = (eloValues.length ? Math.max(...eloValues) : 1) - eloMin || 1;

  const seasons = [
    { s: season,      y: year,      label: `${season} ${year}` },
    { s: next.season, y: next.year, label: `${next.season} ${next.year}` }
  ];

  const buckets = {};   // label → scored items array

  for (const { s, y, label } of seasons) {
    const query = `
      query ($season: MediaSeason, $year: Int) {
        Page(perPage: 50) {
          media(season: $season, seasonYear: $year, type: ANIME,
                sort: POPULARITY_DESC, status_not: CANCELLED) {
            id idMal title { romaji english } coverImage { large medium }
            averageScore format status genres
          }
        }
      }`;
    let items = [];
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { season: s, year: y } })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const json = await res.json();
      if (json.errors) throw new Error(json.errors[0].message);
      items = (json?.data?.Page?.media ?? []).map(m => ({
        media: m, seasonLabel: label, watched: ownIds.has(m.id)
      }));
    } catch (e) {
      console.warn(`Seasonal fetch failed for ${label}:`, e);
    }

    // Score each item by taste + community
    items.forEach(r => {
      if (genreAffinityMap.size > 0) {
        const hits = (r.media.genres || [])
          .map(g => genreAffinityMap.get(g))
          .filter(v => v !== undefined);
        r._tasteScore = hits.length
          ? (hits.reduce((s, v) => s + v, 0) / hits.length - eloMin) / eloMax
          : 0.5;
      } else {
        r._tasteScore = 0.5;
      }
      const commNorm = (r.media.averageScore || 60) / 100;
      r._score = r._tasteScore * 0.65 + commNorm * 0.35;
    });

    // Sort: unwatched first, then by taste+community score, cap at 8
    buckets[label] = items
      .sort((a, b) => {
        if (a.watched !== b.watched) return a.watched ? 1 : -1;
        return b._score - a._score;
      })
      .slice(0, 8);

    await new Promise(r => setTimeout(r, 500));
  }

  // Return as two named buckets so the renderer can show separate sections
  return {
    current:      buckets[seasons[0].label] ?? [],
    next:         buckets[seasons[1].label] ?? [],
    currentLabel: seasons[0].label,
    nextLabel:    seasons[1].label,
  };
}

// Build a Map of genre → user's average ELO for anime with that genre
function _buildGenreAffinity() {
  const map = new Map();
  const genreMap = {};
  animeList.forEach(a => {
    if (!Array.isArray(a.genres)) return;
    a.genres.forEach(g => {
      if (!genreMap[g]) genreMap[g] = { sum: 0, count: 0 };
      genreMap[g].sum   += a.elo;
      genreMap[g].count += 1;
    });
  });
  Object.entries(genreMap).forEach(([g, v]) => {
    if (v.count >= 2) map.set(g, v.sum / v.count);
  });
  return map;
}

function _recsSkeletonHtml(count = 8) {
  const card = `<div class="skeleton-card">
    <div class="skeleton-img"></div>
    <div class="skeleton-body">
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
      <div class="skeleton-line shorter"></div>
    </div>
  </div>`;
  // Cards placed directly so the grid's own column layout applies
  return card.repeat(count);
}

async function _loadRecsGrid() {
  const grid = byId(IDS.recsGrid);
  grid.style.display = 'grid';
  grid.innerHTML = _recsSkeletonHtml();

  // ── Seasonal tab: split into current / next season sections ─────────────
  if (recsTab !== 'foryou') {
    let seasonal;
    try { seasonal = await fetchSeasonalRecommendations(); }
    catch (e) {
      renderErrorInto(grid, e.message);
      return;
    }
    const { current, next, currentLabel, nextLabel } = seasonal;
    if (!current.length && !next.length) {
      grid.innerHTML = '<p style="color:#8b949e;text-align:center">No seasonal results — try "For You".</p>';
      return;
    }
    // Pre-fetch relation data for all cards in one batch
    _recRelationsCache.clear();
    const allIds = [...current, ...next].map(i => i.media.id);
    await _fetchRecRelations(allIds);

    grid.style.display = 'block';

    const renderSection = (items, label) => {
      if (!items.length) return '';
      const cards = items.map(({ media, watched, _tasteScore }) =>
        recCardHtml(media, { watched, tasteScore: _tasteScore ?? null })).join('');
      return `
        <div class="recs-extra-section">
          <h4 class="recs-extra-heading">📅 ${label}</h4>
          <div class="recs-subgrid">${cards}</div>
        </div>`;
    };

    grid.innerHTML = renderSection(current, currentLabel) + renderSection(next, nextLabel);
    return;
  }

  // ── For You tab: grouped recs + genre dive + hidden gems ─────────────────
  // Note: grid stays as display:grid (skeleton layout) until data arrives,
  // then switches to block for the grouped/sectioned real layout.
  let result;
  try { result = await fetchRecommendationsForYou(); }
  catch (e) {
    renderErrorInto(grid, e.message);
    return;
  }

  grid.style.display = 'block';

  // Fetch relations for all final rec IDs in one lightweight batch query
  _recRelationsCache.clear();
  const allRecIds = result.grouped
    ? result.groups.flatMap(g => g.recs.map(r => r.media.id))
    : (result.items || []).map(r => r.media.id);
  await _fetchRecRelations(allRecIds);

  let mainHtml;
  if (result.grouped && result.groups.length) {
    mainHtml = result.groups.map(({ seed, recs }) => `
      <div class="recs-group">
        <h4 class="recs-group-heading">Because you loved <em>${displayTitle(seed)}</em></h4>
        <div class="recs-subgrid">${recs.map(({ media }) => recCardHtml(media)).join('')}</div>
      </div>`).join('');
  } else {
    const items = result.items || [];
    if (!items.length) {
      grid.innerHTML = '<p style="color:#8b949e;text-align:center">No recommendations yet — keep ranking!</p>';
      return;
    }
    mainHtml = `<div class="recs-subgrid">${items.map(({ media }) => recCardHtml(media)).join('')}</div>`;
  }

  // Render main recs + placeholder sections for async extras
  grid.innerHTML = mainHtml + `
    <div class="recs-extra-section">
      <h4 class="recs-extra-heading" id="genre-dive-heading">🎭 More of your top genre</h4>
      <p class="recs-extra-sub">Highly rated titles in your favourite genre that you haven't seen</p>
      <div class="recs-subgrid" id="genre-dive-grid"><p style="color:#8b949e;font-size:0.8rem">⏳ Loading…</p></div>
    </div>
    <div class="recs-extra-section">
      <h4 class="recs-extra-heading">💎 Hidden Gems</h4>
      <p class="recs-extra-sub">Well rated but under the radar — fewer than 100k followers on AniList</p>
      <div class="recs-subgrid" id="hidden-gems-grid"><p style="color:#8b949e;font-size:0.8rem">⏳ Loading…</p></div>
    </div>`;

  // Load genre dive and hidden gems concurrently (non-blocking)
  const [genreResult, gemItems] = await Promise.all([fetchGenreDeepDive(), fetchHiddenGems()]);

  const genreHeading = byId(IDS.genreDiveHeading);
  const genreGridEl  = byId(IDS.genreDiveGrid);
  const gemsGridEl   = byId(IDS.hiddenGemsGrid);

  if (genreHeading && genreResult.genre) {
    genreHeading.textContent = `🎭 More ${genreResult.genre} you haven't seen`;
  }
  if (genreGridEl) {
    genreGridEl.innerHTML = genreResult.items.length
      ? genreResult.items.map(({ media }) => recCardHtml(media)).join('')
      : '<p style="color:#8b949e;font-size:0.8rem">No results found.</p>';
  }
  if (gemsGridEl) {
    gemsGridEl.innerHTML = gemItems.length
      ? gemItems.map(({ media }) => recCardHtml(media)).join('')
      : '<p style="color:#8b949e;font-size:0.8rem">No hidden gems found.</p>';
  }
}

async function toggleRecommendations() { switchResultsTab('discover'); }

// ─── COMPATIBILITY ────────────────────────────────────────────────────────────
async function runCompatibility() {
  const username2 = byId(IDS.compatUsernameInput).value.trim();
  if (!username2) return;
  if (_socialPlatform === 'mal') return _runCompatibilityMal(username2);

  const resultsEl = byId(IDS.compatResults);
  resultsEl.innerHTML = '<p style="color:#8b949e;text-align:center;padding:20px 0">⏳ Fetching ' + username2 + '\'s list…</p>';

  try {
    // Fetch other user's completed list
    const query = `
      query ($username: String) {
        MediaListCollection(userName: $username, type: ANIME) {
          lists {
            entries {
              score status
              media { id title { romaji english } coverImage { medium } }
            }
          }
        }
      }`;
    // Retry up to 2 times — the computer:// origin occasionally drops the first request
    let data;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: anilistHeaders(),
          body: JSON.stringify({ query, variables: { username: username2 } })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        data = await res.json();
        break; // success
      } catch (fetchErr) {
        if (attempt === 2) throw fetchErr;
        resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">⏳ Retrying…</p>`;
        await new Promise(r => setTimeout(r, 800));
      }
    }
    if (data.errors) throw new Error(data.errors[0].message);

    const WATCHED = new Set(['COMPLETED', 'CURRENT', 'REPEATING']);
    const otherEntries = data.data.MediaListCollection.lists
      .flatMap(l => l.entries)
      .filter(e => WATCHED.has(e.status));

    // Build rank maps
    // User 1: ELO rank
    const myRanked = [...animeList].sort((a, b) => b.elo - a.elo);
    const myRankMap = new Map(myRanked.map((a, i) => [a.id, i + 1]));

    // User 2: lookup by id (full-list rank vs. the other user is computed on
    // the overlap subset below — a global rank map isn't exposed in the UI).
    const otherById = new Map(otherEntries.map(e => [e.media.id, e]));

    // Overlap = any anime both users have watched (no score requirement)
    const overlap = animeList.filter(a => otherById.has(a.id));

    if (overlap.length < 5) {
      resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">
        Not enough overlap (${overlap.length} shared anime). Need at least 5 in common.</p>`;
      return;
    }

    // Spearman's rank correlation on the overlapping set
    // Re-rank within overlap only for fairness
    const myOverlapRanked   = [...overlap].sort((a, b) => b.elo - a.elo);
    const myOverlapRankMap  = new Map(myOverlapRanked.map((a, i) => [a.id, i + 1]));
    const othOverlapRanked  = [...overlap].sort((a, b) => {
      const sa = otherById.get(a.id)?.score ?? 0;
      const sb = otherById.get(b.id)?.score ?? 0;
      return sb - sa;
    });
    const othOverlapRankMap = new Map(othOverlapRanked.map((a, i) => [a.id, i + 1]));

    const n  = overlap.length;
    const dSqSum = overlap.reduce((sum, a) => {
      const d = myOverlapRankMap.get(a.id) - othOverlapRankMap.get(a.id);
      return sum + d * d;
    }, 0);
    const rho = 1 - (6 * dSqSum) / (n * (n * n - 1));
    const pct = Math.round(((rho + 1) / 2) * 100); // scale -1..1 → 0..100

    // Agreement/disagreement lists
    const diffs = overlap.map(a => ({
      anime: a,
      cover: otherById.get(a.id)?.media?.coverImage?.medium || a.cover,
      title: a.title,
      myRank:  myOverlapRankMap.get(a.id),
      othRank: othOverlapRankMap.get(a.id),
      diff: Math.abs(myOverlapRankMap.get(a.id) - othOverlapRankMap.get(a.id)),
      agreement: (myOverlapRankMap.get(a.id) + othOverlapRankMap.get(a.id)) / 2,
    }));

    const topAgreements = [...diffs].sort((a, b) => a.agreement - b.agreement).slice(0, 5);
    const topBothLow    = [...diffs].sort((a, b) => b.agreement - a.agreement).slice(0, 5);
    const topDisagree   = [...diffs].sort((a, b) => b.diff - a.diff).slice(0, 5);

    const emojiFor = pct => pct >= 80 ? '💜' : pct >= 65 ? '🟢' : pct >= 50 ? '🟡' : pct >= 35 ? '🟠' : '🔴';
    const labelFor = pct => pct >= 80 ? 'Soulmates' : pct >= 65 ? 'Great Match' : pct >= 50 ? 'Good Compatibility' : pct >= 35 ? 'Some Common Ground' : 'Very Different Tastes';

    // Social achievements
    _tryUnlock('kindred-spirit', pct >= 80, '💜 Kindred Spirit');
    _tryUnlock('contrarian',     pct <= 25, '⚡ Contrarian');
    // Track unique friends for Social Butterfly
    comparedFriends.add(username2.toLowerCase());
    saveState();
    _checkAchievements();

    // Store detail data for click-through panels
    _compatDetailMap = new Map(overlap.map(a => {
      const rawScore = otherById.get(a.id)?.score ?? 0;
      // Normalise AniList score to /10 regardless of user's scoring format
      const theirScore = rawScore > 10 ? (rawScore / 10).toFixed(1) : rawScore > 0 ? rawScore.toFixed(1) : null;
      return [a.id, {
        myOverallRank:  myRankMap.get(a.id),
        myOverlapRank:  myOverlapRankMap.get(a.id),
        othOverlapRank: othOverlapRankMap.get(a.id),
        theirScore,
        totalAnime: animeList.length,
        overlapSize: n,
      }];
    }));

    const animeRowHtml = (item, desc) => {
      const aid = Number(item.anime.id) || 0;
      return `
      <div class="compat-anime-row" onclick="_toggleCompatDetail(${aid})">
        <img src="${safeUrl(item.cover)}" alt="" aria-hidden="true" />
        <span class="compat-anime-title">${esc(item.title)}</span>
        <span class="compat-ranks">${esc(desc)} ›</span>
      </div>
      <div class="compat-detail-row" id="compat-detail-${aid}"></div>`;
    };

    resultsEl.innerHTML = `
      <div class="compat-score-box">
        <div class="compat-pct" style="color:${pct >= 65 ? '#3fb950' : pct >= 40 ? '#e3a000' : '#f85149'}">${emojiFor(pct)} ${pct}%</div>
        <div class="compat-label">${esc(labelFor(pct))}</div>
        <div class="compat-sub">${n} shared anime · Spearman ρ = ${rho.toFixed(2)}</div>
        <div class="compat-sub" style="margin-top:4px">Your ELO rank vs ${esc(username2)}'s AniList scores</div>
      </div>
      <div class="compat-cols">
        <div class="compat-col">
          <h4>✅ You both rate highly</h4>
          ${topAgreements.map(i => animeRowHtml(i, `You #${i.myRank} · Them #${i.othRank}`)).join('')}
        </div>
        <div class="compat-col">
          <h4>📉 You both rate lowly</h4>
          ${topBothLow.map(i => animeRowHtml(i, `You #${i.myRank} · Them #${i.othRank}`)).join('')}
        </div>
        <div class="compat-col compat-col-full">
          <h4>⚡ Biggest disagreements</h4>
          ${topDisagree.map(i => {
            const youHigher = i.myRank < i.othRank;
            return animeRowHtml(i, `You #${i.myRank} · Them #${i.othRank} ${youHigher ? '(you love it)' : '(they love it)'}`);
          }).join('')}
        </div>
      </div>`;

    // Save comparison to localStorage
    const savedComps = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.savedComparisons) || '[]');
    const existingIdx = savedComps.findIndex(c => c.username.toLowerCase() === username2.toLowerCase());
    const entry = {
      username: username2,
      score: pct,
      label: labelFor(pct),
      emoji: emojiFor(pct),
      date: new Date().toISOString().split('T')[0]
    };
    if (existingIdx >= 0) savedComps[existingIdx] = entry;
    else savedComps.unshift(entry);
    localStorage.setItem(KESSEN_KEYS.data.savedComparisons, JSON.stringify(savedComps.slice(0, 10)));
    _renderSavedComparisons();

  } catch (err) {
    renderErrorInto(resultsEl, err.message, 'padding:16px 0');
  }
}

async function _runCompatibilityMal(username2) {
  const resultsEl = byId(IDS.compatResults);
  // `t` is set by us below; always escape in case any caller ever passes untrusted text.
  const setProgress = t => { resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">${esc(t)}</p>`; };
  setProgress(`⏳ Fetching ${username2}'s MAL list…`);

  try {
    const malEntries = await _fetchMalUserList(username2, setProgress);
    const otherByMalId = new Map(malEntries.map(e => [e.malId, e]));

    // Overlap: user's ranked anime that the friend also has on MAL
    const overlap = animeList.filter(a => a.idMal && otherByMalId.has(a.idMal));
    if (overlap.length < 5) {
      resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">
        Not enough overlap (${overlap.length} shared anime). Need at least 5 in common.</p>`;
      return;
    }

    // My rank map (full list, for display)
    const myRanked    = [...animeList].sort((a, b) => b.elo - a.elo);
    const myRankMap   = new Map(myRanked.map((a, i) => [a.id, i + 1]));

    // Re-rank within overlap for Spearman fairness
    const myOverlapRanked  = [...overlap].sort((a, b) => b.elo - a.elo);
    const myOverlapRankMap = new Map(myOverlapRanked.map((a, i) => [a.id, i + 1]));
    const othOverlapRanked = [...overlap].sort((a, b) => {
      const sa = otherByMalId.get(a.idMal)?.score ?? 0;
      const sb = otherByMalId.get(b.idMal)?.score ?? 0;
      return sb - sa;
    });
    const othOverlapRankMap = new Map(othOverlapRanked.map((a, i) => [a.id, i + 1]));

    const n = overlap.length;
    const dSqSum = overlap.reduce((sum, a) => {
      const d = myOverlapRankMap.get(a.id) - othOverlapRankMap.get(a.id);
      return sum + d * d;
    }, 0);
    const rho = 1 - (6 * dSqSum) / (n * (n * n - 1));
    const pct = Math.round(((rho + 1) / 2) * 100);

    const diffs = overlap.map(a => ({
      anime: a,
      cover: a.cover,
      title: a.title,
      myRank:    myOverlapRankMap.get(a.id),
      othRank:   othOverlapRankMap.get(a.id),
      diff:      Math.abs(myOverlapRankMap.get(a.id) - othOverlapRankMap.get(a.id)),
      agreement: (myOverlapRankMap.get(a.id) + othOverlapRankMap.get(a.id)) / 2,
    }));

    const topAgreements = [...diffs].sort((a, b) => a.agreement - b.agreement).slice(0, 5);
    const topBothLow    = [...diffs].sort((a, b) => b.agreement - a.agreement).slice(0, 5);
    const topDisagree   = [...diffs].sort((a, b) => b.diff - a.diff).slice(0, 5);
    const emojiFor = p => p >= 80 ? '💜' : p >= 65 ? '🟢' : p >= 50 ? '🟡' : p >= 35 ? '🟠' : '🔴';
    const labelFor = p => p >= 80 ? 'Soulmates' : p >= 65 ? 'Great Match' : p >= 50 ? 'Good Compatibility' : p >= 35 ? 'Some Common Ground' : 'Very Different Tastes';

    _tryUnlock('kindred-spirit', pct >= 80, '💜 Kindred Spirit');
    _tryUnlock('contrarian',     pct <= 25, '⚡ Contrarian');
    comparedFriends.add(username2.toLowerCase());
    saveState();
    _checkAchievements();

    // Store detail data (keyed by AniList ID, same as AniList path)
    _compatDetailMap = new Map(overlap.map(a => {
      const rawScore = otherByMalId.get(a.idMal)?.score ?? 0;
      return [a.id, {
        myOverallRank:  myRankMap.get(a.id),
        myOverlapRank:  myOverlapRankMap.get(a.id),
        othOverlapRank: othOverlapRankMap.get(a.id),
        theirScore:     rawScore > 0 ? rawScore.toFixed(1) : null,
        totalAnime:     animeList.length,
        overlapSize:    n,
      }];
    }));

    const animeRowHtml = (item, desc) => {
      const aid = Number(item.anime.id) || 0;
      return `
      <div class="compat-anime-row" onclick="_toggleCompatDetail(${aid})">
        <img src="${safeUrl(item.cover)}" alt="" aria-hidden="true" />
        <span class="compat-anime-title">${esc(item.title)}</span>
        <span class="compat-ranks">${esc(desc)} ›</span>
      </div>
      <div class="compat-detail-row" id="compat-detail-${aid}"></div>`;
    };

    resultsEl.innerHTML = `
      <div class="compat-score-box">
        <div class="compat-pct" style="color:${pct >= 65 ? '#3fb950' : pct >= 40 ? '#e3a000' : '#f85149'}">${emojiFor(pct)} ${pct}%</div>
        <div class="compat-label">${esc(labelFor(pct))}</div>
        <div class="compat-sub">${n} shared anime · Spearman ρ = ${rho.toFixed(2)}</div>
        <div class="compat-sub" style="margin-top:4px">Your ELO rank vs ${esc(username2)}'s MAL scores</div>
      </div>
      <div class="compat-cols">
        <div class="compat-col">
          <h4>✅ You both rate highly</h4>
          ${topAgreements.map(i => animeRowHtml(i, `You #${i.myRank} · Them #${i.othRank}`)).join('')}
        </div>
        <div class="compat-col">
          <h4>📉 You both rate lowly</h4>
          ${topBothLow.map(i => animeRowHtml(i, `You #${i.myRank} · Them #${i.othRank}`)).join('')}
        </div>
        <div class="compat-col compat-col-full">
          <h4>⚡ Biggest disagreements</h4>
          ${topDisagree.map(i => {
            const youHigher = i.myRank < i.othRank;
            return animeRowHtml(i, `You #${i.myRank} · Them #${i.othRank} ${youHigher ? '(you love it)' : '(they love it)'}`);
          }).join('')}
        </div>
      </div>`;

    // Save comparison (with platform tag so re-run sets the right mode)
    const savedComps = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.savedComparisons) || '[]');
    const storageKey = `${username2} [MAL]`;
    const existingIdx = savedComps.findIndex(c => c.username.toLowerCase() === storageKey.toLowerCase());
    const entry = { username: storageKey, platform: 'mal', score: pct, label: labelFor(pct), emoji: emojiFor(pct), date: new Date().toISOString().split('T')[0] };
    if (existingIdx >= 0) savedComps[existingIdx] = entry;
    else savedComps.unshift(entry);
    localStorage.setItem(KESSEN_KEYS.data.savedComparisons, JSON.stringify(savedComps.slice(0, 10)));
    _renderSavedComparisons();

  } catch (err) {
    renderErrorInto(resultsEl, err.message, 'padding:16px 0');
  }
}

function _deleteComparison(username) {
  const savedComps = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.savedComparisons) || '[]');
  const updated = savedComps.filter(c => c.username.toLowerCase() !== username.toLowerCase());
  localStorage.setItem(KESSEN_KEYS.data.savedComparisons, JSON.stringify(updated));
  _renderSavedComparisons();
}

function _renderSavedComparisons() {
  const container = byId(IDS.savedComparisons);
  if (!container) return;
  const savedComps = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.savedComparisons) || '[]');
  if (!savedComps.length) { container.innerHTML = ''; return; }
  container.innerHTML = `
    <p style="font-size:0.8rem;color:#8b949e;margin:0 0 8px">Recent comparisons</p>
    <div class="saved-comp-cards">
      ${savedComps.map(c => {
        const platform   = c.platform || 'anilist';
        const displayName = platform === 'mal'
          ? c.username.replace(/ \[MAL\]$/i, '')  // strip suffix for display
          : c.username;
        const platBadge = platform === 'mal'
          ? `<span style="font-size:0.68rem;background:#2a4a6e;color:#79c0ff;border-radius:4px;padding:1px 5px;margin-left:4px">MAL</span>`
          : '';
        const escapedUsername = c.username.replace(/'/g, "\\'");
        return `
        <div class="saved-comp-card">
          <span style="font-size:1.2rem">${c.emoji}</span>
          <div>
            <div class="scc-name">${displayName}${platBadge}</div>
            <div class="scc-meta">${c.score}% · ${c.label} · ${c.date}</div>
          </div>
          <button class="btn-small" onclick="_rerunComparison('${escapedUsername}','${platform}')">Re-run</button>
          <button class="btn-small" onclick="_deleteComparison('${escapedUsername}')" aria-label="Remove saved comparison">×</button>
        </div>`;
      }).join('')}
    </div>`;
}

function _rerunComparison(username, platform) {
  setSocialPlatform(platform);
  // Strip the [MAL] suffix before filling the input
  const cleanName = username.replace(/ \[MAL\]$/i, '');
  byId(IDS.compatUsernameInput).value = cleanName;
  runCompatibility();
}

function toggleCompatibility() { switchResultsTab('social'); }

// ─── HEAD-TO-HEAD DETAIL ──────────────────────────────────────────────────────
let _compatDetailMap = new Map(); // populated by runCompatibility()

function _toggleCompatDetail(id) {
  const el = document.getElementById('compat-detail-' + id);
  if (!el) return;
  const isOpen = el.classList.toggle('open');
  if (!isOpen) return; // closing — nothing more to do

  const d = _compatDetailMap.get(id);
  if (!d) { el.innerHTML = '<span>No detail available.</span>'; return; }

  const rankDiff = d.myOverlapRank - d.othOverlapRank; // negative = you rate it higher
  const diffArrow = rankDiff < 0
    ? `<span style="color:#3fb950">▲ You rate it ${Math.abs(rankDiff)} places higher</span>`
    : rankDiff > 0
    ? `<span style="color:#f85149">▼ They rate it ${rankDiff} places higher</span>`
    : `<span style="color:#8b949e">= You both rank it the same</span>`;

  el.innerHTML = `
    <div class="compat-detail-stat">
      <span class="val">#${d.myOverallRank} <span style="font-size:0.7rem;color:#6e7681">of ${d.totalAnime}</span></span>
      <span class="lbl">Where you rank it across all your anime</span>
    </div>
    <div class="compat-detail-stat">
      <span class="val">${d.theirScore !== null ? d.theirScore + ' / 10' : 'Unscored'}</span>
      <span class="lbl">The score they gave it on AniList</span>
    </div>
    <div class="compat-detail-stat">
      <span class="val">#${d.myOverlapRank} vs #${d.othOverlapRank}</span>
      <span class="lbl">Your rank vs theirs among the ${d.overlapSize} anime you've both seen</span>
    </div>
    <div class="compat-detail-stat" style="justify-content:center">
      ${diffArrow}
    </div>`;
}

// ─── FRIEND RECS ─────────────────────────────────────────────────────────────
// Fetch a MAL user's completed/watching list.
// Prefers the official MAL API (via the mal-api proxy) when a token is available —
// Jikan's user animelist endpoint is unreliable and frequently returns 404/503.
// Falls back to Jikan only when no MAL token is present.
async function _fetchMalUserList(username, setProgress) {
  const entries = [];

  if (malAuthToken) {
    // Use the official MAL API with the logged-in user's token.
    // The API supports /v2/users/{username}/animelist for any public list.
    for (const status of ['completed', 'watching']) {
      let path = `/users/${encodeURIComponent(username)}/animelist?status=${status}`
               + `&fields=list_status,main_picture&limit=1000`;
      let page = 1;
      while (path) {
        if (setProgress) setProgress(`⏳ Fetching ${username}'s ${status} list (page ${page})…`);
        const res = await fetch('/.netlify/functions/mal-api', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ path, token: malAuthToken }),
        });
        if (res.status === 404) throw new Error(`MAL user "${username}" not found.`);
        if (res.status === 403) throw new Error(`${username}'s MAL list is set to private.`);
        if (!res.ok) break;
        const data = await res.json();
        (data.data || []).forEach(item => {
          const node = item.node;
          if (!node?.id || entries.some(e => e.malId === node.id)) return;
          entries.push({
            malId: node.id,
            title: node.title || '',
            score: item.list_status?.score || 0,
            cover: node.main_picture?.large || node.main_picture?.medium || '',
          });
        });
        const nextUrl = data.paging?.next || null;
        if (nextUrl) {
          try { path = new URL(nextUrl).pathname + new URL(nextUrl).search; }
          catch { path = null; }
        } else {
          path = null;
        }
        page++;
        if (path) await new Promise(r => setTimeout(r, 250));
      }
      await new Promise(r => setTimeout(r, 300));
    }
    return entries;
  }

  // No MAL token — can't fetch MAL user lists without authentication.
  // The public Jikan endpoint for user lists has been removed by MAL.
  throw new Error('Looking up MAL users requires a MAL login. Log out and sign in with MAL to use this feature.');
}

// Batch-resolve AniList metadata (genres, title, cover, format) for a list of MAL IDs
async function _fetchAniListMetaForMalIds(malIds) {
  if (!malIds.length) return new Map();
  const metaMap = new Map();
  const PAGE_SIZE = 50;
  for (let i = 0; i < malIds.length; i += PAGE_SIZE) {
    const chunk = malIds.slice(i, i + PAGE_SIZE);
    const query = `
      query ($ids: [Int]) {
        Page(perPage: 50) {
          media(idMal_in: $ids, type: ANIME) {
            id idMal
            title { romaji english }
            coverImage { large medium }
            genres format averageScore
          }
        }
      }`;
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST', headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { ids: chunk } })
      });
      if (res.ok) {
        const data = await res.json();
        (data?.data?.Page?.media || []).forEach(m => { if (m.idMal) metaMap.set(m.idMal, m); });
      }
    } catch { /* skip chunk */ }
    if (i + PAGE_SIZE < malIds.length) await new Promise(r => setTimeout(r, 400));
  }
  return metaMap;
}

async function runFriendRecs() {
  const username = byId(IDS.friendRecsInput).value.trim();
  if (!username) return;
  if (_socialPlatform === 'mal') return _runFriendRecsMal(username);

  const resultsEl = byId(IDS.friendRecsResults);
  resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">⏳ Fetching ${esc(username)}'s list…</p>`;

  try {
    const query = `
      query ($username: String) {
        MediaListCollection(userName: $username, type: ANIME) {
          lists {
            entries {
              score status
              media { id title { romaji english } coverImage { large medium } averageScore genres format }
            }
          }
        }
      }`;
    let data;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch('https://graphql.anilist.co', {
          method: 'POST', headers: anilistHeaders(),
          body: JSON.stringify({ query, variables: { username } })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        data = await res.json();
        break;
      } catch (e) {
        if (attempt === 2) throw e;
        await new Promise(r => setTimeout(r, 800));
      }
    }
    if (data.errors) throw new Error(data.errors[0].message);

    const ownIds = new Set(animeList.map(a => a.id));
    const WATCHED = new Set(['COMPLETED', 'CURRENT', 'REPEATING']);

    // Detect friend's scoring scale from their highest score
    // (AniList supports 10-point, 100-point, 5-star etc.)
    const allEntries = data.data.MediaListCollection.lists.flatMap(l => l.entries);
    const maxScore = Math.max(...allEntries.map(e => e.score).filter(s => s > 0), 0);
    const scoreThreshold = maxScore > 10 ? 60 : 6;

    // Candidate pool: friend watched + rated above threshold, user hasn't seen.
    // Dedup by media.id — rewatched anime appear in both COMPLETED and REPEATING lists.
    const seenMediaIds = new Set();
    const candidates = allEntries
      .filter(e => WATCHED.has(e.status) && e.score >= scoreThreshold && !ownIds.has(e.media.id))
      .filter(e => { if (seenMediaIds.has(e.media.id)) return false; seenMediaIds.add(e.media.id); return true; });

    if (!candidates.length) {
      resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">
        No unwatched anime found that ${esc(username)} has rated 6+.</p>`;
      return;
    }

    // Build user's genre affinity map (avg ELO per genre)
    const genreMap = {};
    animeList.forEach(a => {
      (a.genres || []).forEach(g => {
        if (!genreMap[g]) genreMap[g] = { sum: 0, count: 0 };
        genreMap[g].sum += a.elo;
        genreMap[g].count++;
      });
    });
    const genreAvg = {};
    for (const [g, v] of Object.entries(genreMap)) {
      if (v.count >= 2) genreAvg[g] = v.sum / v.count;
    }
    const globalAvgElo = animeList.reduce((s, a) => s + a.elo, 0) / animeList.length || 1200;

    // Score each candidate and filter out genres the user dislikes.
    // A candidate is excluded if we have genre data for it AND its average
    // genre affinity is more than 80 ELO points below the user's global average
    // (i.e. the user consistently rates that genre well below their norm).
    const DISLIKE_THRESHOLD = 80;
    const scored = candidates
      .map(e => {
        const genres = e.media.genres || [];
        const affinities = genres.filter(g => genreAvg[g]).map(g => genreAvg[g]);
        const avgGenreElo = affinities.length
          ? affinities.reduce((s, v) => s + v, 0) / affinities.length
          : globalAvgElo;
        const genreBonus = (avgGenreElo - globalAvgElo) / 400;
        const friendNorm = maxScore > 10 ? e.score / 100 : e.score / 10;
        const totalScore = friendNorm * 0.6 + genreBonus * 0.4;
        const displayScore = (maxScore > 10 ? e.score / 10 : e.score).toFixed(1);
        return { media: e.media, friendScore: displayScore, totalScore, avgGenreElo, hasGenreData: affinities.length > 0 };
      })
      // Exclude if we have genre data and the user clearly dislikes those genres
      .filter(e => !e.hasGenreData || (e.avgGenreElo >= globalAvgElo - DISLIKE_THRESHOLD));

    scored.sort((a, b) => b.totalScore - a.totalScore);
    const top = scored.slice(0, 8);

    resultsEl.innerHTML = `
      <p style="font-size:0.78rem;color:#6e7681;text-align:center;margin-bottom:14px">
        ${candidates.length} unwatched titles ${esc(username)} rated 6+ · sorted by match to your taste profile
      </p>
      <div class="recs-subgrid">
        ${top.map(({ media, friendScore }) => {
          const title = media.title.english || media.title.romaji;
          const cover = media.coverImage?.large || media.coverImage?.medium;
          const avg   = media.averageScore ? (media.averageScore / 10).toFixed(1) : '–';
          const mediaId = Number(media.id) || 0;
          return `
            <a class="rec-card friend-rec-card" href="https://anilist.co/anime/${mediaId}" target="_blank">
              <img src="${safeUrl(cover)}" alt="Cover art for ${esc(title)}" loading="lazy" />
              <div class="friend-score-badge">${esc(username.slice(0,8))}: ${esc(friendScore)}</div>
              <div class="rec-card-body">
                <div class="rec-card-title">${esc(title)}</div>
                <div class="rec-card-meta">${esc(media.format || '')}</div>
                <span class="rec-score-pill">⭐ ${esc(avg)}</span>
              </div>
            </a>`;
        }).join('')}
      </div>`;

  } catch (err) {
    renderErrorInto(resultsEl, err.message, 'padding:16px 0');
  }
}

async function _runFriendRecsMal(username) {
  const resultsEl = byId(IDS.friendRecsResults);
  // `t` is under our control (set via setProgress below); callers never pass untrusted text
  // directly. If that ever changes, wrap with esc().
  const setProgress = t => { resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">${esc(t)}</p>`; };
  setProgress(`⏳ Fetching ${username}'s MAL list…`);

  try {
    const malEntries = await _fetchMalUserList(username, setProgress);
    if (!malEntries.length) {
      resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">No entries found for ${esc(username)} on MAL.</p>`;
      return;
    }

    const ownMalIds = new Set(animeList.map(a => a.idMal).filter(Boolean));
    const seenMalIds = new Set();
    const candidates = malEntries
      .filter(e => e.score >= 7 && !ownMalIds.has(e.malId))
      .filter(e => { if (seenMalIds.has(e.malId)) return false; seenMalIds.add(e.malId); return true; });

    if (!candidates.length) {
      resultsEl.innerHTML = `<p style="color:#8b949e;text-align:center;padding:20px 0">No unwatched anime found that ${esc(username)} rated 7+ on MAL.</p>`;
      return;
    }

    // Take top 20 by friend score, enrich with AniList metadata for genre affinity
    const top20 = [...candidates].sort((a, b) => b.score - a.score).slice(0, 20);
    setProgress('⏳ Fetching metadata for recommendations…');
    const metaMap = await _fetchAniListMetaForMalIds(top20.map(e => e.malId));

    // Genre affinity scoring (same logic as AniList path)
    const genreMap = {};
    animeList.forEach(a => {
      (a.genres || []).forEach(g => {
        if (!genreMap[g]) genreMap[g] = { sum: 0, count: 0 };
        genreMap[g].sum += a.elo; genreMap[g].count++;
      });
    });
    const genreAvg = {};
    for (const [g, v] of Object.entries(genreMap)) { if (v.count >= 2) genreAvg[g] = v.sum / v.count; }
    const globalAvgElo = animeList.reduce((s, a) => s + a.elo, 0) / animeList.length || 1200;

    const scored = top20.map(e => {
      const meta    = metaMap.get(e.malId);
      const genres  = meta?.genres || [];
      const affs    = genres.filter(g => genreAvg[g]).map(g => genreAvg[g]);
      const avgGenreElo = affs.length ? affs.reduce((s, v) => s + v, 0) / affs.length : globalAvgElo;
      const genreBonus  = (avgGenreElo - globalAvgElo) / 400;
      return {
        malId:       e.malId,
        title:       meta?.title?.english || meta?.title?.romaji || e.title,
        cover:       meta?.coverImage?.large || meta?.coverImage?.medium || e.cover,
        format:      meta?.format || '',
        avg:         meta?.averageScore ? (meta.averageScore / 10).toFixed(1) : '–',
        friendScore: e.score.toFixed(1),
        totalScore:  (e.score / 10) * 0.6 + genreBonus * 0.4,
      };
    });
    scored.sort((a, b) => b.totalScore - a.totalScore);
    const topRecs = scored.slice(0, 8);

    resultsEl.innerHTML = `
      <p style="font-size:0.78rem;color:#6e7681;text-align:center;margin-bottom:14px">
        ${candidates.length} unwatched titles ${esc(username)} rated 7+ on MAL · sorted by match to your taste profile
      </p>
      <div class="recs-subgrid">
        ${topRecs.map(({ malId, title, cover, format, avg, friendScore }) => {
          const safeId = Number(malId) || 0;
          return `
          <a class="rec-card friend-rec-card" href="https://myanimelist.net/anime/${safeId}" target="_blank">
            <img src="${safeUrl(cover)}" alt="Cover art for ${esc(title)}" loading="lazy" />
            <div class="friend-score-badge">${esc(username.slice(0,8))}: ${esc(friendScore)}</div>
            <div class="rec-card-body">
              <div class="rec-card-title">${esc(title)}</div>
              <div class="rec-card-meta">${esc(format || '')}</div>
              <span class="rec-score-pill">⭐ ${esc(avg)}</span>
            </div>
          </a>`;
        }).join('')}
      </div>`;

  } catch (err) {
    renderErrorInto(resultsEl, err.message, 'padding:16px 0');
  }
}

// Show cancel button after a delay; cleared on completion or cancellation.
function _startLoadCancelTimer() {
  _clearLoadCancelTimer();
  _loadCancelTimer = setTimeout(() => {
    const btn = byId(IDS.loadingCancelBtn);
    if (btn) btn.style.display = '';
  }, 8000);
}
function _clearLoadCancelTimer() {
  if (_loadCancelTimer) { clearTimeout(_loadCancelTimer); _loadCancelTimer = null; }
  const btn = byId(IDS.loadingCancelBtn);
  if (btn) btn.style.display = 'none';
}

function cancelLoading() {
  _loadGeneration++;          // invalidate any in-flight load
  _clearLoadCancelTimer();
  hide('loading-screen');
  showFlex('username-screen');
}

// ─── ENTRY POINT ─────────────────────────────────────────────────────────────
async function startLoading() {
  const username = byId(IDS.usernameInput).value.trim();
  if (!username) return;

  const myGen = ++_loadGeneration;

  const isOAuthUser = !!(authToken && authUser);
  const existingSaveKey = KESSEN_KEYS.session.anilist(username);
  const hasSave = !!localStorage.getItem(existingSaveKey);

  // OAuth users: seed automatically on a fresh load; restore existing save as-is
  // (re-seeding an existing save is done deliberately via Manage → Re-seed)
  // Non-OAuth users: honour the warm-start checkbox as before
  const checkboxSeed = byId(IDS.warmStartChk).checked;
  const seedFromScores = hasSave ? checkboxSeed : (isOAuthUser || checkboxSeed);

  // If manually requesting warm-start on an existing save, confirm before wiping
  if (checkboxSeed && hasSave) {
    const ok = await _confirmAsync(
      '🔥 Warm start?',
      'You have a saved session for this user. Warm start will re-seed all ELO scores from your AniList ratings and reset battle progress.\n\nCancel to restore your saved session instead.',
      'Yes, warm start'
    );
    if (!ok) {
      // User declined — load saved session normally
      hide('username-screen');
      byId(IDS.errorMsg).style.display = 'none';
      showFlex('loading-screen');
      _startLoadCancelTimer();
      loadState(username);
      byId(IDS.loadingMsg).textContent = 'Restoring your saved session…';
      await new Promise(r => setTimeout(r, 600));
      _clearLoadCancelTimer();
      hide('loading-screen');
      if (myGen !== _loadGeneration) return;
      show('battle-screen');
      _showChangeUserBtn();
      if (currentA !== null && currentB !== null) renderCurrentPair(); else renderBattle();
      return;
    }
    // User confirmed re-seed — wipe the old save
    localStorage.removeItem(existingSaveKey);
  }

  hide('username-screen');
  byId(IDS.errorMsg).style.display = 'none';
  showFlex('loading-screen');
  _startLoadCancelTimer();

  // For AniList users: check if cloud has a newer save than what's on this device.
  // If it does, prompt and apply in-memory — no page reload needed.
  if (isOAuthUser) {
    byId(IDS.loadingMsg).textContent = '☁️ Checking for cloud save…';
    const applied = await checkAndApplyCloudSave(existingSaveKey);
    if (applied) {
      // Cloud state is now in memory — go straight to battle screen
      byId(IDS.loadingMsg).textContent = '☁️ Cloud save loaded!';
      await new Promise(r => setTimeout(r, 500));
      _clearLoadCancelTimer();
      hide('loading-screen');
      if (myGen !== _loadGeneration) return;
      show('battle-screen');
      _showChangeUserBtn();
      snapshotSessionStart();
      maybeShowKbTip();
      syncFormatButtons(); syncEpRangeButtons();
      if (currentA !== null && currentB !== null) renderCurrentPair(); else renderBattle();
      return;
    }
  }

  // Check for saved state (only if not starting fresh)
  if (!seedFromScores && loadState(username)) {
    byId(IDS.loadingMsg).textContent = 'Restoring your saved session…';
    await new Promise(r => setTimeout(r, 600));
    _clearLoadCancelTimer();
    hide('loading-screen');
    if (myGen !== _loadGeneration) return;
    show('battle-screen');
    _showChangeUserBtn();
    snapshotSessionStart();
    maybeShowKbTip();
    if (currentA !== null && currentB !== null) renderCurrentPair(); else renderBattle();
    // Silently refresh titles + descriptions in background for old saves
    const needsMeta = animeList.some(a => a.titleRo === a.titleEn && a.titleRo === a.title);
    if (needsMeta) refreshAnimeMetadata();
    return;
  }

  try {
    byId(IDS.loadingMsg).textContent = 'Fetching your anime list from AniList…';
    // §4.3 perf: removed the 0–2 s random jitter that used to live here. The
    // rationale was "spread concurrent logins", but each browser session is its
    // own origin — the jitter only added up to 2 s of first-load latency for
    // every user. Subsequent paginated requests still rate-limit themselves.
    const _fetchResult = await fetchAllAnime(username, seedFromScores);
    animeList = _fetchResult.entries;
    if (_fetchResult.skipped > 0) {
      showToast(`⚠️ ${_fetchResult.skipped} show${_fetchResult.skipped === 1 ? '' : 's'} skipped — AniList returned no data for them (likely delisted).`);
    }

    if (animeList.length === 0) throw new Error('No completed anime found on this account. Make sure you have anime marked as "Completed" on AniList.');
    if (animeList.length === 1) throw new Error('Only 1 completed anime found — you need at least 2 to start ranking. Add more completed anime on AniList first.');

    // Warn if warm start was requested but user has no AniList scores
    const scoredCount = animeList.filter(a => a.anilistScore > 0).length;
    if (seedFromScores && scoredCount === 0) {
      byId(IDS.loadingMsg).textContent =
        `⚠️ No AniList scores found — everyone starts at ELO 1200. Score your anime on AniList to use warm start.`;
      await new Promise(r => setTimeout(r, 2800));
    } else {
      const seedMsg = seedFromScores ? ` · ELO seeded from ${scoredCount} scores` : '';
      byId(IDS.loadingMsg).textContent =
        `Loaded ${animeList.length} anime${seedMsg}. Preparing your first battle…`;
      await new Promise(r => setTimeout(r, 800));
    }

    saveKey = existingSaveKey;
    battleCount = 0;
    excludedIds = new Set();
    saveState();
    // Push initial state to cloud immediately for fresh loads
    if (isOAuthUser) _doCloudSave();

    _clearLoadCancelTimer();
    hide('loading-screen');
    if (myGen !== _loadGeneration) return;
    show('battle-screen');
    _showChangeUserBtn();
    snapshotSessionStart();
    maybeShowKbTip();
    renderBattle();
    // §5.2.12 — If the user was battling in guest mode before logging in,
    // offer a one-time merge. Runs after the battle screen is visible so the
    // modal layers on top of real content.
    if (isOAuthUser) maybeOfferGuestMerge(saveKey);
  } catch (err) {
    _clearLoadCancelTimer();
    hide('loading-screen');
    showFlex('username-screen');
    const errEl = byId(IDS.errorMsg);
    // Give users a meaningful message depending on what went wrong
    let msg = err.message || '';
    if (!navigator.onLine) {
      msg = '⚠️ No internet connection — check your network and try again.';
    } else if (msg.includes('No completed anime')) {
      msg = '📭 No completed anime found for that username. Make sure you have anime marked as "Completed" on AniList and the list is public.';
    } else if (msg.includes('Not Found') || msg.includes('404') || msg.includes('User not found')) {
      msg = '🔍 Username not found — double-check the spelling and try again.';
    } else if (msg.includes('429') || msg.includes('rate limit') || msg.toLowerCase().includes('too many')) {
      msg = '⏳ AniList is rate-limiting requests right now. Wait a minute and try again.';
    } else if (msg.includes('5') && /50[0-9]/.test(msg)) {
      msg = '🔧 AniList is having server issues. Try again in a few minutes.';
    } else if (msg) {
      msg = 'Could not load list: ' + msg;
    } else {
      msg = 'Could not load list — check the username and your connection, then try again.';
    }
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }
}

// ─── GUEST MODE ──────────────────────────────────────────────────────────────
async function fetchGuestPool() {
  const PAGES = 5;
  const allMedia = [];
  for (let p = 1; p <= PAGES; p++) {
    byId(IDS.loadingMsg).textContent =
      `Fetching popular anime… (${p}/${PAGES})`;
    const query = `
      query ($page: Int) {
        Page(page: $page, perPage: 50) {
          media(type: ANIME, sort: POPULARITY_DESC,
                status_in: [FINISHED, RELEASING],
                format_in: [TV, MOVIE]) {
            id
            title { romaji english }
            coverImage { large medium }
            description(asHtml: false)
            format
            averageScore
            genres
            seasonYear
          }
        }
      }
    `;
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: anilistHeaders(),
      body: JSON.stringify({ query, variables: { page: p } })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (data.errors) throw new Error(data.errors[0].message);
    allMedia.push(...data.data.Page.media);
    if (p < PAGES) await new Promise(r => setTimeout(r, 350)); // gentle rate limiting
  }
  return allMedia.map(m => {
    const titleEn = m.title.english || m.title.romaji;
    const titleRo = m.title.romaji  || m.title.english;
    return {
      id: m.id,
      title: titleEn, titleEn, titleRo,
      cover: m.coverImage.large || m.coverImage.medium,
      description: stripHtml(m.description).slice(0, 500),
      format: m.format || 'TV',
      globalScore: m.averageScore || 0,
      genres: m.genres || [],
      seasonYear: m.seasonYear || null,
      elo: 1200, wins: 0, losses: 0, comparisons: 0,
      fuzzy: false, eloHistory: [1200], anilistScore: 0,
    };
  });
}

async function startGuestMode() {
  const myGen = ++_loadGeneration;
  hide('username-screen');
  byId(IDS.errorMsg).style.display = 'none';
  showFlex('loading-screen');
  _startLoadCancelTimer();
  try {
    saveKey = KESSEN_KEYS.session.guest;
    if (loadState('guest')) {
      byId(IDS.loadingMsg).textContent = 'Restoring your guest session…';
      await new Promise(r => setTimeout(r, 600));
      _clearLoadCancelTimer();
      hide('loading-screen');
      if (myGen !== _loadGeneration) return;
      show('battle-screen');
      _showChangeUserBtn();
      if (currentA !== null && currentB !== null) renderCurrentPair();
      else renderBattle();
      return;
    }
    animeList = await fetchGuestPool();
    battleCount = 0;
    excludedIds = new Set();
    byId(IDS.loadingMsg).textContent =
      `Loaded ${animeList.length} popular anime. Let's go!`;
    await new Promise(r => setTimeout(r, 600));
    _clearLoadCancelTimer();
    hide('loading-screen');
    if (myGen !== _loadGeneration) return;
    show('battle-screen');
    _showChangeUserBtn();
    renderBattle();
  } catch (err) {
    _clearLoadCancelTimer();
    hide('loading-screen');
    showFlex('username-screen');
    const errEl = byId(IDS.errorMsg);
    errEl.textContent = 'Could not load guest pool: ' + err.message;
    errEl.style.display = 'block';
  }
}

// ─── EXCLUDE FROM POOL ───────────────────────────────────────────────────────

// Pick a single new opponent to face keepIdx, using the same ELO-proximity + weight logic
function pickOneOpponent(keepIdx) {
  const n = animeList.length;
  const weights = animeList.map(a => {
    if (excludedIds.has(a.id) || hiddenFormats.has(a.format)) return 0;
    const base = 1 / (a.comparisons + 1);
    return a.fuzzy ? base * 0.1 : base;
  });
  const totalW = weights.reduce((s, w) => s + w, 0);

  const eloKeep = animeList[keepIdx].elo;
  const candidates = animeList
    .map((a, i) => ({ i, a }))
    .filter(({ i }) => i !== keepIdx && weights[i] > 0 && Math.abs(animeList[i].elo - eloKeep) < 300)
    .sort((x, y) => x.a.comparisons - y.a.comparisons);

  if (candidates.length > 0) {
    const pool = candidates.slice(0, Math.min(20, candidates.length));
    return pool[Math.floor(Math.random() * pool.length)].i;
  }

  // Fallback: weighted pick from anyone except keepIdx
  let r = Math.random() * totalW;
  for (let i = 0; i < n; i++) {
    if (i === keepIdx) continue;
    r -= weights[i];
    if (r <= 0) return i;
  }
  for (let i = 0; i < n; i++) {
    if (i !== keepIdx && weights[i] > 0) return i;
  }
  return keepIdx === 0 ? 1 : 0;
}

function excludeAnime(event, side) {
  event.stopPropagation();
  const excludedIdx = side === 0 ? currentA : currentB;
  const keepIdx     = side === 0 ? currentB : currentA;

  excludedIds.add(animeList[excludedIdx].id);
  prevState = null;
  undoStack = [];
  _updateUndoBtn();

  // Keep the surviving anime in its position; replace only the excluded slot
  const newIdx = pickOneOpponent(keepIdx);
  if (side === 0) {
    renderPair(newIdx, keepIdx);
  } else {
    renderPair(keepIdx, newIdx);
  }
  saveState();
}

function toggleExcluded() { switchResultsTab('rankings'); }

function renderExcluded() {
  const excluded = animeList.filter(a => excludedIds.has(a.id));
  const listEl = byId(IDS.excludedList);
  if (excluded.length === 0) {
    listEl.innerHTML = '<p style="text-align:center;color:#8b949e;padding:16px">No anime excluded yet.</p>';
  } else {
    listEl.innerHTML = '';
    excluded.forEach(anime => {
      const item = document.createElement('div');
      item.className = 'excluded-item';
      item.id = `excl-${anime.id}`;
      item.innerHTML = `
        <img src="${safeUrl(anime.cover)}" alt="${esc(anime.title)}" />
        <span class="excluded-item-title">${esc(anime.title)}</span>
        <button class="btn-secondary" style="font-size:0.8rem;padding:5px 12px"
          onclick="reAddAnime(${Number(anime.id) || 0})">↩ Re-add</button>
      `;
      listEl.appendChild(item);
    });
  }
}

function reAddAnime(id) {
  excludedIds.delete(id);
  saveState();
  const el = document.getElementById(`excl-${id}`);
  if (el) el.remove();
  const listEl = byId(IDS.excludedList);
  if (listEl.children.length === 0) {
    listEl.innerHTML = '<p style="text-align:center;color:#8b949e;padding:16px">No anime excluded yet.</p>';
  }
}

// ─── TIER HELPERS ────────────────────────────────────────────────────────────
// Percentile bands: S top 10%, A 10-25%, B 25-55%, C 55-80%, D 80-100%
function getTier(zeroIndex, total) {
  const pct = zeroIndex / total;
  if (pct < 0.10) return 'S';
  if (pct < 0.25) return 'A';
  if (pct < 0.55) return 'B';
  if (pct < 0.80) return 'C';
  return 'D';
}

// ─── SPARKLINE ────────────────────────────────────────────────────────────────
function buildSparkline(history) {
  const W = 220, H = 54, pad = 6;
  const minE = Math.min(...history) - 5;
  const maxE = Math.max(...history) + 5;
  const range = maxE - minE || 1;
  const n = history.length;
  const pts = history.map((e, i) => {
    const x = (pad + (i / (n - 1)) * (W - pad * 2)).toFixed(1);
    const y = (H - pad - ((e - minE) / range) * (H - pad * 2)).toFixed(1);
    return `${x},${y}`;
  });
  const last = pts[pts.length - 1].split(',');
  const startElo = history[0], endElo = history[n - 1];
  const colour = endElo >= startElo ? '#3fb950' : '#f85149';
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="height:54px">
    <polyline points="${pts.join(' ')}" fill="none" stroke="${colour}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${last[0]}" cy="${last[1]}" r="3.5" fill="${colour}"/>
    <text x="4" y="${H - 2}" font-size="9" fill="#8b949e">${startElo}</text>
    <text x="${W - 4}" y="${H - 2}" font-size="9" fill="${colour}" text-anchor="end">${endElo}</text>
  </svg>`;
}

// ─── MILESTONES ───────────────────────────────────────────────────────────────
const MILESTONES = [
  { count: 100,  emoji: '🎉', title: '100 Battles!',   msg: 'The rankings are starting to take shape.' },
  { count: 250,  emoji: '⚔️',  title: '250 Battles!',   msg: "You're on a serious ranking mission." },
  { count: 500,  emoji: '🏆', title: '500 Battles!',   msg: 'Half a thousand matchups — a true connoisseur.' },
  { count: 1000, emoji: '🌟', title: '1000 Battles!',  msg: 'Legendary. Your rankings are rock-solid.' },
];

function checkMilestone(before, after) {
  const hit = MILESTONES.find(m => before < m.count && after >= m.count);
  if (!hit) return;
  byId(IDS.msEmoji).textContent = hit.emoji;
  byId(IDS.msTitle).textContent = hit.title;
  byId(IDS.msMsg).textContent   = hit.msg;
  const top5 = [...animeList].sort((a, b) => b.elo - a.elo).slice(0, 5);
  byId(IDS.msTop5).innerHTML = top5.map((a, i) => `
    <div class="ms-card">
      <img src="${safeUrl(a.cover)}" alt="${esc(a.title)}" />
      <div class="ms-card-rank">#${i + 1}</div>
      <div class="ms-card-title">${esc(a.title)}</div>
    </div>`).join('');
  byId(IDS.milestoneOverlay).style.display = 'flex';
}

function closeMilestone() {
  byId(IDS.milestoneOverlay).style.display = 'none';
}

function shareMilestone() {
  const msTitle = byId(IDS.msTitle).textContent || 'Milestone';
  const msEmoji = byId(IDS.msEmoji).textContent || '🎉';
  const top5 = [...animeList].sort((a, b) => b.elo - a.elo).slice(0, 5);
  const user = (saveKey || '').replace(/^kessen\.session\.(anilist|mal)\./, '');
  const payload = {
    u: user,
    b: battleCount,
    ms: msEmoji + ' ' + msTitle,
    top: top5.map((a, i) => ({ r: i + 1, t: a.title, e: a.elo, c: a.cover }))
  };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const url = location.href.split('#')[0] + '#r=' + encoded;
  // Close milestone first so share modal isn't obscured behind it
  closeMilestone();
  byId(IDS.shareUrl).value = url;
  const copyBtn = byId(IDS.copyBtn);
  if (copyBtn) copyBtn.textContent = '📋 Copy link';
  // Update share modal description for milestone context
  const subEl = byId(IDS.shareModal)?.querySelector('.share-subtitle');
  if (subEl) subEl.textContent = `You've hit ${msTitle}! Share your top 5 snapshot.`;
  _updateShareModalCapabilities();
  byId(IDS.shareModal).style.display = 'flex';
}

// ─── SHARE LINK ───────────────────────────────────────────────────────────────
function shareRankings() {
  const top20 = [...animeList].sort((a, b) => b.elo - a.elo).slice(0, 20);
  const user  = (saveKey || '').replace(/^kessen\.session\.(anilist|mal)\./, '');
  const payload = {
    u: user,
    b: battleCount,
    top: top20.map((a, i) => ({ r: i + 1, t: a.title, e: a.elo, c: a.cover }))
  };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const url = location.href.split('#')[0] + '#r=' + encoded;
  byId(IDS.shareUrl).value = url;
  const copyBtn = byId(IDS.copyBtn);
  if (copyBtn) copyBtn.textContent = '📋 Copy link';
  const subEl = byId(IDS.shareModal)?.querySelector('.share-subtitle');
  if (subEl) subEl.textContent = 'Export your tier list as an image — or share a link to your top 20.';
  _updateShareModalCapabilities();
  byId(IDS.shareModal).style.display = 'flex';
}

function copyShareLink() {
  const url = byId(IDS.shareUrl).value;
  const btn = byId(IDS.copyBtn);
  const orig = btn ? btn.textContent : '📋 Copy link';
  navigator.clipboard.writeText(url).then(() => {
    if (btn) {
      btn.textContent = '✓ Copied!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }
  }).catch(() => {
    byId(IDS.shareUrl).select();
    try { document.execCommand('copy'); } catch {}
  });
}

// ─── NATIVE SHARE SHEET (§5.2.5) ──────────────────────────────────────────────
// On mobile (and any browser where navigator.canShare({ files }) returns true),
// open the OS share sheet with the tier list image attached. Users can then pick
// Messages, WhatsApp, Instagram, etc. Falls back to direct download on desktop.
async function shareTierListImage() {
  const btn = byId(IDS.sharePrimaryBtn);
  const orig = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Generating image…'; }
  try {
    const { blob, filename } = await _buildTierListBlob();
    const file = new File([blob], filename, { type: 'image/png' });
    const shareUrl = byId(IDS.shareUrl)?.value || location.href.split('#')[0];
    const shareData = {
      files: [file],
      title: 'My Kessen tier list',
      text:  `My anime tier list — built on kessen.co.uk\n${shareUrl}`,
    };
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share(shareData);
        if (btn) btn.textContent = '✓ Shared!';
        setTimeout(() => { if (btn) btn.textContent = orig; }, 1500);
        return;
      } catch (err) {
        // User cancelled (AbortError) — silent. Other errors → fallback.
        if (err && err.name === 'AbortError') return;
      }
    }
    // Desktop / no-file-share fallback: download the PNG
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    showToast('📥 Image downloaded — share it from your files.');
  } catch (e) {
    showToast('⚠️ Share failed: ' + e.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      if (btn.textContent === '⏳ Generating image…') btn.textContent = orig;
    }
  }
}

// Copy the tier list image to the clipboard (desktop-friendly — lets users
// paste straight into Discord / Twitter / Slack compose boxes). Uses the
// ClipboardItem API where available.
async function copyTierListImageToClipboard() {
  const btn = byId(IDS.shareCopyImageBtn);
  const orig = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Copying…'; }
  try {
    if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
      throw new Error('Clipboard image copy not supported in this browser');
    }
    const { blob } = await _buildTierListBlob();
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    if (btn) {
      btn.textContent = '✓ Image copied — paste anywhere!';
      setTimeout(() => { btn.textContent = orig; }, 2200);
    }
  } catch (e) {
    if (btn) btn.textContent = orig;
    showToast('⚠️ Copy failed: ' + e.message);
  } finally {
    if (btn) btn.disabled = false;
  }
}

// Per-platform share via the encoded URL. Opens a new tab pre-filled with text
// + link — users can still edit before posting.
function shareToSocial(platform) {
  const url  = byId(IDS.shareUrl)?.value;
  if (!url) return;
  const text = 'My anime tier list — built battle by battle on Kessen ⚔️';
  let target;
  switch (platform) {
    case 'twitter':
      target = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      break;
    case 'reddit':
      target = `https://www.reddit.com/submit?title=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      break;
    case 'whatsapp':
      target = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
      break;
    case 'telegram':
      target = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      break;
    case 'facebook':
      target = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    default:
      return;
  }
  window.open(target, '_blank', 'noopener,noreferrer');
}

// Show/hide the "Copy image to clipboard" button depending on browser support.
// ClipboardItem is absent on Firefox + many mobile browsers.
function _updateShareModalCapabilities() {
  const imgCopyBtn = byId(IDS.shareCopyImageBtn);
  if (imgCopyBtn) {
    const supported = typeof ClipboardItem !== 'undefined' && navigator.clipboard && navigator.clipboard.write;
    imgCopyBtn.style.display = supported ? '' : 'none';
  }
  // The primary button label changes with native-share availability so it's
  // honest about what will happen.
  const primary = byId(IDS.sharePrimaryBtn);
  if (primary) {
    let canNativeShare = false;
    try {
      if (typeof File === 'function' && navigator.canShare) {
        const dummy = new File([new Blob()], 'x.png', { type: 'image/png' });
        canNativeShare = !!navigator.canShare({ files: [dummy] });
      }
    } catch { canNativeShare = false; }
    primary.textContent = canNativeShare
      ? '📤 Share tier list image'
      : '⬇️ Download tier list image';
    primary.dataset.nativeShare = canNativeShare ? '1' : '0';
  }
  // Wire Escape-to-close. Safe to call repeatedly — removeEventListener is a
  // no-op if the handler isn't attached, and the browser deduplicates identical
  // (handler, phase) pairs.
  document.removeEventListener('keydown', _shareEscHandler);
  document.addEventListener('keydown', _shareEscHandler);
}

function _shareEscHandler(e) { if (e.key === 'Escape') closeShare(); }
function closeShare() {
  byId(IDS.shareModal).style.display = 'none';
  document.removeEventListener('keydown', _shareEscHandler);
}
function closeShareOnOverlay(e) { if (e.target === byId(IDS.shareModal)) closeShare(); }

// Opens the share modal from the Manage tab — equivalent to shareRankings().
function openShareFromManage() { shareRankings(); }

// ─── HELP MODAL ───────────────────────────────────────────────────────────────
function showHelp()  { byId(IDS.helpModal).style.display = 'flex'; }
function closeHelp() {
  localStorage.setItem(KESSEN_KEYS.ui.helpSeen, '1');
  byId(IDS.helpModal).style.display = 'none';
}
function closeHelpOnOverlay(e) { if (e.target === byId(IDS.helpModal)) closeHelp(); }
function maybeShowHelp() {
  if (!localStorage.getItem(KESSEN_KEYS.ui.helpSeen)) {
    showHelp();
  }
}

// ─── WELCOME MODAL ────────────────────────────────────────────────────────────
function maybeShowWelcome() {
  // Show once per device — guarded solely by KESSEN_KEYS.ui.welcomeSeen.
  if (!localStorage.getItem(KESSEN_KEYS.ui.welcomeSeen)) {
    // If already logged in, skip page 2 — change Next to a direct dismiss
    const isLoggedIn = !!(authToken || malAuthToken);
    const nextBtn = byId('welcome-next-btn');
    if (nextBtn && isLoggedIn) {
      nextBtn.textContent = 'Got it, let\'s rank! ▶';
      nextBtn.onclick = dismissWelcome;
    }
    byId(IDS.welcomeModal).style.display = 'flex';
  }
}
function welcomeNextPage() {
  const page1 = byId('welcome-next-btn')?.closest('.welcome-page');
  const page2 = byId('welcome-page-2');
  if (page1) page1.style.display = 'none';
  if (page2) page2.style.display = '';
}
function dismissWelcome() {
  localStorage.setItem(KESSEN_KEYS.ui.welcomeSeen, '1');
  // Also mark the full help modal as seen so it doesn't auto-show right after
  localStorage.setItem(KESSEN_KEYS.ui.helpSeen, '1');
  byId(IDS.welcomeModal).style.display = 'none';
  // Reset pages for next time (e.g. if welcomeSeen is cleared in testing)
  const page1 = byId(IDS.welcomeModal)?.querySelector('.welcome-page:first-child');
  const page2 = byId('welcome-page-2');
  if (page1) page1.style.display = '';
  if (page2) page2.style.display = 'none';
}

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────
let achievements    = {}; // id -> { unlockedAt: ISO string }
let comparedFriends = new Set(); // AniList usernames we've run compatibility against
let _socialPlatform = 'anilist'; // 'anilist' | 'mal'

function setSocialPlatform(p) {
  _socialPlatform = p;
  byId(IDS.spAnilist)?.classList.toggle('active', p === 'anilist');
  byId(IDS.spMal)?.classList.toggle('active', p === 'mal');
  const ph = p === 'mal' ? 'MAL' : 'AniList';
  const recsInput = byId(IDS.friendRecsInput);
  const compatInput = byId(IDS.compatUsernameInput);
  if (recsInput)  recsInput.placeholder  = `Enter a friend's ${ph} username…`;
  if (compatInput) compatInput.placeholder = `Enter ${ph} username…`;
}

const ACHIEVEMENT_DEFS = [
  {
    id: 'battle', name: 'Battle Hardened', emoji: '⚔️',
    desc: 'Keep fighting battles to rank your anime',
    tiers: [
      { id: 'battle-bronze', tier: 'bronze', label: 'Bronze', req: '50 battles'   },
      { id: 'battle-silver', tier: 'silver', label: 'Silver', req: '250 battles'  },
      { id: 'battle-gold',   tier: 'gold',   label: 'Gold',   req: '1,000 battles' },
    ]
  },
  {
    id: 'collector', name: 'Collector', emoji: '📚',
    desc: 'Build up your ranked library',
    tiers: [
      { id: 'collector-bronze', tier: 'bronze', label: 'Bronze', req: '50 anime'  },
      { id: 'collector-silver', tier: 'silver', label: 'Silver', req: '150 anime' },
      { id: 'collector-gold',   tier: 'gold',   label: 'Gold',   req: '300 anime' },
    ]
  },
  {
    id: 'decisive', name: 'Hot Streak', emoji: '🔥',
    desc: 'Keep winning consecutive battles with the same anime',
    tiers: [
      { id: 'decisive-bronze', tier: 'bronze', label: 'Bronze', req: '5-win streak'  },
      { id: 'decisive-silver', tier: 'silver', label: 'Silver', req: '10-win streak' },
      { id: 'decisive-gold',   tier: 'gold',   label: 'Gold',   req: '20-win streak' },
    ]
  },
  {
    id: 'explorer', name: 'Genre Explorer', emoji: '🎭',
    desc: 'Diversify your list across genres',
    tiers: [
      { id: 'explorer-bronze', tier: 'bronze', label: 'Bronze', req: '5 genres'  },
      { id: 'explorer-silver', tier: 'silver', label: 'Silver', req: '8 genres'  },
      { id: 'explorer-gold',   tier: 'gold',   label: 'Gold',   req: '12 genres' },
    ]
  },
  {
    id: 'traveller', name: 'Time Traveller', emoji: '🕰️',
    desc: 'Explore anime from different eras',
    tiers: [
      { id: 'traveller-bronze', tier: 'bronze', label: 'Bronze', req: '3 decades' },
      { id: 'traveller-silver', tier: 'silver', label: 'Silver', req: '4 decades' },
      { id: 'traveller-gold',   tier: 'gold',   label: 'Gold',   req: '5 decades' },
    ]
  },
  {
    id: 'undefeated', name: 'Undefeated', emoji: '🏆',
    desc: 'Have an anime win 10+ battles without a single loss',
    tiers: [{ id: 'undefeated', tier: 'gold', label: '', req: '10+ wins, 0 losses' }]
  },
  {
    id: 'kindred', name: 'Kindred Spirit', emoji: '💜',
    desc: 'Find someone who shares your taste',
    tiers: [{ id: 'kindred-spirit', tier: 'gold', label: '', req: '80%+ compatibility' }]
  },
  {
    id: 'contrarian', name: 'Contrarian', emoji: '⚡',
    desc: 'Find someone with completely different taste',
    tiers: [{ id: 'contrarian', tier: 'silver', label: '', req: '25% or less compatibility' }]
  },
  {
    id: 'settled', name: 'Settled', emoji: '⚖️',
    desc: 'Build a deep, well-ranked library with confident ratings throughout',
    tiers: [
      { id: 'settled-bronze', tier: 'bronze', label: 'Bronze', req: '25 anime at 10+ battles'  },
      { id: 'settled-silver', tier: 'silver', label: 'Silver', req: '75 anime at 10+ battles'  },
      { id: 'settled-gold',   tier: 'gold',   label: 'Gold',   req: 'Every anime at 10+ battles' },
    ]
  },
  {
    id: 'top-dog', name: 'Top Dog', emoji: '👑',
    desc: 'Your #1 ranked anime dominates in battle',
    tiers: [
      { id: 'top-dog-bronze', tier: 'bronze', label: 'Bronze', req: '20 wins at #1'  },
      { id: 'top-dog-silver', tier: 'silver', label: 'Silver', req: '75 wins at #1'  },
      { id: 'top-dog-gold',   tier: 'gold',   label: 'Gold',   req: '250 wins at #1' },
    ]
  },
  {
    id: 'social-butterfly', name: 'Social Butterfly', emoji: '🦋',
    desc: 'Compare your taste with other fans',
    tiers: [
      { id: 'social-bronze', tier: 'bronze', label: 'Bronze', req: '3 friends compared'  },
      { id: 'social-silver', tier: 'silver', label: 'Silver', req: '5 friends compared'  },
      { id: 'social-gold',   tier: 'gold',   label: 'Gold',   req: '10 friends compared' },
    ]
  },
  {
    id: 'hidden-gem-fan', name: 'Hidden Gem Fan', emoji: '💎',
    desc: 'Appreciate an anime the masses overlooked',
    tiers: [{ id: 'hidden-gem-fan', tier: 'gold', label: '', req: 'Sub-50k anime in your top 10' }]
  },
  {
    id: 'old-soul', name: 'Old Soul', emoji: '📼',
    desc: 'Appreciate the classics from before the modern era',
    tiers: [{ id: 'old-soul', tier: 'gold', label: '', req: 'Pre-1990 anime in your top 10' }]
  },
  {
    id: 'rival', name: 'Rival', emoji: '🤺',
    desc: 'Keep fighting rematches until neither side can claim clear victory',
    tiers: [
      { id: 'rival-bronze', tier: 'bronze', label: 'Bronze', req: '1 rivalry (3+ battles, split results)'  },
      { id: 'rival-silver', tier: 'silver', label: 'Silver', req: '3 rivalries' },
      { id: 'rival-gold',   tier: 'gold',   label: 'Gold',   req: '5 rivalries' },
    ]
  },
  {
    id: 'comeback-kid', name: 'Comeback Kid', emoji: '📈',
    desc: 'Watch an underdog anime rise from a low seed to the upper tier',
    tiers: [{ id: 'comeback-kid', tier: 'gold', label: '', req: 'An anime seeded ≤900 ELO now in your top 25%' }]
  },
];

function _tryUnlock(id, condition, toastName) {
  if (!condition || achievements[id]) return;
  achievements[id] = { unlockedAt: new Date().toISOString() };
  saveState();
  showToast(`🏆 Achievement unlocked: ${toastName}`, 4000);
  // Refresh tab if open
  if (byId(IDS.tabPanelAchievements)?.style.display !== 'none') {
    renderAchievementsTab();
  }
}

function _checkAchievements() {
  if (!animeList.length) return;

  // Battle Hardened
  _tryUnlock('battle-bronze', battleCount >= 50,   '⚔️ Battle Hardened (Bronze)');
  _tryUnlock('battle-silver', battleCount >= 250,  '⚔️ Battle Hardened (Silver)');
  _tryUnlock('battle-gold',   battleCount >= 1000, '⚔️ Battle Hardened (Gold)');

  // Collector
  _tryUnlock('collector-bronze', animeList.length >= 50,  '📚 Collector (Bronze)');
  _tryUnlock('collector-silver', animeList.length >= 150, '📚 Collector (Silver)');
  _tryUnlock('collector-gold',   animeList.length >= 300, '📚 Collector (Gold)');

  // Hot Streak — longest current win streak across any anime
  const maxStreak = Math.max(0, ...animeList.map(a => (a.streak?.type === 'win' ? (a.streak.count || 0) : 0)));
  _tryUnlock('decisive-bronze', maxStreak >= 5,  '🔥 Hot Streak (Bronze)');
  _tryUnlock('decisive-silver', maxStreak >= 10, '🔥 Hot Streak (Silver)');
  _tryUnlock('decisive-gold',   maxStreak >= 20, '🔥 Hot Streak (Gold)');

  // Genre Explorer
  const genreCount = new Set(animeList.flatMap(a => a.genres || [])).size;
  _tryUnlock('explorer-bronze', genreCount >= 5,  '🎭 Genre Explorer (Bronze)');
  _tryUnlock('explorer-silver', genreCount >= 8,  '🎭 Genre Explorer (Silver)');
  _tryUnlock('explorer-gold',   genreCount >= 12, '🎭 Genre Explorer (Gold)');

  // Time Traveller
  const decadeCount = new Set(animeList.filter(a => a.seasonYear).map(a => Math.floor(a.seasonYear / 10) * 10)).size;
  _tryUnlock('traveller-bronze', decadeCount >= 3, '🕰️ Time Traveller (Bronze)');
  _tryUnlock('traveller-silver', decadeCount >= 4, '🕰️ Time Traveller (Silver)');
  _tryUnlock('traveller-gold',   decadeCount >= 5, '🕰️ Time Traveller (Gold)');

  // Undefeated
  const hasUndefeated = animeList.some(a => a.wins >= 10 && a.losses === 0);
  _tryUnlock('undefeated', hasUndefeated, '🏆 Undefeated');

  // Settled — anime with Confident rankings (10+ battles, matching confidenceLabel threshold)
  const settledCount = animeList.filter(a => (a.battles || 0) >= TARGET_BATTLES_PER_ANIME).length;
  const allSettled   = animeList.length >= 10 && settledCount === animeList.length;
  _tryUnlock('settled-bronze', settledCount >= 25, '⚖️ Settled (Bronze)');
  _tryUnlock('settled-silver', settledCount >= 75, '⚖️ Settled (Silver)');
  _tryUnlock('settled-gold',   allSettled,          '⚖️ Settled (Gold)');

  // Top Dog — wins of the current #1 ranked anime
  const byElo  = [...animeList].sort((a, b) => b.elo - a.elo);
  const topWins = byElo[0]?.wins || 0;
  _tryUnlock('top-dog-bronze', topWins >= 20,  '👑 Top Dog (Bronze)');
  _tryUnlock('top-dog-silver', topWins >= 75,  '👑 Top Dog (Silver)');
  _tryUnlock('top-dog-gold',   topWins >= 250, '👑 Top Dog (Gold)');

  // Social Butterfly — unique friends compared
  const friendCount = comparedFriends.size;
  _tryUnlock('social-bronze', friendCount >= 3,  '🦋 Social Butterfly (Bronze)');
  _tryUnlock('social-silver', friendCount >= 5,  '🦋 Social Butterfly (Silver)');
  _tryUnlock('social-gold',   friendCount >= 10, '🦋 Social Butterfly (Gold)');

  // Hidden Gem Fan — sub-50k popularity anime in top 10
  const top10 = byElo.slice(0, 10);
  const hasHiddenGem = top10.some(a => a.popularity > 0 && a.popularity < 50000);
  _tryUnlock('hidden-gem-fan', hasHiddenGem, '💎 Hidden Gem Fan');

  // Old Soul — pre-1990 anime in top 10
  const hasOldSoul = top10.some(a => a.seasonYear && a.seasonYear < 1990);
  _tryUnlock('old-soul', hasOldSoul, '📼 Old Soul');

  // Rival — rivalries in matchupStats (3+ battles, split results)
  const rivalryCount = Object.values(matchupStats).filter(m =>
    m.total >= 3 &&
    Object.keys(m.wins).length >= 2 &&
    Object.values(m.wins).every(w => w >= 1)
  ).length;
  _tryUnlock('rival-bronze', rivalryCount >= 1, '🤺 Rival (Bronze)');
  _tryUnlock('rival-silver', rivalryCount >= 3, '🤺 Rival (Silver)');
  _tryUnlock('rival-gold',   rivalryCount >= 5, '🤺 Rival (Gold)');

  // Comeback Kid — any anime seeded at ≤900 ELO that is now in the top 25%
  const top25cutoff  = Math.floor(byElo.length * 0.25);
  const top25ids     = new Set(byElo.slice(0, Math.max(1, top25cutoff)).map(a => a.id));
  const hasComeback  = animeList.some(a =>
    top25ids.has(a.id) &&
    Array.isArray(a.eloHistory) && a.eloHistory.length > 0 &&
    a.eloHistory[0] <= 900
  );
  _tryUnlock('comeback-kid', hasComeback, '📈 Comeback Kid');
}

function renderAchievementsTab() {
  const el = byId(IDS.achievementsContent);
  if (!el) return;

  const totalTiers  = ACHIEVEMENT_DEFS.reduce((s, d) => s + d.tiers.length, 0);
  const unlockedCount = Object.keys(achievements).length;

  const tierIcons = { bronze: '🥉', silver: '🥈', gold: '🥇' };
  const tierOrder = ['bronze', 'silver', 'gold'];

  el.innerHTML = `
    <div class="achievements-summary">
      ${unlockedCount} / ${totalTiers} unlocked
      <div style="height:6px;background:#21262d;border-radius:4px;margin:8px auto;max-width:200px">
        <div style="height:100%;border-radius:4px;background:#3fb950;width:${Math.round((unlockedCount/totalTiers)*100)}%"></div>
      </div>
    </div>
    <div class="achievements-grid">
      ${ACHIEVEMENT_DEFS.map(def => {
        // Find the highest unlocked tier for this achievement
        let highestTier = null;
        for (const tier of tierOrder) {
          const match = def.tiers.find(t => t.tier === tier);
          if (match && achievements[match.id]) highestTier = tier;
        }
        const cardCls = highestTier ? `has-${highestTier}` : '';
        return `
          <div class="achievement-card ${cardCls}">
            <div class="achievement-header">
              <span class="achievement-emoji">${def.emoji}</span>
              <div>
                <div class="achievement-name">${def.name}</div>
                <p class="achievement-desc">${def.desc}</p>
              </div>
            </div>
            <div class="achievement-tiers">
              ${def.tiers.map(t => {
                const unlock = achievements[t.id];
                const date = unlock ? new Date(unlock.unlockedAt).toLocaleDateString() : null;
                const tierCls = unlock ? `unlocked ${t.tier}` : '';
                return `
                  <div class="ach-tier ${tierCls}">
                    <span class="ach-icon">${unlock ? tierIcons[t.tier] : '🔒'}</span>
                    <span class="ach-label">${t.tier.charAt(0).toUpperCase() + t.tier.slice(1)}</span>
                    <span class="ach-req">${t.req}</span>
                    ${date ? `<span class="achievement-unlock-date">${date}</span>` : ''}
                  </div>`;
              }).join('')}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

// ─── RESULTS TABS ─────────────────────────────────────────────────────────────
let activeResultsTab = 'rankings';

function switchResultsTab(tab) {
  activeResultsTab = tab;
  document.querySelectorAll('.res-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
    // Scroll active tab into view on mobile (no-op on desktop)
    if (b.dataset.tab === tab) b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.style.display = p.id === 'tab-panel-' + tab ? '' : 'none';
  });
  if (tab === 'rankings')     renderExcluded();
  if (tab === 'stats')        renderStatsTab();
  if (tab === 'history')      renderHistoryTab();
  if (tab === 'discover')     renderDiscoverTab();
  if (tab === 'social')       renderSocialTab();
  if (tab === 'achievements') renderAchievementsTab();
}

function renderDiscoverTab() {
  if (recsTab === 'predict') return; // predictor is search-driven, no pre-loading needed

  const grid = byId(IDS.recsGrid);

  // If this tab already has cached content, restore it
  if (_recsCache[recsTab]) {
    grid.innerHTML     = _recsCache[recsTab].html;
    grid.style.display = _recsCache[recsTab].gridDisplay;
    _recsLoadedTab     = recsTab;
    return;
  }

  // Nothing loaded yet — hide grid and sub-text; the tab buttons above are the prompt
  grid.style.display = 'none';
  grid.innerHTML = '';
  const sub = byId(IDS.recsSubText);
  if (sub) sub.style.display = 'none';
}

function renderHistoryTab() {
  renderHistory();
  renderRivalries();
}

function renderSocialTab() {
  // Show the platform toggle only when both AniList and MAL tokens are present.
  // Single-service users don't need it — there's only one valid choice.
  const row = byId(IDS.socialPlatformRow);
  if (row) row.style.display = malAuthToken ? 'flex' : 'none';
  setSocialPlatform(_isMalCloudSession() ? 'mal' : 'anilist');
  _renderSavedComparisons();
}

// ─── RIVALRY TRACKER ──────────────────────────────────────────────────────────
function renderRivalries() {
  // Build from persistent matchupStats (survives the 200-battle history cap).
  // For legacy saves without matchupStats, fall back to scanning battleHistory.
  let source = matchupStats;
  const hasStats = Object.keys(matchupStats).length > 0;
  if (!hasStats) {
    // Legacy: rebuild a temporary map from history
    const tmp = {};
    battleHistory.forEach(h => {
      const idW = h.winnerId ?? null, idL = h.loserId ?? null;
      if (!idW || !idL) return;
      const key = [Math.min(idW, idL), Math.max(idW, idL)].join('-');
      if (!tmp[key]) tmp[key] = {
        wins: {}, total: 0,
        titleA: idW < idL ? h.winnerTitle : h.loserTitle,
        titleB: idW < idL ? h.loserTitle  : h.winnerTitle,
      };
      tmp[key].wins[idW] = (tmp[key].wins[idW] || 0) + 1;
      tmp[key].total++;
    });
    source = tmp;
  }

  const rivalries = [];
  Object.entries(source).forEach(([key, m]) => {
    const [idAStr, idBStr] = key.split('-');
    const idA = Number(idAStr), idB = Number(idBStr);
    if (m.total < 3) return;
    const winCounts = Object.values(m.wins);
    if (winCounts.length < 2 || !winCounts.every(w => w >= 1)) return; // must be split
    rivalries.push({ ...m, idA, idB });
  });

  const section = byId(IDS.rivalrySection);
  const list    = byId(IDS.rivalryList);
  if (rivalries.length === 0) { section.style.display = 'none'; return; }

  section.style.display = 'block';
  list.innerHTML = rivalries.sort((a, b) => b.total - a.total).map(m => {
    const anime1 = animeList.find(a => a.id === m.idA);
    const anime2 = animeList.find(a => a.id === m.idB);
    const n1 = anime1?.title ?? m.titleA;
    const n2 = anime2?.title ?? m.titleB;
    const w1 = m.wins[m.idA] || 0;
    const w2 = m.wins[m.idB] || 0;
    return `<div class="rivalry-item">
      <span class="rivalry-item-names">${n1} <span style="color:#8b949e">vs</span> ${n2}</span>
      <span class="rivalry-badge">⚔️ ${w1}–${w2} (${m.total} battles)</span>
    </div>`;
  }).join('');
}

// ─── SYNOPSIS TOGGLE ──────────────────────────────────────────────────────────
function toggleSynopsis(event, side) {
  event.stopPropagation();
  const panelId = side === 0 ? 'synopsis-a' : 'synopsis-b';
  const panel = document.getElementById(panelId);
  if (panel.style.display === 'none') {
    panel.style.display = 'block';
    panel.scrollTop = 0;
  } else {
    panel.style.display = 'none';
  }
}

// ─── KEYBOARD SHORTCUT FIRST-USE TIP ──────────────────────────────────────────
// Show the KB tip only on devices that have at least one fine pointer (mouse or
// stylus) *and* aren't purely touch. `any-pointer: fine` is true on touch
// laptops (Surface Pros, Chromebooks, touch MacBooks) because they also have
// a trackpad/mouse — those users still want keyboard shortcuts. Pure phones
// and tablets are `coarse`-only.
function _hasPhysicalKeyboard() {
  try {
    const hasFine     = window.matchMedia && window.matchMedia('(any-pointer: fine)').matches;
    const coarseOnly  = window.matchMedia && window.matchMedia('(any-pointer: coarse)').matches && !hasFine;
    return hasFine && !coarseOnly;
  } catch { return true; } // fail open — showing a tip is less bad than hiding a feature
}
function maybeShowKbTip() {
  maybeShowWelcome();
  if (!_hasPhysicalKeyboard()) return;
  if (!localStorage.getItem(KESSEN_KEYS.ui.kbSeen)) {
    byId(IDS.kbFirstTip).style.display = 'block';
  }
}
function dismissKbTip() {
  localStorage.setItem(KESSEN_KEYS.ui.kbSeen, '1');
  byId(IDS.kbFirstTip).style.display = 'none';
}

// ─── SESSION SUMMARY ──────────────────────────────────────────────────────────
let sessionStartElo    = {};
let sessionBattleCount = 0;
const SESSION_SUMMARY_INTERVAL = 15;

function snapshotSessionStart() {
  sessionStartElo    = {};
  sessionBattleCount = 0;
  animeList.forEach(a => { sessionStartElo[a.id] = a.elo; });
}

function checkSessionSummary() {
  sessionBattleCount++;
  if (sessionBattleCount > 0 && sessionBattleCount % SESSION_SUMMARY_INTERVAL === 0) {
    showSessionSummary();
  }
}

function showSessionSummary() {
  const movers = animeList
    .filter(a => sessionStartElo[a.id] !== undefined)
    .map(a => ({ ...a, delta: a.elo - (sessionStartElo[a.id] || a.elo) }))
    .filter(a => Math.abs(a.delta) >= 8)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 8);

  if (movers.length === 0) return; // nothing notable, skip

  byId(IDS.sessionSummarySubtitle).textContent =
    `${sessionBattleCount} battles this session — here\u2019s what moved`;

  byId(IDS.sessionSummaryList).innerHTML = movers.map(a => `
    <div class="session-mover">
      <img src="${safeUrl(a.cover)}" alt="${esc(a.title)}" />
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:0.85rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.title)}</div>
        <div style="font-size:0.78rem;color:#8b949e">${sessionStartElo[a.id] | 0} \u2192 ${a.elo | 0} ELO</div>
      </div>
      <span class="${a.delta > 0 ? 'mover-up' : 'mover-down'}">${a.delta > 0 ? '\u25b2' : '\u25bc'} ${Math.abs(a.delta | 0)}</span>
    </div>`).join('');

  byId(IDS.sessionSummaryModal).style.display = 'flex';
}

function closeSessionSummary(e) {
  if (!e || e.target === byId(IDS.sessionSummaryModal)) {
    byId(IDS.sessionSummaryModal).style.display = 'none';
  }
}

// Show a shared rankings view when URL has #r= hash.
// SECURITY: every field in the payload is attacker-controlled (the whole JSON
// comes from the URL hash) so NOTHING from the payload is allowed into innerHTML.
// All user-visible strings go via textContent; the cover-image URL is scheme-
// and host-allowlisted before it ever touches <img src>.
function tryLoadSharedView() {
  const hash = location.hash;
  if (!hash.startsWith('#r=')) return false;

  // Only https:// URLs on known anime-cover CDNs can populate <img src>.
  // Anything else (javascript:, data:, an attacker's host) → blank placeholder.
  const _ALLOWED_IMG_HOSTS = new Set([
    's4.anilist.co',
    'img.anili.st',
    'cdn.myanimelist.net',
  ]);
  const _safeImgUrl = raw => {
    try {
      const u = new URL(String(raw ?? ''));
      if (u.protocol !== 'https:') return '';
      if (!_ALLOWED_IMG_HOSTS.has(u.hostname)) return '';
      return u.href;
    } catch { return ''; }
  };

  try {
    const payload = JSON.parse(decodeURIComponent(escape(atob(hash.slice(3)))));
    if (!payload || !Array.isArray(payload.top)) return false;

    // Coerce / clamp every payload field before it reaches the DOM.
    const u  = String(payload.u  ?? '').slice(0, 80);
    const ms = payload.ms ? String(payload.ms).slice(0, 80) : '';
    const b  = Math.max(0, parseInt(payload.b, 10) || 0);
    const top = payload.top.slice(0, 50); // hard cap — share links are top-20 by design

    byId(IDS.sharedTitle).textContent =
      ms ? `${u} hit ${ms}` : `${u}'s Top ${top.length} Anime`;
    byId(IDS.sharedSubtitle).textContent =
      ms ? `Top 5 after ${b} battles` : `After ${b} battles`;

    const list = byId(IDS.sharedList);
    list.textContent = ''; // clear without innerHTML

    top.forEach(a => {
      if (!a || typeof a !== 'object') return;
      const rank  = Math.max(0, parseInt(a.r, 10) || 0);
      const elo   = Math.max(0, parseInt(a.e, 10) || 0);
      const title = String(a.t ?? '').slice(0, 200);
      const cover = _safeImgUrl(a.c);
      const numClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';

      const card = document.createElement('div');
      card.className = 'rank-card';

      const rankSpan = document.createElement('span');
      rankSpan.className = 'rank-number' + (numClass ? ' ' + numClass : '');
      rankSpan.textContent = '#' + rank;
      card.appendChild(rankSpan);

      if (cover) {
        const img = document.createElement('img');
        img.src = cover;
        img.alt = title;
        img.loading = 'lazy';
        card.appendChild(img);
      }

      const titleDiv = document.createElement('div');
      titleDiv.className = 'rank-title';
      titleDiv.textContent = title;
      card.appendChild(titleDiv);

      const eloDiv = document.createElement('div');
      eloDiv.className = 'rank-elo';
      eloDiv.textContent = 'ELO ' + elo;
      card.appendChild(eloDiv);

      list.appendChild(card);
    });
    show('shared-screen');
    return true;
  } catch { return false; }
}

// ─── FUZZY FLAG ───────────────────────────────────────────────────────────────
function flagFuzzy(event, side) {
  event.stopPropagation();
  const idx = side === 0 ? currentA : currentB;
  animeList[idx].fuzzy = !animeList[idx].fuzzy;
  saveState();
  const btnId = side === 0 ? 'fuzzy-a' : 'fuzzy-b';
  const btn = document.getElementById(btnId);
  const isFuzzy = animeList[idx].fuzzy;
  btn.classList.toggle('active', isFuzzy);
  btn.textContent = isFuzzy ? '🌫 Fuzzy' : "🌫 Can't remember";
}

// ─── SEARCH / FILTER ──────────────────────────────────────────────────────────
function filterRankings() {
  if (franchiseMode) { _filterFranchise(); return; }
  const q = byId(IDS.searchInput).value.toLowerCase().trim();
  // Build a quick id→fuzzy lookup from the data model (not DOM) so that
  // unfuzzying an anime is reflected immediately without a full re-render.
  const fuzzyById = new Map(animeList.map(a => [a.id, !!a.fuzzy]));
  document.querySelectorAll('#ranking-list .rank-card').forEach(card => {
    if (card.classList.contains('franchise-group')) return; // skip franchise cards
    const titleEl = card.querySelector('.rank-title');
    if (!titleEl) return;
    const title   = titleEl.textContent.toLowerCase();
    const animeId = parseInt(card.dataset.animeId) || 0;
    const isFuzzy = fuzzyById.get(animeId) ?? (card.querySelector('.fuzzy-tag') !== null);
    const fmt     = card.dataset.format  || '';
    const epRng   = card.dataset.epRange || 'unknown';
    const show = (!q || title.includes(q))
      && (!showFuzzyOnly || isFuzzy)
      && !hiddenFormats.has(fmt)
      && !hiddenEpRanges.has(epRng)
      && !excludedIds.has(animeId);
    card.style.display = show ? '' : 'none';
  });
  if (rankingView === 'list') renderRankingTable();
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function toggleStats() { switchResultsTab('stats'); }

function renderStatsTab() {
  // Numbers
  byId(IDS.statTotalBattles).textContent = battleCount;
  const stable = Math.round(
    (animeList.filter(a => (a.battles || 0) >= TARGET_BATTLES_PER_ANIME).length / animeList.length) * 100
  );
  byId(IDS.statStability).textContent = stable + '%';
  byId(IDS.statFuzzy).textContent = animeList.filter(a => a.fuzzy).length;

  // Most battled
  const mostBattled = [...animeList].sort((a, b) => (b.battles || 0) - (a.battles || 0)).slice(0, 5);
  byId(IDS.statMostBattled).innerHTML = mostBattled.map(a =>
    `<div class="stat-anime-row"><span>${esc(a.title)}</span><span>${a.battles || 0}</span></div>`
  ).join('');

  // Best win rate (5+ battles minimum)
  const eligible = [...animeList]
    .filter(a => (a.wins + a.losses) >= 5)
    .map(a => ({ ...a, rate: a.wins / (a.wins + a.losses) }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 5);
  byId(IDS.statBestWinrate).innerHTML = eligible.length
    ? eligible.map(a =>
        `<div class="stat-anime-row"><span>${esc(a.title)}</span><span>${Math.round(a.rate * 100)}%</span></div>`
      ).join('')
    : '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">Not enough battles yet.</div>';

  // Biggest upsets (winner was underdog — eloDiffBefore > 0, largest first)
  const upsets = [...battleHistory]
    .filter(h => h.eloDiffBefore > 0)
    .sort((a, b) => b.eloDiffBefore - a.eloDiffBefore)
    .slice(0, 5);
  byId(IDS.statUpsets).innerHTML = upsets.length
    ? upsets.map(h =>
        `<div class="stat-anime-row">
          <span><span style="color:#3fb950">${h.winnerTitle}</span> beat ${h.loserTitle}</span>
          <span>+${h.eloDiffBefore} ELO gap</span>
        </div>`
      ).join('')
    : '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">No upsets recorded yet.</div>';

  renderFormatSplit();
  renderScoreDistribution();
  renderGenreStats();       // async — enriches genres/studios if needed, then calls renderStudioAffinity
  renderDisagreements();
}

async function renderGenreStats() {
  const chartEl = byId(IDS.statGenreChart);
  const eraEl   = byId(IDS.statEraChart);
  if (!chartEl || !eraEl) return;

  // If existing save predates genre data, silently fetch and patch it now
  const needsEnrichment = animeList.some(a => !Array.isArray(a.genres));
  if (needsEnrichment) {
    chartEl.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">⏳ Fetching genre data…</div>';
    eraEl.innerHTML   = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">⏳ Fetching era data…</div>';
    try {
      await _enrichGenresAndEras();
    } catch (e) {
      chartEl.innerHTML = `<div style="color:#f85149;font-size:0.8rem;padding:8px 0">Could not fetch genre data: ${esc(e.message)}</div>`;
      eraEl.innerHTML   = '';
      return;
    }
  }

  // ── Genre chart ──────────────────────────────────────────────────────────
  const genreMap = {};
  animeList.forEach(a => {
    (a.genres || []).forEach(g => {
      if (!genreMap[g]) genreMap[g] = { sum: 0, count: 0 };
      genreMap[g].sum   += a.elo;
      genreMap[g].count += 1;
    });
  });
  const genres = Object.entries(genreMap)
    .filter(([, v]) => v.count >= 3)
    .map(([name, v]) => ({ name, avg: Math.round(v.sum / v.count), count: v.count }))
    .sort((a, b) => b.avg - a.avg);

  if (genres.length === 0) {
    chartEl.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">Not enough genre data yet (need 3+ anime per genre).</div>';
  } else {
    const maxA = genres[0].avg, minA = genres[genres.length - 1].avg, range = maxA - minA || 1;
    chartEl.innerHTML = genres.map(g => {
      const pct = Math.round(((g.avg - minA) / range) * 80 + 20);
      return `<div class="genre-chart-row">
        <div class="genre-chart-label" title="${g.name}">${g.name}</div>
        <div class="genre-chart-track"><div class="genre-chart-fill" style="width:${pct}%"></div></div>
        <div class="genre-chart-value">${g.avg} <span style="color:#6e7681">(${g.count})</span></div>
      </div>`;
    }).join('');
  }

  // ── Era chart ─────────────────────────────────────────────────────────────
  const eraMap = {};
  animeList.forEach(a => {
    if (!a.seasonYear) return;
    const decade = Math.floor(a.seasonYear / 10) * 10;
    const label  = decade + 's';
    if (!eraMap[label]) eraMap[label] = { sum: 0, count: 0, decade };
    eraMap[label].sum   += a.elo;
    eraMap[label].count += 1;
  });
  const eras = Object.entries(eraMap)
    .filter(([, v]) => v.count >= 2)
    .map(([label, v]) => ({ label, avg: Math.round(v.sum / v.count), count: v.count, decade: v.decade }))
    .sort((a, b) => a.decade - b.decade);

  if (eras.length === 0) {
    eraEl.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">Not enough era data yet (need 2+ anime per decade).</div>';
  } else {
    const maxA = Math.max(...eras.map(e => e.avg));
    const minA = Math.min(...eras.map(e => e.avg));
    const range = maxA - minA || 1;
    eraEl.innerHTML = eras.map(e => {
      const pct = Math.round(((e.avg - minA) / range) * 80 + 20);
      return `<div class="genre-chart-row">
        <div class="genre-chart-label">${e.label}</div>
        <div class="genre-chart-track"><div class="genre-chart-fill era-fill" style="width:${pct}%"></div></div>
        <div class="genre-chart-value">${e.avg} <span style="color:#6e7681">(${e.count})</span></div>
      </div>`;
    }).join('');
  }

  // Studio affinity runs after enrichment (which now also fetches studios)
  renderStudioAffinity();
}

function renderFormatSplit() {
  const el = byId(IDS.statFormatChart);
  if (!el) return;
  const fmtLabels = { TV:'TV Series', MOVIE:'Movie', OVA:'OVA', ONA:'ONA', TV_SHORT:'Short', SPECIAL:'Special' };
  const fmtMap = {};
  animeList.forEach(a => {
    const fmt = a.format || 'Unknown';
    if (!fmtMap[fmt]) fmtMap[fmt] = { sum: 0, count: 0 };
    fmtMap[fmt].sum += a.elo;
    fmtMap[fmt].count++;
  });
  const formats = Object.entries(fmtMap)
    .map(([fmt, v]) => ({ fmt, label: fmtLabels[fmt] || fmt, avg: Math.round(v.sum / v.count), count: v.count }))
    .sort((a, b) => b.count - a.count);
  if (!formats.length) { el.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">No data yet.</div>'; return; }
  const maxCount = Math.max(...formats.map(f => f.count));
  el.innerHTML = formats.map(f => {
    const pct = Math.round((f.count / maxCount) * 100);
    return `<div class="genre-chart-row">
      <div class="genre-chart-label">${f.label}</div>
      <div class="genre-chart-track"><div class="genre-chart-fill format-fill" style="width:${pct}%"></div></div>
      <div class="genre-chart-value">${f.count} <span style="color:#6e7681">avg ${f.avg}</span></div>
    </div>`;
  }).join('');
}

function renderScoreDistribution() {
  const el = byId(IDS.statScoreDist);
  if (!el) return;
  const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const total = sorted.length;
  if (!total) { el.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">No data yet.</div>'; return; }
  // Use the same percentile buckets as _eloToScore10
  const buckets = { 10:0, 9:0, 8:0, 7:0, 6:0, 5:0, 4:0, 3:0, 2:0, 1:0 };
  sorted.forEach((_, i) => { buckets[_eloToScore10(i, total)]++; });
  const maxCount = Math.max(...Object.values(buckets));
  const scoreColors = { 10:'#3fb950', 9:'#56d364', 8:'#7ee787', 7:'#a5d6ff', 6:'#79c0ff', 5:'#d29922', 4:'#f0883e', 3:'#f85149', 2:'#da3633', 1:'#b62324' };
  el.innerHTML = [10,9,8,7,6,5,4,3,2,1].map(score => {
    const count = buckets[score];
    const pct   = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0;
    const c     = scoreColors[score];
    return `<div class="genre-chart-row score-dist-row">
      <div class="genre-chart-label" style="color:${c};font-weight:600">${score}/10</div>
      <div class="genre-chart-track"><div class="genre-chart-fill" style="width:${pct}%;background:${c}55;outline:1px solid ${c}44"></div></div>
      <div class="genre-chart-value">${count}</div>
    </div>`;
  }).join('');
}

function renderStudioAffinity() {
  const el = byId(IDS.statStudioAffinity);
  if (!el) return;
  const hasStudios = animeList.some(a => Array.isArray(a.studios) && a.studios.length > 0);
  if (!hasStudios) {
    el.innerHTML = `<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">Studio data not loaded yet —
      <a href="#" style="color:#58a6ff" onclick="event.preventDefault();_enrichGenresAndEras().then(renderStatsTab)">fetch it now →</a></div>`;
    return;
  }
  const overallAvg = Math.round(animeList.reduce((s, a) => s + a.elo, 0) / animeList.length);
  const studioMap = {};
  animeList.forEach(a => {
    (a.studios || []).forEach(s => {
      if (!studioMap[s]) studioMap[s] = { sum: 0, count: 0 };
      studioMap[s].sum += a.elo;
      studioMap[s].count++;
    });
  });
  const studios = Object.entries(studioMap)
    .filter(([, v]) => v.count >= 3)
    .map(([name, v]) => ({ name, avg: Math.round(v.sum / v.count), count: v.count, diff: Math.round(v.sum / v.count) - overallAvg }))
    .sort((a, b) => b.diff - a.diff);
  if (!studios.length) {
    el.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">Not enough data yet — need 3+ ranked anime per studio.</div>';
    return;
  }
  const top    = studios.slice(0, 6);
  const bottom = [...studios].reverse().slice(0, 6);
  const renderList = (list, positive) => list.map(s => {
    const sign  = s.diff >= 0 ? '+' : '';
    const color = positive ? '#3fb950' : '#f85149';
    return `<div class="stat-anime-row">
      <span>${s.name} <span style="color:#6e7681;font-size:0.8em">(${s.count})</span></span>
      <span style="color:${color};font-weight:600">${sign}${s.diff}</span>
    </div>`;
  }).join('');
  el.innerHTML = `
    <div class="studio-affinity-grid">
      <div>
        <div style="font-size:0.82rem;color:#3fb950;margin-bottom:8px;font-weight:600">🟢 You rate highest</div>
        ${renderList(top, true)}
      </div>
      <div>
        <div style="font-size:0.82rem;color:#f85149;margin-bottom:8px;font-weight:600">🔴 You rate lowest</div>
        ${renderList(bottom, false)}
      </div>
    </div>
    <p style="color:#6e7681;font-size:0.75rem;margin-top:10px">ELO difference from your overall average (${overallAvg})</p>`;
}

// Silently fetch genres + seasonYear for existing anime that predate those fields
async function _enrichGenresAndEras() {
  const ids = animeList.map(a => a.id);
  const PAGE_SIZE = 50;
  for (let i = 0; i < ids.length; i += PAGE_SIZE) {
    const chunk = ids.slice(i, i + PAGE_SIZE);
    const query = `
      query ($ids: [Int]) {
        Page(perPage: 50) {
          media(id_in: $ids, type: ANIME) {
            id
            genres
            seasonYear
            studios(isMain: true) { nodes { name } }
          }
        }
      }`;
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: anilistHeaders(),
      body: JSON.stringify({ query, variables: { ids: chunk } })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (data.errors) throw new Error(data.errors[0].message);
    const enrichMap = new Map((data?.data?.Page?.media ?? []).map(m => [m.id, m]));
    animeList.forEach(a => {
      const m = enrichMap.get(a.id);
      if (m) {
        if (!Array.isArray(a.genres)) a.genres = m.genres || [];
        if (!a.seasonYear)            a.seasonYear = m.seasonYear || null;
        if (!Array.isArray(a.studios)) a.studios = (m.studios?.nodes || []).map(n => n.name).filter(Boolean);
      }
    });
    if (i + PAGE_SIZE < ids.length) await new Promise(r => setTimeout(r, 350));
  }
  saveState();
}

// ─── ANIME DETAIL MODAL ───────────────────────────────────────────────────────
function showAnimeDetail(id) {
  const anime = animeList.find(a => a.id === id);
  if (!anime) return;

  const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const rank = sorted.findIndex(a => a.id === id) + 1;
  const tier = getTier(rank - 1, sorted.length);

  const coverEl = byId(IDS.modalCover);
  coverEl.classList.remove('img-broken'); // clear any stale failure state from a previous modal open
  coverEl.src = anime.cover;
  coverEl.alt = displayTitle(anime);
  byId(IDS.modalTitle).textContent = displayTitle(anime);
  const tierHtml = `<span class="tier-badge t-${tier.toLowerCase()}" style="position:static;display:inline-flex;margin-right:6px">${tier}</span>`;
  const scoreStr = anime.globalScore ? `· Community ${anime.globalScore}%` : '';
  byId(IDS.modalRankLine).innerHTML = `${tierHtml}Rank #${rank} of ${animeList.length} ${scoreStr}`;

  // Meta line: format + season/year
  const fmtLabel = { TV:'TV Series', MOVIE:'Movie', OVA:'OVA', ONA:'ONA', TV_SHORT:'Short', SPECIAL:'Special' }[anime.format] || anime.format || '';
  const yearStr  = anime.seasonYear ? String(anime.seasonYear) : '';
  byId(IDS.modalMetaLine).textContent = [fmtLabel, yearStr].filter(Boolean).join(' · ');

  // Genre tags
  const genresEl = byId(IDS.modalGenres);
  const genres = Array.isArray(anime.genres) ? anime.genres.slice(0, 6) : [];
  genresEl.innerHTML = genres.map(g => `<span class="modal-genre-tag">${g}</span>`).join('');
  genresEl.style.display = genres.length ? 'flex' : 'none';
  byId(IDS.modalWins).textContent    = anime.wins;
  byId(IDS.modalLosses).textContent  = anime.losses;
  byId(IDS.modalEloVal).textContent = anime.elo;

  const total = anime.wins + anime.losses;
  byId(IDS.modalWinrateVal).textContent =
    total > 0 ? Math.round((anime.wins / total) * 100) + '%' : '–';

  const conf = confidenceLabel(anime.battles || 0);
  byId(IDS.modalConfidenceWrap).innerHTML =
    `<span class="confidence ${conf.cls}">${conf.dot} ${conf.label} · ${anime.battles || 0} battles</span>`;

  const modalBtn = byId(IDS.modalAnilistBtn);
  modalBtn.href        = _animeExternalUrl(anime);
  modalBtn.textContent = `View on ${_animeExternalLabel(anime)} ↗`;
  modalBtn.style.display = '';
  const descEl = byId(IDS.modalDescription);
  const cleanDesc = stripHtml(anime.description);
  if (cleanDesc) {
    descEl.textContent = cleanDesc;
    descEl.style.display = 'block';
    descEl.style.opacity = '1';
  } else {
    // No description yet — show a faint placeholder; will fill after metadata refresh
    descEl.textContent = 'No description available.';
    descEl.style.display = 'block';
    descEl.style.opacity = '0.4';
  }

  const unfuzzyBtn = byId(IDS.modalUnfuzzyBtn);
  unfuzzyBtn.style.display = anime.fuzzy ? 'inline-block' : 'none';
  unfuzzyBtn.dataset.animeId = id;

  // Recent battles — prefer ID matching, fall back to title for legacy entries
  const related = battleHistory
    .filter(h => h.winnerId != null
      ? h.winnerId === anime.id || h.loserId === anime.id
      : h.winnerTitle === anime.title || h.loserTitle === anime.title)
    .slice(0, 8);

  const recentEl = byId(IDS.modalRecent);
  if (related.length > 0) {
    recentEl.innerHTML = '<h4>Recent Battles</h4>' + related.map(h => {
      const won = h.winnerId != null ? h.winnerId === anime.id : h.winnerTitle === anime.title;
      const opponent = won ? h.loserTitle : h.winnerTitle;
      return `<div class="modal-recent-item">
        <span class="${won ? 'modal-win' : 'modal-loss'}">${won ? '✓ W' : '✗ L'} vs ${opponent}</span>
        <span style="color:#8b949e">${won ? '+' : '−'}${h.eloSwing} ELO</span>
      </div>`;
    }).join('');
  } else {
    recentEl.innerHTML = '<p style="color:#8b949e;font-size:0.78rem;margin-top:8px">No battles recorded yet.</p>';
  }

  // Sparkline (always reset display first so franchise→anime transitions work)
  const sparkWrap = byId(IDS.modalSparklineWrap);
  if (anime.eloHistory && anime.eloHistory.length >= 2) {
    byId(IDS.modalSparkline).innerHTML = buildSparkline(anime.eloHistory);
    sparkWrap.style.display = 'block';
  } else {
    sparkWrap.style.display = 'none';
  }

  byId(IDS.detailModal).style.display = 'block';
  byId(IDS.detailModal).scrollTop = 0;
  byId(IDS.modalDescription).scrollTop = 0;
}

function closeDetail() {
  byId(IDS.detailModal).style.display = 'none';
}

function closeDetailOnOverlay(event) {
  if (event.target === byId(IDS.detailModal)) closeDetail();
}

function unflagFuzzy() {
  const id = parseInt(byId(IDS.modalUnfuzzyBtn).dataset.animeId);
  const anime = animeList.find(a => a.id === id);
  if (anime) { anime.fuzzy = false; saveState(); }
  byId(IDS.modalUnfuzzyBtn).style.display = 'none';
  closeDetail();
  filterRankings(); // immediately remove card from fuzzy-only view without full re-render
}

// ─── TITLE LANGUAGE ──────────────────────────────────────────────────────────
function displayTitle(anime) {
  if (!anime) return '';
  if (preferRomaji) return anime.titleRo || anime.titleEn || anime.title;
  return anime.titleEn || anime.titleRo || anime.title;
}

function toggleLanguage() {
  preferRomaji = !preferRomaji;
  const btn = byId(IDS.langToggleBtn);
  btn.textContent = preferRomaji ? 'Titles: Romaji' : 'Titles: EN';

  // Old saves have titleRo === titleEn (both set to anime.title by migration).
  // Detect this and trigger a background metadata refresh to get real titles.
  const needsRefresh = animeList.length > 0 &&
    animeList.some(a => a.titleRo === a.titleEn && a.titleRo === a.title);
  if (needsRefresh) {
    refreshAnimeMetadata(); // async; will re-render when done
    return;
  }

  // Live-update battle cards if in battle
  if (currentA !== null && currentB !== null &&
      byId(IDS.battleScreen).style.display !== 'none') {
    renderPair(currentA, currentB);
  }
  // Live-update rankings if open
  if (byId(IDS.resultsScreen).style.display !== 'none') {
    renderRankingList();
  }
}

// ─── SORT & FUZZY FILTER ─────────────────────────────────────────────────────
// Maps sort type → table header element id
const _sortToTh = { elo: 'th-elo', title: 'th-title', winrate: 'th-wr', battles: 'th-bt', score: 'th-sc', tier: 'th-tier', confidence: 'th-conf' };

function _syncSortUI() {
  // Update sort buttons
  document.querySelectorAll('.sort-btn').forEach(b => {
    const active = b.dataset.sort === currentSort;
    b.classList.toggle('active', active);
    const label = b.dataset.label || b.textContent.replace(/ [↑↓]$/, '');
    // For asc-first sorts (title/tier/confidence), flip the arrow so ↓ always
    // means "natural/default direction" and ↑ means reversed — consistent with ELO.
    const ascFirst = _ascFirstSorts.has(currentSort);
    const showUp = ascFirst ? !sortAsc : sortAsc;
    b.textContent = active ? `${label} ${showUp ? '↑' : '↓'}` : label;
  });
  // Update table headers
  document.querySelectorAll('#ranking-table thead th[id]').forEach(th => {
    const isActive = th.id === (_sortToTh[currentSort] || '');
    th.classList.toggle('sorted', isActive);
    // Strip any existing arrow then add current one
    const base = th.textContent.replace(/ [▾▴]$/, '');
    const ascFirst = _ascFirstSorts.has(currentSort);
    const showUp = ascFirst ? !sortAsc : sortAsc;
    th.textContent = isActive ? `${base} ${showUp ? '▴' : '▾'}` : base;
  });
}

// Sort types where ascending is the natural first direction
const _ascFirstSorts = new Set(['title', 'tier', 'confidence']);

function setSort(type) {
  if (currentSort === type) {
    sortAsc = !sortAsc;
  } else {
    currentSort = type;
    // Title → A–Z first; Tier → S first (index 0); Confidence → most confident first (index 0)
    // Everything else (ELO, win rate, battles, score) → highest first (descending)
    sortAsc = _ascFirstSorts.has(type);
  }
  _syncSortUI();
  saveState();
  renderRankingList();
  filterRankings();
}

function toggleFuzzyFilter() {
  showFuzzyOnly = !showFuzzyOnly;
  const btn = byId(IDS.fuzzyFilterBtn);
  btn.classList.toggle('active', showFuzzyOnly);
  if (franchiseMode) renderRankingList();
  else filterRankings();
}

function toggleFormat(fmt) {
  if (hiddenFormats.has(fmt)) {
    hiddenFormats.delete(fmt);
  } else {
    hiddenFormats.add(fmt);
  }
  // Sync button appearance (guard against ep-range buttons which share the class)
  document.querySelectorAll('.format-btn').forEach(b => {
    if (!b.dataset.format) return;
    const isHidden = hiddenFormats.has(b.dataset.format);
    b.classList.toggle('active',      !isHidden);
    b.classList.toggle('hidden-fmt',   isHidden);
  });
  saveState();
  renderRankingList();
  filterRankings();
}

function toggleMobileFilters() {
  const panel = document.getElementById('collapsible-filters');
  const btn   = document.getElementById('mobile-filter-toggle');
  if (!panel || !btn) return;
  const open = panel.classList.toggle('open');
  btn.classList.toggle('active', open);
  btn.textContent = open ? '⊟ Filters' : '⊞ Filters';
}

function syncFormatButtons() {
  // Sync rankings tab buttons
  document.querySelectorAll('.format-btn').forEach(b => {
    if (!b.dataset.format) return;
    const isHidden = hiddenFormats.has(b.dataset.format);
    b.classList.toggle('active',     !isHidden);
    b.classList.toggle('hidden-fmt',  isHidden);
  });
  // Sync battle screen filter popover buttons
  document.querySelectorAll('.filter-fmt-btn').forEach(b => {
    if (!b.dataset.format) return;
    const isHidden = hiddenFormats.has(b.dataset.format);
    b.classList.toggle('active',    !isHidden);
    b.classList.toggle('hidden-fmt', isHidden);
  });
  // Highlight the filter button if any format is hidden
  const filterBtn = document.getElementById('filter-btn');
  if (filterBtn) filterBtn.classList.toggle('has-filter', hiddenFormats.size > 0);
}

// ─── EPISODE RANGE FILTER ────────────────────────────────────────────────────
function epRange(episodes, format) {
  if (format === 'MOVIE') return 'short'; // movies count as ≤12 ep
  if (!episodes)          return 'unknown';
  if (episodes <= 12)     return 'short';
  if (episodes <= 24)     return 'medium';
  if (episodes <= 70)     return 'long';
  return 'vlong';
}

function toggleEpRange(range) {
  if (hiddenEpRanges.has(range)) {
    hiddenEpRanges.delete(range);
  } else {
    hiddenEpRanges.add(range);
  }
  syncEpRangeButtons();
  saveState();
  filterRankings();
}

function syncEpRangeButtons() {
  document.querySelectorAll('[data-ep]').forEach(b => {
    const isHidden = hiddenEpRanges.has(b.dataset.ep);
    b.classList.toggle('active',     !isHidden);
    b.classList.toggle('hidden-fmt',  isHidden);
  });
}

// ─── DISAGREEMENTS ───────────────────────────────────────────────────────────
function toggleDisagreements() { switchResultsTab('stats'); }

function renderDisagreements() {
  // Need globalScore to compare against community rating
  const withGlobal = animeList.filter(a => a.globalScore > 0);
  if (withGlobal.length < 3) {
    const msg = `<p style="color:#8b949e;font-size:0.82rem">
      Community scores haven't loaded yet.
      <a href="#" style="color:#58a6ff" onclick="event.preventDefault();refreshAnimeMetadata().then(renderStatsTab)">Click here to fetch them now →</a>
    </p>`;
    byId(IDS.disagreeEloHigher).innerHTML = msg;
    byId(IDS.disagreeScoreHigher).innerHTML = '';
    return;
  }

  // Build rank maps within the shared pool (only anime that have a global score)
  const byElo    = [...withGlobal].sort((a, b) => b.elo - a.elo);
  const byGlobal = [...withGlobal].sort((a, b) => b.globalScore - a.globalScore);
  const eloRankMap    = new Map(byElo.map((a, i)    => [a.id, i + 1]));
  const globalRankMap = new Map(byGlobal.map((a, i) => [a.id, i + 1]));

  // delta = globalRank - eloRank
  // Positive  → your ELO rank is better (lower number) than the community rating implies: you like it more
  // Negative  → community rates it higher than your ELO does: you like it less than the crowd
  const divergences = withGlobal.map(a => ({
    anime: a,
    eloRank:    eloRankMap.get(a.id),
    globalRank: globalRankMap.get(a.id),
    delta: globalRankMap.get(a.id) - eloRankMap.get(a.id),
  })).sort((a, b) => b.delta - a.delta);

  const youHigher  = divergences.filter(d => d.delta > 0).slice(0, 8);
  const commHigher = divergences.filter(d => d.delta < 0)
                                .sort((a, b) => a.delta - b.delta).slice(0, 8);

  function makeItem(d) {
    const el = document.createElement('div');
    el.className = 'disagree-item';
    el.addEventListener('click', () => showAnimeDetail(d.anime.id));
    const sign = d.delta > 0 ? '+' : '';
    const cls  = d.delta > 0 ? 'delta-up' : 'delta-down';
    const globalPct = (d.anime.globalScore / 10).toFixed(1); // 85 → 8.5
    el.innerHTML = `
      <img src="${d.anime.cover}" alt="${displayTitle(d.anime)}" />
      <div class="disagree-item-info">
        <div class="disagree-item-title">${displayTitle(d.anime)}</div>
        <div class="disagree-item-meta">Your ELO #${d.eloRank} · Community ${globalPct}/10 (#${d.globalRank})</div>
      </div>
      <div class="disagree-delta ${cls}">${sign}${d.delta}</div>
    `;
    return el;
  }

  const eloEl   = byId(IDS.disagreeEloHigher);
  const scoreEl = byId(IDS.disagreeScoreHigher);
  eloEl.innerHTML = '';
  scoreEl.innerHTML = '';

  if (youHigher.length)  youHigher.forEach(d  => eloEl.appendChild(makeItem(d)));
  else eloEl.innerHTML = '<p style="color:#8b949e;font-size:0.82rem">No significant divergence found.</p>';

  if (commHigher.length) commHigher.forEach(d => scoreEl.appendChild(makeItem(d)));
  else scoreEl.innerHTML = '<p style="color:#8b949e;font-size:0.82rem">No significant divergence found.</p>';
}

// ─── RATING PREDICTOR ────────────────────────────────────────────────────────
let _predictorDebounce = null;
let _predictorFocusIdx = -1;

function predictorOnInput(val) {
  _predictorFocusIdx = -1;
  clearTimeout(_predictorDebounce);
  const dd = byId(IDS.predictorDropdown);
  if (val.trim().length < 2) { dd.style.display = 'none'; return; }
  dd.style.display = 'none';
  _predictorDebounce = setTimeout(() => _predictorSearch(val.trim()), 320);
}

async function _predictorSearch(q) {
  const dd = byId(IDS.predictorDropdown);
  dd.innerHTML = '<div style="padding:10px 12px;color:#8b949e;font-size:0.8rem">⏳ Searching…</div>';
  dd.style.display = 'block';
  const query = `
    query($search: String) {
      Page(perPage: 6) {
        media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
          id title { romaji english } coverImage { medium }
          format seasonYear averageScore genres
        }
      }
    }`;
  try {
    const res  = await fetch('https://graphql.anilist.co', {
      method: 'POST', headers: anilistHeaders(),
      body: JSON.stringify({ query, variables: { search: q } })
    });
    const json = await res.json();
    const items = json?.data?.Page?.media ?? [];
    if (!items.length) { dd.innerHTML = '<div style="padding:10px 12px;color:#8b949e;font-size:0.8rem">No results</div>'; return; }
    dd.innerHTML = items.map((m, i) => {
      const title = m.title.english || m.title.romaji;
      const year  = m.seasonYear || '';
      const fmt   = m.format || '';
      const cover = m.coverImage?.medium || '';
      return `<div class="predictor-dropdown-item" data-idx="${i}"
                   onmousedown="predictorPick(${m.id})"
                   onmouseover="predictorHover(${i})">
        <img src="${cover}" alt="" aria-hidden="true" />
        <div class="predictor-dropdown-item-info">
          <div class="predictor-dropdown-item-title">${title}</div>
          <div class="predictor-dropdown-item-meta">${[fmt, year].filter(Boolean).join(' · ')}</div>
        </div>
      </div>`;
    }).join('');
    // Store items on the dropdown for keyboard nav
    dd._items = items;
  } catch { dd.style.display = 'none'; }
}

function predictorHover(idx) {
  _predictorFocusIdx = idx;
  document.querySelectorAll('.predictor-dropdown-item').forEach((el, i) =>
    el.classList.toggle('focused', i === idx));
}

function predictorOnKeydown(e) {
  const dd = byId(IDS.predictorDropdown);
  if (dd.style.display === 'none' || !dd._items) {
    if (e.key === 'Enter') runPredictor();
    return;
  }
  const count = dd._items.length;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    _predictorFocusIdx = (_predictorFocusIdx + 1) % count;
    predictorHover(_predictorFocusIdx);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    _predictorFocusIdx = (_predictorFocusIdx - 1 + count) % count;
    predictorHover(_predictorFocusIdx);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (_predictorFocusIdx >= 0) predictorPick(dd._items[_predictorFocusIdx].id);
    else runPredictor();
  } else if (e.key === 'Escape') {
    dd.style.display = 'none';
  }
}

function predictorPick(mediaId) {
  const dd = byId(IDS.predictorDropdown);
  const item = dd._items?.find(m => m.id === mediaId);
  if (!item) return;
  dd.style.display = 'none';
  const title = item.title.english || item.title.romaji;
  byId(IDS.predictorInput).value = title;
  runPredictor(item); // pass the full media object — skip the extra lookup
}

async function runPredictor(prefetched = null) {
  const q = byId(IDS.predictorInput).value.trim();
  if (!q) return;
  byId(IDS.predictorDropdown).style.display = 'none';
  const resultsEl = byId(IDS.predictorResults);
  resultsEl.innerHTML = '<p style="color:#8b949e;font-size:0.85rem">⏳ Predicting…</p>';

  let media = prefetched;
  if (!media) {
    const searchQuery = `
      query($search: String) {
        Media(search: $search, type: ANIME) {
          id title { romaji english }
          coverImage { large medium }
          genres averageScore seasonYear format
        }
      }`;
    try {
      const res  = await fetch('https://graphql.anilist.co', {
        method: 'POST', headers: anilistHeaders(),
        body: JSON.stringify({ query: searchQuery, variables: { search: q } })
      });
      const json = await res.json();
      media = json?.data?.Media;
    } catch (e) {
      renderErrorInto(resultsEl, e.message, 'font-size:0.85rem;text-align:left'); return;
    }
  }
  // Ensure large cover is available
  if (media && !media.coverImage?.large && media.coverImage?.medium)
    media.coverImage.large = media.coverImage.medium;

  if (!media) { resultsEl.innerHTML = '<p style="color:#f85149;font-size:0.85rem">No anime found — try a different title.</p>'; return; }

  // Already ranked?
  const existing = animeList.find(a => a.id === media.id);
  if (existing) {
    const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
    const rank   = sorted.findIndex(a => a.id === existing.id) + 1;
    const tier   = getTier(rank - 1, sorted.length);
    resultsEl.innerHTML = `<p class="predictor-already">You've already ranked <strong>${esc(media.title.english || media.title.romaji)}</strong> — it's at <strong>#${rank} (${esc(tier)} tier, ELO ${existing.elo | 0})</strong>.</p>`;
    return;
  }

  const prediction = _predictElo(media);
  if (!prediction) {
    resultsEl.innerHTML = '<p style="color:#8b949e;font-size:0.85rem">Not enough taste data yet — keep ranking to improve predictions!</p>';
    return;
  }
  _renderPrediction(media, prediction, resultsEl);
}

function _predictElo(media) {
  const targetGenres = media.genres  || [];
  const targetYear   = media.seasonYear;
  const targetScore  = media.averageScore;  // 0–100
  const targetFormat = media.format;
  const active       = animeList.filter(a => !excludedIds.has(a.id));
  if (active.length < 5) return null;

  // ── User baseline ──────────────────────────────────────────────────────────
  const eloSorted  = [...active].sort((a, b) => a.elo - b.elo);
  const userMedian = eloSorted[Math.floor(eloSorted.length / 2)].elo;

  // ── Signal 1: KNN — weighted average of most-similar ranked anime ──────────
  // Each of the user's anime gets a similarity score combining genre overlap,
  // format match, era proximity, and community score proximity.
  // This avoids regression-to-mean by pulling the prediction toward whichever
  // tier the user's most-comparable anime actually live in.
  const simScored = active.map(a => {
    let sim = 0;

    // Genre overlap (Jaccard coefficient, highest weight)
    if (targetGenres.length && Array.isArray(a.genres) && a.genres.length) {
      const shared = targetGenres.filter(g => a.genres.includes(g)).length;
      const union  = new Set([...targetGenres, ...a.genres]).size;
      sim += (shared / union) * 3.0;
    }
    // Format match
    if (targetFormat && a.format)
      sim += (a.format === targetFormat) ? 0.8 : 0;
    // Era proximity (fades over 15-year span)
    if (targetYear && a.seasonYear)
      sim += Math.max(0, 1 - Math.abs(targetYear - a.seasonYear) / 15) * 0.5;
    // Community score proximity (fades over 25-point span)
    if (targetScore && a.globalScore)
      sim += Math.max(0, 1 - Math.abs(targetScore - a.globalScore) / 25) * 0.7;

    return { anime: a, sim };
  }).filter(x => x.sim > 0.3).sort((a, b) => b.sim - a.sim);

  const components = [];
  let knnK = 0;

  if (simScored.length >= 2) {
    knnK = Math.min(12, simScored.length);
    const topK     = simScored.slice(0, knnK);
    const totalSim = topK.reduce((s, x) => s + x.sim, 0);
    const knnElo   = topK.reduce((s, x) => s + x.anime.elo * x.sim, 0) / totalSim;
    components.push({
      label:  'Most similar in your rankings',
      value:  knnElo,
      weight: 0.50,
      detail: topK.slice(0, 3).map(x => ({ name: x.anime.title, elo: x.anime.elo })),
      isKnn:  true,
    });
  }

  // ── Signal 2: Genre deviation from user median ─────────────────────────────
  // Instead of raw genre averages (which cluster near the centre), we compute
  // how far the user's taste in each genre deviates from their own median.
  // A genre the user consistently ranks above their median gets a positive
  // offset; a disliked genre gets a negative offset.
  const genreHits = [];
  for (const g of targetGenres) {
    const matches = active.filter(a => Array.isArray(a.genres) && a.genres.includes(g));
    if (matches.length >= 2) {
      const avg = matches.reduce((s, a) => s + a.elo, 0) / matches.length;
      genreHits.push({ genre: g, avg, count: matches.length, deviation: avg - userMedian });
    }
  }
  if (genreHits.length) {
    const totalCount  = genreHits.reduce((s, g) => s + g.count, 0);
    const weightedDev = genreHits.reduce((s, g) => s + g.deviation * g.count, 0) / totalCount;
    components.push({
      label:  'Genre affinity',
      value:  userMedian + weightedDev,
      weight: 0.25,
      detail: genreHits,
    });
  }

  // ── Signal 3: Community score → percentile mapping ─────────────────────────
  // Rather than linear regression (which gravitates toward the mean), we find
  // where the community score falls as a percentile within the user's own
  // ranked list and map it to the corresponding ELO percentile.
  if (targetScore) {
    const withScores = active.filter(a => a.globalScore > 0).sort((a, b) => a.globalScore - b.globalScore);
    if (withScores.length >= 5) {
      const belowCount = withScores.filter(a => a.globalScore <= targetScore).length;
      const pct        = belowCount / withScores.length;
      const eloRanked  = [...active].sort((a, b) => a.elo - b.elo);
      const eloIdx     = Math.min(Math.floor(pct * eloRanked.length), eloRanked.length - 1);
      components.push({
        label:  `Community score (${(targetScore / 10).toFixed(1)}/10)`,
        value:  eloRanked[eloIdx].elo,
        weight: 0.15,
      });
    }
  }

  // ── Signal 4: Format affinity ──────────────────────────────────────────────
  if (targetFormat) {
    const fmtMatches = active.filter(a => a.format === targetFormat);
    if (fmtMatches.length >= 3) {
      const fmtAvg = fmtMatches.reduce((s, a) => s + a.elo, 0) / fmtMatches.length;
      components.push({
        label:  `${targetFormat.replace('_', ' ')} format`,
        value:  fmtAvg,
        weight: 0.10,
      });
    }
  }

  if (!components.length) return null;

  // ── Combine with normalised weights ────────────────────────────────────────
  const totalW       = components.reduce((s, c) => s + c.weight, 0);
  const rawElo       = components.reduce((s, c) => s + c.value * (c.weight / totalW), 0);
  const predictedElo = Math.max(ELO_FLOOR, Math.min(2200, Math.round(rawElo)));

  const sorted   = [...animeList].sort((a, b) => b.elo - a.elo);
  const insertAt = sorted.findIndex(a => a.elo < predictedElo);
  const rankPos  = insertAt === -1 ? sorted.length : insertAt;
  const tier     = getTier(rankPos, sorted.length + 1);

  // ── Confidence ──────────────────────────────────────────────────────────────
  const genreMatchCount = genreHits.reduce((s, g) => s + g.count, 0);
  const signalCount     = components.length;

  let confidenceLevel, confidenceText, confidenceNote;
  if (knnK >= 5 && signalCount >= 3) {
    confidenceLevel = 'high';
    confidenceText  = '● High confidence';
    confidenceNote  = `${knnK} similar anime found · ${signalCount} signals active`;
  } else if (knnK >= 2 || (signalCount >= 2 && active.length >= 30)) {
    confidenceLevel = 'medium';
    confidenceText  = '● Medium confidence';
    confidenceNote  = knnK > 0
      ? `${knnK} similar anime found — rank more to improve accuracy`
      : 'No close matches found — using genre and community signals only';
  } else {
    confidenceLevel = 'low';
    confidenceText  = '● Low confidence';
    confidenceNote  = 'Too few comparable anime in your rankings yet';
  }

  const confidence = { level: confidenceLevel, text: confidenceText, note: confidenceNote, genreMatchCount };
  return { predictedElo, tier, rankPos: rankPos + 1, totalAnime: sorted.length + 1, components, confidence };
}

function _renderPrediction(media, pred, container) {
  const title = media.title.english || media.title.romaji;
  const cover = media.coverImage?.large || media.coverImage?.medium;
  const tierClass = 't-' + pred.tier.toLowerCase();

  const reasons = pred.components.map(c => {
    if (c.isKnn && c.detail?.length) {
      const examples = c.detail.map(x => `${x.name} <span style="color:#6e7681">(${x.elo})</span>`).join(', ');
      return `<div>• <span>${c.label}</span>: ${examples}</div>`;
    }
    const detail = c.detail
      ? ' (' + c.detail.slice(0, 3).map(g => g.genre).join(', ') + ')'
      : '';
    return `<div>• <span>${c.label}${detail}</span>: avg ELO ${Math.round(c.value)}</div>`;
  }).join('');

  const conf = pred.confidence;
  const confColour = conf.level === 'high' ? '#3fb950' : conf.level === 'medium' ? '#d29922' : '#f85149';

  container.innerHTML = `
    <div class="predictor-result">
      <img class="predictor-cover" src="${cover}" alt="${title}" />
      <div class="predictor-body">
        <div class="predictor-title">${title}</div>
        <div class="predictor-tier-badge ${tierClass}">${pred.tier} tier</div>
        <div style="margin:6px 0 8px">
          <span style="font-size:0.78rem;color:${confColour};font-weight:600">${conf.text}</span>
          <span style="font-size:0.74rem;color:#6e7681;margin-left:6px">${conf.note}</span>
        </div>
        <div class="predictor-reasons">
          Predicted <strong>#${pred.rankPos}</strong> of ${pred.totalAnime} · ELO ~${pred.predictedElo}<br>
          ${reasons}
        </div>
      </div>
    </div>`;
}

// ─── BATTLE MODE (§5.2.3) ────────────────────────────────────────────────────
// Single source of truth for the three mutually-exclusive battle modes:
//   'normal' — default matchmaking
//   'settle' — target low-confidence matchups (see pickSettlePair)
//   'blind'  — hide ELO ratings so the user picks on instinct
// `settleMode` and `blindMode` are kept as derived globals for any legacy
// call-site that reads them directly; all writes funnel through setMode.
function setMode(name) {
  if (name !== 'normal' && name !== 'settle' && name !== 'blind') name = 'normal';

  const prevSettle = settleMode;
  settleMode = (name === 'settle');
  blindMode  = (name === 'blind');

  // Mode button visual state + label
  const btn = byId(IDS.modeBtn);
  if (btn) {
    btn.classList.toggle('active-settle', settleMode);
    btn.classList.toggle('active-blind',  blindMode);
    btn.textContent =
      settleMode ? '🎯 Mode: Settle' :
      blindMode  ? '🙈 Mode: Blind'  :
                   '⚙ Mode';
  }

  // Banners (already mutually exclusive because the modes are)
  byId(IDS.settleBanner)?.classList.toggle('active', settleMode);
  byId(IDS.blindBanner)?.classList.toggle('active', blindMode);

  // Blind CSS class on the battle screen
  const screen = byId(IDS.battleScreen);
  if (screen) screen.classList.toggle('blind', blindMode);

  // Popover radio state
  document.querySelectorAll('#mode-popover [role="menuitemradio"]').forEach(el => {
    el.setAttribute('aria-checked', el.dataset.mode === name ? 'true' : 'false');
  });

  _closeModeMenu();

  // Re-pick immediately on fresh entry to settle so the user sees an
  // uncertain matchup without waiting for the next battle.
  if (settleMode && !prevSettle) renderBattle();
}

// Toggles the popover. Uses a one-shot outside-click listener (registered on
// the next tick so the opening click doesn't immediately dismiss it) and an
// Escape-key handler. Both listeners unwire cleanly on close.
function toggleModeMenu(event) {
  if (event) event.stopPropagation();
  const pop = byId(IDS.modePopover);
  const btn = byId(IDS.modeBtn);
  if (!pop || !btn) return;
  const willOpen = !pop.classList.contains('open');
  pop.classList.toggle('open', willOpen);
  btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  if (willOpen) {
    setTimeout(() => document.addEventListener('click', _closeModeMenu, { once: true }), 0);
    document.addEventListener('keydown', _modeMenuEscHandler);
  }
}
function _closeModeMenu() {
  const pop = byId(IDS.modePopover);
  const btn = byId(IDS.modeBtn);
  if (pop) pop.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('keydown', _modeMenuEscHandler);
}
function _modeMenuEscHandler(e) {
  if (e.key === 'Escape') _closeModeMenu();
}

function toggleFilterMenu(event) {
  if (event) event.stopPropagation();
  const pop = document.getElementById('filter-popover');
  const btn = document.getElementById('filter-btn');
  if (!pop || !btn) return;
  const willOpen = !pop.classList.contains('open');
  pop.classList.toggle('open', willOpen);
  btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  if (willOpen) {
    syncFormatButtons();
    setTimeout(() => document.addEventListener('click', _closeFilterMenu, { once: true }), 0);
    document.addEventListener('keydown', _filterMenuEscHandler);
  }
}
function _closeFilterMenu() {
  const pop = document.getElementById('filter-popover');
  const btn = document.getElementById('filter-btn');
  if (pop) pop.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('keydown', _filterMenuEscHandler);
}
function _filterMenuEscHandler(e) {
  if (e.key === 'Escape') _closeFilterMenu();
}

// Backward-compat shims for banner "Stop" buttons and the settle-fallback path.
function toggleSettleMode() { setMode(settleMode ? 'normal' : 'settle'); }
function toggleBlindMode()  { setMode(blindMode  ? 'normal' : 'blind');  }

function _applyBlindState() {
  const screen = byId(IDS.battleScreen);
  if (screen) screen.classList.toggle('blind', blindMode);
}

// ─── CARD LONG-PRESS (§5.3) ──────────────────────────────────────────────────
// On touch devices (@media pointer: coarse), the per-card secondary actions
// (fuzzy / synopsis / AniList / exclude) are hidden by default to keep the
// battle card uncluttered. Users reveal them by either:
//   (a) long-pressing the card body (500 ms), or
//   (b) tapping the visible "⋯ Hold for more" chip directly.
// A first-use tooltip (one-shot, guarded by KESSEN_KEYS.ui.longPressTipSeen)
// explains the gesture the first time the battle screen is shown on touch.
const _LONG_PRESS_MS = 350;
const _LONG_PRESS_MOVE_TOLERANCE = 10; // px — cancels if user starts scrolling
const _longPressState = { timer: null, fired: false, startX: 0, startY: 0, side: -1 };

function _cancelLongPressTimer() {
  if (_longPressState.timer) {
    clearTimeout(_longPressState.timer);
    _longPressState.timer = null;
  }
}

function _attachCardLongPress(cardEl, side) {
  if (!cardEl || cardEl.dataset.longPressWired === '1') return;
  cardEl.dataset.longPressWired = '1';

  cardEl.addEventListener('pointerdown', (e) => {
    // Primary button / touch only
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    _cancelLongPressTimer();
    _longPressState.fired  = false;
    _longPressState.startX = e.clientX;
    _longPressState.startY = e.clientY;
    _longPressState.side   = side;
    _longPressState.timer  = setTimeout(() => {
      _longPressState.fired = true;
      _longPressState.timer = null;
      _setCardActionsExpanded(side, true);
      _markLongPressTipSeen();
    }, _LONG_PRESS_MS);
  });

  cardEl.addEventListener('pointermove', (e) => {
    if (!_longPressState.timer) return;
    const dx = Math.abs(e.clientX - _longPressState.startX);
    const dy = Math.abs(e.clientY - _longPressState.startY);
    if (dx > _LONG_PRESS_MOVE_TOLERANCE || dy > _LONG_PRESS_MOVE_TOLERANCE) {
      _cancelLongPressTimer();
    }
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(type =>
    cardEl.addEventListener(type, _cancelLongPressTimer)
  );

  // Suppress the click that would otherwise fire pickWinner when a long-press
  // completed. Capture phase so we beat the card's own onclick handler.
  cardEl.addEventListener('click', (e) => {
    if (_longPressState.fired) {
      e.preventDefault();
      e.stopPropagation();
      _longPressState.fired = false;
    }
  }, true);
}

// Toggle handler for the "⋯ Hold for more" chip. Keeps the gesture-free
// fallback working (tap the chip) and explicitly stops propagation so the
// underlying card onclick doesn't also fire pickWinner.
function toggleCardActions(event, side) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  const card = byId(side === 0 ? IDS.cardA : IDS.cardB);
  if (!card) return;
  _setCardActionsExpanded(side, !card.classList.contains('actions-expanded'));
  _markLongPressTipSeen();
}

function _setCardActionsExpanded(side, expanded) {
  const card = byId(side === 0 ? IDS.cardA : IDS.cardB);
  const chip = card?.querySelector('.card-more-chip');
  if (!card) return;
  card.classList.toggle('actions-expanded', expanded);
  if (chip) chip.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

// Reset expansion state on every fresh pair so actions collapse between
// battles. Called from renderPair.
function _resetCardActionsExpansion() {
  [0, 1].forEach(side => _setCardActionsExpanded(side, false));
}

function _markLongPressTipSeen() {
  try { localStorage.setItem(KESSEN_KEYS.ui.longPressTipSeen, '1'); } catch {}
  const tip = byId(IDS.longPressTip);
  if (tip) tip.style.display = 'none';
}

function maybeShowLongPressTip() {
  // Only on touch, only on first touch-battle, only once per browser
  if (!matchMedia('(pointer: coarse)').matches) return;
  let seen = false;
  try { seen = localStorage.getItem(KESSEN_KEYS.ui.longPressTipSeen) === '1'; }
  catch { seen = true; }
  if (seen) return;
  const tip = byId(IDS.longPressTip);
  if (tip) tip.style.display = 'block';
}

// Wire long-press on both battle cards once the DOM is ready. Idempotent via
// dataset flag in _attachCardLongPress.
(function _wireCardLongPress() {
  const wire = () => {
    _attachCardLongPress(byId(IDS.cardA), 0);
    _attachCardLongPress(byId(IDS.cardB), 1);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire, { once: true });
  } else { wire(); }
})();

// In settle mode, pickOpponents uses a tighter window and prefers uncertain anime.
// Called from the modified pickOpponents below.
function pickSettlePair() {
  // Candidates: not excluded, not hidden format, fewer than 15 comparisons
  const uncertain = animeList
    .map((a, i) => ({ i, a }))
    .filter(({ a }) =>
      !excludedIds.has(a.id) &&
      !hiddenFormats.has(a.format) &&
      (a.battles || 0) < TARGET_BATTLES_PER_ANIME
    );

  if (uncertain.length < 2) {
    // Fallback to normal if everyone is confident — route through setMode so
    // the button, banner, and popover radio all reset in lockstep.
    setMode('normal');
    return null; // signal to use normal pick
  }

  // Pick A randomly from uncertain pool, weighted by fewest comparisons
  const weights = uncertain.map(({ a }) => 1 / (a.comparisons + 1));
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total, idxA;
  for (let k = 0; k < uncertain.length; k++) {
    r -= weights[k];
    if (r <= 0) { idxA = uncertain[k].i; break; }
  }
  if (idxA === undefined) idxA = uncertain[0].i;

  // Pick B: nearest ELO among uncertain pool (excluding A)
  const eloA = animeList[idxA].elo;
  const candidates = uncertain
    .filter(({ i }) => i !== idxA)
    .sort((x, y) => Math.abs(x.a.elo - eloA) - Math.abs(y.a.elo - eloA));
  const idxB = candidates[0]?.i ?? (idxA === 0 ? 1 : 0);
  return [idxA, idxB];
}

// ─── TOWER OF POWER ──────────────────────────────────────────────────────────
function openTowerModal() {
  populateTowerList('');
  byId(IDS.towerSearch).value = '';
  byId(IDS.towerModal).classList.add('open');

  // First-use tip (§5.2.2) — shown inline above the list, dismissed with the
  // "Got it" button. One-shot via KESSEN_KEYS.ui.towerFirstTipSeen.
  const tip = byId(IDS.towerFirstTip);
  if (tip) {
    const seen = (() => {
      try { return localStorage.getItem(KESSEN_KEYS.ui.towerFirstTipSeen) === '1'; }
      catch { return true; } // storage disabled → behave as if already seen
    })();
    tip.style.display = seen ? 'none' : 'block';
  }
}

function dismissTowerTip() {
  try { localStorage.setItem(KESSEN_KEYS.ui.towerFirstTipSeen, '1'); } catch {}
  const tip = byId(IDS.towerFirstTip);
  if (tip) tip.style.display = 'none';
}

function closeTowerModal() {
  byId(IDS.towerModal).classList.remove('open');
}

function filterTowerList() {
  const q = byId(IDS.towerSearch).value.toLowerCase();
  populateTowerList(q);
}

function populateTowerList(q) {
  const sorted = [...animeList]
    .map((a, i) => ({ i, a }))
    .filter(({ a }) =>
      !excludedIds.has(a.id) &&
      !hiddenFormats.has(a.format) &&
      (!q || displayTitle(a).toLowerCase().includes(q))
    )
    .sort((x, y) => y.a.elo - x.a.elo);

  const container = byId(IDS.towerAnimeList);
  container.innerHTML = '';
  sorted.slice(0, 60).forEach(({ i, a }) => {
    const el = document.createElement('div');
    el.className = 'tower-anime-item';
    el.innerHTML = `
      <img src="${a.cover}" alt="${displayTitle(a)}" />
      <span>${displayTitle(a)}</span>
      <span class="tower-anime-elo">ELO ${a.elo}</span>
    `;
    el.addEventListener('click', () => startTower(i));
    container.appendChild(el);
  });
}

function startTower(championIdx) {
  closeTowerModal();
  towerChampIdx  = championIdx;
  towerRound     = 0;
  towerResults   = [];
  towerMode      = true;

  // Pre-select 10 opponents: spread across ELO range for variety
  const pool = animeList
    .map((a, i) => ({ i, a }))
    .filter(({ i, a }) =>
      i !== championIdx &&
      !excludedIds.has(a.id) &&
      !hiddenFormats.has(a.format)
    )
    .sort((x, y) => y.a.elo - x.a.elo);

  // Pick opponents at 10 evenly-spaced percentile positions
  towerOpponents = [];
  for (let k = 0; k < TOWER_ROUNDS; k++) {
    const targetPct = (k + 0.5) / TOWER_ROUNDS;
    const targetIdx = Math.floor(targetPct * pool.length);
    // Add slight jitter so it's not perfectly predictable
    const jitter = Math.floor(Math.random() * Math.max(1, Math.floor(pool.length * 0.08)));
    const pick = pool[Math.min(targetIdx + jitter, pool.length - 1)];
    towerOpponents.push(pick.i);
  }
  // Shuffle opponents so the order isn't predictable
  for (let k = towerOpponents.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [towerOpponents[k], towerOpponents[j]] = [towerOpponents[j], towerOpponents[k]];
  }

  // Update UI for tower mode
  show('battle-screen');
  hide('results-screen');
  hide('tower-summary-screen');
  byId(IDS.towerProgressWrap).style.display = 'block';
  byId(IDS.towerStatus).style.display = 'block';
  byId(IDS.undoBtn).disabled  = true;
  byId(IDS.skipBtn).disabled  = true;
  byId(IDS.battlePromptH2).textContent = '⚡ Tower of Power';
  byId(IDS.battlePromptP).textContent  = `Round ${towerRound + 1} of ${TOWER_ROUNDS}`;

  renderTowerRound();
}

function renderTowerRound() {
  const pct = (towerRound / TOWER_ROUNDS) * 100;
  byId(IDS.towerProgressBar).style.width = pct + '%';
  byId(IDS.towerStatus).textContent =
    `⚡ ${displayTitle(animeList[towerChampIdx])} — Round ${towerRound + 1} / ${TOWER_ROUNDS}`;
  byId(IDS.battlePromptP).textContent =
    `Round ${towerRound + 1} of ${TOWER_ROUNDS}`;

  // Champion always on left (index A)
  renderPair(towerChampIdx, towerOpponents[towerRound]);
}

function pickWinnerTower(side) {
  const championWon = side === 0; // champion is always left (side 0)
  const oppIdx = towerOpponents[towerRound];

  // Apply ELO
  const winner = championWon ? animeList[towerChampIdx] : animeList[oppIdx];
  const loser  = championWon ? animeList[oppIdx] : animeList[towerChampIdx];
  updateElo(winner, loser);
  winner.battles = (winner.battles || 0) + 1;
  loser.battles  = (loser.battles  || 0) + 1;

  towerResults.push({ opponentIdx: oppIdx, championWon });
  towerRound++;

  if (towerRound >= TOWER_ROUNDS) {
    finishTower();
  } else {
    renderTowerRound();
  }
  saveState();
}

function finishTower() {
  towerMode = false;
  byId(IDS.towerProgressWrap).style.display = 'none';
  byId(IDS.towerStatus).style.display = 'none';
  byId(IDS.battlePromptH2).textContent = 'Which did you enjoy more?';
  byId(IDS.battlePromptP).textContent  = 'Click your favourite — or skip if you can\'t decide.';
  byId(IDS.undoBtn).disabled = true;
  byId(IDS.skipBtn).disabled = false;

  const wins   = towerResults.filter(r => r.championWon).length;
  const champ  = animeList[towerChampIdx];

  byId(IDS.towerSummaryTitle).textContent =
    `${wins === TOWER_ROUNDS ? '👑' : wins >= 7 ? '⚡' : wins >= 5 ? '🎖' : '💔'} ${displayTitle(champ)}: ${wins}/${TOWER_ROUNDS}`;
  byId(IDS.towerSummarySub).textContent =
    wins === TOWER_ROUNDS ? 'Undefeated! A true champion.' :
    wins >= 7 ? 'Dominant performance.' :
    wins >= 5 ? 'Holds their own.' :
    wins >= 3 ? 'Struggled against the competition.' : 'A tough day at the tower.';

  const list = byId(IDS.towerResultsList);
  list.innerHTML = '';
  towerResults.forEach(r => {
    const opp = animeList[r.opponentIdx];
    const row = document.createElement('div');
    row.className = `tower-result-row ${r.championWon ? 'won' : 'lost'}`;
    row.innerHTML = `
      <img src="${opp.cover}" alt="${displayTitle(opp)}" />
      <div class="tower-result-info">
        <div class="name">${displayTitle(opp)}</div>
        <div class="meta">ELO ${opp.elo} · ${opp.battles || 0} battles</div>
      </div>
      <div class="tower-result-outcome">${r.championWon ? '✅ Win' : '❌ Loss'}</div>
    `;
    list.appendChild(row);
  });

  hide('battle-screen');
  show('tower-summary-screen');
}

function endTower() {
  hide('tower-summary-screen');
  show('battle-screen');
  renderBattle();
}

// ─── LIST VIEW ────────────────────────────────────────────────────────────────
function _saveViewPrefs() {
  try {
    localStorage.setItem(KESSEN_KEYS.settings.viewPrefs,
      JSON.stringify({ rankingView, franchiseMode }));
  } catch { /* storage full — not critical */ }
}
function _loadViewPrefs() {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.settings.viewPrefs);
    if (!raw) return;
    const p = JSON.parse(raw);
    if (p.rankingView) rankingView = p.rankingView;
    if (p.franchiseMode != null) franchiseMode = p.franchiseMode;
  } catch { /* corrupt — ignore */ }
}

function setRankingView(view) {
  rankingView = view;
  byId(IDS.viewGridBtn).classList.toggle('active', view === 'grid');
  byId(IDS.viewListBtn).classList.toggle('active', view === 'list');
  _applyRankingViewState();
  _saveViewPrefs();
  if (franchiseMode) {
    renderRankingList();
  } else if (view === 'list') {
    renderRankingTable();
  }
}

function renderRankingTable() {
  const sorted    = getSortedList();
  const eloSorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const eloRankMap = new Map(eloSorted.map((a, i) => [a.id, i]));
  const q = (byId(IDS.searchInput).value || '').toLowerCase().trim();

  // Build pre-computed data array (filtered)
  _vsTableData = [];
  sorted.forEach((anime, i) => {
    const title   = displayTitle(anime);
    const fmt    = anime.format || 'TV';
    const eloRank = eloRankMap.get(anime.id) ?? i;
    const tier    = getTier(eloRank, sorted.length);
    const conf    = confidenceLabel(anime.battles || 0);
    const hidden = (q && !title.toLowerCase().includes(q)) ||
                   (showFuzzyOnly && !anime.fuzzy) ||
                   hiddenFormats.has(fmt) ||
                   hiddenEpRanges.has(epRange(anime.episodes, fmt)) ||
                   excludedIds.has(anime.id);
    if (hidden) return;
    const wr      = (anime.wins + anime.losses) > 0
      ? Math.round(anime.wins / (anime.wins + anime.losses) * 100) + '%' : '–';
    const sb      = streakBadge(anime);
    _vsTableData.push({ anime, displayIdx: i + 1, title, tier, conf, wr, sb });
  });

  // Attach scroll listener (idempotent — overwrites previous)
  const wrap = byId(IDS.rankingTableWrap);
  wrap.onscroll = () => {
    if (_vsScrollRaf) return;
    _vsScrollRaf = requestAnimationFrame(() => { _vsScrollRaf = null; _vsRenderTableSlice(); });
  };

  // Reset scroll position and render first window
  wrap.scrollTop = 0;
  _vsRenderTableSlice();
}

function _vsRenderTableSlice() {
  if (franchiseMode) return; // franchise table manages its own rendering
  const wrap = byId(IDS.rankingTableWrap);
  if (!wrap || wrap.style.display === 'none') return;
  const total = _vsTableData.length;
  if (total === 0) {
    byId(IDS.rankingTableBody).innerHTML =
      '<tr><td colspan="9" style="text-align:center;color:#8b949e;padding:24px">No anime match the current filters.</td></tr>';
    return;
  }

  const scrollTop  = wrap.scrollTop;
  const viewH      = wrap.clientHeight || 500;
  const firstIdx   = Math.max(0, Math.floor(scrollTop / VS_ROW_H) - VS_BUFFER);
  const lastIdx    = Math.min(total, Math.ceil((scrollTop + viewH) / VS_ROW_H) + VS_BUFFER);

  const topPx  = firstIdx * VS_ROW_H;
  const botPx  = (total - lastIdx) * VS_ROW_H;

  let html = topPx > 0
    ? `<tr><td colspan="9" style="height:${topPx}px;padding:0;border:none"></td></tr>` : '';

  for (let i = firstIdx; i < lastIdx; i++) {
    const { anime, displayIdx, title, tier, conf, wr, sb } = _vsTableData[i];
    html += `<tr>
      <td class="tbl-rank">${displayIdx}</td>
      <td><img class="tbl-cover" src="${anime.cover}" alt="" aria-hidden="true" loading="lazy" /></td>
      <td class="tbl-title" onclick="showAnimeDetail(${anime.id})">${title}${sb ? ' ' + sb : ''}</td>
      <td>${anime.elo}</td>
      <td>${wr}</td>
      <td>${anime.battles || 0}</td>
      <td>${anime.globalScore ? anime.globalScore + '%' : '–'}</td>
      <td><span class="tier-badge t-${tier.toLowerCase()}">${tier}</span></td>
      <td><span class="confidence ${conf.cls}">${conf.dot} ${conf.label}</span></td>
    </tr>`;
  }

  if (botPx > 0)
    html += `<tr><td colspan="9" style="height:${botPx}px;padding:0;border:none"></td></tr>`;

  byId(IDS.rankingTableBody).innerHTML = html;
}

function renderFranchiseTable() {
  const sorted = _franchiseSortedList();
  let groups = _buildFranchiseGroups(sorted);
  let html = '';
  groups.forEach((group, rank) => {
    const tier     = getTier(group.eloRank ?? rank, groups.length);
    const isSingle = group.members.length === 1;
    const gid      = rank;
    const conf     = confidenceLabel(group.totalBattles || 0);
    const wrStr    = group.winRate !== null ? group.winRate + '%' : '–';
    const scoreStr = group.avgScore ? group.avgScore + '%' : '–';
    const clickHandler = isSingle
      ? `showAnimeDetail(${group.members[0].id})`
      : `showFranchiseDetail('${esc(group.name).replace(/'/g, "\\'")}')`;
    html += `
      <tr class="franchise-table-group" data-gid="${gid}" onclick="${clickHandler}">
        <td class="tbl-rank">${rank + 1}</td>
        <td><img class="tbl-cover" src="${esc(group.cover || '')}" alt="" loading="lazy" /></td>
        <td class="tbl-title">
          <strong>${esc(group.name)}</strong>
          ${!isSingle ? `<span class="franchise-count" style="margin-left:8px">${group.members.length} entries</span>` : ''}
          ${!isSingle ? `<span class="franchise-table-chevron" data-chv="${gid}" onclick="event.stopPropagation();toggleFranchiseTableGroup(${gid})" style="margin-left:6px;color:#6e7681;font-size:0.85rem;display:inline-block;transition:transform 0.15s;cursor:pointer;padding:0 4px">▸</span>` : ''}
        </td>
        <td>${group.bestElo}</td>
        <td>${wrStr}</td>
        <td>${group.totalBattles || 0}</td>
        <td>${scoreStr}</td>
        <td><span class="tier-badge t-${tier.toLowerCase()}">${tier}</span></td>
        <td><span class="confidence ${conf.cls}">${conf.dot} ${conf.label}</span></td>
      </tr>`;
    if (!isSingle) {
      group.members.forEach(a => {
        const wr = (a.wins + a.losses) > 0
          ? Math.round(a.wins / (a.wins + a.losses) * 100) + '%' : '–';
        const conf = confidenceLabel(a.battles || 0);
        const memberTier = getTier(sorted.indexOf(a), sorted.length);
        html += `<tr class="franchise-table-member" data-member-gid="${gid}" style="display:none" onclick="showAnimeDetail(${a.id})">
          <td></td>
          <td><img class="tbl-cover" src="${esc(a.cover || '')}" alt="" loading="lazy" /></td>
          <td class="tbl-title" style="padding-left:24px">${esc(a.titleEn || a.title)}</td>
          <td>${a.elo}</td>
          <td>${wr}</td>
          <td>${a.battles || 0}</td>
          <td>${a.globalScore ? a.globalScore + '%' : '–'}</td>
          <td><span class="tier-badge t-${memberTier.toLowerCase()}">${memberTier}</span></td>
          <td><span class="confidence ${conf.cls}">${conf.dot} ${conf.label}</span></td>
        </tr>`;
      });
    }
  });
  byId(IDS.rankingTableBody).innerHTML = html;
}

function toggleFranchiseTableGroup(gid) {
  const rows    = document.querySelectorAll(`[data-member-gid="${gid}"]`);
  const chevron = document.querySelector(`[data-chv="${gid}"]`);
  if (!rows.length) return;
  const isOpen = rows[0].style.display !== 'none';
  rows.forEach(r => r.style.display = isOpen ? 'none' : '');
  if (chevron) chevron.style.transform = isOpen ? '' : 'rotate(90deg)';
}

// ─── KEYBOARD SHORTCUTS ───────────────────────────────────────────────────────
// Previously disabled whenever navigator.maxTouchPoints > 0 — that killed
// shortcuts on every touch-capable laptop. We now trust that if the user is
// physically pressing a keyboard key, they meant to. The INPUT/TEXTAREA guard
// below is what actually prevents interference with typing.
document.addEventListener('keydown', e => {
  // Only fire when the battle screen is visible
  if (byId(IDS.battleScreen).style.display === 'none') return;
  // Don't hijack text inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  switch (e.key) {
    case 'ArrowLeft':  e.preventDefault(); pickWinner(0); break;
    case 'ArrowRight': e.preventDefault(); pickWinner(1); break;
    case 's': case 'S': skipBattle(); break;
    case 'u': case 'U': undoLast(); break;
  }
});


// ─── SYNC TO ANILIST ──────────────────────────────────────────────────────────

function _eloToScore10(rank0, total) {
  // rank0: 0-indexed rank from top (0 = best anime)
  // Previously divided by (total - 1) which made the median (rank = N/2) come
  // out as 6/10 instead of 7/10 — the median anime landed at pct=0.4975, just
  // below the 0.50 bucket threshold. Dividing by `total` puts the median at
  // exactly pct=0.50, which is what users expect when syncing to AniList.
  //
  // The bottom 15% is split into 5/4/3/2/1 so users who already had 1s or 2s
  // on AniList aren't silently bumped up to 3 on first sync. The top buckets
  // are unchanged from the earlier distribution.
  const pct = 1 - (rank0 / Math.max(total, 1)); // 1.0 = best, ~0 = worst
  if (pct >= 0.95) return 10;
  if (pct >= 0.85) return 9;
  if (pct >= 0.70) return 8;
  if (pct >= 0.50) return 7;
  if (pct >= 0.30) return 6;
  if (pct >= 0.15) return 5;
  if (pct >= 0.08) return 4;
  if (pct >= 0.04) return 3;
  if (pct >= 0.02) return 2;
  return 1;
}

function _formatScoreForAniList(score10, format) {
  switch (format) {
    case 'POINT_100':       return score10 * 10;
    case 'POINT_10_DECIMAL':return score10;
    case 'POINT_10':        return score10;
    case 'POINT_5':         return Math.max(1, Math.round(score10 / 2));
    case 'POINT_3':         return score10 >= 8 ? 3 : score10 >= 5 ? 2 : 1;
    default:                return score10;
  }
}

function _scoreClass(s) {
  if (s >= 10) return 'sync-score-10';
  if (s >= 9)  return 'sync-score-9';
  if (s >= 8)  return 'sync-score-8';
  if (s >= 7)  return 'sync-score-7';
  if (s >= 6)  return 'sync-score-6';
  if (s >= 5)  return 'sync-score-5';
  return 'sync-score-low';
}

let _syncQueue = []; // [{mediaId, title, cover, apiScore, score10}]

function openSyncModal() {
  if (!authToken) return;
  const format = authUser?.scoreFormat || 'POINT_10';
  const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const total = sorted.length;

  // Build sync queue — skip excluded anime and any with missing/invalid AniList IDs
  _syncQueue = sorted
    .filter(a => !excludedIds.has(a.id) && a.id && Number.isFinite(a.id))
    .map((a, i) => {
      const score10 = _eloToScore10(i, total);
      return { mediaId: a.id, title: a.title, cover: a.cover, score10, apiScore: _formatScoreForAniList(score10, format) };
    });

  // Format labels
  const fmtLabel = { POINT_100: '100-pt', POINT_10_DECIMAL: '10-pt', POINT_10: '10-pt', POINT_5: '5-star', POINT_3: '3-smiley' };
  const label = fmtLabel[format] || '10-pt';

  // Build preview table
  const rows = _syncQueue.map(item => `
    <tr>
      <td><img src="${safeUrl(item.cover)}" alt="" aria-hidden="true" /></td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(item.title)}</td>
      <td style="text-align:center"><span class="sync-score-pill ${_scoreClass(item.score10)}">${esc(item.apiScore)}</span></td>
    </tr>`).join('');

  byId(IDS.syncPreviewWrap).innerHTML = `
    <p style="font-size:0.78rem;color:#8b949e;margin-bottom:8px">Score format: <strong style="color:#c9d1d9">${esc(label)}</strong> · Percentile-based mapping</p>
    <div style="max-height:320px;overflow-y:auto;border:1px solid #30363d;border-radius:8px">
      <table class="sync-preview-table">
        <thead><tr><th></th><th>Title</th><th style="text-align:center">Score</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;

  byId(IDS.syncCountLabel).textContent = _syncQueue.length;
  byId(IDS.syncProgressWrap).style.display = 'none';
  byId(IDS.syncDoneMsg).style.display = 'none';
  byId(IDS.syncActionBtns).style.display = 'flex';
  byId(IDS.syncModal).style.display = 'flex';
}

function closeSyncModal() {
  byId(IDS.syncModal).style.display = 'none';
}

function closeSyncOnOverlay(e) {
  if (e.target === byId(IDS.syncModal)) closeSyncModal();
}

async function executeSyncToAniList() {
  if (!authToken || !_syncQueue.length) return;

  const actionBtns = byId(IDS.syncActionBtns);
  const progressWrap = byId(IDS.syncProgressWrap);
  const progressText = byId(IDS.syncProgressText);
  const barFill = byId(IDS.syncBarFill);
  const doneMsg = byId(IDS.syncDoneMsg);

  actionBtns.style.display = 'none';
  progressWrap.style.display = '';
  doneMsg.style.display = 'none';
  doneMsg.textContent = '';

  // ── Step 1: Fetch the user's full AniList list to find which IDs exist ──
  progressText.textContent = 'Checking your AniList…';
  barFill.style.width = '0%';

  let anilistIds = null; // null = couldn't check; Set = confirmed IDs
  try {
    const listQuery = `
      query ($userId: Int) {
        MediaListCollection(userId: $userId, type: ANIME) {
          lists { entries { mediaId } }
        }
      }`;
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: anilistHeaders(),
      body: JSON.stringify({ query: listQuery, variables: { userId: authUser?.id } })
    });
    const data = await res.json();
    if (!data.errors) {
      anilistIds = new Set(
        data.data.MediaListCollection.lists.flatMap(l => l.entries.map(e => e.mediaId))
      );
    }
  } catch { /* proceed without pre-check */ }

  // Partition queue into synacable + not-on-list
  let queue = _syncQueue;
  let notOnList = [];
  if (anilistIds !== null) {
    notOnList = _syncQueue.filter(item => !anilistIds.has(item.mediaId));
    queue = _syncQueue.filter(item => anilistIds.has(item.mediaId));
  }

  const total = queue.length;
  let done = 0, errors = 0;
  const failedItems = []; // full queue items that failed, for retry
  const failedTitles = []; // just titles, for display

  const mutation = `
    mutation ($mediaId: Int!, $score: Float!) {
      SaveMediaListEntry(mediaId: $mediaId, score: $score) {
        id score
      }
    }`;

  if (total === 0) {
    // Nothing to sync — all entries not on list
    barFill.style.width = '100%';
    progressWrap.style.display = 'none';
    doneMsg.style.display = '';
    doneMsg.innerHTML = `ℹ️ None of your ${_syncQueue.length} anime are on your AniList list yet — add them on AniList first.`;
    actionBtns.innerHTML = '<button class="btn-primary" onclick="closeSyncModal()">Close</button>';
    actionBtns.style.display = 'flex';
    return;
  }

  // AniList returns HTTP 429 when rate-limited, but WITHOUT CORS headers.
  // The browser therefore throws a network exception instead of returning a response —
  // so res.status === 429 is never reachable. The catch block must treat these as
  // rate limits and back off rather than retrying immediately (which makes it worse).
  //
  // Strategy: track consecutive CORS/network errors. After 3 in a row, pause 65s to
  // let AniList's rolling window fully reset, then retry the current item.
  let consecutiveRateLimits = 0;

  for (const item of queue) {
    progressText.textContent = `Syncing ${done + 1} / ${total} — ${item.title}`;
    barFill.style.width = Math.round((done / total) * 100) + '%';

    let itemOk = false;

    for (let attempt = 1; attempt <= 2 && !itemOk; attempt++) {
      try {
        const res = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: anilistHeaders(),
          body: JSON.stringify({ query: mutation, variables: { mediaId: item.mediaId, score: item.apiScore } })
        });
        if (res.status === 429) {
          // Rare path (usually CORS-blocked before we get here)
          consecutiveRateLimits++;
          await new Promise(r => setTimeout(r, 5000));
          continue;
        }
        const json = await res.json();
        if (json.errors) {
          const msg = json.errors[0]?.message || '';
          const isRateLimit = /rate.?limit|too many|throttl/i.test(msg) || json.errors[0]?.status === 429;
          console.warn(`[Sync] attempt ${attempt} "${item.title}" (id ${item.mediaId}): ${msg}`);
          if (isRateLimit) {
            consecutiveRateLimits++;
            await new Promise(r => setTimeout(r, 5000));
            continue;
          }
          break; // non-rate-limit GraphQL error — permanent failure for this item
        }
        consecutiveRateLimits = 0; // success — not rate limited
        itemOk = true;
      } catch {
        // Almost certainly a CORS-blocked 429
        consecutiveRateLimits++;
        console.warn(`[Sync] CORS/network error for "${item.title}" (attempt ${attempt}) — likely rate limited (count: ${consecutiveRateLimits})`);
        await new Promise(r => setTimeout(r, 3000));
      }
    }

    // After 3+ consecutive rate-limit signals, pause for a full window reset
    if (consecutiveRateLimits >= 3) {
      progressText.textContent = `Rate limited — pausing 65s for limit to reset… (${done + 1}/${total})`;
      await new Promise(r => setTimeout(r, 65000));
      consecutiveRateLimits = 0;
      // One more attempt on the current item after the reset
      if (!itemOk) {
        try {
          const res = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: anilistHeaders(),
            body: JSON.stringify({ query: mutation, variables: { mediaId: item.mediaId, score: item.apiScore } })
          });
          const json = await res.json();
          if (!json.errors) itemOk = true;
        } catch { /* still failing — give up on this item */ }
      }
    }

    if (!itemOk) {
      errors++;
      failedItems.push(item);
      failedTitles.push(item.title);
    }
    done++;
    await new Promise(r => setTimeout(r, 1500));
  }

  barFill.style.width = '100%';
  progressWrap.style.display = 'none';
  doneMsg.style.display = '';
  const succeeded = done - errors;

  let msg = '';
  if (errors === 0 && notOnList.length === 0) {
    msg = `✅ Done! Synced all ${done} scores to AniList.`;
  } else if (succeeded === 0 && errors > 0) {
    msg = `❌ All ${errors} syncs failed — your AniList token may have expired. Try logging out and back in.`;
  } else {
    if (succeeded > 0) msg += `✅ Synced ${succeeded}/${total} scores. `;
    if (errors > 0) {
      msg += `⚠️ ${errors} update${errors !== 1 ? 's' : ''} failed (see console for details). `;
      msg += `<details style="display:inline;font-size:0.82em;opacity:0.75;cursor:pointer">`
           + `<summary>${errors} failed</summary>`
           + `<div style="margin-top:4px;line-height:1.6">${failedTitles.map(t => `• ${esc(t)}`).join('<br>')}</div>`
           + `</details> `;
    }
    if (notOnList.length > 0) {
      msg += `<br><span style="opacity:0.7;font-size:0.9em">ℹ️ ${notOnList.length} anime skipped — not on your AniList list: `
           + `<details style="display:inline;cursor:pointer">`
           + `<summary>${notOnList.length} titles</summary>`
           + `<div style="margin-top:4px;line-height:1.6">${notOnList.map(t => `• ${esc(t.title)}`).join('<br>')}</div>`
           + `</details></span>`;
    }
  }
  doneMsg.innerHTML = msg;

  // Replace Cancel with Close (+ Retry if there were failures)
  if (errors > 0) {
    actionBtns.innerHTML =
      `<button class="btn-secondary" onclick="closeSyncModal()">Close</button>` +
      `<button class="btn-primary" id="sync-retry-btn">🔄 Retry ${errors} failed</button>`;
    actionBtns.style.display = 'flex';
    byId(IDS.syncRetryBtn).addEventListener('click', () => {
      _syncQueue = failedItems;
      // Reset UI for another run
      actionBtns.style.display = 'none';
      doneMsg.style.display = 'none';
      doneMsg.textContent = '';
      progressWrap.style.display = '';
      executeSyncToAniList();
    });
  } else {
    actionBtns.innerHTML = '<button class="btn-primary" onclick="closeSyncModal()">Close</button>';
    actionBtns.style.display = 'flex';
  }
}

// ─── SYNC TO MAL ─────────────────────────────────────────────────────────────
let _malSyncQueue = []; // [{malId, title, cover, score}]

function openMALSyncModal() {
  if (!malAuthToken) return;
  const sorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const total = sorted.length;

  // Only sync anime that have a MAL ID — skip anything the MAL↔AniList match missed
  _malSyncQueue = sorted
    .filter(a => !excludedIds.has(a.id) && a.idMal)
    .map((a, i) => ({
      malId: a.idMal,
      title: a.title,
      cover: a.cover,
      score: _eloToScore10(i, total),
    }));

  const noIdCount = sorted.filter(a => !excludedIds.has(a.id) && !a.idMal).length;

  const rows = _malSyncQueue.map(item => `
    <tr>
      <td><img src="${safeUrl(item.cover)}" alt="" aria-hidden="true" /></td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(item.title)}</td>
      <td style="text-align:center"><span class="sync-score-pill ${_scoreClass(item.score)}">${esc(item.score)}</span></td>
    </tr>`).join('');

  const noIdNote = noIdCount > 0
    ? `<p style="font-size:0.78rem;color:#8b949e;margin-top:8px">⚠️ ${noIdCount} anime skipped — MAL ID not found.</p>`
    : '';

  byId(IDS.malSyncPreviewWrap).innerHTML = `
    <p style="font-size:0.78rem;color:#8b949e;margin-bottom:8px">Score format: <strong style="color:#c9d1d9">10-pt</strong> · Percentile-based mapping</p>
    <div style="max-height:320px;overflow-y:auto;border:1px solid #30363d;border-radius:8px">
      <table class="sync-preview-table">
        <thead><tr><th></th><th>Title</th><th style="text-align:center">Score</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>${noIdNote}`;

  byId(IDS.malSyncCountLabel).textContent = _malSyncQueue.length;
  byId(IDS.malSyncProgressWrap).style.display = 'none';
  byId(IDS.malSyncDoneMsg).style.display = 'none';
  byId(IDS.malSyncActionBtns).style.display = 'flex';
  byId(IDS.malSyncModal).style.display = 'flex';
}

function closeMALSyncModal() {
  byId(IDS.malSyncModal).style.display = 'none';
}

function closeMALSyncOnOverlay(e) {
  if (e.target === byId(IDS.malSyncModal)) closeMALSyncModal();
}

async function executeSyncToMAL() {
  if (!malAuthToken || !_malSyncQueue.length) return;

  const actionBtns   = byId(IDS.malSyncActionBtns);
  const progressWrap = byId(IDS.malSyncProgressWrap);
  const progressText = byId(IDS.malSyncProgressText);
  const barFill      = byId(IDS.malSyncBarFill);
  const doneMsg      = byId(IDS.malSyncDoneMsg);

  actionBtns.style.display   = 'none';
  progressWrap.style.display = '';
  doneMsg.style.display      = 'none';
  doneMsg.textContent        = '';

  const queue = [..._malSyncQueue];
  const total = queue.length;
  let done = 0, errors = 0;
  const failedItems  = [];
  const failedTitles = [];

  // Helper: make a single PATCH call to the MAL proxy
  const malPatch = (malId, score) => fetch('/.netlify/functions/mal-api', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path:   `/v2/anime/${malId}/my_list_status`,
      token:  malAuthToken,
      method: 'PATCH',
      body:   `score=${score}`,
    }),
  });

  // Track consecutive rate-limit signals so we can pause for a full window reset
  let consecutiveRateLimits = 0;

  for (const item of queue) {
    progressText.textContent = `Syncing ${done + 1} / ${total} — ${item.title}`;
    barFill.style.width = Math.round((done / total) * 100) + '%';

    let itemOk = false;

    for (let attempt = 1; attempt <= 2 && !itemOk; attempt++) {
      try {
        const res     = await malPatch(item.malId, item.score);
        const resText = await res.text();
        if (!res.ok) console.warn(`[MAL Sync] ${item.title} → HTTP ${res.status}`, resText);

        if (res.status === 401) {
          // Token expired — try refresh once then retry
          if (malRefreshToken && attempt === 1) {
            const ok = await _refreshMALToken(malRefreshToken);
            if (ok) { saveMALAuth(); continue; }
          }
          // Unrecoverable auth failure — abort entire sync
          errors += total - done;
          barFill.style.width = '100%';
          progressWrap.style.display = 'none';
          doneMsg.style.display = '';
          doneMsg.innerHTML = '❌ MAL session expired — log out and back in, then try again.';
          actionBtns.innerHTML = '<button class="btn-primary" onclick="closeMALSyncModal()">Close</button>';
          actionBtns.style.display = 'flex';
          return;
        }

        if (res.status === 403 || res.status === 405) {
          // App-level permission issue — write access not enabled on the MAL app registration.
          // MAL returns 405 (not 403) when the app hasn't been granted animelist write access.
          errors += total - done;
          barFill.style.width = '100%';
          progressWrap.style.display = 'none';
          doneMsg.style.display = '';
          doneMsg.innerHTML = `❌ MAL returned ${res.status} (method not allowed). `
            + `<strong>First try:</strong> log out of MAL in Kessen and log back in to refresh your token. `
            + `If that doesn't help, your MAL app at `
            + `<a href="https://myanimelist.net/apiconfig" target="_blank" rel="noopener" style="color:#58a6ff">myanimelist.net/apiconfig</a> `
            + `may need write permission enabled (check for any Animelist/Write scope toggles).`;
          actionBtns.innerHTML = '<button class="btn-primary" onclick="closeMALSyncModal()">Close</button>';
          actionBtns.style.display = 'flex';
          return;
        }

        if (res.status === 429) {
          consecutiveRateLimits++;
          await new Promise(r => setTimeout(r, 10000));
          continue;
        }

        if (!res.ok) {
          console.warn(`[MAL Sync] HTTP ${res.status} for "${item.title}" (malId ${item.malId}):`, resText);
          break;
        }

        consecutiveRateLimits = 0; // successful — not rate limited
        itemOk = true;
      } catch (err) {
        // Treat network errors as possible rate-limit signals
        consecutiveRateLimits++;
        console.warn(`[MAL Sync] Network error for "${item.title}" (attempt ${attempt}):`, err.message);
        await new Promise(r => setTimeout(r, 3000));
      }
    }

    // After 3+ consecutive rate-limit signals, pause for a full window reset
    if (consecutiveRateLimits >= 3) {
      progressText.textContent = `Rate limited — pausing 65s for limit to reset… (${done + 1}/${total})`;
      await new Promise(r => setTimeout(r, 65000));
      consecutiveRateLimits = 0;
      // One more attempt on the current item after the reset
      if (!itemOk) {
        try {
          const res = await malPatch(item.malId, item.score);
          if (res.ok) itemOk = true;
        } catch { /* still failing — give up on this item */ }
      }
    }

    if (!itemOk) {
      errors++;
      failedItems.push(item);
      failedTitles.push(item.title);
    }
    done++;
    // 700ms between calls — stays comfortably under MAL's 90 req/min limit
    await new Promise(r => setTimeout(r, 700));
  }

  barFill.style.width = '100%';
  progressWrap.style.display = 'none';
  doneMsg.style.display = '';

  const succeeded = done - errors;
  let msg = '';
  if (errors === 0) {
    msg = `✅ Done! Synced all ${done} scores to MyAnimeList.`;
  } else if (succeeded === 0) {
    msg = `❌ All ${errors} syncs failed — check the browser console (F12) for the exact error from MAL.`;
  } else {
    msg += `✅ Synced ${succeeded}/${total} scores. `;
    if (errors > 0) {
      msg += `⚠️ ${errors} update${errors !== 1 ? 's' : ''} failed (see console for details). `
           + `<details style="display:inline;font-size:0.82em;opacity:0.75;cursor:pointer">`
           + `<summary>${errors} failed</summary>`
           + `<div style="margin-top:4px;line-height:1.6">${failedTitles.map(t => `• ${esc(t)}`).join('<br>')}</div>`
           + `</details>`;
    }
  }
  doneMsg.innerHTML = msg;

  if (errors > 0) {
    actionBtns.innerHTML =
      `<button class="btn-secondary" onclick="closeMALSyncModal()">Close</button>` +
      `<button class="btn-primary" id="mal-sync-retry-btn">🔄 Retry ${errors} failed</button>`;
    actionBtns.style.display = 'flex';
    byId(IDS.malSyncRetryBtn).addEventListener('click', () => {
      _malSyncQueue = failedItems;
      actionBtns.style.display   = 'none';
      doneMsg.style.display      = 'none';
      doneMsg.textContent        = '';
      progressWrap.style.display = '';
      executeSyncToMAL();
    });
  } else {
    actionBtns.innerHTML = '<button class="btn-primary" onclick="closeMALSyncModal()">Close</button>';
    actionBtns.style.display = 'flex';
  }
}

// ─── RESEED FROM ANILIST SCORES ───────────────────────────────────────────────
async function reseedFromAniList() {
  if (!authToken || !authUser) {
    showToast('Please log in with AniList first.');
    return;
  }
  const btn = byId(IDS.reseedAnilistBtn);
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Fetching scores…'; }

  try {
    const query = `
      query ($username: String) {
        MediaListCollection(userName: $username, type: ANIME) {
          lists { entries { score status media { id } } }
        }
      }`;
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: anilistHeaders(),
      body: JSON.stringify({ query, variables: { username: authUser.name } })
    });
    const data = await res.json();
    if (data.errors) throw new Error(data.errors[0].message);

    const scoreMap = {};
    data.data.MediaListCollection.lists
      .flatMap(l => l.entries)
      .forEach(e => { if (e.score) scoreMap[e.media.id] = e.score; });

    let updated = 0;
    animeList.forEach(a => {
      const score = scoreMap[a.id];
      if (score) {
        a.elo = scoreToElo(score);
        a.anilistScore = score;
        updated++;
      }
    });

    saveState();
    renderRankingList();
    filterRankings();
    showToast(`✓ Re-seeded ${updated} anime from AniList scores.`);
  } catch (err) {
    showToast('Error re-seeding: ' + err.message);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '🌱 Re-seed ELO from AniList scores'; }
  }
}

async function reseedFromMAL() {
  if (!malAuthToken || !malAuthUser) {
    showToast('Please log in with MAL first.');
    return;
  }
  if (!animeList.length) { showToast('No anime in your list yet.'); return; }

  const btn = byId(IDS.reseedMalBtn);
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Fetching MAL scores…'; }

  try {
    // 1. Fetch current MAL scores from the API proxy
    const entries = await _fetchMALAnimeListViaAPI();
    const malScoreMap = new Map(entries.map(e => [e.malId, e.score]));

    // 2. Get the AniList → MAL ID mapping for all anime in our list
    //    (needed because animeList stores AniList IDs, not MAL IDs)
    const ids       = animeList.map(a => a.id);
    const PAGE_SIZE = 50;
    const idMalMap  = {}; // anilistId → malId

    for (let i = 0; i < ids.length; i += PAGE_SIZE) {
      const chunk = ids.slice(i, i + PAGE_SIZE);
      const query = `query ($ids: [Int]) {
        Page(perPage: 50) {
          media(id_in: $ids, type: ANIME) { id idMal }
        }
      }`;
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { ids: chunk } })
      });
      const data = await res.json();
      (data?.data?.Page?.media ?? []).forEach(m => { if (m.idMal) idMalMap[m.id] = m.idMal; });
      if (i + PAGE_SIZE < ids.length) await new Promise(r => setTimeout(r, 250));
    }

    // 3. Apply scores to animeList
    let updated = 0;
    animeList.forEach(a => {
      const malId = idMalMap[a.id];
      if (!malId) return;
      const score = malScoreMap.get(malId);
      if (score) {
        a.elo      = scoreToElo(score);
        a.malScore = score;
        updated++;
      }
    });

    saveState();
    scheduleCloudSave();
    renderRankingList();
    filterRankings();
    showToast(`✓ Re-seeded ${updated} anime from MAL scores.`);
  } catch (err) {
    showToast('Error re-seeding: ' + err.message);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '🌱 Re-seed ELO from MAL scores'; }
  }
}

// ─── METADATA REFRESH ────────────────────────────────────────────────────────
// Re-fetches covers, titles, descriptions, episodes, genres etc. for all
// existing anime in the list. Ranking data (ELO, wins, losses, battles) is
// preserved — only display metadata is overwritten.
async function refreshMetadata() {
  if (!authToken && !malAuthToken) {
    showToast('Please log in first to refresh metadata.');
    return;
  }
  if (!animeList.length) {
    showToast('No anime in your list yet.');
    return;
  }

  const btn = byId(IDS.refreshMetadataBtn);
  const msg = byId(IDS.refreshMetadataMsg);
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Refreshing…'; }
  if (msg) { msg.style.display = 'none'; }

  try {
    // Fetch in pages of 50 IDs to avoid query complexity limits
    const ids = animeList.map(a => a.id);
    const PAGE_SIZE = 50;
    const metaMap = {};

    for (let offset = 0; offset < ids.length; offset += PAGE_SIZE) {
      const chunk = ids.slice(offset, offset + PAGE_SIZE);
      const query = `
        query ($ids: [Int]) {
          Page(perPage: 50) {
            media(id_in: $ids, type: ANIME) {
              id
              title { romaji english }
              coverImage { medium large }
              description(asHtml: false)
              format
              episodes
              averageScore
              genres
              seasonYear
              popularity
            }
          }
        }`;
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { ids: chunk } })
      });
      const data = await res.json();
      if (data.errors) throw new Error(data.errors[0].message);
      (data.data?.Page?.media ?? []).forEach(m => { metaMap[m.id] = m; });
    }

    let updated = 0;
    animeList.forEach(a => {
      const m = metaMap[a.id];
      if (!m) return;
      const titleEn = m.title.english || m.title.romaji;
      const titleRo = m.title.romaji  || m.title.english;
      a.title       = titleEn;
      a.titleEn     = titleEn;
      a.titleRo     = titleRo;
      a.cover       = m.coverImage.large || m.coverImage.medium;
      a.description = stripHtml(m.description || '').slice(0, 500);
      a.format      = m.format  || a.format;
      a.episodes    = m.episodes ?? a.episodes;
      a.globalScore = m.averageScore || a.globalScore;
      a.genres      = m.genres  || a.genres;
      a.seasonYear  = m.seasonYear ?? a.seasonYear;
      a.popularity  = m.popularity || a.popularity;
      updated++;
    });

    saveState();
    renderRankingList();
    filterRankings();

    const notFound = ids.length - updated;
    const statusText = notFound > 0
      ? `✓ Updated ${updated} anime (${notFound} not found on AniList).`
      : `✓ Metadata refreshed for all ${updated} anime.`;

    if (msg) { msg.style.display = 'block'; msg.style.color = '#3fb950'; msg.textContent = statusText; }
    showToast(statusText);
  } catch (err) {
    const errText = '✗ Refresh failed: ' + err.message;
    if (msg) { msg.style.display = 'block'; msg.style.color = '#f85149'; msg.textContent = errText; }
    showToast(errText);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = '🖼 Refresh covers & metadata'; }
  }
}

// ─── NEW ANIME DETECTION ──────────────────────────────────────────────────────
async function checkForNewAnime() {
  if (!authToken || !authUser || !animeList.length) return;
  try {
    const { entries } = await fetchAllAnime(authUser.name, false);
    // Defensive: an empty fetch on a previously-populated account is almost
    // always a transient API error. Don't flag the whole list as removed.
    if (!entries.length) return;
    const ownIds   = new Set(animeList.map(a => a.id));
    const remoteIds = new Set(entries.map(e => e.id));
    _pendingNewAnime = entries.filter(e => !ownIds.has(e.id));
    // Removals: items we track but which are no longer on AniList.
    _pendingRemovedAnime = animeList.filter(a => !remoteIds.has(a.id));
    _refreshListBanners('AniList');
  } catch (e) { console.warn('[checkForNewAnime] poll failed:', e?.message); }
}

// MAL variant: fetch current list, diff against animeList by AniList ID
async function checkForNewAnimeMAL() {
  if (!malAuthToken || !malAuthUser || !animeList.length) return;
  try {
    const entries   = await _fetchMALAnimeListViaAPI();
    const malIds    = entries.map(e => e.malId);
    const scoreMap  = new Map(entries.map(e => [e.malId, e.score]));
    const ownIds    = new Set(animeList.map(a => a.id));
    const PAGE_SIZE = 50;
    const pendingAnime = [];

    for (let i = 0; i < malIds.length; i += PAGE_SIZE) {
      const chunk = malIds.slice(i, i + PAGE_SIZE);
      const query = `query ($ids: [Int]) {
        Page(perPage: 50) {
          media(idMal_in: $ids, type: ANIME) {
            id idMal title { romaji english } coverImage { large medium }
            description(asHtml: false) format averageScore genres seasonYear popularity
          }
        }
      }`;
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { ids: chunk } })
      });
      const data = await res.json();
      (data?.data?.Page?.media ?? []).forEach(m => {
        if (!ownIds.has(m.id)) {
          const userScore = scoreMap.get(m.idMal) || 0;
          const titleEn   = m.title.english || m.title.romaji;
          const titleRo   = m.title.romaji  || m.title.english;
          pendingAnime.push({
            id: m.id, title: titleEn, titleEn, titleRo,
            cover: m.coverImage.large || m.coverImage.medium,
            description: stripHtml(m.description || '').slice(0, 500),
            format: m.format || 'TV', globalScore: m.averageScore || 0,
            genres: m.genres || [], seasonYear: m.seasonYear || null,
            popularity: m.popularity || 0,
            elo: 1200, wins: 0, losses: 0, comparisons: 0, battles: 0,
            fuzzy: false, eloHistory: [1200],
            anilistScore: 0, malScore: userScore,
            idMal: m.idMal || null,
          });
        }
      });
      if (i + PAGE_SIZE < malIds.length) await new Promise(r => setTimeout(r, 250));
    }

    _pendingNewAnime = pendingAnime;
    // Empty-list guard (likely a transient API error rather than real removal).
    if (malIds.length === 0) {
      _pendingRemovedAnime = [];
    } else {
      // Removals: animeList items whose MAL id is no longer on the user's
      // current MAL list. Items without an idMal predate MAL wiring — skip them.
      const remoteMalIds = new Set(malIds);
      _pendingRemovedAnime = animeList.filter(a => a.idMal && !remoteMalIds.has(a.idMal));
    }
    _refreshListBanners('MyAnimeList');
  } catch (e) { console.warn('[checkForNewAnimeMAL] poll failed:', e?.message); }
}

// §5.2.7 — Shared banner updater for both AniList and MAL polling paths.
// Decides which banner to show (new / removed / neither) and writes the label.
function _refreshListBanners(sourceName) {
  const newBanner  = byId(IDS.newAnimeBanner);
  const remBanner  = byId(IDS.removedAnimeBanner);
  const newMsg     = byId(IDS.newAnimeMsg);
  const remMsg     = byId(IDS.removedAnimeMsg);

  if (_pendingNewAnime.length > 0) {
    if (newMsg) newMsg.textContent =
      `🆕 ${_pendingNewAnime.length} new anime on your ${sourceName} — not yet in rankings`;
    newBanner?.classList.add('active');
  } else {
    newBanner?.classList.remove('active');
  }

  // Safety cap: if somehow >60% of the ranked list appears "removed", the
  // fetched list is likely truncated — suppress the banner so users don't
  // accidentally archive everything.
  const total = animeList.length;
  const removedTooMany = total > 0 && _pendingRemovedAnime.length > total * 0.6;
  if (_pendingRemovedAnime.length > 0 && !removedTooMany) {
    if (remMsg) remMsg.textContent =
      `📤 ${_pendingRemovedAnime.length} anime removed from your ${sourceName} — archive their rankings?`;
    remBanner?.classList.add('active');
  } else {
    if (removedTooMany) {
      console.warn('[checkForRemovals] suppressed — too many removed (' +
        _pendingRemovedAnime.length + '/' + total + '); likely transient fetch issue');
      _pendingRemovedAnime = [];
    }
    remBanner?.classList.remove('active');
  }
}

// §5.2.7 — Archive confirmation modal: show the list, let user choose.
function openArchiveConfirm() {
  if (!_pendingRemovedAnime.length) return;
  const list = byId(IDS.archiveConfirmList);
  if (list) {
    while (list.firstChild) list.removeChild(list.firstChild);
    _pendingRemovedAnime.forEach(a => {
      const li = document.createElement('li');
      const title = document.createElement('span');
      title.textContent = a.title || '(untitled)';
      const elo = document.createElement('span');
      elo.className = 'arch-elo';
      elo.textContent = `ELO ${Math.round(a.elo || 1200)} · ${a.battles || 0} battles`;
      li.appendChild(title);
      li.appendChild(elo);
      list.appendChild(li);
    });
  }
  byId(IDS.archiveConfirmModal).style.display = 'flex';
}
function closeArchiveConfirm() {
  byId(IDS.archiveConfirmModal).style.display = 'none';
}
function closeArchiveConfirmOverlay(e) {
  if (e.target === byId(IDS.archiveConfirmModal)) closeArchiveConfirm();
}

// §5.2.7 — Archive: move anime from active list to per-session archive store.
function archivePendingRemovedAnime() {
  if (!_pendingRemovedAnime.length) { closeArchiveConfirm(); return; }
  const removedIds = new Set(_pendingRemovedAnime.map(a => a.id));

  // Write archive: append to existing (never overwrite history).
  try {
    const archiveKey = KESSEN_KEYS.data.archive(saveKey);
    const existing = JSON.parse(localStorage.getItem(archiveKey) || '[]');
    const archivedAt = Date.now();
    const entries = _pendingRemovedAnime.map(a => ({
      id: a.id, title: a.title, cover: a.cover, elo: a.elo,
      battles: a.battles || 0, wins: a.wins || 0, losses: a.losses || 0,
      archivedAt,
    }));
    // Dedup by id — if the same anime is archived twice, keep the newer entry.
    const byId = new Map(existing.map(e => [e.id, e]));
    entries.forEach(e => byId.set(e.id, e));
    localStorage.setItem(archiveKey, JSON.stringify([...byId.values()]));
  } catch (e) {
    console.warn('[archivePendingRemovedAnime] storage failed:', e?.message);
  }

  // Strip from active state: animeList + matchupStats + excludedIds + towerChamp
  const n = _pendingRemovedAnime.length;
  animeList = animeList.filter(a => !removedIds.has(a.id));
  removedIds.forEach(id => { if (typeof excludedIds !== 'undefined') excludedIds.delete(id); });
  if (typeof matchupStats === 'object' && matchupStats) {
    Object.keys(matchupStats).forEach(key => {
      const [min, max] = key.split('-').map(Number);
      if (removedIds.has(min) || removedIds.has(max)) delete matchupStats[key];
    });
  }
  // If the removed set includes the currently-compared pair, pick a fresh pair.
  if (removedIds.has(animeList[currentA]?.id) || removedIds.has(animeList[currentB]?.id)) {
    pickOpponents();
  }

  _pendingRemovedAnime = [];
  byId(IDS.removedAnimeBanner)?.classList.remove('active');
  closeArchiveConfirm();
  saveState();
  if (typeof renderRankingList === 'function') renderRankingList();
  if (typeof filterRankings === 'function')    filterRankings();
  if (typeof renderBattle === 'function')      renderBattle();
  showToast(`📦 Archived ${n} anime — battle history preserved.`);
}

// §5.2.7 — Keep the removed anime in rankings (dismiss the prompt without
// action). User can still see them at the top of their list.
function keepPendingRemovedAnime() {
  _pendingRemovedAnime = [];
  byId(IDS.removedAnimeBanner)?.classList.remove('active');
  closeArchiveConfirm();
  showToast('✓ Rankings unchanged — anime kept in your list.');
}

function dismissNewAnimeBanner() {
  byId(IDS.newAnimeBanner)?.classList.remove('active');
  _pendingNewAnime = [];
}

// ─── GUEST → OAUTH MERGE (§5.2.12) ────────────────────────────────────────────
// When a user logs in via AniList or MAL after battling as a guest, offer to
// merge their guest progress into the new account. Conflict resolution: for
// each overlapping anime, battles/wins/losses are summed and the ELO comes
// from whichever side has more battles (more reliable). Matchup stats are
// merged additively. Runs once per (device, saveKey) pair.
let _pendingGuestMergeContext = null; // { targetSaveKey, onDone }

function _readGuestSave() {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.session.guest);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.animeList?.length) return null;
    const battles = Number(parsed.battleCount || 0);
    if (battles <= 0) return null;
    return parsed;
  } catch { return null; }
}

function _guestMergeAlreadyOffered(targetSaveKey) {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.ui.guestMergeDismissed);
    if (!raw) return false;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) && arr.includes(targetSaveKey);
  } catch { return false; }
}

function _markGuestMergeOffered(targetSaveKey) {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.ui.guestMergeDismissed);
    const arr = raw ? JSON.parse(raw) : [];
    if (!arr.includes(targetSaveKey)) {
      arr.push(targetSaveKey);
      localStorage.setItem(KESSEN_KEYS.ui.guestMergeDismissed, JSON.stringify(arr));
    }
  } catch {}
}

// Call after a fresh OAuth load has set up animeList + saveKey. No-ops if
// there's no guest progress or merge has already been offered for this save.
function maybeOfferGuestMerge(targetSaveKey, onDone) {
  if (!targetSaveKey || targetSaveKey === KESSEN_KEYS.session.guest) return false;
  const guest = _readGuestSave();
  if (!guest) return false;
  if (_guestMergeAlreadyOffered(targetSaveKey)) return false;
  // Only useful if at least one anime overlaps between the two lists.
  const activeIds = new Set(animeList.map(a => a.id));
  const overlap = guest.animeList.filter(a => activeIds.has(a.id));
  if (overlap.length === 0) {
    // No shared anime — silently mark offered so we don't re-check next time.
    _markGuestMergeOffered(targetSaveKey);
    return false;
  }
  _pendingGuestMergeContext = { targetSaveKey, onDone };
  const sub = byId(IDS.guestMergeSub);
  if (sub) {
    sub.textContent =
      `Your guest session has ${guest.battleCount} battles across ${guest.animeList.length} anime — ${overlap.length} of which are on your account.`;
  }
  const detail = byId(IDS.guestMergeDetail);
  if (detail) {
    detail.textContent =
      `Those ${overlap.length} overlapping anime will have their ELO & battle counts combined. Anime only in the guest session will NOT be added — they may no longer be on your list.`;
  }
  byId(IDS.guestMergeModal).style.display = 'flex';
  return true;
}

function closeGuestMergeOverlay(e) {
  if (e.target === byId(IDS.guestMergeModal)) declineGuestMerge();
}

function acceptGuestMerge() {
  const ctx = _pendingGuestMergeContext;
  _pendingGuestMergeContext = null;
  byId(IDS.guestMergeModal).style.display = 'none';
  if (!ctx) return;
  try {
    const result = _mergeGuestIntoActiveList();
    _markGuestMergeOffered(ctx.targetSaveKey);
    if (result.merged > 0) {
      // Safe to clear the guest save now — its useful data has been merged.
      try { localStorage.removeItem(KESSEN_KEYS.session.guest); } catch {}
      saveState();
      if (typeof renderRankingList === 'function') renderRankingList();
      if (typeof filterRankings === 'function')    filterRankings();
      if (typeof renderBattle === 'function')      renderBattle();
      showToast(`🔀 Merged ${result.merged} anime (+${result.battlesAdded} battles) from guest session.`);
    } else {
      showToast('✓ No overlap found — nothing to merge.');
    }
  } catch (e) {
    console.warn('[acceptGuestMerge] failed:', e?.message);
    showToast('⚠️ Merge failed: ' + (e?.message || 'unknown error'));
  } finally {
    if (typeof ctx?.onDone === 'function') ctx.onDone();
  }
}

function declineGuestMerge() {
  const ctx = _pendingGuestMergeContext;
  _pendingGuestMergeContext = null;
  byId(IDS.guestMergeModal).style.display = 'none';
  if (ctx) {
    _markGuestMergeOffered(ctx.targetSaveKey);
    if (typeof ctx.onDone === 'function') ctx.onDone();
  }
}

// Merge the current guest save into the in-memory animeList + matchupStats.
// Returns { merged, battlesAdded } so the caller can show a useful toast.
function _mergeGuestIntoActiveList() {
  const guest = _readGuestSave();
  if (!guest) return { merged: 0, battlesAdded: 0 };

  const guestById = new Map(guest.animeList.map(a => [a.id, a]));
  let merged = 0, battlesAdded = 0;

  animeList.forEach((a, idx) => {
    const g = guestById.get(a.id);
    if (!g) return;
    const aBattles = Number(a.battles || 0);
    const gBattles = Number(g.battles || 0);
    if (gBattles === 0 && aBattles === 0) return;

    // Pick ELO from whichever side has more battles (more reliable signal).
    // Tie-break: keep the active side.
    const pickGuestElo = gBattles > aBattles;
    a.elo         = pickGuestElo ? (g.elo || 1200) : (a.elo || 1200);
    // Rebuild eloHistory — safe fallback if either side is missing history.
    a.eloHistory  = pickGuestElo
      ? (Array.isArray(g.eloHistory) && g.eloHistory.length ? g.eloHistory.slice() : [a.elo])
      : (Array.isArray(a.eloHistory) && a.eloHistory.length ? a.eloHistory          : [a.elo]);

    // Sum everything else additively.
    a.battles     = aBattles + gBattles;
    a.wins        = (Number(a.wins  || 0)) + (Number(g.wins  || 0));
    a.losses      = (Number(a.losses|| 0)) + (Number(g.losses|| 0));
    a.comparisons = (Number(a.comparisons || 0)) + (Number(g.comparisons || 0));
    // Preserve fuzzy/not-seen flag if either side has it set.
    a.fuzzy = !!(a.fuzzy || g.fuzzy);
    animeList[idx] = a;

    merged++;
    battlesAdded += gBattles;
  });

  // Merge matchupStats additively: only for pairs where both anime exist in
  // the active list. Guest matchups against anime not on the user's external
  // list are discarded (keeping the active list as the source of truth).
  if (guest.matchupStats && typeof guest.matchupStats === 'object') {
    const activeIds = new Set(animeList.map(a => a.id));
    Object.entries(guest.matchupStats).forEach(([key, gStat]) => {
      const [minId, maxId] = key.split('-').map(Number);
      if (!activeIds.has(minId) || !activeIds.has(maxId)) return;
      const existing = matchupStats[key];
      if (!existing) {
        matchupStats[key] = {
          wins:  Object.assign({}, gStat.wins || {}),
          total: Number(gStat.total || 0),
          titleA: gStat.titleA, titleB: gStat.titleB,
        };
      } else {
        existing.total = Number(existing.total || 0) + Number(gStat.total || 0);
        existing.wins = existing.wins || {};
        Object.entries(gStat.wins || {}).forEach(([id, n]) => {
          existing.wins[id] = Number(existing.wins[id] || 0) + Number(n || 0);
        });
      }
    });
  }

  // Fold guest battleCount into the global counter so session stats stay honest.
  battleCount = Number(battleCount || 0) + Number(guest.battleCount || 0);

  return { merged, battlesAdded };
}

// §5.2.7 — Dismiss the removed-anime banner without taking action.
function dismissRemovedAnimeBanner() {
  byId(IDS.removedAnimeBanner)?.classList.remove('active');
  _pendingRemovedAnime = [];
}

// ─── MANUAL LIST REFRESH (§5.2.11) ───────────────────────────────────────────
// User-triggered version of the automatic 15-minute poll. Surfaces the result
// via toast so the user gets feedback even when there's nothing new to add
// (the banner's "silent when empty" behaviour isn't obvious otherwise).
async function refreshAniListNow() {
  if (!authToken || !authUser) {
    showToast('⚠ Log in to AniList first to refresh your list.');
    return;
  }
  const btn = byId(IDS.refreshListBtn);
  const origText = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Checking…'; }
  try {
    await checkForNewAnime();
    const n = _pendingNewAnime.length;
    showToast(n > 0
      ? `🆕 Found ${n} newly-added anime — see the banner to add them to your ranking.`
      : '✓ Your list is up to date — no new anime since the last check.');
  } catch (err) {
    showToast('✗ Refresh failed: ' + (err?.message || 'unknown error'));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = origText; }
  }
}

async function refreshMALNow() {
  if (!malAuthToken || !malAuthUser) {
    showToast('⚠ Log in to MyAnimeList first to refresh your list.');
    return;
  }
  const btn = byId(IDS.refreshListMalBtn);
  const origText = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Checking…'; }
  try {
    await checkForNewAnimeMAL();
    const n = _pendingNewAnime.length;
    showToast(n > 0
      ? `🆕 Found ${n} newly-added anime — see the banner to add them to your ranking.`
      : '✓ Your list is up to date — no new anime since the last check.');
  } catch (err) {
    showToast('✗ Refresh failed: ' + (err?.message || 'unknown error'));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = origText; }
  }
}

function addPendingNewAnime() {
  if (!_pendingNewAnime.length) return;
  _pendingNewAnime.forEach(a => animeList.push(a));
  _pendingNewAnime = [];
  byId(IDS.newAnimeBanner)?.classList.remove('active');
  saveState();
  renderRankingList();
  filterRankings();
}

function _startNewAnimePolling() {
  if (_newAnimePollingTimer) clearInterval(_newAnimePollingTimer);
  if (malAuthToken && malAuthUser && !authToken) {
    // MAL path: longer interval (involves more API hops)
    checkForNewAnimeMAL();
    _newAnimePollingTimer = setInterval(checkForNewAnimeMAL, 15 * 60 * 1000);
  } else {
    // AniList path (or AniList + MAL — AniList takes priority)
    checkForNewAnime();
    _newAnimePollingTimer = setInterval(checkForNewAnime, 5 * 60 * 1000);
  }
}

// Auto-load if username is pre-filled, or show shared view if URL has a share hash
// Global image error handler — catches broken covers in dynamically rendered cards
// Guard: ignore errors from empty src (e.g. before renderPair has set a real URL)
document.addEventListener('click', e => {
  const dd = byId(IDS.predictorDropdown);
  if (dd && !dd.contains(e.target) && e.target.id !== 'predictor-input') {
    dd.style.display = 'none';
  }
});

document.addEventListener('error', e => {
  if (e.target.tagName === 'IMG' && e.target.src && !e.target.src.endsWith('/')) {
    e.target.classList.add('img-broken');
  }
}, true);

window.addEventListener('load', () => {
  if (tryLoadSharedView()) {
    hide('username-screen');
    return;
  }
  const input = byId(IDS.usernameInput);
  if (input.value.trim()) startLoading();
});

// Save to cloud when the user closes the tab or navigates away.
// sendBeacon is the first choice — it fires even during unload. For payloads
// larger than the beacon's ~64 KB ceiling we fall back to fetch() with
// { keepalive: true }, which has the same ceiling but a slightly different
// quota accounting on some browsers.
//
// BEACON_LIMIT_BYTES is conservative; real browser caps are 64 KB but they
// include headers + URL, so we give ourselves 16 KB of headroom.
const BEACON_LIMIT_BYTES = 48 * 1024;

function _flushSessionOnUnload(payload) {
  const url  = '/.netlify/functions/save-session';
  const blob = new Blob([payload], { type: 'application/json' });

  if (blob.size <= BEACON_LIMIT_BYTES) {
    // Beacon returns false if the browser refuses to queue (quota / size /
    // policy). In that case fall through to fetch keepalive as a last resort.
    if (navigator.sendBeacon && navigator.sendBeacon(url, blob)) return true;
  }

  // keepalive fetch: survives the unloading document, same ~64 KB quota.
  // Best-effort only — if this also fails, the next load will replay from
  // the debounce-saved localStorage copy, so we haven't lost the ELO state.
  try {
    fetch(url, {
      method:    'POST',
      headers:   { 'Content-Type': 'application/json' },
      body:      payload,
      keepalive: true,
    }).catch(() => {});
    return true;
  } catch {
    return false;
  }
}

window.addEventListener('beforeunload', () => {
  if (!_cloudSyncEnabled || !_activeCloudUser() || !animeList.length || !saveKey) return;
  clearTimeout(_cloudSaveTimer); // cancel any pending debounce — we're saving now

  const session = {
    saveKey, animeList, battleCount, currentA, currentB, battleHistory,
    excludedIds:     [...excludedIds],
    hiddenFormats:   [...hiddenFormats],
    hiddenEpRanges:  [...hiddenEpRanges],
    rankingView, currentSort, sortAsc,
    achievements,
    comparedFriends: [...comparedFriends],
    matchupStats,
    savedAt: new Date().toISOString(),
  };
  const body = _isMalCloudSession()
    ? { malToken: malAuthToken, malUserId: malAuthUser?.id, session }
    : { token: authToken, session };

  // First attempt: full payload with descriptions. If it encodes to more than
  // BEACON_LIMIT_BYTES, strip descriptions (they re-fetch on load) and retry.
  // All ELO data, battle history, and rankings are preserved either way.
  let payload = JSON.stringify(body);
  if (new Blob([payload]).size > BEACON_LIMIT_BYTES) {
    const slim = {
      ...body,
      session: {
        ...session,
        animeList: animeList.map(a => {
          // Rest-spread to drop `description` (which can be long) from the
          // beacon payload when we hit the byte cap; `_description` is named
          // with a leading underscore to mark it as intentionally discarded.
          const { description: _description, ...rest } = a;
          return rest;
        }),
      },
    };
    payload = JSON.stringify(slim);
  }

  _flushSessionOnUnload(payload);
});
