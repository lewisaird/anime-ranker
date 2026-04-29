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
  newAnimeBanner:         'new-anime-banner',
  newAnimeMsg:            'new-anime-msg',
  newAnimeConfirmModal:   'new-anime-confirm-modal',
  newAnimeConfirmList:    'new-anime-confirm-list',
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
  finishPromptBanner:     'finish-prompt-banner',
  finishPromptMsg:        'finish-prompt-msg',
  realtimeSyncBanner:     'realtime-sync-banner',
  realtimeSyncMsg:        'realtime-sync-msg',
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
  tabPanelManage:         'tab-panel-manage',
  tabPanelSocial:         'tab-panel-social',
  tabPanelProfile:        'tab-panel-profile',
  tasteBody:              'taste-body',
  tasteEmpty:             'taste-empty',
  tasteHeadline:          'taste-headline',
  tasteLoading:           'taste-loading',
  tasteLoadingMsg:        'taste-loading-msg',
  tasteMeta:              'taste-meta',
  tasteRefreshBtn:        'taste-refresh-btn',
  tasteSummary:           'taste-summary',
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
  trioBanner:             'trio-banner',
  trioArena:              'trio-arena',
  notifBell:              'notif-bell',
  notifBadge:             'notif-badge',
  notifCentreModal:       'notif-centre-modal',
  notifCentreList:        'notif-centre-list',
  collabModal:              'collab-modal',
  collabPanelMode:          'collab-panel-mode',
  collabPanelSetup:         'collab-panel-setup',
  collabPanelMultiSetup:    'collab-panel-multi-setup',
  collabPanelMultiLobby:    'collab-panel-multi-lobby',
  collabPanelNominate:      'collab-panel-nominate',
  collabPanelRounds:        'collab-panel-rounds',
  collabPanelPass:          'collab-panel-pass',
  collabPanelVote:          'collab-panel-vote',
  collabPanelResults:       'collab-panel-results',
  collabP1Name:             'collab-p1-name',
  collabP2Name:             'collab-p2-name',
  collabNominateTitle:      'collab-nominate-title',
  collabNominateCount:      'collab-nominate-count',
  collabSearch:             'collab-search',
  collabSearchResults:      'collab-search-results',
  collabNominationsList:    'collab-nominations-list',
  collabPassName:           'collab-pass-name',
  collabPlayerList:         'collab-player-list',
  collabStartNomsBtn:       'collab-start-noms-btn',
  collabLobbyGuestStatus:   'collab-lobby-guest-status',
  collabVoteProgress:       'collab-vote-progress',
  collabCardA:              'collab-card-a',
  collabCardB:              'collab-card-b',
  collabVoteReveal:         'collab-vote-reveal',
  collabVoteRevealText:     'collab-vote-reveal-text',
  collabVoteNextBtn:        'collab-vote-next-btn',
  collabResultsList:        'collab-results-list',
  collabMultiName:          'collab-multi-name',
  collabJoinInput:          'collab-join-input',
  collabLobbyCode:          'collab-lobby-code',
  collabLobbyStatus:        'collab-lobby-status',
  challengeModal:           'challenge-modal',
  challengeLoading:       'challenge-loading',
  challengeGame:          'challenge-game',
  challengeEnd:           'challenge-end',
  challengeFriendName:    'challenge-friend-name',
  challengeProgress:      'challenge-progress',
  challengeScoreLive:     'challenge-score-live',
  challengeCardA:         'challenge-card-a',
  challengeCardB:         'challenge-card-b',
  challengeDiffBadge:     'challenge-diff-badge',
  challengeReveal:        'challenge-reveal',
  challengeRevealText:    'challenge-reveal-text',
  challengeNextBtn:       'challenge-next-btn',
  challengeEndScore:      'challenge-end-score',
  challengeBreakdown:     'challenge-breakdown',
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
let _finishPromptQueue  = [];   // queue of {id, title, cover, detectedAt} for post-finish Tower prompts
let _notifCentre        = [];   // persisted notification centre entries
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
let trioMode        = false;     // rank three anime at once
let currentTrio     = [];        // [idxA, idxB, idxC] — indices into animeList
let trioOrder       = [];        // subset of [0,1,2] in the order user tapped
let nextTrioOverride = null;     // [[idxA,idxB,idxC], ...] — replayed after undo, like nextPairOverride

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

// When a fetch to AniList fails at the network level the browser gives us only
// TypeError "Failed to fetch" — no status code, no body — because the CORS
// preflight itself is blocked (e.g. AniList returns 503/403 with no CORS
// headers during an outage). Convert that opaque error into something a real
// user can act on. Everything else (HTTP errors, API errors) is passed through.
function _anilistErrMsg(err) {
  if (err.message === 'Failed to fetch') {
    return 'AniList appears to be temporarily unavailable — this isn\'t an issue with the app. Try again in a few minutes, or check AniList\'s status on their Discord.';
  }
  return err.message;
}

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
    tasteStorySeen:      'kessen.ui.tasteStorySeen', // JSON array of battle counts already shown
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
    // Post-finish Tower prompts — queue of {id, title, cover, detectedAt}
    finishPrompts:    'kessen.data.finishPrompts',
    // Set of anime IDs already prompted so we never fire twice for the same show
    finishPromptedIds: 'kessen.data.finishPromptedIds',
    // Notification Centre — persisted list of {id, type, msg, timestamp, read, data}
    // Keyed per user so switching accounts shows the right notifications.
    notifCentre: (key) => `kessen.data.notifCentre.${key || 'guest'}`,
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
  _stopFirebaseSync(); // detach real-time listener so stale data can't overwrite a new session
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
    if (errEl) { errEl.textContent = 'Login failed: ' + _anilistErrMsg(err); errEl.style.display = 'block'; }
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

// ─── REAL-TIME CROSS-DEVICE SYNC ────────────────────────────────────────────
// Each browser tab/session gets a random device ID so we can tell whether an
// incoming Firebase snapshot was written by this tab (ignore) or another device.
const _deviceId = 'dev-' + Math.random().toString(36).slice(2, 10);
let _firebaseSyncRef      = null; // Firebase DatabaseReference for the user's sync path
let _firebaseSyncListener = null; // 'value' listener handle (needed to detach cleanly)
let _lastFirebaseSyncTs   = 0;    // ms timestamp of the last snapshot we applied or pushed
let _pendingSyncData      = null; // remote snapshot queued for user confirmation (banner)

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

// ── Real-time sync helpers ────────────────────────────────────────────────────

// Returns the Firebase path for this user's real-time state node.
function _getFirebaseSyncPath() {
  const u = _activeCloudUser();
  if (!u) return null;
  const prefix = _isMalCloudSession() ? 'mal' : 'al';
  const id = u.id || u.name || u.username;
  return `users/${prefix}_${id}/state`;
}

// Detach any active Firebase listener and clear pending sync state.
function _stopFirebaseSync() {
  if (_firebaseSyncRef && _firebaseSyncListener) {
    _firebaseSyncRef.off('value', _firebaseSyncListener);
  }
  _firebaseSyncRef      = null;
  _firebaseSyncListener = null;
  _pendingSyncData      = null;
  byId(IDS.realtimeSyncBanner)?.classList.remove('active');
}

// Attach a Firebase 'value' listener for this user's state path.
// Safe to call multiple times — re-attaches only if the path changed.
function _startFirebaseSync() {
  if (!_FIREBASE_READY || !_cloudSyncEnabled || !_activeCloudUser()) return;
  if (typeof firebase === 'undefined') return; // SDK didn't load
  _initFirebase();

  const path = _getFirebaseSyncPath();
  if (!path) return;

  // Already listening on the correct path — nothing to do.
  if (_firebaseSyncRef && _firebaseSyncRef.key === path.split('/').pop()) return;

  _stopFirebaseSync();
  _firebaseSyncRef = firebase.database().ref(path);

  // Firebase carries only a lightweight ping (savedAt + savedBy + battleCount).
  // The full session data lives in Netlify Blob — we fetch it from there when
  // we detect a newer ping from another device. This keeps Firebase writes tiny
  // so they never contend with collab-session traffic on the same WebSocket.
  _firebaseSyncListener = _firebaseSyncRef.on('value', async snap => {
    const ping = snap.val();
    if (!ping || !ping.savedBy || !ping.savedAt) return;
    if (ping.savedBy === _deviceId) return; // our own write — skip

    const remoteTs      = new Date(ping.savedAt).getTime();
    const remoteBattles = ping.battleCount || 0;

    // Ignore if we've already seen this ping or if our local state is ahead
    if (remoteTs <= _lastFirebaseSyncTs) return;
    if (remoteBattles <= battleCount) {
      _lastFirebaseSyncTs = remoteTs; // mark seen so we don't re-prompt
      return;
    }

    // Fetch the actual session from Netlify Blob (the full data source)
    const data = await _loadCloudSave();
    if (!data || !data.animeList) return;

    // Re-check after the async fetch — another battle may have happened locally
    if ((data.battleCount || 0) <= battleCount) return;

    const onBattle = byId(IDS.battleScreen)?.style.display !== 'none';
    if (!onBattle || !animeList.length) {
      // Not actively battling — apply silently
      _lastFirebaseSyncTs = remoteTs;
      if (animeList.length) {
        _applyCloudSaveToMemory(data);
        showToast('✅ Synced from your other device');
        syncFormatButtons(); syncEpRangeButtons();
      }
    } else {
      // Mid-battle — show banner so they can choose when to apply
      _pendingSyncData = data;
      _lastFirebaseSyncTs = remoteTs; // mark ping as seen regardless of decision
      const count = (data.battleCount || 0) - battleCount;
      const msg = byId(IDS.realtimeSyncMsg);
      if (msg) msg.textContent = `📱 Your other device ranked ${count} more anime`;
      byId(IDS.realtimeSyncBanner)?.classList.add('active');
    }
  }, err => {
    console.warn('Firebase real-time sync error:', err.message);
  });
}

// Called by the "Apply" button in the realtime-sync-banner.
function applyRealtimeSync() {
  byId(IDS.realtimeSyncBanner)?.classList.remove('active');
  if (!_pendingSyncData) return;
  const data = _pendingSyncData;
  _pendingSyncData = null;
  _lastFirebaseSyncTs = new Date(data.savedAt).getTime();
  _applyCloudSaveToMemory(data);
  showToast('✅ Rankings synced from your other device');
  const onBattle = byId(IDS.battleScreen)?.style.display !== 'none';
  if (onBattle) {
    syncFormatButtons(); syncEpRangeButtons();
    if (currentA !== null && currentB !== null) renderCurrentPair(); else renderBattle();
  }
}

// Called by the "✕" button in the realtime-sync-banner.
function dismissRealtimeSync() {
  _pendingSyncData = null;
  // Mark this remote snapshot's timestamp as seen so we don't re-show the banner
  // when Firebase fires the listener again on reconnect.
  byId(IDS.realtimeSyncBanner)?.classList.remove('active');
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

    // Notify other devices via Firebase — write a tiny ping only, NOT the full
    // session. The full data lives in the Netlify Blob (written above); other
    // devices fetch it from there when they see a newer ping. This keeps the
    // Firebase write negligibly small and never blocks the shared WebSocket
    // connection that collab sessions also use.
    if (_FIREBASE_READY && typeof firebase !== 'undefined') {
      try {
        const path = _getFirebaseSyncPath();
        if (path) {
          _initFirebase();
          firebase.database().ref(path).set({
            savedAt:      session.savedAt,
            savedBy:      _deviceId,
            battleCount:  session.battleCount,
          });
          _lastFirebaseSyncTs = new Date(session.savedAt).getTime();
        }
      } catch (fbErr) {
        console.warn('Firebase real-time sync write failed:', fbErr.message);
      }
    }
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
  // Show a loading state on the language button in Settings while metadata fetches.
  const btn = byId(IDS.langToggleBtn);
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
    _syncLangBtn();
    if (btn) btn.disabled = false;
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
  // Restore standard battle prompt in case we're coming back from Trio mode
  const h2 = byId(IDS.battlePromptH2);
  const p  = byId(IDS.battlePromptP);
  if (h2 && h2.textContent === 'Rank these three') h2.textContent = 'Which did you enjoy more?';
  if (p  && p.textContent.startsWith('Tap in order')) p.textContent = 'Click your favourite — or skip if you can\'t decide.';

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
  _maybeSaveTasteSnapshot();
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
  const snap = undoStack.pop();

  if (snap.type === 'trio') {
    // Restore all 3 anime to pre-trio state
    snap.indices.forEach((idx, i) => {
      animeList[idx] = { ...snap.snaps[i] };
    });
    // Restore matchup stats for all 3 pairs
    snap.matchupData.forEach(({ key, snap: mSnap }) => {
      if (mSnap) matchupStats[key] = mSnap;
      else       delete matchupStats[key];
    });
    // Restore battle count and remove 3 history entries
    battleCount = snap.battleCount;
    for (let i = 0; i < 3; i++) {
      if (battleHistory.length > 0) battleHistory.shift();
    }
    // Queue the next trio so completing this trio again shows the same follow-up
    if (snap.nextTrio) {
      nextTrioOverride = [snap.nextTrio, ...(nextTrioOverride || [])];
    }

    // Show the same trio again with no picks
    currentTrio = snap.indices.slice();
    trioOrder   = [];
    _paintTrio();
    updateProgress();
    saveState();
  } else {
    const { winnerIdx, loserIdx, winnerSnap, loserSnap, battleCount: savedCount, pairA, pairB, nextA, nextB, matchupKey, matchupSnap } = snap;

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

    // Show the original pair
    renderPair(pairA, pairB);
    updateProgress();
    saveState();
  }

  prevState = undoStack.length > 0 ? undoStack[undoStack.length - 1] : null;
  _updateUndoBtn();
}

function skipBattle() {
  if (trioMode) { renderTrio(); return; }
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
    // Coherence — how consistently the user ranks entries within this franchise.
    // Only meaningful for franchises with 2+ entries.
    if (group.members.length >= 2) {
      const elos    = group.members.map(a => a.elo);
      const mean    = elos.reduce((s, e) => s + e, 0) / elos.length;
      const stdDev  = Math.sqrt(elos.reduce((s, e) => s + Math.pow(e - mean, 2), 0) / elos.length);
      group.eloStdDev  = Math.round(stdDev);
      group.eloRange   = Math.round(Math.max(...elos) - Math.min(...elos));
      group.coherence  = stdDev < 30 ? 'consistent' : stdDev < 80 ? 'mixed' : 'divisive';
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

  const coh = _coherenceLabel(group);
  const cohBadge = coh
    ? `<span class="franchise-coherence ${coh.cls}" title="${esc(coh.title)}">${coh.icon} ${coh.label}</span>`
    : '';

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
      ${cohBadge}
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
            ${cohBadge}
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
  const cohDetail = _coherenceLabel(group);
  const cohHtml   = cohDetail
    ? ` · <span class="franchise-coherence ${cohDetail.cls}" style="font-size:0.78rem" title="${esc(cohDetail.title)}">${cohDetail.icon} ${cohDetail.label} <span style="color:#8b949e;font-weight:400">(±${group.eloStdDev} ELO)</span></span>`
    : '';
  byId(IDS.modalMetaLine).innerHTML = `${esc(wrStr)} win rate · ${group.totalBattles} total battles · ${conf.label}${cohHtml}`;
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
  // Load any queued post-finish prompts (prunes stale ones, shows banner if pending)
  _loadFinishPrompts();
  // Load notification centre and update bell badge; reveal the bell now that a session is active
  _ncLoad();
  _ncUpdateBell();
  byId(IDS.notifBell).style.display = 'flex';
}

// ─── CONFIDENCE ──────────────────────────────────────────────────────────────
// Uses a.battles (actual picks only) so skips don't inflate confidence.
// Thresholds are relative to TARGET_BATTLES_PER_ANIME (= 10).
function confidenceLabel(battles) {
  if (battles < 3)  return { cls: 'uncertain', dot: '●', label: 'Uncertain', title: `${battles} battles — fewer than 3, ranking not reliable yet` };
  if (battles < TARGET_BATTLES_PER_ANIME) return { cls: 'settling',  dot: '●', label: 'Settling',  title: `${battles} battles — ranking is stabilising` };
  return                                         { cls: 'confident', dot: '●', label: 'Confident', title: `${battles} battles — ranking is well established` };
}

function _coherenceLabel(group) {
  if (!group.coherence) return null;
  const map = {
    consistent: { cls: 'coherence-consistent', icon: '✓', label: 'Consistent',     title: `ELO spread of ${group.eloRange} — you feel similarly about every entry` },
    mixed:      { cls: 'coherence-mixed',      icon: '~', label: 'Mixed',           title: `ELO spread of ${group.eloRange} — some entries rank noticeably higher than others` },
    divisive:   { cls: 'coherence-divisive',   icon: '⚡', label: 'Divisive',       title: `ELO spread of ${group.eloRange} — your opinions swing wildly across this franchise` },
  };
  return map[group.coherence] || null;
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
function toggleHistory() { switchResultsTab('battles'); }

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
      // Clear taste snapshots, milestone seen-state, and saved comparisons
      // so taste profile, taste story, and social tab start completely fresh.
      localStorage.removeItem(TASTE_SNAPSHOT_KEY);
      localStorage.removeItem(KESSEN_KEYS.ui.tasteStorySeen);
      localStorage.removeItem(KESSEN_KEYS.data.savedComparisons);
      localStorage.removeItem(KESSEN_KEYS.data.finishPrompts);
      localStorage.removeItem(KESSEN_KEYS.data.finishPromptedIds);
      localStorage.removeItem(KESSEN_KEYS.data.notifCentre(saveKey));
      _finishPromptQueue = [];
      _notifCentre = [];
      byId(IDS.finishPromptBanner)?.classList.remove('active');
      _ncUpdateBell();
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
  byId(IDS.kbFirstTip).style.display = 'none';
  byId(IDS.notifBell).style.display = 'none';
  closeNotifCentre();
  _notifCentre = [];
  _ncUpdateBell();
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
            episodes
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
        episodes: m.episodes || 0,
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
  snapshotSessionStart();
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

function setRecsTab(tab, fromMood = false) {
  if (!fromMood) _moodRecActive = false; // user switching tabs manually resets mood mode
  recsTab = tab;
  byId(IDS.recsTabForyou).classList.toggle('active', tab === 'foryou');
  byId(IDS.recsTabSeasonal).classList.toggle('active', tab === 'seasonal');
  byId(IDS.recsTabPredict).classList.toggle('active', tab === 'predict');
  document.getElementById('recs-tab-moods')?.classList.toggle('active', tab === 'moods');

  const isPredict = tab === 'predict';
  const isMoods   = tab === 'moods';
  const sub        = byId(IDS.recsSubText);
  const grid       = byId(IDS.recsGrid);
  const predictSec = byId(IDS.predictorSection);
  const moodsSec   = document.getElementById('moods-section');
  const refreshBtn = byId(IDS.discoverRefreshBtn);

  if (sub)        sub.style.display        = (isPredict || isMoods) ? 'none' : '';
  if (grid)       grid.style.display       = (isPredict || isMoods) ? 'none' : (grid.style.display || '');
  if (predictSec) predictSec.style.display = isPredict ? '' : 'none';
  if (moodsSec)   moodsSec.style.display   = isMoods   ? '' : 'none';
  if (refreshBtn) refreshBtn.style.display = (isPredict || isMoods) ? 'none' : '';

  if (isMoods) {
    // Populate the discover mood grid
    const discoverMoodGrid = document.getElementById('discover-mood-grid');
    if (discoverMoodGrid) _paintTasteMoods(discoverMoodGrid);
    return;
  }

  if (!isPredict) {
    if (tab === 'foryou') {
      sub.textContent = 'Based on your top-ranked anime — titles you haven\'t seen yet that AniList thinks you\'ll love.';
    } else {
      const { season, year } = getCurrentSeason();
      const nextS = getNextSeason(season, year);
      sub.textContent = `Airing this season (${season} ${year}) and next (${nextS.season} ${nextS.year}) — filtered to titles you haven't watched.`;
    }

    if (_moodRecActive) {
      // Mood rec will populate the grid itself — don't fetch or restore cache
    } else if (_recsCache[tab]) {
      // Restore from cache if available — avoids redundant API calls
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
    ? '<span style="font-size:0.65rem;background:var(--border-subtle);color:var(--text-secondary);padding:2px 6px;border-radius:8px;margin-top:2px;display:inline-block">✓ Watched</span>'
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

// ─── SHARED FRIEND-LIST FETCH ─────────────────────────────────────────────────
// runCompatibility and runFriendRecs both need the same friend's MediaListCollection.
// Rather than two back-to-back AniList requests (which triggers CORS-preflight
// rate limits → "Failed to fetch"), we fetch once and cache for 30 s so both
// callers share the result within a single "Look up" flow.
let _friendListCache = { username: null, platform: null, data: null, ts: 0 };
const FRIEND_CACHE_TTL = 30_000; // 30 seconds

async function _fetchFriendList(username) {
  const now = Date.now();
  if (
    _friendListCache.username === username &&
    _friendListCache.platform === _socialPlatform &&
    _friendListCache.data &&
    now - _friendListCache.ts < FRIEND_CACHE_TTL
  ) {
    return _friendListCache.data; // reuse — saves an AniList round-trip
  }

  const query = `
    query ($username: String) {
      MediaListCollection(userName: $username, type: ANIME) {
        lists {
          entries {
            score status
            media {
              id idMal
              title { romaji english }
              coverImage { large medium }
              averageScore genres format
            }
          }
        }
      }
    }`;

  const retryDelays = [1000, 2000, 3000];
  let data;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { username } }),
      });
      if (res.status === 429) {
        if (attempt === 2) throw new Error('AniList rate limit — please wait a moment and try again.');
        await new Promise(r => setTimeout(r, retryDelays[attempt]));
        continue;
      }
      if (!res.ok) throw new Error('HTTP ' + res.status);
      data = await res.json();
      break;
    } catch (err) {
      if (attempt === 2) throw new Error(_anilistErrMsg(err));
      await new Promise(r => setTimeout(r, retryDelays[attempt]));
    }
  }

  if (data.errors) throw new Error(data.errors[0].message);

  _friendListCache = { username, platform: _socialPlatform, data, ts: Date.now() };
  return data;
}

// ─── COMPATIBILITY ────────────────────────────────────────────────────────────
async function runCompatibility() {
  const username2 = byId(IDS.compatUsernameInput).value.trim();
  if (!username2) return;
  if (_socialPlatform === 'mal') return _runCompatibilityMal(username2);

  const resultsEl = byId(IDS.compatResults);
  resultsEl.innerHTML = '<p style="color:#8b949e;text-align:center;padding:20px 0">⏳ Fetching ' + username2 + '\'s list…</p>';

  try {
    // Use shared cache — avoids a second AniList round-trip when called right
    // after runFriendRecs (or vice-versa) within the same "Look up" flow.
    const data = await _fetchFriendList(username2);

    const WATCHED = new Set(['COMPLETED', 'CURRENT', 'REPEATING']);
    // flatMap across all lists then deduplicate by media ID — AniList users can
    // have the same anime in both a standard list and a custom list simultaneously,
    // which would otherwise create duplicate entries in otherById.
    const otherEntries = [...new Map(
      data.data.MediaListCollection.lists
        .flatMap(l => l.entries)
        .filter(e => WATCHED.has(e.status))
        .map(e => [e.media.id, e])
    ).values()];

    // Build rank maps
    // User 1: ELO rank
    const myRanked = [...animeList].sort((a, b) => b.elo - a.elo);
    const myRankMap = new Map(myRanked.map((a, i) => [a.id, i + 1]));

    // User 2: lookup by id (full-list rank vs. the other user is computed on
    // the overlap subset below — a global rank map isn't exposed in the UI).
    const otherById = new Map(otherEntries.map(e => [e.media.id, e]));

    // Overlap = any anime both users have watched (no score requirement).
    // Deduplicate by ID in case animeList has accumulated duplicate entries
    // (e.g. from successive syncs) — duplicates would make the same title
    // appear twice in the disagreements / agreements lists.
    const overlap = [...new Map(
      animeList.filter(a => otherById.has(a.id)).map(a => [a.id, a])
    ).values()];

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

    // Save comparison to localStorage — maintain a history array so we can
    // show taste-drift labels on subsequent runs.
    const savedComps  = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.savedComparisons) || '[]');
    const existingIdx = savedComps.findIndex(c => c.username.toLowerCase() === username2.toLowerCase());
    const prevEntry   = existingIdx >= 0 ? savedComps[existingIdx] : null;
    const prevScore   = prevEntry?.score ?? null;
    const prevHistory = prevEntry?.history ?? [];
    const today       = new Date().toISOString().split('T')[0];
    const delta       = prevScore !== null ? pct - prevScore : null;
    const entry = {
      username: username2,
      score: pct,
      label: labelFor(pct),
      emoji: emojiFor(pct),
      date: today,
      history: [{ score: pct, date: today }, ...prevHistory].slice(0, 12),
    };
    if (existingIdx >= 0) savedComps[existingIdx] = entry;
    else savedComps.unshift(entry);
    localStorage.setItem(KESSEN_KEYS.data.savedComparisons, JSON.stringify(savedComps.slice(0, 10)));

    // Inject delta into the result box now that we know it
    const dLabel = _compatDeltaLabel(delta);
    if (dLabel) {
      const box = resultsEl.querySelector('.compat-score-box');
      if (box) {
        const dEl = document.createElement('div');
        dEl.className = 'compat-delta';
        dEl.style.color = dLabel.color;
        dEl.textContent = `${dLabel.arrow} ${delta > 0 ? '+' : ''}${delta}% since last check · ${dLabel.text}`;
        box.appendChild(dEl);
      }
    }

    _renderSavedComparisons();

  } catch (err) {
    renderErrorInto(resultsEl, _anilistErrMsg(err), 'padding:16px 0');
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

    // Overlap: user's ranked anime that the friend also has on MAL.
    // Deduplicate by AniList ID for the same reason as the AniList path above.
    const overlap = [...new Map(
      animeList.filter(a => a.idMal && otherByMalId.has(a.idMal)).map(a => [a.id, a])
    ).values()];
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
    const savedComps  = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.savedComparisons) || '[]');
    const storageKey  = `${username2} [MAL]`;
    const existingIdx = savedComps.findIndex(c => c.username.toLowerCase() === storageKey.toLowerCase());
    const prevEntry   = existingIdx >= 0 ? savedComps[existingIdx] : null;
    const prevScore   = prevEntry?.score ?? null;
    const prevHistory = prevEntry?.history ?? [];
    const today       = new Date().toISOString().split('T')[0];
    const delta       = prevScore !== null ? pct - prevScore : null;
    const entry = { username: storageKey, platform: 'mal', score: pct, label: labelFor(pct), emoji: emojiFor(pct), date: today,
      history: [{ score: pct, date: today }, ...prevHistory].slice(0, 12) };
    if (existingIdx >= 0) savedComps[existingIdx] = entry;
    else savedComps.unshift(entry);
    localStorage.setItem(KESSEN_KEYS.data.savedComparisons, JSON.stringify(savedComps.slice(0, 10)));

    // Inject delta into the result box
    const dLabel = _compatDeltaLabel(delta);
    if (dLabel) {
      const box = resultsEl.querySelector('.compat-score-box');
      if (box) {
        const dEl = document.createElement('div');
        dEl.className = 'compat-delta';
        dEl.style.color = dLabel.color;
        dEl.textContent = `${dLabel.arrow} ${delta > 0 ? '+' : ''}${delta}% since last check · ${dLabel.text}`;
        box.appendChild(dEl);
      }
    }

    _renderSavedComparisons();

  } catch (err) {
    renderErrorInto(resultsEl, err.message, 'padding:16px 0');
  }
}

// Returns an anime-flavoured label for a compatibility delta, or null if the
// change is too small to be worth calling out (< 3 points).
function _compatDeltaLabel(delta) {
  if (delta === null || Math.abs(delta) < 3) return null;
  if (delta >= 15) return { text: "Fusion arc! You're basically the same person now 🌀",    color: '#3fb950', arrow: '▲▲' };
  if (delta >=  6) return { text: 'Friendship arc unlocked — your tastes are converging 🌸', color: '#3fb950', arrow: '▲'  };
  if (delta >=  3) return { text: 'Slowly drifting closer 📈',                               color: '#3fb950', arrow: '↑'  };
  if (delta <= -15) return { text: 'Forked at the source — totally different arcs 🔀',         color: '#f85149', arrow: '▼▼' };
  if (delta <=  -6) return { text: "You've transferred to different schools 🏫",              color: '#f85149', arrow: '▼'  };
  return                  { text: 'Your tastes are heading separate ways 📖',                 color: '#e3a000', arrow: '↓'  };
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
        const hist      = c.history || [];
        const prevScore = hist.length >= 2 ? hist[1].score : null;
        const delta     = prevScore !== null ? c.score - prevScore : null;
        const dLabel    = _compatDeltaLabel(delta);
        const deltaHtml = dLabel
          ? `<div class="scc-delta" style="color:${dLabel.color}">${dLabel.arrow} ${delta > 0 ? '+' : ''}${delta}% · ${dLabel.text}</div>`
          : '';
        return `
        <div class="saved-comp-card">
          <span style="font-size:1.2rem">${c.emoji}</span>
          <div style="min-width:0;flex:1">
            <div class="scc-name">${displayName}${platBadge}</div>
            <div class="scc-meta">${c.score}% · ${c.label} · ${c.date}</div>
            ${deltaHtml}
          </div>
          <button class="btn-small" onclick="_rerunComparison('${escapedUsername}','${platform}')">Re-run</button>
          <button class="btn-small challenge-pill-btn" onclick="openChallengeMode('${escapedUsername}','${platform}')" title="Challenge mode">🎮</button>
          <button class="btn-small" onclick="_deleteComparison('${escapedUsername}')" aria-label="Remove saved comparison">×</button>
        </div>`;
      }).join('')}
    </div>`;
}

// ─── CHALLENGE MODE ───────────────────────────────────────────────────────────
let _challengeState = null;

async function openChallengeMode(username, platform) {
  const modal = byId(IDS.challengeModal);
  modal.style.display = 'flex';
  const displayName = username.replace(/ \[MAL\]$/i, '');
  byId(IDS.challengeLoading).style.display = 'block';
  byId(IDS.challengeLoading).innerHTML =
    `<p style="color:#8b949e;text-align:center;padding:32px 0">⏳ Loading ${esc(displayName)}'s rankings…</p>`;
  byId(IDS.challengeGame).style.display = 'none';
  byId(IDS.challengeEnd).style.display  = 'none';

  try {
    // Map<id, {rank, score}> — rank 1 = their top pick; score kept so we can
    // discard tied pairs (same score = no genuine preference signal).
    let friendRankMap;

    if (platform === 'mal') {
      const entries = await _fetchMalUserList(displayName, null);
      const sorted  = [...entries].sort((a, b) => (b.score || 0) - (a.score || 0));
      friendRankMap = new Map(sorted.map((e, i) => [e.malId, { rank: i + 1, score: e.score || 0 }]));
    } else {
      // AniList — same query as compatibility, minus the cover/title (we have those locally)
      const query = `
        query ($username: String) {
          MediaListCollection(userName: $username, type: ANIME) {
            lists { entries { score status media { id } } }
          }
        }`;
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST', headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { username } })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (data.errors) throw new Error(data.errors[0].message);
      const WATCHED = new Set(['COMPLETED', 'CURRENT', 'REPEATING']);
      const entries = data.data.MediaListCollection.lists
        .flatMap(l => l.entries).filter(e => WATCHED.has(e.status));
      const sorted  = [...entries].sort((a, b) => (b.score || 0) - (a.score || 0));
      friendRankMap = new Map(sorted.map((e, i) => [e.media.id, { rank: i + 1, score: e.score || 0 }]));
    }

    const { pairs, mutualCount, reason } = _buildChallengePairs(friendRankMap, platform);

    if (reason !== 'ok') {
      const msg = reason === 'no_overlap'
        ? `You've only got ${mutualCount} anime in common — need at least 10 to play. Try running a compatibility check first to see your overlap.`
        : `${esc(displayName)} hasn't scored enough shows differently to make a fair game. Challenge mode needs clear preferences to work — if they rate everything the same score it can't tell what they actually prefer.`;
      byId(IDS.challengeLoading).innerHTML = `
        <p style="color:#8b949e;text-align:center;padding:24px 16px">${msg}</p>
        <div style="text-align:center;margin-top:12px">
          <button class="btn-secondary" onclick="closeChallengeModal()">Close</button>
        </div>`;
      return;
    }

    _challengeState = { username, platform, displayName, pairs, current: 0, score: 0, answers: [] };
    byId(IDS.challengeLoading).style.display = 'none';
    byId(IDS.challengeGame).style.display    = 'block';
    byId(IDS.challengeFriendName).textContent = displayName;
    _challengeRenderPair();

  } catch (err) {
    byId(IDS.challengeLoading).innerHTML = `
      <p style="color:#f85149;text-align:center;padding:24px 0">Error: ${esc(err.message)}</p>
      <div style="text-align:center;margin-top:12px">
        <button class="btn-secondary" onclick="closeChallengeModal()">Close</button>
      </div>`;
  }
}

function _buildChallengePairs(friendRankMap, platform) {
  const mutual = platform === 'mal'
    ? animeList.filter(a => a.idMal && friendRankMap.has(a.idMal))
    : animeList.filter(a => friendRankMap.has(a.id));

  if (mutual.length < 10) return { pairs: [], mutualCount: mutual.length, reason: 'no_overlap' };

  const withRank = mutual.map(a => {
    const entry = platform === 'mal' ? friendRankMap.get(a.idMal) : friendRankMap.get(a.id);
    return { anime: a, friendRank: entry.rank, friendScore: entry.score };
  });

  const n = withRank.length;
  // Sample up to 60 entries to keep pair generation fast (still gives 1770 candidate pairs)
  const pool = [...withRank].sort(() => Math.random() - 0.5).slice(0, 60);

  const buckets = { hard: [], medium: [], easy: [] };
  for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      const a = pool[i], b = pool[j];
      // Skip pairs where the friend scored both shows identically — no genuine preference
      if (a.friendScore === b.friendScore) continue;
      const gap    = Math.abs(a.friendRank - b.friendRank);
      const pctGap = gap / n;
      const pair   = {
        cardA:       a.anime,
        cardB:       b.anime,
        aFriendRank: a.friendRank,
        bFriendRank: b.friendRank,
        correct:     a.friendRank < b.friendRank ? 'a' : 'b',
        tight:       pctGap < 0.15,
      };
      if      (pctGap < 0.15) buckets.hard.push(pair);
      else if (pctGap < 0.35) buckets.medium.push(pair);
      else                    buckets.easy.push(pair);
    }
  }

  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  // Target mix: 2 hard (2pts each), 5 medium (1pt), 3 easy (1pt)
  let selected = [
    ...shuffle(buckets.hard).slice(0, 2),
    ...shuffle(buckets.medium).slice(0, 5),
    ...shuffle(buckets.easy).slice(0, 3),
  ];
  // Top up to 10 if any tier was short
  if (selected.length < 10) {
    const usedSet = new Set(selected);
    const extras  = shuffle([...buckets.hard, ...buckets.medium, ...buckets.easy]
      .filter(p => !usedSet.has(p)));
    selected = [...selected, ...extras].slice(0, 10);
  }
  const finalPairs = shuffle(selected);
  return {
    pairs:       finalPairs,
    mutualCount: mutual.length,
    reason:      finalPairs.length < 5 ? 'too_many_ties' : 'ok',
  };
}

function _challengeRenderPair() {
  const state = _challengeState;
  const pair  = state.pairs[state.current];
  const total = state.pairs.length;

  byId(IDS.challengeProgress).textContent  = `Round ${state.current + 1} of ${total}`;
  byId(IDS.challengeScoreLive).textContent = `${state.score} pts`;
  byId(IDS.challengeReveal).style.display  = 'none';
  byId(IDS.challengeNextBtn).textContent   = state.current + 1 < total ? 'Next →' : 'See Results →';

  const badge = byId(IDS.challengeDiffBadge);
  badge.textContent = pair.tight ? '🔥 Tight call — worth 2 pts' : '';
  badge.style.color = '#f85149';

  const renderCard = (elId, anime) => {
    const el        = byId(elId);
    el.className    = 'challenge-card';
    el.disabled     = false;
    el.innerHTML    = `
      <img src="${safeUrl(anime.cover)}" alt="${esc(anime.title)}" />
      <div class="challenge-card-title">${esc(anime.title)}</div>
      <div class="challenge-card-elo">Your ELO ${Math.round(anime.elo)}</div>`;
  };
  renderCard(IDS.challengeCardA, pair.cardA);
  renderCard(IDS.challengeCardB, pair.cardB);
}

function challengeAnswer(side) {
  const state = _challengeState;
  if (!state || byId(IDS.challengeCardA).disabled) return;
  const pair = state.pairs[state.current];

  byId(IDS.challengeCardA).disabled = true;
  byId(IDS.challengeCardB).disabled = true;

  const correct = side === pair.correct;
  const pts     = correct ? (pair.tight ? 2 : 1) : 0;
  state.score  += pts;
  state.answers.push({ pair, chosen: side, correct, pts });

  byId(pair.correct === 'a' ? IDS.challengeCardA : IDS.challengeCardB).classList.add('challenge-correct');
  if (!correct) byId(side === 'a' ? IDS.challengeCardA : IDS.challengeCardB).classList.add('challenge-wrong');

  const higherAnime = pair.correct === 'a' ? pair.cardA : pair.cardB;
  const lowerAnime  = pair.correct === 'a' ? pair.cardB : pair.cardA;
  const hi = Math.min(pair.aFriendRank, pair.bFriendRank);
  const lo = Math.max(pair.aFriendRank, pair.bFriendRank);

  byId(IDS.challengeRevealText).innerHTML = correct
    ? `<span class="ch-correct-msg">✓ Correct${pair.tight ? ' +2 pts!' : ''}</span>
       ${esc(state.displayName)} had <strong>${esc(higherAnime.title)}</strong> at #${hi}
       and <strong>${esc(lowerAnime.title)}</strong> at #${lo}`
    : `<span class="ch-wrong-msg">✗ Wrong</span>
       They actually preferred <strong>${esc(higherAnime.title)}</strong> — #${hi} vs #${lo}`;
  byId(IDS.challengeReveal).style.display = 'block';
  byId(IDS.challengeScoreLive).textContent = `${state.score} pts`;
}

function challengeNext() {
  const state = _challengeState;
  if (!state) return;
  state.current++;
  if (state.current >= state.pairs.length) _challengeShowEnd();
  else _challengeRenderPair();
}

function _challengeShowEnd() {
  byId(IDS.challengeGame).style.display = 'none';
  byId(IDS.challengeEnd).style.display  = 'block';

  const state   = _challengeState;
  const correct = state.answers.filter(a => a.correct).length;
  const total   = state.answers.length;
  const maxPts  = state.answers.reduce((s, a) => s + (a.pair.tight ? 2 : 1), 0);
  const pct     = Math.round((correct / total) * 100);

  const label = pct >= 90 ? "You've been watching their watchlist 👀"
              : pct >= 70 ? "You know them well 🎯"
              : pct >= 50 ? "You think you know them 🤔"
              :             "Have you actually met? 😅";

  byId(IDS.challengeEndScore).innerHTML = `
    <div class="ch-end-score">${correct} <span style="font-size:1.2rem;color:#8b949e">/ ${total}</span></div>
    <div class="ch-end-pts">${state.score} / ${maxPts} pts</div>
    <div class="ch-end-label">${esc(label)}</div>
    <p style="font-size:0.78rem;color:#8b949e;margin:6px 0 0">Guessing ${esc(state.displayName)}'s rankings</p>`;

  byId(IDS.challengeBreakdown).innerHTML = state.answers.map(a => {
    const hi = Math.min(a.pair.aFriendRank, a.pair.bFriendRank);
    const lo = Math.max(a.pair.aFriendRank, a.pair.bFriendRank);
    const winner = a.pair.correct === 'a' ? a.pair.cardA : a.pair.cardB;
    const loser  = a.pair.correct === 'a' ? a.pair.cardB : a.pair.cardA;
    return `<div class="ch-breakdown-item ${a.correct ? 'ch-b-correct' : 'ch-b-wrong'}">
      <span class="ch-b-icon">${a.correct ? '✓' : '✗'}</span>
      <span class="ch-b-text">
        <span class="ch-b-winner">${esc(winner.title)}</span>
        <span class="ch-b-ranks">#${hi} › #${lo}</span>
        <span class="ch-b-loser">${esc(loser.title)}</span>
      </span>
      <span class="ch-b-pts">${a.pts > 0 ? '+' + a.pts : '—'}</span>
    </div>`;
  }).join('');
}

function closeChallengeModal() {
  byId(IDS.challengeModal).style.display = 'none';
  _challengeState = null;
}

// ─── COLLABORATIVE "WATCH TOGETHER" MODE ──────────────────────────────────────
// Firebase config is loaded at runtime from /.netlify/functions/firebase-config
// so the API key is never present in the static bundle or source control.
// _FIREBASE_READY flips to true once the fetch resolves successfully.
// Firebase features (collab, real-time sync) silently no-op until then.
let _FIREBASE_CONFIG = null;
let _FIREBASE_READY  = false;
let _firebaseApp     = null;

// Kick off the config fetch immediately on script parse — it resolves long
// before any user interaction can trigger a Firebase operation.
(async function _loadFirebaseConfig() {
  try {
    // Guard: the SDK scripts (firebase-app-compat.js etc.) must have loaded
    // from the CDN. If they didn't (network blip, ad blocker, slow CDN during
    // a cache-bust), keep _FIREBASE_READY false so Firebase UI stays hidden
    // and we never call firebase.database() on an undefined global.
    if (typeof firebase === 'undefined') return;

    const res = await fetch('/.netlify/functions/firebase-config');
    if (!res.ok) return;
    const cfg = await res.json();
    if (!cfg.apiKey || !cfg.databaseURL) return;
    _FIREBASE_CONFIG = cfg;
    _FIREBASE_READY  = true;
  } catch {
    // Local dev or function unavailable — Firebase features stay disabled.
  }
})();

function _initFirebase() {
  if (_firebaseApp || !_FIREBASE_READY || !_FIREBASE_CONFIG) return;
  try { _firebaseApp = firebase.initializeApp(_FIREBASE_CONFIG); } catch (e) { /* already initialised */ }
}

let _collab = null;

// Resolves true if Firebase RTDB is connected within timeoutMs, false otherwise.
// Uses the special .info/connected ref which Firebase updates synchronously.
function _waitForFirebaseConnection(timeoutMs = 8000) {
  return new Promise(resolve => {
    if (!_FIREBASE_READY || typeof firebase === 'undefined') { resolve(false); return; }
    _initFirebase();
    if (!_firebaseApp) { resolve(false); return; }
    const connRef = firebase.database().ref('.info/connected');
    let settled = false;
    const finish = val => {
      if (settled) return;
      settled = true;
      connRef.off('value', handler);
      clearTimeout(timer);
      resolve(val);
    };
    const handler = snap => { if (snap.val() === true) finish(true); };
    const timer = setTimeout(() => finish(false), timeoutMs);
    connRef.on('value', handler);
  });
}

const _COLLAB_PANELS = [
  'collabPanelMode', 'collabPanelSetup', 'collabPanelMultiSetup',
  'collabPanelMultiLobby', 'collabPanelNominate', 'collabPanelRounds',
  'collabPanelPass', 'collabPanelVote', 'collabPanelResults',
];

function _collabGeneratePlayerId() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ── SESSION STORAGE (for rejoin) ──────────────────────────────────────────────
function _collabSaveSession() {
  try {
    sessionStorage.setItem('kessen-collab', JSON.stringify({
      code:     _collab.sessionCode,
      playerId: _collab.myPlayerId,
      name:     _collab.myName,
    }));
  } catch {}
}

function _collabClearSession() {
  try { sessionStorage.removeItem('kessen-collab'); } catch {}
}

function _collabGetStoredSession() {
  try { return JSON.parse(sessionStorage.getItem('kessen-collab')); } catch { return null; }
}

function openCollabMode() {
  if (_collab?.unsubscribe) _collab.unsubscribe();
  _collab = {
    mode: null,
    // Single-device fields
    p1Name: 'Player 1', p2Name: 'Player 2',
    nominees: [[], []],
    currentNominator: 0,
    // Multi-device fields
    myPlayerId: _collabGeneratePlayerId(),
    myName: '',
    isHost: false,
    players: {},
    myNominees: [],
    sessionCode: null,
    firebaseRef: null,
    unsubscribe: null,
    presenceUnsub: null,
    // Shared voting state
    pool: [], pairs: [], currentPair: 0,
    votingPhase: 'p1', currentVote: {}, tieCount: 0, battles: [],
  };
  byId(IDS.collabModal).style.display = 'flex';
  _collabPanel(IDS.collabPanelMode);

  const multiBtn  = document.getElementById('collab-mode-multi-btn');
  const multiNote = document.getElementById('collab-multi-note');
  if (multiBtn)  multiBtn.style.display  = _FIREBASE_READY ? '' : 'none';
  if (multiNote) multiNote.style.display = _FIREBASE_READY ? 'none' : '';

  // Show rejoin banner if there's a saved session
  _collabCheckRejoinBanner();
}

function closeCollabModal() {
  if (_collab?.presenceUnsub) _collab.presenceUnsub();
  if (_collab?.unsubscribe)   _collab.unsubscribe();
  _collabClearSession(); // session ended intentionally — don't offer rejoin
  byId(IDS.collabModal).style.display = 'none';
  _collab = null;
}

// ── PRESENCE ──────────────────────────────────────────────────────────────────
function _collabSetupPresence(ref, pid) {
  const connRef = firebase.database().ref('.info/connected');
  const handler = snap => {
    if (!snap.val()) return;
    ref.child(`players/${pid}/connected`).set(true);
    ref.child(`players/${pid}/connected`).onDisconnect().set(false);
  };
  connRef.on('value', handler);
  if (_collab) _collab.presenceUnsub = () => connRef.off('value', handler);
}

// ── REJOIN BANNER ─────────────────────────────────────────────────────────────
function _collabCheckRejoinBanner() {
  if (!_FIREBASE_READY) return;
  const stored = _collabGetStoredSession();
  const banner = document.getElementById('collab-rejoin-banner');
  if (!stored || !banner) return;
  document.getElementById('collab-rejoin-desc').textContent =
    `Session ${stored.code} · playing as ${stored.name}`;
  banner.style.display = '';
}

function collabDismissRejoin() {
  _collabClearSession();
  const banner = document.getElementById('collab-rejoin-banner');
  if (banner) banner.style.display = 'none';
}

async function collabRejoinSession() {
  const stored = _collabGetStoredSession();
  if (!stored) return;
  _initFirebase();

  const btn = document.querySelector('#collab-rejoin-banner .collab-rejoin-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Rejoining…'; }

  try {
    const ref  = firebase.database().ref('collab-sessions/' + stored.code);
    const snap = await ref.once('value');

    if (!snap.exists() || !snap.val().players?.[stored.playerId]) {
      // Session gone or player no longer in it
      _collabClearSession();
      if (btn) { btn.disabled = false; btn.textContent = 'Rejoin'; }
      document.getElementById('collab-rejoin-desc').textContent =
        'Session has ended — please start a new one.';
      return;
    }

    const data = snap.val();
    _collab.myPlayerId  = stored.playerId;
    _collab.myName      = stored.name;
    _collab.mode        = 'multi';
    _collab.sessionCode = stored.code;
    _collab.firebaseRef = ref;
    _collab.players     = data.players || {};
    _collab.isHost      = data.hostId === stored.playerId;

    _collabSetupPresence(ref, stored.playerId);
    _collabSaveSession();
    _collabListenToSession(ref);

    // Sync to whatever phase the session is currently in
    _collabSyncFromFirebase(data);

  } catch (err) {
    console.error('collabRejoinSession error:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Rejoin'; }
  }
}

// ── HOST PROMOTION ────────────────────────────────────────────────────────────
function _collabMaybePromoteHost(data) {
  const hostId       = data.hostId;
  const hostPlayer   = data.players?.[hostId];
  const hostOnline   = hostPlayer?.connected !== false;
  if (hostOnline) return; // host is fine

  // Host is disconnected — promote the first connected player (by pid sort order)
  const connected = Object.entries(data.players || {})
    .filter(([, p]) => p.connected !== false)
    .sort(([a], [b]) => a.localeCompare(b));

  if (!connected.length) return;
  const [newHostId] = connected[0];
  if (newHostId !== _collab.myPlayerId) return; // not our turn to promote

  // We are being promoted — write the new hostId once
  _collab.isHost = true;
  _collab.firebaseRef.update({ hostId: _collab.myPlayerId });
}

function _collabPanel(idConstant) {
  _COLLAB_PANELS.forEach(k => {
    const el = byId(IDS[k]);
    if (el) el.style.display = 'none';
  });
  const el = byId(idConstant);
  if (el) el.style.display = 'block';
}

// ── MODE SELECTION ────────────────────────────────────────────────────────────
function collabChooseMode(mode) {
  _collab.mode = mode;
  _collabPanel(mode === 'single' ? IDS.collabPanelSetup : IDS.collabPanelMultiSetup);
}

// ── SINGLE DEVICE SETUP ───────────────────────────────────────────────────────
function collabStartSingle() {
  _collab.p1Name = byId(IDS.collabP1Name).value.trim() || 'Player 1';
  _collab.p2Name = byId(IDS.collabP2Name).value.trim() || 'Player 2';
  _collab.currentNominator = 0;
  _collabShowNominatePanel();
}

// ── MULTI DEVICE SETUP ────────────────────────────────────────────────────────
function collabMultiShowRole(role) {
  document.getElementById('collab-multi-create').style.display = role === 'host'  ? 'block' : 'none';
  document.getElementById('collab-multi-join').style.display   = role === 'guest' ? 'block' : 'none';
}

async function collabCreateSession() {
  if (!_FIREBASE_READY) return;
  const btn = document.getElementById('collab-multi-create')?.querySelector('button');
  if (btn) { btn.disabled = true; btn.textContent = 'Connecting…'; }

  // Stop sync listener so it doesn't interfere with the collab connection.
  _stopFirebaseSync();
  _initFirebase();

  if (btn) btn.textContent = 'Creating…';

  try {
    const name = byId(IDS.collabMultiName).value.trim() || 'Host';
    const code = _collabGenerateCode();
    _collab.isHost      = true;
    _collab.myName      = name;
    _collab.sessionCode = code;

    const pid = _collab.myPlayerId;
    const initialData = {
      phase: 'lobby',
      hostId: pid,
      players: { [pid]: { name, nominations: null, ready: false } },
      pairs: null, currentPair: 0,
      votes: null,
      results: null,
      createdAt: Date.now(),
    };

    const ref = firebase.database().ref('collab-sessions/' + code);

    // Race the write against a 20s timeout. Firebase queues writes when the
    // WebSocket isn't yet open and flushes them once connected — so this
    // handles a slow first-connect without blocking forever if truly offline.
    const writeTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Could not reach the session server.\n\nCheck your internet connection and try again.')), 20000)
    );
    await Promise.race([ref.set(initialData), writeTimeout]);
    ref.child('createdAt').onDisconnect().remove();

    _collab.firebaseRef = ref;
    _collab.players     = { [pid]: { name, nominations: [], ready: false } };

    // Show the lobby panel and render the player list immediately (don't wait for Firebase sync)
    byId(IDS.collabLobbyCode).textContent = code;
    _collabPanel(IDS.collabPanelMultiLobby);
    _collabRenderLobby({ phase: 'lobby', hostId: pid, players: _collab.players });

    // Set up presence and save session for rejoin
    _collabSetupPresence(ref, pid);
    _collabSaveSession();

    // Then start listening for other players
    _collabListenToSession(ref);
  } catch (err) {
    console.error('collabCreateSession error:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Create session →'; }
    alert(err.message || 'Could not create session — check your connection and try again.');
  }
}

async function collabJoinSession() {
  if (!_FIREBASE_READY) return;
  const code = (byId(IDS.collabJoinInput).value || '').trim().toUpperCase();
  const name = byId(IDS.collabMultiName).value.trim() || 'Guest';
  if (code.length !== 6) return;

  _stopFirebaseSync();
  _initFirebase();

  const ref = firebase.database().ref('collab-sessions/' + code);

  // Race the read against a 20s timeout (same pattern as collabCreateSession).
  const readTimeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), 20000)
  );
  let snap;
  try {
    snap = await Promise.race([ref.once('value'), readTimeout]);
  } catch {
    byId(IDS.collabJoinInput).style.borderColor = '#f85149';
    byId(IDS.collabJoinInput).placeholder = 'Could not reach server — check your connection';
    return;
  }
  if (!snap.exists()) {
    byId(IDS.collabJoinInput).style.borderColor = '#f85149';
    byId(IDS.collabJoinInput).placeholder = 'Code not found — check and try again';
    return;
  }
  const data = snap.val();
  if (data.phase !== 'lobby') {
    byId(IDS.collabJoinInput).style.borderColor = '#f85149';
    byId(IDS.collabJoinInput).placeholder = 'Session already started — too late to join';
    return;
  }

  const pid = _collab.myPlayerId;
  _collab.isHost  = false;
  _collab.myName  = name;
  _collab.sessionCode = code;
  _collab.firebaseRef = ref;

  await ref.update({ [`players/${pid}`]: { name, nominations: null, ready: false } });

  // Snapshot the full player list for immediate local render
  const freshSnap = await ref.child('players').once('value');
  _collab.players = freshSnap.val() || {};

  _collabSetupPresence(ref, pid);
  _collabSaveSession();

  _collabPanel(IDS.collabPanelMultiLobby);
  byId(IDS.collabLobbyCode).textContent = code;
  _collabRenderLobby({ phase: 'lobby', hostId: data.hostId, players: _collab.players });

  _collabListenToSession(ref);
}

function _collabGenerateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function _collabListenToSession(ref) {
  const handler = snap => {
    const data = snap.val();
    if (!data || !_collab) return;
    _collabSyncFromFirebase(data);
  };
  ref.on('value', handler);
  _collab.unsubscribe = () => ref.off('value', handler);
}

function collabHostStartNominations() {
  if (!_collab?.isHost || !_collab.firebaseRef) return;
  const playerCount = Object.keys(_collab.players || {}).length;
  if (playerCount < 2) return; // need at least 2
  _collab.firebaseRef.update({ phase: 'nominating' });
}

function _collabRenderLobby(data) {
  const players   = data.players || {};
  const playerArr = Object.entries(players);
  const connectedArr = playerArr.filter(([, p]) => p.connected !== false);
  const listEl    = byId(IDS.collabPlayerList);
  if (listEl) {
    listEl.innerHTML = playerArr.map(([pid, p]) => {
      const isMe      = pid === _collab.myPlayerId;
      const isH       = pid === data.hostId;
      const isOffline = p.connected === false;
      return `<div class="collab-lobby-player ${isOffline ? 'collab-lobby-disconnected' : ''}">
        <span class="collab-lobby-avatar">${(p.name || '?')[0].toUpperCase()}</span>
        <span class="collab-lobby-name">
          ${esc(p.name)}${isMe ? ' <em>(you)</em>' : ''}${isH ? ' 👑' : ''}
          ${isOffline ? '<span class="collab-disconnected-badge">disconnected</span>' : ''}
        </span>
      </div>`;
    }).join('');
  }
  const startBtn    = byId(IDS.collabStartNomsBtn);
  const guestStatus = byId(IDS.collabLobbyGuestStatus);
  if (_collab.isHost) {
    if (startBtn) {
      startBtn.style.display = '';
      startBtn.disabled = connectedArr.length < 2;
      startBtn.textContent = connectedArr.length < 2
        ? 'Waiting for at least one more player…'
        : `Everyone's in (${connectedArr.length} players) — start nominations →`;
    }
    if (guestStatus) guestStatus.style.display = 'none';
  } else {
    if (startBtn)    startBtn.style.display    = 'none';
    if (guestStatus) guestStatus.style.display = '';
  }
}

function _collabSyncFromFirebase(data) {
  if (!_collab) return;
  // Always update local players mirror and check for host promotion
  _collab.players = data.players || {};
  // Update isHost in case we were promoted
  if (data.hostId === _collab.myPlayerId) _collab.isHost = true;

  if (data.phase === 'lobby') {
    _collabRenderLobby(data);
    _collabMaybePromoteHost(data);
  }

  if (data.phase === 'nominating') {
    _collabMaybePromoteHost(data);
    const myPanel = byId(IDS.collabPanelNominate);
    if (!myPanel || myPanel.style.display === 'none') {
      _collabPanel(IDS.collabPanelNominate);
      _collabRefreshNominatePanel();
    }
    // Show other players' nomination progress (connected players only)
    const pid = _collab.myPlayerId;
    const others = Object.entries(data.players || {}).filter(([id]) => id !== pid);
    const friendEl = byId('collab-friend-nom-count');
    if (friendEl && others.length) {
      friendEl.innerHTML = others.map(([, p]) => {
        const n          = (p.nominations || []).length;
        const isOffline  = p.connected === false;
        const statusIcon = isOffline ? ' 🔌' : p.ready ? ' ✓' : '';
        return `<span class="collab-friend-pill ${isOffline ? 'collab-pill-offline' : ''}">${esc(p.name)}: ${n} show${n !== 1 ? 's' : ''}${statusIcon}</span>`;
      }).join('');
      friendEl.style.display = '';
    }
    // All connected players ready → host starts round picker
    const connectedPlayers = Object.values(data.players || {}).filter(p => p.connected !== false);
    const allReady = connectedPlayers.length >= 2 && connectedPlayers.every(p => p.ready);
    if (allReady && _collab.isHost) {
      _collab.nominees = Object.values(data.players || {})
        .filter(p => p.connected !== false)
        .map(p => p.nominations || []);
      _collabStartVoting();
    }
  }

  if (data.phase === 'voting') {
    _collab.pairs       = data.pairs       || [];
    _collab.currentPair = data.currentPair || 0;
    const votePanel = byId(IDS.collabPanelVote);
    if (!votePanel || votePanel.style.display === 'none') _collabPanel(IDS.collabPanelVote);
    _collabRenderVotePairMulti(data);
  }

  if (data.phase === 'results') {
    _collab.battles = data.results || [];
    // Rebuild pool from player nominations if not set
    if (!_collab.pool?.length) {
      const seen = new Set();
      _collab.pool = [];
      Object.values(data.players || {}).forEach(p => {
        (p.nominations || []).forEach(n => {
          if (!seen.has(n.title.toLowerCase())) { seen.add(n.title.toLowerCase()); _collab.pool.push(n); }
        });
      });
    }
    _collabPanel(IDS.collabPanelResults);
    _collabRenderResults();
  }
}

// Helper: get this player's local nomination array
function _collabMyNoms() {
  if (_collab.mode === 'single') return _collab.nominees[_collab.currentNominator];
  return _collab.myNominees;
}

// ── NOMINATIONS ───────────────────────────────────────────────────────────────
function _collabShowNominatePanel() {
  _collabPanel(IDS.collabPanelNominate);
  _collabRefreshNominatePanel();
  byId(IDS.collabSearch).value = '';
  byId(IDS.collabSearchResults).innerHTML = '';
}

function _collabRefreshNominatePanel() {
  if (_collab.mode === 'single') {
    const name = _collab.currentNominator === 0 ? _collab.p1Name : _collab.p2Name;
    byId(IDS.collabNominateTitle).textContent = `${name} — nominate up to 5 shows`;
  } else {
    byId(IDS.collabNominateTitle).textContent = `${_collab.myName || 'You'} — nominate up to 5 shows`;
  }
  _collabRenderNominations();
  // Hide friend count in single mode
  const friendEl = byId('collab-friend-nom-count');
  if (friendEl) friendEl.style.display = _collab.mode === 'multi' ? '' : 'none';
}

// Cached search results — avoids passing strings through inline onclick attributes
let _collabSearchCache = [];
let _collabSearchDebounce = null;
let _collabSearchSeq = 0; // prevents stale AniList responses overwriting newer results

// Returns a Map of { titleLower → playerName } for every show already nominated
// by OTHER players (not the current nominator).
function _collabOthersNomMap() {
  const map = new Map();
  const myNomSet = new Set(_collabMyNoms().map(n => n.title.toLowerCase()));

  if (_collab.mode === 'multi') {
    const myPid = _collab.myPlayerId;
    Object.entries(_collab.players || {}).forEach(([pid, p]) => {
      if (pid === myPid) return;
      (p.nominations || []).forEach(n => {
        const key = n.title.toLowerCase();
        if (!myNomSet.has(key)) map.set(key, p.name || 'Someone');
      });
    });
  } else {
    // Single device: other nominator's list
    const otherIdx = _collab.currentNominator === 0 ? 1 : 0;
    (_collab.nominees[otherIdx] || []).forEach(n => {
      const key = n.title.toLowerCase();
      if (!myNomSet.has(key)) map.set(key, otherIdx === 0 ? _collab.p1Name : _collab.p2Name);
    });
  }
  return map;
}

function collabSearch() {
  const raw = byId(IDS.collabSearch).value.trim();
  const q   = raw.toLowerCase();
  const res = byId(IDS.collabSearchResults);
  clearTimeout(_collabSearchDebounce);

  if (!q) { res.innerHTML = ''; _collabSearchCache = []; _collabSearchSeq++; return; }

  const already   = new Set(_collabMyNoms().map(n => n.title.toLowerCase()));
  const takenBy   = _collabOthersNomMap(); // titleLower → playerName

  // ── 1. Instant local results ──────────────────────────────────────────────
  const localMatches = animeList
    .filter(a => (a.title || '').toLowerCase().includes(q) || (a.titleEn || '').toLowerCase().includes(q))
    .slice(0, 5);

  _collabSearchCache = localMatches.map(a => ({ title: a.title, cover: a.cover || '', id: a.id, local: true }));

  _collabRenderSearchRows(res, raw, already, takenBy, /* anilistLoading */ true);

  // ── 2. AniList lookup after debounce ─────────────────────────────────────
  const seq = ++_collabSearchSeq;
  _collabSearchDebounce = setTimeout(async () => {
    const gqlQuery = `
      query($search: String) {
        Page(perPage: 8) {
          media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
            id title { romaji english } coverImage { medium }
          }
        }
      }`;
    try {
      const resp = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: anilistHeaders(),
        body: JSON.stringify({ query: gqlQuery, variables: { search: raw } }),
      });
      if (seq !== _collabSearchSeq) return;
      const json  = await resp.json();
      const items = json?.data?.Page?.media ?? [];

      const localTitles = new Set(_collabSearchCache.map(c => c.title.toLowerCase()));
      for (const m of items) {
        const title = m.title.english || m.title.romaji;
        if (!title || localTitles.has(title.toLowerCase())) continue;
        _collabSearchCache.push({ title, cover: m.coverImage?.medium || '', id: m.id, local: false });
        localTitles.add(title.toLowerCase());
      }
    } catch { /* network error — just show local results */ }

    if (seq !== _collabSearchSeq) return;
    _collabRenderSearchRows(res, raw, already, takenBy, /* anilistLoading */ false);
  }, 350);
}

function _collabRenderSearchRows(res, raw, already, takenBy, anilistLoading) {
  const rows = _collabSearchCache.map((item, idx) => {
    const titleLower = item.title.toLowerCase();
    const addedByMe  = already.has(titleLower);
    const takenName  = takenBy?.get(titleLower);   // name of player who picked it, or undefined
    const blocked    = addedByMe || !!takenName;
    const sourceBadge = item.local ? '' : '<span class="collab-search-source">AniList</span>';

    let statusBadge = '';
    if (addedByMe)  statusBadge = '<span class="collab-added-badge">✓ Added</span>';
    else if (takenName) statusBadge = `<span class="collab-taken-badge">📌 ${esc(takenName)}</span>`;

    return `<div class="collab-search-item ${blocked ? 'collab-search-added' : ''}"
      onclick="${blocked ? '' : `collabPickFromSearch(${idx})`}">
      ${item.cover ? `<img src="${safeUrl(item.cover)}" alt="" />` : '<div class="collab-search-no-cover">🎬</div>'}
      <span class="collab-search-name">${esc(item.title)}</span>
      ${sourceBadge}
      ${statusBadge}
    </div>`;
  });

  if (anilistLoading) {
    rows.push(`<div class="collab-search-loading">🔍 Searching AniList…</div>`);
  }

  // Manual add — only if not already in pool by anyone
  const rawLower = raw.toLowerCase();
  const inCache  = _collabSearchCache.some(c => c.title.toLowerCase() === rawLower);
  const blocked  = already.has(rawLower) || takenBy?.has(rawLower);
  if (!inCache && !blocked) {
    const manualIdx = _collabSearchCache.length;
    _collabSearchCache.push({ title: raw, cover: '', id: null, local: true });
    rows.push(`<div class="collab-search-item collab-search-manual"
      onclick="collabPickFromSearch(${manualIdx})">
      <span style="font-size:1.2rem">➕</span>
      <span class="collab-search-name">Add "${esc(raw)}" as custom show</span>
    </div>`);
  }

  res.innerHTML = rows.length
    ? rows.join('')
    : `<div class="collab-search-empty">No matches found</div>`;
}

function collabPickFromSearch(idx) {
  const item = _collabSearchCache[idx];
  if (item) collabAddNomination(item.title, item.cover, item.id);
}

function collabAddNomination(title, cover, id) {
  const noms = _collabMyNoms();
  if (noms.length >= 5) return;
  if (noms.some(n => n.title.toLowerCase() === title.toLowerCase())) return;
  noms.push({ title, cover: cover || '', id: id || null });
  _collabRenderNominations();
  byId(IDS.collabSearch).value = '';
  byId(IDS.collabSearchResults).innerHTML = '';
  // Sync to Firebase
  if (_collab.mode === 'multi' && _collab.firebaseRef) {
    const pid = _collab.myPlayerId;
    _collab.firebaseRef.update({ [`players/${pid}/nominations`]: noms });
  }
}

function collabRemoveNomination(idx) {
  const noms = _collabMyNoms();
  noms.splice(idx, 1);
  _collabRenderNominations();
  // Sync removal to Firebase too
  if (_collab.mode === 'multi' && _collab.firebaseRef) {
    const pid = _collab.myPlayerId;
    _collab.firebaseRef.update({ [`players/${pid}/nominations`]: noms });
  }
}

function _collabRenderNominations() {
  const noms = _collabMyNoms();
  byId(IDS.collabNominateCount).textContent = `${noms.length} / 5`;
  byId(IDS.collabNominationsList).innerHTML = noms.map((n, idx) => `
    <div class="collab-nom-item">
      ${n.cover ? `<img src="${safeUrl(n.cover)}" alt="" />` : '<div class="collab-nom-cover-placeholder">🎬</div>'}
      <span class="collab-nom-title">${esc(n.title)}</span>
      <button class="collab-nom-remove" onclick="collabRemoveNomination(${idx})" aria-label="Remove">✕</button>
    </div>`).join('') || '<p class="collab-nom-empty">Nothing yet — search above to add shows</p>';
}

function collabConfirmNominations() {
  const noms = _collabMyNoms();
  if (noms.length === 0) { byId(IDS.collabSearch).focus(); return; }

  if (_collab.mode === 'single') {
    if (_collab.currentNominator === 0) {
      _collab.currentNominator = 1;
      byId(IDS.collabPassName).textContent = _collab.p2Name;
      _collabPanel(IDS.collabPanelPass);
    } else {
      _collabStartVoting();
    }
  } else {
    // Multi: mark self ready in Firebase
    const pid = _collab.myPlayerId;
    _collab.firebaseRef.update({ [`players/${pid}/ready`]: true, [`players/${pid}/nominations`]: noms });
    const btn = document.getElementById('collab-confirm-btn');
    if (btn) { btn.disabled = true; btn.textContent = `⏳ Waiting for others…`; }
  }
}

function collabPassReveal() {
  // P2 confirms ready to nominate on same device
  _collabShowNominatePanel();
}

// ── VOTING ────────────────────────────────────────────────────────────────────
function _collabBuildPairs(pool, limit) {
  const all = [];
  for (let i = 0; i < pool.length; i++)
    for (let j = i + 1; j < pool.length; j++)
      all.push({ a: pool[i], b: pool[j] });
  all.sort(() => Math.random() - 0.5);
  const cap = (limit != null) ? Math.min(limit, all.length) : all.length;
  if (all.length <= cap) return all;
  // Ensure every show appears at least once when trimming
  const counts   = new Map(pool.map(s => [s.title, 0]));
  const selected = [];
  for (const pair of all) {
    if (selected.length >= cap) break;
    selected.push(pair);
    counts.set(pair.a.title, (counts.get(pair.a.title) || 0) + 1);
    counts.set(pair.b.title, (counts.get(pair.b.title) || 0) + 1);
  }
  return selected;
}

// ── ROUND PICKER ─────────────────────────────────────────────────────────────
let _collabRoundPool      = [];
let _collabRoundPlayers   = 2;
let _collabChosenRounds   = 10;
let _collabRecommended    = 10;

// Player confidence multiplier — more voters per round = more reliable each matchup
function _collabPlayerConfidence(playerCount) {
  const n = playerCount || 2;
  if (n >= 6) return 2.0;
  if (n === 5) return 1.75;
  if (n === 4) return 1.5;
  if (n === 3) return 1.25;
  return 1.0; // 2 players
}

function _collabRecommendRounds(poolSize, playerCount) {
  const total      = (poolSize * (poolSize - 1)) / 2;
  if (total <= 6) return total;  // tiny pool → always do full round-robin
  const confidence = _collabPlayerConfidence(playerCount);
  const base       = Math.round(poolSize * 1.5);
  const rec        = Math.max(poolSize, Math.round(base / confidence));
  return Math.min(rec, total);   // never exceed total possible pairs
}

function _collabRoundsStats(rounds, poolSize, playerCount) {
  const n          = playerCount || 2;
  const totalPairs = (poolSize * (poolSize - 1)) / 2;
  const coverage   = totalPairs > 0 ? rounds / totalPairs : 1;

  // Effective accuracy improves with more players — more voters = more signal per round
  const confidence    = _collabPlayerConfidence(n);
  const effectiveCov  = Math.min(coverage * confidence, 1);

  // Time: more players = longer to collect all votes before reveal
  const secsPerRound = n <= 2 ? 30 : n === 3 ? 40 : n === 4 ? 50 : 60;
  const mins = Math.round((rounds * secsPerRound) / 60);
  const timeStr = mins < 1 ? 'under a minute' : `~${mins} min${mins !== 1 ? 's' : ''}`;

  let accuracyLabel, accuracyDesc, accuracyCls;
  if (effectiveCov >= 0.9) {
    accuracyLabel = 'Very High'; accuracyDesc = 'Near-complete coverage — the winner will be clear.'; accuracyCls = 'rounds-acc-high';
  } else if (effectiveCov >= 0.6) {
    accuracyLabel = 'High'; accuracyDesc = 'Good coverage — a clear winner should emerge.'; accuracyCls = 'rounds-acc-high';
  } else if (effectiveCov >= 0.35) {
    accuracyLabel = 'Good'; accuracyDesc = 'Most shows get a fair shot — result should hold.'; accuracyCls = 'rounds-acc-med';
  } else if (effectiveCov >= 0.18) {
    accuracyLabel = 'Fair'; accuracyDesc = 'Quick and decisive, though the winner could vary.'; accuracyCls = 'rounds-acc-low';
  } else {
    accuracyLabel = 'Gut-check'; accuracyDesc = 'More of a vibe than a ranking — fast and fun though!'; accuracyCls = 'rounds-acc-gut';
  }

  const playerBoostNote = n > 2
    ? `<div class="collab-rounds-stat-row">
        <span class="collab-rounds-stat-icon">👥</span>
        <span>${n} voters per round gives <strong class="rounds-acc-high">+${Math.round((confidence - 1) * 100)}% confidence</strong> per matchup vs 2 players</span>
       </div>`
    : '';

  const isRec = rounds === _collabRecommended;
  return `
    <div class="collab-rounds-stat-row">
      <span class="collab-rounds-stat-icon">⏱</span>
      <span>Time estimate: <strong>${timeStr}</strong></span>
    </div>
    <div class="collab-rounds-stat-row">
      <span class="collab-rounds-stat-icon">📊</span>
      <span>Pair coverage: <strong>${Math.round(coverage * 100)}%</strong> of all possible matchups</span>
    </div>
    ${playerBoostNote}
    <div class="collab-rounds-stat-row">
      <span class="collab-rounds-stat-icon">🎯</span>
      <span>Result accuracy: <strong class="${accuracyCls}">${accuracyLabel}</strong> — ${accuracyDesc}</span>
    </div>
    ${isRec ? '<div class="collab-rounds-rec-badge">✨ This is our recommended setting</div>' : ''}
  `;
}

function _collabShowRoundPicker(pool) {
  _collabRoundPool    = pool;
  _collabRoundPlayers = _collab.mode === 'multi'
    ? Object.keys(_collab.players || {}).length
    : 2; // single device is always 2
  _collabRecommended  = _collabRecommendRounds(pool.length, _collabRoundPlayers);
  _collabChosenRounds = _collabRecommended;

  byId('collab-rounds-pool-count').textContent = pool.length;
  byId('collab-rounds-rec-val').textContent    = _collabRecommended;
  byId('collab-rounds-value').textContent      = _collabChosenRounds;
  byId('collab-rounds-stats').innerHTML        = _collabRoundsStats(_collabChosenRounds, pool.length, _collabRoundPlayers);

  _collabPanel(IDS.collabPanelRounds);
}

function collabAdjustRounds(delta) {
  const totalPairs = (_collabRoundPool.length * (_collabRoundPool.length - 1)) / 2;
  _collabChosenRounds = Math.max(1, Math.min(totalPairs, _collabChosenRounds + delta));
  byId('collab-rounds-value').textContent = _collabChosenRounds;
  byId('collab-rounds-stats').innerHTML   = _collabRoundsStats(_collabChosenRounds, _collabRoundPool.length, _collabRoundPlayers);
}

function collabStartWithRounds() {
  const pool = _collabRoundPool;
  _collab.pool    = pool;
  _collab.pairs   = _collabBuildPairs(pool, _collabChosenRounds);
  _collab.battles = [];
  _collab.currentPair = 0;

  if (_collab.mode === 'multi' && _collab.firebaseRef) {
    // Build a null vote slot for every player
    const initialVotes = Object.fromEntries(
      Object.keys(_collab.players).map(pid => [pid, null])
    );
    _collab.firebaseRef.update({
      phase: 'voting', pairs: _collab.pairs, currentPair: 0,
      votes: initialVotes,
    });
  } else {
    _collabPanel(IDS.collabPanelVote);
    _collabRenderVotePair();
  }
}

function _collabStartVoting() {
  // Merge and deduplicate nominations into pool
  const seen = new Set();
  const pool = [];
  for (const noms of _collab.nominees)
    for (const n of noms)
      if (!seen.has(n.title.toLowerCase())) { seen.add(n.title.toLowerCase()); pool.push(n); }

  // Show round picker before voting begins
  _collabShowRoundPicker(pool);
}

function _collabRenderVotePair() {
  const pair  = _collab.pairs[_collab.currentPair];
  const total = _collab.pairs.length;
  if (!pair) { _collabShowResults(); return; }
  _collab.votingPhase = 'p1';
  _collab.currentVote = {};
  _collab.tieCount    = 0;

  byId(IDS.collabVoteProgress).textContent = `Match ${_collab.currentPair + 1} of ${total}`;
  byId(IDS.collabVoteReveal).style.display = 'none';
  byId(IDS.collabVoteNextBtn).style.display = 'none';
  document.getElementById('collab-tiebreak-btn').style.display  = 'none';
  document.getElementById('collab-p2-ready-btn').style.display  = 'none';
  _collabSetVoteHeading('p1');
  _collabRenderVoteCards(pair);
}

function _collabSetVoteHeading(who) {
  const name  = who === 'p1' ? _collab.p1Name : _collab.p2Name;
  const other = who === 'p1' ? _collab.p2Name : _collab.p1Name;
  document.getElementById('collab-vote-who').textContent = `${name} — tap your pick`;
  document.getElementById('collab-vote-sub').textContent = `(${other}, don't look yet!)`;
}

function _collabRenderVoteCards(pair) {
  [IDS.collabCardA, IDS.collabCardB].forEach((elId, idx) => {
    const show = idx === 0 ? pair.a : pair.b;
    const el   = byId(elId);
    el.className = 'challenge-card collab-vote-card';
    el.disabled  = false;
    el.innerHTML = `
      ${show.cover ? `<img src="${safeUrl(show.cover)}" alt="${esc(show.title)}" />` : '<div class="collab-no-cover">🎬</div>'}
      <div class="challenge-card-title">${esc(show.title)}</div>`;
  });
}

function collabVoteBtn(side) {
  if (!_collab) return;
  if (_collab.mode === 'multi') { collabVoteMulti(side); return; }
  const phase = _collab.votingPhase;
  if (phase === 'p1') {
    _collab.currentVote.p1 = side;
    _collab.votingPhase    = 'pass-to-p2';
    byId(IDS.collabCardA).disabled = true;
    byId(IDS.collabCardB).disabled = true;
    document.getElementById('collab-vote-who').textContent = `✓ ${_collab.p1Name} has voted`;
    document.getElementById('collab-vote-sub').textContent = `Pass to ${_collab.p2Name}`;
    document.getElementById('collab-p2-ready-btn').style.display = 'block';
  } else if (phase === 'p2') {
    _collab.currentVote.p2 = side;
    _collab.votingPhase    = 'reveal';
    _collabRevealVotes();
  }
}

function collabP2Ready() {
  _collab.votingPhase = 'p2';
  document.getElementById('collab-p2-ready-btn').style.display = 'none';
  _collabSetVoteHeading('p2');
  byId(IDS.collabCardA).disabled = false;
  byId(IDS.collabCardB).disabled = false;
}

function _collabRevealVotes() {
  const { p1, p2 } = _collab.currentVote;
  const pair = _collab.pairs[_collab.currentPair];
  byId(IDS.collabCardA).disabled = true;
  byId(IDS.collabCardB).disabled = true;
  document.getElementById('collab-vote-who').textContent = '';
  document.getElementById('collab-vote-sub').textContent = '';

  const aEl = byId(IDS.collabCardA);
  const bEl = byId(IDS.collabCardB);
  const revealText = byId(IDS.collabVoteRevealText);

  if (p1 === p2) {
    const winner = p1 === 'a' ? pair.a : pair.b;
    (p1 === 'a' ? aEl : bEl).classList.add('challenge-correct');
    (p1 === 'a' ? bEl : aEl).classList.add('challenge-wrong');
    revealText.innerHTML = `<span class="ch-correct-msg">✓ Unanimous!</span> You both chose <strong>${esc(winner.title)}</strong>`;
    _collab.battles.push({ a: pair.a, b: pair.b, winner: winner.title });
    byId(IDS.collabVoteNextBtn).style.display = 'block';
  } else {
    const p1Show = p1 === 'a' ? pair.a : pair.b;
    const p2Show = p2 === 'a' ? pair.a : pair.b;
    aEl.classList.add('collab-split-a'); bEl.classList.add('collab-split-b');
    revealText.innerHTML = `<span class="collab-split-msg">⚡ Split!</span>
      ${esc(_collab.p1Name)} chose <strong>${esc(p1Show.title)}</strong>,
      ${esc(_collab.p2Name)} chose <strong>${esc(p2Show.title)}</strong>
      <br><span class="collab-coinflip">Recorded as a tie 🤝</span>`;
    _collab.battles.push({ a: pair.a, b: pair.b, winner: null });
    byId(IDS.collabVoteNextBtn).style.display = 'block';
  }
  byId(IDS.collabVoteReveal).style.display = 'block';
}

function collabTiebreaker() {
  document.getElementById('collab-tiebreak-btn').style.display = 'none';
  byId(IDS.collabVoteReveal).style.display = 'none';
  _collab.votingPhase = 'p1'; _collab.currentVote = {};
  _collabRenderVoteCards(_collab.pairs[_collab.currentPair]);
  _collabSetVoteHeading('p1');
}

function collabNextPair() {
  _collab.currentPair++;
  byId(IDS.collabVoteNextBtn).style.display = 'none';
  document.getElementById('collab-tiebreak-btn').style.display = 'none';
  if (_collab.currentPair >= _collab.pairs.length) _collabShowResults();
  else _collabRenderVotePair();
}

// ── MULTI DEVICE VOTING ───────────────────────────────────────────────────────
async function collabVoteMulti(side) {
  if (!_collab?.firebaseRef) return;
  byId(IDS.collabCardA).disabled = true;
  byId(IDS.collabCardB).disabled = true;
  const totalPlayers = Object.keys(_collab.players || {}).length;
  document.getElementById('collab-vote-who').textContent = `✓ Voted — waiting for others…`;
  document.getElementById('collab-vote-sub').textContent = '';
  await _collab.firebaseRef.update({ [`votes/${_collab.myPlayerId}`]: side });
}

function _collabRenderVotePairMulti(data) {
  const idx          = data.currentPair || 0;
  const pair         = data.pairs?.[idx];
  if (!pair) return;

  const players         = data.players || {};
  const votes           = data.votes   || {};
  // Only count connected players — disconnected ones are excluded from voting
  const connectedPids   = Object.entries(players)
    .filter(([, p]) => p.connected !== false)
    .map(([pid]) => pid);
  const totalPlayers    = connectedPids.length;
  const votedCount      = connectedPids.filter(pid => votes[pid] === 'a' || votes[pid] === 'b').length;
  const allVoted        = totalPlayers > 0 && votedCount === totalPlayers;
  const myVote          = votes[_collab.myPlayerId];

  byId(IDS.collabVoteProgress).textContent = `Match ${idx + 1} of ${(data.pairs || []).length}`;
  byId(IDS.collabVoteReveal).style.display = 'none';
  byId(IDS.collabVoteNextBtn).style.display = 'none';
  document.getElementById('collab-p2-ready-btn').style.display = 'none';
  document.getElementById('collab-vote-sub').textContent = '';

  if (!myVote) {
    document.getElementById('collab-vote-who').textContent = 'Tap your pick';
    _collabRenderVoteCards(pair);
  } else {
    document.getElementById('collab-vote-who').textContent =
      allVoted ? 'All votes in!' : `✓ Voted — ${votedCount} of ${totalPlayers} voted`;
    byId(IDS.collabCardA).disabled = true;
    byId(IDS.collabCardB).disabled = true;
  }

  if (allVoted) {
    byId(IDS.collabCardA).disabled = true;
    byId(IDS.collabCardB).disabled = true;
    const revealText = byId(IDS.collabVoteRevealText);

    // Count votes
    const countA = Object.values(votes).filter(v => v === 'a').length;
    const countB = Object.values(votes).filter(v => v === 'b').length;
    const isTie  = countA === countB;
    const winner = isTie ? null : (countA > countB ? pair.a : pair.b);

    // Highlight cards
    if (winner) {
      const winSide = countA > countB ? 'a' : 'b';
      byId(winSide === 'a' ? IDS.collabCardA : IDS.collabCardB).classList.add('challenge-correct');
      byId(winSide === 'a' ? IDS.collabCardB : IDS.collabCardA).classList.add('challenge-wrong');
    } else {
      byId(IDS.collabCardA).classList.add('collab-split-a');
      byId(IDS.collabCardB).classList.add('collab-split-b');
    }

    // Build voter breakdown (who voted for what, note disconnected players)
    const voterLines = Object.entries(players).map(([pid, p]) => {
      const v         = votes[pid];
      const isOffline = p.connected === false;
      if (isOffline && !v) {
        return `<span class="collab-voter-line" style="opacity:0.5">${esc(p.name)} — disconnected 🔌</span>`;
      }
      const show = v === 'a' ? pair.a : pair.b;
      return `<span class="collab-voter-line">${esc(p.name)} → <strong>${esc(show.title)}</strong></span>`;
    }).join('');

    if (winner) {
      revealText.innerHTML = `<span class="ch-correct-msg">✓ ${countA === totalPlayers || countB === totalPlayers ? 'Unanimous!' : `${Math.max(countA, countB)}–${Math.min(countA, countB)}`}</span>
        <strong>${esc(winner.title)}</strong> wins!
        <div class="collab-voter-breakdown">${voterLines}</div>`;
    } else {
      revealText.innerHTML = `<span class="collab-split-msg">⚡ Dead heat — ${countA}–${countB}</span>
        <br><span class="collab-coinflip">Recorded as a tie 🤝</span>
        <div class="collab-voter-breakdown">${voterLines}</div>`;
    }

    byId(IDS.collabVoteReveal).style.display = 'block';

    // Host records battle and advances
    if (_collab.isHost) {
      const newBattles = [...(_collab.battles || []), {
        a: pair.a, b: pair.b,
        winner: winner ? winner.title : null,
      }];
      _collab.battles = newBattles;

      // Reset votes for all players
      const clearedVotes = Object.fromEntries(Object.keys(players).map(pid => [`votes/${pid}`, null]));

      setTimeout(() => {
        const nextIdx = idx + 1;
        if (nextIdx >= (data.pairs?.length || 0)) {
          _collab.firebaseRef.update({ phase: 'results', results: newBattles });
        } else {
          _collab.firebaseRef.update({ currentPair: nextIdx, ...clearedVotes });
        }
      }, 2800);
    }
  }
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function _collabShowResults() {
  _collabPanel(IDS.collabPanelResults);
  _collabRenderResults();
}

function _collabRenderResults() {
  // Tally wins and ties separately
  const wins = new Map(_collab.pool.map(s => [s.title, 0]));
  const ties  = new Map(_collab.pool.map(s => [s.title, 0]));

  _collab.battles.forEach(b => {
    if (b.winner === null) {
      // It was a tie — credit both shows (b.a / b.b are show objects)
      const titleA = (b.a?.title ?? b.a);
      const titleB = (b.b?.title ?? b.b);
      ties.set(titleA, (ties.get(titleA) || 0) + 1);
      ties.set(titleB, (ties.get(titleB) || 0) + 1);
    } else {
      wins.set(b.winner, (wins.get(b.winner) || 0) + 1);
    }
  });

  // Sort: wins desc → ties desc → coin flip for true equals
  const ranked = [..._collab.pool].sort((a, b) => {
    const wDiff = (wins.get(b.title) || 0) - (wins.get(a.title) || 0);
    if (wDiff !== 0) return wDiff;
    const tDiff = (ties.get(b.title) || 0) - (ties.get(a.title) || 0);
    if (tDiff !== 0) return tDiff;
    return Math.random() < 0.5 ? -1 : 1; // coin flip only for true equals
  });

  const medals = ['🎬', '🥈', '🥉'];
  byId(IDS.collabResultsList).innerHTML = ranked.map((show, i) => {
    const w = wins.get(show.title) || 0;
    const t = ties.get(show.title) || 0;
    const wLabel = `${w} win${w !== 1 ? 's' : ''}`;
    const tLabel = t > 0 ? ` · ${t} tie${t !== 1 ? 's' : ''}` : '';
    return `<div class="collab-result-item ${i === 0 ? 'collab-result-winner' : ''}">
      <span class="collab-result-medal">${medals[i] || (i + 1) + '.'}</span>
      ${show.cover ? `<img src="${safeUrl(show.cover)}" alt="" />` : '<div class="collab-no-cover">🎬</div>'}
      <div class="collab-result-info">
        <div class="collab-result-title">${esc(show.title)}</div>
        <div class="collab-result-wins">${wLabel}<span class="collab-result-ties">${tLabel}</span></div>
      </div>
    </div>`;
  }).join('');
}

// ── UNIFIED SOCIAL COMPARE ────────────────────────────────────────────────────
async function runSocialCompare() {
  const input = document.getElementById('social-compare-input');
  const username = (input?.value || '').trim();
  if (!username) { input?.focus(); return; }
  // Mirror into the hidden inputs that runCompatibility / runFriendRecs read from
  byId(IDS.compatUsernameInput).value  = username;
  byId(IDS.friendRecsInput).value      = username;
  // Both functions share _fetchFriendList's 30-second cache, so only one
  // AniList request is made regardless of how many render passes run.
  await runCompatibility();
  await runFriendRecs();
}

function openChallengeFromInput() {
  const input    = document.getElementById('social-challenge-input');
  const username = (input?.value || '').trim();
  if (!username) { input?.focus(); return; }
  openChallengeMode(username, _socialPlatform);
}

async function _rerunComparison(username, platform) {
  setSocialPlatform(platform);
  const cleanName = username.replace(/ \[MAL\]$/i, '');
  // Keep all inputs in sync
  const unifiedInput = document.getElementById('social-compare-input');
  if (unifiedInput) unifiedInput.value = cleanName;
  byId(IDS.compatUsernameInput).value = cleanName;
  byId(IDS.friendRecsInput).value     = cleanName;
  // Run sequentially to avoid hitting AniList rate limits with simultaneous requests
  await runCompatibility();
  await runFriendRecs();
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
    // Use shared cache — if runCompatibility already fetched this username's
    // list (within the last 30 s), reuse the result instead of a second request.
    const data = await _fetchFriendList(username);
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
    renderErrorInto(resultsEl, _anilistErrMsg(err), 'padding:16px 0');
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
      snapshotSessionStart();
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
            episodes
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
      episodes: m.episodes || 0,
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
      snapshotSessionStart();
      maybeShowKbTip();
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
    snapshotSessionStart();
    maybeShowKbTip();
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
const TASTE_STORY_MILESTONES = [50, 100, 200, 300, 500];
const TASTE_STORY_REPEAT_INTERVAL = 250;

// Returns the milestone value crossed between before and after, or null.
// Fixed early milestones first, then every TASTE_STORY_REPEAT_INTERVAL after 500.
function _findTasteStoryMilestone(before, after) {
  const fixed = TASTE_STORY_MILESTONES.find(n => before < n && after >= n);
  if (fixed) return fixed;
  if (after > 500) {
    const next = Math.ceil((before + 1) / TASTE_STORY_REPEAT_INTERVAL) * TASTE_STORY_REPEAT_INTERVAL;
    if (next > 500 && next <= after) return next;
  }
  return null;
}

// Returns a sequential index for any milestone value, used to alternate titles.
function _tasteArchetypeIndex(milestone) {
  const fixedIdx = TASTE_STORY_MILESTONES.indexOf(milestone);
  if (fixedIdx !== -1) return fixedIdx;
  return TASTE_STORY_MILESTONES.length + Math.round((milestone - 500) / TASTE_STORY_REPEAT_INTERVAL) - 1;
}

function checkMilestone(before, after) {
  // Taste story — check before the regular milestone so it appears first
  const tasteHit = _findTasteStoryMilestone(before, after);
  if (tasteHit && animeList.length >= 10) {
    try {
      const seen = JSON.parse(localStorage.getItem(KESSEN_KEYS.ui.tasteStorySeen) || '[]');
      if (!seen.includes(tasteHit)) {
        seen.push(tasteHit);
        localStorage.setItem(KESSEN_KEYS.ui.tasteStorySeen, JSON.stringify(seen));
        setTimeout(() => showTasteStory(tasteHit), 400);
        return; // don't show regular milestone on same battle
      }
    } catch { /* ignore */ }
  }

}

// ─── TASTE STORY ("WRAPPED" EXPERIENCE) ──────────────────────────────────────

const _TASTE_ARCHETYPES = {
  'Psychological': ['Read the Wiki After Every Episode', 'The 4D Chess Enjoyer'],
  'Drama':         ['Onion Ninja Survivor',     'Cried at Episode 5'],
  'Action':        ['Sakuga Connoisseur',       'AOTY Every Season'],
  'Comedy':        ['Laughed During the Sad Part', 'Reaction Face Collector'],
  'Sci-Fi':        ['The Infodump Appreciator',  'The Hard Sci-Fi Purist'],
  'Fantasy':       ['Isekai Truck Survivor',    'Reincarnated With Great Taste'],
  'Romance':       ['Just Confess Already',     'The Slow Burn Masochist'],
  'Horror':        ['Watches Alone at 3am',     'Unfazed by the Gore'],
  'Slice of Life': ['Iyashikei Devotee',        'Tea and Existential Dread'],
  'Sports':        ['Cried at the Training Arc','Peak Fiction Finder'],
  'Mystery':       ['Paused at Every Frame',    'The Theory Poster'],
  'Supernatural':  ['Ayakashi Whisperer',       'Spirit World Citizen'],
  'Mecha':         ['Get in the Robot',         'Unit 01 Apologist'],
  'Shounen':       ['Power of Friendship Believer', 'Never Skips the Training Arc'],
};

const _ERA_NICKNAMES = {
  1960: 'The Tezuka Era',
  1970: 'Before the Algorithm',
  1980: 'The OG Era',
  1990: 'The Golden Otaku Era',
  2000: 'The Moe Renaissance',
  2010: "Anime's Golden Age",
  2020: 'Current Season Regular',
};
const _ERA_COPY = {
  1960: "Foundational taste. You don't play around.",
  1970: "Pre-internet, pre-fandom, just pure craft. Respect.",
  1980: "VHS era loyalist. You know what you're about.",
  1990: "Before streaming. When fansubs were love letters. You were there.",
  2000: "The decade that built the modern otaku. It never left your rankings.",
  2010: "The decade that broke the algorithm. You never recovered.",
  2020: "Still keeping up with the seasonals. Respect.",
};

const _STUDIO_QUIPS = {
  'MAPPA':           "Your wallet has accepted its fate.",
  'Ufotable':        "You have expensive taste and the sakuga to prove it.",
  'Kyoto Animation': "You cry at beautiful things. That tracks.",
  'Madhouse':        "Classic taste. You know what's good.",
  'Bones':           "You trust the process. Even when the process takes 20 years.",
  'A-1 Pictures':    "Quantity and quality. You don't discriminate.",
  'Wit Studio':      "You followed them from the beginning.",
  'TRIGGER':         "You came for the hype. You stayed for the hype.",
  'Gainax':          "A person of culture and suffering.",
  'Shaft':           "Head tilts and existential dread. Understood.",
  'Production I.G':  "Action and atmosphere. Timeless.",
  'J.C.Staff':       "You see the vision even when others don't.",
  'Sunrise':         "Mecha and mayhem. The classics never die.",
  'Toei Animation':  "You grew up on this. It shows.",
  'P.A. Works':      "Beautiful backgrounds, beautiful sadness.",
  'CloverWorks':     "You ride the hype. Sometimes it pays off.",
};

function _computeTasteInsights(battleMilestone) {
  const sorted    = [...animeList].sort((a, b) => b.elo - a.elo);
  const battled   = sorted.filter(a => (a.battles || 0) > 0);
  const globalAvg = animeList.reduce((s, a) => s + a.elo, 0) / (animeList.length || 1);
  const top20     = sorted.slice(0, Math.min(20, sorted.length));
  const cards     = [];

  // ── Insight 1: Taste archetype ──────────────────────────────────────────
  const genreMap = {};
  animeList.forEach(a => {
    (a.genres || []).forEach(g => {
      if (!genreMap[g]) genreMap[g] = { sum: 0, count: 0 };
      genreMap[g].sum += a.elo;
      genreMap[g].count++;
    });
  });
  const genreAvgs = Object.entries(genreMap)
    .filter(([, v]) => v.count >= 3)
    .map(([g, v]) => ({ genre: g, avg: v.sum / v.count, count: v.count }))
    .sort((a, b) => b.avg - a.avg || b.count - a.count || a.genre.localeCompare(b.genre));

  const topGenre   = genreAvgs[0]?.genre || 'Drama';
  const topDelta   = Math.round((genreAvgs[0]?.avg || globalAvg) - globalAvg);
  const botGenre   = genreAvgs[genreAvgs.length - 1]?.genre;
  const archetypes = _TASTE_ARCHETYPES[topGenre] || ['The Algorithm Gave Up', 'Refuses to Be Categorised'];
  const archetype  = archetypes[_tasteArchetypeIndex(battleMilestone) % archetypes.length];

  cards.push({
    type:     'archetype',
    label:    'Your taste type',
    headline: archetype,
    sub:      `After ${battleMilestone} battles, ${topGenre} shows sit ${Math.abs(topDelta)} ELO above your average.${botGenre ? ` ${botGenre}? Barely makes your top half.` : ''}`,
    accent:   '#58a6ff',
  });

  // ── Insight 2: The undefeated champion ─────────────────────────────────
  const champion = sorted[0];
  if (champion && (champion.battles || 0) >= 5) {
    cards.push({
      type:     'champion',
      label:    'Still undefeated',
      headline: displayTitle(champion),
      sub:      `${champion.battles} battles. ${champion.wins} wins. Sitting at #1 like it owns the place. Nothing has knocked it off.`,
      accent:   '#f0c040',
      cover:    champion.cover || '',
    });
  }

  // ── Insight 3: Contrarian take ──────────────────────────────────────────
  const scored = animeList.filter(a => a.globalScore > 0 && (a.battles || 0) > 0);
  if (scored.length >= 5) {
    const eloSorted = [...animeList].sort((a, b) => b.elo - a.elo);
    const withRank  = scored.map(a => {
      const eloRank  = eloSorted.findIndex(x => x.id === a.id) / animeList.length;
      const commRank = 1 - (a.globalScore / 100);
      return { a, gap: commRank - eloRank };
    }).sort((x, y) => Math.abs(y.gap) - Math.abs(x.gap));

    const biggest = withRank[0];
    if (biggest && Math.abs(biggest.gap) > 0.1) {
      const higher    = biggest.gap > 0;
      const tierLabel = getTier(eloSorted.findIndex(x => x.id === biggest.a.id), animeList.length);
      cards.push({
        type:     'contrarian',
        label:    'Your hottest take',
        headline: displayTitle(biggest.a),
        sub:      higher
          ? `AniList gives it ${(biggest.a.globalScore / 10).toFixed(1)}/10. You have it in ${tierLabel} tier. Certified hot take.`
          : `You buried it in ${tierLabel} tier. AniList users disagree — ${(biggest.a.globalScore / 10).toFixed(1)}/10 community average. Bold.`,
        accent: '#f85149',
      });
    }
  }

  // ── Insight 4: The endless rivalry ─────────────────────────────────────
  const rivalries = Object.values(matchupStats)
    .filter(m => m.total >= 3)
    .map(m => {
      const [idA, idB] = Object.keys(m.wins).map(Number);
      const wA = m.wins[idA] || 0;
      const wB = m.wins[idB] || 0;
      const balance = Math.abs(wA - wB) / m.total; // 0 = perfectly split
      return { ...m, wA, wB, balance };
    })
    .filter(m => m.balance < 0.4)
    .sort((a, b) => b.total - a.total);

  if (rivalries.length > 0) {
    const r       = rivalries[0];
    const leader  = r.wA >= r.wB ? r.titleA : r.titleB;
    const trailer = r.wA >= r.wB ? r.titleB : r.titleA;
    const lWins   = Math.max(r.wA, r.wB);
    const tWins   = Math.min(r.wA, r.wB);
    cards.push({
      type:     'rivalry',
      label:    'The endless war',
      headline: `${r.titleA} vs ${r.titleB}`,
      sub:      `${r.total} battles and still no clear winner. ${leader} leads ${lWins}–${tWins}. This debate has no end in sight.`,
      accent:   '#f85149',
    });
  }

  // ── Insight 5: Studio loyalty ───────────────────────────────────────────
  const top10       = sorted.slice(0, 10);
  const hasStudios  = top10.some(a => Array.isArray(a.studios) && a.studios.length);
  if (hasStudios) {
    const studioCount = {};
    top10.forEach(a => (a.studios || []).forEach(s => {
      studioCount[s] = (studioCount[s] || 0) + 1;
    }));
    const topStudio = Object.entries(studioCount).sort((a, b) => b[1] - a[1])[0];
    if (topStudio && topStudio[1] >= 3) {
      const [studio, count] = topStudio;
      const quip = _STUDIO_QUIPS[studio] || "Your rankings don't lie.";
      cards.push({
        type:     'studio',
        label:    'Studio loyalty',
        headline: studio,
        sub:      `${count} of your top 10 are ${studio} productions. ${quip}`,
        accent:   '#3fb950',
      });
    }
  }

  // ── Insight 6: Era bias ─────────────────────────────────────────────────
  const topWithYear = top20.filter(a => a.seasonYear);
  if (topWithYear.length >= 5) {
    const avgYear     = Math.round(topWithYear.reduce((s, a) => s + a.seasonYear, 0) / topWithYear.length);
    const decade      = Math.floor(avgYear / 10) * 10;
    const decadeCount = top20.filter(a => a.seasonYear && Math.floor(a.seasonYear / 10) * 10 === decade).length;
    const eraName     = _ERA_NICKNAMES[decade] || `${decade}s`;
    const eraCopy     = _ERA_COPY[decade] || `${decadeCount} of your top 20 are from the ${decade}s.`;
    cards.push({
      type:     'era',
      label:    'Your era',
      headline: eraName,
      sub:      `${decadeCount} of your top 20 are from the ${decade}s. ${eraCopy}`,
      accent:   '#f0c040',
    });
  }

  // ── Insight 7: Episode length pattern ──────────────────────────────────
  const shortAnime = battled.filter(a => a.format !== 'MOVIE' && a.episodes > 0 && a.episodes <= 12);
  const longAnime  = battled.filter(a => a.episodes > 24);
  if (shortAnime.length >= 3 && longAnime.length >= 3) {
    const shortAvg = shortAnime.reduce((s, a) => s + a.elo, 0) / shortAnime.length;
    const longAvg  = longAnime.reduce((s, a) => s + a.elo, 0) / longAnime.length;
    const diff     = Math.abs(Math.round(shortAvg - longAvg));
    const prefers  = shortAvg > longAvg ? 'short' : 'long';
    cards.push({
      type:     'pattern',
      label:    'Your commitment level',
      headline: prefers === 'short' ? 'Less is more' : 'Built for the long haul',
      sub:      prefers === 'short'
        ? `12-episode runs average ${diff} ELO higher in your rankings. You don't need a 500-episode saga to be convinced something is good.`
        : `Long-runners (25+ episodes) average ${diff} ELO above your shorter watches. You don't just watch anime — you commit.`,
      accent: '#3fb950',
    });
  }

  // ── Final: Top 3 share card ─────────────────────────────────────────────
  const top3 = sorted.slice(0, 3);
  cards.push({
    type:            'share',
    label:           'Your ranking, defined',
    headline:        archetype,
    top3,
    battleMilestone,
    accent:          '#58a6ff',
  });

  return cards;
}

let _tasteStoryCards  = [];
let _tasteStoryIndex  = 0;

function showTasteStory(battleMilestone) {
  _tasteStoryCards = _computeTasteInsights(battleMilestone);
  _tasteStoryIndex = 0;
  _renderTasteStoryCard();
  byId('taste-story-modal').style.display = 'flex';
}

function _renderTasteStoryCard() {
  const card  = _tasteStoryCards[_tasteStoryIndex];
  const total = _tasteStoryCards.length;
  const el    = byId('taste-story-modal');
  if (!el || !card) return;

  // Dots
  el.querySelector('.ts-dots').innerHTML = _tasteStoryCards
    .map((_, i) => `<span class="ts-dot ${i === _tasteStoryIndex ? 'active' : ''}"></span>`)
    .join('');

  const body = el.querySelector('.ts-body');
  if (card.type === 'share') {
    const top3Html = card.top3.map(a => `
      <div class="ts-cover-wrap">
        <img src="${esc(a.cover || '')}" alt="${esc(displayTitle(a))}" />
        <div class="ts-cover-title">${esc(displayTitle(a))}</div>
      </div>`).join('');
    body.innerHTML = `
      <div class="ts-label">After ${card.battleMilestone} battles</div>
      <div class="ts-headline ts-archetype" style="color:${card.accent}">${card.headline}</div>
      <div class="ts-covers">${top3Html}</div>
      <div class="ts-share-actions">
        <button class="btn-primary" onclick="exportTasteStoryCard()">📸 Save image</button>
        <button class="btn-secondary" onclick="closeTasteStory();_openProfileTab()" style="margin-left:8px">🎨 Full profile →</button>
      </div>`;
  } else if (card.type === 'champion' && card.cover) {
    body.innerHTML = `
      <div class="ts-label">${card.label}</div>
      <div class="ts-champion-wrap">
        <img class="ts-champion-cover" src="${esc(card.cover)}" alt="${esc(card.headline)}" onerror="this.style.display='none'" />
        <div class="ts-champion-info">
          <div class="ts-headline" style="color:${card.accent}">${esc(card.headline)}</div>
          <div class="ts-sub">${card.sub}</div>
        </div>
      </div>
      <button class="ts-profile-link" onclick="closeTasteStory();_openProfileTab()">🎨 See full profile →</button>`;
  } else {
    body.innerHTML = `
      <div class="ts-label">${card.label}</div>
      <div class="ts-headline" style="color:${card.accent}">${esc(card.headline)}</div>
      <div class="ts-sub">${card.sub}</div>
      <button class="ts-profile-link" onclick="closeTasteStory();_openProfileTab()">🎨 See full profile →</button>`;
  }

  el.querySelector('.ts-prev').style.visibility = _tasteStoryIndex > 0 ? 'visible' : 'hidden';
  el.querySelector('.ts-next').textContent = _tasteStoryIndex < total - 1 ? 'Next →' : 'Done';
}

function tasteStoryNav(dir) {
  const total = _tasteStoryCards.length;
  if (dir > 0 && _tasteStoryIndex >= total - 1) {
    closeTasteStory(); return;
  }
  _tasteStoryIndex = Math.max(0, Math.min(total - 1, _tasteStoryIndex + dir));
  _renderTasteStoryCard();
}

function closeTasteStory() {
  byId('taste-story-modal').style.display = 'none';
}

function _openProfileTab() {
  const resultsVisible = byId(IDS.resultsScreen)?.style.display !== 'none';
  if (!resultsVisible) showResults();
  switchResultsTab('profile');
}

async function exportTasteStoryCard() {
  const card = _tasteStoryCards.find(c => c.type === 'share');
  if (!card) return;

  const CW = 600, CH = 400;
  const canvas = document.createElement('canvas');
  canvas.width = CW; canvas.height = CH;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, CW, CH);

  // Accent stripe
  ctx.fillStyle = '#58a6ff22';
  ctx.fillRect(0, 0, CW, 4);

  // Archetype label
  ctx.fillStyle = '#58a6ff';
  ctx.font = 'bold 28px ui-sans-serif, system-ui, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(card.headline, CW / 2, 54);

  ctx.fillStyle = '#8b949e';
  ctx.font = '14px ui-sans-serif, system-ui, Arial, sans-serif';
  ctx.fillText(`${card.battleMilestone} battles · kessen.co.uk`, CW / 2, 82);

  // Top 3 covers
  const coverW = 110, coverH = 154;
  const coverY = 108;
  const spacing = 130;
  const startX  = CW / 2 - spacing;

  for (let i = 0; i < Math.min(3, card.top3.length); i++) {
    const a   = card.top3[i];
    const cx  = startX + i * spacing - coverW / 2;
    try {
      const img = await _loadCoverForCanvas(a.cover);
      if (img) ctx.drawImage(img, cx, coverY, coverW, coverH);
    } catch { /* skip broken covers */ }
    // Rank badge
    ctx.fillStyle = '#0d1117cc';
    ctx.fillRect(cx, coverY, 26, 22);
    ctx.fillStyle = '#e6edf3';
    ctx.font = 'bold 12px ui-sans-serif, system-ui, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`#${i + 1}`, cx + 4, coverY + 15);
    // Title
    ctx.fillStyle = '#c9d1d9';
    ctx.font = '11px ui-sans-serif, system-ui, Arial, sans-serif';
    ctx.textAlign = 'center';
    const title = (displayTitle(a) || '').slice(0, 18);
    ctx.fillText(title, cx + coverW / 2, coverY + coverH + 16);
  }

  // Footer
  ctx.fillStyle = '#30363d';
  ctx.fillRect(0, CH - 36, CW, 1);
  ctx.fillStyle = '#6e7681';
  ctx.font = '12px ui-sans-serif, system-ui, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('kessen.co.uk · rank your anime, discover your taste', CW / 2, CH - 12);

  const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'kessen-taste.png'; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  showToast('📸 Taste card saved!');
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
  if (byId(IDS.tabPanelManage)?.style.display !== 'none') {
    renderAchievementsTab(); // refresh in place whether on settings or achievements sub-tab
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
      <div style="height:6px;background:var(--border-subtle);border-radius:4px;margin:8px auto;max-width:200px">
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
  if (tab === 'rankings') renderExcluded();
  if (tab === 'battles')  renderBattlesTab();
  if (tab === 'profile')  renderProfileTab();
  if (tab === 'discover') renderDiscoverTab();
  if (tab === 'social')   renderSocialTab();
  if (tab === 'manage')   renderManageTab();
}

function renderBattlesTab() {
  // ── Battle stats ────────────────────────────────────────────────────────────
  byId(IDS.statTotalBattles).textContent = battleCount;
  const stable = animeList.length
    ? Math.round((animeList.filter(a => (a.battles || 0) >= TARGET_BATTLES_PER_ANIME).length / animeList.length) * 100)
    : 0;
  byId(IDS.statStability).textContent = stable + '%';
  byId(IDS.statFuzzy).textContent = animeList.filter(a => a.fuzzy).length;

  const mostBattled = [...animeList].sort((a, b) => (b.battles || 0) - (a.battles || 0)).slice(0, 5);
  byId(IDS.statMostBattled).innerHTML = mostBattled.map(a =>
    `<div class="stat-anime-row"><span>${esc(a.title)}</span><span>${a.battles || 0}</span></div>`
  ).join('');

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

  // ── History & rivalries ─────────────────────────────────────────────────────
  renderHistory();
  renderRivalries();
}

function renderProfileTab() {
  renderTasteProfile();
  renderFormatSplit();
  renderScoreDistribution();
  renderGenreStats();
  renderDisagreements();
}

let _activeManageSub = 'settings';

function switchManageTab(sub) {
  _activeManageSub = sub;
  ['settings', 'achievements'].forEach(s => {
    const btn   = document.getElementById('manage-sub-' + s);
    const panel = document.getElementById('manage-panel-' + s);
    if (btn)   btn.classList.toggle('active', s === sub);
    if (panel) panel.style.display = s === sub ? '' : 'none';
  });
  if (sub === 'achievements') renderAchievementsTab();
}

function renderManageTab() {
  // Re-apply whichever sub-tab was last active (default: settings)
  switchManageTab(_activeManageSub);
}

let _moodRecActive = false; // suppresses normal discover load when mood rec is running

function renderDiscoverTab() {
  if (recsTab === 'predict') return; // predictor is search-driven, no pre-loading needed
  if (_moodRecActive) return; // mood rec will populate the grid itself

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

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function _applyTheme(light) {
  document.body.classList.toggle('light-mode', light);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = light ? '☀️ Light mode' : '🌙 Dark mode';
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('kessen.ui.theme', isLight ? 'light' : 'dark');
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = isLight ? '☀️ Light mode' : '🌙 Dark mode';
}

// Apply saved theme immediately on load
(function () {
  const saved = localStorage.getItem('kessen.ui.theme');
  if (saved === 'light') _applyTheme(true);
})();

// ─── SESSION SUMMARY ──────────────────────────────────────────────────────────
let sessionStartElo    = {};
let sessionBattleCount = 0;
const SESSION_SUMMARY_INTERVAL = 15;

function snapshotSessionStart() {
  sessionStartElo    = {};
  sessionBattleCount = 0;
  animeList.forEach(a => { sessionStartElo[a.id] = a.elo; });
  _startFirebaseSync(); // begin listening for changes from other devices
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

// ─── STATS (kept for backwards compat; logic now lives in renderBattlesTab/renderProfileTab) ──
function toggleStats() { switchResultsTab('battles'); }

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

  // Build a ranked index once so each panel can show #rank quickly
  const rankedIds = animeList
    .filter(a => !hiddenFormats.has(a.format))
    .sort((a, b) => b.elo - a.elo)
    .map(a => a.id);

  let _studioPanelKey = 0;
  const renderList = (list, positive) => list.map(s => {
    const sign    = s.diff >= 0 ? '+' : '';
    const color   = positive ? '#3fb950' : '#f85149';
    const panelId = `sa-panel-${_studioPanelKey++}`;
    // Encode studio name safely for the data attribute
    const safeName = s.name.replace(/'/g, "\\'");
    return `
      <div class="stat-anime-row studio-affinity-row" onclick="toggleStudioAnimePanel('${panelId}','${safeName}')">
        <span>${s.name} <span style="color:#6e7681;font-size:0.8em">(${s.count})</span></span>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="color:${color};font-weight:600">${sign}${s.diff}</span>
          <span id="${panelId}-chev" style="color:#6e7681;font-size:0.75em">▶</span>
        </div>
      </div>
      <div class="studio-anime-panel" id="${panelId}" style="display:none"></div>`;
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

  // Store the ranked index on the element so toggleStudioAnimePanel can use it
  el._rankedIds = rankedIds;
}

function toggleStudioAnimePanel(panelId, studioName) {
  const panel  = document.getElementById(panelId);
  const chev   = document.getElementById(panelId + '-chev');
  if (!panel) return;

  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.textContent = isOpen ? '▶' : '▼';
  if (isOpen) return;

  // Build content lazily on first open
  if (panel.dataset.loaded) return;
  panel.dataset.loaded = '1';

  const rankedIds = byId(IDS.statStudioAffinity)?._rankedIds || [];
  const anime = animeList
    .filter(a => (a.studios || []).includes(studioName))
    .sort((a, b) => {
      const ra = rankedIds.indexOf(a.id);
      const rb = rankedIds.indexOf(b.id);
      // Unranked (filtered format) goes to the end
      const ia = ra === -1 ? Infinity : ra;
      const ib = rb === -1 ? Infinity : rb;
      return ia - ib;
    });

  if (!anime.length) {
    panel.innerHTML = '<div class="studio-anime-empty">No ranked anime found for this studio.</div>';
    return;
  }

  panel.innerHTML = anime.map(a => {
    const rank    = rankedIds.indexOf(a.id);
    const rankStr = rank >= 0 ? `#${rank + 1}` : '—';
    const idx     = animeList.indexOf(a);
    return `
      <div class="studio-anime-item" onclick="openDetail(${idx})">
        <span class="studio-anime-rank">${rankStr}</span>
        <img class="studio-anime-cover" src="${esc(a.cover || '')}" alt="" loading="lazy"
             onerror="this.style.display='none'" />
        <span class="studio-anime-title">${esc(displayTitle(a))}</span>
        <span class="studio-anime-elo">${a.elo}</span>
      </div>`;
  }).join('');
}

// Silently fetch genres + seasonYear + studios for existing anime that predate
// those fields. Used by the Stats tab; the Taste Profile tab further extends
// this via _enrichTasteMetadata() to also pull tags + source.
async function _enrichGenresAndEras(onProgress) {
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
            source
            studios(isMain: true) { nodes { name } }
            tags { name rank isAdult isGeneralSpoiler }
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
      if (!m) return;
      if (!Array.isArray(a.genres)) a.genres = m.genres || [];
      if (!a.seasonYear)            a.seasonYear = m.seasonYear || null;
      if (!Array.isArray(a.studios)) a.studios = (m.studios?.nodes || []).map(n => n.name).filter(Boolean);
      if (!a.source)                a.source = m.source || null;
      if (!Array.isArray(a.tags)) {
        // Keep name+rank only, drop spoilery/adult tags. The rank is AniList's
        // 0-100 relevance score — we weight contributions by it in taste calcs.
        a.tags = (m.tags || [])
          .filter(t => !t.isAdult && !t.isGeneralSpoiler)
          .map(t => ({ name: t.name, rank: t.rank ?? 0 }));
      }
    });
    if (typeof onProgress === 'function') {
      onProgress({ done: Math.min(i + PAGE_SIZE, ids.length), total: ids.length });
    }
    if (i + PAGE_SIZE < ids.length) await new Promise(r => setTimeout(r, 350));
  }
  saveState();
}

// Returns true if any item on animeList is missing tags/studios/genres — i.e.
// needs a Taste-Profile enrichment pass. Source and seasonYear come from the
// same GraphQL query so we don't need to check them explicitly.
function _needsTasteEnrichment() {
  return animeList.some(a =>
    !Array.isArray(a.tags) ||
    !Array.isArray(a.genres) ||
    !Array.isArray(a.studios)
  );
}

// ─── TASTE PROFILE (§6.4.1) ───────────────────────────────────────────────────
// Aggregates ELO across AniList's tag graph + studios / genres / sources / eras /
// formats to surface *why* a user rates things the way they do. The headline
// insight targets the single strongest affinity (highest |diff| at sufficient
// sample size). Tag aggregation is rank-weighted — AniList tags carry a 0-100
// relevance score, so "Time Loop" contributing +80 to one title and +20 to
// another pulls the average proportionally.
const _TASTE_SOURCE_LABELS = Object.freeze({
  ORIGINAL:           'Original',
  MANGA:              'Manga',
  LIGHT_NOVEL:        'Light Novel',
  VISUAL_NOVEL:       'Visual Novel',
  NOVEL:              'Novel',
  WEB_NOVEL:          'Web Novel',
  VIDEO_GAME:         'Video Game',
  GAME:               'Game',
  OTHER:              'Other',
  DOUJINSHI:          'Doujinshi',
  ANIME:              'Anime',
  LIVE_ACTION:        'Live Action',
  COMIC:              'Comic',
  MULTIMEDIA_PROJECT: 'Multimedia',
  PICTURE_BOOK:       'Picture Book',
});

const _TASTE_FORMAT_LABELS = Object.freeze({
  TV:       'TV Series',
  MOVIE:    'Movie',
  OVA:      'OVA',
  ONA:      'ONA',
  TV_SHORT: 'Short',
  SPECIAL:  'Special',
  MUSIC:    'Music',
});

// Core aggregator — pure over animeList. Returns a structured object the
// renderer paints section-by-section. Deterministic + side-effect-free so it
// can be unit-tested without touching the DOM.
function computeTasteProfile() {
  const list = animeList.filter(a => typeof a.elo === 'number');
  if (list.length === 0) {
    return { empty: true, reason: 'no-data' };
  }

  const overallAvg = list.reduce((s, a) => s + a.elo, 0) / list.length;

  // ── Tags (rank-weighted mean ELO) ───────────────────────────────────────
  // Only tags with rank >= 40 contribute — below that, AniList considers them
  // fringe and they add noise. Weight each contribution by rank/100.
  const TAG_MIN_RANK  = 40;
  const TAG_MIN_COUNT = 3;
  const tagMap = new Map();
  list.forEach(a => {
    (a.tags || []).forEach(t => {
      if (!t || (t.rank ?? 0) < TAG_MIN_RANK) return;
      const w = (t.rank ?? 0) / 100;
      let bucket = tagMap.get(t.name);
      if (!bucket) { bucket = { sum: 0, weight: 0, count: 0 }; tagMap.set(t.name, bucket); }
      bucket.sum    += a.elo * w;
      bucket.weight += w;
      bucket.count  += 1;
    });
  });
  const tags = [...tagMap.entries()]
    .filter(([, v]) => v.count >= TAG_MIN_COUNT && v.weight > 0)
    .map(([name, v]) => ({
      name,
      avg:   Math.round(v.sum / v.weight),
      count: v.count,
      diff:  Math.round(v.sum / v.weight - overallAvg),
    }))
    .sort((a, b) => b.diff - a.diff);

  // ── Studios ───────────────────────────────────────────────────────────────
  const studioMap = new Map();
  list.forEach(a => {
    (a.studios || []).forEach(s => {
      if (!s) return;
      let bucket = studioMap.get(s);
      if (!bucket) { bucket = { sum: 0, count: 0 }; studioMap.set(s, bucket); }
      bucket.sum   += a.elo;
      bucket.count += 1;
    });
  });
  const studios = [...studioMap.entries()]
    .filter(([, v]) => v.count >= 3)
    .map(([name, v]) => ({
      name, avg: Math.round(v.sum / v.count), count: v.count,
      diff: Math.round(v.sum / v.count - overallAvg),
    }))
    .sort((a, b) => b.diff - a.diff);

  // ── Genres ────────────────────────────────────────────────────────────────
  const genreMap = new Map();
  list.forEach(a => {
    (a.genres || []).forEach(g => {
      let bucket = genreMap.get(g);
      if (!bucket) { bucket = { sum: 0, count: 0 }; genreMap.set(g, bucket); }
      bucket.sum   += a.elo;
      bucket.count += 1;
    });
  });
  const genres = [...genreMap.entries()]
    .filter(([, v]) => v.count >= 3)
    .map(([name, v]) => ({
      name, avg: Math.round(v.sum / v.count), count: v.count,
      diff: Math.round(v.sum / v.count - overallAvg),
    }))
    .sort((a, b) => b.diff - a.diff);

  // ── Sources ───────────────────────────────────────────────────────────────
  const sourceMap = new Map();
  list.forEach(a => {
    if (!a.source) return;
    let bucket = sourceMap.get(a.source);
    if (!bucket) { bucket = { sum: 0, count: 0 }; sourceMap.set(a.source, bucket); }
    bucket.sum   += a.elo;
    bucket.count += 1;
  });
  const sources = [...sourceMap.entries()]
    .filter(([, v]) => v.count >= 3)
    .map(([key, v]) => ({
      key,
      label: _TASTE_SOURCE_LABELS[key] || key,
      avg:   Math.round(v.sum / v.count),
      count: v.count,
      diff:  Math.round(v.sum / v.count - overallAvg),
    }))
    .sort((a, b) => b.diff - a.diff);

  // ── Eras (by decade) ──────────────────────────────────────────────────────
  const eraMap = new Map();
  list.forEach(a => {
    if (!a.seasonYear) return;
    const decade = Math.floor(a.seasonYear / 10) * 10;
    const label  = decade + 's';
    let bucket = eraMap.get(label);
    if (!bucket) { bucket = { sum: 0, count: 0, decade }; eraMap.set(label, bucket); }
    bucket.sum   += a.elo;
    bucket.count += 1;
  });
  const eras = [...eraMap.entries()]
    .filter(([, v]) => v.count >= 2)
    .map(([label, v]) => ({
      label, avg: Math.round(v.sum / v.count), count: v.count, decade: v.decade,
      diff: Math.round(v.sum / v.count - overallAvg),
    }))
    .sort((a, b) => a.decade - b.decade);

  // ── Formats ───────────────────────────────────────────────────────────────
  const formatMap = new Map();
  list.forEach(a => {
    const key = a.format || 'UNKNOWN';
    let bucket = formatMap.get(key);
    if (!bucket) { bucket = { sum: 0, count: 0 }; formatMap.set(key, bucket); }
    bucket.sum   += a.elo;
    bucket.count += 1;
  });
  const formats = [...formatMap.entries()]
    .filter(([, v]) => v.count >= 2)
    .map(([key, v]) => ({
      key,
      label: _TASTE_FORMAT_LABELS[key] || key,
      avg:   Math.round(v.sum / v.count),
      count: v.count,
      diff:  Math.round(v.sum / v.count - overallAvg),
    }))
    .sort((a, b) => b.diff - a.diff);

  // ── Headline insight ──────────────────────────────────────────────────────
  // Pick the strongest-signal bucket (max |diff|) across the richer dimensions.
  // Prefer tags over studios over genres because tags are most diagnostic.
  const headlineCandidates = [];
  const strong = tags.filter(t => t.count >= 5);
  if (strong.length) {
    const top = strong[0], bot = strong[strong.length - 1];
    if (top.diff > 30) headlineCandidates.push({ kind: 'tag-love', item: top, score: top.diff });
    if (bot.diff < -30) headlineCandidates.push({ kind: 'tag-hate', item: bot, score: -bot.diff });
  }
  const strongStudios = studios.filter(s => s.count >= 4);
  if (strongStudios.length) {
    const top = strongStudios[0];
    if (top.diff > 40) headlineCandidates.push({ kind: 'studio-love', item: top, score: top.diff * 0.8 });
  }
  const strongGenres = genres.filter(g => g.count >= 5);
  if (strongGenres.length) {
    const top = strongGenres[0];
    if (top.diff > 20) headlineCandidates.push({ kind: 'genre-love', item: top, score: top.diff * 0.7 });
  }
  headlineCandidates.sort((a, b) => b.score - a.score);

  let headline = 'Your Taste Profile';
  let summary  = '';
  if (headlineCandidates.length) {
    const h = headlineCandidates[0];
    if (h.kind === 'tag-love') {
      headline = `You're drawn to "${h.item.name}"`;
      summary  = `Titles tagged ${h.item.name} average ${h.item.avg} ELO (+${h.item.diff} vs. your overall ${Math.round(overallAvg)}) across ${h.item.count} anime.`;
    } else if (h.kind === 'tag-hate') {
      headline = `"${h.item.name}" isn't for you`;
      summary  = `Titles tagged ${h.item.name} average ${h.item.avg} ELO (${h.item.diff} vs. your overall ${Math.round(overallAvg)}) across ${h.item.count} anime.`;
    } else if (h.kind === 'studio-love') {
      headline = `${h.item.name} delivers for you`;
      summary  = `Their titles average ${h.item.avg} ELO (+${h.item.diff} vs. your overall ${Math.round(overallAvg)}) across ${h.item.count} works.`;
    } else if (h.kind === 'genre-love') {
      headline = `${h.item.name} is your comfort zone`;
      summary  = `Your ${h.item.name.toLowerCase()} picks average ${h.item.avg} ELO (+${h.item.diff} vs. your overall ${Math.round(overallAvg)}).`;
    }
  } else if (list.length < 15) {
    headline = 'Your Taste Profile';
    summary  = `Rank a few more anime — we need stronger signal before we can call out your preferences.`;
  } else {
    headline = 'An evenly balanced palate';
    summary  = `Your ratings sit within a narrow band — no single tag or studio dominates your top tier.`;
  }

  return {
    empty:       false,
    overallAvg:  Math.round(overallAvg),
    totalRanked: list.length,
    headline, summary,
    tags, studios, genres, sources, eras, formats,
  };
}

// Renders the Taste tab. Called by switchResultsTab('profile') and by the
// Refresh button. When `forceRefetch` is true, clears cached tag/studio/source
// data on animeList items and re-pulls from AniList — this is what the ↻
// Refresh button hits so users can pick up new AniList tags or studio
// attributions without a full metadata refresh.
async function renderTasteProfile(forceRefetch = false) {
  const emptyEl   = byId(IDS.tasteEmpty);
  const loadingEl = byId(IDS.tasteLoading);
  const bodyEl    = byId(IDS.tasteBody);
  if (!emptyEl || !loadingEl || !bodyEl) return;

  const hide = el => { if (el) el.style.display = 'none'; };
  const show = (el, disp = 'block') => { if (el) el.style.display = disp; };

  // No data yet — show empty state
  if (!animeList.length) {
    show(emptyEl);
    hide(loadingEl);
    hide(bodyEl);
    return;
  }

  // Force refetch: blow away tag/source/studio caches so _needsTasteEnrichment
  // returns true. Keep genres + seasonYear untouched — those are used by the
  // Stats tab and don't need a Taste refresh to pick up.
  if (forceRefetch) {
    animeList.forEach(a => {
      delete a.tags;
      delete a.source;
      delete a.studios;
    });
  }

  // Missing tag/studio/genre metadata — run enrichment first
  if (_needsTasteEnrichment()) {
    hide(emptyEl);
    show(loadingEl);
    hide(bodyEl);
    const msgEl = byId(IDS.tasteLoadingMsg);
    if (msgEl) msgEl.textContent = forceRefetch
      ? 'Refreshing tag data from AniList…'
      : 'Loading tag data from AniList…';
    try {
      await _enrichGenresAndEras(({ done, total }) => {
        if (msgEl) msgEl.textContent = `${forceRefetch ? 'Refreshing' : 'Loading'} tag data… ${done}/${total}`;
      });
      if (forceRefetch) showToast('Taste profile refreshed.');
    } catch (e) {
      if (msgEl) {
        msgEl.innerHTML = `<span style="color:#f85149">Could not load tag data: ${esc(e.message || 'unknown error')}</span>
          <br><button class="util-btn" onclick="renderTasteProfile(true)" style="margin-top:10px">↻ Retry</button>`;
      }
      return;
    }
  } else if (forceRefetch) {
    // Guard: forceRefetch + enrichment not needed would be an oxymoron; this
    // branch is unreachable after the delete above, but kept for clarity.
    showToast('Taste profile refreshed.');
  }

  const profile = computeTasteProfile();
  hide(emptyEl);
  hide(loadingEl);
  show(bodyEl);

  if (profile.empty) {
    show(emptyEl);
    hide(bodyEl);
    return;
  }

  // ── Section 1: Identity card ───────────────────────────────────────────
  // Only show archetype + insights once the user has hit the first taste story
  // milestone (50 battles). Before that, ELO values are seeded from ratings
  // rather than earned, so the archetype isn't meaningful.
  const identityEl = document.getElementById('taste-identity-card');
  if (battleCount >= TASTE_STORY_MILESTONES[0]) {
    if (identityEl) identityEl.style.display = '';
    const insights = _computeTasteInsights(battleCount);
    const archetype = insights.find(c => c.type === 'archetype');
    byId(IDS.tasteHeadline).textContent = archetype?.headline || profile.headline;

    const insightsEl = document.getElementById('taste-identity-insights');
    if (insightsEl) {
      const cards = insights.filter(c => c.type !== 'share' && c.type !== 'archetype');
      insightsEl.innerHTML = cards.map(c => `
        <div class="taste-insight-pill">
          <span class="taste-insight-label">${c.label}</span>
          ${c.headline ? `<span class="taste-insight-headline">${c.headline}</span>` : ''}
          <span class="taste-insight-text">${c.sub}</span>
        </div>`).join('');
    }
  } else {
    if (identityEl) {
      identityEl.style.display = '';
      const remaining = TASTE_STORY_MILESTONES[0] - battleCount;
      identityEl.innerHTML = `<p class="taste-drift-placeholder">Battle ${remaining} more anime to unlock your taste type — Kessen needs a few matchups before it can read you properly.</p>`;
    }
  }

  const metaEl = byId(IDS.tasteMeta);
  if (metaEl) {
    metaEl.innerHTML =
      `<span>${profile.totalRanked} anime ranked</span><span>·</span><span>${battleCount} battles</span>`;
  }

  // ── Section 2: Drift ───────────────────────────────────────────────────
  _paintTasteDrift(document.getElementById('taste-drift'));

  // ── Section 4: Evolution ───────────────────────────────────────────────
  _paintTasteEvolution(document.getElementById('taste-evolution'));


  // Save snapshot for drift tracking (keyed by battle count milestone)
  _maybeSaveTasteSnapshot();
}

const _MOOD_DEFS = [
  { key: 'comforting',      label: 'Comforting',       emoji: '☕', genres: ['Slice of Life', 'Comedy', 'Music', 'Shoujo'] },
  { key: 'devastating',     label: 'Devastating',      emoji: '💔', genres: ['Drama', 'Psychological', 'Tragedy', 'Horror'] },
  { key: 'intense',         label: 'Intense',          emoji: '⚡', genres: ['Action', 'Sports', 'Thriller', 'Shounen'] },
  { key: 'thoughtProvoking',label: 'Thought-provoking',emoji: '🧠', genres: ['Sci-Fi', 'Mystery', 'Psychological', 'Mecha'] },
  { key: 'beautiful',       label: 'Beautiful',        emoji: '✨', genres: ['Fantasy', 'Romance', 'Slice of Life', 'Music'] },
];

// Cache of affinity-assigned cover anime per mood key — populated by _paintTasteMoods,
// consumed by applyMoodRec so recommendations seed from exactly the shown covers.
const _moodCoverCache = {};

function _paintTasteMoods(el) {
  if (!el) return;
  const top60 = [...animeList].sort((a, b) => b.elo - a.elo).slice(0, 60);

  // ── Affinity scoring ────────────────────────────────────────────────────────
  const eloMax = top60[0]?.elo || 1500;
  const pairs = [];
  top60.forEach(anime => {
    const animeGenres = anime.genres || [];
    if (!animeGenres.length) return;
    _MOOD_DEFS.forEach(mood => {
      const matchCount = animeGenres.filter(g => mood.genres.includes(g)).length;
      if (!matchCount) return;
      const specificity = matchCount / animeGenres.length;
      const eloWeight   = anime.elo / eloMax;
      pairs.push({ anime, moodKey: mood.key, score: specificity * eloWeight });
    });
  });
  pairs.sort((a, b) => b.score - a.score);

  // ── Greedy cover assignment ─────────────────────────────────────────────────
  const usedAnime  = new Set();
  const moodCovers = Object.fromEntries(_MOOD_DEFS.map(m => [m.key, []]));
  for (const { anime, moodKey } of pairs) {
    if (usedAnime.has(anime.id))         continue;
    if (moodCovers[moodKey].length >= 3) continue;
    moodCovers[moodKey].push(anime);
    usedAnime.add(anime.id);
  }

  // Persist to cache so applyMoodRec seeds from the exact same anime
  Object.assign(_moodCoverCache, moodCovers);

  // ── Render ──────────────────────────────────────────────────────────────────
  const moodHtml = _MOOD_DEFS.map(mood => {
    const covers = moodCovers[mood.key];
    if (covers.length < 2) return '';
    const coversHtml = covers.map(a => `
      <img src="${esc(a.cover || '')}" alt="${esc(displayTitle(a))}"
           title="${esc(displayTitle(a))}"
           onerror="this.style.display='none'" />`).join('');
    return `
      <div class="taste-mood-tile" onclick="applyMoodRec('${mood.key}')">
        <div class="taste-mood-covers">${coversHtml}</div>
        <div class="taste-mood-footer">
          <span class="taste-mood-emoji">${mood.emoji}</span>
          <span class="taste-mood-label">${mood.label}</span>
          <span class="taste-mood-arrow">→</span>
        </div>
      </div>`;
  }).filter(Boolean).join('');

  el.innerHTML = moodHtml || '<p style="color:#8b949e;font-size:0.85rem">Battle more anime to unlock mood clusters.</p>';
}

async function applyMoodRec(moodKey) {
  const mood = _MOOD_DEFS.find(m => m.key === moodKey);
  if (!mood) return;

  _moodRecActive = true;
  // Clear foryou cache so normal recs don't flash in
  delete _recsCache['foryou'];

  showResults();
  switchResultsTab('discover');
  // Highlight the Moods tab but keep recs-grid visible (not the mood tile section)
  recsTab = 'moods';
  byId(IDS.recsTabForyou).classList.remove('active');
  byId(IDS.recsTabSeasonal).classList.remove('active');
  byId(IDS.recsTabPredict).classList.remove('active');
  document.getElementById('recs-tab-moods')?.classList.add('active');
  document.getElementById('predictor-section').style.display = 'none';
  document.getElementById('moods-section').style.display = '';
  byId(IDS.recsSubText).style.display = 'none';
  byId(IDS.discoverRefreshBtn).style.display = 'none';

  // Ensure the discover mood grid is populated (may be empty if arriving from taste tab)
  const discoverMoodGrid = document.getElementById('discover-mood-grid');
  if (discoverMoodGrid && !discoverMoodGrid.hasChildNodes()) _paintTasteMoods(discoverMoodGrid);

  // Highlight the active mood tile
  document.querySelectorAll('.taste-mood-tile').forEach(el => {
    el.classList.toggle('active', el.getAttribute('onclick') === `applyMoodRec('${moodKey}')`);
  });

  const grid = byId(IDS.recsGrid);
  if (!grid) return;
  // Use block so groups stack vertically; cards inside use flex rows
  grid.style.display = 'block';
  grid.style.gridTemplateColumns = 'none';
  grid.innerHTML = `<p style="color:#8b949e;text-align:center;padding:24px">
    ${mood.emoji} Finding ${mood.label.toLowerCase()} recommendations…</p>`;

  // Seed from exactly the anime shown in the cover tiles.
  // If the mood grid hasn't rendered yet, fall back to painting it now so the
  // cache is populated before we read from it.
  if (!_moodCoverCache[moodKey]?.length) {
    const discoverMoodGrid = document.getElementById('discover-mood-grid');
    _paintTasteMoods(discoverMoodGrid || document.createElement('div'));
  }
  const seeds = _moodCoverCache[moodKey] || [];

  if (!seeds.length) {
    grid.innerHTML = `<p style="color:#8b949e;text-align:center;padding:24px">
      Not enough ${mood.label.toLowerCase()} anime in your rankings yet.</p>`;
    return;
  }

  const ownIds  = new Set(animeList.map(a => a.id));
  const usedIds = new Set();
  const groups  = [];
  const query = `query ($id: Int) {
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

  for (const seed of seeds) {
    try {
      const res  = await fetch('https://graphql.anilist.co', {
        method: 'POST', headers: anilistHeaders(),
        body: JSON.stringify({ query, variables: { id: seed.id } })
      });
      const json = await res.json();
      const nodes = json?.data?.Media?.recommendations?.nodes ?? [];
      const recs  = [];
      for (const n of nodes) {
        const rec = n.mediaRecommendation;
        if (!rec || ownIds.has(rec.id) || usedIds.has(rec.id) || rec.status === 'NOT_YET_RELEASED') continue;
        // Prefer recs that also match the mood genres
        recs.push({ media: rec, score: n.rating || 1 });
        usedIds.add(rec.id);
        if (recs.length >= 4) break;
      }
      if (recs.length) groups.push({ seed, recs });
    } catch { /* skip */ }
  }

  if (!groups.length) {
    grid.innerHTML = `<p style="color:#8b949e;text-align:center;padding:24px">
      Couldn't find recommendations right now. Try again later.</p>`;
    _moodRecActive = false;
    return;
  }

  // Fetch relations for all rec IDs (same pattern as fetchRecommendationsForYou)
  const allRecIds = groups.flatMap(g => g.recs.map(r => r.media.id));
  if (allRecIds.length) {
    try { await _fetchRecRelations(allRecIds); } catch { /* non-critical */ }
  }

  // Render with mood header
  const titleHtml = `<div style="margin-bottom:16px">
    <h3 style="color:var(--text-bright);margin:0 0 4px">${mood.emoji} ${mood.label} picks</h3>
    <p style="color:#8b949e;font-size:0.82rem;margin:0">
      Based on your top-ranked ${mood.label.toLowerCase()} anime</p>
  </div>`;
  const cardsHtml = groups.map(({ seed, recs }) => `
    <div class="recs-group">
      <div class="recs-group-label">Because you liked <strong>${esc(displayTitle(seed))}</strong></div>
      <div class="recs-row">
        ${recs.map(r => recCardHtml(r.media, {})).join('')}
      </div>
    </div>`).join('');

  grid.innerHTML = titleHtml + cardsHtml;
  _recsCache['foryou'] = { html: grid.innerHTML, gridDisplay: grid.style.display };
  _moodRecActive = false;
  grid.style.gridTemplateColumns = '';
}

// ── Taste snapshots (for drift tracking) ────────────────────────────────────
const TASTE_SNAPSHOT_KEY = 'kessen.data.tasteSnapshots';

function _maybeSaveTasteSnapshot() {
  try {
    const snaps = JSON.parse(localStorage.getItem(TASTE_SNAPSHOT_KEY) || '[]');
    // Save a snapshot every 50 battles, keep last 5
    const milestone = Math.floor(battleCount / 50) * 50;
    if (milestone < 50) return;
    if (snaps.some(s => s.battleCount === milestone)) return;

    const genreMap = {};
    animeList.forEach(a => {
      (a.genres || []).forEach(g => {
        if (!genreMap[g]) genreMap[g] = { sum: 0, count: 0 };
        genreMap[g].sum += a.elo;
        genreMap[g].count++;
      });
    });
    const genreAvgs = {};
    Object.entries(genreMap).forEach(([g, v]) => {
      if (v.count >= 3) genreAvgs[g] = Math.round(v.sum / v.count);
    });

    snaps.push({
      battleCount: milestone,
      timestamp: new Date().toISOString(),
      genreAvgs,
      top10: [...animeList].sort((a, b) => b.elo - a.elo).slice(0, 10).map(a => a.id),
    });
    // Keep up to 40 snapshots — covers 2000 battles at 50-battle intervals.
    // Each snapshot is ~200 bytes, so 40 ≈ 8 KB, well within localStorage limits.
    if (snaps.length > 40) snaps.splice(0, snaps.length - 40);
    localStorage.setItem(TASTE_SNAPSHOT_KEY, JSON.stringify(snaps));
  } catch { /* storage full — skip */ }
}

function _paintTasteDrift(el) {
  if (!el) return;
  try {
    const snaps = JSON.parse(localStorage.getItem(TASTE_SNAPSHOT_KEY) || '[]');
    if (snaps.length < 2) {
      const needed = Math.max(0, 50 - battleCount);
      el.innerHTML = needed > 0
        ? `<p class="taste-drift-placeholder">Battle ${needed} more anime and come back — Kessen will start tracking how your taste shifts over time.</p>`
        : `<p class="taste-drift-placeholder">Check back after a few more sessions to see how your taste is evolving.</p>`;
      return;
    }

    const oldest  = snaps[0];
    const current = {};
    const globalAvg = animeList.reduce((s, a) => s + a.elo, 0) / (animeList.length || 1);
    animeList.forEach(a => {
      (a.genres || []).forEach(g => {
        if (!current[g]) current[g] = { sum: 0, count: 0 };
        current[g].sum += a.elo;
        current[g].count++;
      });
    });

    const shifts = Object.entries(current)
      .filter(([, v]) => v.count >= 3)
      .map(([g, v]) => {
        const now  = v.sum / v.count;
        const then = oldest.genreAvgs[g];
        if (!then) return null;
        return { genre: g, delta: Math.round(now - then) };
      })
      .filter(Boolean)
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
      .slice(0, 6);

    if (!shifts.length) {
      el.innerHTML = `<p class="taste-drift-placeholder">Not enough change yet — keep battling to see your taste evolve.</p>`;
      return;
    }

    const battlesSince = battleCount - oldest.battleCount;
    const notable = shifts.filter(s => Math.abs(s.delta) >= 5);

    if (!notable.length) {
      el.innerHTML = `<p class="taste-drift-placeholder">Your taste has stayed consistent since battle ${oldest.battleCount} — no notable genre shifts yet.</p>`;
      return;
    }

    el.innerHTML = `
      <p class="taste-drift-since">Since battle ${oldest.battleCount} (${battlesSince} battles ago):</p>
      <div class="taste-drift-rows">
        ${notable.map(s => `
          <div class="taste-drift-row ${s.delta > 0 ? 'up' : 'down'}">
            <span class="drift-genre">${s.genre}</span>
            <span class="drift-arrow">${s.delta > 0 ? '▲' : '▼'}</span>
            <span class="drift-delta">${s.delta > 0 ? '+' : ''}${s.delta} ELO</span>
          </div>`).join('')}
      </div>`;
  } catch {
    el.innerHTML = '';
  }
}

// ─── TASTE EVOLUTION ──────────────────────────────────────────────────────────
// Renders a timeline of top-10 snapshots so the user can see how their ranking
// has shifted. Snapshots are saved every 50 battles (up to 40 kept).
// When there are many snapshots, picks a spread-out representative subset so
// the timeline stays readable regardless of how many battles someone has done.
function _paintTasteEvolution(el) {
  if (!el) return;
  try {
    const allSnaps = JSON.parse(localStorage.getItem(TASTE_SNAPSHOT_KEY) || '[]');
    if (!allSnaps.length) {
      const needed = Math.max(0, 50 - battleCount);
      el.innerHTML = `<p class="taste-drift-placeholder">${
        needed > 0
          ? `Battle ${needed} more times and Kessen will start tracking how your top 10 shifts.`
          : `Check back after a few more battles to see your evolution timeline.`
      }</p>`;
      return;
    }

    // Build id → display title map from current list
    const titleMap = {};
    animeList.forEach(a => { titleMap[a.id] = displayTitle(a); });

    // Current top 10 as a synthetic "now" point
    const currentTop = [...animeList].sort((a, b) => b.elo - a.elo).slice(0, 10).map(a => a.id);
    const allPoints  = [...allSnaps, { battleCount, top10: currentTop, isCurrent: true }];

    // Cap display at 7 cards: always include first + last (now), spread the rest
    const MAX_DISPLAY = 7;
    let points;
    if (allPoints.length <= MAX_DISPLAY) {
      points = allPoints;
    } else {
      points = [allPoints[0]];
      const step = (allPoints.length - 2) / (MAX_DISPLAY - 2);
      for (let i = 1; i <= MAX_DISPLAY - 2; i++) {
        points.push(allPoints[Math.round(i * step)]);
      }
      points.push(allPoints[allPoints.length - 1]);
    }

    const cards = points.map((snap, i) => {
      const prevSet = new Set(i > 0 ? points[i - 1].top10 : []);
      const top5    = snap.top10.slice(0, 5);
      const rows    = top5.map((id, rank) => {
        const title = titleMap[id] ? esc(titleMap[id]) : '<span style="color:#6e7681">Unknown</span>';
        const isNew = i > 0 && !prevSet.has(id);
        return `<div class="evo-entry${isNew ? ' evo-new' : ''}">
          <span class="evo-rank">${rank + 1}</span>
          <span class="evo-title">${title}</span>
          ${isNew ? '<span class="evo-badge">new</span>' : ''}
        </div>`;
      }).join('');

      const label = snap.isCurrent ? `Now · ${battleCount} battles` : `Battle ${snap.battleCount}`;
      return `<div class="evo-card${snap.isCurrent ? ' evo-card-current' : ''}">
        <div class="evo-card-label">${label}</div>
        ${rows}
      </div>`;
    });

    const totalSnaps = allSnaps.length;
    const note = totalSnaps > MAX_DISPLAY - 1
      ? `<p class="taste-drift-placeholder" style="margin-top:10px">Showing ${points.length} of ${totalSnaps + 1} snapshots — evenly spread across your ${battleCount} battles.</p>`
      : '';

    el.innerHTML = `<div class="evo-timeline">${cards.join('<div class="evo-arrow">→</div>')}</div>${note}`;
  } catch {
    el.innerHTML = '';
  }
}

// Two-column grid: top-N positive affinities on the left, top-N negative on
// the right. Bar width encodes |diff| scaled against the max across both sides.
function _paintTastePair(el, data, cap, kind) {
  if (!el) return;
  if (!data || !data.length) {
    el.innerHTML = `<div class="taste-empty-row">Not enough data yet — need 3+ anime per ${kind}.</div>`;
    return;
  }
  const positives = data.filter(d => d.diff > 0).slice(0, cap);
  const negatives = data.filter(d => d.diff < 0).slice(-cap).reverse();
  const maxAbs = Math.max(
    positives[0]?.diff ?? 0,
    negatives[0] ? -negatives[0].diff : 0,
    1
  );
  const row = (d, positive) => {
    const pct  = Math.min(100, Math.round((Math.abs(d.diff) / maxAbs) * 100));
    const sign = d.diff > 0 ? '+' : '';
    return `<div class="taste-bar-row ${positive ? 'taste-pos' : 'taste-neg'}">
      <div class="taste-bar-label">${esc(d.name || d.label || '')}</div>
      <div class="taste-bar-track"><div class="taste-bar-fill" style="width:${pct}%"></div></div>
      <div class="taste-bar-value">${sign}${d.diff} <span class="taste-bar-sub">(${d.count})</span></div>
    </div>`;
  };
  el.innerHTML = `
    <div class="taste-col">
      <div class="taste-col-hdr pos">🟢 You rate higher</div>
      ${positives.length ? positives.map(d => row(d, true)).join('') : '<div class="taste-empty-row">No standout positives yet.</div>'}
    </div>
    <div class="taste-col">
      <div class="taste-col-hdr neg">🔴 You rate lower</div>
      ${negatives.length ? negatives.map(d => row(d, false)).join('') : '<div class="taste-empty-row">No standout negatives yet.</div>'}
    </div>`;
}

// Single-column list: each bucket rendered as a delta-ELO bar, signed.
function _paintTasteBarCol(el, data) {
  if (!el) return;
  if (!data || !data.length) {
    el.innerHTML = `<div class="taste-empty-row">Not enough data yet.</div>`;
    return;
  }
  const maxAbs = Math.max(...data.map(d => Math.abs(d.diff)), 1);
  el.innerHTML = data.map(d => {
    const pct  = Math.min(100, Math.round((Math.abs(d.diff) / maxAbs) * 100));
    const sign = d.diff > 0 ? '+' : '';
    const cls  = d.diff > 0 ? 'taste-pos' : d.diff < 0 ? 'taste-neg' : '';
    return `<div class="taste-bar-row ${cls}">
      <div class="taste-bar-label">${esc(d.name || d.label || '')}</div>
      <div class="taste-bar-track"><div class="taste-bar-fill" style="width:${pct}%"></div></div>
      <div class="taste-bar-value">${sign}${d.diff} <span class="taste-bar-sub">(${d.count})</span></div>
    </div>`;
  }).join('');
}

// Era column is already decade-sorted; keep that order but render diff-aware
// colors so you can see the shape of an era preference across time.
function _paintTasteEras(el, data /*, overallAvg */) {
  if (!el) return;
  _paintTasteBarCol(el, data);
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

function _syncLangBtn() {
  const btn = byId(IDS.langToggleBtn);
  if (btn) btn.textContent = preferRomaji ? '🈯 Titles: Romaji' : '🈯 Titles: EN';
}

function toggleLanguage() {
  preferRomaji = !preferRomaji;
  _syncLangBtn();

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
  // Sync all format button appearances and the filter-btn highlight in one pass
  syncFormatButtons();
  saveState();
  renderRankingList();
  filterRankings();

  // If the battle screen is active, immediately swap out any card whose format
  // is now filtered — don't wait for the user to make a pick
  const battleVisible = byId(IDS.battleScreen)?.style.display !== 'none';
  if (!battleVisible || towerMode) return;

  if (trioMode) {
    const hasFiltered = currentTrio.some(idx => hiddenFormats.has(animeList[idx]?.format));
    if (hasFiltered) renderTrio();
  } else {
    const aFiltered = currentA != null && hiddenFormats.has(animeList[currentA]?.format);
    const bFiltered = currentB != null && hiddenFormats.has(animeList[currentB]?.format);
    if (aFiltered || bFiltered) renderBattle();
  }
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
function toggleDisagreements() { switchResultsTab('profile'); }

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
  if (!['normal', 'settle', 'blind', 'trio'].includes(name)) name = 'normal';

  const prevSettle = settleMode;
  const prevTrio   = trioMode;
  settleMode = (name === 'settle');
  blindMode  = (name === 'blind');
  trioMode   = (name === 'trio');

  // Mode button visual state + label (also clears Tower highlight if active)
  const btn = byId(IDS.modeBtn);
  if (btn) {
    btn.classList.toggle('active-settle', settleMode);
    btn.classList.toggle('active-blind',  blindMode);
    btn.classList.toggle('active-trio',   trioMode);
    btn.classList.remove('active-tower');
    btn.textContent =
      settleMode ? '🎯 Mode: Settle' :
      blindMode  ? '🙈 Mode: Blind'  :
      trioMode   ? '🎲 Mode: Trio'   :
                   '⚙ Mode';
  }

  // Banners (mutually exclusive)
  byId(IDS.settleBanner)?.classList.toggle('active', settleMode);
  byId(IDS.blindBanner)?.classList.toggle('active', blindMode);
  byId(IDS.trioBanner)?.classList.toggle('active', trioMode);

  // Blind CSS class on the battle screen
  const screen = byId(IDS.battleScreen);
  if (screen) screen.classList.toggle('blind', blindMode);

  // Toggle between standard battle arena and trio arena
  const stdArena  = document.querySelector('.battle-arena');
  const trioArena = byId(IDS.trioArena);
  if (stdArena)  stdArena.style.display  = trioMode ? 'none'  : '';
  if (trioArena) trioArena.style.display = trioMode ? 'block' : 'none';

  // Popover radio state
  document.querySelectorAll('#mode-popover [role="menuitemradio"]').forEach(el => {
    el.setAttribute('aria-checked', el.dataset.mode === name ? 'true' : 'false');
  });

  _closeModeMenu();

  // Re-pick immediately on mode switch
  if (settleMode && !prevSettle) { renderBattle(); return; }
  if (trioMode   && !prevTrio)   { renderTrio();   return; }
  // Exiting trio → back to normal pair
  if (!trioMode  && prevTrio)    { renderBattle();           }
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
    setTimeout(() => document.addEventListener('click', _filterOutsideClick), 0);
    document.addEventListener('keydown', _filterMenuEscHandler);
  }
}
function _filterOutsideClick(e) {
  const pop = document.getElementById('filter-popover');
  const btn = document.getElementById('filter-btn');
  // Clicks inside the popover (e.g. format buttons) keep it open
  if (pop && pop.contains(e.target)) return;
  if (btn && btn.contains(e.target)) return;
  _closeFilterMenu();
}
function _closeFilterMenu() {
  const pop = document.getElementById('filter-popover');
  const btn = document.getElementById('filter-btn');
  if (pop) pop.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', _filterOutsideClick);
  document.removeEventListener('keydown', _filterMenuEscHandler);
}
function _filterMenuEscHandler(e) {
  if (e.key === 'Escape') _closeFilterMenu();
}

// Backward-compat shims for banner "Stop" buttons and the settle-fallback path.
function toggleSettleMode() { setMode(settleMode ? 'normal' : 'settle'); }
function toggleBlindMode()  { setMode(blindMode  ? 'normal' : 'blind');  }

// ─── TRIO MODE ────────────────────────────────────────────────────────────────
// Picks 3 anime from the active battle pool using the same weighted sampling
// as normal matchmaking. Returns [idxA, idxB, idxC] or null if pool < 3.
function pickTrio() {
  const pool    = [];
  const weights = [];
  animeList.forEach((a, i) => {
    if (excludedIds.has(a.id) || hiddenFormats.has(a.format)) return;
    pool.push(i);
    const base = 1 / ((a.comparisons || 0) + 1);
    weights.push(a.fuzzy ? base * 0.1 : base);
  });
  if (pool.length < 3) return null;

  const availW = weights.slice();
  const chosen = [];
  for (let p = 0; p < 3; p++) {
    const total = availW.reduce((s, w) => s + w, 0);
    if (total <= 0) return null;
    let r = Math.random() * total;
    for (let i = 0; i < pool.length; i++) {
      if (availW[i] === 0) continue;
      r -= availW[i];
      if (r <= 0) { chosen.push(pool[i]); availW[i] = 0; break; }
    }
  }
  return chosen.length === 3 ? chosen : null;
}

// Picks a fresh trio and resets pick state.
function renderTrio() {
  let trio;
  if (nextTrioOverride && nextTrioOverride.length > 0) {
    trio = nextTrioOverride.shift();
    if (nextTrioOverride.length === 0) nextTrioOverride = null;
  } else {
    trio = pickTrio();
  }
  if (!trio) { setMode('normal'); return; }
  currentTrio = trio;
  trioOrder   = [];

  const h2 = byId(IDS.battlePromptH2);
  const p  = byId(IDS.battlePromptP);
  if (h2) h2.textContent = 'Rank these three';
  if (p)  p.textContent  = 'Tap in order of preference — 🥇 first, 🥈 second, 🥉 third.';

  _paintTrio(true);
  updateProgress();
  saveState();
}

// Redraws the trio arena from current state (currentTrio + trioOrder).
// Cards reuse .anime-card styling so they look identical to normal battle cards.
function _paintTrio(fresh = false) {
  const arena = byId(IDS.trioArena);
  if (!arena) return;

  // Preserve which synopsis panels and card-action trays are currently open
  // so a tap to rank a card doesn't collapse them.
  // Skip when fresh=true (new set of three) so old open state isn't carried over.
  const openSynopsis = fresh ? [] : [0, 1, 2].filter(p => {
    const el = document.getElementById(`synopsis-trio-${p}`);
    return el && el.style.display !== 'none';
  });
  const openActions = fresh ? [] : [0, 1, 2].filter(p => {
    const el = document.getElementById(`trio-card-${p}`);
    return el && el.classList.contains('actions-expanded');
  });

  const BADGES     = ['', '🥇', '🥈', '🥉'];
  const RANK_CLASS = ['', 'trio-ranked-1', 'trio-ranked-2', 'trio-ranked-3'];

  arena.innerHTML = '<div class="trio-grid">' +
    currentTrio.map((animeIdx, pos) => {
      const a       = animeList[animeIdx];
      const rankPos = trioOrder.indexOf(pos);
      const rank    = rankPos >= 0 ? rankPos + 1 : 0;
      const badgeEl = rank > 0 ? `<div class="trio-badge">${BADGES[rank]}</div>` : '';
      const rankCls = rank > 0 ? RANK_CLASS[rank] : '';

      const eloEl = !blindMode
        ? `<div class="elo-badge">ELO ${a.elo}</div>`
        : '';

      const epMeta =
        (a.format === 'MOVIE' ? '<span class="ep-badge">Movie</span>'
          : a.episodes         ? `<span class="ep-badge">${a.episodes} ep</span>`
          : '') +
        _statusBadge(a.status);

      const extUrl    = esc(_animeExternalUrl(a));
      const extLabel  = esc(_animeExternalLabel(a));
      const fuzzyText = a.fuzzy ? '🌫 Fuzzy' : "🌫 Can't remember";
      const fuzzyCls  = a.fuzzy ? ' active' : '';

      return `
        <div class="anime-card trio-card ${rankCls}" id="trio-card-${pos}" onclick="trioTap(${pos})">
          ${badgeEl}
          <img src="${esc(a.cover || '')}" alt="${esc(displayTitle(a))}"
               decoding="async"
               onerror="if(this.src&&!this.src.endsWith('/')){this.classList.add('img-broken')}" />
          <div class="anime-card-body">
            <div class="title">${esc(displayTitle(a))}</div>
            ${eloEl}
            <div class="ep-meta-trio">${epMeta}</div>
            <button type="button" class="card-more-chip"
                    onclick="trioToggleCardActions(event,${pos})"
                    aria-expanded="false"
                    aria-controls="trio-card-actions-${pos}">⋯ More</button>
            <div class="card-actions" id="trio-card-actions-${pos}">
              <button class="fuzzy-btn${fuzzyCls}"
                      onclick="trioFlagFuzzy(event,${pos})"
                      title="I don't remember this well enough">${fuzzyText}</button>
              <button class="synopsis-btn"
                      onclick="trioToggleSynopsis(event,${pos})"
                      title="About this show">ℹ About</button>
              <a class="card-anilist-link" href="${extUrl}" target="_blank"
                 onclick="event.stopPropagation()">↗ ${extLabel}</a>
              <button class="exclude-btn"
                      onclick="trioExcludeAnime(event,${pos})"
                      title="Remove from ranking pool permanently">✗ Not seen</button>
            </div>
            <div class="synopsis-panel" id="synopsis-trio-${pos}" style="display:none">${esc(a.description || 'No description available.')}</div>
          </div>
        </div>`;
    }).join('') +
  '</div>';

  // Restore open synopsis panels and action trays after re-render
  openSynopsis.forEach(p => {
    const el = document.getElementById(`synopsis-trio-${p}`);
    if (el) el.style.display = 'block';
  });
  openActions.forEach(p => {
    const card = document.getElementById(`trio-card-${p}`);
    if (!card) return;
    card.classList.add('actions-expanded');
    const chip = card.querySelector('.card-more-chip');
    if (chip) chip.setAttribute('aria-expanded', 'true');
  });
}

// Trio-specific card action handlers (can't reuse the normal ones since those
// resolve side 0/1 against currentA/currentB rather than currentTrio[pos]).
function trioToggleCardActions(event, pos) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  const card = document.getElementById(`trio-card-${pos}`);
  if (!card) return;
  const expanded = card.classList.toggle('actions-expanded');
  const chip = card.querySelector('.card-more-chip');
  if (chip) chip.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function trioFlagFuzzy(event, pos) {
  event.stopPropagation();
  const idx = currentTrio[pos];
  animeList[idx].fuzzy = !animeList[idx].fuzzy;
  saveState();
  // Update button text in-place so the card-actions panel stays open
  const card = document.getElementById(`trio-card-${pos}`);
  if (card) {
    const btn = card.querySelector('.fuzzy-btn');
    if (btn) {
      const isFuzzy = animeList[idx].fuzzy;
      btn.classList.toggle('active', isFuzzy);
      btn.textContent = isFuzzy ? '🌫 Fuzzy' : "🌫 Can't remember";
    }
  }
}

function trioToggleSynopsis(event, pos) {
  event.stopPropagation();
  const panel = document.getElementById(`synopsis-trio-${pos}`);
  if (!panel) return;
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function trioExcludeAnime(event, pos) {
  event.stopPropagation();
  excludedIds.add(animeList[currentTrio[pos]].id);
  prevState = null;
  undoStack = [];
  _updateUndoBtn();

  // Pick a single replacement, keeping the other two cards in place
  const keepIndices = new Set(currentTrio.filter((_, i) => i !== pos));
  const candidates = [];
  const weights    = [];
  animeList.forEach((a, i) => {
    if (excludedIds.has(a.id) || hiddenFormats.has(a.format)) return;
    if (keepIndices.has(i)) return;
    candidates.push(i);
    const base = 1 / ((a.comparisons || 0) + 1);
    weights.push(a.fuzzy ? base * 0.1 : base);
  });

  if (candidates.length > 0) {
    const total = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * total;
    let replacement = candidates[0];
    for (let i = 0; i < candidates.length; i++) {
      r -= weights[i];
      if (r <= 0) { replacement = candidates[i]; break; }
    }
    currentTrio[pos] = replacement;
  }

  // Any existing pick order is now invalid since a card changed
  trioOrder = [];
  saveState();
  _paintTrio();
}

// Called when user taps a trio card (pos = 0/1/2).
function trioTap(pos) {
  const existingRank = trioOrder.indexOf(pos);
  if (existingRank >= 0) {
    // Cascade-clear: remove this rank and all subsequent picks
    trioOrder = trioOrder.slice(0, existingRank);
    _paintTrio();
    return;
  }

  // Add to pick order
  trioOrder.push(pos);
  _paintTrio();

  // Auto-resolve when all three are ranked
  if (trioOrder.length === 3) {
    // Brief delay so the 🥉 badge renders visibly before we move on
    setTimeout(applyTrioResult, 150);
  }
}

// Applies 3 implied ELO battles from the trio ranking and advances state.
// Order: 1st beats 2nd, 1st beats 3rd, 2nd beats 3rd (each at 0.6× K).
function applyTrioResult() {
  if (trioOrder.length !== 3) return;
  const TRIO_K = K * 0.6;

  const idxFirst  = currentTrio[trioOrder[0]];
  const idxSecond = currentTrio[trioOrder[1]];
  const idxThird  = currentTrio[trioOrder[2]];

  // Snapshot BEFORE any mutations (for undo)
  const snap = {
    type:        'trio',
    indices:     [idxFirst, idxSecond, idxThird],
    snaps:       [
      { ...animeList[idxFirst]  },
      { ...animeList[idxSecond] },
      { ...animeList[idxThird]  },
    ],
    battleCount,
    matchupData: [],
  };

  // 3 implied battles: 1st>2nd, 1st>3rd, 2nd>3rd
  const pairs = [[idxFirst, idxSecond], [idxFirst, idxThird], [idxSecond, idxThird]];
  pairs.forEach(([wIdx, lIdx]) => {
    const w    = animeList[wIdx];
    const l    = animeList[lIdx];
    const mKey = [Math.min(w.id, l.id), Math.max(w.id, l.id)].join('-');

    // Snapshot matchup before mutation
    snap.matchupData.push({
      key:  mKey,
      snap: matchupStats[mKey]
        ? { ...matchupStats[mKey], wins: { ...matchupStats[mKey].wins } }
        : null,
    });

    // ELO update at reduced K
    const ea = expectedScore(w.elo, l.elo);
    const eb = expectedScore(l.elo, w.elo);
    const wEloBefore = w.elo;
    const lEloBefore = l.elo;
    w.elo = Math.round(w.elo + TRIO_K * (1 - ea));
    l.elo = Math.max(ELO_FLOOR, Math.round(l.elo + TRIO_K * (0 - eb)));
    w.wins++;    l.losses++;
    w.battles    = (w.battles    || 0) + 1;
    l.battles    = (l.battles    || 0) + 1;
    w.comparisons++;
    l.comparisons++;
    if (!w.eloHistory) w.eloHistory = [1200];
    w.eloHistory.push(w.elo);
    if (w.eloHistory.length > 30) w.eloHistory.shift();
    if (!l.eloHistory) l.eloHistory = [1200];
    l.eloHistory.push(l.elo);
    if (l.eloHistory.length > 30) l.eloHistory.shift();

    // Matchup stats (for rivalries)
    if (!matchupStats[mKey]) {
      matchupStats[mKey] = {
        wins: {}, total: 0,
        titleA: w.id < l.id ? w.title : l.title,
        titleB: w.id < l.id ? l.title : w.title,
      };
    }
    matchupStats[mKey].wins[w.id] = (matchupStats[mKey].wins[w.id] || 0) + 1;
    matchupStats[mKey].total++;

    // Battle history (tagged as trio for future display purposes)
    battleHistory.unshift({
      winnerId:       w.id,
      loserId:        l.id,
      winnerTitle:    w.title,
      loserTitle:     l.title,
      winnerEloAfter: w.elo,
      loserEloAfter:  l.elo,
      eloSwing:       w.elo - wEloBefore,
      eloDiffBefore:  lEloBefore - wEloBefore,
      trio:           true,
    });
    if (battleHistory.length > MAX_HISTORY) battleHistory.pop();
  });

  // Advance battle count by 3 (one per implied pair)
  const prevCount = battleCount;
  battleCount += 3;
  for (let i = 1; i <= 3; i++) checkMilestone(prevCount + i - 1, prevCount + i);
  checkSessionSummary();
  _checkAchievements();
  _maybeSaveTasteSnapshot();
  saveState();

  // Render the next trio FIRST so we can store it in the snap (mirrors the
  // two-card flow where renderBattle() runs before _pushUndoSnapshot).
  renderTrio();
  snap.nextTrio = currentTrio.slice();

  // Push undo snapshot (treated as one unit)
  undoStack.push(snap);
  if (undoStack.length > MAX_UNDO_DEPTH) undoStack.shift();
  prevState = undoStack[undoStack.length - 1];
  _updateUndoBtn();
}

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
  const modeBtn  = byId(IDS.modeBtn);
  if (modeBtn) { modeBtn.classList.add('active-tower'); modeBtn.textContent = '⚡ Mode: Tower'; }

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
  const modeBtn = byId(IDS.modeBtn);
  if (modeBtn) { modeBtn.classList.remove('active-tower'); modeBtn.textContent = '⚙ Mode'; }
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

// ─── SERVICE WORKER UPDATE HANDLER ──────────────────────────────────────────
// When a new service worker takes control (after skipWaiting()), the page is
// still running under the old CSP headers. Reloading gets the fresh headers
// from the new SW's cache. More reliable than client.navigate() in the SW
// itself, which can fail silently in PWA/standalone mode on iOS.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}

// ─── CSP VIOLATION TRACKER ───────────────────────────────────────────────────
// Detects if Firebase domains are blocked by Content-Security-Policy headers.
// Stored so the connection-failure alert can name the root cause clearly.
let _firebaseCspViolation = null;
document.addEventListener('securitypolicyviolation', e => {
  const uri = e.blockedURI || '';
  if (
    uri.includes('firebasedatabase.app') ||
    uri.includes('firebaseio.com') ||
    uri.includes('firebase')
  ) {
    _firebaseCspViolation = uri;
    console.error('🔒 Firebase blocked by CSP:', uri, '| directive:', e.violatedDirective);
  }
});

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
    const ownIds    = new Set(animeList.map(a => a.id));
    const remoteIds = new Set(entries.map(e => e.id));
    _pendingNewAnime    = entries.filter(e => !ownIds.has(e.id));
    _pendingRemovedAnime = animeList.filter(a => !remoteIds.has(a.id));

    // ── Post-finish detection ────────────────────────────────────────────────
    // Build a map of fresh statuses from AniList, then look for any tracked
    // anime that just flipped from CURRENT/REPEATING → COMPLETED.
    const freshStatusMap = new Map(entries.map(e => [e.id, e.status]));
    const WATCHING = new Set(['CURRENT', 'REPEATING']);
    animeList.forEach(a => {
      const freshStatus = freshStatusMap.get(a.id);
      if (freshStatus && freshStatus !== a.status) {
        // Persist the updated status so we don't re-detect next poll
        if (freshStatus === 'COMPLETED' && WATCHING.has(a.status)) {
          _queueFinishPrompt(a);
        }
        a.status = freshStatus;
      }
    });

    _refreshListBanners('AniList');
  } catch (e) { console.warn('[checkForNewAnime] poll failed:', e?.message); }
}

// ─── POST-FINISH TOWER PROMPTS ────────────────────────────────────────────────
const FINISH_PROMPT_MAX_AGE_MS  = 24 * 60 * 60 * 1000; // 24 hours
const FINISH_PROMPT_MAX_BATTLES = 10;                   // only prompt for uncertain ranks

function _loadFinishPrompts() {
  try {
    _finishPromptQueue = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.finishPrompts) || '[]');
    // Prune stale prompts (older than 24 h).
    // Mark each pruned entry as "prompted" so the next poll doesn't re-queue
    // it with a fresh timestamp and re-show the banner — the notification
    // centre entry from detection time persists independently for the user to act on.
    const now = Date.now();
    const stale = _finishPromptQueue.filter(p => now - p.detectedAt >= FINISH_PROMPT_MAX_AGE_MS);
    _finishPromptQueue  = _finishPromptQueue.filter(p => now - p.detectedAt <  FINISH_PROMPT_MAX_AGE_MS);
    stale.forEach(p => _addPromptedId(p.id));
    _saveFinishPrompts();
  } catch { _finishPromptQueue = []; }
  _showNextFinishPrompt();
}

function _saveFinishPrompts() {
  try { localStorage.setItem(KESSEN_KEYS.data.finishPrompts, JSON.stringify(_finishPromptQueue)); } catch {}
}

function _getPromptedIds() {
  try { return new Set(JSON.parse(localStorage.getItem(KESSEN_KEYS.data.finishPromptedIds) || '[]')); }
  catch { return new Set(); }
}

function _addPromptedId(id) {
  try {
    const ids = _getPromptedIds();
    ids.add(id);
    localStorage.setItem(KESSEN_KEYS.data.finishPromptedIds, JSON.stringify([...ids]));
  } catch {}
}

function _queueFinishPrompt(anime) {
  // Don't prompt if: already prompted, too many battles (rank is settled), excluded
  if (_getPromptedIds().has(anime.id)) return;
  if ((anime.battles || 0) >= FINISH_PROMPT_MAX_BATTLES) return;
  if (excludedIds.has(anime.id)) return;
  // Don't duplicate if already queued
  if (_finishPromptQueue.some(p => p.id === anime.id)) return;

  const title = displayTitle(anime);
  _finishPromptQueue.push({
    id:         anime.id,
    title,
    cover:      anime.cover || '',
    detectedAt: Date.now(),
  });
  _saveFinishPrompts();
  _showNextFinishPrompt();
  // Also save to Notification Centre so it survives a banner dismiss
  _ncAdd('finish_prompt',
    `You just finished ${title} — battle in the Tower while the feelings are fresh?`,
    { animeId: anime.id, title });
}

function _showNextFinishPrompt() {
  const banner = byId(IDS.finishPromptBanner);
  const msg    = byId(IDS.finishPromptMsg);
  if (!banner) return;

  if (_finishPromptQueue.length === 0) {
    banner.classList.remove('active');
    return;
  }

  // Prune anything that's gone stale while sitting in the queue
  const now = Date.now();
  _finishPromptQueue = _finishPromptQueue.filter(p => now - p.detectedAt < FINISH_PROMPT_MAX_AGE_MS);
  _saveFinishPrompts();

  if (_finishPromptQueue.length === 0) {
    banner.classList.remove('active');
    return;
  }

  const next = _finishPromptQueue[0];
  if (msg) msg.textContent =
    `⚡ You just finished ${next.title} — battle in the Tower while the feelings are fresh?`;
  banner.classList.add('active');
}

function dismissFinishPrompt() {
  if (_finishPromptQueue.length === 0) return;
  const dismissed = _finishPromptQueue.shift();
  _addPromptedId(dismissed.id);
  _saveFinishPrompts();
  _showNextFinishPrompt();
}

function startFinishTower() {
  if (_finishPromptQueue.length === 0) return;
  const prompt = _finishPromptQueue[0];

  // Find the anime in the current list
  const idx = animeList.findIndex(a => a.id === prompt.id);

  dismissFinishPrompt(); // remove from queue before opening Tower

  if (idx === -1) return; // show was excluded or removed — silently skip

  // If on the results screen, head to battle first
  const resultsVisible = byId(IDS.resultsScreen)?.style.display !== 'none';
  if (resultsVisible) resumeBattle();

  // Bypass the Tower selection modal and launch directly
  startTower(idx);
}

// ─── NOTIFICATION CENTRE ──────────────────────────────────────────────────────

function _ncLoad() {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.data.notifCentre(saveKey));
    _notifCentre = raw ? JSON.parse(raw) : [];
  } catch { _notifCentre = []; }
}

function _ncSave() {
  try {
    if (_notifCentre.length > 50) _notifCentre = _notifCentre.slice(0, 50);
    localStorage.setItem(KESSEN_KEYS.data.notifCentre(saveKey), JSON.stringify(_notifCentre));
  } catch {}
}

// Add a notification. For new_anime / removed_anime, replaces any existing
// unread entry of the same type so the count stays fresh. finish_prompt is
// deduplicated per anime ID.
function _ncAdd(type, msg, data = {}) {
  if (type === 'new_anime' || type === 'removed_anime') {
    const idx = _notifCentre.findIndex(n => n.type === type);
    if (idx >= 0) {
      _notifCentre[idx] = { ..._notifCentre[idx], msg, data, timestamp: Date.now(), read: false };
      _ncSave();
      _ncUpdateBell();
      return;
    }
  }
  if (type === 'finish_prompt' && data.animeId) {
    if (_notifCentre.some(n => n.type === 'finish_prompt' && n.data?.animeId === data.animeId)) return;
  }
  _notifCentre.unshift({
    id: `nc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    msg,
    timestamp: Date.now(),
    read: false,
    data,
  });
  _ncSave();
  _ncUpdateBell();
}

function _ncUpdateBell() {
  const unread = _notifCentre.filter(n => !n.read).length;
  const badge  = byId(IDS.notifBadge);
  if (!badge) return;
  badge.textContent = unread > 9 ? '9+' : String(unread);
  badge.style.display = unread > 0 ? 'flex' : 'none';
}

function _ncTimeAgo(ts) {
  const secs = Math.floor((Date.now() - ts) / 1000);
  if (secs < 60)    return 'just now';
  if (secs < 3600)  return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  return `${Math.floor(secs / 86400)}d ago`;
}

function _ncIcon(type) {
  return type === 'finish_prompt' ? '⚡' : type === 'new_anime' ? '🆕' : type === 'removed_anime' ? '📤' : '🔔';
}

function _ncActionBtn(n) {
  if (n.type === 'finish_prompt')
    return `<button class="nc-action-btn" onclick="ncActionFinishTower('${n.id}')">⚡ Battle in Tower</button>`;
  if (n.type === 'new_anime')
    return `<button class="nc-action-btn" onclick="ncActionAddAnime('${n.id}')">➕ Add to rankings</button>`;
  if (n.type === 'removed_anime')
    return `<button class="nc-action-btn" onclick="ncActionReviewRemoved('${n.id}')">📋 Review</button>`;
  return '';
}

function _ncRenderList() {
  const list = byId(IDS.notifCentreList);
  if (!list) return;
  if (_notifCentre.length === 0) {
    list.innerHTML = '<div class="nc-empty">No notifications — you\'re all caught up ✓</div>';
    return;
  }
  list.innerHTML = _notifCentre.map(n => `
    <div class="nc-item" data-id="${n.id}">
      <div class="nc-item-body">
        <div class="nc-item-msg">${_ncIcon(n.type)} ${n.msg}</div>
        <div class="nc-item-time">${_ncTimeAgo(n.timestamp)}</div>
      </div>
      <div class="nc-item-actions">
        ${_ncActionBtn(n)}
        <button class="nc-dismiss-btn" onclick="ncDismiss('${n.id}')" title="Dismiss">✕</button>
      </div>
    </div>`).join('');
}

function openNotifCentre() {
  _notifCentre.forEach(n => { n.read = true; });
  _ncSave();
  _ncUpdateBell();
  _ncRenderList();
  byId(IDS.notifCentreModal)?.classList.add('open');
}

function closeNotifCentre() {
  byId(IDS.notifCentreModal)?.classList.remove('open');
}

function ncDismiss(id) {
  _notifCentre = _notifCentre.filter(n => n.id !== id);
  _ncSave();
  _ncUpdateBell();
  _ncRenderList();
}

function ncClearAll() {
  _notifCentre = [];
  _ncSave();
  _ncUpdateBell();
  _ncRenderList();
}

function ncActionFinishTower(id) {
  const notif = _notifCentre.find(n => n.id === id);
  if (!notif) return;
  const idx = animeList.findIndex(a => a.id === notif.data?.animeId);
  if (idx === -1) { showToast('This anime is no longer in your rankings.'); ncDismiss(id); return; }
  closeNotifCentre();
  ncDismiss(id);
  const resultsVisible = byId(IDS.resultsScreen)?.style.display !== 'none';
  if (resultsVisible) resumeBattle();
  startTower(idx);
}

function ncActionAddAnime(id) {
  const notif = _notifCentre.find(n => n.id === id);
  if (!notif?.data?.anime?.length) return;
  // Restore pending list from the notification so the review modal has data to show
  _pendingNewAnime = notif.data.anime.filter(a => !animeList.some(e => e.id === a.id));
  if (!_pendingNewAnime.length) {
    showToast('Already added — nothing to do.');
    ncDismiss(id);
    return;
  }
  closeNotifCentre();
  ncDismiss(id);
  openNewAnimeConfirm();
}

function ncActionReviewRemoved(id) {
  const notif = _notifCentre.find(n => n.id === id);
  if (!notif?.data?.anime?.length) return;
  _pendingRemovedAnime = notif.data.anime.filter(a => animeList.some(e => e.id === a.id));
  if (!_pendingRemovedAnime.length) {
    showToast('These anime have already been handled.');
    ncDismiss(id);
    return;
  }
  closeNotifCentre();
  openArchiveConfirm();
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
    const newText = `🆕 ${_pendingNewAnime.length} new anime on your ${sourceName} — not yet in rankings`;
    if (newMsg) newMsg.textContent = newText;
    newBanner?.classList.add('active');
    // Save to Notification Centre so it survives a banner dismiss
    _ncAdd('new_anime',
      `${_pendingNewAnime.length} new anime found on your ${sourceName} — not yet in rankings`,
      { anime: _pendingNewAnime.slice() });
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
    // Save to Notification Centre so it survives a banner dismiss
    _ncAdd('removed_anime',
      `${_pendingRemovedAnime.length} anime removed from your ${sourceName}`,
      { anime: _pendingRemovedAnime.slice() });
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

// ─── SMART STARTING ELO ───────────────────────────────────────────────────────
// Blends up to four signals to produce a better-than-1200 starting point for
// newly added anime. Returns { elo, reason } so the review modal can surface
// the dominant reason to the user.
function _calcSmartElo(newAnime) {
  const battled = animeList.filter(a => (a.battles || 0) > 0 && !excludedIds.has(a.id));
  if (battled.length < 5) return { elo: 1200, reason: null };

  const overallAvg = battled.reduce((s, a) => s + a.elo, 0) / battled.length;
  const signals    = [];

  // Signal 1 — user's own score (most direct intent signal)
  const userScore = (newAnime.anilistScore || 0) || (newAnime.malScore || 0);
  if (userScore > 0) {
    signals.push({ value: scoreToElo(userScore), weight: 4, reason: `your ${userScore}/10 score` });
  }

  // Signal 2 — franchise / title prefix match
  // Normalise: lowercase, strip punctuation, collapse spaces
  const norm = t => (t || '').toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
  const newNorm = norm(newAnime.titleEn || newAnime.title || '');
  if (newNorm.length >= 6) {
    const hits = battled.filter(a => {
      const en = norm(a.titleEn || a.title || '');
      if (en.length < 4) return false;
      const cap = Math.min(newNorm.length, en.length);
      let shared = 0;
      while (shared < cap && newNorm[shared] === en[shared]) shared++;
      // Require 8+ chars shared, or the shared portion covers ≥60% of the shorter title
      return shared >= 8 || shared >= Math.floor(cap * 0.6);
    });
    if (hits.length >= 1) {
      const avg = hits.reduce((s, a) => s + a.elo, 0) / hits.length;
      const name = hits[0].title?.split(':')[0]?.split(' Season')[0]?.trim() || 'franchise';
      signals.push({ value: avg, weight: 3, reason: `${name} series (${hits.length} entries)` });
    }
  }

  // Signal 3 — studio affinity (need 3+ ranked anime from same studio)
  const newStudios = newAnime.studios || [];
  if (newStudios.length > 0) {
    const hits = battled.filter(a => (a.studios || []).some(s => newStudios.includes(s)));
    if (hits.length >= 3) {
      const avg    = hits.reduce((s, a) => s + a.elo, 0) / hits.length;
      const weight = hits.length >= 8 ? 2 : 1.5;
      const studio = newStudios[0];
      signals.push({ value: avg, weight, reason: `${studio} avg (${hits.length} shows)` });
    }
  }

  // Signal 4 — genre affinity (average per matching genre vs overall)
  const newGenres = newAnime.genres || [];
  if (newGenres.length > 0) {
    const genreAvgs = [];
    newGenres.forEach(g => {
      const hits = battled.filter(a => (a.genres || []).includes(g));
      if (hits.length >= 3) genreAvgs.push(hits.reduce((s, a) => s + a.elo, 0) / hits.length);
    });
    if (genreAvgs.length > 0) {
      const avg = genreAvgs.reduce((s, v) => s + v, 0) / genreAvgs.length;
      signals.push({ value: avg, weight: 1, reason: 'genre affinity' });
    }
  }

  if (signals.length === 0) return { elo: 1200, reason: null };

  // Weighted blend, clamped to a sensible range
  const totalWeight = signals.reduce((s, sig) => s + sig.weight, 0);
  const blended     = signals.reduce((s, sig) => s + sig.value * sig.weight, 0) / totalWeight;
  const finalElo    = Math.round(Math.min(1600, Math.max(ELO_FLOOR, blended)));

  // Pick the dominant signal (highest weight, tie-break by value delta from 1200)
  const dominant = signals.sort((a, b) => b.weight - a.weight)[0];
  const changed  = Math.abs(finalElo - 1200) >= 30;
  return { elo: finalElo, reason: changed ? dominant.reason : null };
}

function openNewAnimeConfirm() {
  if (!_pendingNewAnime.length) return;
  const list = byId(IDS.newAnimeConfirmList);
  if (list) {
    while (list.firstChild) list.removeChild(list.firstChild);
    _pendingNewAnime.forEach(a => {
      const { elo, reason } = _calcSmartElo(a);
      const li    = document.createElement('li');
      const title = document.createElement('span');
      title.textContent = displayTitle(a) || a.title || '(untitled)';
      const meta  = document.createElement('span');
      meta.className = 'arch-elo';
      const metaParts = [
        a.format || 'TV',
        a.episodes ? `${a.episodes} ep` : null,
        a.seasonYear || null,
      ].filter(Boolean).join(' · ');
      // Show smart ELO if it differs meaningfully from 1200
      const eloPart = reason
        ? `Starting ELO: ${elo} · ${reason}`
        : `Starting ELO: 1200`;
      meta.textContent = `${metaParts} · ${eloPart}`;
      li.appendChild(title);
      li.appendChild(meta);
      list.appendChild(li);
    });
  }
  byId(IDS.newAnimeConfirmModal).style.display = 'flex';
}

function closeNewAnimeConfirm() {
  byId(IDS.newAnimeConfirmModal).style.display = 'none';
}

function closeNewAnimeConfirmOverlay(e) {
  if (e.target === byId(IDS.newAnimeConfirmModal)) closeNewAnimeConfirm();
}

function confirmAddNewAnime() {
  if (!_pendingNewAnime.length) { closeNewAnimeConfirm(); return; }
  const n = _pendingNewAnime.length;
  _pendingNewAnime.forEach(a => {
    const { elo } = _calcSmartElo(a);
    a.elo         = elo;
    a.eloHistory  = [elo];
    animeList.push(a);
  });
  _pendingNewAnime = [];
  byId(IDS.newAnimeBanner)?.classList.remove('active');
  closeNewAnimeConfirm();
  saveState();
  renderRankingList();
  filterRankings();
  showToast(`✓ Added ${n} anime to your rankings.`);
}

function dismissNewAnimeConfirm() {
  _pendingNewAnime = [];
  byId(IDS.newAnimeBanner)?.classList.remove('active');
  closeNewAnimeConfirm();
  showToast('✓ Skipped — anime not added to rankings.');
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
  openNewAnimeConfirm();
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
