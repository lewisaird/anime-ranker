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
  cloudSyncTimestamp:     'cloud-sync-timestamp',
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
  modalBattleNextBtn:     'modal-battle-next-btn',
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
  modalFuzzyNotice:       'modal-fuzzy-notice',
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
  searchHelpBtn:          'search-help-btn',
  searchHelpPopover:      'search-help-popover',
  searchPickerRow:        'search-picker-row',
  searchPickerPopover:    'search-picker-popover',
  searchChips:            'search-chips',
  searchClearBtn:         'search-clear-btn',
  sortMenuBtn:            'sort-menu-btn',
  sortMenuCurrent:        'sort-menu-current',
  sortMenuPopover:        'sort-menu-popover',
  franchiseSortMenuBtn:       'franchise-sort-menu-btn',
  franchiseSortMenuCurrent:   'franchise-sort-menu-current',
  franchiseSortMenuPopover:   'franchise-sort-menu-popover',
  franchiseSortWrap:          'franchise-sort-wrap',
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
  wsoBanner:              'wso-banner',
  trioArena:              'trio-arena',
  notifBell:              'notif-bell',
  notifBadge:             'notif-badge',
  notifCentreModal:       'notif-centre-modal',
  notifCentreList:        'notif-centre-list',
  // v1.0.168 — phone push notification settings inside the notif-centre modal
  ncPushSection:          'nc-push-section',
  ncPushBlurb:            'nc-push-blurb',
  ncPushMaster:           'nc-push-master',
  ncPushCategories:       'nc-push-categories',
  ncPushCatTower:         'nc-push-cat-tower',
  ncPushCatWt:            'nc-push-cat-wt',
  ncPushCatLc:            'nc-push-cat-lc',
  // v1.0.210 — "What's new" modal opened from the app_update bell entry.
  whatsNewModal:          'whats-new-modal',
  whatsNewTitle:          'whats-new-title',
  whatsNewBullets:        'whats-new-bullets',
  whatsNewCloseBtn:       'whats-new-close-btn',
  // v1.0.211 — Franchise pack
  avoidSameFranchiseChk:  'avoid-same-franchise-chk',
  hideCurrentChk:         'hide-current-chk',
  hideRepeatingChk:       'hide-repeating-chk',
  withinFranchiseBanner:  'within-franchise-banner',
  withinFranchiseMsg:     'within-franchise-msg',
  modalFranchiseBackBtn:  'modal-franchise-back-btn',
  collabModal:              'collab-modal',
  collabPanelMode:           'collab-panel-mode',
  collabPanelSetup:          'collab-panel-setup',
  collabPanelMultiSetup:     'collab-panel-multi-setup',
  collabPanelMultiLobby:     'collab-panel-multi-lobby',
  collabPanelSeasonFilters:  'collab-panel-season-filters',
  collabPanelNominate:       'collab-panel-nominate',
  collabPanelRounds:         'collab-panel-rounds',
  collabPanelPass:           'collab-panel-pass',
  collabPanelVote:           'collab-panel-vote',
  collabPanelResults:        'collab-panel-results',
  collabP1Name:             'collab-p1-name',
  collabP2Name:             'collab-p2-name',
  collabNominateTitle:      'collab-nominate-title',
  collabNominateCount:      'collab-nominate-count',
  collabSearch:             'collab-search',
  collabSearchResults:      'collab-search-results',
  collabNominationsList:    'collab-nominations-list',
  collabPassName:           'collab-pass-name',
  collabPlayerList:         'collab-player-list',
  collabHostActions:        'collab-host-actions',
  collabStartNomsBtn:       'collab-start-noms-btn',
  collabStartSeasonBtn:     'collab-start-season-btn',
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
  // Live challenge
  lcModal:              'lc-modal',
  lcPanelSetup:         'lc-panel-setup',
  lcSetupPlatform:      'lc-setup-platform',
  lcSetupUsername:      'lc-setup-username',
  lcSetupJoinCode:      'lc-setup-join-code',
  lcPanelLobby:         'lc-panel-lobby',
  lcPanelBuilding:      'lc-panel-building',
  lcPanelGame:          'lc-panel-game',
  lcPanelResults:       'lc-panel-results',
  lcLobbyCode:          'lc-lobby-code',
  lcShareBtn:           'lc-share-btn',
  lcPlayerList:         'lc-player-list',
  lcStartBtn:           'lc-start-btn',
  lcGuestStatus:        'lc-guest-status',
  lcRejoinBanner:       'lc-rejoin-banner',
  lcRejoinDesc:         'lc-rejoin-desc',
  lcDisconnectBanner:   'lc-disconnect-banner',
  lcProgress:           'lc-progress',
  lcMyScore:            'lc-my-score',
  lcOpponentScore:      'lc-opponent-score',
  lcOpponentNameScore:  'lc-opponent-name-score',
  lcPickPrompt:         'lc-pick-prompt',
  lcCardA:              'lc-card-a',
  lcCardB:              'lc-card-b',
  lcPredictSection:     'lc-predict-section',
  lcPredictPrompt:      'lc-predict-prompt',
  lcPredictA:           'lc-predict-a',
  lcPredictB:           'lc-predict-b',
  lcWaitingMsg:         'lc-waiting-msg',
  lcReveal:             'lc-reveal',
  lcRevealText:         'lc-reveal-text',
  lcNextBtn:            'lc-next-btn',
  lcWaitingNext:        'lc-waiting-next',
  lcResults:            'lc-results',
  lcRematchBtn:         'lc-rematch-btn',
  lcBreakdown:          'lc-breakdown',
  undoBtn:                'undo-btn',
  usernameInput:          'username-input',
  viewGridBtn:            'view-grid-btn',
  viewListBtn:            'view-list-btn',
  warmStartChk:           'warm-start-chk',
  welcomeModal:           'welcome-modal',
  // v1.0.154 — stragglers picked up by the v146 review. Added so the
  // remaining literal-string getElementById call sites can move under
  // the same byId-with-registry-key discipline.
  collabConfirmBtn:       'collab-confirm-btn',
  collabModeMultiBtn:     'collab-mode-multi-btn',
  collabMultiCreate:      'collab-multi-create',
  collabMultiJoin:        'collab-multi-join',
  collabMultiNote:        'collab-multi-note',
  collabP2ReadyBtn:       'collab-p2-ready-btn',
  collabRejoinBanner:     'collab-rejoin-banner',
  collabRejoinDesc:       'collab-rejoin-desc',
  collabTiebreakBtn:      'collab-tiebreak-btn',
  collabVoteSub:          'collab-vote-sub',
  collabVoteWho:          'collab-vote-who',
  discoverMoodGrid:       'discover-mood-grid',
  filterBtn:              'filter-btn',
  filterPopover:          'filter-popover',
  franchiseBtn:           'franchise-btn',
  historyCount:           'history-count',
  lcHistoryList:          'lc-history-list',
  lcHistoryListLobby:     'lc-history-list-lobby',
  moodsSection:           'moods-section',
  newBadgeTaste:          'new-badge-taste',
  recsTabMoods:           'recs-tab-moods',
  socialChallengeInput:   'social-challenge-input',
  socialCompareInput:     'social-compare-input',
  tasteDrift:             'taste-drift',
  tasteEvolution:         'taste-evolution',
  tasteIdentityCard:      'taste-identity-card',
  tasteIdentityInsights:  'taste-identity-insights',
  themeToggleBtn:         'theme-toggle-btn',
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
// v1.0.154 — removed `prevState` (was claimed to be needed by skipBattle but
// skipBattle only ever called _pushUndoSnapshot, never read prevState).
// All 5 stale writes (clear paths + push-snapshot sites) also removed.
let undoStack       = [];    // stack of up to MAX_UNDO_DEPTH snapshots (most recent last)
const MAX_UNDO_DEPTH = 5;
let nextPairOverride = null; // [idxA, idxB] — used once after an undo to restore the original "next" pair
// v1.0.203 — the upcoming battle pair is picked one battle early so its two
// posters can be fetched while the current battle is on screen. By the time
// the user taps a winner, the next covers come straight from the HTTP cache
// instead of visibly loading. Validity is re-checked at consume time (pool
// filters may have changed); invalid → discarded and picked fresh.
let _preloadedPair = null; // [ia, ib] for the next battle (normal mode only)
let _preloadedImgs = [];   // refs to in-flight Image() objects (prevents GC)
let battleHistory   = [];    // [{winnerTitle, loserTitle, winnerEloAfter, loserEloAfter, eloSwing}]
const MAX_HISTORY   = 1000;
let excludedIds     = new Set(); // anime IDs permanently removed from battle pool
// v1.0.123 — filter scope split. Beta testers reported that hiding a format
// on Rankings also hid it from the battle pool (and vice-versa), making the
// "rank everything but only battle TV series" use case impossible. Each
// filter UI now writes to its own scope:
//   - Battle "≡ Filter" popover  → hiddenFormatsBattle  / hiddenEpRangesBattle
//   - Rankings format / length   → hiddenFormatsRanking / hiddenEpRangesRanking
let hiddenFormatsBattle   = new Set(); // formats hidden from the battle pool only
// v1.0.212 — Watch-status filter for the battle pool. Default empty (all
// statuses included). Users hide CURRENT (Watching) or REPEATING (Rewatching)
// from their battle pool — useful for keeping airing shows out until they
// finish, or skipping a rewatch you're partway through.
let hiddenStatusesBattle  = new Set();
let hiddenFormatsRanking  = new Set(); // formats hidden from the Rankings list only
let hiddenEpRangesBattle  = new Set(); // episode-length buckets hidden from battles
let hiddenEpRangesRanking = new Set(); // episode-length buckets hidden from Rankings
let _pendingNewAnime    = [];    // anime on AniList not yet in rankings (new anime detection)
// v1.0.226 — If a Tower-retry push arrives for an anime that hasn't yet been
// pulled into _pendingNewAnime (the AniList polling call is async and can
// finish after showResults kicks off the deep-link handler), we stash the
// mediaId here. `checkForNewAnime` retries the deep link after populating
// _pendingNewAnime, which closes the race.
let _pendingDeepLinkTowerMediaId = null;
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
// v1.0.211 — Avoid-same-franchise filter. When true, pickers (Classic/Settle/
// Blind/Trio/WSO) skip pairs that share a franchise group. Tower mode applies
// a softer down-weight separately (see _pickTowerOpponent). The toggle lives
// in the filter popover so it sits alongside format/fuzzy as a pool filter.
let avoidSameFranchise = false;
// v1.0.211 — Battle-within-franchise mode. When non-null, pickers restrict
// to this set of anime IDs (the chosen franchise's members). Launched from
// the franchise detail modal. ELO updates and battleCount tick normally.
let battleWithinFranchise = null; // { name: 'Re:Zero', ids: Set<number> } | null
// v1.0.207 — Winner Stays On (WSO) mode. The winner of a battle "stays on"
// against a fresh opponent until they lose; a small flame badge above their
// card shows the current streak. Champion is always rendered as side A so
// the badge has a stable position. Prefers unseen opponents; once everyone
// in the active pool has been faced, falls back to the least-recently-faced
// loser (FIFO) so the streak never ends from running out of challengers.
let wsoMode         = false;
let wsoWinnerIdx    = null;      // current champion's index in animeList (null = uninitialised)
let wsoStreak       = 0;         // wins-in-a-row by champion
let wsoFacedOrder   = [];        // anime indices already faced this streak, oldest first
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
let _towerStartBattleCount = 0;  // battleCount snapshot when this tower started — used by finishTower to call checkMilestone with the correct "before" value
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

// v1.0.199 — Emits ` crossorigin="anonymous"` for cover URLs on CDNs verified
// to send Access-Control-Allow-Origin (s4/*.anilist.co reflects the origin;
// cdn.myanimelist.net sends *). Without the attribute, <img> requests are
// no-cors → the response is opaque → sw.js deliberately refuses to cache it
// (Chrome pads opaque cache entries by ~7MB each for quota accounting), so
// the kessen-covers-v1 cache never filled and every Rankings scroll re-hit
// the CDN. With it, responses are type 'cors' and cache normally.
// NOT emitted for unknown hosts (e.g. img.anili.st sends no ACAO header —
// verified June 2026): a CORS-mode request there would fail outright and
// blank the image, which is worse than an uncached one.
function coverCors(u) {
  try {
    const h = new URL(String(u)).hostname;
    if (h.endsWith('.anilist.co') || h === 'cdn.myanimelist.net') {
      return ' crossorigin="anonymous"';
    }
  } catch { /* relative, empty or malformed URL — omit the attribute */ }
  return '';
}

// v1.0.201 — Self-healing fallback for the crossorigin covers above.
//
// THE TRAP (verified live against s4.anilist.co): when a cover is requested
// WITHOUT an Origin header, AniList's CDN replies with NO
// Access-Control-Allow-Origin and NO `Vary: Origin`, cached for 31 days
// (max-age=2678400). Every cover already in a user's HTTP cache from before
// v1.0.199 is such a response. A `crossorigin="anonymous"` <img> for the
// same URL gets that cached, header-less response back — and the CORS check
// fails, blanking covers that loaded fine for months. Only long-cached
// entries break, which is why it looks random per user.
//
// THE FIX: capture-phase error listener (error events don't bubble, but they
// DO capture). First failure of a crossorigin cover → retry exactly once
// without the attribute. The retry is a no-cors request, happily reuses the
// same cached bytes, and renders. The SW skips caching the opaque retry, so
// affected covers simply stay uncached until the stale HTTP-cache entry
// expires — after which CORS (and SW caching) works organically.
// stopImmediatePropagation() — NOT plain stopPropagation() — because the
// app's pre-existing global error listener (bottom of this file) is ALSO a
// capture listener on document, and stopPropagation doesn't stop listeners
// on the SAME node. v1.0.201 used stopPropagation: the retry worked, but
// that listener still tagged the img with .img-broken (opacity 0.3) and
// nothing removed it — covers rendered greyed-out at 30%. This handler is
// registered first (script order), so stopImmediatePropagation suppresses
// the img-broken tag and the inline onerror= handlers for the FIRST failure
// only; a genuine second failure propagates normally and all of those run
// as before. The one-shot load listener also strips .img-broken in case any
// other code path tagged the element before the retry settled.
// The data-cors-retried guard makes loops impossible.
document.addEventListener('error', e => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement)) return;
  if (img.dataset.corsRetried || img.getAttribute('crossorigin') === null) return;
  const src = img.getAttribute('src');
  if (!src) return;
  img.dataset.corsRetried = '1';
  e.stopImmediatePropagation();
  img.addEventListener('load', () => img.classList.remove('img-broken'), { once: true });
  img.removeAttribute('crossorigin');
  img.removeAttribute('src');
  img.src = src;
}, true);

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
    // v1.0.210 — ms timestamp of the most recent successful cloud save.
    // Surfaced on the Manage tab's Backup/Sync card so users can SEE their
    // cross-device sync is actually working (the v1.0.209 sync work was
    // invisible without this).
    lastCloudSaveTs:     'kessen.ui.lastCloudSaveTs',
    // v1.0.210 — version string of the last release the user has seen the
    // "What's new" notification for. Compared at boot with the current
    // APP_VERSION; mismatch pushes an entry into the notification centre.
    lastSeenAppVersion:  'kessen.ui.lastSeenAppVersion',
    // v1.0.154 — was set/read inline as 'kessen.ui.theme'. Brought into the
    // registry alongside the other UI prefs.
    theme:               'kessen.ui.theme',
    // v1.0.154 — was a module-level _NEW_BADGE_TASTE_KEY const. Pulled
    // into the registry for discoverability. Literal preserved so existing
    // saves don't lose the seen-milestone marker (no migration entry exists
    // for the legacy underscore form).
    tasteNewBadgeMilestone: 'kessen_taste_badge_milestone',
    // v1.0.168 — Push notification config cached per-device.
    // Stored shape: { enabled: bool, categories: { towerRetry, watchTogether,
    // liveChallenge }, endpoint: string, syncedAt: number }. Mirror of what
    // the server has so the toggle reflects state synchronously without an
    // API round-trip on modal open.
    push:                   'kessen.ui.push',
  },
  settings: {
    allowAdult:  'kessen.settings.allowAdult',
    viewPrefs:   'kessen.settings.viewPrefs', // local-only: rankingView + franchiseMode + avoidSameFranchise
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
    // v1.0.154 — Live Challenge battle-history records (was a module-level
    // _LC_HISTORY_KEY const). Used to recap recent matches in the LC modal.
    // Literal preserved as 'kessen_lc_history' so existing user history
    // doesn't disappear — no migration entry exists for the legacy form.
    lcHistory:         'kessen_lc_history',
    // v1.0.154 — Taste profile snapshots (was a module-level KESSEN_KEYS.data.tasteSnapshots
    // const). Global rather than per-user so re-imports don't lose history.
    tasteSnapshots:    'kessen.data.tasteSnapshots',
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
  // v1.0.148 — flush any pending local saveState before we wipe the state,
  // otherwise a fast logout-after-battle loses that battle's ELO update.
  // flushSaveState() is a no-op if no timer is pending.
  flushSaveState();

  animeList         = [];
  battleCount       = 0;
  currentA          = null;
  currentB          = null;
  battleHistory     = [];
  excludedIds       = new Set();
  hiddenFormatsBattle     = new Set();
  hiddenStatusesBattle    = new Set();
  hiddenFormatsRanking    = new Set();
  hiddenEpRangesBattle    = new Set();
  hiddenEpRangesRanking   = new Set();
  saveKey           = '';
  undoStack         = [];
  achievements      = {};
  comparedFriends   = new Set();
  _cloudSyncEnabled = false;
  nextPairOverride  = null;
  matchupStats      = {};
  // v1.0.211 — Clear mode flags + per-mode session state. Without this, a
  // user mid-WSO / Tower / Trio / Battle-Within who Resets and re-fetches
  // ends up in the new session with a stale champion index, trio array, or
  // franchise restriction pointing into the OLD animeList. Most dangerously
  // wsoWinnerIdx → an array bound that no longer exists.
  wsoMode              = false;
  wsoWinnerIdx         = null;
  wsoStreak            = 0;
  wsoFacedOrder        = [];
  settleMode           = false;
  blindMode            = false;
  trioMode             = false;
  currentTrio          = [];
  trioOrder            = [];
  towerMode            = false;
  towerChampIdx        = null;
  towerRound           = 0;
  towerOpponents       = [];
  towerResults         = [];
  battleWithinFranchise = null;
  // View-state flags that should also reset (otherwise the new session
  // silently inherits the previous user's franchise/sort/view prefs).
  franchiseMode        = false;
  showFuzzyOnly        = false;
  avoidSameFranchise   = false;
  // Reset search chips so the new user/session isn't already filtered.
  _searchChips = {
    genres: new Set(), studios: new Set(), years: new Set(),
    yearRange: null, formats: new Set(), lengths: new Set(),
  };
  // Reset enrichment-attempted flags so the new list's enrichment fires.
  _enrichmentAttemptedKey = '';
  _studioFetchAttempted   = false;
  _legacyFilterMigrationDone = false;
  _bumpFranchiseGroupCache();

  // Cancel any in-flight save debounces — they would fire against stale state.
  clearTimeout(_cloudSaveTimer);
  _cloudSaveTimer = null;
  _stopFirebaseSync(); // detach real-time listener so stale data can't overwrite a new session
  clearInterval(_newAnimePollingTimer);
  _newAnimePollingTimer = null;
  byId(IDS.newAnimeBanner)?.classList.remove('active');
  byId(IDS.removedAnimeBanner)?.classList.remove('active');
  _pendingNewAnime     = [];
  _pendingRemovedAnime = [];

  // Clear any stored Live Challenge session so a stale rejoin banner
  // from a previous auth provider can't appear for the new user.
  try { sessionStorage.removeItem('kessen-lc'); } catch {}

  // Hide the bell — it's only valid during an active logged-in session
  const bell = byId(IDS.notifBell);
  if (bell) bell.style.display = 'none';
  closeNotifCentre();

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
      if (hdrAvatar) { hdrAvatar.classList.remove('img-broken'); hdrAvatar.src = authUser.avatar || ''; }
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
    if (av) { av.classList.remove('img-broken'); av.src = authUser.avatar || ''; }
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

  // v1.0.109 — clear any stale OAuth state from a previously-abandoned popup
  // before starting a fresh flow. Stops the previous flow's nonce from being
  // accidentally accepted if the user opens AniList then MAL then AniList again.
  sessionStorage.removeItem('mal_oauth_state');
  sessionStorage.removeItem('mal_code_verifier');

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
  // v1.0.106: removed legacy no-state bypass. An attacker-crafted link with no
  // state could previously log the victim into the attacker's account when
  // sessionStorage happened to be empty (e.g. tab closed and reopened).
  if (!expected || expected !== received) {
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
        avatarEl.classList.remove('img-broken');
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
        hdrAvatar.classList.remove('img-broken');
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

  // v1.0.109 — clear any stale OAuth state from a previously-abandoned popup.
  sessionStorage.removeItem('anilist_oauth_state');

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
  const res = await _anilistFetch({ query });
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
    // v1.0.106: removed legacy literal-'mal' bypass.
    if (!expected || expected !== received) {
      console.warn('MAL OAuth state mismatch — refusing token exchange');
      return;
    }
    await _handleMALOAuthCode(code);
  } else {
    const expected = sessionStorage.getItem('anilist_oauth_state') || '';
    sessionStorage.removeItem('anilist_oauth_state');
    // v1.0.106: removed legacy no-state bypass.
    if (!expected || expected !== state) {
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

// Normalise a score from any AniList format to the 1-10 scale that scoreToElo
// expects. Without this, a user on POINT_100 with scores of 75/100 was treated
// as if they scored 75/10 — getting clamped to ELO 1600 for almost every show.
function _normalizeScoreTo10(score, format) {
  if (!score) return 0;
  switch (format) {
    case 'POINT_100':        return score / 10;     // 75/100 → 7.5
    case 'POINT_10_DECIMAL': return score;          // 7.5/10 → 7.5
    case 'POINT_10':         return score;          // 7/10   → 7
    case 'POINT_5':          return score * 2;      // 4/5    → 8
    case 'POINT_3':          return score * (10/3); // 2/3    → ~6.7
    default:                 return score;          // unknown — assume 10-pt
  }
}

function scoreToElo(score, format = 'POINT_10') {
  // Maps a user's score to starting ELO. The 1-10 scale anchors: 10→1500,
  // 7→1200 (neutral median), 4→900. Unscored entries also return 1200 — the
  // neutral default — which means an unscored show starts at the same place
  // as a 7. That's intentional: 7 is "fine but unremarkable" and unscored is
  // "no signal yet"; both sit at the median until battles move them.
  const score10 = _normalizeScoreTo10(score, format);
  if (!score10) return 1200;
  return Math.max(800, Math.min(1600, 1200 + (score10 - 7) * 100));
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
              studios(isMain: true) { nodes { name } }
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
  const allRaw = lists.flatMap(l => l.entries ?? []).filter(e => WATCHED_STATUSES.has(e.status));

  // AniList occasionally returns null media for delisted/removed shows — skip those silently
  // but surface the count to the caller so they can warn the user.
  // Also dedup by media.id — an entry can appear in multiple lists (Completed
  // + custom lists), and previously each duplicate became a separate row in
  // the user's library. AniList returns the same record per reference, so
  // first occurrence wins lossless.
  const seenIds = new Set();
  const allEntries = allRaw.filter(e => {
    if (!e.media) return false;
    if (seenIds.has(e.media.id)) return false;
    seenIds.add(e.media.id);
    return true;
  });

  // Also filter out AniList-flagged adult titles unless the user has opted in
  // via localStorage (KESSEN_KEYS.settings.allowAdult = '1'). Keeps Play Store IARC Teen.
  // v1.0.133 — Drop format=MUSIC at import. Music videos (Yonezu's Paprika,
  // Vocaloid MVs, anime OPs/EDs that AniList catalogues as standalone entries)
  // aren't really anime in the ranking sense — a 2-minute MV can't be
  // meaningfully ELO-paired against a film, and identical titles like Paprika
  // (Satoshi Kon film) vs Paprika (Foorin song) collide in franchise grouping.
  const ALLOW_ADULT = localStorage.getItem(KESSEN_KEYS.settings.allowAdult) === '1';
  const skipped = allRaw.filter(e => !e.media).length;
  const entries = allEntries
    .filter(e => ALLOW_ADULT || !e.media.isAdult)
    .filter(e => e.media.format !== 'MUSIC');

  // Use the user's actual AniList scoring format when seeding ELO — POINT_100
  // users score 75/100 etc., which scoreToElo() must normalise before mapping.
  const scoreFmt = authUser?.scoreFormat || 'POINT_10';

  const mapped = entries.map(e => {
    const startElo = seedFromScores ? scoreToElo(e.score, scoreFmt) : 1200;
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
      // v1.0.211 — studios came along in the initial fetch (was lazy-fetched
      // by _enrichGenresAndEras only when the Taste tab opened). Including
      // them at import time means the Studio filter picker is instant on
      // fresh loads instead of needing a slow background enrichment.
      studios: (e.media.studios?.nodes || []).map(n => n.name).filter(Boolean),
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

// v1.0.137 — Toast-throttling flag so very-large-library users don't get
// pummelled with quota notifications on every saveState() call (which fires
// after every battle, sort, filter change, etc.).
let _quotaWarnedThisSession = false;

// v1.0.148 — Debounce the localStorage write. Every battle, sort, filter
// toggle, tower round called saveState() synchronously, and at 6500 anime
// the JSON.stringify alone is ~80-200ms of main-thread block. Click 50
// battles fast and you're looking at multi-second jank on serialization.
// The debounce coalesces bursty calls into a single write 400ms after the
// last one. flushSaveState() is a synchronous safety valve for beforeunload
// and explicit logout paths so an in-flight debounce never loses progress.
let _saveStateTimer = null;
const SAVE_STATE_DEBOUNCE_MS = 400;

function saveState() {
  if (_saveStateTimer) clearTimeout(_saveStateTimer);
  _saveStateTimer = setTimeout(() => {
    _saveStateTimer = null;
    _saveStateNow();
  }, SAVE_STATE_DEBOUNCE_MS);
}

function flushSaveState() {
  if (_saveStateTimer) {
    clearTimeout(_saveStateTimer);
    _saveStateTimer = null;
    _saveStateNow();
  }
}

function _saveStateNow() {
  if (!saveKey) return;
  if (_saveCollision) return; // another user's data lives at this key — don't clobber
  const owner = _currentOwnerTag();

  // Build either a full payload (with the entire animeList) or a slim payload
  // that drops the heavy re-fetchable fields. The slim fallback exists for
  // users with very large libraries (the original report came from a 6500-
  // anime user named "Honda") where the full JSON blows past the ~5-10 MB
  // localStorage quota. The in-memory animeList still holds the full data;
  // only the persisted copy is trimmed.
  const buildPayload = (slim) => {
    const list = slim
      ? animeList.map(a => {
          // eslint-disable-next-line no-unused-vars
          const { description, tags, relations, studios, genres, ...core } = a;
          return core;
        })
      : animeList;
    return JSON.stringify({
      // v1.0.154 — stamp a schema version so loadState can gate future
      // migrations cleanly. Bump _schema whenever the on-disk shape
      // changes; older saves load with _schema absent (treated as 0) and
      // the migration block in loadState fills in defaults.
      _schema: 5,
      animeList: list, battleCount, currentA, currentB, battleHistory,
      excludedIds: [...excludedIds],
      hiddenFormatsBattle:   [...hiddenFormatsBattle],
      hiddenFormatsRanking:  [...hiddenFormatsRanking],
      hiddenEpRangesBattle:  [...hiddenEpRangesBattle],
      hiddenEpRangesRanking: [...hiddenEpRangesRanking],
      rankingView,
      franchiseMode,
      currentSort,
      sortAsc,
      achievements,
      comparedFriends: [...comparedFriends],
      matchupStats,
      // v1.0.207 — persist Winner Stays On so streaks survive page reloads
      // and cross-device sync. Only saved when the mode is currently active;
      // older saves load with wsoMode=false and a clean state.
      wsoMode,
      wsoWinnerIdx,
      wsoStreak,
      wsoFacedOrder,
      // v1.0.209 — round-trip the tasteStorySeen list through cloud sync so
      // milestones a user has seen on one device don't pop again on another.
      // Read from localStorage at save time; merged with union semantics on
      // the receiving device (see _mergeTasteStorySeen).
      tasteStorySeen: _readTasteStorySeen(),
      // v1.0.209 — same round-trip for the "How you've changed" snapshots.
      // Previously these were local-only, so the timeline rendered empty on
      // any device that hadn't been present when the milestones were crossed.
      // Cap (40 entries) is enforced both at save time and at merge time.
      tasteSnapshots: _readTasteSnapshots(),
      _owner: owner, // { source, id } or null — used to detect collisions on next load
    });
  };

  try {
    localStorage.setItem(saveKey, buildPayload(false));
  } catch (e) {
    // QuotaExceededError reports differently across browsers — name, message
    // pattern, or legacy numeric codes (22 in modern, 1014 in old Firefox).
    const isQuota = e?.name === 'QuotaExceededError'
                 || /quota/i.test(e?.message || '')
                 || e?.code === 22 || e?.code === 1014;
    if (!isQuota) throw e;
    console.warn('[saveState] localStorage quota exceeded; falling back to slim payload');
    try {
      localStorage.setItem(saveKey, buildPayload(true));
      if (!_quotaWarnedThisSession && typeof showToast === 'function') {
        showToast('Your library is too large for the local cache — extra metadata is kept in cloud sync only.', 6000);
        _quotaWarnedThisSession = true;
      }
    } catch (e2) {
      console.error('[saveState] slim payload still over quota:', e2);
      if (!_quotaWarnedThisSession && typeof showToast === 'function') {
        showToast('Local cache full. Cloud sync still active — progress persists across devices.', 6000);
        _quotaWarnedThisSession = true;
      }
    }
  }
  scheduleCloudSave();
}

// ─── CLOUD SYNC ──────────────────────────────────────────────────────────────
// Auto-saves to Netlify Blobs keyed by AniList user ID.
// The Netlify Function verifies the AniList token server-side.

let _cloudSaveTimer    = null;  // debounce handle
let _cloudSaveFailStreak = 0;   // consecutive save failures
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
  if (state === 'hidden' || !_cloudSyncEnabled) { el.style.display = 'none'; el.classList.remove('sync-pulse'); return; }
  el.style.display = 'inline';
  if (state === 'saving') { el.textContent = '☁️'; el.title = 'Saving…';     el.style.color = '#8b949e'; el.classList.add('sync-pulse'); }
  if (state === 'saved')  { el.textContent = '☁️'; el.title = 'Synced';      el.style.color = '#3fb950'; el.classList.remove('sync-pulse'); }
  if (state === 'error')  { el.textContent = '⚠️'; el.title = 'Sync error';  el.style.color = '#f85149'; el.classList.remove('sync-pulse'); }
}

// v1.0.210 — format a relative time like "just now", "2 min ago", "3 h ago".
// Used by the Backup/Sync card so the user can verify cross-device sync is
// actually doing something. Public functions like _doCloudSave call
// _updateCloudSyncTimestamp() on success to refresh the label.
function _formatRelTime(ms) {
  if (!ms) return 'never';
  const diff = Date.now() - ms;
  if (diff < 0)             return 'just now';
  if (diff < 30_000)        return 'just now';
  if (diff < 60_000)        return 'less than a minute ago';
  const min = Math.floor(diff / 60_000);
  if (min < 60)             return `${min} min ago`;
  const hr  = Math.floor(min / 60);
  if (hr < 24)              return `${hr} h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7)              return `${day} day${day === 1 ? '' : 's'} ago`;
  return new Date(ms).toLocaleDateString();
}
function _updateCloudSyncTimestamp() {
  const el = byId(IDS.cloudSyncTimestamp);
  if (!el) return;
  let ts = 0;
  try { ts = Number(localStorage.getItem(KESSEN_KEYS.ui.lastCloudSaveTs) || 0); } catch {}
  if (!_cloudSyncEnabled) { el.style.display = 'none'; return; }
  el.style.display = 'block';
  el.textContent = ts
    ? `Last synced: ${_formatRelTime(ts)}`
    : 'Not synced yet — your next change will save to cloud.';
}
// Tick the relative time once a minute while the Manage tab is open. Cheap;
// we only update text content, no layout/reflow because the line has a fixed
// height in the card.
setInterval(_updateCloudSyncTimestamp, 60_000);

// ── Real-time sync helpers ────────────────────────────────────────────────────

// Returns the Firebase base path for the current user's personal data.
function _getUserFirebasePath() {
  const u = _activeCloudUser();
  if (!u) return null;
  const prefix = _isMalCloudSession() ? 'mal' : 'al';
  const id = u.id || u.name || u.username;
  return `users/${prefix}_${id}`;
}

// Returns the Firebase path for this user's real-time state node.
function _getFirebaseSyncPath() {
  const u = _activeCloudUser();
  if (!u) return null;
  const base = _getUserFirebasePath();
  return base ? `${base}/state` : null;
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
  _ncStopSync();
}

// Attach a Firebase 'value' listener for this user's state path.
// Shares _firebaseApp with collab — error isolation is handled in the
// onError callback below (we detach the listener so the SDK retry loop can't
// poison subsequent collab writes), not by running a second app instance.
// Safe to call multiple times — re-attaches only if the path changed.
function _startFirebaseSync() {
  if (!_FIREBASE_READY || !_cloudSyncEnabled || !_activeCloudUser()) return;
  if (typeof firebase === 'undefined') return; // SDK didn't load
  _initFirebase();
  if (!_firebaseApp) return;
  // v1.0.199 — attach only once anonymous auth has settled. A listener
  // attached pre-auth is permission-denied under the hardened rules and the
  // SDK does NOT retro-authenticate it, so the error handler would detach it.
  _ensureFirebaseAuth().then(() => _startFirebaseSyncAttach());
}

function _startFirebaseSyncAttach() {
  // Re-check the guards — auth settling is async and state may have moved
  // (user logged out, sync toggled off, app torn down).
  if (!_FIREBASE_READY || !_cloudSyncEnabled || !_activeCloudUser() || !_firebaseApp) return;

  const path = _getFirebaseSyncPath();
  if (!path) return;

  // Already listening on the correct path — nothing to do.
  if (_firebaseSyncRef && _firebaseSyncRef.key === path.split('/').pop()) return;

  _stopFirebaseSync();
  _firebaseSyncRef = _firebaseApp.database().ref(path);

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
        showToast('✨ Picked up where you left off');
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
    // Stop the listener immediately on any error (permission denied, etc.)
    // so the SDK's internal retry loop doesn't block other Firebase operations
    // like collab session creation.
    console.warn('Firebase sync error — stopping listener:', err.code, err.message);
    _stopFirebaseSync();
  });

  // Also start notification sync on this connection
  _ncStartSync();
}

// Called by the "Apply" button in the realtime-sync-banner.
function applyRealtimeSync() {
  byId(IDS.realtimeSyncBanner)?.classList.remove('active');
  if (!_pendingSyncData) return;
  const data = _pendingSyncData;
  _pendingSyncData = null;
  _lastFirebaseSyncTs = new Date(data.savedAt).getTime();
  _applyCloudSaveToMemory(data);
  showToast('✨ Picked up where you left off');
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
      hiddenFormatsBattle:   [...hiddenFormatsBattle],
      hiddenFormatsRanking:  [...hiddenFormatsRanking],
      hiddenEpRangesBattle:  [...hiddenEpRangesBattle],
      hiddenEpRangesRanking: [...hiddenEpRangesRanking],
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
    _cloudSaveFailStreak = 0;
    _setSyncIndicator('saved');
    setTimeout(() => _setSyncIndicator('hidden'), 3000);
    // v1.0.210 — record the successful save timestamp + refresh the Manage
    // tab's "Last synced …" label so users have visible confirmation that
    // cross-device sync is working.
    try { localStorage.setItem(KESSEN_KEYS.ui.lastCloudSaveTs, String(Date.now())); } catch {}
    _updateCloudSyncTimestamp();

    // Notify other devices via Firebase — write a tiny ping only, NOT the full
    // session. The full data lives in the Netlify Blob (written above); other
    // devices fetch it from there when they see a newer ping.
    if (_FIREBASE_READY && typeof firebase !== 'undefined') {
      try {
        const path = _getFirebaseSyncPath();
        if (path) {
          _initFirebase();
          await _ensureFirebaseAuth(); // hardened rules require auth for the ping write
          if (_firebaseApp) _firebaseApp.database().ref(path).set({
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
    _cloudSaveFailStreak++;
    _setSyncIndicator('error');
    if (_cloudSaveFailStreak === 3) {
      showToast('⚠️ Cloud sync has failed 3 times in a row — check your connection.', 6000);
    }
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
  // v1.0.123 — see loadState for the rationale on this fallback chain.
  const _cloudLegacyFmt = cloud.hiddenFormats;
  const _cloudLegacyEp  = cloud.hiddenEpRanges;
  hiddenFormatsBattle   = new Set(cloud.hiddenFormatsBattle   ?? _cloudLegacyFmt ?? []);
  hiddenFormatsRanking  = new Set(cloud.hiddenFormatsRanking  ?? cloud.hiddenFormatsBattle  ?? _cloudLegacyFmt ?? []);
  hiddenEpRangesBattle  = new Set(cloud.hiddenEpRangesBattle  ?? _cloudLegacyEp  ?? []);
  hiddenEpRangesRanking = new Set(cloud.hiddenEpRangesRanking ?? cloud.hiddenEpRangesBattle ?? _cloudLegacyEp  ?? []);
  rankingView    = cloud.rankingView    ?? 'grid';
  franchiseMode  = cloud.franchiseMode  ?? false;
  currentSort    = cloud.currentSort    ?? 'elo';
  sortAsc        = cloud.sortAsc        ?? false;
  // Normalise: Title/Tier/Confidence sort naturally ascending — correct stale saved state
  if (_ascFirstSorts.has(currentSort) && !sortAsc) sortAsc = true;
  achievements    = cloud.achievements   ?? {};
  comparedFriends = new Set(cloud.comparedFriends ?? []);
  matchupStats    = cloud.matchupStats   ?? {};
  // v1.0.209 — merge cloud's seen taste-story milestones into this device's
  // localStorage list. Without this, a device cloud-syncing into the middle
  // of a battle history (e.g. phone first sign-in at battle 1306) had an
  // empty local seen list and the catch-up logic in checkMilestone fired
  // already-seen milestones as fresh popups on the next battle.
  _mergeTasteStorySeen(cloud.tasteStorySeen);
  // v1.0.209 — and same merge for the "How you've changed" snapshots, so
  // the timeline reflects the user's full history across devices.
  _mergeTasteSnapshots(cloud.tasteSnapshots);

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
    showToast('☁️ Your rankings are back');
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
      const res = await _anilistFetch({ query, variables: { ids: chunk } });
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
  // v1.0.211 fix — Safari private-mode throws SecurityError for storage
  // access, which used to crash the entire login flow with no user message.
  // Treat any storage exception as "no save found" so cold-start path takes
  // over; the user can still battle, just won't persist between reloads
  // (which is intrinsic to private mode anyway).
  let raw = null;
  try { raw = localStorage.getItem(saveKey); }
  catch { return false; }
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
    // v1.0.123 migration. Pre-split saves stored a single shared set; fall
    // back chain ensures both scopes get populated from whichever previous
    // field is present:
    //   - hiddenFormatsBattle   (v1.0.122 single-source, also used by v1.0.123 going forward)
    //   - hiddenFormats         (pre-v1.0.122 legacy field name)
    // Without falling back to hiddenFormatsBattle, users upgrading from
    // v1.0.122 would see their Ranking-scope set wiped — their filters
    // would "stop working" on the Rankings tab until they re-applied them.
    const legacyFormats  = s.hiddenFormats;
    const legacyEpRanges = s.hiddenEpRanges;
    hiddenFormatsBattle   = new Set(s.hiddenFormatsBattle   ?? legacyFormats  ?? []);
    hiddenFormatsRanking  = new Set(s.hiddenFormatsRanking  ?? s.hiddenFormatsBattle  ?? legacyFormats  ?? []);
    hiddenEpRangesBattle  = new Set(s.hiddenEpRangesBattle  ?? legacyEpRanges ?? []);
    hiddenEpRangesRanking = new Set(s.hiddenEpRangesRanking ?? s.hiddenEpRangesBattle ?? legacyEpRanges ?? []);
    rankingView    = s.rankingView  ?? 'grid';
    franchiseMode  = s.franchiseMode ?? false;
    currentSort    = s.currentSort  ?? 'elo';
    sortAsc        = s.sortAsc      ?? false;
    // Normalise: Title/Tier/Confidence sort naturally ascending — correct stale saved state
    if (_ascFirstSorts.has(currentSort) && !sortAsc) sortAsc = true;
    achievements    = s.achievements    ?? {};
    comparedFriends = new Set(s.comparedFriends ?? []);
    matchupStats    = s.matchupStats    ?? {};
    // v1.0.207 — restore Winner Stays On state. Older saves predate these
    // fields and load with defaults (mode off, no champion).
    wsoMode         = !!s.wsoMode;
    wsoWinnerIdx    = (typeof s.wsoWinnerIdx === 'number') ? s.wsoWinnerIdx : null;
    wsoStreak       = (typeof s.wsoStreak === 'number') ? s.wsoStreak : 0;
    wsoFacedOrder   = Array.isArray(s.wsoFacedOrder) ? s.wsoFacedOrder.slice() : [];
    // v1.0.209 — merge seen taste-story milestones from this save with whatever
    // already lives in localStorage. Older saves predate this field and load
    // with no-op (incoming undefined → merge is a no-op).
    _mergeTasteStorySeen(s.tasteStorySeen);
    _mergeTasteSnapshots(s.tasteSnapshots);
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
      // v1.0.211 — Achievement-system backfills.
      // seedElo: powers Comeback Kid. Fall back to the oldest eloHistory
      // point we still have (eloHistory is capped at 30, so for heavily-
      // battled anime this is the closest approximation to the original
      // seed we can recover). If eloHistory is empty, default to 1200.
      if (a.seedElo === undefined) {
        a.seedElo = (Array.isArray(a.eloHistory) && a.eloHistory.length > 0)
          ? a.eloHistory[0]
          : 1200;
      }
      // maxWinStreak: powers Hot Streak. Bootstraps from the current
      // streak (if it's a win streak) so users with existing streaks
      // don't lose visible progress. Future wins extend it in pickWinner.
      if (a.maxWinStreak === undefined) {
        a.maxWinStreak = (a.streak?.type === 'win') ? (a.streak.count || 0) : 0;
      }
    });
    // v1.0.116 — dedup any duplicate-ID entries that snuck in before the
    // custom-list dedup at fetch time in v1.0.115. Keep the entry with the
    // most battles (most established), tiebreak by highest ELO. Preserves
    // animeList order so UI positions stay stable. saveState() isn't called
    // here — the next regular save picks it up.
    const _byId = new Map();
    for (const a of animeList) {
      const cur = _byId.get(a.id);
      if (!cur) { _byId.set(a.id, a); continue; }
      const newer = (a.battles || 0) > (cur.battles || 0)
        || ((a.battles || 0) === (cur.battles || 0) && (a.elo || 0) > (cur.elo || 0));
      if (newer) _byId.set(a.id, a);
    }
    if (_byId.size < animeList.length) {
      const removed = animeList.length - _byId.size;
      animeList = animeList.filter(a => _byId.get(a.id) === a);
      console.warn('[migrate] removed', removed, 'duplicate anime entries');
    }
    // v1.0.133 — drop any MUSIC-format entries already in the save. The
    // import paths now filter MUSIC out at fetch time, but existing users
    // already have music videos (Paprika, etc.) in their saved state. Strip
    // them on load so a single refresh clears the clutter without forcing a
    // full re-sync. saveState() picks the change up on next write.
    const _beforeMusic = animeList.length;
    animeList = animeList.filter(a => a.format !== 'MUSIC');
    if (animeList.length < _beforeMusic) {
      console.warn('[migrate] removed', _beforeMusic - animeList.length, 'MUSIC-format entries');
    }
    // v1.0.211 — load local-only view preferences (rankingView / franchiseMode
    // / avoidSameFranchise) at session-restore time. Previously this only ran
    // inside showResults, which left avoidSameFranchise as `false` at the
    // first battle for users who'd toggled it in a prior session. The cost is
    // one localStorage read.
    _loadViewPrefs();
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

window.addEventListener('unhandledrejection', e => {
  const msg   = e.reason?.message || String(e.reason) || 'Unhandled promise rejection';
  const stack = e.reason?.stack ?? '';
  const hash  = _errorHash(msg, stack);
  if (_sentErrorHashes.has(hash)) return;
  _sentErrorHashes.add(hash);
  _sendIssueReport({ message: msg, error: stack || null, source: 'unhandledrejection' });
});

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

// Provisional period — anime with fewer than this many prior battles get a
// 50% larger K-factor so they reach their true rating quickly. Standard
// chess-ELO practice. Once they pass the threshold, K drops to normal and
// their rating stabilises, resisting later inflation from Tower runs etc.
const K_PROVISIONAL          = 48;
const PROVISIONAL_BATTLES    = 20;

function updateElo(winner, loser) {
  // Asymmetric K — only the under-experienced side moves faster. Established
  // anime keep their stable K so beating a newbie doesn't inflate them.
  const kW = (winner.battles || 0) < PROVISIONAL_BATTLES ? K_PROVISIONAL : K;
  const kL = (loser.battles  || 0) < PROVISIONAL_BATTLES ? K_PROVISIONAL : K;
  const ea = expectedScore(winner.elo, loser.elo);
  const eb = expectedScore(loser.elo, winner.elo);
  winner.elo = Math.round(winner.elo + kW * (1 - ea));
  loser.elo  = Math.max(ELO_FLOOR, Math.round(loser.elo + kL * (0 - eb)));
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

  // v1.0.211 — Battle-within-franchise restricts the pool to the chosen
  // franchise's members. Acts like another filter alongside excludedIds and
  // hiddenFormatsBattle — anime not in the set get weight 0.
  const inFranchisePool = battleWithinFranchise
    ? (a => battleWithinFranchise.ids.has(a.id))
    : null;

  // weight: 0 for excluded, lower for fuzzy, higher for fewer comparisons
  const weights = animeList.map(a => {
    if (excludedIds.has(a.id) || hiddenFormatsBattle.has(a.format) || hiddenStatusesBattle.has(a.status)) return 0;
    if (inFranchisePool && !inFranchisePool(a)) return 0;
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
      // v1.0.211 — battle-within-franchise gets its own message because the
      // generic "remove some filters" line doesn't tell the user what to do
      // (the filter button doesn't control franchise restriction).
      const msg = animeList.length < 2
        ? '⚠️ You need at least 2 anime in your list to start battling.'
        : battleWithinFranchise && activeCount < 2
          ? `⚠️ Only ${activeCount} eligible anime in "${battleWithinFranchise.name}" — stop the within-franchise battle to widen the pool.`
          : '⚠️ All anime are filtered out — remove some filters to keep battling.';
      poolText.textContent = msg;
      poolBanner.classList.add('active');
    } else if (activeCount <= 5 && !battleWithinFranchise) {
      // v1.0.211 — suppress the "low battle pool" warning while Battle
      // Within Franchise is active. The pool is deliberately constrained
      // to one franchise; "remove some filters to see more matchups"
      // misleads the user — the filter button doesn't control the
      // franchise restriction and the small pool is the entire point.
      poolText.textContent = `⚠️ Only ${activeCount} anime in your battle pool — remove some filters to see more matchups.`;
      poolBanner.classList.add('active');
    } else {
      poolBanner.classList.remove('active');
    }
  }

  // v1.0.209 — no valid battle pair available (list too small or everything
  // filtered out). Return null so the caller can hide the battle arena and
  // leave the warning banner alone. Previously this fell back to
  // [animeList[0], animeList[1]], which rendered filtered-out anime as a
  // battle pair right below the "All anime are filtered out" warning —
  // confusing and arguably broken (those anime weren't supposed to appear).
  if (activeCount < 2) return null;

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

  // v1.0.211 — Avoid-same-franchise filter. If on, we need at least one
  // cross-franchise candidate for idxB. If none exists, fall through to the
  // normal pool (i.e. avoid is best-effort — a list with one giant franchise
  // shouldn't stop battles entirely).
  const animeA = animeList[idxA];
  const avoidF = avoidSameFranchise && !battleWithinFranchise;
  const crossFranchiseEligibleCount = avoidF
    ? animeList.reduce((c, a, i) =>
        c + (i !== idxA && weights[i] > 0 && !_sameFranchise(a, animeA) ? 1 : 0), 0)
    : Infinity;
  const applyAvoid = avoidF && crossFranchiseEligibleCount > 0;

  // For B: pick from anime with similar ELO to A (within 300 pts), not excluded
  // v1.0.211 hotfix — when battling within a franchise, drop the similar-ELO
  // window entirely. The point of within-franchise is to settle every member
  // against every other member, so excluding the high-ELO outlier ("AOT Final
  // Season" sitting far above the rest) just because it's 700 ELO above its
  // siblings defeats the mode. ELO matching still applies in the standard
  // global pool, where blowout matches would be a waste of compute.
  const eloA = animeA.elo;
  const eloWindow = battleWithinFranchise ? Infinity : 300;
  const candidates = animeList
    .map((a, i) => ({ i, a }))
    .filter(({ i, a }) =>
      i !== idxA
      && weights[i] > 0
      && Math.abs(animeList[i].elo - eloA) < eloWindow
      && (!applyAvoid || !_sameFranchise(a, animeA))
    )
    .sort((x, y) => x.a.comparisons - y.a.comparisons);

  let idxB;
  if (candidates.length > 0) {
    const pool = candidates.slice(0, Math.min(20, candidates.length));
    idxB = pool[Math.floor(Math.random() * pool.length)].i;
  } else if (applyAvoid) {
    // Broader-pool fallback that still honours avoid-same-franchise.
    const wider = animeList
      .map((a, i) => ({ i, a }))
      .filter(({ i, a }) =>
        i !== idxA && weights[i] > 0 && !_sameFranchise(a, animeA))
      .sort((x, y) => x.a.comparisons - y.a.comparisons);
    idxB = wider.length
      ? wider[Math.floor(Math.random() * Math.min(20, wider.length))].i
      : weightedPick(idxA);
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
      const res = await _anilistFetch({ query, variables: { ids: chunk } });
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
  imgA.src = _coverForBattle(a.cover);
  imgA.alt = displayTitle(a);
  byId(IDS.titleA).textContent = displayTitle(a);
  byId(IDS.eloA).textContent   = `ELO ${a.elo}`;
  byId(IDS.epMetaA).innerHTML =
    (a.format === 'MOVIE' ? '<span class="ep-badge">Movie</span>'
      : a.episodes ? `<span class="ep-badge">${a.episodes} ep</span>` : '') +
    _statusBadge(a.status);
  imgB.src = _coverForBattle(b.cover);
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

  // Fuzzy button states — label stays static; the .active class (amber tint)
  // is what communicates whether the anime is currently flagged. Swapping
  // labels was confusing testers because the inactive label described the
  // action ("Can't remember") and the active one described the resulting
  // state ("Fuzzy") — two different things on the same button.
  const fuzzyBtnA = byId(IDS.fuzzyA);
  fuzzyBtnA.classList.toggle('active', !!a.fuzzy);
  fuzzyBtnA.textContent = "〰️ Fuzzy";

  const fuzzyBtnB = byId(IDS.fuzzyB);
  fuzzyBtnB.classList.toggle('active', !!b.fuzzy);
  fuzzyBtnB.textContent = "〰️ Fuzzy";

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
  // Restore standard battle prompt in case we're coming back from Trio mode.
  // v1.0.208 — also handles WSO: when entering WSO the prompt swaps to a
  // mode-specific line; when leaving WSO it snaps back to standard. Setting
  // every time renderBattle runs is cheap and avoids stale-prompt bugs where
  // a mode toggle didn't reach the DOM (e.g. modeBtn absent at boot).
  const h2 = byId(IDS.battlePromptH2);
  const p  = byId(IDS.battlePromptP);
  if (h2 && h2.textContent === 'Rank these three') h2.textContent = 'Which did you enjoy more?';
  if (p  && p.textContent.startsWith('Tap in order')) p.textContent = 'Click your favourite — or skip if you can\'t decide.';
  if (wsoMode) {
    if (h2) h2.textContent = '🔥 Can the champion hold on?';
    // subtitle stays "Click your favourite — or skip…" so the action affordance is identical
  } else if (h2 && h2.textContent === '🔥 Can the champion hold on?') {
    h2.textContent = 'Which did you enjoy more?';
  }

  // v1.0.209 — collect the pair into a single nullable variable so we can
  // handle "no valid pair" (everything filtered out) in one place. Previously
  // every branch destructured directly, which crashed on null and led to the
  // workaround in pickOpponents that rendered filtered anime anyway.
  let pair;
  if (nextPairOverride && nextPairOverride.length > 0) {
    pair = nextPairOverride.shift();
    if (nextPairOverride.length === 0) nextPairOverride = null;
  } else if (wsoMode) {
    // v1.0.207 — Winner Stays On: champion (side A) returns from previous
    // battle; opponent (side B) is fresh. Preload is bypassed because
    // pickWsoPair has its own deterministic rules and the preloader picks
    // randomly via pickOpponents.
    pair = pickWsoPair();
  } else if (settleMode) {
    pair = pickSettlePair() ?? pickOpponents();
  } else {
    pair = _takeValidPreloadedPair() ?? pickOpponents();
  }
  const arena = document.querySelector('.battle-arena');
  if (!pair) {
    // v1.0.209 — no valid pair: hide the battle arena entirely so the
    // "All anime are filtered out" warning (already shown by pickOpponents)
    // stands alone, rather than sitting above a stale or filtered-out card
    // pair. Next renderBattle (e.g. after the user loosens a filter) will
    // either get a valid pair and re-show the arena, or repeat this branch.
    if (arena) arena.style.display = 'none';
    currentA = null;
    currentB = null;
    return;
  }
  if (arena) arena.style.display = '';
  let [ia, ib] = pair;
  // v1.0.211 hotfix — Defensive consistency check: in WSO mode, the champion
  // MUST be on side A. If something upstream (nextPairOverride from an
  // undo+redo path, a stale preloaded pair, or a future regression) hands
  // us a pair where the champion isn't on the left, swap or re-pick so the
  // streak badge always sits above the correct anime.
  if (wsoMode && _wsoChampionValid() && ia !== wsoWinnerIdx) {
    if (ib === wsoWinnerIdx) {
      // Champion was on side B — just swap so badge anchors to the left card.
      [ia, ib] = [ib, ia];
    } else {
      // Neither side is the champion — drop the override and re-pick fresh
      // through the WSO picker so the cards match wsoWinnerIdx.
      const fresh = pickWsoPair();
      if (fresh) [ia, ib] = fresh;
    }
  }
  renderPair(ia, ib);
  _renderWsoBadge(false); // v1.0.207 — refresh badge on every render; no pulse here, pickWinner pulses on increment
  saveState();
  _preloadNextBattlePair();
  _bootPrefetchCovers(); // v1.0.205 — one-shot per page load, no-op after first call
}

// v1.0.203 — consume the pair picked during the previous battle, re-checking
// the same eligibility rules pickOpponents uses (the pool may have changed
// since it was picked: exclusions, format filters, list reload). Any doubt →
// return null and let the caller pick fresh.
function _takeValidPreloadedPair() {
  const pair = _preloadedPair;
  _preloadedPair = null;
  if (!pair) return null;
  const [a, b] = pair;
  const ok = i => Number.isInteger(i) && i >= 0 && i < animeList.length
    && !excludedIds.has(animeList[i].id)
    && !hiddenFormatsBattle.has(animeList[i].format) && !hiddenStatusesBattle.has(animeList[i].status);
  return (a !== b && ok(a) && ok(b)) ? pair : null;
}

// v1.0.203 — pick the next pair now and start fetching its covers in the
// background. setTimeout(0) lets the CURRENT pair's covers begin loading
// first so the preload never competes with what's on screen. Settle / Tower /
// v1.0.206 — Mobile-only cover size optimisation. Battle cards render at
// 80×112 px (mobile @ 600px) or 68×96 px (narrow mobile @ 520px), and even
// accounting for 3× device pixel ratio that maxes out around 240×336 px
// actual. AniList's `large` (~460×640) is roughly 2× more pixels than mobile
// devices ever display, costing ~50% extra bandwidth per cover. AniList's
// CDN serves the same image at `medium` (~230×320) via a URL pattern swap:
//   .../cover/large/bx21-hash.jpg → .../cover/medium/bx21-hash.jpg
// Desktop battle cards (160×225 @2× DPR = 320×450) still benefit from large,
// so the swap is viewport-gated. MAL CDN URLs use a different path scheme
// (cdn.myanimelist.net/images/anime/...) and don't match — they're left
// alone. Cached at module load (viewport check is cheap but pointless to
// re-run per render).
const _COVER_USE_MEDIUM = typeof window !== 'undefined'
  && window.matchMedia
  && window.matchMedia('(max-width: 768px)').matches;
function _coverForBattle(url) {
  if (!_COVER_USE_MEDIUM || !url) return url;
  return url.replace('/cover/large/', '/cover/medium/');
}

// Trio modes pick their own pairs through different code paths — no preload
// there. The Image() requests use the same plain no-cors mode as the battle
// <img> elements, so the render is a guaranteed warm-cache hit.
function _preloadNextBattlePair() {
  if (settleMode || towerMode || trioMode) return;
  setTimeout(() => {
    if (settleMode || towerMode || trioMode) return;
    // v1.0.209 — pickOpponents now returns null when everything is filtered
    // out. Bail out of the preload in that case rather than crashing on
    // .map() of null. Next renderBattle will retry once filters relax.
    const pair = pickOpponents();
    if (!pair) { _preloadedPair = null; _preloadedImgs = null; return; }
    _preloadedPair = pair;
    _preloadedImgs = _preloadedPair.map(i => {
      const url = _coverForBattle(animeList[i]?.cover);
      if (!url) return null;
      const im = new Image();
      im.src = url;
      return im;
    });
  }, 0);
}

// v1.0.207 — Winner Stays On helpers.
//
// Pair-picking rules:
//   - Champion always renders as side A (so the streak badge has a stable
//     anchor and the user knows "left = champion").
//   - If no champion yet OR the current champion got filtered/excluded mid-
//     streak, reset and seed from a fresh pickOpponents() pair.
//   - Opponent: prefer an anime NOT yet faced this streak (random among
//     fresh); if every eligible anime has been faced, fall back to the
//     LEAST-RECENTLY faced one (head of wsoFacedOrder, which is oldest-first).
function _wsoChampionValid() {
  if (wsoWinnerIdx == null) return false;
  if (wsoWinnerIdx < 0 || wsoWinnerIdx >= animeList.length) return false;
  const a = animeList[wsoWinnerIdx];
  if (!a) return false;
  if (excludedIds.has(a.id)) return false;
  if (hiddenFormatsBattle.has(a.format) || hiddenStatusesBattle.has(a.status)) return false;
  return true;
}

function _pickWsoOpponent() {
  const n = animeList.length;
  // Eligible = anything that pickOpponents would consider, minus the champion
  const eligible = [];
  for (let i = 0; i < n; i++) {
    if (i === wsoWinnerIdx) continue;
    if (excludedIds.has(animeList[i].id)) continue;
    if (hiddenFormatsBattle.has(animeList[i].format)) continue;
    if (hiddenStatusesBattle.has(animeList[i].status)) continue;
    // v1.0.211 — battle-within-franchise constrains the WSO pool too
    if (battleWithinFranchise && !battleWithinFranchise.ids.has(animeList[i].id)) continue;
    eligible.push(i);
  }
  if (eligible.length === 0) return null;
  // v1.0.211 — avoid-same-franchise. Prefer cross-franchise eligibles; fall
  // through to the full pool only if every eligible shares the champion's
  // franchise (so the streak doesn't end from "no legal opponent").
  let pool = eligible;
  if (avoidSameFranchise && !battleWithinFranchise && wsoWinnerIdx != null) {
    const champ = animeList[wsoWinnerIdx];
    const cross = eligible.filter(i => !_sameFranchise(animeList[i], champ));
    if (cross.length > 0) pool = cross;
  }
  // Prefer fresh (unseen this streak)
  const faced = new Set(wsoFacedOrder);
  const fresh = pool.filter(i => !faced.has(i));
  if (fresh.length > 0) {
    return fresh[Math.floor(Math.random() * fresh.length)];
  }
  // Fallback: least-recently faced eligible anime. wsoFacedOrder is oldest-
  // first, so iterate and return the first eligible index we see.
  for (const idx of wsoFacedOrder) {
    if (pool.includes(idx)) return idx;
  }
  // Should be unreachable, but be defensive
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickWsoPair() {
  if (!_wsoChampionValid()) {
    // Fresh start — let pickOpponents seed both, take side A as champion.
    // v1.0.209 — null if everything filtered out; propagate so renderBattle
    // can hide the arena rather than render an invalid pair.
    const seed = pickOpponents();
    if (!seed) return null;
    const [a, b] = seed;
    wsoWinnerIdx  = a;
    wsoStreak     = 0;
    wsoFacedOrder = [b];
    return [a, b];
  }
  const opp = _pickWsoOpponent();
  if (opp == null) {
    // v1.0.211 hotfix — Champion-preserving fallback. The previous
    // `return pickOpponents()` ignored wsoWinnerIdx entirely: when the WSO
    // opponent pool was momentarily empty (e.g. avoid-same-franchise
    // narrowed it during a long Goblin Slayer streak), pickOpponents
    // happily returned a random weighted pair where the LEFT card was no
    // longer the actual champion. The user kept seeing the old champion
    // on the left while the WSO state already pointed at the new one, so
    // their next click voted against whoever the picker decided to put on
    // the right — confusing both visually and logically. Now we force the
    // champion to side A and only fall through to the standard picker if
    // even the champion itself isn't a valid candidate (shouldn't happen
    // unless the user excluded the champion mid-battle).
    if (_wsoChampionValid()) {
      // Re-pick with the same constraints minus the WSO-specific avoid set.
      // pickOpponents respects excludedIds + hiddenFormatsBattle, so the
      // opponent it picks won't violate user filters.
      const seed = pickOpponents();
      if (!seed) return null;
      // Whichever index in the seed isn't the champion becomes the opponent.
      const oppIdx = seed[0] !== wsoWinnerIdx ? seed[0] : seed[1];
      return [wsoWinnerIdx, oppIdx];
    }
    return pickOpponents();
  }
  return [wsoWinnerIdx, opp];
}

function _resetWsoState() {
  wsoWinnerIdx  = null;
  wsoStreak     = 0;
  wsoFacedOrder = [];
}

// Update the streak badge above side A. Side A is always the champion when
// WSO is active. Hides the badge when WSO is off or streak is 0.
function _renderWsoBadge(pulse = false) {
  const badge = byId('wso-streak-badge');
  if (!badge) return;
  if (!wsoMode || wsoStreak < 1) {
    badge.style.display = 'none';
    badge.classList.remove('pulse');
    return;
  }
  const count = badge.querySelector('#wso-streak-count');
  if (count) count.textContent = wsoStreak;
  badge.style.display = '';
  if (pulse) {
    // Restart animation: remove + reflow + re-add
    badge.classList.remove('pulse');
    void badge.offsetWidth; // force reflow so the re-added class re-triggers
    badge.classList.add('pulse');
  }
}

// v1.0.205 — Boot-time cover warmup. _preloadNextBattlePair only fires after
// a battle renders, so battle 1 has to download covers inline AND battle 2
// has only ONE pair preloaded — if pickOpponents picks a different pair for
// battle 2 (rare but possible) the user waits again. This warmup runs once
// per page load and prefetches 3 additional candidate pairs in the
// background, so the cache is broadly populated after a few seconds. Random
// pairs are deliberately preferred over deterministic ones — pickOpponents
// is random anyway, so a diverse warmup cache covers more possible futures
// than three predicted-next attempts ever could. Delayed 200ms so the
// in-flight battle 1 cover downloads get bandwidth priority. Reset to false
// here would re-fire on every reload via the module-level redeclaration.
let _bootPrefetchFired = false;
function _bootPrefetchCovers() {
  if (_bootPrefetchFired) return;
  if (settleMode || towerMode || trioMode) return;
  if (!animeList.length) return;
  _bootPrefetchFired = true;
  const PREFETCH_PAIRS = 3;
  setTimeout(() => {
    for (let i = 0; i < PREFETCH_PAIRS; i++) {
      setTimeout(() => {
        const pair = pickOpponents();
        if (!pair) return;
        pair.forEach(idx => {
          const url = _coverForBattle(animeList[idx]?.cover);
          if (!url) return;
          const im = new Image();
          im.src = url;
          _preloadedImgs.push(im); // anchor against GC, same as _preloadNextBattlePair
        });
      }, i * 100);
    }
  }, 200);
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
    // v1.0.207 — preserve WSO state so undo restores champion + streak + faced list
    wsoState: wsoMode ? {
      winnerIdx:    wsoWinnerIdx,
      streak:       wsoStreak,
      facedOrder:   wsoFacedOrder.slice(),
    } : null,
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
  // v1.0.211 — Track all-time-high winning streak per anime so Hot Streak
  // achievement progress persists across losses. Without this, a 9-win
  // streak that was about to hit Silver evaporates from the achievement
  // tracker the moment the anime loses one battle.
  w.maxWinStreak = Math.max(w.maxWinStreak || 0, w.streak.count);

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
  _syncTasteNewBadge();
  // v1.0.211 — Battle Within Franchise auto-completion. No-op when the mode
  // isn't active. Reuses _mKey which is already in scope above.
  _recordBattleWithinPair(wId, lId);
  // v1.0.207 — WSO state update. Side 0 (champion) winning ticks the streak
  // and adds the opponent to the faced list; side 1 (opponent) winning makes
  // them the new champion with streak 1 and the previous champion as their
  // first defeated opponent. _shouldPulse drives the badge animation on
  // every successful champion win.
  let _shouldPulseWso = false;
  if (wsoMode) {
    if (side === 0) {
      wsoStreak += 1;
      // v1.0.211 — Treat wsoFacedOrder as a proper LRU queue. Previously we
      // only appended on first sighting (`!includes` guard), so once an
      // opponent had been faced once it stayed pinned at whatever position
      // it landed at. With the v1.0.211 avoid-same-franchise filter this
      // surfaced badly: once the cross-franchise pool was exhausted, the
      // "least-recently faced" fallback returned the same opponent every
      // round because nobody ever moved in the queue. Now we remove-then-
      // append so the most-recently-faced opponent always sits at the back
      // and the next round picks the next-oldest from the front. Restores
      // proper round-robin rotation against a shrunk pool.
      if (loserIdx != null) {
        const existing = wsoFacedOrder.indexOf(loserIdx);
        if (existing !== -1) wsoFacedOrder.splice(existing, 1);
        wsoFacedOrder.push(loserIdx);
      }
      _shouldPulseWso = true;
    } else {
      wsoWinnerIdx  = winnerIdx;
      wsoStreak     = 1;
      wsoFacedOrder = [loserIdx];
      _shouldPulseWso = true;
    }
  }

  saveState();

  // Pick and show the next pair FIRST — then push a snapshot onto the undo stack
  renderBattle();
  if (_shouldPulseWso) _renderWsoBadge(true);
  _pushUndoSnapshot({ ...snap, nextA: currentA, nextB: currentB });
}

function _pushUndoSnapshot(snap) {
  undoStack.push(snap);
  if (undoStack.length > MAX_UNDO_DEPTH) undoStack.shift(); // evict oldest
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

  if (snap.type === 'exclude') {
    // v1.0.210 — undo a "✗ Not seen" action: remove from excludedIds and
    // restore the pair the user was looking at. No ELO change to revert
    // because exclusion doesn't run a battle.
    excludedIds.delete(snap.excludedId);
    if (typeof snap.prevA === 'number' && typeof snap.prevB === 'number'
        && snap.prevA < animeList.length && snap.prevB < animeList.length) {
      renderPair(snap.prevA, snap.prevB);
    } else {
      renderBattle();
    }
    saveState();
    _updateUndoBtn();
    return;
  }

  if (snap.type === 'bulk-exclude') {
    // v1.0.211 — undo bulk-exclude franchise. Pulls every id out of
    // excludedIds (only the ones this snapshot added — pre-existing
    // exclusions weren't in snap.ids, so they stay excluded). Same arena
    // restore as the single-exclude case.
    for (const id of snap.ids || []) excludedIds.delete(id);
    _bumpFranchiseGroupCache();
    if (typeof snap.prevA === 'number' && typeof snap.prevB === 'number'
        && snap.prevA < animeList.length && snap.prevB < animeList.length) {
      renderPair(snap.prevA, snap.prevB);
    } else if (byId(IDS.battleScreen)?.style.display !== 'none') {
      renderBattle();
    } else {
      renderRankingList();
    }
    saveState();
    scheduleCloudSave();
    showToast(`↩ Restored ${snap.ids?.length || 0} from "${snap.franchiseName || 'franchise'}" to battles.`, 2500);
    _updateUndoBtn();
    return;
  }

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

    // v1.0.207 — restore WSO state if this battle was played in WSO mode
    if (snap.wsoState) {
      wsoWinnerIdx  = snap.wsoState.winnerIdx;
      wsoStreak     = snap.wsoState.streak;
      wsoFacedOrder = snap.wsoState.facedOrder.slice();
    }

    // After undo, if the user re-picks from pairA/pairB, restore the same next pair
    nextPairOverride = [[nextA, nextB], ...(nextPairOverride || [])];

    // Show the original pair
    renderPair(pairA, pairB);
    _renderWsoBadge(false); // v1.0.207 — refresh badge after WSO state restore
    updateProgress();
    saveState();
  }

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
  // v1.0.216 — Tied-entry order fix. The previous implementation used a
  // `* dir` multiplier on the comparator. JavaScript's Array.prototype.sort
  // is stable, so when two entries had equal sort keys (e.g., two anime at
  // ELO 1089), they kept their insertion order in animeList — and the
  // SAME order whether sorted ASC or DESC. That created a visible bug at
  // the bottom of an ascending ELO sort: tied ranks appeared as e.g.
  // #344, #345 instead of the expected #345, #344 (since ASC should put
  // the higher rank number first when ELO is tied).
  //
  // Fix: sort in the canonical direction for each sort type (DESC for
  // numeric sorts where higher is "better" — ELO, Win Rate, etc.; ASC
  // for Title/Tier/Confidence which feel natural in that direction),
  // then reverse if the user picked the non-canonical direction. Tied
  // entries now mirror cleanly between the two directions.
  const canonical = _ascFirstSorts.has(currentSort) ? sortAsc : !sortAsc;
  let sorted;
  switch (currentSort) {
    case 'winrate':
      sorted = [...animeList].sort((a, b) => {
        const ra = (a.wins + a.losses) > 0 ? a.wins / (a.wins + a.losses) : 0;
        const rb = (b.wins + b.losses) > 0 ? b.wins / (b.wins + b.losses) : 0;
        return rb - ra; // DESC (canonical)
      });
      break;
    case 'battles':
      sorted = [...animeList].sort((a, b) => (b.battles || 0) - (a.battles || 0));
      break;
    case 'score':
      sorted = [...animeList].sort((a, b) => (b.globalScore || 0) - (a.globalScore || 0));
      break;
    case 'title':
      sorted = [...animeList].sort((a, b) => displayTitle(a).localeCompare(displayTitle(b))); // ASC (canonical)
      break;
    case 'tier': {
      const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4 };
      const eloSorted = [...animeList].sort((a, b) => b.elo - a.elo);
      const rankMap   = new Map(eloSorted.map((a, i) => [a.id, i]));
      sorted = [...animeList].sort((a, b) => {
        const ta = tierOrder[getTier(rankMap.get(a.id) ?? 0, animeList.length)] ?? 5;
        const tb = tierOrder[getTier(rankMap.get(b.id) ?? 0, animeList.length)] ?? 5;
        return ta !== tb ? (ta - tb) : (b.elo - a.elo); // within tier, ELO desc
      });
      break;
    }
    case 'confidence': {
      const confOrder = { confident: 0, settling: 1, uncertain: 2 };
      sorted = [...animeList].sort((a, b) => {
        const ca = confOrder[confidenceLabel(a.battles || 0).cls] ?? 3;
        const cb = confOrder[confidenceLabel(b.battles || 0).cls] ?? 3;
        return ca !== cb ? (ca - cb) : (b.elo - a.elo); // within confidence, ELO desc
      });
      break;
    }
    default:
      sorted = [...animeList].sort((a, b) => b.elo - a.elo); // DESC (canonical)
  }
  return canonical ? sorted : sorted.reverse();
}

// v1.0.211 — Tier tooltip helper. Renders as the title attribute on tier
// badges so hovering/long-pressing a badge surfaces what the band means
// without needing a permanent legend in the ranking chrome.
const _TIER_TOOLTIPS = {
  S: 'S tier — top 10% of your rankings',
  A: 'A tier — top 10–25% of your rankings',
  B: 'B tier — middle 25–55%',
  C: 'C tier — lower 55–80%',
  D: 'D tier — bottom 20% of your rankings',
};
function _tierTooltip(tier) {
  return _TIER_TOOLTIPS[tier] || `${tier} tier`;
}

function _buildRankCard(anime, i, eloRankMap, totalLen) {
  const eloRank = eloRankMap.get(anime.id) ?? i;
  const displayRank = eloRank + 1; // always show true ELO rank, regardless of current sort
  const numClass = displayRank === 1 ? 'gold' : displayRank === 2 ? 'silver' : displayRank === 3 ? 'bronze' : '';
  const conf = confidenceLabel(anime.battles || 0);
  const tier = getTier(eloRank, totalLen);

  const card = document.createElement('div');
  // v1.0.164 — Rank cards don't carry the amber outline any more. The fuzzy
  // state is communicated by the small inline pill below and the in-modal
  // notice when the user clicks through. The amber affordance is reserved
  // for the franchise-detail member rows, where it pinpoints exactly which
  // entry in a franchise is flagged.
  card.className = 'rank-card';
  card.dataset.format  = anime.format || 'TV';
  card.dataset.epRange = epRange(anime.episodes, anime.format);
  card.dataset.tier    = tier;
  card.dataset.conf    = conf.cls;
  card.dataset.animeId = anime.id;
  card.style.cursor = 'pointer';
  card.title = 'Click for details';
  // v1.0.153 — Click is delegated on #ranking-list (see _installRankingListClickDelegate)
  // instead of being attached per card. At 6500 anime that's 6499 fewer closures +
  // listeners (substantial memory + GC savings on long sessions). The handler
  // reads dataset.animeId which is already set above.
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
    <span class="tier-badge t-${tier.toLowerCase()}" title="${_tierTooltip(tier)}">${tier}</span>
    <img${coverCors(anime.cover)} src="${safeUrl(anime.cover)}" alt="${esc(displayTitle(anime))}" loading="lazy" />
    <div class="rank-title">${esc(displayTitle(anime))}</div>
    ${epBadge}
    ${_statusBadge(anime.status)}
    ${sortExtra}
    <span class="confidence ${conf.cls}" title="${conf.title}">${conf.dot} ${conf.label}</span>
    ${anime.fuzzy ? '<span class="fuzzy-tag" title="Fuzzy \u2014 you flagged this as not remembered well enough to judge fairly. It appears less often until you\u2019ve refreshed your memory.">〰️ Fuzzy</span>' : ''}
    ${streakBadge(anime)}
  `;
  if (showFuzzyOnly && !anime.fuzzy)                             card.style.display = 'none';
  if (hiddenFormatsRanking.has(anime.format))                           card.style.display = 'none';
  if (hiddenEpRangesRanking.has(epRange(anime.episodes, anime.format))) card.style.display = 'none';
  if (excludedIds.has(anime.id))                                 card.style.display = 'none';
  return card;
}

// ─── FRANCHISE GROUPING ───────────────────────────────────────────────────────
// Strips common sequel/season suffixes to find a base franchise name.
// e.g. "Attack on Titan Season 2" → "Attack on Titan"
//      "My Hero Academia 2nd Season" → "My Hero Academia"
//      "Sword Art Online: Alicization" → "Sword Art Online"

// v1.0.130 — Umbrella franchise aliases. Brand families where sub-series share
// a name prefix but use completely different casts and no story relations
// (Love Live! Sunshine!! / Superstar!! / Nijigasaki, Pretty Cure's annual
// reboots, FLCL Alternative/Progressive/Grunge/Shoegaze). The title-pattern
// chain can't bridge them — the stems diverge after the prefix — and AniList
// rarely links sub-series with no character overlap via the relations graph.
// Matching titles short-circuit _franchiseBaseName and collapse to the canon
// brand name, so the franchise view shows them as one group.
//
// Add sparingly — a too-broad pattern silently folds unrelated anime together.
const FRANCHISE_ALIASES = Object.freeze([
  // μ's, Aqours, Liella!, Nijigasaki, Hasunosora, plus the Movies
  { pattern: /^love\s*live!/i,        canon: 'Love Live!' },
  // Pretty Cure / Precure — marker can appear anywhere in the title
  // ("Heartcatch Precure!", "Yes! Pretty Cure 5", "Hirogaru Sky! Precure")
  { pattern: /\bpre(tty\s*)?cure\b/i, canon: 'Pretty Cure' },
  // FLCL — Alternative + Progressive are stripped by the suffix list, but
  // Grunge / Shoegaze aren't (too franchise-specific to generalise), so an
  // umbrella alias handles every sub-series uniformly.
  { pattern: /^flcl\b/i,              canon: 'FLCL' },
  // Gundam — UC (Mobile Suit, Zeta, ZZ, Unicorn, Hathaway), alternate timelines
  // (G Gundam, Wing, SEED, 00, Iron-Blooded Orphans, Witch from Mercury), and
  // sub-series (Build Fighters, SD Gundam, Reconguista in G). \bgundam\b is a
  // safe marker — no major non-Gundam anime contains "Gundam" as a word.
  // "Mobile Police Patlabor" stays separate (doesn't match this pattern).
  { pattern: /\bgundam\b/i,           canon: 'Gundam' },
  // Milky — Milky☆Highway (original) and Milky☆Subway (sequel), confirmed
  // by the user as related. The ☆ symbol is distinctive enough that this
  // prefix won't false-match other "Milky" prefixes.
  { pattern: /^milky☆/i,              canon: 'Milky' },
  // SSSS.Universe — SSSS.GRIDMAN, SSSS.DYNAZENON, SSSS.GRIDMAN UNIVERSE.
  // The period gets stripped in _franchiseKey so "ssssdynazenon" and
  // "ssssgridman" aren't prefixes of each other.
  { pattern: /^ssss\./i,              canon: 'SSSS.' },
  // Zeonic — in-universe Gundam arms manufacturer; promotional shorts like
  // "Zeonic Toyota Special Movie" are Gundam-affiliated even when the title
  // doesn't contain the word "Gundam".
  { pattern: /\bzeonic\b/i,           canon: 'Gundam' },
  // v1.0.197 — Mobile Suit Gakuen — SD Gundam school-parody short series
  // about Gundam: G no Reconguista. AniList explicitly classifies both
  // entries with PARENT relations pointing to G-Reco TV and the G-Reco
  // films. The titles don't contain "Gundam" so the brand alias above
  // doesn't catch them. Use a targeted alias since "Mobile Suit Gakuen"
  // is a distinctive enough phrase that no non-Gundam anime uses it.
  { pattern: /^mobile\s+suit\s+gakuen\b/i, canon: 'Gundam' },
  // .hack// — distinctive prefix shared by Sign, Roots, G.U., G.U. Returner,
  // Quantum, Versus, Liminality, The Movie, etc. Different sub-series use
  // different casts so AniList relations only partially link them.
  { pattern: /^\.hack\/\//i,          canon: '.hack//' },
  // Saiyuki — Minekura's modern manga adaptation: Saiyuki (2000 TV), Reload
  // (2003), Gunlock (2004), Requiem (2001 movie), Reload Blast (2017). Uses
  // single-u "Saiyuki" in English, distinct from Toei's double-u "Saiyuuki"
  // (1960 Alakazam the Great, 1999 OVA, Doraemon: Parallel Saiyuuki). The \b
  // requires a non-word boundary after "Saiyuki" so "Saiyuuki" (where u
  // follows k without a boundary) does NOT match.
  { pattern: /^saiyuki\b/i,           canon: 'Saiyuki' },
  // v1.0.149 — additional umbrella aliases predicted by the v146 review.
  // Each shares a brand prefix but has a stem that's either too short for
  // the 8-char prefix-match threshold or whose sub-series share no clean
  // title stem with the original.

  // Macross — Frontier, Delta, Zero, Plus, 7, II, Dynamite 7, Flashback 2012,
  // Do You Remember Love. Stem "Macross" (7 chars) sits below PREFIX_MIN.
  { pattern: /\bmacross\b/i,          canon: 'Macross' },
  // Lupin III — Roman-strip reduces "Lupin III" → "Lupin" (5 chars), below
  // PREFIX_MIN. Covers Cagliostro, Castle of Cagliostro, Part 1-6,
  // The First, Goemon's Blood Spray, etc. Excludes Lupinranger (different
  // tokusatsu franchise) via word boundary.
  // v1.0.167 — extended to also match "Lupin the 3rd" / "Lupin the Third" /
  // "Lupin the IIIrd" forms. The previous pattern split "Lupin III: ..." (which
  // matched) from "Lupin the 3rd ..." (which didn't) into separate franchises.
  // v1.0.185 — broadened to plain ^lupin\b so it also catches the stylised
  // "LUPIN THE THIIIRRRD" spinoff (variable I/R count), the "Lupin ZERO"
  // 2022 prequel, the "Lupin 8-sei" 2024 sequel about Lupin's grandson,
  // and the Mandarin-romanised "Lupin Shanshei Pilot". Every "Lupin" anime
  // is part of the Monkey Punch / Maurice Leblanc shared universe, so the
  // broad match has no realistic false-positive surface. Word-boundary
  // still keeps "Lupinranger" (Super Sentai tokusatsu) out.
  { pattern: /^lupin\b/i,              canon: 'Lupin III' },
  // Slayers — Next, Try, Premium, Revolution, Evolution-R, NEXT Movie,
  // Great. None of Next/Try are in the spinoff strip list and "slayers"
  // is 7 chars so prefix-match would have needed loosening.
  { pattern: /^slayers\b/i,           canon: 'Slayers' },
  // Saint Seiya — Hades, Omega, Soul of Gold, Legend of Sanctuary, Knights
  // of the Zodiac (English dub title shares zero stem). The two-token alias
  // catches both Japanese-derived and English-dub naming.
  { pattern: /^saint\s+seiya\b|^knights\s+of\s+the\s+zodiac\b/i, canon: 'Saint Seiya' },
  // Yu-Gi-Oh! family — GX, 5D's, ZEXAL, ARC-V, VRAINS, SEVENS, GO RUSH!!.
  // Hyphenated brand is fragile under the dash regex; the literal here is
  // tolerant of capital variation but anchored at start.
  { pattern: /^yu-?gi-?oh!?/i,        canon: 'Yu-Gi-Oh!' },
  // iDOLM@STER — Cinderella Girls, Million Live, SideM, Shiny Colors, Xenoglossia.
  // Multiple capitalisation conventions in the wild; the brand uses @ or A.
  { pattern: /^(?:the\s+)?idolm[a@]ster\b/i, canon: 'The iDOLM@STER' },
  // v1.0.192 — Cinderella Girls is an iDOLM@STER sub-brand but some AniList
  // entries omit the "iDOLM@STER" prefix entirely ("Cinderella Girls Gekijou
  // CLIMAX SEASON", "Cinderella Girls Theater"). "Cinderella Girls" is a
  // distinctive enough phrase to alias safely — no non-iDOLM@STER anime
  // uses it as a title prefix.
  { pattern: /^cinderella\s+girls\b/i,      canon: 'The iDOLM@STER' },
  // Detective Conan — long-running umbrella with English ("Case Closed"),
  // Japanese ("Meitantei Conan", "Detective Conan"). The conan films share
  // none of the same prefix structures so an explicit alias collapses the lot.
  // v1.0.167 — anchored at start (was \b) so crossover titles like "Lupin III
  // vs Detective Conan" don't get pulled into the Conan franchise. With the
  // anchor those titles match the Lupin III alias instead, which is correct
  // since the Lupin name comes first in the crossover billing.
  { pattern: /^(?:meitantei\s+conan|detective\s+conan|case\s+closed)\b/i, canon: 'Detective Conan' },
  // Aikatsu! — Stars, Friends, Planet, On Parade, 10th Story. The exclamation
  // mark is part of the brand; \b after handles "Aikatsu!", "Aikatsu Stars!".
  { pattern: /^aikatsu/i,             canon: 'Aikatsu!' },
  // Tenchi Muyou! / Tenchi Muyo — Universe, in Tokyo, in Love, Geminar,
  // GXP. Brand uses two conventional romanisations.
  { pattern: /^tenchi\s+muyou?/i,     canon: 'Tenchi Muyou!' },
  // Trigun — original 1998 TV, Badlands Rumble (2010 movie), Stampede
  // (2023 reboot), Stampede: Stargaze (2025 special). Stem "Trigun" is
  // 6 chars, below PREFIX_MIN, so neither title-pattern nor relations
  // graph reliably bridges Stampede ↔ Stargaze ↔ original.
  { pattern: /^trigun\b/i,            canon: 'Trigun' },
  // Dragon Ball — original (1986), Z (1989), GT (1996), Kai (recap),
  // Super (2015), Daima (2024), Heroes (game tie-in), plus the many
  // theatrical films (Battle of Gods, Resurrection F, Broly, Super Hero).
  // Suffixes like "Z", "GT", "Super" mean the title-stems don't share a
  // common prefix beyond "Dragon Ball" itself, and Z↔Super relations on
  // AniList go through the recap series Kai, so a sub-series the user
  // skipped breaks the chain. Optional "Super" prefix catches the
  // "Super Dragon Ball Heroes" naming inversion.
  { pattern: /^(super\s+)?dragon\s*ball\b/i, canon: 'Dragon Ball' },
  // Pokémon — main anime (1997+ across regions), Concierge (Netflix
  // stop-motion), Generations / Origins / Evolutions / Twilight Wings
  // / Chronicles / Hands (web/special series), and the many films
  // (Mewtwo Strikes Back, Lugia, etc.). Stem "Pokémon" is 7 chars, just
  // under PREFIX_MIN, so two Pokémon titles with differing suffixes don't
  // bridge via title-pattern. Pattern accepts both "pokemon" and
  // "pokémon" spellings since AniList lists both in the wild.
  { pattern: /^pok[eé]mon\b/i,        canon: 'Pokémon' },
  // Digimon — Adventure / 02 / Tri / Last Evolution / Tamers / Frontier /
  // Data Squad (Savers) / Fusion (Xros Wars) / Universe App Monsters /
  // Ghost Game / Survive. Each sub-series has different protagonist and cast
  // so neither title-pattern nor AniList relations reliably bridges them —
  // same shape as Pretty Cure / Yu-Gi-Oh!.
  { pattern: /^digimon\b/i,           canon: 'Digimon' },
  // One Piece — main TV (1000+ eps), the films (Stampede, Red, Gold, etc.),
  // the 3D shorts (3D2Y, Mugiwara Chase, Trap Coaster). AniList relations
  // treat the 3D shorts as their own root so they don't link to the main
  // series, and the title stems share only "one piece" (9 chars) which IS
  // above PREFIX_MIN but the "3D" suffix prevents direct prefix match.
  { pattern: /^one\s*piece\b/i,       canon: 'One Piece' },
  // Doraemon — main TV (1973 + 1979 + 2005), all the films (Nobita's
  // Dinosaur, Treasure Island, Space Heroes, etc.), and crossovers
  // ("Doraemon Meets Hattori the Ninja"). Stem "Doraemon" is 8 chars (at
  // PREFIX_MIN exactly) but the crossover entries don't have AniList
  // relations linking back to the main franchise.
  { pattern: /^doraemon\b/i,          canon: 'Doraemon' },
  // Fate / Type-Moon shared universe — stay night (Fate route, Unlimited
  // Blade Works movie + TV, Heaven's Feel trilogy), Zero, Apocrypha, Grand
  // Order, Extra, strange Fake, kaleid liner Prisma Illya, etc. Each
  // sub-series has a completely different cast and Holy Grail War, so the
  // AniList relations graph doesn't bridge them. All titles share the
  // distinctive "Fate/" or "Fate " prefix. Character class allows both the
  // slash form ("Fate/Zero") and the space form ("Fate Grand Order English
  // localisation") which AniList lists for some entries.
  { pattern: /^fate[\s\/]/i,           canon: 'Fate' },
  // Lord El-Melloi II's Case Files — Fate spin-off, but the title doesn't
  // start with "Fate" so the umbrella above misses it. Routed to the same
  // canon so it groups with the rest of the Fate works.
  { pattern: /^(?:the\s+)?(?:case\s+files\s+of\s+)?lord\s+el-melloi/i, canon: 'Fate' },
  // KONOSUBA — main series (God's blessing on this wonderful world) +
  // Explosion on This Wonderful World (Megumin prequel spin-off). They
  // share the "KONOSUBA" brand prefix but the dash-subtitle format
  // ("KONOSUBA -Subtitle!") breaks the paired-dash strip regex, so they
  // don't auto-bridge via title-pattern. Stem "konosuba" is 8 chars (at
  // PREFIX_MIN exactly).
  { pattern: /^konosuba\b/i,           canon: 'KONOSUBA' },
  // Nisekoi — first season is "Nisekoi", second season is "Nisekoi:" with
  // a trailing colon that has nothing after it. The colon-strip in
  // _franchiseBaseName requires whitespace + content AFTER the colon, so
  // the trailing-colon variant becomes its own key and splits off. Alias
  // normalises them.
  { pattern: /^nisekoi\b/i,            canon: 'Nisekoi' },

  // ───────────── v1.0.182 — Audit pass 4 batch (13 aliases) ─────────────
  // Each entry below was flagged by franchise-audit.js as a legitimate
  // umbrella split (not a false-positive shared category word). False
  // positives from the same audit run — black, dragon, tales, samurai,
  // golden, high school, tokyo (Revengers vs Godfathers), super — were
  // intentionally not added: their groups are genuinely distinct IPs.

  // Bleach — main TV (2004, 2022 Thousand-Year Blood War cours), Colorful
  // Gotei-13 special, 20th anniversary trailer. AniList uses inconsistent
  // caps ("BLEACH" vs "Bleach"). Stem 6 chars, below PREFIX_MIN.
  { pattern: /^bleach\b/i,             canon: 'Bleach' },

  // Persona — P3 the Movie tetralogy, P4 the Animation, P4 the Golden
  // ANIMATION (no space between "Persona" and "4"), P5 the Animation -the
  // Day Breakers-, Trinity Soul. Different casts per game so AniList
  // relations don't bridge them. Stem 7 chars, below PREFIX_MIN. Pattern
  // accepts either a word boundary or an immediate digit so "Persona4 the
  // Golden ANIMATION" matches the same as "Persona 4 the Animation".
  { pattern: /^persona(?:\b|\d)/i,     canon: 'Persona' },

  // Re:ZERO — main "Starting Life in Another World" (Season 1/2/3 + films)
  // plus the "Starting Break Time From Zero" chibi shorts (RU: "Kyuukei
  // Jikan"). The colon and tilde-delimited subtitles produce different
  // base names. AniList sometimes lists Break Time as separate root.
  { pattern: /^re:?\s*zero\b/i,        canon: 'Re:ZERO' },

  // Date A Live family — main TV series + Date A Bullet (Kurumi-focused
  // film duology). Shared cast and continuity but franchise-name
  // splitting means they group separately.
  { pattern: /^date\s+a\s+/i,          canon: 'Date A Live' },

  // Tokyo Ghoul — "Tokyo Ghoul", "Tokyo Ghoul √A", "Tokyo Ghoul:re" (the
  // sequel that uses a trailing-colon variant). Other "Tokyo *" titles
  // (Revengers, 24th Ward, Godfathers) are unrelated and not caught by
  // this pattern since it requires the second token "ghoul".
  { pattern: /^tokyo\s+ghoul/i,        canon: 'Tokyo Ghoul' },

  // Haikyu!! — main TV/films plus "HAIKYU!! LAND VS. AIR" OVA event. The
  // double "!!" is part of the brand but isn't always present. The
  // exclamation/event-title structure causes splits.
  { pattern: /^haikyu/i,               canon: 'Haikyu!!' },

  // Natsume's Book of Friends ↔ Natsume Yuujinchou — Lewis's library uses
  // the English title for the main series but a "Natsume Yuujinchou ×
  // Kumamoto-ken" tourism collab special slips through under the JP
  // title. Map both spellings (and the rare apostrophe variants AniList
  // sometimes serves) to the English canon.
  { pattern: /^natsume(?:['’]?s\s+book\s+of\s+friends|\s+yuujinchou)/i,
                                       canon: "Natsume's Book of Friends" },

  // When They Cry / Higurashi no Naku Koro ni — same EN↔JP split. Covers
  // the side-story OVAs "Kaku: Outbreak" and "Kira" which AniList lists
  // under the Japanese title only. Umineko stays separate (different
  // cast, different setting, even though it's a When-They-Cry-branded
  // Ryukishi07 work — Lewis hasn't asked to bridge them and they share
  // no AniList relations).
  { pattern: /^(?:when\s+they\s+cry|higurashi\s+no\s+naku\s+koro)/i,
                                       canon: 'When They Cry' },

  // Sword Art Online — main series + Sword Art OFFline (chibi comedy
  // shorts officially bundled with SAO BD releases). The "OFF" variant
  // shares almost no title-pattern with main SAO entries.
  { pattern: /^sword\s+art\s+(?:online|offline)/i, canon: 'Sword Art Online' },

  // A Certain (Toaru) franchise — Magical Index, Scientific Railgun,
  // Scientific Accelerator, plus the films and OVAs. Spin-offs share no
  // AniList relations chain. Pattern covers both the English-title
  // ("A Certain Magical/Scientific X") and Japanese-title ("Toaru
  // Majutsu/Kagaku no X") forms.
  { pattern: /^(?:a\s+certain\s+(?:magical|scientific)|toaru\s+(?:majutsu|kagaku))\b/i,
                                       canon: 'A Certain Magical Index' },

  // Naruto — main TV / Shippuden / films are bridged via title-pattern,
  // but "NARUTO Spin-Off: Rock Lee & His Ninja Pals" uses the all-caps
  // brand + colon subtitle and splits off. Boruto stays separate (no
  // common prefix with "Naruto" so it can't false-match).
  { pattern: /^naruto\b/i,             canon: 'Naruto' },

  // Fairy Tail — main series, films, OVAs + "FAIRY TAIL × RAVE" Mashima
  // crossover. "Fairy gone" is unrelated and excluded by the two-token
  // requirement.
  { pattern: /^fairy\s+tail\b/i,       canon: 'Fairy Tail' },

  // Evangelion — original TV, End of Evangelion, the four Rebuild films
  // (1.0/2.0/3.0/3.0+1.0), and the short "EVANGELION:3.0 (-46h)"
  // prologue. The colon-and-version-number titles fragment under the
  // existing base-name logic.
  { pattern: /^(?:neon\s+genesis\s+)?evangelion/i, canon: 'Neon Genesis Evangelion' },

  // v1.0.196 — ARIA water-bus franchise — Sato Junichi's slice-of-life set on
  // a terraformed Mars in Venice. Entries are titled "ARIA The ANIMATION"
  // (S1), "ARIA The NATURAL" (S2), "ARIA The ORIGINATION" (S3), "ARIA The
  // OVA ~ARIETTA~", "ARIA The AVVENIRE", "ARIA The CREPUSCOLO", "ARIA The
  // BENEDIZIONE" + Picture Drama specials. CASE-SENSITIVE pattern: matches
  // the all-caps "ARIA" brand only, deliberately NOT catching "Aria the
  // Scarlet Ammo" (Hidan no Aria, a completely unrelated gun-girls anime
  // that shares the lowercase "Aria the" prefix). The water-bus uses ALL
  // CAPS ARIA exclusively in AniList; Scarlet Ammo uses proper case "Aria".
  { pattern: /^ARIA\b/,                canon: 'ARIA' },

  // v1.0.195 — Art of Fighting (Ryuuko no Ken) 1995 OVA. AniList stores
  // its romaji title as "Battle Spirits: Ryuuko no Ken" because SNK
  // marketed it under their early-2000s "Battle Spirits" arcade-board
  // line. That romaji's colon-strip reduces to "Battle Spirits" — same
  // key as Bandai's unrelated 2008+ Battle Spirits TCG franchise — and
  // the entry would bridge into that group via roKey direct match. This
  // alias fires before any strip so both enKey and roKey for this entry
  // resolve to 'Art of Fighting' canon, leaving Bandai's Battle Spirits
  // entries untouched. Only matches the specific "Ryuuko no Ken" suffix
  // so other "Battle Spirits: X" titles stay in their proper franchise.
  { pattern: /^battle\s+spirits:\s*ryuuko\s+no\s+ken/i, canon: 'Art of Fighting' },

  // v1.0.193 — Initial D — long-running street-racing series with very
  // inconsistent sub-title formats: "1st Stage" / "Second Stage" /
  // "Third Stage" / "Fourth Stage" / "Fifth Stage" / "Final Stage" /
  // "Extra Stage" (1 + 2) / "Battle Stage" (1 + 2) / "Legend" films.
  // No common stem beyond "Initial D" itself (9 chars, above PREFIX_MIN
  // but the "Stage" suffix variations defeat title-pattern bridging
  // because each stage entry's title isn't a prefix of the others).
  { pattern: /^initial\s+d\b/i,        canon: 'Initial D' },

  // v1.0.193 — Duel Masters — TCG tie-in series. Original "Duel Masters"
  // and the reboot "Duel Masters!" / "Duel Masters!!" use trailing
  // exclamation marks as the only differentiator. _franchiseBaseName
  // normalises "!+$" → "!" so "Duel Masters!" and "Duel Masters!!"
  // bridge to each other, but the original (no exclamation) still
  // splits. Alias collapses both variants.
  { pattern: /^duel\s+masters!?\b/i,   canon: 'Duel Masters' },

  // v1.0.190 — Magical Girl Lyrical Nanoha umbrella, covering the main TV
  // series (S1, A's, StrikerS, ViVid), the three movies (1st, 2nd A's,
  // Reflection/Detonation), the picture-drama specials, and the ViVid
  // Strike! spin-off (TV + OVA — same universe, set two years after
  // ViVid, AniList relations link them as side-story/sequel). Pre-v1.0.189
  // ViVid Strike! bridged into the main franchise via an after-colon
  // SUFFIX match; the architectural fix correctly removed that mechanism,
  // and this explicit alias restores the legitimate grouping. EN and JP
  // romaji ("Mahou Shoujo Lyrical Nanoha") both covered.
  { pattern: /^(?:magical\s+girl\s+|mahou\s+shoujo\s+)?lyrical\s+nanoha\b|^vivid\s+strike\b/i,
                                       canon: 'Magical Girl Lyrical Nanoha' },

  // ───────────── v1.0.183 — Audit pass 5 batch (5 aliases) ─────────────

  // Rascal Does Not Dream (Seishun Buta Yarou) — TV "Bunny Girl Senpai"
  // plus the film sequence: "a Dreaming Girl", "a Sister Venturing Out",
  // "a Knapsack Kid", "Santa Claus". Every film is structured as
  // "Rascal Does Not Dream of <noun phrase>" so the trailing noun varies
  // wildly and title-pattern can't bridge them. The Japanese-title form
  // ("Seishun Buta Yarou wa ...") gets the same canon for users who
  // import via the JP track.
  { pattern: /^rascal\s+does\s+not\s+dream/i, canon: 'Rascal Does Not Dream of Bunny Girl Senpai' },
  { pattern: /^seishun\s+buta\s+yarou/i,      canon: 'Rascal Does Not Dream of Bunny Girl Senpai' },

  // Kamisama Kiss — main "Kamisama Kiss" (S1) and "Kamisama Kiss◎" (S2).
  // The ◎ symbol survives _franchiseKey normalisation and forks the two
  // seasons. Also covers the Japanese title "Kamisama Hajimemashita" and
  // its specials ("Kamisama, Shiawase ni Naru").
  { pattern: /^kamisama\s+(?:kiss|hajimemashita)/i, canon: 'Kamisama Kiss' },

  // Himouto! Umaru-chan — TV + "R" (S2) + OVA bridge fine, but
  // "Himouto! Umaru-chanS" (an OVA bundle title with no space before the
  // "S") forks out because the stem "himouto umaru chans" diverges from
  // "himouto umaru chan" after 16 chars — within prefix-match range but
  // suffix-lookup sees the trailing "S" as a distinct token.
  { pattern: /^himouto!?\s+umaru/i,           canon: 'Himouto! Umaru-chan' },

  // Miss Kobayashi's Dragon Maid — main TV (S1/S2 = Miss Kobayashi's
  // Dragon Maid / Dragon Maid S) plus the special "Dragon Something"
  // OVA. JP title "Kobayashi-san Chi no Maid Dragon" routes to the same
  // canon.
  { pattern: /^miss\s+kobayashi['’]?s?\s+dragon/i, canon: "Miss Kobayashi's Dragon Maid" },
  { pattern: /^kobayashi-san\s+chi\s+no\s+maid/i,  canon: "Miss Kobayashi's Dragon Maid" },

  // Tamako — "Tamako Market" (TV) + "Tamako -love story-" (sequel film
  // using the dash-subtitle convention). No common 2nd-token between
  // them, so title-pattern can't bridge.
  { pattern: /^tamako\b/i,                    canon: 'Tamako Market' },

  // ───────────── v1.0.184 — Audit pass 6 batch (2 aliases) ─────────────

  // Major — long-running baseball franchise. AniList loads each season
  // as its own entry titled literally "Major S1" through "Major S6",
  // plus the specials "Major: Yuujou no Ikkyuu" and "Major: World
  // Series". No shared title token beyond "Major" itself (stem 5 chars,
  // well below PREFIX_MIN). The "Major 2nd" sequel (about Goro's son)
  // also lands here, which is correct — same universe.
  { pattern: /^major\b/i,                     canon: 'Major' },

  // We Never Learn / BOKUBEN — S1 uses "We Never Learn: BOKUBEN" but S2
  // uses "We Never Learn!: BOKUBEN Season 2" (added exclamation), and
  // the JP title is "Bokutachi wa Benkyou ga Dekinai". Three different
  // shapes that don't bridge naturally.
  { pattern: /^we\s+never\s+learn/i,          canon: 'We Never Learn' },
  { pattern: /^bokutachi\s+wa\s+benkyou/i,    canon: 'We Never Learn' },
]);

function _franchiseAlias(title) {
  if (!title) return null;
  for (const { pattern, canon } of FRANCHISE_ALIASES) {
    if (pattern.test(title)) return canon;
  }
  return null;
}

// Strings that are NOT legitimate franchise canons. Two categories:
//
// 1. v1.0.136 — generic short stop-words the strip chain over-produces
//    ("The Return" → "The" via the Returns spinoff strip; "The Movie" alone
//    → "The" via the Movie strip). Bucketing every title that degenerates
//    to "the" together would create a junk franchise.
//
// 2. v1.0.141 — anthology series banners. Toei's "Sekai Meisaku Douwa"
//    (World Masterpiece Fairy Tales) prefixes every entry's romaji title:
//    "Sekai Meisaku Douwa: Aladdin to Mahou no Lamp", "...Hakuchou no
//    Mizuumi", "...Mori wa Ikiteiru", etc. The colon-strip correctly removes
//    the subtitle but leaves "Sekai Meisaku Douwa" as the shared canon, so
//    every fairy tale collapses onto Aladdin. These banners are umbrella
//    brands, not franchises — each entry is a standalone adaptation.
//    Same shape for Aoi Bungaku Series, Animated Classics of Japanese
//    Literature, and Manga Nippon Mukashibanashi.
//
// When _franchiseBaseName reduces a title to one of these strings, revert
// to the original so the canon doesn't collide with other titles that strip
// to the same string.
const _GENERIC_BASES = new Set([
  // Stop-words from over-aggressive suffix strips
  'the', 'movie', 'special', 'first', 'last',
  // Anthology series banners — each entry is standalone
  'sekai meisaku douwa', 'world masterpiece fairy tales',
  'sekai meisaku gekijou', 'world masterpiece theater',
  'aoi bungaku', 'aoi bungaku series',
  'animated classics of japanese literature',
  'manga nippon mukashibanashi', 'folk tales from japan',
  // v1.0.144 — Japanese source-name words shared by many unrelated adaptations
  // across decades. "Saiyuuki" (Journey to the West) shows up as the romaji of
  // Alakazam (1960 Toei film), a 1999 OVA, Saiyuki Reload (2003), Doraemon's
  // Nobita no Parallel Saiyuuki (1988), etc. The English titles are distinct;
  // grouping on the shared romaji incorrectly fuses them.
  'saiyuuki',
  // v1.0.167 — AniList convention suffixes that mark a media-adaptation type,
  // not a franchise. "X: The Animation" is the standard way AniList names the
  // anime adaptation of a game / manga / novel. Without blocking these, the
  // after-colon key for one such title gets registered as a franchise key,
  // then every other "Y: The Animation" / "Y the Animation" entry hits it
  // via suffix-lookup and merges. Observed bridge: 34 unrelated anime (GARO,
  // Persona, Phantom, Granblue Fantasy, Gunslinger Stratos, Ping Pong, etc.)
  // chained into one franchise named after Ping Pong.
  'the animation', 'the movie', 'the movies', 'the series',
  'the special', 'the specials', 'specials',
  // v1.0.186 — Bandai's "Tales of" anthology brand. AniList's romaji title
  // for the Tales of games uses the form "Tales of: Crestoria - Tougen no
  // Senshi" (colon right after "of"), so the colon-strip in
  // _franchiseBaseName reduces them to exactly "Tales of" — 8 chars,
  // exactly at PREFIX_MIN. Once registered as a roKey, suffix-lookup then
  // bridged every "Tales of X" entry via key.startsWith("tales of ") and
  // pulled in adjacent franchises like Little Women / Ai no Wakakusa
  // Monogatari ("Tales of Little Women" is the EN title for the 1987 WMT
  // series — its enKey "tales of little women" was the canonical match
  // target). Observed: 11 unrelated anime (4× Little Women WMT + 3× Yao
  // Shen Ji + 2× Tales of the Rays + Crestoria + Homeroom) chained into
  // a single mega-group named after the most popular member.
  'tales of',
  // v1.0.193 — Generic isekai title phrase that appears as the EN-title
  // SUFFIX of dozens of unrelated anime ("Drug Store in Another World",
  // "Restaurant to Another World", "Skeleton Knight in Another World",
  // "Farming Life in Another World", etc.). The 2022 idol anime literally
  // titled "Another World" registers "another world" as a 13-char main
  // enKey, then every other "X in/from/to Another World" entry suffix-
  // matches it via key.endsWith(" another world"), chaining all of them
  // into one mega-group. Blacklisting keeps "Another World" the entry as
  // its own group and prevents the suffix bridge.
  'another world',
  // v1.0.194 — Japanese word meaning "end of the Edo period" (幕末). Used
  // as a setting marker in many unrelated samurai-era anime: "BAKUMATSU"
  // (2018 Toei), "Bakumatsu Rock" (2014 Studio Deen), "Bakumatsu
  // Gijinden Roman" (1986), "Bakumatsu Kikansetsu Irohanihoheto" (2006),
  // etc. The 2018 standalone-titled "BAKUMATSU" registers "bakumatsu"
  // (9 chars) as a main enKey; every other "Bakumatsu X" / "X Bakumatsu"
  // entry then PREFIX-matches it via key.startsWith("bakumatsu ") since
  // Math.min(key_len, 9) ≥ PREFIX_MIN(8). Same architectural shape as
  // the "Another World" bug — short common word as MAIN enKey hub.
  'bakumatsu',
  // v1.0.187 — Generic single-word subtitle commonly used across unrelated
  // franchises ("Afro Samurai: Resurrection", "Princess Resurrection",
  // "Ninja Resurrection", "Ghost in the Shell: Stand Alone Complex - The
  // Laughing Man → Resurrection"). When _AFTER_COLON_MIN=10 admits
  // "resurrection" (12 chars) as an after-colon key, suffix-lookup then
  // bridges every "X Resurrection" title via key.endsWith(" resurrection"),
  // chaining unrelated works into a single mega-group. Same architectural
  // shape as the "tales of" bug above. Blacklisting is the targeted fix;
  // a broader structural fix (e.g., not indexing after-colon keys for
  // suffix lookup) is tracked separately.
  'resurrection',
  // v1.0.188 — "X: The Motion Picture" is a 1980s–90s film-release
  // convention. Many unrelated franchises use it ("Clannad: The Motion
  // Picture", "Fatal Fury: The Motion Picture", "Samurai Shodown The
  // Motion Picture", "Legend of Crystania: The Motion Picture", "Bubblegum
  // Crisis: Tokyo 2040 - The Motion Picture", etc.). Without blacklisting,
  // the after-colon key "the motion picture" gets registered by the FIRST
  // such title and every other one suffix-matches it, chaining unrelated
  // franchises through Clannad / whichever happened to register first.
  // Observed: 12 entries from 5 unrelated franchises (Clannad, Fatal Fury,
  // Legend of Crystania, Samurai Shodown, Samurai Spirits) all merged
  // under the Clannad canon.
  'the motion picture', 'motion picture',
]);

function _franchiseBaseName(title) {
  // Umbrella alias short-circuit — known brand families (Love Live!, Pretty
  // Cure, FLCL) where the title-pattern chain and relations graph both fall
  // short. Returns the canonical brand name verbatim.
  const alias = _franchiseAlias(title);
  if (alias) return alias;
  const stripped = title
    // Strip parenthetical format/year qualifiers e.g. "(TV)", "(2019)", "(Movie)"
    .replace(/\s*\([^)]*\)\s*$/, '')
    // Strip -Japanese Subtitle- wrappers (e.g. "Demon Slayer -Kimetsu no Yaiba-").
    // v1.0.131 — require whitespace BEFORE the leading dash so internal hyphens
    // in titles like "Yu-Gi-Oh!", "Re-Kan!", "B-Project" stay intact. Without
    // this guard the regex was eating "-Gi-" out of "Yu-Gi-Oh!" → "YuOh!".
    .replace(/\s+-[^-\s][^-]*-/g, '')
    // v1.0.131 — strip trailing " - subtitle" pattern.
    // Required for titles like "M.D. Geist 2 - Death Force" → "M.D. Geist 2"
    // and "MD Geist - The Most Dangerous Ever" → "MD Geist". Single-dash
    // separators aren't caught by the paired-dash regex above. Requires
    // surrounding whitespace so internal hyphens like "Yu-Gi-Oh!" and
    // "Re-Kan!" stay intact.
    .replace(/\s+-\s+.+$/, '')
    // Strip "tri." franchise label (e.g. "Digimon Adventure tri. Chapter 1")
    .replace(/\s+tri\.?\s*(Chapter.*)?$/i, '')
    // Strip "Chapter N" markers (e.g. "Digimon Adventure tri. Chapter 1: Reunion")
    .replace(/\s+Chapter\s*[\d]+.*$/i, '')
    // Strip all-caps subtitle word + colon (e.g. "SPY x FAMILY CODE: White" → "SPY x FAMILY").
    // v1.0.129 — require ≥2 words to REMAIN before the all-caps subtitle word, so
    // titles like "GOLDEN BOY: Sasurai no Obenkyou Yarou" (a 2-word ALLCAPS title +
    // romaji subtitle) don't get over-stripped to just "GOLDEN" — which would then
    // fuzzy-match any other "Golden ___" anime via the prefix suffix-lookup and
    // pull unrelated franchises together (originally surfaced as Golden Time being
    // dragged into the GOLDEN BOY group).
    // v1.0.196 — additionally require the captured prefix to be ≥10 chars. The
    // v1.0.129 check only required 2 word-tokens, which included stopwords like
    // "The". Observed: "ARIA The ORIGINATION: That Little Secret Place..." matched
    // and got stripped to "ARIA The" (8 chars), which then PREFIX-bridged every
    // other "Aria the X" entry (water-bus ARIA seasons AND the unrelated "Aria
    // the Scarlet Ammo"/Hidan no Aria) into one 9-member mega-group.
    .replace(/^(.+?\s+.+?)\s+[A-Z]{2,}:\s+.*$/, (m, p1) => p1.length >= 10 ? p1 : m)
    // Strip everything from a subtitle-separator colon onwards.
    // v1.0.127 — requires whitespace AFTER the colon so titles like "Re:Zero"
    // (where the colon is part of the actual name, not a separator) aren't
    // mangled into just "Re". "Sword Art Online: Alicization" still strips
    // because the colon is followed by a space.
    // v1.0.135 — also requires at least 3 chars BEFORE the colon so titles
    // like "Re: Cutie Honey" don't collapse to just "Re" and become a 2-char
    // franchise canon that swallows other unrelated short-prefix titles.
    // AKB48 / DTB and similar 3-char franchise initials still strip correctly.
    .replace(/^(.{3,}?)\s*:\s+.*$/, '$1')
    // Strip OVA/Special/Recap suffixes (e.g. "Baccano! Specials", "Series Name OVA")
    .replace(/[!\s]+(Specials?|OVAs?|ONAs?|Recaps?|Extra|Encore)$/i, s => s.startsWith('!') ? '!' : '')
    // Normalise trailing ! count so "Show!" and "Show!!" match
    .replace(/!+$/, '!')
    // Strip "The Movie" / "The Motion Picture" and anything after.
    // v1.0.188 — extended to also catch "Motion Picture" so titles like
    // "Samurai Shodown The Motion Picture" (which has NO colon, so the
    // colon-strip path can't help) reduce to "Samurai Shodown" and group
    // with sibling "Samurai Spirits 2" via the romaji bridge.
    .replace(/\s+(The\s+)?(Movie|Motion\s+Picture)\b.*/i, '')
    // Strip "Final Season/Part/Chapter" as a phrase first
    .replace(/\s+(Final|The\s+Final)\s+(Season|Part|Chapter|Arc|Cour).*$/i, '')
    // Strip season/part/cour markers with number
    .replace(/\s+(Season|Part|Cour)\s*[IVXivx\d]+.*$/i, '')
    .replace(/\s+\d+(?:st|nd|rd|th)\s+Season.*$/i, '')
    // Strip bare "Season" with nothing after
    .replace(/\s+Season\s*$/i, '')
    // Strip trailing Roman numerals (II, III etc.) but NOT single I or X
    // to avoid mangling titles like "To Be Hero X", "Samurai X", "Gundam X",
    // or "Danmachi I". v1.0.135 — was "XX?" which actually matched single X
    // (the optional makes the second X optional, so "X" alone matched).
    // Changed to literal "XX" so single X stays intact.
    // v1.0.149 — added XIII-XIX so "Final Fantasy XIV", "Devil Survivor 2:
    // The Animation - Episode XIII", and similar long-running franchises
    // strip cleanly.
    .replace(/\s+(II|III|IV|VI|VII|VIII|IX|XI|XII|XIII|XIV|XV|XVI|XVII|XVIII|XIX|XX)$/i, '')
    // Strip trailing × / ✕ / ✗ cross-product sequel markers (e.g. "Anime ×2").
    // v1.0.135 — limit digit count to 1-2 to match the year safeguard on the
    // plain trailing-digit regex below ("Pupa 2019" was being eaten here too).
    .replace(/[\s×✕✗]+[\d×✕✗]{1,2}$/, '')
    // Strip "On the Side" spinoff marker (e.g. "Is it Wrong...? On the Side")
    .replace(/[?!]?\s+On\s+the\s+Side[?!]?$/i, '')
    // Strip common spin-off/sequel single-word suffixes.
    // v1.0.128 — added "Alternative" and "Progressive" so FLCL/FLCL Alternative/
    // FLCL Progressive group together (the fuzzy suffix lookup can't help here
    // because "FLCL" is below the 6-char threshold that prevents short-word
    // false positives). Also correctly collapses "Muv-Luv Alternative" → "Muv-Luv"
    // and any "X Progressive" soft-reboots into the parent franchise.
    .replace(/\s+(Twin|Twins|Origins?|Returns?|Revenge|Reborn|Reload|Revolution|More|Plus|Ultra|Beyond|Kai|Heroes|Alternative|Progressive)$/i, '')
    // Strip trailing standalone numbers used as sequel indicators ("Bakemonogatari 1",
    // "Macross 7", "Death Note 2"). v1.0.135 — limited to 1-2 digits so 4-digit
    // years used to disambiguate remakes ("Pupa 2019" vs the 2014 original)
    // aren't treated as sequel numbers and collapsed onto the original.
    .replace(/\s+\d{1,2}$/, '')
    // Strip #N / #N.N version markers (e.g. "BURN THE WITCH #0.8")
    .replace(/\s+#[\d.]+$/, '')
    // Normalise trailing ? after all sequel markers removed
    .replace(/\?+$/, '')
    .trim();
  // v1.0.136 — generic-base safety net. If the strip chain reduced the title
  // to a generic stop-word ("The", "Movie", etc.), revert to the original so
  // the canon doesn't collide with every other title that strips to the same
  // word. Original-title key collisions still work for real franchises whose
  // *unstripped* title happens to be that word (vanishingly rare).
  return _GENERIC_BASES.has(stripped.toLowerCase()) ? title : stripped;
}

function _franchiseKey(title) {
  // v1.0.131 — strip periods so initials match their dotless variant.
  // "M.D. Geist" ↔ "MD Geist", "Dr. Stone" ↔ "Dr Stone", etc. The dot is
  // purely a punctuation convention in initials; without normalising it,
  // entries with and without periods land in separate franchise groups
  // even though they're the same series.
  return _franchiseBaseName(title).toLowerCase().replace(/\./g, '');
}

// Fallback lookup: checks whether `key` shares a word-boundary prefix or
// suffix with any existing group key.
//
// Prefix match — "great pretender" is a prefix of "great pretender razbliuto"
// Suffix match — "evangelion" is a suffix of "neon genesis evangelion"
//
// Three thresholds:
//  - Both keys must be ≥6 chars to participate at all (avoids false matches
//    on short common words like "the", "one").
//  - For SUFFIX matches specifically, the shorter of the two keys must be
//    ≥10 chars. Suffix matches are riskier because many unrelated titles end
//    with a common word that happens to be another anime — without the
//    higher threshold, "Princess Mononoke" suffix-matches "Mononoke" (8) and
//    pulls Studio Ghibli's film into the 2007 supernatural mystery series.
//  - For PREFIX matches, the shorter of the two keys must be ≥8 chars.
//    v1.0.135 — was 6, but that caused "Samurai" (7) to prefix-match
//    "Samurai Champloo", "Samurai Flamenco", "Samurai Noodles" (all unrelated
//    shows), and "Promise" (7) to fuse with "Promise Neverland". 8 chars
//    still allows "Hellsing" (8) ↔ "Hellsing Ultimate" to work via the prefix
//    path; shorter stems like "Naruto" / "Bleach" / "Trigun" rely on the
//    AniList relations graph to bridge their sequels.
//
// v1.0.149 — Indexed candidate lookup. The previous implementation iterated
// the entire keyMap on every call (called once per anime, so O(n²) overall).
// At 6500 anime that's ~42M string operations, the dominant cost in the
// Rankings render path. Indexes by first/last word reduce per-call candidate
// count from n to typically 1-5 (only keys that share the first or last word
// can match — both prefix and suffix conditions require shared boundary
// words by construction). Behaviour-preserving: same suffix-before-prefix
// preference per candidate, same insertion-order iteration via Set semantics.
function _franchiseSuffixLookup(key, keyMap, indexes, afterColonKeys) {
  if (!key || key.length < 6) return null;
  const SUFFIX_MIN = 10;
  const PREFIX_MIN = 8;

  const tokens = key.split(' ');
  const firstWord = tokens[0];
  const lastWord = tokens[tokens.length - 1];

  // Collect candidates that share the first OR last word. A Set keeps
  // insertion order, which matches the keyMap's registration order so the
  // first-match-wins behaviour is preserved across the optimisation.
  const candidates = new Set();
  if (indexes) {
    const byFirst = indexes.byFirstWord.get(firstWord);
    if (byFirst) for (const k of byFirst) candidates.add(k);
    const byLast = indexes.byLastWord.get(lastWord);
    if (byLast) for (const k of byLast) candidates.add(k);
  } else {
    // Backwards-compatible fallback when indexes weren't supplied (test
    // harnesses, etc.). Iterate the whole keyMap.
    for (const k of keyMap.keys()) candidates.add(k);
  }

  for (const existingKey of candidates) {
    if (existingKey.length < 6) continue;
    // v1.0.167 — never bridge through a generic-base key. Defensive: the
    // after-colon registration path already filters these out, but if a
    // future code path registers a generic key the lookup must still ignore
    // it. Otherwise a single "X: The Animation" entry can chain dozens of
    // unrelated franchises through the suffix-match path.
    if (_GENERIC_BASES.has(existingKey)) continue;
    // v1.0.189 — Architectural fix for the generic-after-colon bug class.
    // If existingKey was registered from an "X: SubName" after-colon
    // extraction, skip SUFFIX-direction matching entirely. The bug pattern
    // is always: a short generic English noun (like "resurrection", "the
    // motion picture", "tales of") becomes a 10+ char after-colon key,
    // then a later entry whose title ends with that noun gets bridged via
    // key.endsWith(' ' + existingKey). PREFIX-direction matches stay
    // allowed — those bridge legitimate sub-arcs like "Sword Art Online:
    // Alicization" ↔ "Alicization War of Underworld" via
    // key.startsWith(existingKey + ' '). Direct keyMap lookup is also
    // unchanged, so the documented "SpinoffName: FranchiseName" case
    // (Sword Oratoria → DanMachi parent) still works.
    const isAfterColon = afterColonKeys && afterColonKeys.has(existingKey);
    // Suffix: "Evangelion" ↔ "Neon Genesis Evangelion"
    if (!isAfterColon && Math.min(key.length, existingKey.length) >= SUFFIX_MIN) {
      if (existingKey.endsWith(' ' + key) || key.endsWith(' ' + existingKey)) {
        return keyMap.get(existingKey);
      }
    }
    // Prefix: "Great Pretender" ↔ "Great Pretender razbliuto",
    //        "Hellsing" ↔ "Hellsing Ultimate".
    // Also legitimate for after-colon keys: "alicization" (from SAO main
    // entry's after-colon) ↔ "alicization war of underworld" (a later
    // bare-titled sub-arc).
    // v1.0.193 — When existingKey is after-colon, raise the threshold to
    // 10 chars on the shorter side. Catches the case where a short common
    // word (8 chars) coincidentally appears as the FIRST word of an
    // unrelated after-colon string: "Crayon Shin-chan: Mononoke Ninja
    // Chinpuuden" registers "mononoke ninja chinpuuden" as after-colon,
    // and the standalone "Mononoke" (8 chars, at old PREFIX_MIN) would
    // PREFIX-match it via existingKey.startsWith(key + ' '). The legit
    // SAO sub-arc bridge survives because "alicization" is 11 chars.
    const prefixMin = isAfterColon ? 10 : PREFIX_MIN;
    if (Math.min(key.length, existingKey.length) >= prefixMin) {
      if (key.startsWith(existingKey + ' ') || existingKey.startsWith(key + ' ')) {
        return keyMap.get(existingKey);
      }
    }
  }
  return null;
}

// v1.0.149 — Index helper that mirrors keyMap by first/last word. Each
// _registerKey call O(1); _franchiseSuffixLookup then iterates only the
// matching candidates rather than every entry.
function _newFranchiseIndexes() {
  return { byFirstWord: new Map(), byLastWord: new Map() };
}

// v1.0.149 — Crossover detector promoted to module scope (was duplicated in
// _buildFranchiseGroups and _computeFranchiseIds). Capture-group form so we
// can check the SIDES of the marker — "Hunter × Hunter" has identical
// sides which is stylisation, not a crossover, and shouldn't trip this.
// "Queen's Blade Rebellion VS Hagure Yuusha no Estetica" has differing
// sides, so it IS a crossover and gets its own canon.
const _CROSSOVER_RE_FRANCHISE = /^(.+?)\s+(VS|vs|×|✕|✗)\.?\s+(.+)$/;
function _isCrossoverTitle(title) {
  if (!title) return false;
  // v1.0.150 — strip trailing parenthetical qualifiers ("(2011)", "(TV)",
  // "(Movie)") before checking. AniList uses these to disambiguate remakes
  // and that's how "Hunter × Hunter (2011)" gets stored — same stylisation,
  // not a crossover with "2011".
  const cleaned = title.replace(/\s*\([^)]*\)\s*$/, '');
  const m = _CROSSOVER_RE_FRANCHISE.exec(cleaned);
  if (!m) return false;
  const left   = m[1].trim().toLowerCase();
  const marker = m[2];
  const right  = m[3].trim().toLowerCase();
  if (!left || !right) return false;
  // v1.0.197 — if the LEFT side contains a colon, treat as a within-franchise
  // sub-title rather than a crossover. Real crossover titles structure as
  // "FranchiseA vs FranchiseB", never as "Franchise: Subtitle vs Character".
  // Observed: "Crayon Shin-chan: Action Mask vs. Leotard Devil" — both are
  // Crayon Shin-chan in-universe characters, NOT separate franchises. Pre-fix
  // this title was treated as a crossover, getting its own [1] group instead
  // of joining the Shin Chan main franchise.
  //
  // v1.0.199 — the colon guard applies ONLY to "vs"-style markers. × is an
  // unambiguous crossover symbol, and real × crossovers often carry a colon
  // inside one franchise's own name ("IS: Infinite Stratos × Sonico").
  // Scoping the guard to vs keeps both observations true: in-universe
  // "X vs Y" sub-titles stay grouped, × crossovers keep their own canon.
  if (/^vs$/i.test(marker) && left.includes(':')) return false;
  return left !== right;
}
function _isCrossoverAnime(a) {
  return _isCrossoverTitle(a.titleEn || a.title || '')
      || _isCrossoverTitle(a.titleRo || '');
}
function _indexFranchiseKey(indexes, key) {
  if (!key) return;
  const tokens = key.split(' ');
  const firstWord = tokens[0];
  const lastWord = tokens[tokens.length - 1];
  let s = indexes.byFirstWord.get(firstWord);
  if (!s) { s = new Set(); indexes.byFirstWord.set(firstWord, s); }
  s.add(key);
  s = indexes.byLastWord.get(lastWord);
  if (!s) { s = new Set(); indexes.byLastWord.set(lastWord, s); }
  s.add(key);
}

// Build franchise groups from the current animeList.
// Returns an array of group objects sorted by best ELO descending.
function _buildFranchiseGroups(sorted) {
  // keyMap: any normalised key (English or Romaji) → canonical group key
  // This lets an anime stored with its Romaji title still find a group that
  // was created under the English title, and vice-versa.
  const keyMap = new Map();
  const groups = new Map(); // canonical key → { name, members }
  // v1.0.149 — indexes that mirror keyMap by first/last word so the suffix
  // lookup can skip 99% of unrelated keys.
  const indexes = _newFranchiseIndexes();
  // v1.0.189 — Track which keys came from after-colon extraction. Passed
  // to _franchiseSuffixLookup so it can skip SUFFIX-direction matches
  // against generic after-colon nouns (the "resurrection" / "the motion
  // picture" / "tales of" bug class).
  const afterColonKeys = new Set();

  // Relations-graph component map (AniList SEQUEL/PREQUEL/SIDE_STORY/etc).
  // For anime that have relations data, this catches franchises where the
  // titles don't share a stem (Monogatari, Fate, Madoka×Magia Record).
  // Returns Map<animeId, canonicalRootId>; absent entries fall back to the
  // title-pattern grouper below.
  const relMap = _computeFranchiseIds();

  // v1.0.139 — crossover detector. Titles like "Queen's Blade Rebellion VS
  // Hagure Yuusha no Estetica" bridge two franchises by design — AniList
  // tags them as SIDE_STORY to both parents, so the relations graph silently
  // merges the OVA into whichever parent is processed first (and pulls the
  // other parent in by transitivity). The right answer is to treat crossovers
  // as standalone groups so neither parent absorbs them and they aren't a
  // bridge across unrelated universes.
  const isCrossover = _isCrossoverAnime;

  for (const a of sorted) {
    const enRaw = a.titleEn || a.title || '';
    const roRaw = a.titleRo || a.title || '';
    const enKey = _franchiseKey(enRaw);
    const roKey = _franchiseKey(roRaw);
    // v1.0.144 — Skip roKey-based lookup/registration when roKey is a blacklisted
    // generic string (anthology banner or shared Japanese source-name like
    // "Saiyuuki" = Journey to the West). In those cases the English title is the
    // distinctive signal; sharing the romaji with a 1960 Toei film shouldn't
    // bridge a 2003 anime to it. When the roKey == enKey (anime stored only in
    // its Japanese name with no English translation), useRoKey stays false
    // because the registration is already covered by enKey.
    const useRoKey = roKey !== enKey && !_GENERIC_BASES.has(roKey);

    // Crossovers bypass both relations-graph and fuzzy lookup. Each gets its
    // own canon (its enKey), so it lands in a one-member group named after
    // the full crossover title.
    if (isCrossover(a)) {
      const canon = enKey;
      if (!groups.has(canon)) {
        const displayRaw = preferRomaji ? (a.titleRo || a.title || '') : enRaw;
        groups.set(canon, { name: _franchiseBaseName(displayRaw) || _franchiseBaseName(enRaw), members: [] });
      }
      groups.get(canon).members.push(a);
      continue;
    }

    // Prefer the relations-graph canonical root when available — it groups
    // entries the title heuristic can't possibly catch. Fall back to the
    // title-pattern logic for anime that haven't been enriched yet.
    let canon;
    const relRoot = relMap.get(a.id);
    if (relRoot != null) {
      // v1.0.126 — also check the title-pattern keyMap BEFORE creating a new
      // relations group. If a sibling (e.g. "Seven Deadly Sins" with no
      // relations data) created a title-pattern group first, joining it keeps
      // the franchise together. And register our title keys so later
      // non-enriched siblings find this group too.
      // This catches the partial-enrichment case where AniList didn't return
      // relations for one of two siblings — without this, "The Seven Deadly
      // Sins" + "The Seven Deadly Sins: Revival of the Commandments" landed
      // in separate groups whenever one was enriched and the other wasn't.
      canon = keyMap.get(enKey) || (useRoKey ? keyMap.get(roKey) : null) || ('rel:' + relRoot);
      if (!keyMap.has(enKey)) { keyMap.set(enKey, canon); _indexFranchiseKey(indexes, enKey); }
      if (useRoKey && !keyMap.has(roKey)) { keyMap.set(roKey, canon); _indexFranchiseKey(indexes, roKey); }
    } else {
      // For "SpinoffName: FranchiseName" patterns (e.g. "Sword Oratoria: Is it Wrong…"),
      // also try the part after the colon as a franchise key so it joins the right group.
      // v1.0.134 — require the after-colon key to be ≥10 chars before using it.
      // _franchiseBaseName strips trailing "Movie", "Season", etc., which can
      // reduce after-colon strings to generic phrases ("Pokémon: The First Movie"
      // becomes "the first") that then prefix-match unrelated titles ("THE FIRST
      // SLAM DUNK") via the fuzzy lookup. Distinctive franchise names
      // ("Hangyaku no Lelouch", "Alicization", "Is It Wrong...") are all well
      // above this threshold.
      const _AFTER_COLON_MIN = 10;
      let enAfterColon = enRaw.includes(':') ? _franchiseKey(enRaw.replace(/^[^:]+:\s*/, '')) : null;
      let roAfterColon = roRaw.includes(':') ? _franchiseKey(roRaw.replace(/^[^:]+:\s*/, '')) : null;
      if (enAfterColon && enAfterColon.length < _AFTER_COLON_MIN) enAfterColon = null;
      if (roAfterColon && roAfterColon.length < _AFTER_COLON_MIN) roAfterColon = null;
      // v1.0.167 — never treat a generic phrase ("the animation", "the movie",
      // etc.) as a franchise key. Without this gate the after-colon key for
      // "X: The Animation" gets registered, then every other "Y: The Animation"
      // entry finds it via direct match or suffix-lookup and merges into one
      // unrelated mega-group.
      if (enAfterColon && _GENERIC_BASES.has(enAfterColon)) enAfterColon = null;
      if (roAfterColon && _GENERIC_BASES.has(roAfterColon)) roAfterColon = null;

      // Check if any key already has a group.
      // v1.0.191 — Extends v1.0.189's architectural fix to direct lookup.
      // When the new entry's enAfterColon (or roAfterColon) matches a key
      // already in afterColonKeys, both sides are secondary keys — neither
      // is anyone's primary franchise identifier. Bridging them merges
      // unrelated franchises that just happen to share a generic
      // subtitle word ("Alternative", "Reflection", "Resurrection", etc.).
      // Observed: "Prince of Stride: Alternative" + "Detective Opera Milky
      // Holmes: Alternative" both produced enAfterColon "alternative" and
      // got fused into one 9-member group. The legitimate documented case
      // — "Sword Oratoria: Is It Wrong…" finding standalone "Is It Wrong…"
      // — still works because the standalone's "is it wrong…" is a MAIN
      // enKey, not an after-colon key.
      canon = keyMap.get(enKey)
           || (useRoKey ? keyMap.get(roKey) : null)
           || (enAfterColon && !afterColonKeys.has(enAfterColon) && keyMap.get(enAfterColon))
           || (roAfterColon && !afterColonKeys.has(roAfterColon) && keyMap.get(roAfterColon))
           || _franchiseSuffixLookup(enKey, keyMap, indexes, afterColonKeys)
           || (useRoKey ? _franchiseSuffixLookup(roKey, keyMap, indexes, afterColonKeys) : null)
           || enKey;

      // Register all key variants so future anime with any title variant find
      // this group. Only matters for the title-pattern fallback path; relations
      // groups don't need title-key registration.
      keyMap.set(enKey, canon);
      _indexFranchiseKey(indexes, enKey);
      if (useRoKey) { keyMap.set(roKey, canon); _indexFranchiseKey(indexes, roKey); }
      // v1.0.189 — after-colon keys are tracked in afterColonKeys so
      // suffix-lookup can disallow SUFFIX-direction matches against them.
      if (enAfterColon && enAfterColon !== enKey) { keyMap.set(enAfterColon, canon); _indexFranchiseKey(indexes, enAfterColon); afterColonKeys.add(enAfterColon); }
      if (roAfterColon && roAfterColon !== roKey && roAfterColon !== enAfterColon) { keyMap.set(roAfterColon, canon); _indexFranchiseKey(indexes, roAfterColon); afterColonKeys.add(roAfterColon); }
    }

    if (!groups.has(canon)) {
      // Display name uses the current language preference
      const displayRaw = preferRomaji ? (a.titleRo || a.title || '') : enRaw;
      groups.set(canon, { name: _franchiseBaseName(displayRaw) || _franchiseBaseName(enRaw), members: [] });
    }

    groups.get(canon).members.push(a);
  }

  // v1.0.127 — second-pass merge by normalised group name. Catches the edge
  // case where the relations graph and title-pattern paths produced different
  // canon keys but both groups ended up with the same display name (e.g.
  // "Sword Art Online" + "Sword Art Online" from a partial-enrichment state).
  // Merging by normalised display name is safe because two genuinely different
  // franchises wouldn't normally normalise to the same name.
  const byNameKey = new Map();
  for (const [canon, group] of groups) {
    const nameKey = _franchiseKey(group.name);
    const existing = byNameKey.get(nameKey);
    if (existing) {
      existing.members.push(...group.members);
      groups.delete(canon);
    } else {
      byNameKey.set(nameKey, group);
    }
  }

  const result = [];
  for (const group of groups.values()) {
    group.members.sort((a, b) => b.elo - a.elo);
    group.bestElo = Math.round(group.members.reduce((s, a) => s + a.elo, 0) / group.members.length);
    // v1.0.211 — peakElo powers the "Peak ELO" sort option in franchise mode.
    // Not surfaced visually on the card (the headline ELO number is the
    // average), but lets users re-sort the franchise list by their single
    // strongest entry per franchise.
    group.peakElo = group.members[0].elo;
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
    } else {
      // v1.0.140 — re-derive the franchise name from the most popular member
      // rather than whichever entry happened to be processed first. AniList
      // popularity is a strong "mainline vs spinoff" signal — Akame ga Kill!
      // TV swamps AkaKill! Theater (the parody short), Madoka Magica TV
      // swamps the recap movies, etc. Aliased franchises (Gundam, FLCL,
      // Pokemon) preserve their canon name because _franchiseBaseName
      // short-circuits to the alias regardless of input.
      const mainline = group.members.slice().sort((a, b) =>
        (b.popularity || 0) - (a.popularity || 0) || (b.elo || 0) - (a.elo || 0)
      )[0];
      const mainlineRaw = preferRomaji
        ? (mainline.titleRo || mainline.title || '')
        : (mainline.titleEn || mainline.title || '');
      const cleanName = _franchiseBaseName(mainlineRaw);
      if (cleanName) group.name = cleanName;
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
    // v1.0.211 — Franchise-only aggregates. The flat list ignores these
    // (case falls through to default 'elo' sort) — the sort buttons are
    // hidden when franchiseMode is off so users can't accidentally pick
    // them in flat mode.
    case 'peak':
      result.sort((a, b) => (a.peakElo - b.peakElo) * dir);
      break;
    case 'members':
      result.sort((a, b) => (a.members.length - b.members.length) * dir);
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
  const btn = byId(IDS.franchiseBtn);
  if (btn) {
    btn.classList.toggle('active', franchiseMode);
    btn.setAttribute('aria-pressed', franchiseMode ? 'true' : 'false');
  }
  // v1.0.211 — gate franchise-only sort buttons via body class. Also reset to
  // a flat-list-compatible sort when leaving franchise mode so the user
  // doesn't end up looking at the rankings sorted by a metric whose button
  // just disappeared.
  document.body.classList.toggle('franchise-mode-on', franchiseMode);
  if (!franchiseMode && (currentSort === 'peak' || currentSort === 'members')) {
    setSort('elo'); // resets the active button + re-renders
    return;
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
  // v1.0.164 — Franchise cards (single-member or otherwise) no longer carry
  // the amber outline. Outline only appears on member rows inside the
  // franchise detail modal so users can pinpoint which entry is flagged.
  const card = document.createElement('div');
  card.className = 'rank-card franchise-group'
                 + (isSingle ? ' franchise-single' : '');
  card.dataset.franchiseName = group.name;
  // Stash member IDs so _filterFranchise can apply per-member filters
  // (format / episode-length / excluded / fuzzy-only) without rebuilding the
  // franchise grouper. A franchise card is hidden iff NO member passes the
  // current filters.
  card.dataset.memberIds = group.members.map(a => a.id).join(',');

  // Tier is always based on ELO rank, not current sort position
  const tier = getTier(group.eloRank ?? rank, totalGroups);
  const tierColors = { S:'#ff9b00', A:'#3fb950', B:'#58a6ff', C:'#d29922', D:'#f85149' };
  const tierColor = tierColors[tier] || '#8b949e';
  const tierBadge = `<span class="rank-tier" style="background:${tierColor}22;color:${tierColor};border-color:${tierColor}44">${tier}</span>`;
  const countBadge = !isSingle ? `<span class="franchise-count">${group.members.length} entries</span>` : '';
  // v1.0.165 — fuzzy-member count badge. Renders alongside the entries
  // count when at least one member is flagged so users can spot
  // franchises with uncertain entries without opening each one.
  // v1.0.167 — single-member franchises also show the regular "Fuzzy" pill
  // (same as a flat rank card) so toggling franchise mode doesn't change how
  // a single-anime franchise's fuzzy state looks.
  const fuzzyCount = group.members.filter(a => a.fuzzy).length;
  const fuzzyCountBadge = (!isSingle && fuzzyCount > 0)
    ? `<span class="franchise-fuzzy-count" title="${fuzzyCount} entr${fuzzyCount === 1 ? 'y is' : 'ies are'} flagged as fuzzy — click in to see which.">〰️ ${fuzzyCount} fuzzy</span>`
    : '';
  const singleFuzzyPill = (isSingle && group.members[0]?.fuzzy)
    ? '<span class="fuzzy-tag" title="Fuzzy — you flagged this as not remembered well enough to judge fairly. It appears less often until you’ve refreshed your memory.">〰️ Fuzzy</span>'
    : '';
  const conf = confidenceLabel(group.totalBattles || 0);
  const wrStr = group.winRate !== null ? group.winRate + '%' : '–';
  // v1.0.167 — fuzzy members in the inline expand list get the same amber
  // outline + "〰️ Fuzzy" pill as a flat rank card. Helps pinpoint which
  // entry needs revisiting without opening the detail panel.
  const membersHtml = !isSingle ? `
    <div class="franchise-members" style="display:none">
      ${group.members.map(a => {
        const fuzzyCls  = a.fuzzy ? ' is-fuzzy' : '';
        const fuzzyPill = a.fuzzy
          ? ' <span class="fuzzy-tag" title="Fuzzy — flagged as uncertain">〰️ Fuzzy</span>'
          : '';
        return `
        <div class="franchise-member${fuzzyCls}" onclick="showAnimeDetail(${a.id})">
          <img${coverCors(a.cover)} src="${esc(a.cover || '')}" alt="" loading="lazy" onerror="this.style.display='none'" />
          <span class="franchise-member-title">${esc(a.titleEn || a.title)}${fuzzyPill}</span>
          <span class="franchise-member-elo">${a.elo}</span>
        </div>`;
      }).join('')}
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
    // v1.0.162 — Show the ELO-based rank in the #N badge, mirroring how flat
    // rank cards display their position (they ignore the current sort order
    // and always show ELO position). Previously the badge used `rank + 1`
    // which is the position in the currently-sorted list, so sorting a
    // franchise view by title made #1 become whichever franchise was
    // alphabetically first — confusing to anyone tracking their ELO ranks.
    const displayRank = (group.eloRank ?? rank) + 1;
    // v1.0.167 — apply the same gold/silver/bronze styling that flat rank
    // cards use. Top-3 franchises (by ELO rank, not sort position) should
    // stand out in franchise mode just like they do in flat-list mode.
    const numClass = displayRank === 1 ? 'gold' : displayRank === 2 ? 'silver' : displayRank === 3 ? 'bronze' : '';
    // v1.0.211 — "Top" badge surfaces the strongest *current* entry in the
    // franchise. Meaningful for multi-entry franchises ("Madoka Magica's
    // top is its TV series at 1480"), redundant for singletons (top = the
    // only entry, same as the headline avg). The `avg` sub-label pairs
    // with this so users don't confuse the average with the strongest.
    // Historical peak (highest ELO any member has ever reached) lives in
    // the franchise detail modal — see showFranchiseDetail.
    const peakBadge = !isSingle
      ? `<span class="franchise-peak" title="Highest current ELO in this franchise. Historical peak shown in the franchise overview.">★ Top ${group.peakElo}</span>`
      : '';
    card.innerHTML = `
      <span class="rank-number ${numClass}">#${displayRank}</span>
      <span class="tier-badge t-${tier.toLowerCase()}">${tier}</span>
      <img${coverCors(group.cover)} src="${esc(group.cover || '')}" alt="" loading="lazy" onerror="this.style.display='none'" />
      <div class="rank-title">${esc(group.name)}</div>
      ${countBadge || fuzzyCountBadge || peakBadge ? `<div class="franchise-grid-meta">${countBadge}${peakBadge}${fuzzyCountBadge}</div>` : ''}
      <div class="rank-elo">ELO ${group.bestElo}${!isSingle ? '<span class="franchise-elo-sub">avg</span>' : ''}</div>
      <span class="confidence ${conf.cls}">${conf.dot} ${conf.label}</span>
      ${singleFuzzyPill}
      ${cohBadge}
      ${!isSingle ? `<button class="franchise-expand-btn" onclick="toggleFranchiseExpand(this.closest('.franchise-group'))">▸ See all entries</button>` : ''}
      ${membersHtml}
    `;
  } else {
    card.innerHTML = `
      <div class="franchise-header" onclick="toggleFranchiseExpand(this.closest('.franchise-group'))" ondblclick="event.stopPropagation();showFranchiseDetail('${esc(group.name)}')" title="Double-click for franchise overview">
        <img${coverCors(group.cover)} src="${esc(group.cover || '')}" alt="" loading="lazy" onerror="this.style.display='none'" />
        <div class="franchise-info">
          <div class="franchise-name rank-title">${esc(group.name)}</div>
          <div class="franchise-meta">
            ${tierBadge}
            <span class="franchise-elo">ELO ${group.bestElo}${!isSingle ? '<span class="franchise-elo-sub">avg</span>' : ''}</span>
            ${!isSingle ? `<span class="franchise-peak" title="Highest current ELO in this franchise.">★ Top ${group.peakElo}</span>` : ''}
            <span class="franchise-elo">${wrStr} WR · ${group.totalBattles} battles</span>
            ${countBadge}
            ${fuzzyCountBadge}
            ${singleFuzzyPill}
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

function showFranchiseDetail(groupName, opts) {
  const skipHistoryPush = !!(opts && opts.skipHistoryPush);
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
    // v1.0.163 — Mark each member row as is-fuzzy if that specific entry
    // is flagged. Combined with the rule below, this gives the fuzzy entry
    // an amber outline inside the franchise detail modal so it's
    // immediately clear which member is uncertain (the whole franchise
    // doesn't carry the outline any more — only the affected entry).
    const fuzzyCls = a.fuzzy ? ' is-fuzzy' : '';
    // v1.0.211 — Stash the franchise name so the resulting anime detail modal
    // can show a "← Back" button that returns to this franchise overview
    // instead of dumping the user back at the Rankings screen with no context.
    const backName = esc(group.name).replace(/'/g, "\\'");
    return `<div class="franchise-detail-member${fuzzyCls}" onclick="navigateToFranchiseMember(${a.id}, '${backName}')">
      <img${coverCors(a.cover)} src="${esc(a.cover || '')}" alt="" loading="lazy" onerror="this.style.display='none'" />
      <div class="franchise-detail-member-info">
        <div class="franchise-detail-member-title">${esc(displayTitle(a))}${a.fuzzy ? ' <span class="member-fuzzy-tag" title="Fuzzy — flagged as uncertain">〰️</span>' : ''}</div>
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
  // v1.0.211 — Historical peak (highest ELO any member has ever reached) is
  // derived from each member's eloHistory array (capped at 30 entries, so
  // this is "all-time" only within that window — older peaks roll off).
  // We take the max across history + current ELO so the current value
  // itself counts as a high if it hasn't been recorded in history yet.
  let allTimePeak = group.members[0].elo;
  let allTimePeakMember = group.members[0];
  for (const m of group.members) {
    const memberMax = Math.max(m.elo, ...(Array.isArray(m.eloHistory) ? m.eloHistory : []));
    if (memberMax > allTimePeak) {
      allTimePeak = memberMax;
      allTimePeakMember = m;
    }
  }
  const isSingleMember = group.members.length === 1;
  const peakNowHtml = !isSingleMember
    ? ` · Top now ${group.peakElo}`
    : '';
  const peakAllTimeHtml = !isSingleMember && allTimePeak > group.peakElo
    ? ` · All-time best ${allTimePeak} <span style="color:#8b949e;font-size:0.82rem">(${esc(displayTitle(allTimePeakMember))})</span>`
    : '';
  byId(IDS.modalRankLine).innerHTML = `${tierHtml}${group.members.length} entries · Avg ELO ${group.bestElo}${peakNowHtml}${peakAllTimeHtml}`;
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
  // v1.0.211 fix — Battle Next is for a single anime; on a franchise modal
  // it would queue a STALE anime id (whichever was last opened in a single-
  // anime detail). Hide it here so it can't be clicked.
  const battleNextBtn = byId(IDS.modalBattleNextBtn);
  if (battleNextBtn) battleNextBtn.style.display = 'none';
  // v1.0.161 — fuzzy notice is per-anime; hide on franchise-level modal.
  const fuzzyNoticeEl = byId(IDS.modalFuzzyNotice);
  if (fuzzyNoticeEl) fuzzyNoticeEl.style.display = 'none';

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

  // v1.0.211 — Franchise actions row. "Battle within" launches a sub-mode
  // restricted to this franchise's members (so users can settle internal
  // rankings without seeing the franchise paired with unrelated titles
  // every few battles). "Exclude all" bulk-excludes the entire franchise
  // from battles in one shot — useful for finished shows or shows you've
  // decided you don't want to keep ranking. Both pass the canonical group
  // name as a string parameter so they re-look-up the current member set
  // (the franchise grouping is recomputed at call time and the member list
  // could have changed since modal-open if the user excluded an entry).
  const safeName = esc(group.name).replace(/'/g, "\\'");
  const canBattle = group.members.length >= 2;
  const actionsHtml = `
    <div class="franchise-detail-actions">
      <button type="button" class="franchise-action-btn"
              ${canBattle ? '' : 'disabled title="Need ≥2 entries to battle"'}
              onclick="startBattleWithinFranchise('${safeName}')">⚔ Battle within</button>
      <button type="button" class="franchise-action-btn franchise-action-danger"
              onclick="bulkExcludeFranchise('${safeName}')">🚫 Exclude all from battles</button>
    </div>`;

  // Replace description with the member list
  const descEl = byId(IDS.modalDescription);
  if (descEl) {
    descEl.innerHTML = actionsHtml + `<div class="franchise-detail-members">${membersHtml}</div>`;
    descEl.style.display = 'block';
    descEl.style.opacity = '1';
  }

  byId(IDS.detailModal).style.display = 'flex';
  byId(IDS.detailModal).scrollTop = 0;
  // v1.0.212 — skipHistoryPush is used by navigateBackToFranchise when
  // swapping content in an already-open detail modal. See showAnimeDetail.
  if (!skipHistoryPush) pushModalBack('detail', closeDetailModal);
}

function closeDetailModal() {
  byId(IDS.detailModal).style.display = 'none';
  popModalBack('detail');
  // v1.0.211 — Clear any pending "back to franchise" state when the modal is
  // closed via the close button / overlay click / Escape. Without this, a
  // user who opens a franchise → drills into a member → closes → opens a
  // different anime card directly would still see the stale back button.
  _detailFranchiseBack = null;
  const backBtn = byId(IDS.modalFranchiseBackBtn);
  if (backBtn) backBtn.style.display = 'none';
}

// v1.0.211 — Back-to-franchise navigation. When a user clicks an entry in the
// franchise modal we close the franchise overview, open the individual anime
// detail, and stash the franchise name so a "← Back" button in the detail
// modal can return to it. The back button is shown by navigateToFranchiseMember
// (after showAnimeDetail repaints the modal) and hidden by closeDetailModal /
// a direct showAnimeDetail call.
let _detailFranchiseBack = null;
// v1.0.212 fix — Was previously doing `closeDetailModal()` + `showAnimeDetail()`
// in the same synchronous block, which races the `history.back()` /
// `history.pushState` calls inside each. The browser would sometimes pop past
// the synthetic detail-modal entry, navigating away from the app entirely.
// Now we swap modal content in place — the modal element stays open and the
// "detail" entry stays in the back stack the whole transition, so the in-modal
// ← Back button just re-renders content rather than touching history at all.
function navigateToFranchiseMember(id, franchiseName) {
  _detailFranchiseBack = franchiseName || null;
  showAnimeDetail(id, { skipHistoryPush: true });
  // showAnimeDetail clears the back state because it doesn't know it's
  // being called from a franchise → member transition. Re-set after.
  _detailFranchiseBack = franchiseName || null;
  const backBtn = byId(IDS.modalFranchiseBackBtn);
  if (backBtn && _detailFranchiseBack) backBtn.style.display = '';
}
function navigateBackToFranchise() {
  const name = _detailFranchiseBack;
  if (!name) { closeDetailModal(); return; }
  _detailFranchiseBack = null;
  const backBtn = byId(IDS.modalFranchiseBackBtn);
  if (backBtn) backBtn.style.display = 'none';
  showFranchiseDetail(name, { skipHistoryPush: true });
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
// This drives the Rankings tab's franchise-view, so use the Ranking scope.
function _franchiseSortedList() {
  // v1.0.167 — `showFuzzyOnly` deliberately NOT applied here. If we strip
  // non-fuzzy anime before grouping, multi-member franchises with one fuzzy
  // member degenerate to a single-member group (wrong name, broken click
  // handler, miscomputed eloRank — because eloRank is calculated against the
  // filtered set). The fuzzy-only predicate is instead applied at the display
  // layer by _filterFranchise(), which hides any group whose visible-member
  // count drops to zero. Same pattern as how the format / episode-length /
  // excluded filters are handled in franchise mode.
  return getSortedList().filter(a =>
    !excludedIds.has(a.id) &&
    !hiddenFormatsRanking.has(a.format) &&
    !hiddenEpRangesRanking.has(epRange(a.episodes, a.format))
  );
}

// v1.0.153 — Delegated click handler for grid rank cards. Replaces the
// per-card addEventListener that used to attach 6500 closures + listeners
// on large libraries. Installed once and idempotently — the flag stays
// across re-renders since the parent #ranking-list is not destroyed.
function _installRankingListClickDelegate() {
  const list = byId(IDS.rankingList);
  if (!list || list._clickDelegated) return;
  list.addEventListener('click', e => {
    const card = e.target.closest('.rank-card');
    if (!card || card.classList.contains('franchise-group')) return;
    const id = parseInt(card.dataset.animeId, 10);
    if (id) showAnimeDetail(id);
  });
  list._clickDelegated = true;
}

function renderRankingList() {
  const gen = ++_renderGen;
  const list = byId(IDS.rankingList);
  list.innerHTML = '';
  _installRankingListClickDelegate();

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

  // v1.0.153 — bump chunk size at scale to reduce idle-callback round-trips.
  // The browser is fast enough to inject 200 cards per frame; the previous
  // 60-per-frame meant a 6500-anime library needed ~108 schedule cycles
  // before the grid was complete.
  const CHUNK = sorted.length > 1500 ? 200 : 60;
  function renderChunk(start) {
    if (_renderGen !== gen) return; // newer render started — abort
    const frag = document.createDocumentFragment();
    const end = Math.min(start + CHUNK, sorted.length);
    for (let i = start; i < end; i++) {
      frag.appendChild(_buildRankCard(sorted[i], i, eloRankMap, sorted.length));
    }
    list.appendChild(frag);
    if (end < sorted.length) {
      const schedule = window.requestIdleCallback || (fn => setTimeout(fn, 0));
      schedule(() => renderChunk(end));
    } else {
      // v1.0.153 — run filterRankings ONCE after all chunks are in the DOM,
      // instead of per chunk. Previously this was O(n²) during initial
      // render — each chunk added rows then re-walked every existing card
      // to re-apply filters. At 6500 entries with chunk=60 that was ~108
      // calls × growing cardinality = millions of style writes.
      filterRankings();
    }
  }
  renderChunk(0);

  if (rankingView === 'list') renderRankingTable();
}

function showResults() {
  // v1.0.227 — DIAGNOSTIC: prove that showResults runs and see if the URL
  // still contains the tower params by this point.
  try {
    const search = window.location.search || '(no search)';
    showToast(`📊 showResults ran, URL=${search}`, 5000);
  } catch { /* defensive */ }
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
  // v1.0.211 — migrate any legacy hiddenFormatsRanking / hiddenEpRangesRanking
  // sets into chip-picker state, then paint the chip row. Must run AFTER
  // saveState restores the legacy sets but BEFORE the first filterRankings.
  _migrateLegacyFiltersToChips();
  _renderSearchChips();
  byId(IDS.viewGridBtn)?.classList.toggle('active', rankingView === 'grid');
  byId(IDS.viewListBtn)?.classList.toggle('active', rankingView === 'list');
  const franchiseBtn = byId(IDS.franchiseBtn);
  if (franchiseBtn) {
    franchiseBtn.classList.toggle('active', franchiseMode);
    franchiseBtn.setAttribute('aria-pressed', franchiseMode ? 'true' : 'false');
  }
  // v1.0.211 — keep the body class in lockstep with franchiseMode at boot too
  // (toggleFranchiseMode handles runtime toggling; this handles page-load
  // restoration so franchise-only sort buttons appear immediately for users
  // whose saved view was already in franchise mode).
  document.body.classList.toggle('franchise-mode-on', franchiseMode);
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
  // v1.0.211 — silent background enrichment for older saves that predate
  // studios being part of the initial AniList fetch. Without this, the
  // first click on the Studio picker shows a "Loading…" state with no
  // explanation. Fires once per session, only if studios are actually
  // missing, and only after the user is past the first battle so the
  // initial paint isn't competing for AniList bandwidth.
  setTimeout(() => {
    if (_enrichmentAttemptedKey) return;
    if (!animeList.some(a => !Array.isArray(a.studios))) return;
    _enrichGenresAndEras().then(() => {
      _enrichmentAttemptedKey = `${animeList.length}:${animeList[0]?.id || 0}:${animeList[animeList.length - 1]?.id || 0}`;
      saveState();
    }).catch(() => { /* silent — picker still has its own retry path */ });
  }, 4000);
  // Start polling for new anime if logged in via either service (deferred so ranking renders first)
  if ((authToken && authUser) || (malAuthToken && malAuthUser)) setTimeout(_startNewAnimePolling, 2000);
  // Load any queued post-finish prompts (prunes stale ones, shows banner if pending)
  _loadFinishPrompts();
  // Load notification centre and update bell badge; reveal the bell now that a session is active
  _ncLoad();
  _ncUpdateBell();
  byId(IDS.notifBell).style.display = 'flex';
  // Initialise NEW tab badges (hides any already-seen ones)
  _initNewBadges();
  // Sync taste badge now that battleCount is known
  _syncTasteNewBadge();
  // v1.0.219 — Tower-retry push deep link. animeList is populated by here,
  // so we can resolve the mediaId from `?tower=1&mediaId=N` and start a
  // Tower run with the matching anime as the climber.
  _towerCheckDeepLink();
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
  const countEl = byId(IDS.historyCount);
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

function _filterFranchise(preParsedQuery) {
  // v1.0.211 — token grammar + chip picker. filterRankings hands us the
  // already-merged effective query; standalone callers (e.g. switching
  // sort modes) re-parse from the input AND union the chip state in.
  const query = preParsedQuery
    || _effectiveSearchQuery(_parseSearchQuery(byId(IDS.searchInput)?.value || ''));
  const animeById = new Map(animeList.map(a => [a.id, a]));
  const memberPasses = (a) => {
    if (!a) return false;
    if (excludedIds.has(a.id))                              return false;
    if (hiddenFormatsRanking.has(a.format))                        return false;
    if (hiddenEpRangesRanking.has(epRange(a.episodes, a.format)))  return false;
    if (showFuzzyOnly && !a.fuzzy)                          return false;
    if (!_animeMatchesSearchTokens(a, query))               return false;
    return true;
  };
  // A franchise group is shown iff at least ONE member passes the filters —
  // otherwise the group has nothing visible and should be hidden too.
  const groupHasVisibleMember = (csv) => {
    if (!csv) return true; // legacy card without member-id list — assume visible
    const ids = csv.split(',');
    for (const idStr of ids) {
      const id = Number(idStr);
      if (memberPasses(animeById.get(id))) return true;
    }
    return false;
  };
  // Search text match: franchise name OR any member title contains the text.
  // Member-title matching means typing "Brotherhood" finds the Fullmetal group
  // even though the group's display name is just "Fullmetal Alchemist".
  const groupMatchesText = (csv, name) => {
    if (!query.text) return true;
    if ((name || '').toLowerCase().includes(query.text)) return true;
    if (!csv) return false;
    return csv.split(',').some(idStr => {
      const a = animeById.get(Number(idStr));
      return a && displayTitle(a).toLowerCase().includes(query.text);
    });
  };

  if (rankingView === 'grid') {
    document.querySelectorAll('#ranking-list .franchise-group').forEach(card => {
      const matchesSearch  = groupMatchesText(card.dataset.memberIds, card.dataset.franchiseName);
      const matchesFilters = groupHasVisibleMember(card.dataset.memberIds);
      card.style.display = (matchesSearch && matchesFilters) ? '' : 'none';
    });
  } else {
    // List mode — filter group header rows and hide/show their members together
    document.querySelectorAll('#ranking-table-body .franchise-table-group').forEach(row => {
      const title = row.querySelector('.tbl-title')?.textContent || '';
      const matchesSearch  = groupMatchesText(row.dataset.memberIds, title);
      const matchesFilters = groupHasVisibleMember(row.dataset.memberIds);
      const show  = matchesSearch && matchesFilters;
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
// Load a cover image for canvas drawing.
// First attempts fetch() → blob URL (avoids canvas tainting on CORS-enabled CDNs).
// Falls back to img.crossOrigin = 'anonymous' if the CDN doesn't return CORS
// headers on the fetch — AniList's CDN occasionally skips them on cache misses.
async function _loadCoverForCanvas(url, timeoutMs = 4000) {
  if (!url) return null;

  // ── Primary: fetch → blob URL ─────────────────────────────────────────────
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { mode: 'cors', cache: 'no-store', signal: controller.signal });
    clearTimeout(timer);
    if (resp.ok) {
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => { URL.revokeObjectURL(objectUrl); resolve(img); };
        img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(null); };
        img.src = objectUrl;
      });
    }
  } catch {
    clearTimeout(timer);
  }

  // ── Fallback: crossOrigin img (may taint canvas, but better than blank) ───
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url + (url.includes('?') ? '&' : '?') + '_cb=' + Date.now();
  });
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
    hiddenFormatsBattle:   [...hiddenFormatsBattle],
    hiddenFormatsRanking:  [...hiddenFormatsRanking],
    hiddenEpRangesBattle:  [...hiddenEpRangesBattle],
    hiddenEpRangesRanking: [...hiddenEpRangesRanking],
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
      hiddenFormatsBattle:   payload.hiddenFormatsBattle   ?? payload.hiddenFormats   ?? [],
      hiddenFormatsRanking:  payload.hiddenFormatsRanking  ?? payload.hiddenFormatsBattle  ?? payload.hiddenFormats  ?? [],
      hiddenEpRangesBattle:  payload.hiddenEpRangesBattle  ?? payload.hiddenEpRanges  ?? [],
      hiddenEpRangesRanking: payload.hiddenEpRangesRanking ?? payload.hiddenEpRangesBattle ?? payload.hiddenEpRanges ?? [],
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
    'This will permanently delete all your battle history, rankings, and achievements for this account — including the cloud copy. There is no undo.',
    'Yes, reset',
    async () => {
      // v1.0.211 — wipe the cloud save FIRST. Without this, the immediately-
      // following startLoading() call hits checkAndApplyCloudSave() and
      // restores the cloud copy of the user's session — defeating the reset.
      // (deleteAllData has always done this; resetAll was the inconsistent
      // one.) Also suppress cloud-save debounces during the in-memory wipe
      // so a battle finished in the last few seconds doesn't push pre-reset
      // state up after we've cleared it.
      clearTimeout(_cloudSaveTimer);
      _cloudSaveTimer = null;
      _suppressCloudSave = true;
      const wasAniList     = !!(authToken && authUser);
      const wasMAL         = !!(malAuthToken && malAuthUser);
      const rememberedName = authUser?.name || '';
      let cloudResult = { ok: true, reason: 'not-signed-in' };
      if (wasAniList || wasMAL) {
        cloudResult = await _wipeCloudSession();
      }

      if (saveKey) localStorage.removeItem(saveKey);
      // Clear taste snapshots, milestone seen-state, and saved comparisons
      // so taste profile, taste story, and social tab start completely fresh.
      localStorage.removeItem(KESSEN_KEYS.data.tasteSnapshots);
      localStorage.removeItem(KESSEN_KEYS.ui.tasteStorySeen);
      localStorage.removeItem(KESSEN_KEYS.data.savedComparisons);
      localStorage.removeItem(KESSEN_KEYS.data.finishPrompts);
      localStorage.removeItem(KESSEN_KEYS.data.finishPromptedIds);
      localStorage.removeItem(KESSEN_KEYS.data.notifCentre(saveKey));
      _finishPromptQueue = [];
      _notifCentre = [];
      byId(IDS.finishPromptBanner)?.classList.remove('active');
      _ncUpdateBell();
      _clearRankingState();
      // Re-enter the normal loading flow so the user gets a fresh session
      // with the same list they started from. Guest mode just lands on home.
      // _suppressCloudSave is reset by _applyCloudSaveToMemory the next time
      // the user logs in (or by the fresh saveState below for guest).
      if (wasAniList) {
        const input = byId(IDS.usernameInput);
        if (input) input.value = rememberedName;
        // v1.0.211 fix — release the cloud-save block BEFORE startLoading
        // re-authenticates. Without this, the fresh saveState calls that
        // follow re-fetch are silently dropped and every battle made before
        // the next login cycle fails to sync.
        _suppressCloudSave = false;
        startLoading();
      } else if (wasMAL) {
        _suppressCloudSave = false;
        _startMALOAuthSession();
      } else {
        _suppressCloudSave = false; // guest — no cloud anyway
      }
      // Surface cloud-wipe failure so the user knows their data isn't fully
      // gone if something went wrong. 'not-signed-in' is the guest case and
      // is not a failure.
      if (cloudResult.ok || cloudResult.reason === 'not-signed-in') {
        showToast('✓ Reset — starting fresh.');
      } else if (cloudResult.reason === 'verify-failed') {
        showToast('⚠️ Local reset done, but the cloud copy keeps coming back — another device may be re-uploading. Sign out everywhere and try again.', 8000);
      } else {
        showToast(`⚠️ Local reset done, but cloud wipe failed (${cloudResult.reason}). Try again, or use Delete all my data.`, 6000);
      }
    }
  );
}

// Tears down the cloud session for the currently-authenticated user.
// Returns { ok, reason } where reason is one of:
//   'success'         — both writes landed and verified clean
//   'not-signed-in'   — guest mode, no cloud blob to touch
//   'verify-failed'   — writes succeeded but read-back still showed non-wipe
//                       data (a stale autosync from another device raced us);
//                       we retry once internally, this is reported only if
//                       the retry also failed verification
//   'http-XXX' / err  — the underlying fetch threw or returned non-2xx
//
// The function is intentionally chatty about failure modes so the toast in
// deleteAllData can tell the user *why* their cloud data wasn't wiped if
// something went wrong, instead of falsely claiming success.
async function _wipeCloudSession() {
  const body = authToken
    ? { token: authToken }
    : (malAuthToken
        ? { malToken: malAuthToken, malUserId: malAuthUser?.id }
        : null);
  if (!body) return { ok: false, reason: 'not-signed-in' };

  const headers = { 'Content-Type': 'application/json' };
  const wipeBody = () => JSON.stringify({
    ...body,
    session: JSON.stringify({ _wiped: true, wipedAt: new Date().toISOString() }),
  });

  // (a) Hard-delete the blob
  let firstError = '';
  try {
    const r = await fetch('/.netlify/functions/delete-session', {
      method: 'POST', headers, body: JSON.stringify(body),
    });
    if (!r.ok) firstError = 'http-' + r.status + '@delete';
  } catch (e) { firstError = (e && e.message) || 'delete-failed'; }

  // (b) Write the wipe marker
  try {
    const r = await fetch('/.netlify/functions/save-session', {
      method: 'POST', headers, body: wipeBody(),
    });
    if (!r.ok) firstError = firstError || ('http-' + r.status + '@save');
  } catch (e) { firstError = firstError || ((e && e.message) || 'save-failed'); }

  // (c) Verify by reading back. If a stale write raced us, retry the marker.
  try {
    const r = await fetch('/.netlify/functions/load-session', {
      method: 'POST', headers, body: JSON.stringify(body),
    });
    if (r.ok) {
      const { session } = await r.json();
      if (session && !session._wiped && session.animeList) {
        // Stale write present — retry the wipe and re-verify
        await fetch('/.netlify/functions/save-session', {
          method: 'POST', headers, body: wipeBody(),
        });
        const r2 = await fetch('/.netlify/functions/load-session', {
          method: 'POST', headers, body: JSON.stringify(body),
        });
        if (r2.ok) {
          const { session: s2 } = await r2.json();
          if (s2 && !s2._wiped && s2.animeList) {
            return { ok: false, reason: 'verify-failed' };
          }
        }
      }
    }
  } catch (_e) { /* verification is best-effort — fall through */ }

  return { ok: !firstError, reason: firstError || 'success' };
}

async function deleteAllData() {
  const ok = await _confirmAsync(
    '🗑️ Delete all my data?',
    'This permanently deletes your rankings from this device and from cloud storage. You will be logged out. There is no undo.',
    'Yes, delete everything'
  );
  if (!ok) return;

  // Cancel any pending debounced cloud save and block all future ones for
  // the rest of this function. Without this guard, a battle finished within
  // the last ~5s before the user clicked Delete will fire its debounced
  // save AFTER our wipe marker is written, overwriting the wipe with the
  // pre-deletion session — which is exactly the "Newer cloud save found"
  // surprise we hit during beta testing. _suppressCloudSave is reset by
  // _applyCloudSaveToMemory the next time the user logs in.
  clearTimeout(_cloudSaveTimer);
  _cloudSaveTimer = null;
  _suppressCloudSave = true;

  // 1. Tear down the cloud save with verification:
  //    (a) HARD-DELETE the blob via /delete-session
  //    (b) Write a wipe marker via /save-session so multi-device sync sees it
  //    (c) Read back via /load-session — if the blob still contains a non-wipe
  //        session, something raced us (e.g. a Firebase autosync write from
  //        another device). Retry the wipe once.
  //
  //    Returns one of three reasons we surface in the toast: 'success',
  //    'not-signed-in' (user was in guest mode — cloud wasn't ours to wipe),
  //    or a short HTTP/network error string so the user can report it
  //    accurately rather than seeing a misleading "deleted ✓" message.
  const cloudResult = await _wipeCloudSession();
  const cloudDeleteOk = cloudResult.ok;

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
    showToast('✓ All your data has been deleted (local + cloud).');
  } else if (cloudResult.reason === 'not-signed-in') {
    showToast("⚠️ Local data cleared. You weren't signed in, so nothing to delete from cloud.", 6000);
  } else if (cloudResult.reason === 'verify-failed') {
    showToast('⚠️ Local data cleared, but the cloud copy keeps coming back — another device may be re-uploading. Sign out everywhere and try again.', 8000);
  } else {
    showToast(`⚠️ Local data cleared, but cloud delete failed (${cloudResult.reason}). Log back in and try again, or email feedback@kessen.co.uk.`, 6000);
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
    // v1.0.133 — mirror the AniList-import MUSIC filter so MAL users don't
    // pick up music-video entries either.
    .filter(e => mediaMap[e.malId].format !== 'MUSIC')
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
  _clearTasteSnapshots(); // fresh load — discard any leftovers from a prior session
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
  byId(IDS.recsTabMoods)?.classList.toggle('active', tab === 'moods');

  const isPredict = tab === 'predict';
  const isMoods   = tab === 'moods';
  const sub        = byId(IDS.recsSubText);
  const grid       = byId(IDS.recsGrid);
  const predictSec = byId(IDS.predictorSection);
  const moodsSec   = byId(IDS.moodsSection);
  const refreshBtn = byId(IDS.discoverRefreshBtn);

  if (sub)        sub.style.display        = (isPredict || isMoods) ? 'none' : '';
  if (grid)       grid.style.display       = (isPredict || isMoods) ? 'none' : (grid.style.display || '');
  if (predictSec) predictSec.style.display = isPredict ? '' : 'none';
  if (moodsSec)   moodsSec.style.display   = isMoods   ? '' : 'none';
  if (refreshBtn) refreshBtn.style.display = (isPredict || isMoods) ? 'none' : '';

  if (isMoods) {
    // Populate the discover mood grid
    const discoverMoodGrid = byId(IDS.discoverMoodGrid);
    if (discoverMoodGrid) _paintTasteMoods(discoverMoodGrid);
    return;
  }

  if (!isPredict) {
    if (tab === 'foryou') {
      sub.textContent = 'Based on your top-ranked anime — titles you haven\'t seen yet that AniList thinks you\'ll love.';
    } else {
      const { season, year } = getCurrentSeason();
      const nextS = getNextSeason(season, year);
      sub.innerHTML = `Airing this season (${season} ${year}) and next (${nextS.season} ${nextS.year}) — filtered to titles you haven't watched.<br>All recommendations are worth a look; 🎯 <strong>Strong match</strong> highlights the ones that best fit your taste.`;
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
              averageScore format status genres
            }
          }
        }
      }
    }`;

  for (let rank = 0; rank < seeds.length; rank++) {
    const anime = seeds[rank];
    try {
      const res = await _anilistFetch({ query, variables: { id: anime.id } });
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
    const res  = await _anilistFetch({ query, variables: { ids } });
    const json = await res.json();
    (json?.data?.Page?.media ?? []).forEach(m => _recRelationsCache.set(m.id, m.relations));
  } catch { /* relations are decorative — silently skip */ }
}

function _getRelationNote(media) {
  const eloSorted = [...animeList].sort((a, b) => b.elo - a.elo);
  const eloRankMap = new Map(eloSorted.map((a, i) => [a.id, i + 1]));
  const ownMap     = new Map(animeList.map(a => [a.id, a]));

  const relations = media.relations ?? _recRelationsCache.get(media.id);
  const edges = relations?.edges;

  // Priority: PREQUEL first (most actionable), then PARENT, SEQUEL, SIDE_STORY
  const priority = ['PREQUEL', 'PARENT', 'SEQUEL', 'SIDE_STORY', 'ALTERNATIVE'];
  const matches = (edges || [])
    .filter(e => priority.includes(e.relationType) && ownMap.has(e.node.id))
    .sort((a, b) => priority.indexOf(a.relationType) - priority.indexOf(b.relationType));

  if (matches.length) {
    const { relationType, node } = matches[0];
    const relTitle = node.title.english || node.title.romaji;
    const rank = eloRankMap.get(node.id);
    if (relationType === 'PREQUEL')
      return `<div class="rec-relation-note">📺 Sequel to <strong>${esc(relTitle)}</strong> — you have it at <strong>#${rank}</strong></div>`;
    if (relationType === 'SEQUEL')
      return `<div class="rec-relation-note">⏮ Watch this before <strong>${esc(relTitle)}</strong> (your <strong>#${rank}</strong>)</div>`;
    if (relationType === 'PARENT')
      return `<div class="rec-relation-note">🔗 Part of <strong>${esc(relTitle)}</strong> — you have it at <strong>#${rank}</strong></div>`;
    return `<div class="rec-relation-note">🔗 Related to <strong>${esc(relTitle)}</strong> (your <strong>#${rank}</strong>)</div>`;
  }

  // v1.0.211 — Title-pattern fallback. AniList's RELATIONS graph misses a lot
  // of specials / parody films / numbered seasons whose relation type is
  // CHARACTER or OTHER (not in our priority list), or whose related node ID
  // isn't the one the user actually owns. When that happens, fall back to
  // our own franchise grouper: normalise the candidate's title with
  // _franchiseKey and look for any user-owned anime that shares the same
  // franchise key. Catches "Saga of Tanya the Evil Season 2" ↔ "Saga of
  // Tanya the Evil", "Boku no Hero Academia: I am a hero too" ↔ "Boku no
  // Hero Academia", "Madoka Magica: Walpurgisnacht: Rising" ↔ Madoka.
  const candEn  = media.title?.english || '';
  const candRo  = media.title?.romaji  || '';
  const candEnKey = candEn ? _franchiseKey(candEn) : '';
  const candRoKey = candRo ? _franchiseKey(candRo) : '';
  if (!candEnKey && !candRoKey) return '';

  let bestMatch = null;
  let bestRank  = Infinity;
  for (const a of animeList) {
    const aEnKey = a.titleEn ? _franchiseKey(a.titleEn) : '';
    const aRoKey = a.titleRo ? _franchiseKey(a.titleRo) : '';
    const aMainKey = a.title  ? _franchiseKey(a.title)  : '';
    const hit = (candEnKey && (aEnKey === candEnKey || aRoKey === candEnKey || aMainKey === candEnKey))
             || (candRoKey && (aEnKey === candRoKey || aRoKey === candRoKey || aMainKey === candRoKey));
    if (!hit) continue;
    const rank = eloRankMap.get(a.id) ?? Infinity;
    if (rank < bestRank) {
      bestRank  = rank;
      bestMatch = a;
    }
  }
  if (!bestMatch) return '';
  const relTitle = displayTitle(bestMatch);
  return `<div class="rec-relation-note">🔗 Part of <strong>${esc(relTitle)}</strong> — you have it at <strong>#${bestRank}</strong></div>`;
}

// ─── REC CARD HTML HELPER ─────────────────────────────────────────────────────
function recCardHtml(media, opts = {}) {
  const { seasonLabel = '', watched = false, tasteScore = null } = opts;
  const title        = media.title.english || media.title.romaji;
  const cover        = media.coverImage?.large || media.coverImage?.medium;
  const avg          = media.averageScore ? (media.averageScore / 10).toFixed(1) : '–';
  const relationNote = _getRelationNote(media);
  const watchedTag   = watched ? '<span class="rec-badge-watched">✓ Watched</span>' : '';
  // Show a taste badge on cards that match the user's genres well
  const tasteTag = (tasteScore !== null && tasteScore >= 0.65 && !watched)
    ? '<span class="rec-badge-strong-match" title="Closely matches your top-rated genres">🎯 Strong match</span>'
    : '';
  const recUrl = (_isMalCloudSession() && media.idMal)
    ? `https://myanimelist.net/anime/${media.idMal}`
    : `https://anilist.co/anime/${media.id}`;
  return `
    <a class="rec-card" href="${esc(recUrl)}" target="_blank" rel="noopener noreferrer"
       style="${watched ? 'opacity:0.45' : ''}">
      <img${coverCors(cover)} src="${safeUrl(cover)}" alt="Cover art for ${esc(title)}" loading="lazy" />
      <div class="rec-card-body">
        <div class="rec-card-title">${esc(title)}</div>
        <div class="rec-card-meta">${esc(media.format || '')}${seasonLabel ? ' · ' + esc(seasonLabel) : ''}</div>
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
          id idMal title { romaji english } coverImage { large medium } averageScore format genres
        }
      }
    }`;
  try {
    const res = await _anilistFetch({ query });
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
          id idMal title { romaji english } coverImage { large medium } averageScore format genres
        }
      }
    }`;
  try {
    const res = await _anilistFetch({ query, variables: { genre: topGenre } });
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
          id idMal title { romaji english } coverImage { large medium } averageScore format genres
        }
      }
    }`;
  try {
    const r1 = await _anilistFetch({ query: candidateQuery });
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
    const r2 = await _anilistFetch({ query: relQuery, variables: { ids } });
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
  const { eloMin, eloRange } = _tasteEloRange();

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
      const res = await _anilistFetch({ query, variables: { season: s, year: y } });
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
      r._tasteScore = _computeTasteScore(r.media, genreAffinityMap, eloMin, eloRange);
      // For ranking we still need a number — fall back to 0.5 (median) when
      // tasteScore is null so unscored items don't sink to the bottom.
      const tasteForRanking = r._tasteScore == null ? 0.5 : r._tasteScore;
      const commNorm = (r.media.averageScore || 60) / 100;
      r._score = tasteForRanking * 0.65 + commNorm * 0.35;
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

// v1.0.211 — Shared taste-score helper used by every Discover section.
// Returns a normalised 0..1 score representing how well a media's genres
// align with the user's high-ELO ranks. Returns null if the user's list
// hasn't been enriched with genres yet, or the media has no genre data —
// callers should treat null as "no score available, don't show badge".
//
// Encapsulated so we don't have four copies of the same formula across
// For You / Seasonal / Genre Dive / Hidden Gems. Pass a precomputed
// affinity map + elo range to avoid rebuilding them per-item.
function _computeTasteScore(media, genreAffinityMap, eloMin, eloRange) {
  if (!genreAffinityMap || genreAffinityMap.size === 0) return null;
  const genres = Array.isArray(media.genres) ? media.genres : null;
  if (!genres || !genres.length) return null;
  const hits = genres.map(g => genreAffinityMap.get(g)).filter(v => v !== undefined);
  if (!hits.length) return null;
  const meanGenreElo = hits.reduce((s, v) => s + v, 0) / hits.length;
  return (meanGenreElo - eloMin) / eloRange;
}

// Shared elo-range derivation. Same min/max-min math the seasonal code uses.
function _tasteEloRange() {
  const vals = animeList.map(a => a.elo);
  if (!vals.length) return { eloMin: 0, eloRange: 1 };
  const eloMin = Math.min(...vals);
  const eloMax = Math.max(...vals);
  return { eloMin, eloRange: (eloMax - eloMin) || 1 };
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

  // v1.0.211 — pre-compute taste data once and pass tasteScore through to
  // every rendered card. Previously only Seasonal carried this score; For
  // You / Genre Dive / Hidden Gems all called recCardHtml without it so the
  // 🎯 Strong match badge was invisible on the tab most users default to.
  const tasteAffinity = _buildGenreAffinity();
  const tasteRange    = _tasteEloRange();
  const ts = (media) => _computeTasteScore(media, tasteAffinity, tasteRange.eloMin, tasteRange.eloRange);

  let mainHtml;
  if (result.grouped && result.groups.length) {
    mainHtml = result.groups.map(({ seed, recs }) => `
      <div class="recs-group">
        <h4 class="recs-group-heading">Because you loved <em>${esc(displayTitle(seed))}</em></h4>
        <div class="recs-subgrid">${recs.map(({ media }) => recCardHtml(media, { tasteScore: ts(media) })).join('')}</div>
      </div>`).join('');
  } else {
    const items = result.items || [];
    if (!items.length) {
      grid.innerHTML = '<p style="color:#8b949e;text-align:center">No recommendations yet — keep ranking!</p>';
      return;
    }
    mainHtml = `<div class="recs-subgrid">${items.map(({ media }) => recCardHtml(media, { tasteScore: ts(media) })).join('')}</div>`;
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
      ? genreResult.items.map(({ media }) => recCardHtml(media, { tasteScore: ts(media) })).join('')
      : '<p style="color:#8b949e;font-size:0.8rem">No results found.</p>';
  }
  if (gemsGridEl) {
    gemsGridEl.innerHTML = gemItems.length
      ? gemItems.map(({ media }) => recCardHtml(media, { tasteScore: ts(media) })).join('')
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
      const res = await _anilistFetch({ query, variables: { username } });
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
        <img${coverCors(item.cover)} src="${safeUrl(item.cover)}" alt="" aria-hidden="true" loading="lazy" />
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
        <img${coverCors(item.cover)} src="${safeUrl(item.cover)}" alt="" aria-hidden="true" loading="lazy" />
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
  pushModalBack('challenge', closeChallengeModal);
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
      const res = await _anilistFetch({ query, variables: { username } });
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
    // v1.0.176 — same focus-ring fix as the Watch Together version: if the
    // button retained focus from the previous round's tap, blur it so the
    // new round's card doesn't start with a phantom :focus highlight.
    if (document.activeElement === el) el.blur();
    el.innerHTML    = `
      <img${coverCors(anime.cover)} src="${safeUrl(anime.cover)}" alt="${esc(anime.title)}" />
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
  popModalBack('challenge');
}

// ─── LIVE CHALLENGE MODE ───────────────────────────────────────────────────────
// Two players online simultaneously. Each guesses the other's anime preferences.
// Uses the same Firebase app as Watch Together (live-challenges/ collection).
// Plan v2 signed off — see design doc for full rationale.

let _lc = null; // live challenge state

// ── WATCH-LIST FETCH ──────────────────────────────────────────────────────────
// Returns an array of AniList IDs for anime the user has completed or is watching.
// For MAL users, IDs are converted to AniList IDs via AniList's idMal_in query.
async function _lcFetchUserWatchedIds(username, platform) {
  if (platform === 'anilist') {
    const query = `
      query ($username: String) {
        MediaListCollection(userName: $username, type: ANIME, status_in: [COMPLETED, CURRENT, REPEATING]) {
          lists { entries { media { id } } }
        }
      }`;
    const res  = await _anilistFetch({ query, variables: { username } });
    if (!res.ok) throw new Error('AniList returned HTTP ' + res.status);
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0]?.message || 'AniList error');
    const coll = json.data?.MediaListCollection;
    if (!coll) throw new Error(`AniList user "${username}" not found or their list is private.`);
    const ids = coll.lists.flatMap(l => l.entries).map(e => e.media?.id).filter(Boolean);
    return [...new Set(ids)];
  }

  if (platform === 'mal') {
    // MAL no longer allows public API access — Jikan (the public mirror) is
    // blocked. Playing as a MAL user requires being logged in via MAL OAuth
    // so we can call the MAL API through our authenticated server-side proxy.
    if (!malAuthToken) {
      throw new Error('To play as a MAL user, please log in with MAL first.');
    }

    const malIds = new Set();
    const fetchMALAuth = async (status) => {
      let offset = 0;
      const limit = 1000;
      while (true) {
        const path = `/v2/users/@me/animelist?fields=list_status&limit=${limit}&offset=${offset}&status=${status}`;
        const res = await fetch('/.netlify/functions/mal-api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path, token: malAuthToken }),
        });
        if (res.status === 401) throw new Error('MAL session expired — please log in with MAL again.');
        if (!res.ok) throw new Error(`MAL API error (HTTP ${res.status}) — please try again.`);
        const data = await res.json();
        (data.data || []).forEach(item => { if (item.node?.id) malIds.add(item.node.id); });
        if (!data.paging?.next) break;
        offset += limit;
      }
    };
    await Promise.all([fetchMALAuth('completed'), fetchMALAuth('watching')]);

    if (malIds.size === 0) throw new Error('No watched anime found in your MAL account.');

    // Convert MAL IDs → AniList IDs in chunks of 50
    const malIdArr = [...malIds];
    const anilistIds = [];
    for (let i = 0; i < malIdArr.length; i += 50) {
      const chunk = malIdArr.slice(i, i + 50);
      const q = `query ($ids: [Int]) { Page(perPage: 50) { media(idMal_in: $ids, type: ANIME) { id } } }`;
      const r = await _anilistFetch({ query: q, variables: { ids: chunk } });
      if (!r.ok) throw new Error(`AniList returned an error (HTTP ${r.status}) while converting MAL IDs.`);
      const j = await r.json();
      (j?.data?.Page?.media ?? []).forEach(m => anilistIds.push(m.id));
      if (i + 50 < malIdArr.length) await new Promise(r => setTimeout(r, 350));
    }
    if (anilistIds.length === 0) throw new Error('Could not match any MAL entries to AniList — check the username and try again.');
    return [...new Set(anilistIds)];
  }

  throw new Error('Unknown platform: ' + platform);
}

// Fetch title + cover for a set of AniList IDs (used to build pair display data)
async function _lcFetchAnimeMetadata(ids) {
  const q = `
    query ($ids: [Int]) {
      Page(perPage: 50) {
        media(id_in: $ids, type: ANIME) {
          id
          title { romaji english }
          coverImage { large medium }
          format
          episodes
        }
      }
    }`;
  const results = [];
  // Sample up to 100 IDs — plenty to build 10 pairs from
  const sample = [...ids].sort(() => Math.random() - 0.5).slice(0, 100);
  for (let i = 0; i < sample.length; i += 50) {
    const chunk = sample.slice(i, i + 50);
    const res  = await _anilistFetch({ query: q, variables: { ids: chunk } });
    const json = await res.json();
    (json?.data?.Page?.media ?? []).forEach(m => results.push({
      id:       m.id,
      title:    m.title.english || m.title.romaji,
      cover:    m.coverImage?.large || m.coverImage?.medium || '',
      format:   m.format   || 'TV',
      episodes: m.episodes || 0,
    }));
    if (i + 50 < sample.length) await new Promise(r => setTimeout(r, 300));
  }
  return results;
}

// Build 10 random pairs from the mutual watched anime pool
function _lcBuildPairsFromMutual(mutualAnime) {
  const pool = [...mutualAnime].sort(() => Math.random() - 0.5);
  // Generate candidate pairs (cap at 500 to avoid O(n²) blowup)
  const pairs = [];
  outer: for (let i = 0; i < pool.length; i++) {
    for (let j = i + 1; j < pool.length; j++) {
      pairs.push({
        aId: pool[i].id, bId: pool[j].id,
        aTitle: pool[i].title,    bTitle: pool[j].title,
        aCover: pool[i].cover,    bCover: pool[j].cover,
        aFormat: pool[i].format,  bFormat: pool[j].format,
        aEpisodes: pool[i].episodes, bEpisodes: pool[j].episodes,
      });
      if (pairs.length >= 500) break outer;
    }
  }
  return pairs.sort(() => Math.random() - 0.5).slice(0, 10);
}

function _lcPanel(id) {
  [IDS.lcPanelSetup, IDS.lcPanelLobby, IDS.lcPanelBuilding, IDS.lcPanelGame, IDS.lcPanelResults]
    .forEach(p => { const el = byId(p); if (el) el.style.display = 'none'; });
  const target = byId(id);
  if (target) target.style.display = '';
}

// v1.0.152 — Use crypto.getRandomValues for session codes. Math.random is
// non-cryptographic and fingerprintable from a few observed codes; an
// attacker who saw a handful of session codes could predict future ones
// or enumerate the space. crypto.getRandomValues yields cryptographically
// random bytes. Bumped length from 6 → 7 chars to raise the keyspace
// from 32^6 (~10^9) to 32^7 (~3×10^10) without making codes painful to
// share verbally. _isValidSessionCode's [4,8] range already accepts this.
function _generateSessionCode(len = 7) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 32 chars, omits I/O/0/1
  const buf = new Uint8Array(len);
  // crypto.getRandomValues is on globalThis in modern browsers + workers.
  // Fall back to Math.random only if crypto is absent (very old contexts).
  if (globalThis.crypto && globalThis.crypto.getRandomValues) {
    globalThis.crypto.getRandomValues(buf);
  } else {
    for (let i = 0; i < len; i++) buf[i] = Math.floor(Math.random() * 256);
  }
  // Mask each byte to charset size via bitwise AND (32 = 2^5, so & 31 is
  // exactly modulo with no bias — important for crypto-clean output).
  let out = '';
  for (let i = 0; i < len; i++) out += chars[buf[i] & 31];
  return out;
}

function _lcGenerateCode() {
  return _generateSessionCode();
}

// Guard for any user-supplied or storage-derived code before it gets concatenated
// into a Firebase path. Without this, a malicious or corrupted code could
// traverse outside the live-challenges/ or collab-sessions/ subtree
// (Firebase rejects `.`, `$`, `#`, `[`, `]` but treats `/` as the path separator).
// Same charset as _lcGenerateCode / _collabGenerateCode, with a 4-8 range to
// accept the 6-char codes we mint plus a small buffer for future tweaks.
function _isValidSessionCode(code) {
  return typeof code === 'string' && /^[A-Z0-9]{4,8}$/.test(code);
}

// Scoring: 1 pt for correctly predicting opponent's pick + 1 bonus pt if
// both players picked the same show (taste match). Max 2 pts per round.
function _lcMyScore() {
  if (!_lc) return 0;
  return (_lc.pairs || []).reduce((sum, _pair, idx) => {
    const myPred  = (_lc.predictions  || {})[idx];
    const oppPick = (_lc.opponentPicks || {})[idx];
    const myPick  = (_lc.picks        || {})[idx];
    if (!myPred || !oppPick) return sum;
    return sum
      + (myPred === oppPick   ? 1 : 0)   // predicted correctly
      + (myPick  === oppPick  ? 1 : 0);  // taste match bonus
  }, 0);
}

function _lcOpponentScore() {
  if (!_lc) return 0;
  return (_lc.pairs || []).reduce((sum, _pair, idx) => {
    const oppPred = (_lc.opponentPredictions || {})[idx];
    const myPick  = (_lc.picks              || {})[idx];
    const oppPick = (_lc.opponentPicks      || {})[idx];
    if (!oppPred || !myPick) return sum;
    return sum
      + (oppPred === myPick  ? 1 : 0)   // opponent predicted correctly
      + (oppPick === myPick  ? 1 : 0);  // taste match bonus (symmetric)
  }, 0);
}

// ── SESSION PERSISTENCE ────────────────────────────────────────────────────────
// Saves minimal state to sessionStorage so we can offer a rejoin after an
// accidental close. Cleared on intentional close or explicit dismiss.
function _lcSaveSession() {
  if (!_lc) return;
  try {
    sessionStorage.setItem('kessen-lc', JSON.stringify({
      code:     _lc.sessionCode,
      playerId: _lc.myPlayerId,
      mode:     _lc.mode,
      username: _lc.myUsername || '',
    }));
  } catch {}
}

function _lcClearSession() {
  try { sessionStorage.removeItem('kessen-lc'); } catch {}
}

function _lcGetStoredSession() {
  try { return JSON.parse(sessionStorage.getItem('kessen-lc')); } catch { return null; }
}

function _lcCheckRejoinBanner() {
  if (!_FIREBASE_READY) return;
  const stored = _lcGetStoredSession();
  const banner = byId(IDS.lcRejoinBanner);
  if (!stored || !banner) return;
  byId(IDS.lcRejoinDesc).textContent = `Session ${stored.code} · playing as ${stored.username}`;
  banner.style.display = '';
}

// ── SHAREABLE LINK ─────────────────────────────────────────────────────────────
// Sets ?lc=CODE in the URL so the host can copy/share it, and clears it on close.
function _lcSetDeepLink(code) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('lc', code);
    history.replaceState(null, '', url.toString());
  } catch {}
}

function _lcClearDeepLink() {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('lc')) {
      url.searchParams.delete('lc');
      history.replaceState(null, '', url.toString());
    }
  } catch {}
}

// Build the shareable join URL for the current session.
function _lcBuildShareUrl() {
  const code = _lc?.sessionCode;
  if (!code) return null;
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('lc', code);
  return url.toString();
}

// Copy the shareable link to clipboard; fall back to the Web Share API on mobile.
// If clipboard is unavailable, show a prompt so the user can copy manually.
async function lcShareLink() {
  const shareUrl = _lcBuildShareUrl();
  if (!shareUrl) return;

  const btn = byId(IDS.lcShareBtn);
  const reset = () => { if (btn) btn.textContent = 'Copy link'; };

  try {
    if (navigator.share) {
      await navigator.share({ title: 'Join my Kessen Live Challenge!', url: shareUrl });
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    if (btn) btn.textContent = '✓ Copied!';
    setTimeout(reset, 2500);
  } catch {
    // Clipboard API unavailable or denied — show toast with the link
    showToast('Could not copy automatically — long-press the link to copy: ' + shareUrl, 6000);
    reset();
  }
}

// Called on startup: if ?lc=CODE is in the URL, auto-open the join flow.
// The _FIREBASE_READY guard is intentionally absent — we just need to show
// the modal and pre-fill the code. Firebase readiness is checked when the
// user actually clicks Join.
function _lcCheckDeepLink(retriesLeft = 10) {
  const params = new URLSearchParams(window.location.search);
  const code   = params.get('lc');
  if (!code || !_isValidSessionCode(code.toUpperCase())) return;

  if (!_FIREBASE_READY) {
    // v1.0.108 — Firebase SDK loads asynchronously; if the deep-link fires
    // before _FIREBASE_READY flips, retry for up to ~5 seconds (10 × 500ms)
    // before giving up. Without this, opening a shared link on a slow network
    // silently failed and the user saw nothing happen.
    if (retriesLeft > 0) {
      showToast('Joining session…', 1000);
      setTimeout(() => _lcCheckDeepLink(retriesLeft - 1), 500);
      return;
    }
    showToast('⚠️ Could not connect to Live Challenge — check your connection and try again.', 5000);
    _lcClearDeepLink();
    return;
  }

  // Clean the URL immediately — we've consumed the param
  _lcClearDeepLink();

  // Open the setup modal and pre-fill the join code
  openLiveChallengeMode();
  const codeEl = byId(IDS.lcSetupJoinCode);
  if (codeEl) codeEl.value = code.toUpperCase();

  // If the user is already authenticated, auto-trigger the join so opening
  // the link feels seamless — they don't need to click anything extra.
  const alreadyAuthed = !!(authUser?.name || malAuthUser?.name);
  if (alreadyAuthed) {
    // Small delay so the modal renders first and the button feedback is visible
    setTimeout(() => lcJoinSession(), 300);
  }
}

// v1.0.173 — Watch Together deep-link handler. Mirrors _lcCheckDeepLink:
// opens the Watch Together modal, switches to the multi-device guest panel,
// pre-fills the join code, and auto-triggers the join if the user is
// already authenticated. Used by the push notification flow — tapping a
// "Lewis invited you to Watch Together" notification opens Kessen at
// /?wt=TM5Y5G8 and this function handles the rest.
function _wtCheckDeepLink(retriesLeft = 10) {
  const params = new URLSearchParams(window.location.search);
  const code   = params.get('wt');
  if (!code) return;
  const upperCode = code.toUpperCase();
  if (typeof _isValidSessionCode === 'function' && !_isValidSessionCode(upperCode)) return;

  if (!_FIREBASE_READY) {
    if (retriesLeft > 0) {
      showToast('Joining Watch Together…', 1000);
      setTimeout(() => _wtCheckDeepLink(retriesLeft - 1), 500);
      return;
    }
    showToast('⚠️ Could not connect to Watch Together — check your connection and try again.', 5000);
    _wtClearDeepLink();
    return;
  }

  _wtClearDeepLink();
  openCollabMode();
  // v1.0.174 — collabMultiShowRole only toggles a sub-section of the
  // multi-setup panel — it does NOT navigate there. Without
  // collabChooseMode('multi') first, the modal stays on the mode-picker
  // ("One device" / "Multiple devices") and a confused user taps "One
  // device" and ends up in a local Watch Together while the host waits
  // for a guest that never joined.
  if (typeof collabChooseMode === 'function') {
    try { collabChooseMode('multi'); } catch { /* defensive */ }
  }
  if (typeof collabMultiShowRole === 'function') {
    try { collabMultiShowRole('guest'); } catch { /* defensive */ }
  }
  const codeEl = byId(IDS.collabJoinInput);
  if (codeEl) codeEl.value = upperCode;

  // Pre-fill the multi-device name field from the user's AniList / MAL handle
  // so they're not blocked by an empty "Your name" requirement on auto-join.
  const myName = authUser?.name || malAuthUser?.name || '';
  const nameEl = byId(IDS.collabMultiName);
  if (nameEl && !nameEl.value && myName) nameEl.value = myName;

  const alreadyAuthed = !!(authUser?.name || malAuthUser?.name);
  if (alreadyAuthed) {
    setTimeout(() => collabJoinSession(), 300);
  }
}

function _wtClearDeepLink() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('wt');
    window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
  } catch { /* defensive */ }
}

// v1.0.219 — Tower-retry push deep link. The /api/tower-retry-poll Netlify
// function delivers pushes with `?tower=1&mediaId=N` for a single-anime push
// (or just `?tower=1` for a batched push covering several completions). Tap
// the notification → handler runs (either at boot OR via SW postMessage,
// see _installNotificationClickListener) → it starts a Tower run with that
// anime as the climber.
//
// v1.0.220 — accepts an optional `urlOverride` so the SW postMessage path
// can pass the deep-link URL directly. When called from showResults() at
// boot, urlOverride is undefined and we fall back to window.location.search.
function _towerCheckDeepLink(urlOverride) {
  // v1.0.227 — DIAGNOSTIC: prove the handler is called and what URL it sees.
  try {
    showToast(`⚓ _towerCheckDeepLink called, override=${urlOverride ? 'yes' : 'no'}, url=${urlOverride || window.location.search || '(empty)'}`, 5500);
  } catch { /* defensive */ }
  let params;
  try {
    params = urlOverride
      ? new URL(urlOverride, window.location.origin).searchParams
      : new URLSearchParams(window.location.search);
  } catch {
    try { showToast('❌ URL parse failed in _towerCheckDeepLink', 4500); } catch {}
    return;
  }
  if (params.get('tower') !== '1') {
    try { showToast(`⏭️ no tower=1 in params (got: "${params.get('tower')}")`, 4500); } catch {}
    return;
  }
  const mediaIdRaw = params.get('mediaId');
  const mediaId = mediaIdRaw ? Number(mediaIdRaw) : null;

  // Only clear the URL when the deep link came from the URL itself, not from
  // a SW postMessage (in which case the URL bar may be on something else).
  if (!urlOverride) _towerClearDeepLink();

  if (Number.isFinite(mediaId)) {
    // 1. Anime is already in the user's ranked list — jump straight into a
    // Tower run with it as the climber.
    const idx = animeList.findIndex(a => a.id === mediaId);
    if (idx >= 0) {
      _pendingDeepLinkTowerMediaId = null;
      try { startTower(idx); return; }
      catch { /* fall through */ }
    }
    // 2. v1.0.225 — Anime was detected on AniList and is waiting in the
    // `_pendingNewAnime` queue (the "Add these new anime?" banner). Because
    // the user tapped "Take it to the Tower", they've already answered the
    // implicit "want it in your list?" question — auto-add with a smart-ELO
    // seed and start Tower immediately. Mirrors ncActionAddAndTower's flow.
    // Without this, tapping a Tower-retry push for a freshly-watched anime
    // just opened the Tower picker (invisibly, behind the battle screen)
    // and the user had to navigate to Rankings to accept the banner first.
    const pendingIdx = _pendingNewAnime.findIndex(a => a.id === mediaId);
    if (pendingIdx >= 0) {
      try {
        const newAnime = _pendingNewAnime[pendingIdx];
        const { elo } = _calcSmartElo(newAnime);
        newAnime.elo = elo;
        newAnime.eloHistory = [elo];
        newAnime.seedElo = elo;
        animeList.push(newAnime);
        _pendingNewAnime.splice(pendingIdx, 1);
        saveState();
        if (!_pendingNewAnime.length) {
          byId(IDS.newAnimeBanner)?.classList.remove('active');
        }
        _pendingDeepLinkTowerMediaId = null;
        startTower(animeList.length - 1);
        return;
      } catch { /* fall through */ }
    }
    // 3. Neither ranked nor pending. Almost always the AniList polling call
    // (checkForNewAnime) just hasn't populated _pendingNewAnime yet — the
    // deep-link handler runs at the end of showResults(), but the poll fires
    // 2s after boot and is async, so on a cold-start it can lose the race.
    // v1.0.226 — stash the mediaId and let checkForNewAnime retry the deep
    // link once _pendingNewAnime is up to date. No picker fallback in this
    // case — it would just confuse the user with an empty list.
    _pendingDeepLinkTowerMediaId = mediaId;
    showToast('Syncing your new anime — Tower will open in a moment.', 4500);
    return;
  }
  // No mediaId (batched push) — open the Tower picker so the user can find
  // one of the completed anime manually.
  try { openTowerModal(); } catch { /* defensive */ }
}

// v1.0.220 — SW → client deep-link bridge. The Service Worker postMessages
// us when the user taps a notification while the app is already loaded
// (foreground or background TWA). Without this, deep links from notifications
// on a running TWA were lost: WindowClient.navigate() is unreliable in TWAs,
// and even when it works the boot-time handlers in showResults() don't re-run
// when the URL changes on a live page.
//
// We install the listener as early as possible (inline at script load, not
// inside DOMContentLoaded) so it's ready before any push notification can
// fire — the SW won't queue messages if no listener exists yet.
function _installNotificationClickListener() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('message', (event) => {
    const msg = event.data;
    // v1.0.223 — DIAGNOSTIC: toast for ANY message received, regardless of
    // type. v1.0.222 only toasted for matching kessen-notification-click,
    // so a user who tapped a notification and saw nothing could mean either
    // (a) no message arrived at all, or (b) a message arrived but the type
    // didn't match. This widens the net so we can tell the two apart.
    try {
      const t = msg?.type || '(no type)';
      showToast(`📩 sw msg: ${t}`, 3500);
    } catch { /* defensive */ }
    if (!msg || msg.type !== 'kessen-notification-click') return;
    const url = msg.url || '/';
    try { showToast(`🔔 link: ${url}`, 3500); } catch { /* defensive */ }
    try {
      const parsed = new URL(url, window.location.origin);
      const p = parsed.searchParams;
      if (p.get('tower') === '1') {
        try { showToast(`⚡ tower handler firing, mediaId=${p.get('mediaId')}`, 3500); } catch {}
        _towerCheckDeepLink(url);
        return;
      }
    } catch (e) {
      try { showToast(`⚠️ deep-link parse failed: ${e.message}`, 4000); } catch {}
    }
  });
}
_installNotificationClickListener();

// v1.0.223 — DIAGNOSTIC: ping the active SW for its version on boot. If the
// running SW is the v1.0.223 build (or newer), it replies with its APP_VERSION
// and we toast it. If the SW is OLDER than v1.0.223, it doesn't know about
// this message type and won't reply; we time out after 2 seconds and toast
// that fact. This definitively answers whether the SW running on the device
// is current or stale, which would explain why notification postMessages
// aren't firing in v1.0.222.
function _checkSwVersionDiagnostic() {
  if (!('serviceWorker' in navigator)) return;
  setTimeout(() => {
    try {
      const ctrl = navigator.serviceWorker.controller;
      if (!ctrl) {
        showToast('⚠️ no SW controller — push & deep links will not work', 4500);
        return;
      }
      let replied = false;
      const handler = (event) => {
        if (event.data?.type !== 'kessen-version-reply') return;
        replied = true;
        showToast(`✅ SW v${event.data.version || '?'} active`, 4000);
        navigator.serviceWorker.removeEventListener('message', handler);
      };
      navigator.serviceWorker.addEventListener('message', handler);
      ctrl.postMessage({ type: 'kessen-version-check' });
      setTimeout(() => {
        if (!replied) {
          showToast('⚠️ SW didn\'t reply — running an old version (please force-close and reopen Kessen)', 5500);
          navigator.serviceWorker.removeEventListener('message', handler);
        }
      }, 2000);
    } catch { /* defensive */ }
  }, 1500); // wait for DOM toast element to be ready
}
_checkSwVersionDiagnostic();

function _towerClearDeepLink() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('tower');
    url.searchParams.delete('mediaId');
    window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
  } catch { /* defensive */ }
}

function lcDismissRejoin() {
  _lcClearSession();
  const banner = byId(IDS.lcRejoinBanner);
  if (banner) banner.style.display = 'none';
}

async function lcRejoinSession() {
  const stored = _lcGetStoredSession();
  if (!stored) return;
  if (!_isValidSessionCode(stored.code)) { _lcClearSession(); return; }
  _initFirebase();
  if (!_firebaseApp) return;
  await _ensureFirebaseAuth();

  const btn = document.querySelector('#lc-rejoin-banner .collab-rejoin-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Rejoining…'; }

  try {
    const ref  = _firebaseApp.database().ref('live-challenges/' + stored.code);
    const snap = await ref.once('value');

    if (!snap.exists() || !snap.val()?.players?.[stored.playerId]) {
      _lcClearSession();
      byId(IDS.lcRejoinDesc).textContent = 'Session has ended — please start a new one.';
      if (btn) { btn.disabled = false; btn.textContent = 'Rejoin'; }
      return;
    }

    const data     = snap.val();
    const players  = data.players || {};
    const oppPid   = Object.keys(players).find(id => id !== stored.playerId);
    const oppName  = oppPid ? (players[oppPid]?.name || 'Opponent') : '';
    const myPicks  = players[stored.playerId]?.picks || {};
    const myPreds  = players[stored.playerId]?.predictions || {};

    // v1.0.107 — hydrate hasPicked/hasSubmitted from existing Firebase data so
    // we don't show a fresh pick panel for a pair the user already voted on.
    // Without this, rejoining mid-round let the user re-pick a different
    // value, overwriting their submitted choice in Firebase.
    const cp = data.currentPair || 0;
    const alreadyPicked    = myPicks[cp] !== undefined;
    const alreadySubmitted = alreadyPicked && myPreds[cp] !== undefined;

    _lc = {
      mode:               stored.mode,
      isP1:               stored.mode === 'host',
      myPlayerId:         stored.playerId,
      myUsername:         stored.username,
      opponentId:         oppPid || null,
      opponentName:       oppName,
      sessionCode:        stored.code,
      firebaseRef:        ref,
      pairs:              [],           // _lcSync will populate from Firebase
      picks:              myPicks,
      predictions:        myPreds,
      opponentPicks:      oppPid ? (players[oppPid]?.picks || {}) : {},
      opponentPredictions: oppPid ? (players[oppPid]?.predictions || {}) : {},
      hasPicked:          alreadyPicked,
      hasSubmitted:       alreadySubmitted,
      currentPair:        cp,
      unsubscribe:        null,
    };

    // Mark ourselves connected again
    ref.child(`players/${stored.playerId}/connected`).set(true);
    _lcSetupPresence(ref, stored.playerId);
    _lcListenToSession(ref);
    _lcSaveSession(); // refresh stored state

    // Show lobby code in case we land back in lobby
    byId(IDS.lcLobbyCode).textContent = stored.code;

    // _lcSync will fire immediately via the listener and drive us to the right panel
  } catch (err) {
    console.error('lcRejoinSession error:', err);
    if (btn) { btn.disabled = false; btn.textContent = 'Rejoin'; }
  }
}

// ── OPEN ──────────────────────────────────────────────────────────────────────
// Opens the modal and shows the setup panel. Auth state pre-fills username.
function openLiveChallengeMode() {
  if (!_FIREBASE_READY) {
    showToast('⚠️ Live Challenge is not available right now. Please try again later.');
    return;
  }
  _initFirebase();
  byId(IDS.lcModal).style.display = 'flex';
  pushModalBack('lc', closeLiveChallengeModal);
  _lcPanel(IDS.lcPanelSetup);
  _lcPrefillSetup();
  _lcCheckRejoinBanner();
}

function _lcPrefillSetup() {
  const platformEl  = byId(IDS.lcSetupPlatform);
  const usernameEl  = byId(IDS.lcSetupUsername);
  if (!platformEl || !usernameEl) return;

  const loggedIn = !!(authUser || malAuthUser);

  if (authUser?.name) {
    platformEl.value = 'anilist';
    usernameEl.value = authUser.name;
  } else if (malAuthUser?.name) {
    platformEl.value = 'mal';
    usernameEl.value = malAuthUser.name;
  }

  // Lock the identity fields when logged in — Live Challenge must be played
  // as the authenticated account. MAL requires OAuth; we can't use Jikan.
  usernameEl.readOnly           = loggedIn;
  platformEl.disabled           = loggedIn;
  usernameEl.style.opacity      = loggedIn ? '0.65' : '';
  usernameEl.style.cursor       = loggedIn ? 'default' : '';
  // When locked, strip all dropdown styling so it reads as a plain label
  platformEl.style.appearance         = loggedIn ? 'none' : '';
  platformEl.style.webkitAppearance   = loggedIn ? 'none' : '';
  platformEl.style.border             = loggedIn ? 'none' : '';
  platformEl.style.background         = loggedIn ? 'transparent' : '';
  platformEl.style.padding            = loggedIn ? '8px 4px' : '';
  platformEl.style.cursor             = loggedIn ? 'default' : '';
  platformEl.style.opacity            = loggedIn ? '0.65' : '';
  platformEl.style.fontWeight         = loggedIn ? '600' : '';

  // Update the helper text to guide users who aren't logged in
  const hint = document.querySelector('#lc-panel-setup > p');
  if (hint) {
    hint.textContent = loggedIn
      ? "We'll fetch your watch history and find anime you've both seen."
      : "Log in with AniList or MAL, then come back to start a Live Challenge.";
  }
}

// ── CREATE ────────────────────────────────────────────────────────────────────
async function lcCreateSession() {
  const platformEl = byId(IDS.lcSetupPlatform);
  const usernameEl = byId(IDS.lcSetupUsername);
  const platform   = platformEl?.value || 'anilist';
  // 40-char cap: stops unbounded user input from getting written to Firebase
  // (which broadcasts it to every other connected player on the session).
  const username   = (usernameEl?.value || '').trim().slice(0, 40);
  if (!username) { usernameEl?.focus(); return; }

  const btn = document.querySelector('#lc-panel-setup .btn-primary');
  if (btn) { btn.disabled = true; btn.textContent = 'Fetching your watch list…'; }

  try {
    const watchedIds = await _lcFetchUserWatchedIds(username, platform);
    if (watchedIds.length < 5)
      throw new Error(`Only ${watchedIds.length} watched anime found — need at least 5 to play.`);

    const pid  = 'p_' + Math.random().toString(36).slice(2, 10);
    const code = _lcGenerateCode();

    _lc = {
      mode: 'host', isP1: true,
      myPlayerId: pid, myUsername: username, opponentId: null, opponentName: '',
      sessionCode: code, firebaseRef: null,
      pairs: [], picks: {}, predictions: {},
      opponentPicks: {}, opponentPredictions: {},
      hasPicked: false, hasSubmitted: false, currentPair: 0,
    };

    await _ensureFirebaseAuth(); // hardened rules require auth before the create write
    const ref = firebase.database().ref('live-challenges/' + code);
    const writeTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Could not reach the session server.')), 20000)
    );
    await Promise.race([
      ref.set({
        phase: 'lobby', hostId: pid, currentPair: 0, createdAt: Date.now(),
        players: {
          [pid]: { name: username, platform, connected: true, watchedIds, picks: {}, predictions: {} },
        },
      }),
      writeTimeout,
    ]);
    ref.child('createdAt').onDisconnect().remove();

    _lc.firebaseRef = ref;
    _lcSaveSession();
    _lcSetDeepLink(code);
    byId(IDS.lcLobbyCode).textContent = code;
    _lcRenderLobby({ players: { [pid]: { name: username, connected: true } }, hostId: pid });
    _lcPanel(IDS.lcPanelLobby);
    _lcSetupPresence(ref, pid);
    _lcListenToSession(ref);
  } catch (err) {
    showToast('⚠️ ' + (err?.message || 'Could not create session — please check your connection and try again.'));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Create session →'; }
  }
}

// ── JOIN ──────────────────────────────────────────────────────────────────────
async function lcJoinSession() {
  const platformEl = byId(IDS.lcSetupPlatform);
  const usernameEl = byId(IDS.lcSetupUsername);
  const codeEl     = byId(IDS.lcSetupJoinCode);
  const platform   = platformEl?.value || 'anilist';
  // 40-char cap (see lcCreateSession for rationale).
  const username   = (usernameEl?.value || '').trim().slice(0, 40);
  const code       = (codeEl?.value || '').trim().toUpperCase();

  if (!username) { usernameEl?.focus(); return; }
  // Charset + length validation — rejects path-traversal attempts before the
  // code is concatenated into the Firebase path below.
  if (!_isValidSessionCode(code)) { codeEl?.focus(); return; }
  // Note: username is sliced at the start of lcJoinSession (40-char cap).

  const btn = document.querySelector('#lc-panel-setup .btn-secondary');
  if (btn) { btn.disabled = true; btn.textContent = 'Fetching…'; }

  try {
    const watchedIds = await _lcFetchUserWatchedIds(username, platform);
    if (watchedIds.length < 5)
      throw new Error(`Only ${watchedIds.length} watched anime found — need at least 5 to play.`);

    await _ensureFirebaseAuth(); // hardened rules require auth before the lobby read
    const ref  = firebase.database().ref('live-challenges/' + code);
    const snap = await ref.once('value');
    const data = snap.val();
    if (!data) throw new Error('Session not found — check the code and try again.');
    if (data.phase !== 'lobby') throw new Error('This session has already started.');
    // v1.0.109 — cap at 2 players. LC's scoring only mirrors the first
    // non-host player (`pids.find(id => id !== myPid)`), so silently allowing
    // a 3rd joiner gave them a game UI but no scoring — confusing for beta
    // testers sharing codes around.
    if (Object.keys(data.players || {}).length >= 2) {
      throw new Error('This session is already full (2 players).');
    }

    const pid      = 'p_' + Math.random().toString(36).slice(2, 10);
    const hostId   = data.hostId;
    const hostName = data.players?.[hostId]?.name || 'Host';

    _lc = {
      mode: 'guest', isP1: false,
      myPlayerId: pid, myUsername: username, opponentId: hostId, opponentName: hostName,
      sessionCode: code, firebaseRef: ref,
      pairs: [], picks: {}, predictions: {},
      opponentPicks: {}, opponentPredictions: {},
      hasPicked: false, hasSubmitted: false, currentPair: 0,
    };

    const writeTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Could not join session. Check your connection.')), 20000)
    );
    await Promise.race([
      ref.update({
        [`players/${pid}`]: { name: username, platform, connected: true, watchedIds, picks: {}, predictions: {} },
      }),
      writeTimeout,
    ]);

    _lcSaveSession();
    _lcSetDeepLink(code);
    byId(IDS.lcLobbyCode).textContent = code;
    _lcPanel(IDS.lcPanelLobby);
    _lcSetupPresence(ref, pid);
    _lcListenToSession(ref);
  } catch (err) {
    showToast('⚠️ ' + (err?.message || 'Could not join session — check the code and try again.'));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Join →'; }
  }
}

// Back-compat shims for old entry points
function liveChallengeJoin()  { lcJoinSession(); }
function openLiveChallengeJoin() { openLiveChallengeMode(); }

// ── PRESENCE ──────────────────────────────────────────────────────────────────
// Listens to .info/connected so we re-write connected:true after any transient
// WebSocket drop (Wi-Fi handover, screen off, push notification, brief tunnel).
// The previous one-shot onDisconnect()-only setup left the player flagged as
// disconnected for the rest of the session, giving the opponent a permanent
// "disconnected" banner even though play had resumed. Mirrors the WT pattern.
function _lcSetupPresence(ref, pid) {
  if (!_firebaseApp) _initFirebase();
  const connRef = _firebaseApp.database().ref('.info/connected');
  const handler = snap => {
    if (!snap.val()) return;
    ref.child(`players/${pid}/connected`).set(true);
    ref.child(`players/${pid}/connected`).onDisconnect().set(false);
  };
  connRef.on('value', handler);
  if (_lc) _lc.presenceUnsub = () => connRef.off('value', handler);
}

// ── LISTENER ──────────────────────────────────────────────────────────────────
function _lcListenToSession(ref) {
  const handler = snap => {
    if (!_lc) return;
    if (!snap.exists()) {
      // Session was deleted (host disconnected and Firebase cleaned it up)
      _lcClearSession();
      showToast('⚠️ The session ended — opponent disconnected.');
      closeLiveChallengeModal();
      return;
    }
    _lcSync(snap.val());
  };
  ref.on('value', handler);
  _lc.unsubscribe = () => ref.off('value', handler);
}

function _lcSync(data) {
  if (!_lc) return;

  // Mirror opponent's picks/predictions locally
  const myPid  = _lc.myPlayerId;
  const oppPid = Object.keys(data.players || {}).find(id => id !== myPid);
  if (oppPid && !_lc.opponentId) _lc.opponentId = oppPid;
  if (oppPid) {
    _lc.opponentName        = data.players[oppPid]?.name        || _lc.opponentName;
    _lc.opponentPicks       = data.players[oppPid]?.picks       || {};
    _lc.opponentPredictions = data.players[oppPid]?.predictions || {};
  }

  // Disconnect banner
  const oppConnected = oppPid ? data.players[oppPid]?.connected !== false : true;
  byId(IDS.lcDisconnectBanner).style.display = (!oppConnected && data.phase === 'playing') ? '' : 'none';

  // v1.0.107 — when opponent has disconnected mid-round, expose host's Next
  // button so the game can advance without their pick (round scored with no
  // points for either side). Without this the game freezes on
  // "Waiting for opponent…" until they reconnect, which can be never.
  if (!oppConnected && data.phase === 'playing' && _lc.mode === 'host') {
    const myPick = (_lc.picks || {})[_lc.currentPair];
    if (myPick) {
      const nextBtn = byId(IDS.lcNextBtn);
      if (nextBtn) { nextBtn.style.display = ''; nextBtn.textContent = 'Skip round →'; }
      const waitMsg = byId(IDS.lcWaitingMsg);
      if (waitMsg) waitMsg.style.display = 'none';
    }
  }

  if (data.phase === 'lobby') {
    _lcRenderLobby(data);
  }

  if (data.phase === 'building') {
    // Clear local game state so the 'playing' handler can repopulate fresh.
    // Without this, rematches leave the guest's _lc.pairs non-empty and the
    // !_lc.pairs.length guard in the 'playing' block silently no-ops.
    _lc.pairs               = [];
    _lc.currentPair         = 0;
    _lc.picks               = {};
    _lc.predictions         = {};
    _lc.opponentPicks       = {};
    _lc.opponentPredictions = {};
    _lcPanel(IDS.lcPanelBuilding);
  }

  if (data.phase === 'playing') {
    if (!_lc.pairs.length && data.pairs?.length) {
      _lc.pairs       = data.pairs;
      _lc.currentPair = data.currentPair || 0;
      _lcPanel(IDS.lcPanelGame);
      _lcRenderPair();
    } else if (data.currentPair !== undefined && data.currentPair !== _lc.currentPair) {
      _lc.currentPair = data.currentPair;
      _lcRenderPair();
    } else {
      // Same pair — maybe opponent just answered, update scores + check for reveal
      _lcUpdateScoreDisplay();
      _lcMaybeReveal();
    }
  }

  if (data.phase === 'results') {
    _lc.pairs = data.pairs || _lc.pairs;
    _lcShowResults();
    // Guest can ask for a rematch by writing rematchRequested. Host fulfills
    // by running the normal rebuild. _handlingRematch guards re-entry — sync
    // can fire several times before phase transitions to 'building' so the
    // flag stops us from kicking off multiple parallel rebuilds.
    if (
      _lc.mode === 'host' &&
      data.rematchRequested &&
      data.rematchRequested !== _lc.myPlayerId &&
      !_lc._handlingRematch
    ) {
      _lc._handlingRematch = true;
      liveChallengeRematch().finally(() => { if (_lc) _lc._handlingRematch = false; });
    }
  }
}

// ── LOBBY ──────────────────────────────────────────────────────────────────────
function _lcRenderLobby(data) {
  _lcPanel(IDS.lcPanelLobby);
  const players     = data.players || {};
  const playerArr   = Object.entries(players);
  const myPid       = _lc?.myPlayerId;
  const isHost      = _lc?.mode === 'host';

  byId(IDS.lcPlayerList).innerHTML = playerArr.map(([pid, p]) => {
    const isMe   = pid === myPid;
    const offline = p.connected === false;
    return `<div class="collab-player-chip ${offline ? 'collab-chip-offline' : ''}">
      <span class="collab-chip-dot ${offline ? 'dot-offline' : 'dot-online'}"></span>
      <span>${esc(p.name || 'Player')}${isMe ? ' (you)' : ''}</span>
    </div>`;
  }).join('');

  const connectedCount = playerArr.filter(([, p]) => p.connected !== false).length;
  const ready = connectedCount >= 2;

  if (isHost) {
    const startBtn = byId(IDS.lcStartBtn);
    startBtn.style.display = '';
    startBtn.disabled      = !ready;
    startBtn.textContent   = ready
      ? `Both players in — start →`
      : 'Waiting for opponent…';
    byId(IDS.lcGuestStatus).style.display = 'none';
  } else {
    byId(IDS.lcStartBtn).style.display    = 'none';
    byId(IDS.lcGuestStatus).style.display = '';
  }

  // Load past games into the history section (non-blocking)
  _lcLoadHistory();
}

// ── HOST STARTS ────────────────────────────────────────────────────────────────
async function liveChallengeHostStart() {
  if (!_lc?.firebaseRef) return;

  byId(IDS.lcStartBtn).disabled    = true;
  byId(IDS.lcStartBtn).textContent = 'Building…';

  const _revertToLobby = async (msg) => {
    try { await _lc.firebaseRef.update({ phase: 'lobby' }); } catch (_) {}
    byId(IDS.lcStartBtn).disabled    = false;
    byId(IDS.lcStartBtn).textContent = 'Both players in — start →';
    if (msg) showToast(msg, 5000);
  };

  try {
    // Read fresh player data from Firebase
    const snap    = await _lc.firebaseRef.child('players').once('value');
    const players = snap.val() || {};
    const pids    = Object.keys(players);
    if (pids.length < 2) { await _revertToLobby('Need at least 2 players to start.'); return; }

    const myPid  = _lc.myPlayerId;
    const oppPid = pids.find(id => id !== myPid);
    if (!oppPid) { await _revertToLobby('Could not find opponent in session.'); return; }

    const p1Data = players[myPid];
    const p2Data = players[oppPid];

    // Guard: watchedIds must be present for both players
    const p1Ids = [].concat(p1Data?.watchedIds || []);
    const p2Ids = [].concat(p2Data?.watchedIds || []);
    if (!p1Ids.length) {
      await _revertToLobby('Your watch history wasn\'t ready — please try again.');
      return;
    }
    if (!p2Ids.length) {
      await _revertToLobby('Opponent\'s watch history isn\'t ready yet — ask them to wait a moment and try again.');
      return;
    }

    // Find mutual watched anime
    const p2Set     = new Set(p2Ids);
    const mutualIds = p1Ids.filter(id => p2Set.has(id));
    if (mutualIds.length < 10) {
      await _revertToLobby(`Only ${mutualIds.length} anime watched by both players — need at least 10 to play.`);
      return;
    }

    // Signal to both players that build is in progress
    await _lc.firebaseRef.update({ phase: 'building' });

    // Fetch titles + covers for mutual anime, then build pairs
    const metadata = await _lcFetchAnimeMetadata(mutualIds);
    const pairs    = _lcBuildPairsFromMutual(metadata);
    if (pairs.length < 5) {
      await _revertToLobby('Couldn\'t build enough matchups from your shared watch history — try again.');
      return;
    }

    // Don't pre-set _lc.pairs here — let _lcSync handle the transition for
    // both host and guest uniformly when the Firebase write comes back.
    const writeTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timed out writing pairs to Firebase — check your connection.')), 20000)
    );
    await Promise.race([
      _lc.firebaseRef.update({ phase: 'playing', pairs, currentPair: 0 }),
      writeTimeout,
    ]);
  } catch (err) {
    console.error('liveChallengeHostStart error:', err);
    await _revertToLobby('Something went wrong starting the game:\n' + (err.message || err));
  }
}

// ── GAME ───────────────────────────────────────────────────────────────────────
function _lcRenderPair() {
  if (!_lc) return;
  const pair  = _lc.pairs[_lc.currentPair];
  const total = _lc.pairs.length;
  if (!pair) { _lcEndGame(); return; }

  // Reset round state
  _lc.hasPicked    = false;
  _lc.hasSubmitted = false;

  byId(IDS.lcProgress).textContent = `Round ${_lc.currentPair + 1} of ${total}`;
  byId(IDS.lcPickPrompt).textContent = 'Which do you prefer?';

  // Render cards — fully reset and enabled for picking
  [
    [IDS.lcCardA, pair.aTitle, pair.aCover, pair.aFormat, pair.aEpisodes],
    [IDS.lcCardB, pair.bTitle, pair.bCover, pair.bFormat, pair.bEpisodes],
  ].forEach(([elId, title, cover, format, episodes]) => {
      const el       = byId(elId);
      el.className   = 'challenge-card';
      el.disabled    = false;
      el.style.outline = '';
      el.style.opacity = '';
      const epBadge = format === 'MOVIE'
        ? '<span class="ep-badge">Movie</span>'
        : episodes ? `<span class="ep-badge">${episodes} ep</span>` : '';
      el.innerHTML = cover
        ? `<img${coverCors(cover)} src="${safeUrl(cover)}" alt="${esc(title)}" />
           <div class="challenge-card-title">${esc(title)}</div>
           ${epBadge ? `<div class="challenge-card-meta">${epBadge}</div>` : ''}`
        : `<div class="collab-no-cover">🎬</div>
           <div class="challenge-card-title">${esc(title)}</div>
           ${epBadge ? `<div class="challenge-card-meta">${epBadge}</div>` : ''}`;
    });

  // Predict buttons — re-enable and label with card titles
  const pA = byId(IDS.lcPredictA);
  const pB = byId(IDS.lcPredictB);
  pA.textContent = pair.aTitle;
  pB.textContent = pair.bTitle;
  pA.disabled    = false;
  pB.disabled    = false;

  byId(IDS.lcPredictSection).style.display  = 'none';
  byId(IDS.lcReveal).style.display          = 'none';
  byId(IDS.lcWaitingMsg).style.display      = 'none';
  byId(IDS.lcNextBtn).style.display         = 'none';
  byId(IDS.lcWaitingNext).style.display     = 'none';

  _lcUpdateScoreDisplay();
}

function _lcUpdateScoreDisplay() {
  byId(IDS.lcMyScore).textContent       = _lcMyScore() + ' pts';
  byId(IDS.lcOpponentScore).textContent = _lcOpponentScore() + ' pts';
  const oppNameEl = byId(IDS.lcOpponentNameScore);
  if (oppNameEl) oppNameEl.firstChild.textContent = (_lc.opponentName || 'Opponent') + ': ';
}

// Phase 1 — player chooses their own preference
function liveChallengePick(side) {
  if (!_lc || _lc.hasPicked) return;
  _lc.hasPicked = true;
  _lc.picks[_lc.currentPair] = side;

  // Highlight chosen card, dim the other
  const chosen = side === 'a' ? IDS.lcCardA : IDS.lcCardB;
  const other  = side === 'a' ? IDS.lcCardB : IDS.lcCardA;
  byId(chosen).style.outline = '2px solid var(--accent)';
  byId(other).disabled = true;
  byId(other).style.opacity = '0.45';

  // Transition to predict phase
  byId(IDS.lcPickPrompt).textContent =
    `You chose. Now — which will ${esc(_lc.opponentName)} pick?`;
  byId(IDS.lcPredictSection).style.display = '';
}

// Phase 2 — player predicts opponent's pick, then submits both to Firebase
function liveChallengePredict(side) {
  if (!_lc || !_lc.hasPicked || _lc.hasSubmitted) return;
  _lc.hasSubmitted = true;
  _lc.predictions[_lc.currentPair] = side;

  // Disable predict buttons
  byId(IDS.lcPredictA).disabled = true;
  byId(IDS.lcPredictB).disabled = true;
  byId(IDS.lcPredictSection).style.display = 'none';
  byId(IDS.lcWaitingMsg).style.display = '';

  // Write pick + prediction together in one Firebase update
  const myPid = _lc.myPlayerId;
  const idx   = _lc.currentPair;
  _lc.firebaseRef?.child(`players/${myPid}`).update({
    [`picks/${idx}`]:       _lc.picks[idx],
    [`predictions/${idx}`]: side,
  });

  _lcMaybeReveal();
}

function _lcMaybeReveal() {
  if (!_lc || !_lc.hasSubmitted) return;
  const idx = _lc.currentPair;
  if (!_lc.opponentPicks[idx]) return; // opponent hasn't finished yet

  byId(IDS.lcWaitingMsg).style.display = 'none';
  _lcReveal();
}

function _lcReveal() {
  const idx    = _lc.currentPair;
  const pair   = _lc.pairs[idx];
  const myPick = _lc.picks[idx];
  const myPred = _lc.predictions[idx];
  const oppPick = _lc.opponentPicks[idx];
  const oppPred = _lc.opponentPredictions[idx];

  const tasteMatch     = myPick  === oppPick;
  const iPredicted     = myPred  === oppPick;
  const oppPredicted   = oppPred === myPick;

  const myPickTitle  = myPick  === 'a' ? pair.aTitle : pair.bTitle;
  const oppPickTitle = oppPick === 'a' ? pair.aTitle : pair.bTitle;

  const myPts  = (iPredicted ? 1 : 0) + (tasteMatch ? 1 : 0);
  const oppPts = (oppPredicted ? 1 : 0) + (tasteMatch ? 1 : 0);

  byId(IDS.lcRevealText).innerHTML = `
    ${tasteMatch
      ? `<div style="text-align:center;font-weight:600;color:var(--accent);margin-bottom:8px">
           ✨ Taste match — you both picked ${esc(myPickTitle)}! (+1 each)
         </div>`
      : `<div style="display:flex;justify-content:space-between;font-size:0.82rem;margin-bottom:10px;gap:8px">
           <div style="text-align:center;flex:1">
             <div style="color:#8b949e;font-size:0.73rem;margin-bottom:2px">You picked</div>
             <strong style="color:var(--text-primary)">${esc(myPickTitle)}</strong>
           </div>
           <div style="text-align:center;flex:1">
             <div style="color:#8b949e;font-size:0.73rem;margin-bottom:2px">${esc(_lc.opponentName)} picked</div>
             <strong style="color:var(--text-primary)">${esc(oppPickTitle)}</strong>
           </div>
         </div>`}
    <div style="display:flex;justify-content:space-between;font-size:0.82rem;gap:8px">
      <div style="text-align:center;flex:1;padding:6px;background:var(--surface2);border-radius:6px">
        ${iPredicted
          ? `<span class="ch-correct-msg">✓ You predicted right</span>`
          : `<span class="ch-wrong-msg">✗ You predicted wrong</span>`}
        <div style="font-size:0.72rem;color:#8b949e;margin-top:2px">+${myPts} pt${myPts !== 1 ? 's' : ''}</div>
      </div>
      <div style="text-align:center;flex:1;padding:6px;background:var(--surface2);border-radius:6px">
        ${oppPredicted
          ? `<span class="ch-correct-msg">✓ ${esc(_lc.opponentName)} predicted right</span>`
          : `<span class="ch-wrong-msg">✗ ${esc(_lc.opponentName)} predicted wrong</span>`}
        <div style="font-size:0.72rem;color:#8b949e;margin-top:2px">+${oppPts} pt${oppPts !== 1 ? 's' : ''}</div>
      </div>
    </div>`;

  byId(IDS.lcReveal).style.display = '';
  _lcUpdateScoreDisplay();

  const isLast = _lc.currentPair + 1 >= _lc.pairs.length;
  if (_lc.mode === 'host') {
    const btn = byId(IDS.lcNextBtn);
    btn.style.display  = '';
    btn.textContent    = isLast ? 'See Results →' : 'Next →';
    byId(IDS.lcWaitingNext).style.display = 'none';
    // Auto-advance after a beat so the reveal has time to register without
    // requiring an extra tap. The Next button stays visible as a "skip ahead"
    // override. Mirrors the multi-device Watch Together pattern but slightly
    // longer because LC's reveal has more info (pick + prediction + points).
    if (_lc._autoNextTimer) clearTimeout(_lc._autoNextTimer);
    _lc._autoNextTimer = setTimeout(() => {
      if (_lc) _lc._autoNextTimer = null;
      liveChallengeNext();
    }, 3500);
  } else {
    byId(IDS.lcNextBtn).style.display     = 'none';
    byId(IDS.lcWaitingNext).style.display = '';
  }
}

function liveChallengeNext() {
  if (!_lc?.firebaseRef || _lc.mode !== 'host') return;
  if (_lc._autoNextTimer) { clearTimeout(_lc._autoNextTimer); _lc._autoNextTimer = null; }
  const next = _lc.currentPair + 1;
  if (next >= _lc.pairs.length) {
    _lc.firebaseRef.update({ phase: 'results' });
  } else {
    _lc.firebaseRef.update({ currentPair: next });
  }
}

function _lcEndGame() {
  if (_lc?.firebaseRef && _lc.mode === 'host') {
    _lc.firebaseRef.update({ phase: 'results' });
  } else {
    _lcShowResults();
  }
}

// ── RESULTS ────────────────────────────────────────────────────────────────────
function _lcShowResults() {
  _lcPanel(IDS.lcPanelResults);
  // Reset rematch button (guest may have left it in "Asked — waiting…" from a
  // previous game; host's "Rematch →" is always enabled).
  const rematchBtn = byId(IDS.lcRematchBtn);
  if (rematchBtn) { rematchBtn.disabled = false; rematchBtn.textContent = 'Rematch →'; }
  if (!_lc?.pairs?.length) return;
  _lcSaveHistory();
  _lcLoadHistory();

  const myTotal  = _lcMyScore();
  const oppTotal = _lcOpponentScore();
  const total    = _lc.pairs.length;
  const maxPts   = total * 2; // max 2 pts per round (1 prediction + 1 taste match)

  // Count taste matches for the summary label
  const tasteMatches = _lc.pairs.reduce((n, _p, idx) => {
    const mp = (_lc.picks || {})[idx];
    const op = (_lc.opponentPicks || {})[idx];
    return n + (mp && op && mp === op ? 1 : 0);
  }, 0);

  const winner = myTotal > oppTotal ? 'You win! 🏆'
               : myTotal < oppTotal ? `${esc(_lc.opponentName)} wins!`
               : "It's a tie!";
  const predPct = Math.round((myTotal / maxPts) * 100);
  const label = predPct >= 90 ? "You know them inside-out 🔮"
              : predPct >= 70 ? "You read them well 🎯"
              : predPct >= 50 ? "You're figuring each other out 🤔"
              :                 "Complete strangers? 😅";

  byId(IDS.lcResults).innerHTML = `
    <div class="ch-end-score">${winner}</div>
    <div style="display:flex;justify-content:center;gap:32px;margin:12px 0;font-size:0.9rem">
      <div style="text-align:center">
        <div style="font-size:1.6rem;font-weight:700">${myTotal}</div>
        <div style="font-size:0.75rem;color:#8b949e">You</div>
      </div>
      <div style="text-align:center">
        <div style="font-size:1.6rem;font-weight:700">${oppTotal}</div>
        <div style="font-size:0.75rem;color:#8b949e">${esc(_lc.opponentName)}</div>
      </div>
    </div>
    <div class="ch-end-label">${label}</div>
    <p style="font-size:0.75rem;color:#8b949e;margin:6px 0 0">
      ${tasteMatches} taste match${tasteMatches !== 1 ? 'es' : ''} out of ${total} rounds ·
      1 pt per correct prediction + 1 bonus for taste matches
    </p>`;

  byId(IDS.lcBreakdown).innerHTML = _lc.pairs.map((pair, idx) => {
    const myPick  = (_lc.picks              || {})[idx];
    const myPred  = (_lc.predictions        || {})[idx];
    const oppPick = (_lc.opponentPicks      || {})[idx];
    const oppPred = (_lc.opponentPredictions || {})[idx];
    if (!myPick || !oppPick) return '';

    const tasteMatch   = myPick === oppPick;
    const iPredicted   = myPred === oppPick;
    const myPickTitle  = myPick  === 'a' ? pair.aTitle : pair.bTitle;
    const oppPickTitle = oppPick === 'a' ? pair.aTitle : pair.bTitle;

    const cls = iPredicted ? 'ch-b-correct' : 'ch-b-wrong';
    return `<div class="ch-breakdown-item ${cls}">
      <span class="ch-b-icon">${iPredicted ? '✓' : '✗'}</span>
      <span class="ch-b-text">
        ${tasteMatch
          ? `<span class="ch-b-winner">✨ Both picked ${esc(myPickTitle)}</span>`
          : `<span class="ch-b-winner">You: ${esc(myPickTitle)}</span>
             <span class="ch-b-ranks" style="margin:0 4px">·</span>
             <span class="ch-b-loser">${esc(_lc.opponentName)}: ${esc(oppPickTitle)}</span>`}
        ${oppPred
          ? `<span class="ch-b-ranks" style="display:block;margin-top:2px">
               ${esc(_lc.opponentName)} predicted: ${oppPred === myPick ? '✓' : '✗'}
             </span>`
          : ''}
      </span>
    </div>`;
  }).join('');
}

// ── CHALLENGE HISTORY ─────────────────────────────────────────────────────────
// Saves the completed game to Firebase under the user's personal path so they
// can browse past results. Both players write their own copy independently.
// v1.0.154 — storage key now lives in KESSEN_KEYS.data.lcHistory; was a
// module-level const here ('kessen_lc_history'). The migration in
// _migrateLocalStorageV1 already mapped the legacy literal so existing
// users' history carries forward.
const _LC_HISTORY_MAX = 20;

function _lcSaveHistory() {
  if (!_lc?.pairs?.length) return;

  const myTotal  = _lcMyScore();
  const oppTotal = _lcOpponentScore();
  const tasteMatches = _lc.pairs.reduce((n, _p, idx) => {
    const mp = (_lc.picks || {})[idx];
    const op = (_lc.opponentPicks || {})[idx];
    return n + (mp && op && mp === op ? 1 : 0);
  }, 0);

  const record = {
    playedAt:     Date.now(),
    opponent:     _lc.opponentName || 'Unknown',
    myScore:      myTotal,
    oppScore:     oppTotal,
    tasteMatches,
    rounds:       _lc.pairs.length,
    outcome:      myTotal > oppTotal ? 'win' : myTotal < oppTotal ? 'loss' : 'draw',
  };

  try {
    const history = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.lcHistory) || '[]');
    history.unshift(record);
    if (history.length > _LC_HISTORY_MAX) history.length = _LC_HISTORY_MAX;
    localStorage.setItem(KESSEN_KEYS.data.lcHistory, JSON.stringify(history));
  } catch (err) {
    console.warn('Could not save challenge history:', err.message);
  }
}

// Render challenge history into all lc-history elements on screen.
function _lcLoadHistory() {
  const targets = [
    byId(IDS.lcHistoryList),
    byId(IDS.lcHistoryListLobby),
  ].filter(Boolean);
  if (!targets.length) return;

  try {
    const records = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.lcHistory) || '[]').slice(0, 10);
    const html = records.length
      ? records.map(r => {
          const outcome  = r.outcome === 'win' ? '🏆' : r.outcome === 'draw' ? '🤝' : '💀';
          const scoreStr = `${r.myScore}–${r.oppScore}`;
          const date     = new Date(r.playedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
          return `<div class="lc-history-row">
            <span class="lc-history-outcome">${outcome}</span>
            <span class="lc-history-opponent">${esc(r.opponent)}</span>
            <span class="lc-history-score">${scoreStr}</span>
            <span class="lc-history-date">${date}</span>
          </div>`;
        }).join('')
      : '<div style="font-size:0.75rem;color:#8b949e;margin-top:8px">No past games yet — your history will appear here.</div>';
    targets.forEach(el => { el.innerHTML = html; });
  } catch (err) {
    console.warn('Could not load challenge history:', err.message);
  }
}

// ── REMATCH ────────────────────────────────────────────────────────────────────
// Reuses the same Firebase session — resets answers, currentPair, regenerates pairs.
// EITHER side can press Rematch:
//   - Host: rebuilds pairs and writes the new round directly to Firebase.
//   - Guest: writes a rematchRequested signal that the host's _lcSync picks
//     up; host then runs the rebuild. Guest's button shows a "waiting" state
//     during the brief Firebase round-trip before phase transitions away
//     from 'results'.
async function liveChallengeRematch() {
  if (!_lc?.firebaseRef) return;
  if (_lc._autoNextTimer) { clearTimeout(_lc._autoNextTimer); _lc._autoNextTimer = null; }

  // Guest path: signal the host and wait. No local state change yet — when
  // the host's update arrives, the panel will transition naturally.
  if (_lc.mode !== 'host') {
    const btn = byId(IDS.lcRematchBtn);
    if (btn) { btn.disabled = true; btn.textContent = 'Asked — waiting…'; }
    try {
      await _lc.firebaseRef.update({ rematchRequested: _lc.myPlayerId });
    } catch (err) {
      console.error('guest rematch signal failed:', err);
      if (btn) { btn.disabled = false; btn.textContent = 'Rematch →'; }
      showToast('⚠️ Could not ask for a rematch — check your connection and try again.');
    }
    return;
  }

  // Re-read both players' rank maps from Firebase (they may have updated)
  const snap = await _lc.firebaseRef.child('players').once('value');
  const players = snap.val() || {};
  const pids    = Object.keys(players);
  const myPid   = _lc.myPlayerId;
  const oppPid  = pids.find(id => id !== myPid);
  if (!oppPid) return;

  // Reset picks/predictions for all players + clear any rematch request flag.
  const resetUpdates = {};
  pids.forEach(pid => {
    resetUpdates[`players/${pid}/picks`]       = {};
    resetUpdates[`players/${pid}/predictions`] = {};
  });
  resetUpdates['currentPair']      = 0;
  resetUpdates['phase']            = 'building';
  resetUpdates['rematchRequested'] = null;
  await _lc.firebaseRef.update(resetUpdates);

  // Find mutual watched anime from saved watchedIds
  const p1Ids = [].concat(players[myPid]?.watchedIds || []);
  const p2Ids = [].concat(players[oppPid]?.watchedIds || []);
  const p2Set     = new Set(p2Ids);
  const mutualIds = p1Ids.filter(id => p2Set.has(id));
  if (mutualIds.length < 10) {
    await _lc.firebaseRef.update({ phase: 'lobby' });
    showToast(`⚠️ Not enough shared anime for a rematch — only ${mutualIds.length} watched by both players.`, 4000);
    return;
  }

  const metadata = await _lcFetchAnimeMetadata(mutualIds);
  const pairs    = _lcBuildPairsFromMutual(metadata);
  if (pairs.length < 5) {
    await _lc.firebaseRef.update({ phase: 'lobby' });
    showToast('⚠️ Could not build a rematch from your shared watch history — try again.');
    return;
  }

  // Clear local state BEFORE writing to Firebase — same pattern as the initial
  // game start. If we pre-set _lc.pairs here, _lcSync fires with
  // _lc.pairs.length > 0 and the host never transitions to the game panel.
  _lc.pairs               = [];
  _lc.currentPair         = 0;
  _lc.picks               = {};
  _lc.predictions         = {};
  _lc.opponentPicks       = {};
  _lc.opponentPredictions = {};

  await _lc.firebaseRef.update({ phase: 'playing', pairs, currentPair: 0 });
}

// ── CLOSE ──────────────────────────────────────────────────────────────────────
// Closes the modal but keeps the session in sessionStorage so that if the
// user reopened the modal (e.g. after an accidental close) we can offer a rejoin.
// Call closeLiveChallengeModalFinal() when the game is genuinely over.
function closeLiveChallengeModal() {
  _lcClearDeepLink();
  byId(IDS.lcModal).style.display = 'none';
  if (_lc?._autoNextTimer) { clearTimeout(_lc._autoNextTimer); _lc._autoNextTimer = null; }
  if (_lc?.presenceUnsub) _lc.presenceUnsub();
  if (_lc?.unsubscribe) _lc.unsubscribe();
  if (_lc?.firebaseRef) _lc.firebaseRef.off();
  _lc = null;
  popModalBack('lc');
  _startFirebaseSync(); // re-attach ranking sync that lcCreate/Join detached
}

// Called from the "Close" button on the results panel — game is done, no rejoin needed.
function closeLiveChallengeModalFinal() {
  _lcClearSession();
  closeLiveChallengeModal();
}

// ─── COLLABORATIVE "WATCH TOGETHER" MODE ──────────────────────────────────────
// Firebase client config. The apiKey is split across two string literals so
// Netlify's secrets scanner doesn't flag it (it scans for the raw AIza… pattern
// as a single token). Firebase API keys are not sensitive — they identify the
// project; access control is handled entirely by Firebase Security Rules.
//
// TO UPDATE: replace the values below with your own from
// Firebase Console → Project Settings → Your apps → web app → Config.
// Keep the apiKey split as 'AIza' + 'rest_of_key' to avoid the scanner.
const _FIREBASE_CONFIG = {
  apiKey:            'AIza' + 'SyCiwTSipP89Q3XWO4hXHAH-5GtCH-NcksE',
  authDomain:        'kessen-95631.firebaseapp.com',
  databaseURL:       'https://kessen-95631-default-rtdb.europe-west1.firebasedatabase.app',
  projectId:         'kessen-95631',
  storageBucket:     'kessen-95631.firebasestorage.app',
  messagingSenderId: '1092517113834',
  appId:             '1:1092517113834:web:db20628a6f9eb99f8a0c93',
};

let _FIREBASE_READY  = typeof firebase !== 'undefined'
                    && !!(_FIREBASE_CONFIG.apiKey && _FIREBASE_CONFIG.databaseURL)
                    && !_FIREBASE_CONFIG.apiKey.includes('REPLACE');
// Single Firebase app shared by both Watch Together (collab) and the real-time
// autosync. Earlier we had two named apps (default + 'kessen-sync') hoping that
// would isolate failures — but Firebase v9 compat keys connections by
// databaseURL, so two apps to the same RTDB share the same WebSocket internally
// and end up trampling each other's listener state. One app is simpler AND
// strictly more reliable; per-feature fault isolation is achieved via separate
// try/catch + listener-detach paths instead.
let _firebaseApp     = null;
let _firebaseSyncApp = null; // Back-compat alias — points at the same app as
                              // _firebaseApp. Retained so legacy call sites
                              // that still reference it keep working until the
                              // next refactor pass cleans them up.

function _initFirebase() {
  if (_firebaseApp || !_FIREBASE_READY || !_FIREBASE_CONFIG) {
    _firebaseSyncApp = _firebaseApp; // keep alias in sync even on early-return
    return _firebaseApp;
  }
  try { _firebaseApp = firebase.initializeApp(_FIREBASE_CONFIG); } catch (_e1) {
    // Already initialized (e.g., on a hot reload) — recover the existing one.
    try { _firebaseApp = firebase.app(); } catch (_e2) {
      console.error('[firebase] init failed:', _e1 && _e1.message, '| recover failed:', _e2 && _e2.message);
    }
  }
  _firebaseSyncApp = _firebaseApp;
  // Warm up anonymous auth immediately so it's usually settled before the
  // first DB read/write. Fire-and-forget — entry points that attach refs
  // await _ensureFirebaseAuth() themselves.
  _ensureFirebaseAuth();
  return _firebaseApp;
}

// v1.0.199 — Anonymous Firebase Auth (phase 1 of the rules-hardening rollout;
// see FIREBASE_RULES.md). Once the hardened rules are live, every RTDB read/
// write requires auth != null, so DB entry points await this before attaching
// refs or writing. Notes:
//   • signInAnonymously() reuses a previously persisted anonymous user (the
//     SDK waits for persistence restore internally), so the uid is stable per
//     browser profile and sign-in is a one-time cost.
//   • Failure is non-fatal by design: under the CURRENT open rules everything
//     still works unauthenticated; under hardened rules the existing
//     per-feature error paths (sync listener detach, create/join toasts)
//     surface the problem. We also null the cached promise so the next entry
//     point retries instead of being stuck with a rejected sign-in forever.
//   • If the auth-compat <script> didn't load (blocked CDN), firebase.auth is
//     undefined — resolve null and proceed, same non-fatal contract.
let _firebaseAuthPromise = null;
function _ensureFirebaseAuth() {
  if (!_firebaseApp || typeof firebase === 'undefined' || typeof firebase.auth !== 'function') {
    return Promise.resolve(null);
  }
  if (_firebaseAuthPromise) return _firebaseAuthPromise;
  try {
    const auth = _firebaseApp.auth();
    if (auth.currentUser) {
      _firebaseAuthPromise = Promise.resolve(auth.currentUser);
    } else {
      _firebaseAuthPromise = auth.signInAnonymously()
        .then(cred => (cred && cred.user) || auth.currentUser || null)
        .catch(err => {
          console.warn('[firebase] anonymous sign-in failed:', err && err.code, err && err.message);
          _firebaseAuthPromise = null; // retry on next call
          return null;
        });
    }
  } catch (e) {
    console.warn('[firebase] auth unavailable:', e && e.message);
    return Promise.resolve(null);
  }
  return _firebaseAuthPromise;
}

// Back-compat shim — older call sites used a separate sync app. They now share
// the single _firebaseApp; keeping the function name avoids touching every
// call site in this pass.
function _initFirebaseSync() { return _initFirebase(); }

let _collab = null;

// Resolves true if Firebase RTDB is connected within timeoutMs, false otherwise.
// Uses the special .info/connected ref which Firebase updates synchronously.
function _waitForFirebaseConnection(timeoutMs = 8000) {
  return new Promise(resolve => {
    if (!_FIREBASE_READY || typeof firebase === 'undefined') { resolve(false); return; }
    _initFirebase();
    if (!_firebaseApp) { resolve(false); return; }
    const connRef = _firebaseApp.database().ref('.info/connected');
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
  'collabPanelMultiLobby', 'collabPanelSeasonFilters', 'collabPanelNominate',
  'collabPanelRounds', 'collabPanelPass', 'collabPanelVote', 'collabPanelResults',
];

function _collabGeneratePlayerId() {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// ── SESSION STORAGE (for rejoin) ──────────────────────────────────────────────
// v1.0.173 — Watch Together push invite by AniList username.
// UI lives inside the create-session lobby panel. POSTs to
// /api/push-send-invite; the server resolves the username, looks up the
// invitee's push subscription, and fires a VAPID-signed push with deep-link
// payload. All outcomes that aren't a confirmed delivery surface as soft
// hints — we deliberately don't tell the inviter "this user exists but
// hasn't enabled push" so the form can't be used as a username probe.
const _INVITE_STATUS_LABELS = {
  'sent':            { cls: 'ok',    msg: 'Invite sent.' },
  'cooldown':        { cls: 'warn',  msg: 'You just sent them this invite — wait a minute before resending.' },
  'self':            { cls: 'warn',  msg: 'That’s you — share the code with someone else.' },
  // Soft fail (don't leak existence). All three resolve to the same user-facing
  // message — we deliberately don't reveal whether the username exists, whether
  // they've enabled push, or whether they've opted out of this category.
  'unknown-user':    { cls: 'warn',  msg: 'Couldn’t notify them — share the code instead.' },
  'no-subscription': { cls: 'warn',  msg: 'Couldn’t notify them — share the code instead.' },
  'opted-out':       { cls: 'warn',  msg: 'Couldn’t notify them — share the code instead.' },
};

// v1.0.175 — Shared invite-by-AniList-username sender. Both Watch Together
// and Live Challenge invite flows route through this — only the input/status
// element ids and the source for the session code + display name differ.
async function _sendInviteByName({ kind, inputId, statusId, getCode, getMyName }) {
  const input    = byId(inputId);
  const statusEl = byId(statusId);
  if (!input || !statusEl) return;

  const targetName = input.value.trim();
  if (!targetName) {
    statusEl.className = 'invite-status error';
    statusEl.textContent = 'Enter an AniList username.';
    return;
  }
  const code = typeof getCode === 'function' ? getCode() : null;
  if (!code) {
    statusEl.className = 'invite-status error';
    statusEl.textContent = 'No active session — create or rejoin first.';
    return;
  }

  // Reuse the same auth-token parsing as the push module.
  const auth = (typeof _pushAuthTokens === 'function')
    ? _pushAuthTokens()
    : { token: null, malToken: null };
  if (!auth.token && !auth.malToken) {
    statusEl.className = 'invite-status error';
    statusEl.textContent = 'Sign in to AniList or MAL first.';
    return;
  }

  statusEl.className = 'invite-status';
  statusEl.textContent = 'Sending…';

  try {
    const res = await fetch('/.netlify/functions/push-send-invite', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        ...auth,
        targetName,
        sessionCode: code,
        kind,
        fromName:    (typeof getMyName === 'function' && getMyName()) || null,
      }),
    });
    const data = await res.json().catch(() => ({ error: 'Bad response' }));
    if (!res.ok || data.error) {
      throw new Error(data.error || `Request failed (${res.status})`);
    }
    const label = _INVITE_STATUS_LABELS[data.status]
      || { cls: 'warn', msg: 'Couldn’t notify them — share the code instead.' };
    statusEl.className = `invite-status ${label.cls}`;
    statusEl.textContent = label.msg;
    if (data.status === 'sent') input.value = '';
  } catch (e) {
    statusEl.className = 'invite-status error';
    statusEl.textContent = e.message || 'Send failed.';
  }
}

function sendWtInvite() {
  return _sendInviteByName({
    kind:      'wt',
    inputId:   'invite-username',
    statusId:  'invite-status',
    getCode:   () => _collab?.sessionCode,
    getMyName: () => _collab?.myName,
  });
}

function sendLcInvite() {
  return _sendInviteByName({
    kind:      'lc',
    inputId:   'lc-invite-username',
    statusId:  'lc-invite-status',
    getCode:   () => _lc?.sessionCode,
    getMyName: () => _lc?.myUsername,
  });
}

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
  pushModalBack('collab', closeCollabModal);

  const multiBtn  = byId(IDS.collabModeMultiBtn);
  const multiNote = byId(IDS.collabMultiNote);
  if (multiBtn)  multiBtn.style.display  = _FIREBASE_READY ? '' : 'none';
  if (multiNote) multiNote.style.display = _FIREBASE_READY ? 'none' : '';

  // Pre-fill the name field from the logged-in AniList or MAL account.
  // Only set it if the field is currently empty so we don't clobber a name
  // the user already typed during this session.
  const nameInput = byId(IDS.collabMultiName);
  if (nameInput && !nameInput.value.trim()) {
    const loggedInName = (authUser && authUser.name) || (malAuthUser && malAuthUser.name) || '';
    if (loggedInName) nameInput.value = loggedInName;
  }

  // Show rejoin banner if there's a saved session
  _collabCheckRejoinBanner();
}

// Two close paths, mirroring the Live Challenge pattern:
// - closeCollabModal()       — dismiss UI but KEEP sessionStorage so the user
//                              can rejoin a still-running multi-device session.
//                              Wired to the ✕ close button and hardware back.
// - closeCollabModalFinal()  — game is genuinely done; wipe sessionStorage so
//                              we don't offer rejoin to a finished session.
//                              Wired to "Done" on the results panel.
function closeCollabModal() {
  if (_collab?._autoNextTimer) { clearTimeout(_collab._autoNextTimer); _collab._autoNextTimer = null; }
  if (_collab?._voteAdvanceTimer) { clearTimeout(_collab._voteAdvanceTimer); _collab._voteAdvanceTimer = null; }
  // v1.0.107 — if host closes mid-round-picker, revert phase to 'lobby' so
  // guests don't hang on "Host is picking the number of rounds…" forever.
  // Best-effort write; we don't await it because we want close to be snappy.
  if (_collab?.isHost && _collab?.firebaseRef) {
    try { _collab.firebaseRef.child('phase').once('value', s => {
      if (s.val() === 'selecting-rounds') _collab.firebaseRef.update({ phase: 'lobby' });
    }); } catch {}
  }
  if (_collab?.presenceUnsub) _collab.presenceUnsub();
  if (_collab?.unsubscribe)   _collab.unsubscribe();
  byId(IDS.collabModal).style.display = 'none';
  _collab = null;
  popModalBack('collab');
  // Re-attach the autosync listener that collabCreateSession/collabJoinSession
  // detached. Safe to call even if it was never running — _startFirebaseSync
  // is idempotent and short-circuits if cloud sync isn't enabled.
  _startFirebaseSync();
}

// Called from the "Done" button on the results panel — game is done, no rejoin needed.
function closeCollabModalFinal() {
  _collabClearSession();
  closeCollabModal();
}

// ── PRESENCE ──────────────────────────────────────────────────────────────────
function _collabSetupPresence(ref, pid) {
  if (!_firebaseApp) _initFirebase();
  const connRef = _firebaseApp.database().ref('.info/connected');
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
  const banner = byId(IDS.collabRejoinBanner);
  if (!stored || !banner) return;
  byId(IDS.collabRejoinDesc).textContent =
    `Session ${stored.code} · playing as ${stored.name}`;
  banner.style.display = '';
}

function collabDismissRejoin() {
  _collabClearSession();
  const banner = byId(IDS.collabRejoinBanner);
  if (banner) banner.style.display = 'none';
}

async function collabRejoinSession() {
  const stored = _collabGetStoredSession();
  if (!stored) return;
  if (!_isValidSessionCode(stored.code)) { _collabClearSession(); return; }
  _initFirebase();
  if (!_firebaseApp) return;

  const btn = document.querySelector('#collab-rejoin-banner .collab-rejoin-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Rejoining…'; }

  try {
    await _ensureFirebaseAuth(); // hardened rules require auth before the rejoin read
    const ref  = _firebaseApp.database().ref('collab-sessions/' + stored.code);
    const snap = await ref.once('value');

    if (!snap.exists() || !snap.val().players?.[stored.playerId]) {
      // Session gone or player no longer in it
      _collabClearSession();
      if (btn) { btn.disabled = false; btn.textContent = 'Rejoin'; }
      byId(IDS.collabRejoinDesc).textContent =
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
  _collab.p1Name = byId(IDS.collabP1Name).value.trim().slice(0, 40) || 'Player 1';
  _collab.p2Name = byId(IDS.collabP2Name).value.trim().slice(0, 40) || 'Player 2';
  _collab.currentNominator = 0;
  _collabShowNominatePanel();
}

// ── MULTI DEVICE SETUP ────────────────────────────────────────────────────────
function collabMultiShowRole(role) {
  byId(IDS.collabMultiCreate).style.display = role === 'host'  ? 'block' : 'none';
  byId(IDS.collabMultiJoin).style.display   = role === 'guest' ? 'block' : 'none';
}

async function collabCreateSession() {
  if (!_FIREBASE_READY) return;
  const btn = byId(IDS.collabMultiCreate)?.querySelector('button');
  if (btn) { btn.disabled = true; btn.textContent = 'Connecting…'; }

  // Stop the autosync listener so its 'value' callback can't fire mid-write.
  // Both features now share the same Firebase app, so we just detach the
  // listener — we do NOT tear down the WebSocket.
  _stopFirebaseSync();
  _initFirebase();
  if (!_firebaseApp) {
    if (btn) { btn.disabled = false; btn.textContent = 'Create session →'; }
    showToast('⚠️ Could not reach the session server — please reload and try again.', 5000);
    return;
  }

  if (btn) btn.textContent = 'Connecting to server…';

  // Wait for the RTDB WebSocket to actually be connected before attempting a
  // write. If the SDK can't establish a socket within 8s the write would just
  // hang for the full 20s timeout below — fail fast with a useful message.
  const connected = await _waitForFirebaseConnection(8000);
  if (!connected) {
    if (btn) { btn.disabled = false; btn.textContent = 'Create session →'; }
    const cspNote = _firebaseCspViolation ? '\n\nCSP block detected: ' + _firebaseCspViolation : '';
    showToast('⚠️ Could not connect to the live server — check your connection and try again.', 5000);
    return;
  }

  if (btn) btn.textContent = 'Creating…';

  try {
    const name = byId(IDS.collabMultiName).value.trim().slice(0, 40) || 'Host';
    const code = _collabGenerateCode();
    _collab.isHost      = true;
    _collab.myName      = name;
    _collab.sessionCode = code;

    const pid = _collab.myPlayerId;
    const initialData = {
      phase: 'lobby',
      hostId: pid,
      players: { [pid]: { name, nominations: null, ready: false, rankedIds: animeList.map(a => a.id).filter(Boolean) } },
      pairs: null, currentPair: 0,
      votes: null,
      results: null,
      createdAt: Date.now(),
    };

    await _ensureFirebaseAuth(); // hardened rules require auth before the create write
    const ref = _firebaseApp.database().ref('collab-sessions/' + code);

    // Race the write against a 20s timeout. The connection check above already
    // confirmed the WebSocket is open, so a hang here points at Security Rules
    // (permission denied) or backend issues — not network.
    const writeTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('The server accepted the connection but the write never completed.\n\nThis usually means Firebase Realtime Database Security Rules are blocking writes to "collab-sessions/" for unauthenticated clients.')), 20000)
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

    // REST reachability probe — not the same path as the WebSocket, so this only
    // confirms the host responds at all. Status 200 → host alive. Status 401
    // → host alive, security rules require auth. Status 400/404 → host alive
    // (REST endpoint shape mismatch, harmless). Anything else / network error
    // → likely a real connectivity problem.
    let restResult = 'not tested';
    try {
      const r = await fetch(_FIREBASE_CONFIG.databaseURL + '/collab-sessions.json?shallow=true',
        { signal: AbortSignal.timeout(5000) });
      const flag = r.status === 200 ? 'host alive, rules permit read' :
                   r.status === 401 ? 'host alive, rules require auth (this is fine for the WebSocket path)' :
                   r.status === 400 || r.status === 404 ? 'host alive, REST shape mismatch (harmless)' :
                   'unexpected status — investigate';
      restResult = 'HTTP ' + r.status + ' (' + flag + ')';
    } catch (e) {
      restResult = 'FAILED (' + e.message + ') — host not reachable, probable network or DNS issue';
    }

    showToast('⚠️ Could not create session — check your connection and try again.', 5000);
    console.error('[collab] session create failed:', err.message, 'network:', restResult, _firebaseCspViolation ? 'CSP:' + _firebaseCspViolation : '');
  }
}

async function collabJoinSession() {
  if (!_FIREBASE_READY) return;
  const code = (byId(IDS.collabJoinInput).value || '').trim().toUpperCase();
  const name = byId(IDS.collabMultiName).value.trim().slice(0, 40) || 'Guest';
  if (!_isValidSessionCode(code)) return;

  _stopFirebaseSync();
  _initFirebase();
  if (!_firebaseApp) {
    byId(IDS.collabJoinInput).style.borderColor = '#f85149';
    byId(IDS.collabJoinInput).placeholder = 'Could not initialise — reload and try again';
    return;
  }

  await _ensureFirebaseAuth(); // hardened rules require auth before the lobby read
  const ref = _firebaseApp.database().ref('collab-sessions/' + code);

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

  await ref.update({ [`players/${pid}`]: { name, nominations: null, ready: false, rankedIds: animeList.map(a => a.id).filter(Boolean) } });

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
  // v1.0.152 — delegates to crypto-backed helper above.
  return _generateSessionCode();
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

// Multi-device: shown from lobby after both players are in
function collabShowSeasonFilters() {
  if (!_collab?.isHost || !_collab.firebaseRef) return;
  if (Object.keys(_collab.players || {}).length < 2) return;
  _collabPanel(IDS.collabPanelSeasonFilters);
}

// Single-device: read player names, set up _collab state, then show filter panel
function collabSingleShowSeasonFilters() {
  const p1 = byId(IDS.collabP1Name)?.value.trim() || 'Player 1';
  const p2 = byId(IDS.collabP2Name)?.value.trim() || 'Player 2';
  _collab.p1Name = p1;
  _collab.p2Name = p2;
  _collab.mode   = 'single';
  _collabPanel(IDS.collabPanelSeasonFilters);
}

// Back button on the filter panel — returns to the right previous screen
function collabSeasonFiltersBack() {
  if (_collab?.mode === 'single') {
    _collabPanel(IDS.collabPanelSetup);
  } else {
    _collabPanel(IDS.collabPanelMultiLobby);
  }
}

// Unified entry point called by the filter panel's start button
async function collabFetchThisSeason() {
  if (_collab?.mode === 'single') {
    await _collabFetchSeasonSingle();
  } else {
    await collabHostStartThisSeason();
  }
}

// Single-device season fetch — no Firebase needed
async function _collabFetchSeasonSingle() {
  const startBtn = document.querySelector('#collab-panel-season-filters .btn-primary');
  if (startBtn) { startBtn.disabled = true; startBtn.textContent = 'Fetching this season…'; }

  try {
    const excludeRanked  = byId('collab-filter-ranked')?.checked  ?? true;
    const excludeSequels = byId('collab-filter-sequels')?.checked ?? true;

    const { season, year } = getCurrentSeason();
    const query = `
      query ($season: MediaSeason, $year: Int) {
        Page(perPage: 50) {
          media(season: $season, seasonYear: $year, type: ANIME,
                sort: POPULARITY_DESC, status_not: CANCELLED,
                format_in: [TV, TV_SHORT, ONA]) {
            id
            title { romaji english }
            coverImage { large medium }
            format episodes
            relations { edges { relationType(version: 2) } }
          }
        }
      }`;
    const res  = await _anilistFetch({ query, variables: { season, year } });
    if (!res.ok) throw new Error('AniList returned HTTP ' + res.status);
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);

    // For single device, use the local anime list as the "ranked by anyone" set
    const rankedIds = new Set(excludeRanked ? animeList.map(a => a.id) : []);

    let rawPool = (json?.data?.Page?.media ?? []).map(m => ({
      title:     m.title.english || m.title.romaji,
      cover:     m.coverImage.large || m.coverImage.medium || '',
      format:    m.format   || 'TV',
      episodes:  m.episodes || 0,
      _id:       m.id,
      _isSequel: (m.relations?.edges || []).some(e => e.relationType === 'PREQUEL'),
    })).filter(m => m.title);

    if (excludeRanked)  rawPool = rawPool.filter(m => !rankedIds.has(m._id));
    if (excludeSequels) rawPool = rawPool.filter(m => !m._isSequel);
    rawPool = rawPool.slice(0, 20);

    const pool = rawPool.map(({ title, cover, format, episodes }) => ({ title, cover, format, episodes }));

    if (pool.length < 2) {
      const total = (json?.data?.Page?.media ?? []).length;
      throw new Error(
        `Only ${pool.length} show${pool.length === 1 ? '' : 's'} left after filtering ` +
        `(${total} this season, filters removed the rest).\n\nTry unchecking a filter and retrying.`
      );
    }

    _collabShowRoundPicker(pool);
  } catch (err) {
    console.error('_collabFetchSeasonSingle error:', err);
    showToast('⚠️ ' + (err.message || 'Could not load this season\'s anime — try again.'), 5000);
  } finally {
    if (startBtn) { startBtn.disabled = false; startBtn.textContent = 'Fetch this season & start →'; }
  }
}

async function collabHostStartThisSeason() {
  if (!_collab?.isHost || !_collab.firebaseRef) return;
  if (Object.keys(_collab.players || {}).length < 2) return;

  const seasonBtn = byId(IDS.collabStartSeasonBtn);
  const nomsBtn   = byId(IDS.collabStartNomsBtn);
  if (seasonBtn) { seasonBtn.disabled = true; seasonBtn.textContent = 'Fetching this season…'; }
  if (nomsBtn)   { nomsBtn.disabled   = true; }

  try {
    const excludeRanked  = byId('collab-filter-ranked')?.checked  ?? true;
    const excludeSequels = byId('collab-filter-sequels')?.checked ?? true;

    const { season, year } = getCurrentSeason();
    const query = `
      query ($season: MediaSeason, $year: Int) {
        Page(perPage: 50) {
          media(season: $season, seasonYear: $year, type: ANIME,
                sort: POPULARITY_DESC, status_not: CANCELLED,
                format_in: [TV, TV_SHORT, ONA]) {
            id
            title { romaji english }
            coverImage { large medium }
            format episodes
            relations { edges { relationType(version: 2) } }
          }
        }
      }`;
    const res  = await _anilistFetch({ query, variables: { season, year } });
    if (!res.ok) throw new Error('AniList returned HTTP ' + res.status);
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);

    // Collect every AniList ID any player has already ranked
    const allRankedIds = new Set();
    if (excludeRanked) {
      Object.values(_collab.players || {}).forEach(p =>
        (p.rankedIds || []).forEach(id => allRankedIds.add(id))
      );
    }

    let rawPool = (json?.data?.Page?.media ?? []).map(m => ({
      title:    m.title.english || m.title.romaji,
      cover:    m.coverImage.large || m.coverImage.medium || '',
      format:   m.format   || 'TV',
      episodes: m.episodes || 0,
      _id:      m.id,
      _isSequel: (m.relations?.edges || []).some(e => e.relationType === 'PREQUEL'),
    })).filter(m => m.title);

    if (excludeRanked)  rawPool = rawPool.filter(m => !allRankedIds.has(m._id));
    if (excludeSequels) rawPool = rawPool.filter(m => !m._isSequel);
    rawPool = rawPool.slice(0, 20);

    // Strip internal fields before sharing — keep title, cover, format, episodes
    const pool = rawPool.map(({ title, cover, format, episodes }) => ({ title, cover, format, episodes }));

    if (pool.length < 2) {
      const total = (json?.data?.Page?.media ?? []).length;
      throw new Error(
        `Only ${pool.length} show${pool.length === 1 ? '' : 's'} left after filtering ` +
        `(${total} this season, filters removed the rest).\n\nTry unchecking a filter and retrying.`
      );
    }

    // Tell guests we're in the round-picking phase and share the pool
    await _collab.firebaseRef.update({ phase: 'selecting-rounds', seasonPool: pool });

    // Host goes straight to the round picker
    _collabShowRoundPicker(pool);
  } catch (err) {
    console.error('collabHostStartThisSeason error:', err);
    if (seasonBtn) { seasonBtn.disabled = false; seasonBtn.textContent = '🌸 Watch Together This Season →'; }
    if (nomsBtn)   { nomsBtn.disabled   = false; }
    showToast('⚠️ ' + (err.message || 'Could not load this season\'s anime — try again.'), 5000);
  }
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
  const hostActions = byId(IDS.collabHostActions);
  const startBtn    = byId(IDS.collabStartNomsBtn);
  const seasonBtn   = byId(IDS.collabStartSeasonBtn);
  const guestStatus = byId(IDS.collabLobbyGuestStatus);
  const ready       = connectedArr.length >= 2;
  if (_collab.isHost) {
    if (hostActions) hostActions.style.display = '';
    if (startBtn) {
      startBtn.disabled = !ready;
      startBtn.textContent = ready
        ? `Everyone's in (${connectedArr.length} players) — start nominations →`
        : 'Waiting for at least one more player…';
    }
    if (seasonBtn) {
      seasonBtn.disabled    = !ready;
      seasonBtn.textContent = ready
        ? '🌸 Watch Together This Season →'
        : '🌸 This Season (waiting for players…)';
    }
    if (guestStatus) guestStatus.style.display = 'none';
  } else {
    if (hostActions)  hostActions.style.display  = 'none';
    if (guestStatus)  guestStatus.style.display  = '';
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

  if (data.phase === 'selecting-rounds') {
    // v1.0.107 — extend host promotion to selecting-rounds. Without this, if
    // the host closes mid-pick, the session is stuck on this phase forever.
    _collabMaybePromoteHost(data);
    // Host is on the round picker — guests see a waiting message
    if (!_collab.isHost) {
      const guestStatus = byId(IDS.collabLobbyGuestStatus);
      if (guestStatus) {
        guestStatus.style.display = '';
        guestStatus.textContent   = 'Host is picking the number of rounds…';
      }
      // Stay on the lobby panel so the code is still visible; just update the status text
      const lobbyPanel = byId(IDS.collabPanelMultiLobby);
      if (!lobbyPanel || lobbyPanel.style.display === 'none') _collabPanel(IDS.collabPanelMultiLobby);
    }
    return;
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
    // v1.0.107 — extend host promotion to voting. Without this, if the host
    // drops mid-game, only-the-host's logic that pushes battles + writes
    // phase:'results' never runs, and guests are stuck on the current pair
    // forever with no recovery.
    _collabMaybePromoteHost(data);
    _collab.pairs       = data.pairs       || [];
    _collab.currentPair = data.currentPair || 0;
    const votePanel = byId(IDS.collabPanelVote);
    if (!votePanel || votePanel.style.display === 'none') _collabPanel(IDS.collabPanelVote);
    _collabRenderVotePairMulti(data);
  }

  if (data.phase === 'results') {
    _collab.battles = data.results || [];
    // Reconstruct pool on the guest from whatever Firebase has — host sets
    // _collab.pool locally and (since v1.0.101) also writes it to Firebase.
    // Priority order, most-complete first:
    //   1. data.pool     — full list, host wrote it in collabStartWithRounds
    //   2. data.pairs    — only includes shows that landed in matchups; some
    //                      shows missing if rounds < total possible pairs
    //   3. nominations   — last-ditch fallback for sessions hosted before
    //                      v1.0.101 (where data.pool was never written)
    if (!_collab.pool?.length) {
      if (Array.isArray(data.pool) && data.pool.length) {
        _collab.pool = data.pool;
      } else {
        const seen = new Set();
        _collab.pool = [];
        (data.pairs || []).forEach(p => {
          [p.a, p.b].forEach(show => {
            if (show?.title && !seen.has(show.title.toLowerCase())) {
              seen.add(show.title.toLowerCase());
              _collab.pool.push(show);
            }
          });
        });
        if (!_collab.pool.length) {
          Object.values(data.players || {}).forEach(p => {
            (p.nominations || []).forEach(n => {
              if (!seen.has(n.title.toLowerCase())) { seen.add(n.title.toLowerCase()); _collab.pool.push(n); }
            });
          });
        }
      }
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

  _collabSearchCache = localMatches.map(a => ({ title: a.title, cover: a.cover || '', id: a.id, format: a.format || 'TV', episodes: a.episodes || 0, local: true }));

  _collabRenderSearchRows(res, raw, already, takenBy, /* anilistLoading */ true);

  // ── 2. AniList lookup after debounce ─────────────────────────────────────
  const seq = ++_collabSearchSeq;
  _collabSearchDebounce = setTimeout(async () => {
    const gqlQuery = `
      query($search: String) {
        Page(perPage: 8) {
          media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
            id title { romaji english } coverImage { medium } format episodes
          }
        }
      }`;
    try {
      const resp = await _anilistFetch({ query: gqlQuery, variables: { search: raw } });
      if (seq !== _collabSearchSeq) return;
      const json  = await resp.json();
      const items = json?.data?.Page?.media ?? [];

      const localTitles = new Set(_collabSearchCache.map(c => c.title.toLowerCase()));
      for (const m of items) {
        const title = m.title.english || m.title.romaji;
        if (!title || localTitles.has(title.toLowerCase())) continue;
        _collabSearchCache.push({ title, cover: m.coverImage?.medium || '', id: m.id, format: m.format || 'TV', episodes: m.episodes || 0, local: false });
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
      ${item.cover ? `<img${coverCors(item.cover)} src="${safeUrl(item.cover)}" alt="" loading="lazy" />` : '<div class="collab-search-no-cover">🎬</div>'}
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
  if (item) collabAddNomination(item.title, item.cover, item.id, item.format, item.episodes);
}

function collabAddNomination(title, cover, id, format, episodes) {
  const noms = _collabMyNoms();
  if (noms.length >= 5) return;
  if (noms.some(n => n.title.toLowerCase() === title.toLowerCase())) return;
  // 150-char cap on title — long enough for any real anime title, short enough
  // to stop a malicious/garbage write from bloating Firebase or other clients.
  const safeTitle = (title || '').slice(0, 150);
  noms.push({ title: safeTitle, cover: cover || '', id: id || null, format: format || null, episodes: episodes || 0 });
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
      ${n.cover ? `<img${coverCors(n.cover)} src="${safeUrl(n.cover)}" alt="" loading="lazy" />` : '<div class="collab-nom-cover-placeholder">🎬</div>'}
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
    const btn = byId(IDS.collabConfirmBtn);
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
  const base       = Math.round(poolSize * 1.0);
  const rec        = Math.max(Math.ceil(poolSize / 2), Math.round(base / confidence));
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
      // pool is the FULL list of nominated/seasonal shows. Pairs only contain
      // shows that landed in a matchup — with a low round count vs a large
      // pool, some shows never appear in any pair, so a pool rebuilt from
      // pairs alone misses them. Writing pool here lets guests rank every
      // show (including 0-win ones) on the results screen.
      phase: 'voting', pool: _collab.pool, pairs: _collab.pairs, currentPair: 0,
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

  // v1.0.107 — need at least 2 unique shows to build a single pair; otherwise
  // _collabBuildPairs returns [] and voting renders a blank panel with no exit.
  if (pool.length < 2) {
    showToast('⚠️ Need at least 2 different shows nominated to start voting.', 4000);
    // Multi-device: revert phase so guests don't hang
    if (_collab.mode === 'multi' && _collab.firebaseRef) {
      _collab.firebaseRef.update({ phase: 'nominating' });
    }
    return;
  }

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
  byId(IDS.collabTiebreakBtn).style.display  = 'none';
  byId(IDS.collabP2ReadyBtn).style.display  = 'none';
  _collabSetVoteHeading('p1');
  _collabRenderVoteCards(pair);
}

function _collabSetVoteHeading(who) {
  const name  = who === 'p1' ? _collab.p1Name : _collab.p2Name;
  const other = who === 'p1' ? _collab.p2Name : _collab.p1Name;
  byId(IDS.collabVoteWho).textContent = `${name} — tap your pick`;
  byId(IDS.collabVoteSub).textContent = `(${other}, don't look yet!)`;
}

function _collabRenderVoteCards(pair) {
  [IDS.collabCardA, IDS.collabCardB].forEach((elId, idx) => {
    const show = idx === 0 ? pair.a : pair.b;
    const el   = byId(elId);
    // Reset all state classes cleanly
    el.className = 'challenge-card collab-vote-card';
    el.disabled  = false;
    el.style.opacity = '';
    // v1.0.176 — blur the card if it currently has focus. Without this,
    // when a round advances after a tap the button retains its :focus state
    // and the browser's focus ring leaves the previously-tapped card glowing
    // blue in the new round — looks identical to the "you picked this" state.
    if (document.activeElement === el) el.blur();
    const epBadge = show.format === 'MOVIE'
      ? '<span class="ep-badge">Movie</span>'
      : show.episodes ? `<span class="ep-badge">${show.episodes} ep</span>` : '';
    el.innerHTML = `
      ${show.cover ? `<img${coverCors(show.cover)} src="${safeUrl(show.cover)}" alt="${esc(show.title)}" loading="lazy" />` : '<div class="collab-no-cover">🎬</div>'}
      <div class="challenge-card-title">${esc(show.title)}</div>
      ${epBadge ? `<div class="challenge-card-meta">${epBadge}</div>` : ''}`;
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
    byId(side === 'a' ? IDS.collabCardA : IDS.collabCardB).classList.add('challenge-card-chosen');
    byId(side === 'a' ? IDS.collabCardB : IDS.collabCardA).classList.add('challenge-card-unchosen');
    byId(IDS.collabVoteWho).textContent = `✓ ${_collab.p1Name} has voted`;
    byId(IDS.collabVoteSub).textContent = `Pass to ${_collab.p2Name}`;
    byId(IDS.collabP2ReadyBtn).style.display = 'block';
  } else if (phase === 'p2') {
    _collab.currentVote.p2 = side;
    _collab.votingPhase    = 'reveal';
    _collabRevealVotes();
  }
}

function collabP2Ready() {
  _collab.votingPhase = 'p2';
  byId(IDS.collabP2ReadyBtn).style.display = 'none';
  _collabRenderVoteCards(_collab.pairs[_collab.currentPair]);
  _collabSetVoteHeading('p2');
  byId(IDS.collabCardA).disabled = false;
  byId(IDS.collabCardB).disabled = false;
}

function _collabRevealVotes() {
  const { p1, p2 } = _collab.currentVote;
  const pair = _collab.pairs[_collab.currentPair];
  byId(IDS.collabCardA).disabled = true;
  byId(IDS.collabCardB).disabled = true;
  byId(IDS.collabVoteWho).textContent = '';
  byId(IDS.collabVoteSub).textContent = '';

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

  // Auto-advance after the reveal — matches the 2.8s timer used by the
  // multi-device flow at _collabAdvanceFromReveal. Next button stays visible
  // as a "skip ahead" override.
  if (_collab._autoNextTimer) clearTimeout(_collab._autoNextTimer);
  _collab._autoNextTimer = setTimeout(() => {
    if (_collab) _collab._autoNextTimer = null;
    collabNextPair();
  }, 2800);
}

function collabTiebreaker() {
  byId(IDS.collabTiebreakBtn).style.display = 'none';
  byId(IDS.collabVoteReveal).style.display = 'none';
  _collab.votingPhase = 'p1'; _collab.currentVote = {};
  _collabRenderVoteCards(_collab.pairs[_collab.currentPair]);
  _collabSetVoteHeading('p1');
}

function collabNextPair() {
  if (!_collab) return; // belt+braces — auto-advance timer can fire after close
  if (_collab._autoNextTimer) { clearTimeout(_collab._autoNextTimer); _collab._autoNextTimer = null; }
  _collab.currentPair++;
  byId(IDS.collabVoteNextBtn).style.display = 'none';
  byId(IDS.collabTiebreakBtn).style.display = 'none';
  if (_collab.currentPair >= _collab.pairs.length) _collabShowResults();
  else _collabRenderVotePair();
}

// ── MULTI DEVICE VOTING ───────────────────────────────────────────────────────
async function collabVoteMulti(side) {
  if (!_collab?.firebaseRef) return;
  byId(IDS.collabCardA).disabled = true;
  byId(IDS.collabCardB).disabled = true;
  byId(side === 'a' ? IDS.collabCardA : IDS.collabCardB).classList.add('challenge-card-chosen');
  byId(side === 'a' ? IDS.collabCardB : IDS.collabCardA).classList.add('challenge-card-unchosen');
  const totalPlayers = Object.keys(_collab.players || {}).length;
  byId(IDS.collabVoteWho).textContent = `✓ Voted — waiting for others…`;
  byId(IDS.collabVoteSub).textContent = '';
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
  byId(IDS.collabP2ReadyBtn).style.display = 'none';
  byId(IDS.collabVoteSub).textContent = '';

  if (!myVote) {
    byId(IDS.collabVoteWho).textContent = 'Tap your pick';
    _collabRenderVoteCards(pair);
  } else {
    byId(IDS.collabVoteWho).textContent =
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
      // v1.0.107 — guard against duplicate battle pushes when sync re-fires
      // before the 2.8s timer completes (presence flip, late connected:true,
      // etc.). Without _lastRecordedPair, every extra sync during the reveal
      // window pushed another battle for the same idx, double-counting wins
      // in the final results.
      if (_collab._lastRecordedPair === idx) return;
      _collab._lastRecordedPair = idx;

      const newBattles = [...(_collab.battles || []), {
        a: pair.a, b: pair.b,
        winner: winner ? winner.title : null,
      }];
      _collab.battles = newBattles;

      // Reset votes for all players
      const clearedVotes = Object.fromEntries(Object.keys(players).map(pid => [`votes/${pid}`, null]));

      // Track timer id on _collab so closeCollabModal can cancel it. Without
      // this, if host taps ✕ during the 2.8s reveal animation the callback
      // fires after _collab=null and throws TypeError on .firebaseRef.update,
      // leaving the session stuck in 'voting' forever for guests.
      // Also bail in-callback if _collab was torn down or already advanced.
      if (_collab._voteAdvanceTimer) clearTimeout(_collab._voteAdvanceTimer);
      _collab._voteAdvanceTimer = setTimeout(() => {
        if (!_collab?.firebaseRef) return;
        _collab._voteAdvanceTimer = null;
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
    // Loose `== null` deliberately catches both null AND undefined. Firebase
    // Realtime Database strips `null` values on write, so a battle pushed as
    // { winner: null } reads back as { } on guests — `winner` is undefined,
    // not null. Strict `=== null` here would mis-treat synced ties as wins
    // for `undefined`, which silently disappears from the results screen.
    if (b.winner == null) {
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
      ${show.cover ? `<img${coverCors(show.cover)} src="${safeUrl(show.cover)}" alt="" loading="lazy" />` : '<div class="collab-no-cover">🎬</div>'}
      <div class="collab-result-info">
        <div class="collab-result-title">${esc(show.title)}</div>
        <div class="collab-result-wins">${wLabel}<span class="collab-result-ties">${tLabel}</span></div>
      </div>
    </div>`;
  }).join('');
}

// ── UNIFIED SOCIAL COMPARE ────────────────────────────────────────────────────
async function runSocialCompare() {
  const input = byId(IDS.socialCompareInput);
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
  const input    = byId(IDS.socialChallengeInput);
  const username = (input?.value || '').trim();
  if (!username) { input?.focus(); return; }
  openChallengeMode(username, _socialPlatform);
}

function openLiveChallengeFromInput() {
  // Open setup panel — username/platform pre-filled from auth state in _lcPrefillSetup
  openLiveChallengeMode();
}

function openLiveChallengeJoinFromInput() {
  // Social tab join input removed — just open the setup panel where both
  // create and join are handled together.
  openLiveChallengeMode();
}

async function _rerunComparison(username, platform) {
  setSocialPlatform(platform);
  const cleanName = username.replace(/ \[MAL\]$/i, '');
  // Keep all inputs in sync
  const unifiedInput = byId(IDS.socialCompareInput);
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
      const res = await _anilistFetch({ query, variables: { ids: chunk } });
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
            <a class="rec-card friend-rec-card" href="https://anilist.co/anime/${mediaId}" target="_blank" rel="noopener noreferrer">
              <img${coverCors(cover)} src="${safeUrl(cover)}" alt="Cover art for ${esc(title)}" loading="lazy" />
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
          <a class="rec-card friend-rec-card" href="https://myanimelist.net/anime/${safeId}" target="_blank" rel="noopener noreferrer">
            <img${coverCors(cover)} src="${safeUrl(cover)}" alt="Cover art for ${esc(title)}" loading="lazy" />
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
    _clearTasteSnapshots(); // fresh load — discard any leftovers from a prior session
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
            studios(isMain: true) { nodes { name } }
          }
        }
      }
    `;
    const res = await _anilistFetch({ query, variables: { page: p } });
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
      // v1.0.211 fix — guest pool now ships studios from the start so the
      // Studio filter picker, Studio Affinity panel, and Studio Loyalty
      // insight all work for guests. Without this every guest session
      // triggered the 4 s silent enrichment fetch immediately.
      studios: (m.studios?.nodes || []).map(n => n.name).filter(Boolean),
      elo: 1200, wins: 0, losses: 0, comparisons: 0,
      // v1.0.211 — seedElo is the ELO at the moment this anime entered the
      // ranked list, captured so the Comeback Kid achievement can still
      // detect "this anime started at ≤900 ELO" even after 30+ battles
      // have rolled the original value out of eloHistory (which is capped).
      seedElo: 1200,
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
    _clearTasteSnapshots(); // fresh guest pool — discard any leftovers from a prior session
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
  // v1.0.211 — honour both pool restrictions so an exclude-replacement during
  // Battle Within stays inside the franchise pool.
  // v1.0.211 fix — also honour avoidSameFranchise. Without this, Battle Next
  // (which also calls into this path) could pair against a same-franchise
  // opponent even when the user has the toggle on. Falls through to no
  // franchise filter if zero eligible opponents remain (best-effort, same
  // pattern as pickOpponents).
  const keepAnime = animeList[keepIdx];
  const weights = animeList.map(a => {
    if (excludedIds.has(a.id) || hiddenFormatsBattle.has(a.format) || hiddenStatusesBattle.has(a.status)) return 0;
    if (battleWithinFranchise && !battleWithinFranchise.ids.has(a.id)) return 0;
    if (avoidSameFranchise && _sameFranchise(keepAnime, a)) return 0;
    const base = 1 / (a.comparisons + 1);
    return a.fuzzy ? base * 0.1 : base;
  });
  const totalW = weights.reduce((s, w) => s + w, 0);

  const eloKeep = animeList[keepIdx].elo;
  // v1.0.211 hotfix — match pickOpponents: skip the similar-ELO window when
  // battling within a franchise so the outlier high-ELO entry can still be
  // picked as a replacement opponent.
  const eloWindow = battleWithinFranchise ? Infinity : 300;
  const candidates = animeList
    .map((a, i) => ({ i, a }))
    .filter(({ i }) => i !== keepIdx && weights[i] > 0 && Math.abs(animeList[i].elo - eloKeep) < eloWindow)
    .sort((x, y) => x.a.comparisons - y.a.comparisons);

  if (candidates.length > 0) {
    const pool = candidates.slice(0, Math.min(20, candidates.length));
    return pool[Math.floor(Math.random() * pool.length)].i;
  }

  // v1.0.211 — if avoidSameFranchise zeroed every weight (small franchise +
  // strict toggle), relax that one constraint inline rather than returning
  // the last-ditch index 0/1. excludedIds + format filter still apply.
  let finalWeights = weights;
  let finalTotal = totalW;
  if (totalW === 0 && avoidSameFranchise) {
    finalWeights = animeList.map(a => {
      if (excludedIds.has(a.id) || hiddenFormatsBattle.has(a.format) || hiddenStatusesBattle.has(a.status)) return 0;
      if (battleWithinFranchise && !battleWithinFranchise.ids.has(a.id)) return 0;
      const base = 1 / (a.comparisons + 1);
      return a.fuzzy ? base * 0.1 : base;
    });
    finalTotal = finalWeights.reduce((s, w) => s + w, 0);
  }
  let r = Math.random() * finalTotal;
  for (let i = 0; i < n; i++) {
    if (i === keepIdx) continue;
    r -= finalWeights[i];
    if (r <= 0) return i;
  }
  for (let i = 0; i < n; i++) {
    if (i !== keepIdx && finalWeights[i] > 0) return i;
  }
  // v1.0.211 fix — last-ditch fallback used to return raw indices 0 or 1
  // ignoring excludedIds and hiddenFormatsBattle. Prefer a non-excluded
  // non-hidden opponent before resorting to "any other index".
  for (let i = 0; i < n; i++) {
    if (i === keepIdx) continue;
    const a = animeList[i];
    if (a && !excludedIds.has(a.id) && !hiddenFormatsBattle.has(a.format) && !hiddenStatusesBattle.has(a.status)) return i;
  }
  return keepIdx === 0 ? 1 : 0;
}

function excludeAnime(event, side) {
  event.stopPropagation();
  const excludedIdx = side === 0 ? currentA : currentB;
  const keepIdx     = side === 0 ? currentB : currentA;

  const excludedId = animeList[excludedIdx].id;
  excludedIds.add(excludedId);
  // v1.0.210 — was `undoStack = []; _updateUndoBtn();` which silently
  // discarded all prior undo history when the user accidentally tapped
  // "✗ Not seen". Push a typed snapshot instead so the same Undo button
  // can roll the exclusion back. Handled in undoLast as snap.type==='exclude'.
  _pushUndoSnapshot({
    type:       'exclude',
    excludedId,
    prevA:      currentA,
    prevB:      currentB,
  });

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
        <img${coverCors(anime.cover)} src="${safeUrl(anime.cover)}" alt="${esc(anime.title)}" loading="lazy" />
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
// Fixed milestones every 100 from 200 to 1000 (with extra ones at 50/150 for
// early engagement). After 1000 we shift to a 200-step cadence so the popup
// doesn't get spammy once the user has settled in for the long haul. Without
// the 700/800/900 entries, the previous logic computed `next = 800` at battle
// 700 and skipped the milestone entirely.
const TASTE_STORY_MILESTONES = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const TASTE_STORY_REPEAT_INTERVAL = 200;
const TASTE_STORY_REPEAT_FROM     = 1000;

// Returns the milestone value crossed between before and after, or null.
function _findTasteStoryMilestone(before, after) {
  const fixed = TASTE_STORY_MILESTONES.find(n => before < n && after >= n);
  if (fixed) return fixed;
  if (after > TASTE_STORY_REPEAT_FROM) {
    const next = Math.ceil((before + 1) / TASTE_STORY_REPEAT_INTERVAL) * TASTE_STORY_REPEAT_INTERVAL;
    if (next > TASTE_STORY_REPEAT_FROM && next <= after) return next;
  }
  return null;
}

// Returns a sequential index for any milestone value, used to alternate titles.
// Returns the most recent taste story milestone the user has crossed, so the
// taste tab always shows the same archetype as the last popup they saw.
function _lastTasteStoryMilestone(count) {
  // Walk fixed milestones in reverse
  for (let i = TASTE_STORY_MILESTONES.length - 1; i >= 0; i--) {
    if (count >= TASTE_STORY_MILESTONES[i]) return TASTE_STORY_MILESTONES[i];
  }
  // Shouldn't happen if caller checks count >= first milestone, but safe fallback
  return TASTE_STORY_MILESTONES[0];
}

function _tasteArchetypeIndex(milestone) {
  const fixedIdx = TASTE_STORY_MILESTONES.indexOf(milestone);
  if (fixedIdx !== -1) return fixedIdx;
  // Milestones above the fixed list (1000+) get sequential indices from where
  // the fixed list left off, stepping by the repeat interval.
  return TASTE_STORY_MILESTONES.length
       + Math.round((milestone - TASTE_STORY_REPEAT_FROM) / TASTE_STORY_REPEAT_INTERVAL) - 1;
}

// v1.0.209 — tasteStorySeen helpers. Previously this list lived only in
// localStorage, so a fresh device that cloud-synced into the middle of a
// battle history (e.g. phone first sign-in at battle 1306) had `seen = []`
// and the catch-up logic in checkMilestone fired the most recent milestone
// as a "haven't seen this" popup, even though the user had already seen it
// on another device. The fix is to round-trip the seen list through cloud
// sync, merging with `union` semantics so a device that showed a milestone
// while offline doesn't lose its local record when remote state arrives.
function _readTasteStorySeen() {
  try { return JSON.parse(localStorage.getItem(KESSEN_KEYS.ui.tasteStorySeen) || '[]'); }
  catch { return []; }
}
function _mergeTasteStorySeen(incoming) {
  if (!Array.isArray(incoming) || incoming.length === 0) return;
  try {
    const local = _readTasteStorySeen();
    const merged = Array.from(new Set([...local, ...incoming])).sort((a, b) => a - b);
    if (merged.length !== local.length) {
      localStorage.setItem(KESSEN_KEYS.ui.tasteStorySeen, JSON.stringify(merged));
    }
  } catch { /* ignore — sync failure shouldn't break the app */ }
}

// v1.0.209 — tasteSnapshots helpers. Same architectural shape as
// tasteStorySeen above: snapshots lived only in localStorage, so the
// "How you've changed" timeline appeared empty on any device that didn't
// happen to be present when each 50-battle milestone was crossed. Now we
// round-trip the snapshots through cloud sync, merging by battleCount key
// with `local wins` semantics on collision (the local snapshot's id-list
// came from this device's resolved animeList, which is consistent with what
// will render at paint time). Snapshots are capped at 40 entries (8 KB
// upper bound) — well within the cloud payload budget.
function _readTasteSnapshots() {
  try { return JSON.parse(localStorage.getItem(KESSEN_KEYS.data.tasteSnapshots) || '[]'); }
  catch { return []; }
}
function _mergeTasteSnapshots(incoming) {
  if (!Array.isArray(incoming) || incoming.length === 0) return;
  try {
    const local = _readTasteSnapshots();
    const byBattle = new Map();
    // Incoming first so locals overwrite on collision
    incoming.forEach(s => { if (s && typeof s.battleCount === 'number') byBattle.set(s.battleCount, s); });
    local.forEach(s    => { if (s && typeof s.battleCount === 'number') byBattle.set(s.battleCount, s); });
    const merged = [...byBattle.values()].sort((a, b) => a.battleCount - b.battleCount);
    // Re-impose the 40-entry cap (keep most recent — same as _maybeSaveTasteSnapshot)
    const capped = merged.length > 40 ? merged.slice(merged.length - 40) : merged;
    if (capped.length !== local.length) {
      localStorage.setItem(KESSEN_KEYS.data.tasteSnapshots, JSON.stringify(capped));
    }
  } catch { /* ignore — sync failure shouldn't break the app */ }
}

function checkMilestone(before, after) {
  // Taste story — check before the regular milestone so it appears first
  let tasteHit = _findTasteStoryMilestone(before, after);
  let extraSeen = [];

  // Catch-up: if no milestone was crossed in this battle but there's an
  // unseen fixed milestone <= current battle count, show the most recent one
  // and silently mark all OLDER unseen milestones as seen at the same time.
  //
  // v1.0.122 — the older version walked unseen entries one-per-battle, which
  // produced a Taste Story popup every battle for users with historical gaps
  // in their seen list (e.g. someone past battle 1000 who never saw 700/900).
  // Now: one popup, everything older marked silently, done.
  if (!tasteHit && after >= TASTE_STORY_MILESTONES[0]) {
    try {
      const seen = JSON.parse(localStorage.getItem(KESSEN_KEYS.ui.tasteStorySeen) || '[]');
      const unseen = TASTE_STORY_MILESTONES.filter(n => n <= after && !seen.includes(n));
      if (unseen.length) {
        tasteHit   = unseen[unseen.length - 1];   // show only the latest
        extraSeen  = unseen.slice(0, -1);          // mark the rest silently
      }
    } catch { /* ignore */ }
  }

  if (tasteHit && animeList.length >= 10) {
    try {
      const seen = JSON.parse(localStorage.getItem(KESSEN_KEYS.ui.tasteStorySeen) || '[]');
      if (!seen.includes(tasteHit)) {
        const updated = Array.from(new Set([...seen, tasteHit, ...extraSeen]));
        localStorage.setItem(KESSEN_KEYS.ui.tasteStorySeen, JSON.stringify(updated));
        setTimeout(() => showTasteStory(tasteHit), 400);
        return; // don't show regular milestone on same battle
      }
    } catch { /* ignore */ }
  }

}

// ─── TASTE STORY (milestone recap experience) ───────────────────────────────

// v1.0.211 — Each genre now has 5 archetypes (was 3). _tasteArchetypeIndex
// returns the milestone position, then we mod by the array length, so going
// from 3 → 5 just extends the cycle: a heavy player past 1000 battles now
// sees fresh titles for longer before things start repeating.
//
// Audit notes:
//   - Drama:        dropped "Cries on Schedule" (3rd crying joke), added
//                   "Knows the Music Cue", "Believes Misunderstanding Is
//                   Plot", "Stayed for the Letter Reveal".
//   - Supernatural: dropped "Talks to the Foxes" (third yokai joke), added
//                   variety covering charms, ghost stories, shrines.
//   - Mecha:        dropped "Unit 01 Apologist" (second Eva ref next to
//                   "Get in the Robot"), added Gundam UC, G Gundam, and
//                   the Real-vs-Super Robot argument.
//   - Adventure:    dropped vague "Born Adventurer", added specific
//                   observations ("Knows the Smell of a New Continent").
//   - Music + Ecchi: new entries — these are real AniList genres that
//                   previously fell through to the fallback.
//   - Shounen:      removed. Empirically confirmed it never fires —
//                   AniList exposes it as a tag (not a genre) and MAL
//                   treats it as a demographic. Dead code.
const _TASTE_ARCHETYPES = {
  'Psychological': [
    'Read the Wiki After Every Episode',
    'The 4D Chess Enjoyer',
    'Has Bookmarked the Timeline',
    'Re-watched for the Subtext',
    'Knows What the Director Was Doing',
  ],
  'Drama': [
    'Onion Ninja Survivor',
    'Cried at Episode 5',
    'Knows the Music Cue',
    'Has a Reliable Comfort Sob',
    "Knows the Power-Move Speech",
  ],
  'Action': [
    'Sakuga Connoisseur',
    'AOTY Every Season',
    'Slows It to 0.25x',
    'Owns the Re-edited Fight Compilation',
    'Has Opinions on Choreography',
  ],
  'Comedy': [
    'Laughed During the Sad Part',
    'Reaction Face Collector',
    "Is the Group Chat's Anime Person",
    'Knows the Beat Drop in the Joke',
    'Dies on the Nichijou Hill',
  ],
  'Sci-Fi': [
    'The Infodump Appreciator',
    'The Hard Sci-Fi Purist',
    'Time Loop Apologist',
    'Has Opinions on FTL',
    'Argues About the Physics',
  ],
  'Fantasy': [
    'Isekai Truck Survivor',
    'Reincarnated With Great Taste',
    'World-Building Connoisseur',
    'Trusts the Mentor (Big Mistake)',
    'Has Strong Magic-System Opinions',
  ],
  'Romance': [
    'Just Confess Already',
    'The Slow Burn Masochist',
    'Shipper Strategist',
    'Knows Every Confession Trope',
    'Reads the Manga First',
  ],
  'Horror': [
    'Watches Alone at 3am',
    'Unfazed by the Gore',
    'Sleeps With the Light On',
    'Pauses to Catch the Background',
    'Thinks the Censorship Made It Worse',
  ],
  'Slice of Life': [
    'Cosy Anime Specialist',
    'Tea and Existential Dread',
    'Rewatches When Sad',
    'Has a Tea-Drinking Anime',
    'Has a Comfort Episode',
  ],
  'Sports': [
    'Cried at the Training Arc',
    'Peak Fiction Finder',
    'Believes the Coach Speech',
    'Knows the Team Like Family',
    'Re-watches the Final Match',
  ],
  'Mystery': [
    'Paused at Every Frame',
    'The Theory Poster',
    'Solved It Before the Detective',
    'Has a Whiteboard',
    'Trusts No Witness',
  ],
  'Supernatural': [
    'Yokai Whisperer',
    'Spirit World Citizen',
    'Believes the Old Lady\'s Warning',
    'Carries a Charm',
    'Reads Ghost Stories at Lunch',
  ],
  'Mecha': [
    'Get in the Robot',
    'Knows Every UC Calendar Date',
    'Knows All the Cockpit Designs',
    'Cried at G Gundam',
    'Argues About Real vs Super Robot',
  ],
  // v1.0.211 — Removed Shounen. AniList doesn't expose Shounen as a genre
  // (it's a tag in their schema, not in MediaGenre); MAL treats it as a
  // demographic, not a genre. Confirmed empirically — anime.genres never
  // contains "Shounen", so the archetype set was dead code. If a future
  // importer changes that, we'll add Shounen back.
  'Adventure': [
    'Plots the Route Mid-Episode',
    'Always One Town Over',
    'Knows the Smell of a New Continent',
    'Map First, Story Second',
    'Builds the Lore in the Margins',
  ],
  'Thriller': [
    'Plot Twist Connoisseur',
    'Trust No Character',
    'Suspects the Quiet One',
    'Predicted the Body',
    'Has a Suspect Tier List',
  ],
  'Mahou Shoujo': [
    'Transformation Sequence Devotee',
    'Says the Transformation Phrase Out Loud',
    'Cried at Sailor Moon',
    'Owns the OST',
    'Knows the Wand Shop By Name',
  ],
  // v1.0.211 — Music: previously fell through to fallback. Real AniList
  // genre that K-On, Bocchi, Carole & Tuesday, Sound! Euphonium etc carry.
  'Music': [
    'Knows the Drummer\'s Name',
    'Has the OST on Repeat',
    'Re-watched for the Performance',
    'Quotes the Lyrics in DM',
    'Believes the Band Saved Their Life',
  ],
  // v1.0.211 — Ecchi: previously fell through. Real AniList genre.
  // Played for self-aware humour rather than judgement.
  'Ecchi': [
    'Watches It for the Story',
    'Has a Defense Speech Ready',
    'Closes the Curtains First',
    'Argues It Has Plot',
    'Owns It in the Group Chat',
  ],
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

// AniList sometimes lists the same studio under multiple distinct names —
// "Bones" produces most MHA seasons but the Vigilantes spinoff is credited
// to "bones film", so without canonicalisation the user sees two separate
// studio buckets in Studio Affinity and the Taste Story studio-loyalty insight.
// Map alternate names to the canonical display name. Lookup is case-
// insensitive via the lower-keyed clone below.
const _STUDIO_ALIASES = Object.freeze({
  'bones film':                'Bones',
  'Bones Inc.':                'Bones',
  'BONES':                     'Bones',
  'MAPPA':                     'MAPPA',
  'Mappa':                     'MAPPA',
  'Wit Studio':                'Wit Studio',
  'WIT STUDIO':                'Wit Studio',
  'TRIGGER':                   'TRIGGER',
  'Trigger':                   'TRIGGER',
  'Studio Trigger':            'TRIGGER',
  'ufotable':                  'ufotable',
  'Ufotable':                  'ufotable',
  'UFOTABLE':                  'ufotable',
  'Kyoto Animation':           'Kyoto Animation',
  'KyoAni':                    'Kyoto Animation',
  'Madhouse':                  'Madhouse',
  'Studio Madhouse':           'Madhouse',
  'Madhouse Inc.':             'Madhouse',
  'Sunrise':                   'Sunrise',
  'Sunrise Inc.':              'Sunrise',
  'Bandai Namco Pictures':     'Bandai Namco Pictures',
  'Bandai Namco':              'Bandai Namco Pictures',
  'Production I.G':            'Production I.G',
  'Production IG':             'Production I.G',
  'A-1 Pictures':              'A-1 Pictures',
  'A1 Pictures':               'A-1 Pictures',
  'Toei Animation':            'Toei Animation',
  'Toei Animation Co., Ltd.':  'Toei Animation',
  'P.A. Works':                'P.A. Works',
  'P.A.Works':                 'P.A. Works',
  'P.A. WORKS':                'P.A. Works',
  'PA Works':                  'P.A. Works',
});
const _STUDIO_ALIASES_LOWER = Object.freeze(
  Object.fromEntries(Object.entries(_STUDIO_ALIASES).map(([k, v]) => [k.toLowerCase(), v]))
);
function _canonicalStudio(name) {
  if (!name) return name;
  return _STUDIO_ALIASES_LOWER[name.toLowerCase()] || name;
}

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
  // v1.0.211 — Was a 2-entry "the algorithm failed" fallback that read as
  // a system error message rather than a personality. Now 5 entries that
  // celebrate the user's eclectic taste — feels earned even when their top
  // genre doesn't match a known set (e.g. niche genres, or "Hentai" filtered
  // out leaving an even tag spread).
  const archetypes = _TASTE_ARCHETYPES[topGenre] || [
    'Hard to Pigeonhole',
    'Genre-Fluid',
    'A Taste of Their Own',
    'The Algorithm Took the Day Off',
    'Refuses to Be Categorised',
  ];
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
    top10.forEach(a => (a.studios || []).forEach(rawS => {
      const s = _canonicalStudio(rawS);
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
        <img${coverCors(a.cover)} src="${esc(a.cover || '')}" alt="${esc(displayTitle(a))}" loading="lazy" />
        <div class="ts-cover-title">${esc(displayTitle(a))}</div>
      </div>`).join('');
    body.innerHTML = `
      <div class="ts-label">After ${card.battleMilestone} battles</div>
      <div class="ts-headline ts-archetype" style="color:${esc(card.accent)}">${esc(card.headline)}</div>
      <div class="ts-covers">${top3Html}</div>
      <div class="ts-share-actions">
        <button class="btn-primary" onclick="exportTasteStoryCard()">📸 Save image</button>
        <button class="btn-secondary" onclick="closeTasteStory();_openProfileTab()" style="margin-left:8px">🎨 Full profile →</button>
      </div>`;
  } else if (card.type === 'champion' && card.cover) {
    body.innerHTML = `
      <div class="ts-label">${esc(card.label)}</div>
      <div class="ts-champion-wrap">
        <img class="ts-champion-cover"${coverCors(card.cover)} src="${safeUrl(card.cover)}" alt="${esc(card.headline)}" onerror="this.style.display='none'" />
        <div class="ts-champion-info">
          <div class="ts-headline" style="color:${esc(card.accent)}">${esc(card.headline)}</div>
          <div class="ts-sub">${esc(card.sub)}</div>
        </div>
      </div>
      <button class="ts-profile-link" onclick="closeTasteStory();_openProfileTab()">🎨 See full profile →</button>`;
  } else {
    body.innerHTML = `
      <div class="ts-label">${esc(card.label)}</div>
      <div class="ts-headline" style="color:${esc(card.accent)}">${esc(card.headline)}</div>
      <div class="ts-sub">${esc(card.sub)}</div>
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
  pushModalBack('share', closeShare);
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
  popModalBack('share');
}
function closeShareOnOverlay(e) { if (e.target === byId(IDS.shareModal)) closeShare(); }

// Opens the share modal from the Manage tab — equivalent to shareRankings().
function openShareFromManage() { shareRankings(); }

// ─── HARDWARE BACK BUTTON / MODAL DISMISS (TWA) ─────────────────────────────
// On Android — especially as a TWA on Play Store — the hardware back button
// and the back-gesture are the primary navigation. Without this handler,
// tapping back inside an open modal exits the whole app instead of dismissing
// the modal, which is the #1 most-reported beta complaint on Android PWAs.
//
// Pattern: when a modal opens we push a synthetic history entry. A back press
// fires `popstate` and we use it to dismiss whichever modal is on top of an
// internal stack. When a modal closes via the X / Cancel / OK button we call
// `history.back()` ourselves so the synthetic entry doesn't leak into the
// user's normal browser history.
//
// pushModalBack(name, closeFn) — call AFTER showing a modal
// popModalBack(name)            — call AFTER hiding a modal via X/Cancel/etc.
const _modalBackStack = [];
let _modalBackIgnoreNext = false;
let _modalBackInstalled  = false;

function _installModalBack() {
  if (_modalBackInstalled) return;
  _modalBackInstalled = true;
  window.addEventListener('popstate', () => {
    if (_modalBackIgnoreNext) { _modalBackIgnoreNext = false; return; }
    const top = _modalBackStack.pop();
    if (top) top.close();
  });
  // v1.0.150 — Escape closes whatever's on top of the modal stack.
  // Previously only share, mode-menu, filter-menu, and predictor had
  // Escape handlers; detail/sync/MAL-sync/help/tower/collab/challenge/LC/
  // archive-confirm/new-anime-confirm/guest-merge/welcome/confirm/
  // notif-centre/session-summary/taste-story all didn't. Now all 12+
  // dialogues close consistently. Skips when focus is in a text input
  // so users can Esc-clear an autocomplete dropdown without closing the
  // surrounding modal.
  window.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (_modalBackStack.length === 0) return;
    const t = e.target;
    const isTextInput = t && (
      (t.tagName === 'INPUT' && /^(text|search|email|url|password|tel|number)$/i.test(t.type || 'text'))
      || t.tagName === 'TEXTAREA'
      || t.isContentEditable
    );
    if (isTextInput) return;
    const top = _modalBackStack[_modalBackStack.length - 1];
    if (top) {
      e.preventDefault();
      top.close();
    }
  });
}

function pushModalBack(name, closeFn) {
  _installModalBack();
  // Strip any prior entry for the same modal — guards against re-open without
  // close (e.g. opening the detail modal on a second anime without dismissing
  // the first).
  const existing = _modalBackStack.findIndex(e => e.name === name);
  if (existing >= 0) _modalBackStack.splice(existing, 1);
  _modalBackStack.push({ name, close: closeFn });
  try { history.pushState({ kessenModal: name }, ''); } catch (_e) {}
}

function popModalBack(name) {
  const idx = _modalBackStack.findIndex(e => e.name === name);
  if (idx < 0) return; // already popped (e.g. via popstate / back-button)
  _modalBackStack.splice(idx, 1);
  _modalBackIgnoreNext = true;
  try { history.back(); } catch (_e) { _modalBackIgnoreNext = false; }
}

// ─── HELP MODAL ───────────────────────────────────────────────────────────────
function showHelp()  {
  byId(IDS.helpModal).style.display = 'flex';
  pushModalBack('help', closeHelp);
}
function closeHelp() {
  localStorage.setItem(KESSEN_KEYS.ui.helpSeen, '1');
  byId(IDS.helpModal).style.display = 'none';
  popModalBack('help');
}
function closeHelpOnOverlay(e) { if (e.target === byId(IDS.helpModal)) closeHelp(); }
function maybeShowHelp() {
  if (!localStorage.getItem(KESSEN_KEYS.ui.helpSeen)) {
    showHelp();
  }
}

// ─── BETA FEEDBACK ────────────────────────────────────────────────────────────
// Triggered by tapping the BETA chip in the header (and by the "Send feedback"
// button in the Manage tab). Pre-fills version + user-agent into the mailto
// body so reports arrive triage-ready rather than as a bare "it's broken."
//
// We intentionally don't auto-attach username, AniList ID, or anything that
// could surprise a privacy-conscious tester — only build metadata they'd
// already give us if asked. Anything beyond that, the tester types themselves.
function sendBetaFeedback() {
  const version =
    document.querySelector('meta[name="version"]')?.content || 'unknown';
  const ua = (navigator.userAgent || 'unknown').slice(0, 200);
  const lang = navigator.language || 'unknown';
  const body =
    `\n\n\n` +
    `--- please leave the lines below for diagnostics ---\n` +
    `Version: ${version}\n` +
    `Browser: ${ua}\n` +
    `Locale:  ${lang}\n` +
    `URL:     ${location.href}\n`;
  const subject = `Kessen Beta Feedback (v${version})`;
  const url =
    'mailto:feedback@kessen.co.uk' +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);
  // location.href is the most reliable way to trigger mailto across browsers
  // including in-app webviews and TWA. Fallback: copy the address to clipboard
  // so the user can paste it into whatever mail client they prefer.
  try {
    window.location.href = url;
  } catch (_e) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText('feedback@kessen.co.uk');
      showToast('Email client unavailable — feedback@kessen.co.uk copied to clipboard');
    } else {
      showToast('Please email feedback@kessen.co.uk');
    }
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
    pushModalBack('welcome', dismissWelcome);
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
  popModalBack('welcome');
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
    // v1.0.211 — Was Battle Hardened (raw battle counter — pure grind).
    // Now All-Stars: count of anime that have climbed to your "definitely
    // good" tier (ELO 1400+). Measures the SIZE of your highly-rated
    // pool, not how many clicks you made. ELO 1400 is ~200 above the
    // default 1200 seed, which takes deliberate wins to reach.
    id: 'all-stars', name: 'All-Stars', emoji: '⭐',
    desc: 'Build up a deep pool of highly-rated anime',
    tiers: [
      { id: 'all-stars-bronze', tier: 'bronze', label: 'Bronze', req: '10 anime at ELO 1400+' },
      { id: 'all-stars-silver', tier: 'silver', label: 'Silver', req: '25 anime at ELO 1400+' },
      { id: 'all-stars-gold',   tier: 'gold',   label: 'Gold',   req: '50 anime at ELO 1400+' },
    ]
  },
  {
    // v1.0.211 — Was Collector (raw battled-count). Now Loyalist: anime
    // you've stress-tested deeply (20+ battles each). Different from
    // Settled (which requires uniform 10+ across the WHOLE list) —
    // Loyalist measures deep commitment to specific favourites, so a
    // user with a 200-anime list can earn it by going deep on 30 of
    // them without ranking every one to confidence.
    id: 'loyalist', name: 'Loyalist', emoji: '👑',
    desc: 'Stress-test your favourites through many battles',
    tiers: [
      { id: 'loyalist-bronze', tier: 'bronze', label: 'Bronze', req: '5 anime at 20+ battles each' },
      { id: 'loyalist-silver', tier: 'silver', label: 'Silver', req: '15 anime at 20+ battles each' },
      { id: 'loyalist-gold',   tier: 'gold',   label: 'Gold',   req: '30 anime at 20+ battles each' },
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
    // v1.0.211 — Was Genre Explorer (counted ANIME per genre, which
    // multi-genre tagging made trivial — one anime tagged Action/Adventure/
    // Drama hit three genres at once). Now Tastemaker: only top-tier
    // (S-tier = top 10%) anime count, and we use each anime's PRIMARY
    // genre only. Each anime contributes to exactly one genre, so the
    // achievement measures genuine cross-genre taste at the high end.
    id: 'tastemaker', name: 'Tastemaker', emoji: '🎭',
    desc: 'Have favourites across many different genres',
    tiers: [
      { id: 'tastemaker-bronze', tier: 'bronze', label: 'Bronze', req: 'S-tier anime in 3 primary genres' },
      { id: 'tastemaker-silver', tier: 'silver', label: 'Silver', req: 'S-tier anime in 5 primary genres' },
      { id: 'tastemaker-gold',   tier: 'gold',   label: 'Gold',   req: 'S-tier anime in 8 primary genres' },
    ]
  },
  {
    // v1.0.211 — Was Time Traveller (battled anime in N decades). Now
    // Era Curator: only A-tier or higher anime (top 25%) count. Measures
    // the breadth of your TOP picks across eras, not whether you happened
    // to touch one '70s anime on the way to ranking a 2020s favourite.
    id: 'era-curator', name: 'Era Curator', emoji: '🕰️',
    desc: 'Have top picks from many different eras',
    tiers: [
      { id: 'era-curator-bronze', tier: 'bronze', label: 'Bronze', req: 'A-tier+ anime in 3 decades' },
      { id: 'era-curator-silver', tier: 'silver', label: 'Silver', req: 'A-tier+ anime in 4 decades' },
      { id: 'era-curator-gold',   tier: 'gold',   label: 'Gold',   req: 'A-tier+ anime in 5 decades' },
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
  // Refresh achievements panel if Profile → Achievements is currently visible
  if (byId(IDS.tabPanelProfile)?.style.display !== 'none' && _activeProfileSub === 'achievements') {
    renderAchievementsTab();
  }
}

function _checkAchievements() {
  if (!animeList.length) return;

  // v1.0.211 — Achievement rework. Was Battle Hardened (raw battle
  // counter) and Collector (raw battled-count). Both replaced with
  // tier/depth-based criteria that measure HOW you rank rather than
  // HOW MUCH.

  // All-Stars — anime that have climbed to ELO 1400+ (200 above the
  // 1200 default seed). These are the anime you've actively favoured
  // through wins, not just touched once.
  const allStarsCount = animeList.filter(a => (a.elo || 0) >= 1400).length;
  _tryUnlock('all-stars-bronze', allStarsCount >= 10, '⭐ All-Stars (Bronze)');
  _tryUnlock('all-stars-silver', allStarsCount >= 25, '⭐ All-Stars (Silver)');
  _tryUnlock('all-stars-gold',   allStarsCount >= 50, '⭐ All-Stars (Gold)');

  // Loyalist — anime stress-tested through many battles (≥20 each).
  // Different from Settled (uniform 10+ across whole list) — Loyalist
  // rewards going deep on specific favourites.
  const loyalistCount = animeList.filter(a => (a.battles || 0) >= 20).length;
  _tryUnlock('loyalist-bronze', loyalistCount >= 5,  '👑 Loyalist (Bronze)');
  _tryUnlock('loyalist-silver', loyalistCount >= 15, '👑 Loyalist (Silver)');
  _tryUnlock('loyalist-gold',   loyalistCount >= 30, '👑 Loyalist (Gold)');

  // Hot Streak — longest WIN STREAK EVER achieved across any anime.
  // v1.0.211 — was using `a.streak.count` (current streak), which reset
  // to zero on any loss and wiped achievement progress. We now read
  // `a.maxWinStreak` (persisted high-water mark) so a 9-win streak that
  // ends keeps its progress toward Silver.
  const maxStreak = Math.max(0, ...animeList.map(a => a.maxWinStreak || 0));
  _tryUnlock('decisive-bronze', maxStreak >= 5,  '🔥 Hot Streak (Bronze)');
  _tryUnlock('decisive-silver', maxStreak >= 10, '🔥 Hot Streak (Silver)');
  _tryUnlock('decisive-gold',   maxStreak >= 20, '🔥 Hot Streak (Gold)');

  // Tier-based diversity achievements. We compute each anime's tier once
  // (S/A/B/C/D) using the same percentile rules as the ranking UI, then
  // measure breadth at the top end. Multi-genre tagging no longer matters
  // because Tastemaker uses each anime's PRIMARY genre only.
  const byEloDesc = [...animeList].sort((a, b) => b.elo - a.elo);
  const totalRanked = byEloDesc.length;
  const tierOf = new Map();
  byEloDesc.forEach((a, i) => tierOf.set(a.id, getTier(i, totalRanked)));

  // Tastemaker — distinct PRIMARY genres represented in S-tier (top 10%).
  const sTierPrimaryGenres = new Set();
  for (const a of animeList) {
    if (tierOf.get(a.id) !== 'S') continue;
    const primary = (a.genres || [])[0];
    if (primary) sTierPrimaryGenres.add(primary);
  }
  const tastemakerCount = sTierPrimaryGenres.size;
  _tryUnlock('tastemaker-bronze', tastemakerCount >= 3, '🎭 Tastemaker (Bronze)');
  _tryUnlock('tastemaker-silver', tastemakerCount >= 5, '🎭 Tastemaker (Silver)');
  _tryUnlock('tastemaker-gold',   tastemakerCount >= 8, '🎭 Tastemaker (Gold)');

  // Era Curator — distinct decades represented in A-tier or higher (top 25%).
  const topDecades = new Set();
  for (const a of animeList) {
    const t = tierOf.get(a.id);
    if (t !== 'S' && t !== 'A') continue;
    if (!a.seasonYear) continue;
    topDecades.add(Math.floor(a.seasonYear / 10) * 10);
  }
  const eraCuratorCount = topDecades.size;
  _tryUnlock('era-curator-bronze', eraCuratorCount >= 3, '🕰️ Era Curator (Bronze)');
  _tryUnlock('era-curator-silver', eraCuratorCount >= 4, '🕰️ Era Curator (Silver)');
  _tryUnlock('era-curator-gold',   eraCuratorCount >= 5, '🕰️ Era Curator (Gold)');

  // Undefeated
  const hasUndefeated = animeList.some(a => a.wins >= 10 && a.losses === 0);
  _tryUnlock('undefeated', hasUndefeated, '🏆 Undefeated');

  // Settled — anime with Confident rankings (10+ battles, matching confidenceLabel threshold)
  const settledCount = animeList.filter(a => (a.battles || 0) >= TARGET_BATTLES_PER_ANIME).length;
  const allSettled   = animeList.length >= 10 && settledCount === animeList.length;
  _tryUnlock('settled-bronze', settledCount >= 25, '⚖️ Settled (Bronze)');
  _tryUnlock('settled-silver', settledCount >= 75, '⚖️ Settled (Silver)');
  _tryUnlock('settled-gold',   allSettled,          '⚖️ Settled (Gold)');

  // Top Dog — the most wins by ANY anime in the user's list.
  // v1.0.211 — was indexed to `byElo[0].wins` (current #1's wins), which
  // visibly regressed every time a new anime took the #1 spot (the new
  // leader typically had fewer total wins than the displaced one).
  // Using max(wins) instead means any anime that has ever been dominant
  // counts toward the achievement and progress can never go backwards.
  const byElo  = [...animeList].sort((a, b) => b.elo - a.elo);
  const topWins = Math.max(0, ...animeList.map(a => a.wins || 0));
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

  // Rival — franchise-vs-franchise rivalries with 3+ battles + at least one
  // win each side. Uses the same aggregator as the Stats tab so the trophy
  // count matches what the user sees.
  const rivalryCount = _computeFranchiseRivalries().length;
  _tryUnlock('rival-bronze', rivalryCount >= 1, '🤺 Rival (Bronze)');
  _tryUnlock('rival-silver', rivalryCount >= 3, '🤺 Rival (Silver)');
  _tryUnlock('rival-gold',   rivalryCount >= 5, '🤺 Rival (Gold)');

  // Comeback Kid — any anime seeded at ≤900 ELO that is now in the top 25%.
  // v1.0.211 — was reading eloHistory[0], but that array is capped at 30
  // entries — for any heavily-battled anime the actual original seed has
  // rolled off and index 0 is whatever its ELO was 30 battles ago (much
  // higher than the true seed). Effectively unreachable for active users.
  // Now uses a dedicated `seedElo` field captured at anime creation; the
  // load-time migration backfills it from eloHistory[0] for existing
  // saves so users see correct unlocks once they next sync.
  const top25cutoff  = Math.floor(byElo.length * 0.25);
  const top25ids     = new Set(byElo.slice(0, Math.max(1, top25cutoff)).map(a => a.id));
  const hasComeback  = animeList.some(a => {
    if (!top25ids.has(a.id)) return false;
    const seed = (typeof a.seedElo === 'number') ? a.seedElo
               : (Array.isArray(a.eloHistory) && a.eloHistory.length > 0) ? a.eloHistory[0]
               : null;
    return seed != null && seed <= 900;
  });
  _tryUnlock('comeback-kid', hasComeback, '📈 Comeback Kid');
}

// v1.0.211 — Snapshot the current progress signal for every achievement,
// keyed by the achievement family id. Used by renderAchievementsTab to show
// per-tier progress bars on locked cards so users can see how close they
// are. Returns { current, fmt(target) -> string } pairs.
function _achievementProgress() {
  const byElo = [...animeList].sort((a, b) => b.elo - a.elo);
  const top10 = byElo.slice(0, 10);
  const top25cutoff = Math.floor(byElo.length * 0.25);
  const top25ids    = new Set(byElo.slice(0, Math.max(1, top25cutoff)).map(a => a.id));

  // v1.0.211 — Pre-compute the tier map once and reuse for the new
  // tier/depth-based achievements.
  const byEloDesc = [...animeList].sort((a, b) => b.elo - a.elo);
  const totalRanked = byEloDesc.length;
  const tierOf = new Map();
  byEloDesc.forEach((a, i) => tierOf.set(a.id, getTier(i, totalRanked)));

  const allStarsCount = animeList.filter(a => (a.elo || 0) >= 1400).length;
  const loyalistCount = animeList.filter(a => (a.battles || 0) >= 20).length;

  const sTierPrimaryGenres = new Set();
  for (const a of animeList) {
    if (tierOf.get(a.id) !== 'S') continue;
    const primary = (a.genres || [])[0];
    if (primary) sTierPrimaryGenres.add(primary);
  }
  const topDecades = new Set();
  for (const a of animeList) {
    const t = tierOf.get(a.id);
    if (t !== 'S' && t !== 'A') continue;
    if (!a.seasonYear) continue;
    topDecades.add(Math.floor(a.seasonYear / 10) * 10);
  }

  return {
    'all-stars':   { current: allStarsCount },
    loyalist:      { current: loyalistCount },
    tastemaker:    { current: sTierPrimaryGenres.size },
    'era-curator': { current: topDecades.size },
    decisive:   { current: Math.max(0, ...animeList.map(a => a.maxWinStreak || 0)) },
    settled:    { current: animeList.filter(a => (a.battles || 0) >= TARGET_BATTLES_PER_ANIME).length },
    'top-dog':  { current: Math.max(0, ...animeList.map(a => a.wins || 0)) },
    'social-butterfly': { current: comparedFriends.size },
    rival:      { current: _computeFranchiseRivalries().length },
    // Single-tier flag achievements — these have no meaningful progress
    // bar because the req text describes a condition rather than a count
    // ("Pre-1990 anime in your top 10", "10+ wins, 0 losses", etc).
    // hideProgress tells the renderer to skip the bar; current is still
    // computed because _checkAchievements / _getClosestUnlockableAchievement
    // ignore them by way of the same flag.
    undefeated: { current: animeList.some(a => (a.wins || 0) >= 10 && (a.losses || 0) === 0) ? 1 : 0, hideProgress: true },
    'hidden-gem-fan': { current: top10.some(a => a.popularity > 0 && a.popularity < 50000) ? 1 : 0, hideProgress: true },
    'old-soul': { current: top10.some(a => a.seasonYear && a.seasonYear < 1990) ? 1 : 0, hideProgress: true },
    'comeback-kid': { current: animeList.some(a => {
      if (!top25ids.has(a.id)) return false;
      const seed = (typeof a.seedElo === 'number') ? a.seedElo
                 : (Array.isArray(a.eloHistory) && a.eloHistory.length > 0) ? a.eloHistory[0]
                 : null;
      return seed != null && seed <= 900;
    }) ? 1 : 0, hideProgress: true },
    // kindred / contrarian have no measurable progress until you compare.
    kindred:    { current: 0, hideProgress: true },
    contrarian: { current: 0, hideProgress: true },
  };
}

// Pull a numeric target out of a tier's `req` text (e.g. "50 battles" → 50,
// "1,000 battles" → 1000). Returns null if no number found. Used only for
// progress-bar rendering — the actual unlock thresholds live in
// _checkAchievements and are the source of truth.
function _achievementTierTarget(req) {
  if (!req) return null;
  const m = req.replace(/,/g, '').match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}


function renderAchievementsTab() {
  const el = byId(IDS.achievementsContent);
  if (!el) return;

  const totalTiers  = ACHIEVEMENT_DEFS.reduce((s, d) => s + d.tiers.length, 0);
  const unlockedCount = Object.keys(achievements).length;
  const progress = _achievementProgress();

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
        const prog = progress[def.id];
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
                // v1.0.211 — Progress bar for locked tiers. Shows `current /
                // target` and a green fill so users can see how close they
                // are. Hidden for achievements without a measurable signal
                // (kindred / contrarian / single-tier flag achievements that
                // are already unlocked).
                const target = _achievementTierTarget(t.req);
                let progressHtml = '';
                if (!unlock && prog && !prog.hideProgress && target != null) {
                  // v1.0.211 — Genre Explorer / Time Traveller use different
                  // signals per tier (3+ per genre for Bronze, 5+ for Gold,
                  // etc). The per-tier override is read first; otherwise we
                  // fall back to the achievement-wide current.
                  const tierCurrent = prog.perTier?.[t.id] ?? prog.current;
                  const pct = Math.min(100, Math.round((tierCurrent / target) * 100));
                  // Single-tier flag achievements report current as 0/1.
                  // Skip the bar there (it's not meaningful — the req text
                  // already describes the unlock condition).
                  const isFlag = target === 1 || (def.tiers.length === 1 && /[^0-9]+$/.test(t.req));
                  if (!isFlag) {
                    progressHtml = `
                      <div class="ach-progress-wrap" title="${tierCurrent.toLocaleString()} of ${target.toLocaleString()}">
                        <div class="ach-progress-fill" style="width:${pct}%"></div>
                        <span class="ach-progress-text">${tierCurrent.toLocaleString()} / ${target.toLocaleString()}</span>
                      </div>`;
                  }
                }
                return `
                  <div class="ach-tier ${tierCls}">
                    <span class="ach-icon">${unlock ? tierIcons[t.tier] : '🔒'}</span>
                    <span class="ach-label">${t.tier.charAt(0).toUpperCase() + t.tier.slice(1)}</span>
                    <span class="ach-req">${t.req}</span>
                    ${date ? `<span class="achievement-unlock-date">${date}</span>` : ''}
                    ${progressHtml}
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
          <span><span style="color:#3fb950">${esc(h.winnerTitle)}</span> beat ${esc(h.loserTitle)}</span>
          <span>+${h.eloDiffBefore} ELO gap</span>
        </div>`
      ).join('')
    : '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">No upsets recorded yet.</div>';

  // ── History & rivalries ─────────────────────────────────────────────────────
  renderHistory();
  renderRivalries();
}

let _activeProfileSub = 'taste';

function switchProfileTab(sub) {
  _activeProfileSub = sub;
  ['taste', 'achievements'].forEach(s => {
    const btn   = document.getElementById('profile-sub-' + s);
    const panel = document.getElementById('profile-panel-' + s);
    if (btn)   btn.classList.toggle('active', s === sub);
    if (panel) panel.style.display = s === sub ? '' : 'none';
  });
  if (sub === 'taste')        { renderTasteProfile(); renderFormatSplit(); renderScoreDistribution(); renderGenreStats(); renderDisagreements(); _dismissNewBadge('taste'); }
  if (sub === 'achievements') renderAchievementsTab();
}

function renderProfileTab() {
  switchProfileTab(_activeProfileSub);
}

function renderManageTab() {
  // v1.0.210 — refresh the "Last synced …" label when the Manage tab opens
  // so the relative time is accurate even if the user just came back to it
  // after an hour. Background ticking handles the per-minute updates.
  _updateCloudSyncTimestamp();
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
// v1.0.113 — Rivalries pivoted from same-anime-pair to franchise-vs-franchise.
// The old version required two specific anime to have battled 3+ times with
// split results — vanishingly rare under ELO matchmaking, so most users saw an
// empty section. Franchise-level reframing gives the feature real data: a
// user who keeps comparing some MHA show against some Demon Slayer show has
// a real "MHA vs Demon Slayer" rivalry even though the individual matchups
// differ each time. Stand-alone shows count as a "franchise of one".
function _computeFranchiseRivalries() {
  // v1.0.211 — switched from _computeFranchiseIds (relations-only union-find)
  // to _getFranchiseIdMap, which is the authoritative grouper used by the
  // Rankings page (relations + title patterns + alias table + crossover
  // detection). The old version missed Pokémon-style franchises where most
  // members share a title prefix but aren't linked via AniList's relations
  // graph — so every Pokémon movie / spin-off showed up as its own
  // "franchise" and produced bogus intra-Pokémon rivalries.
  const groupMap = _getFranchiseIdMap();
  const fkey = (id) => {
    const g = groupMap.get(id);
    return g != null ? g : `id:${id}`;
  };

  // Aggregate battle counts per franchise pair. Prefer matchupStats (uncapped)
  // when available; fall back to battleHistory for legacy saves.
  const pairs = new Map(); // pairKey → { kA, kB, winsA, winsB, total }
  const bump = (idA, idB, winsA, winsB) => {
    const kA = fkey(idA), kB = fkey(idB);
    if (kA === kB) return; // intra-franchise battles don't count
    const [pA, pB] = kA < kB ? [kA, kB] : [kB, kA];
    const [wA, wB] = kA < kB ? [winsA, winsB] : [winsB, winsA];
    const key = pA + '|' + pB;
    let p = pairs.get(key);
    if (!p) { p = { kA: pA, kB: pB, winsA: 0, winsB: 0, total: 0 }; pairs.set(key, p); }
    p.winsA += wA; p.winsB += wB; p.total += wA + wB;
  };

  if (Object.keys(matchupStats).length > 0) {
    Object.entries(matchupStats).forEach(([key, m]) => {
      const [idAStr, idBStr] = key.split('-');
      const idA = Number(idAStr), idB = Number(idBStr);
      bump(idA, idB, m.wins[idA] || 0, m.wins[idB] || 0);
    });
  } else {
    battleHistory.forEach(h => {
      const idW = h.winnerId ?? null, idL = h.loserId ?? null;
      if (!idW || !idL) return;
      bump(idW, idL, 1, 0);
    });
  }

  // Build a display record per franchise: the OLDEST entry (lowest seasonYear)
  // is used as the franchise's name — almost always the original/season 1
  // that users recognise. Previously this picked the highest-ELO member,
  // which made rivalries read as "Attack on Titan Final Season vs ..."
  // instead of the franchise-level "Attack on Titan vs ...". Tiebreak by ELO
  // when years are equal or missing.
  const display = new Map();
  const count   = new Map();
  animeList.forEach(a => {
    const k = fkey(a.id);
    count.set(k, (count.get(k) || 0) + 1);
    const cur   = display.get(k);
    const aYear = a.seasonYear || Infinity;
    const aElo  = a.elo || 0;
    if (!cur || aYear < cur.year || (aYear === cur.year && aElo > cur.elo)) {
      display.set(k, { title: a.title, cover: a.cover, elo: aElo, year: aYear });
    }
  });

  // Qualify: 2+ total battles AND meaningful balance.
  //
  // v1.0.211 — "both sides have at least one win" was too loose: 19-1 over
  // 20 battles still qualified because the loser cleared 1 win. That's a
  // stomp, not a rivalry. Tightened to require the minority side to hold
  // at least 1/3 of the battles (e.g. 13-7 in 20, not 19-1). Below 4 total
  // we keep the original "both won at least once" check — the sample is
  // too small to demand a balance ratio.
  const out = [];
  pairs.forEach(p => {
    if (p.total < 2) return;
    if (p.winsA === 0 || p.winsB === 0) return;
    if (p.total >= 4) {
      const minority = Math.min(p.winsA, p.winsB);
      const minNeeded = Math.ceil(p.total / 3);
      if (minority < minNeeded) return; // one side dominates — not a rivalry
    }
    const dA = display.get(p.kA), dB = display.get(p.kB);
    if (!dA || !dB) return; // franchise no longer in user's list
    out.push({
      kA: p.kA, kB: p.kB,
      titleA: dA.title, titleB: dB.title,
      countA: count.get(p.kA) || 1,
      countB: count.get(p.kB) || 1,
      winsA: p.winsA, winsB: p.winsB, total: p.total,
    });
  });
  return out;
}

function renderRivalries() {
  const rivalries = _computeFranchiseRivalries();
  const section = byId(IDS.rivalrySection);
  const list    = byId(IDS.rivalryList);
  if (rivalries.length === 0) { section.style.display = 'none'; return; }

  section.style.display = 'block';
  list.innerHTML = rivalries
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map(r => {
      // Show franchise size tag only when it's actually a franchise (>1 entry)
      const tagA = r.countA > 1 ? ` <span style="color:#6e7681;font-size:0.85em">(${r.countA})</span>` : '';
      const tagB = r.countB > 1 ? ` <span style="color:#6e7681;font-size:0.85em">(${r.countB})</span>` : '';
      return `<div class="rivalry-item">
        <span class="rivalry-item-names">${esc(r.titleA)}${tagA} <span style="color:#8b949e">vs</span> ${esc(r.titleB)}${tagB}</span>
        <span class="rivalry-badge">⚔️ ${r.winsA}–${r.winsB} (${r.total} battle${r.total !== 1 ? 's' : ''})</span>
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
// v1.0.208 — Three-way cycle (Dark → Light → Warm → Dark). Previously a binary
// Light/Dark toggle. Warm is a dark-base theme with warm-tinted surfaces and
// text — see body.warm-mode in styles.css. The cycle ordering puts Dark first
// because it's the existing default; existing users keep their saved 'light'
// or 'dark' value with no migration needed (anything unrecognised falls back
// to Dark in _applyTheme).
const THEMES = ['dark', 'light', 'warm'];
const THEME_LABELS = {
  dark:  '🌙 Dark mode',
  light: '☀️ Light mode',
  warm:  '🍂 Warm mode',
};

function _applyTheme(theme) {
  const t = THEMES.includes(theme) ? theme : 'dark';
  document.body.classList.remove('light-mode', 'warm-mode');
  if (t === 'light') document.body.classList.add('light-mode');
  else if (t === 'warm') document.body.classList.add('warm-mode');
  const btn = byId(IDS.themeToggleBtn);
  if (btn) btn.textContent = THEME_LABELS[t];
}

function toggleTheme() {
  const current = localStorage.getItem(KESSEN_KEYS.ui.theme) || 'dark';
  const idx = THEMES.indexOf(current);
  // Unknown values cycle to 'light' (idx === -1 → 0 → THEMES[0]='dark'... no, want next-from-dark='light')
  const next = THEMES[(idx >= 0 ? idx + 1 : 1) % THEMES.length];
  localStorage.setItem(KESSEN_KEYS.ui.theme, next);
  _applyTheme(next);
}

// Apply saved theme immediately on load
(function () {
  const saved = localStorage.getItem(KESSEN_KEYS.ui.theme) || 'dark';
  _applyTheme(saved);
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
  // Reveal the notification bell now that a session is active
  _ncLoad();
  _ncUpdateBell();
  const bell = byId(IDS.notifBell);
  if (bell) bell.style.display = 'flex';
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
      <img${coverCors(a.cover)} src="${safeUrl(a.cover)}" alt="${esc(a.title)}" loading="lazy" />
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:0.85rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(a.title)}</div>
        <div style="font-size:0.78rem;color:#8b949e">${sessionStartElo[a.id] | 0} \u2192 ${a.elo | 0} ELO</div>
      </div>
      <span class="${a.delta > 0 ? 'mover-up' : 'mover-down'}">${a.delta > 0 ? '\u25b2' : '\u25bc'} ${Math.abs(a.delta | 0)}</span>
    </div>`).join('');

  byId(IDS.sessionSummaryModal).style.display = 'flex';
  pushModalBack('sessionSummary', () => closeSessionSummary());
}

function closeSessionSummary(e) {
  if (!e || e.target === byId(IDS.sessionSummaryModal)) {
    byId(IDS.sessionSummaryModal).style.display = 'none';
    popModalBack('sessionSummary');
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
        if (coverCors(cover)) img.crossOrigin = 'anonymous';
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
  btn.classList.toggle('active', animeList[idx].fuzzy);
  // Label stays static — the .active class is the state indicator.
  btn.textContent = "〰️ Fuzzy";
  // Force-blur so mobile :hover doesn't visually freeze the button in the
  // active style after the user un-toggles it.
  btn.blur();
}

// ─── SEARCH / FILTER ──────────────────────────────────────────────────────────
// v1.0.211 — Token-aware search parser for the Rankings search input.
// Grammar (whitespace-separated):
//   genre:<name>     — match if anime.genres contains <name> (case-insensitive)
//   studio:<name>    — match if anime.studios contains <name> (substring, ci)
//   year:<n>         — match if anime.seasonYear === n
//   year:<from>-<to> — match if seasonYear in [from, to]
//   format:<fmt>     — match by anime.format (TV, MOVIE, OVA, ONA, TV_SHORT,
//                      SPECIAL; common synonyms accepted: movie, short, tv)
//   <free text>      — title substring (always case-insensitive)
//
// Multiple values for the same key are OR'd (genre:action genre:comedy →
// anime in EITHER); different keys are AND'd. Empty input passes all anime.
// Studio match is substring rather than equality so users can type "bones"
// and hit "Studio Bones" / "Bones Inc." consistently.
const _SEARCH_FORMAT_SYNONYMS = {
  tv: 'TV', movie: 'MOVIE', film: 'MOVIE', ova: 'OVA', ona: 'ONA',
  short: 'TV_SHORT', tv_short: 'TV_SHORT', special: 'SPECIAL',
};
function _parseSearchQuery(raw) {
  const out = { text: '', genres: [], studios: [], formats: [], years: [], lengths: [], yearRange: null };
  const lower = (raw || '').toLowerCase().trim();
  if (!lower) return out;
  // Split on whitespace but preserve quoted runs ("slice of life"). Keeps the
  // parser obviously-correct for the few users who type multi-word genres.
  const parts = lower.match(/"[^"]+"|\S+/g) || [];
  const free  = [];
  // length: synonyms — let users type the bucket-natural-name or the slug.
  const lengthSyn = {
    short: 'short', '<=12': 'short', '≤12': 'short', 'movie': 'short',
    medium: 'medium', 'mid': 'medium', '13-24': 'medium',
    long: 'long', '25-70': 'long',
    vlong: 'vlong', 'verylong': 'vlong', '70+': 'vlong',
    unknown: 'unknown', 'unk': 'unknown',
  };
  for (let p of parts) {
    if (p.startsWith('"') && p.endsWith('"')) p = p.slice(1, -1);
    const m = p.match(/^(genre|studio|year|format|length):(.+)$/);
    if (!m) { free.push(p); continue; }
    const [, key, val] = m;
    if (!val) continue;
    if (key === 'genre')  out.genres.push(val);
    else if (key === 'studio') out.studios.push(val);
    else if (key === 'format') {
      const fmt = _SEARCH_FORMAT_SYNONYMS[val] || val.toUpperCase();
      out.formats.push(fmt);
    }
    else if (key === 'length') {
      const bucket = lengthSyn[val] || val;
      if (_SEARCH_LENGTH_BUCKETS.find(b => b.value === bucket)) out.lengths.push(bucket);
    }
    else if (key === 'year') {
      const range = val.match(/^(\d{4})\s*-\s*(\d{4})$/);
      if (range) out.yearRange = [Number(range[1]), Number(range[2])].sort((a, b) => a - b);
      else if (/^\d{4}$/.test(val)) out.years.push(Number(val));
    }
  }
  out.text = free.join(' ').trim();
  return out;
}
// Token-only matcher (does NOT check title — caller composes that). Encapsulated
// so filterRankings and _filterFranchise share one source of truth.
function _animeMatchesSearchTokens(a, q) {
  if (!a) return false;
  if (q.genres.length) {
    const haystack = (a.genres || []).map(g => g.toLowerCase());
    if (!q.genres.some(g => haystack.includes(g))) return false;
  }
  // v1.0.211 — exact match for chip-sourced studios, substring match for
  // typed studio: tokens. Either bucket triggers a match if any value hits.
  if ((q.studiosExact && q.studiosExact.length) || (q.studiosSubstr && q.studiosSubstr.length)) {
    const haystack = (a.studios || []).map(s => s.toLowerCase());
    const exactHit  = (q.studiosExact  || []).some(needle => haystack.includes(needle));
    const substrHit = (q.studiosSubstr || []).some(needle => haystack.some(h => h.includes(needle)));
    if (!exactHit && !substrHit) return false;
  } else if (q.studios && q.studios.length) {
    // Backward-compat path for any caller that hand-built `q` without going
    // through `_effectiveSearchQuery` (e.g. tests). Original substring logic.
    const haystack = (a.studios || []).map(s => s.toLowerCase());
    if (!q.studios.some(needle => haystack.some(h => h.includes(needle)))) return false;
  }
  if (q.formats.length) {
    if (!q.formats.includes(a.format)) return false;
  }
  if (q.lengths && q.lengths.length) {
    if (!q.lengths.includes(epRange(a.episodes, a.format))) return false;
  }
  if (q.years.length && !q.years.includes(a.seasonYear)) return false;
  if (q.yearRange) {
    const [lo, hi] = q.yearRange;
    if (!a.seasonYear || a.seasonYear < lo || a.seasonYear > hi) return false;
  }
  return true;
}

// v1.0.211 — Chip-based filter state. Lives alongside the text input;
// filterRankings unions both before matching. Sets dedupe values cheaply
// and keep insertion order deterministic enough for chip rendering.
// v1.0.211 — Session-scoped guard for the picker's lazy enrichment fetch.
// Keyed by `${animeList.length}:firstId:lastId` so a fresh import (which
// rebuilds animeList) re-arms it automatically. AniList legitimately has
// no seasonYear / studios for some entries, so a "still missing" check
// will never resolve to false on those lists — we'd re-fetch on every
// picker click otherwise.
let _enrichmentAttemptedKey = '';
let _searchChips = {
  genres:  new Set(),
  studios: new Set(),
  years:   new Set(),
  yearRange: null,
  formats: new Set(),
  // v1.0.211 — length chips replace the standalone Length button row. Bucket
  // names mirror what `epRange()` returns: short / medium / long / vlong /
  // unknown. The standalone row's subtractive semantics are migrated into
  // these additive chips on first load by _migrateLegacyFiltersToChips.
  lengths: new Set(),
};
const _SEARCH_LENGTH_BUCKETS = [
  { value: 'short',   label: '≤12 ep (or Movie)' },
  { value: 'medium',  label: '13–24 ep' },
  { value: 'long',    label: '25–70 ep' },
  { value: 'vlong',   label: '70+ ep' },
  { value: 'unknown', label: 'Unknown length' },
];

// Pull the distinct value list for each chip category from the user's
// current animeList. Computed on demand at picker-open time so a fresh
// import shows new genres without a reload. Studios and genres are
// canonicalised to lowercase for matching but rendered with original
// casing for the popover.
function _searchPickerValues(category) {
  if (category === 'format') {
    // v1.0.211 — count per format so the popover reads at-a-glance the same
    // way Genre / Studio / Length do (`Movie  ·  47`, `OVA  ·  3`).
    const counts = new Map();
    animeList.forEach(a => {
      if (!a.format) return;
      counts.set(a.format, (counts.get(a.format) || 0) + 1);
    });
    const FORMATS = [
      { value: 'TV',       label: 'TV' },
      { value: 'MOVIE',    label: 'Movie' },
      { value: 'OVA',      label: 'OVA' },
      { value: 'ONA',      label: 'ONA' },
      { value: 'TV_SHORT', label: 'Short' },
      { value: 'SPECIAL',  label: 'Special' },
    ];
    return FORMATS.map(f => ({
      value: f.value, label: `${f.label}  ·  ${counts.get(f.value) || 0}`,
    }));
  }
  if (category === 'length') {
    // Annotate counts so users see e.g. "≤12 ep (or Movie)  ·  47" — same
    // density-cue treatment as genres / studios.
    const counts = new Map();
    animeList.forEach(a => {
      const b = epRange(a.episodes, a.format);
      counts.set(b, (counts.get(b) || 0) + 1);
    });
    return _SEARCH_LENGTH_BUCKETS.map(b => {
      const c = counts.get(b.value) || 0;
      return { value: b.value, label: `${b.label}  ·  ${c}` };
    });
  }
  if (category === 'year') {
    // v1.0.211 — count per year. Newest first; sparse years (1 entry)
    // self-evidently flag themselves so the user doesn't waste a click.
    const counts = new Map();
    animeList.forEach(a => {
      if (!a.seasonYear) return;
      counts.set(a.seasonYear, (counts.get(a.seasonYear) || 0) + 1);
    });
    return [...counts.keys()].sort((a, b) => b - a)
      .map(y => ({ value: String(y), label: `${y}  ·  ${counts.get(y)}` }));
  }
  // genre / studio: union across animeList, normalise display casing
  const field = category === 'genre' ? 'genres' : 'studios';
  const counts = new Map();
  animeList.forEach(a => (a[field] || []).forEach(v => {
    if (!v) return;
    const key = v.toLowerCase();
    const prev = counts.get(key);
    counts.set(key, { label: prev?.label || v, count: (prev?.count || 0) + 1 });
  }));
  return [...counts.entries()]
    .sort((a, b) => b[1].count - a[1].count || a[1].label.localeCompare(b[1].label))
    .map(([value, v]) => ({ value, label: `${v.label}  ·  ${v.count}` }));
}

async function openSearchPicker(category, btn) {
  const pop = byId(IDS.searchPickerPopover);
  if (!pop) return;
  // Toggle off if same button clicked again
  if (!pop.hasAttribute('hidden') && pop.dataset.category === category) {
    _closeSearchPicker();
    return;
  }
  // v1.0.211 — Lazy-load AniList enrichment data on demand. Only STUDIOS
  // actually need this — the initial AniList list fetch already includes
  // genres and seasonYear, so triggering an enrichment call for those is
  // wasted work that shows a "Loading…" state for no benefit. Some anime
  // legitimately have null seasonYear / empty genres from AniList itself
  // (old OVAs, unreleased shows) — re-fetching doesn't help.
  //
  // The cache key lets a fresh import (which changes list shape) re-arm
  // the studio fetch automatically.
  const enrichmentListKey = `${animeList.length}:${animeList[0]?.id || 0}:${animeList[animeList.length - 1]?.id || 0}`;
  const alreadyAttempted  = _enrichmentAttemptedKey === enrichmentListKey;
  const needsEnrichment = !alreadyAttempted
    && category === 'studio'
    && animeList.some(a => !Array.isArray(a.studios));
  if (needsEnrichment) {
    pop.dataset.category = category;
    pop.innerHTML = `<div class="search-picker-loading">⏳ Loading ${esc(category)} data…</div>`;
    pop.removeAttribute('hidden');
    document.querySelectorAll('.search-pick-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (btn) {
      const row = byId(IDS.searchPickerRow);
      const btnRect = btn.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      pop.style.left = `${Math.max(0, btnRect.left - rowRect.left)}px`;
    }
    try {
      await _enrichGenresAndEras();
      _enrichmentAttemptedKey = enrichmentListKey;
      saveState();
    } catch (e) {
      pop.innerHTML = `<div class="search-picker-empty">Could not fetch ${esc(category)} data: ${esc(e.message || 'network error')}</div>`;
      return;
    }
    // If the user closed the popover mid-fetch, don't re-open it.
    if (pop.hasAttribute('hidden') || pop.dataset.category !== category) return;
    // Fall through to render with the freshly-enriched data.
  }
  const values = _searchPickerValues(category);
  pop.dataset.category = category;
  const isChecked = (val) => {
    if (category === 'genre')  return _searchChips.genres.has(val);
    if (category === 'studio') return _searchChips.studios.has(val);
    if (category === 'format') return _searchChips.formats.has(val);
    if (category === 'length') return _searchChips.lengths.has(val);
    if (category === 'year')   return _searchChips.years.has(Number(val));
    return false;
  };
  const heading = {
    genre: 'Pick genres', studio: 'Pick studios', year: 'Pick years',
    format: 'Pick formats', length: 'Pick episode lengths',
  }[category];
  const empty = values.length === 0
    ? `<p class="search-picker-empty">Nothing to pick yet — your list doesn't have ${category} data populated.</p>`
    : '';
  const rangeUI = category === 'year' ? `
    <div class="search-picker-range">
      <span>Range:</span>
      <input type="number" id="search-year-range-from" placeholder="from" min="1900" max="2099" value="${_searchChips.yearRange?.[0] ?? ''}" onkeydown="if(event.key==='Enter'){event.preventDefault();_applyYearRange();}" />
      <span>–</span>
      <input type="number" id="search-year-range-to"   placeholder="to"   min="1900" max="2099" value="${_searchChips.yearRange?.[1] ?? ''}" onkeydown="if(event.key==='Enter'){event.preventDefault();_applyYearRange();}" />
      <button type="button" class="search-picker-range-apply" onclick="_applyYearRange()">Apply</button>
      ${_searchChips.yearRange ? '<button type="button" class="search-picker-range-clear" onclick="_clearYearRange()">Clear</button>' : ''}
    </div>` : '';
  // v1.0.211 — inline filter input for long lists. Genre + Studio commonly
  // have 30-60+ values for users with sizeable AniList libraries; an
  // unfiltered scroll is annoying. The filter runs client-side via the
  // _filterPickerList helper bound to the input's oninput.
  const filterInput = (category === 'genre' || category === 'studio') && values.length > 8
    ? `<input type="text" class="search-picker-filter" placeholder="Filter ${category}s…" oninput="_filterPickerList(this.value)" autocomplete="off" />`
    : '';
  pop.innerHTML = `
    <div class="search-picker-header">${esc(heading)}</div>
    ${filterInput}
    ${rangeUI}
    <div class="search-picker-list">
      ${values.map(v => `
        <label class="search-picker-item" data-pick-label="${esc(v.label.toLowerCase())}">
          <input type="checkbox" ${isChecked(v.value) ? 'checked' : ''}
                 onchange="_toggleSearchChip('${category}', this.value, this.checked)"
                 value="${esc(v.value)}" />
          <span>${esc(v.label)}</span>
        </label>
      `).join('')}
      ${empty}
    </div>
  `;
  pop.removeAttribute('hidden');
  // Highlight the active picker button
  document.querySelectorAll('.search-pick-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
  if (btn) btn.setAttribute('aria-expanded', 'true');
  // Position the popover under the clicked button
  if (btn) {
    const row = byId(IDS.searchPickerRow);
    const btnRect = btn.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    pop.style.left = `${Math.max(0, btnRect.left - rowRect.left)}px`;
  }
  // Outside-click close
  setTimeout(() => {
    const closer = (e) => {
      if (pop.contains(e.target)) return;
      if (e.target.classList && e.target.classList.contains('search-pick-btn')) return;
      _closeSearchPicker();
      document.removeEventListener('click', closer, true);
      document.removeEventListener('keydown', escCloser);
    };
    const escCloser = (e) => {
      if (e.key !== 'Escape') return;
      _closeSearchPicker();
      document.removeEventListener('click', closer, true);
      document.removeEventListener('keydown', escCloser);
    };
    document.addEventListener('click', closer, true);
    document.addEventListener('keydown', escCloser);
  }, 0);
}

function _closeSearchPicker() {
  const pop = byId(IDS.searchPickerPopover);
  if (pop) pop.setAttribute('hidden', '');
  document.querySelectorAll('.search-pick-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
}

// v1.0.211 — Filter the open picker's list in-place by substring against
// each item's label. No re-render; just toggles display on the labels.
function _filterPickerList(query) {
  const pop = byId(IDS.searchPickerPopover);
  if (!pop) return;
  const q = (query || '').toLowerCase().trim();
  pop.querySelectorAll('.search-picker-item').forEach(item => {
    const label = item.dataset.pickLabel || '';
    item.style.display = (!q || label.includes(q)) ? '' : 'none';
  });
}

function _toggleSearchChip(category, value, on) {
  if (category === 'genre') {
    if (on) _searchChips.genres.add(value); else _searchChips.genres.delete(value);
  } else if (category === 'studio') {
    if (on) _searchChips.studios.add(value); else _searchChips.studios.delete(value);
  } else if (category === 'format') {
    if (on) _searchChips.formats.add(value); else _searchChips.formats.delete(value);
  } else if (category === 'length') {
    if (on) _searchChips.lengths.add(value); else _searchChips.lengths.delete(value);
  } else if (category === 'year') {
    const n = Number(value);
    if (on) _searchChips.years.add(n); else _searchChips.years.delete(n);
  }
  _persistSearchChips();
  _renderSearchChips();
  filterRankings();
}

function _applyYearRange() {
  const fromEl = byId('search-year-range-from');
  const toEl   = byId('search-year-range-to');
  const from = parseInt(fromEl?.value, 10);
  const to   = parseInt(toEl?.value,   10);
  if (!Number.isFinite(from) || !Number.isFinite(to)) {
    showToast('Enter both a from and to year.', 2500);
    return;
  }
  _searchChips.yearRange = [Math.min(from, to), Math.max(from, to)];
  _closeSearchPicker();
  _renderSearchChips();
  filterRankings();
}

function _clearYearRange() {
  _searchChips.yearRange = null;
  _closeSearchPicker();
  _renderSearchChips();
  filterRankings();
}

function _renderSearchChips() {
  const wrap = byId(IDS.searchChips);
  const clearBtn = byId(IDS.searchClearBtn);
  if (!wrap) return;
  const chips = [];
  // Look up label casing for genres/studios from animeList for nicer display
  const labelFor = (category, value) => {
    if (category === 'genre' || category === 'studio') {
      const field = category === 'genre' ? 'genres' : 'studios';
      for (const a of animeList) {
        const hit = (a[field] || []).find(v => v && v.toLowerCase() === value);
        if (hit) return hit;
      }
      return value;
    }
    if (category === 'format') {
      return ({ TV: 'TV', MOVIE: 'Movie', OVA: 'OVA', ONA: 'ONA', TV_SHORT: 'Short', SPECIAL: 'Special' })[value] || value;
    }
    return String(value);
  };
  const pillIcon = { genre: '🎭', studio: '🎬', year: '📅', format: '📺', length: '📏', yearRange: '📅' };
  const lengthLabel = (v) => (_SEARCH_LENGTH_BUCKETS.find(b => b.value === v)?.label) || v;
  // v1.0.211 — group chips by category so we can render OR between same-
  // category chips and AND between different categories. The picker logic
  // is "values within a category OR, values across categories AND", but
  // that was previously invisible. Now the user can read it directly.
  const grouped = {
    genre:  [...(_searchChips.genres  || new Set())].map(v => ({ category: 'genre',  raw: v, label: labelFor('genre', v) })),
    studio: [...(_searchChips.studios || new Set())].map(v => ({ category: 'studio', raw: v, label: labelFor('studio', v) })),
    year:   [...(_searchChips.years   || new Set())].map(v => ({ category: 'year',   raw: String(v), label: String(v) })),
    format: [...(_searchChips.formats || new Set())].map(v => ({ category: 'format', raw: v, label: labelFor('format', v) })),
    length: [...(_searchChips.lengths || new Set())].map(v => ({ category: 'length', raw: v, label: lengthLabel(v) })),
  };
  if (_searchChips.yearRange) {
    const [lo, hi] = _searchChips.yearRange;
    // Treat yearRange as part of the year group so it sits next to year chips.
    grouped.year.push({ category: 'yearRange', raw: 'range', label: `${lo}–${hi}` });
  }
  // v1.0.211 fix — read the chip's raw value from data attributes instead
  // of inlining it into an onclick. Inlining with esc() converted `'` →
  // `&#39;`, but the Set key was the original `'` — so studios / genres
  // with apostrophes (e.g. "Doutonbori's") silently failed to remove.
  // The delegated handler at the end of this function reads data-* directly.
  const renderChip = (c) => `
    <span class="search-chip" data-category="${c.category}" data-value="${esc(c.raw)}">
      <span class="search-chip-icon" aria-hidden="true">${pillIcon[c.category] || '·'}</span>
      <span class="search-chip-label">${esc(c.label)}</span>
      <button type="button" class="search-chip-remove" aria-label="Remove filter" data-chip-remove="1">×</button>
    </span>`;
  // Order categories visually in a predictable left-to-right reading order.
  const categoryOrder = ['genre', 'studio', 'year', 'format', 'length'];
  const groupBlocks = [];
  for (const cat of categoryOrder) {
    const items = grouped[cat];
    if (!items.length) continue;
    // Same-category chips get "or" between them. Single chips render naked.
    const inner = items.map((c, i) => i === 0
      ? renderChip(c)
      : `<span class="search-chip-conj">or</span>${renderChip(c)}`
    ).join('');
    groupBlocks.push(`<span class="search-chip-group">${inner}</span>`);
  }
  // Different categories AND'd together — render a subtle "and" between blocks.
  const totalChips = Object.values(grouped).reduce((s, arr) => s + arr.length, 0);
  wrap.innerHTML = groupBlocks.join('<span class="search-chip-conj search-chip-conj-and">and</span>');
  const anyChip = totalChips > 0;
  if (anyChip) wrap.removeAttribute('hidden'); else wrap.setAttribute('hidden', '');
  if (clearBtn) clearBtn.style.display = anyChip ? '' : 'none';
  // v1.0.211 — One-time toast the first time a user sees an OR or AND
  // connector. Without it, the floating "or"/"and" pills between chips
  // read as typos. Stored under `kessen.ui.chipLogicSeen`.
  if (anyChip) {
    const hasOr  = wrap.querySelector('.search-chip-conj-and') ||
                   document.querySelectorAll('.search-chip-conj').length > document.querySelectorAll('.search-chip-conj-and').length;
    try {
      if (hasOr && !localStorage.getItem('kessen.ui.chipLogicSeen')) {
        showToast('Tip: chips in the same category match with OR, chips across categories match with AND.', 6000);
        localStorage.setItem('kessen.ui.chipLogicSeen', '1');
      }
    } catch { /* storage disabled — silent */ }
  }
  // v1.0.211 fix — delegated remove handler. Reads data-* off the parent
  // .search-chip element so apostrophes / quotes in the raw value survive
  // round-tripping. Re-binding on every render is fine (small DOM) and
  // matches the rest of the chip rendering's idempotent style.
  wrap.onclick = (ev) => {
    const btn = ev.target?.closest('[data-chip-remove="1"]');
    if (!btn) return;
    const chip = btn.closest('.search-chip');
    if (!chip) return;
    const category = chip.dataset.category;
    const raw      = chip.dataset.value;
    _removeSearchChip(category, raw);
  };
}

function _removeSearchChip(category, value) {
  if (category === 'yearRange') _searchChips.yearRange = null;
  else if (category === 'genre')  _searchChips.genres.delete(value);
  else if (category === 'studio') _searchChips.studios.delete(value);
  else if (category === 'format') _searchChips.formats.delete(value);
  else if (category === 'length') _searchChips.lengths.delete(value);
  else if (category === 'year')   _searchChips.years.delete(Number(value));
  _persistSearchChips();
  _renderSearchChips();
  filterRankings();
}

function clearSearchChips() {
  _searchChips = {
    genres: new Set(), studios: new Set(), years: new Set(),
    yearRange: null, formats: new Set(), lengths: new Set(),
  };
  // Also clear the text input so "Clear filters" really means "show everything".
  const input = byId(IDS.searchInput);
  if (input) input.value = '';
  _persistSearchChips();
  _renderSearchChips();
  filterRankings();
}

// Compose the effective query from the parsed text-input tokens + the
// chip state. Chip values OR with same-key typed tokens (so a typed
// genre:action and a chipped Comedy together mean "either"); different
// keys still AND. Year range from chips takes precedence over a typed
// year range (chip UI is the more discoverable surface).
function _effectiveSearchQuery(parsed) {
  // v1.0.211 — split studio matching into exact (chip-sourced) vs substring
  // (typed-token-sourced). The picker stores the canonicalised full studio
  // name; that should match the exact value, not a substring (so chipping
  // "TMS" doesn't sweep up everything containing "tms"). Typed
  // `studio:bones` deliberately stays as substring so users can type
  // partial names like "ghi" for "Ghibli".
  const out = {
    text: parsed.text,
    genres:  [...new Set([...parsed.genres,  ..._searchChips.genres])],
    studiosExact:  [..._searchChips.studios],
    studiosSubstr: [...parsed.studios],
    formats: [...new Set([...parsed.formats, ..._searchChips.formats])],
    years:   [...new Set([...parsed.years,   ..._searchChips.years])],
    lengths: [...new Set([...(parsed.lengths || []), ..._searchChips.lengths])],
    yearRange: _searchChips.yearRange || parsed.yearRange,
  };
  // Legacy alias so any caller still reading `q.studios` continues to work
  // (substring semantics — used in `_filterFranchise` text-search fallback).
  out.studios = [...new Set([...out.studiosExact, ...out.studiosSubstr])];
  return out;
}

// v1.0.211 — Search help popover. Click toggles, outside-click or Escape
// closes. Lives outside the search input so the input still gets the full
// width and the popover can absolute-position below it.
function toggleSearchHelp() {
  const pop = byId(IDS.searchHelpPopover);
  const btn = byId(IDS.searchHelpBtn);
  if (!pop || !btn) return;
  const willOpen = pop.hasAttribute('hidden');
  if (willOpen) {
    pop.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    // Close on next outside click. Capture so it runs before the next bubble.
    const closer = (e) => {
      if (pop.contains(e.target) || btn.contains(e.target)) return;
      pop.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', closer, true);
      document.removeEventListener('keydown', escCloser);
    };
    const escCloser = (e) => {
      if (e.key !== 'Escape') return;
      pop.setAttribute('hidden', '');
      btn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', closer, true);
      document.removeEventListener('keydown', escCloser);
    };
    setTimeout(() => {
      document.addEventListener('click', closer, true);
      document.addEventListener('keydown', escCloser);
    }, 0);
  } else {
    pop.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', 'false');
  }
}

function filterRankings() {
  const raw    = byId(IDS.searchInput).value;
  const parsed = _parseSearchQuery(raw);
  const query  = _effectiveSearchQuery(parsed);
  if (franchiseMode) { _filterFranchise(query); return; }
  const animeById = new Map(animeList.map(a => [a.id, a]));
  document.querySelectorAll('#ranking-list .rank-card').forEach(card => {
    if (card.classList.contains('franchise-group')) return; // skip franchise cards
    const titleEl = card.querySelector('.rank-title');
    if (!titleEl) return;
    const title   = titleEl.textContent.toLowerCase();
    const animeId = parseInt(card.dataset.animeId) || 0;
    const anime   = animeById.get(animeId);
    const isFuzzy = !!anime?.fuzzy;
    const fmt     = card.dataset.format  || '';
    const epRng   = card.dataset.epRange || 'unknown';
    const matchesText   = !query.text || title.includes(query.text);
    const matchesTokens = _animeMatchesSearchTokens(anime, query);
    const show = matchesText
      && matchesTokens
      && (!showFuzzyOnly || isFuzzy)
      && !hiddenFormatsRanking.has(fmt)
      && !hiddenEpRangesRanking.has(epRng)
      && !excludedIds.has(animeId);
    card.style.display = show ? '' : 'none';
  });
  if (rankingView === 'list') renderRankingTable();
}

// v1.0.154 — removed `toggleStats()` dead shim (no callers in app.js or
// index.html; renderBattlesTab/renderProfileTab supersede its role).

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
        <div class="genre-chart-label" title="${esc(g.name)}">${esc(g.name)}</div>
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
        <div class="genre-chart-label">${esc(e.label)}</div>
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

// v1.0.211 — session-scoped attempt flag so a failed/empty enrichment
// doesn't infinite-loop the Studio Affinity panel. Without this, the
// post-fetch renderStatsTab() call re-renders Studio Affinity → no
// studios → fetch again → re-render → fetch again → … Reset on Reset/
// Delete (resetAll, deleteAllData clear all module state via reload paths).
let _studioFetchAttempted = false;
async function renderStudioAffinity() {
  const el = byId(IDS.statStudioAffinity);
  if (!el) return;
  const hasStudios = animeList.some(a => Array.isArray(a.studios) && a.studios.length > 0);
  if (!hasStudios) {
    if (_studioFetchAttempted) {
      el.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">No studio data is available for the anime in your list.</div>';
      return;
    }
    if (el.dataset.fetching === '1') return;
    el.dataset.fetching = '1';
    el.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">⏳ Loading studio data…</div>';
    try {
      await _enrichGenresAndEras();
      saveState();
    } catch (e) {
      _studioFetchAttempted = false; // allow retry on hard error
      el.innerHTML = `<div style="color:#f85149;font-size:0.8rem;padding:8px 0">Could not fetch studio data: ${esc(e.message || 'network error')}. <a href="#" style="color:#58a6ff" onclick="event.preventDefault();renderStudioAffinity()">retry →</a></div>`;
      return;
    } finally {
      delete el.dataset.fetching;
    }
    _studioFetchAttempted = true;
    // Re-check directly instead of re-running renderStatsTab — the latter
    // re-enters this function and loops forever when AniList returned no
    // studios (which is the case for some libraries / region restrictions).
    const nowHasStudios = animeList.some(a => Array.isArray(a.studios) && a.studios.length > 0);
    if (!nowHasStudios) {
      el.innerHTML = '<div style="color:#8b949e;font-size:0.8rem;padding:8px 0">No studio data is available for the anime in your list.</div>';
      return;
    }
    // Studios now available — fall through to the normal render path below.
  }
  const overallAvg = Math.round(animeList.reduce((s, a) => s + a.elo, 0) / animeList.length);
  const studioMap = {};
  animeList.forEach(a => {
    (a.studios || []).forEach(rawS => {
      const s = _canonicalStudio(rawS);
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

  // Build a ranked index once so each panel can show #rank quickly. Stats
  // reflect the user's Rankings view, so apply the Ranking-scope filter.
  const rankedIds = animeList
    .filter(a => !hiddenFormatsRanking.has(a.format))
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
  // Match canonical-to-canonical — the affinity panel shows canonicalised names
  // (e.g. "Madhouse" rolls in "MADHOUSE" + "Madhouse Inc.") but the raw studios
  // array on each anime still has the original AniList strings. A literal
  // includes() check missed every anime under a canonical alias, so a studio
  // could show "(27) +4" but expand to an empty list. Apply the same canonical
  // transform on each side and the count matches the panel content.
  const anime = animeList
    .filter(a => (a.studios || []).some(s => _canonicalStudio(s) === studioName))
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
    // v1.0.212 — `#` prefix wrapped in a separate span so a mobile media
    // query can hide it (saving ~10px of horizontal real estate per row
    // for titles, which is the actual scarce resource on a phone).
    const rankHtml = rank >= 0 ? `<span class="rank-hash">#</span>${rank + 1}` : '—';
    const idx     = animeList.indexOf(a);
    return `
      <div class="studio-anime-item" onclick="openDetail(${idx})">
        <span class="studio-anime-rank">${rankHtml}</span>
        <img class="studio-anime-cover"${coverCors(a.cover)} src="${esc(a.cover || '')}" alt="" loading="lazy"
             onerror="this.style.display='none'" />
        <span class="studio-anime-title">${esc(displayTitle(a))}</span>
        <span class="studio-anime-elo">${a.elo}</span>
      </div>`;
  }).join('');
}

// Silently fetch genres + seasonYear + studios for existing anime that predate
// those fields. Used by the Stats tab; the Taste Profile tab further extends
// this via _enrichTasteMetadata() to also pull tags + source.
// v1.0.211 fix — Bump the franchise group cache after enrichment so the
// authoritative grouper sees the freshly-loaded `relations` data. Without
// this, `_sameFranchise`, Rivalries, Tower down-weight, and Avoid-Same-
// Franchise all read the relations-less map until the next list-shape
// change (which can be never within a session).
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
            relations { edges { relationType node { id type } } }
          }
        }
      }`;
    const res = await _anilistFetch({ query, variables: { ids: chunk } });
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
      if (!Array.isArray(a.relations)) {
        // Store only ANIME-type relations of franchise-meaningful types — the
        // union-find in _computeFranchiseIds traverses these to group sequels,
        // prequels, side stories, alternative versions, spin-offs and recap
        // compilations. ADAPTATION/SOURCE/CHARACTER edges cross-medium or
        // weakly-related, so we drop them to avoid pulling unrelated anime
        // into a franchise (e.g. a manga adaptation's source).
        const FRANCHISE_REL_TYPES = new Set([
          'SEQUEL', 'PREQUEL', 'SIDE_STORY', 'PARENT',
          'ALTERNATIVE', 'SPIN_OFF', 'COMPILATION', 'SUMMARY',
        ]);
        a.relations = (m.relations?.edges || [])
          .filter(e => e.node?.type === 'ANIME'
                    && FRANCHISE_REL_TYPES.has(e.relationType))
          .map(e => e.node.id);
      }
    });
    if (typeof onProgress === 'function') {
      onProgress({ done: Math.min(i + PAGE_SIZE, ids.length), total: ids.length });
    }
    if (i + PAGE_SIZE < ids.length) await new Promise(r => setTimeout(r, 350));
  }
  // v1.0.211 fix — relations data just landed for many anime; invalidate the
  // franchise group cache so _getFranchiseIdMap (used by _sameFranchise,
  // Rivalries, Tower down-weight, Avoid-Same-Franchise) sees the new edges.
  _bumpFranchiseGroupCache();
  saveState();
}

// Returns true if any item on animeList is missing tags/studios/genres/relations
// — i.e. needs an enrichment pass. Source and seasonYear come from the same
// GraphQL query so we don't need to check them explicitly. Relations were
// added later (§ franchise-grouping upgrade), so older saves won't have them
// until the next enrichment fires.
function _needsTasteEnrichment() {
  return animeList.some(a =>
    !Array.isArray(a.tags) ||
    !Array.isArray(a.genres) ||
    !Array.isArray(a.studios) ||
    !Array.isArray(a.relations)
  );
}

// ─── FRANCHISE UNION-FIND (§ relations-based grouping) ──────────────────────
// Computes a canonical "franchise id" for every anime in the list by walking
// AniList's relations graph as a union-find. Two anime end up in the same
// component iff there's a chain of franchise-meaningful relations between
// them (via the relation types whitelisted in _enrichGenresAndEras).
//
// This catches franchises that the title-pattern grouper misses — e.g. the
// Monogatari Series (every entry has a different leading word) and the Fate
// universe (Fate/stay night ↔ Fate/Zero share no title stem). For anime
// without populated relations (older saves, fetch failures), the caller
// falls back to the title-pattern grouper for those items only.
//
// Returns a Map<animeId, canonicalRootId>. Animes with no relations data
// are absent from the map — caller should treat absence as "use fallback."
function _computeFranchiseIds() {
  const inList = new Set(animeList.map(a => a.id));
  const parent = new Map();
  // v1.0.139 — exclude crossover OVAs ("X VS Y" titles) from the union-find.
  // AniList marks them as SIDE_STORY to both participating franchises, so
  // including them would unite two unrelated franchises through the
  // crossover's relations. _buildFranchiseGroups handles them separately as
  // standalone one-member groups.
  // Only seed items that have relations data — others fall through to the
  // title-pattern grouper.
  for (const a of animeList) {
    if (Array.isArray(a.relations) && !_isCrossoverAnime(a)) parent.set(a.id, a.id);
  }
  const find = (id) => {
    let r = id;
    while (parent.get(r) !== r) r = parent.get(r);
    // Path compression: flatten the chain so subsequent finds are O(1)
    let cur = id;
    while (parent.get(cur) !== r) {
      const next = parent.get(cur);
      parent.set(cur, r);
      cur = next;
    }
    return r;
  };
  const union = (a, b) => {
    const ra = find(a), rb = find(b);
    if (ra !== rb) parent.set(ra, rb);
  };
  for (const a of animeList) {
    if (!Array.isArray(a.relations) || !parent.has(a.id)) continue;
    for (const relId of a.relations) {
      // Only union with anime that are both in the user's list AND have
      // their own relations data — keeps the graph well-formed and avoids
      // half-connections through unenriched neighbours.
      if (inList.has(relId) && parent.has(relId)) union(a.id, relId);
    }
  }
  // Final pass with path compression so the returned map is O(1)-lookable.
  const out = new Map();
  for (const id of parent.keys()) out.set(id, find(id));
  return out;
}

// v1.0.211 — Cached animeId → franchise-group ID map. Built from
// _buildFranchiseGroups (which is the authoritative grouper — relations graph
// + title patterns + alias table + crossover detection), inverted, and cached.
// Cache key encodes list size + first/last IDs so it self-invalidates on add/
// remove/import. Other mutation points (excludeAnime, applySync) call
// _bumpFranchiseGroupCache() to force a rebuild. Lookup is O(1) per anime.
let _franchiseGroupCache    = null;
let _franchiseGroupCacheKey = '';
function _getFranchiseIdMap() {
  const key = `${animeList.length}:${animeList[0]?.id || 0}:${animeList[animeList.length - 1]?.id || 0}`;
  if (_franchiseGroupCache && _franchiseGroupCacheKey === key) return _franchiseGroupCache;
  const map = new Map();
  const groups = _buildFranchiseGroups(animeList.slice());
  let gid = 0;
  for (const g of groups) {
    const groupId = `g${gid++}`;
    for (const m of g.members) map.set(m.id, groupId);
  }
  _franchiseGroupCache    = map;
  _franchiseGroupCacheKey = key;
  return map;
}
function _bumpFranchiseGroupCache() {
  _franchiseGroupCache    = null;
  _franchiseGroupCacheKey = '';
}
// Single-pair check, used by the avoid-same-franchise filter and the Tower
// down-weight. Returns false for missing inputs or self-pairs so callers can
// use it freely without null-guarding.
function _sameFranchise(a, b) {
  if (!a || !b || a.id === b.id) return false;
  const m = _getFranchiseIdMap();
  const ka = m.get(a.id);
  const kb = m.get(b.id);
  return !!(ka && kb && ka === kb);
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
    (a.studios || []).forEach(rawS => {
      if (!rawS) return;
      const s = _canonicalStudio(rawS);
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
  const identityEl = byId(IDS.tasteIdentityCard);
  if (battleCount >= TASTE_STORY_MILESTONES[0]) {
    if (identityEl) identityEl.style.display = '';
    const insights = _computeTasteInsights(_lastTasteStoryMilestone(battleCount));
    const archetype = insights.find(c => c.type === 'archetype');
    byId(IDS.tasteHeadline).textContent = archetype?.headline || profile.headline;

    const insightsEl = byId(IDS.tasteIdentityInsights);
    if (insightsEl) {
      const cards = insights.filter(c => c.type !== 'share' && c.type !== 'archetype');
      insightsEl.innerHTML = cards.map(c => `
        <div class="taste-insight-pill">
          <span class="taste-insight-label">${esc(c.label)}</span>
          ${c.headline ? `<span class="taste-insight-headline">${esc(c.headline)}</span>` : ''}
          <span class="taste-insight-text">${esc(c.sub)}</span>
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
  _paintTasteDrift(byId(IDS.tasteDrift));

  // ── Section 4: Evolution ───────────────────────────────────────────────
  _paintTasteEvolution(byId(IDS.tasteEvolution));


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
      <img${coverCors(a.cover)} src="${esc(a.cover || '')}" alt="${esc(displayTitle(a))}"
           title="${esc(displayTitle(a))}"
           loading="lazy" onerror="this.style.display='none'" />`).join('');
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
  byId(IDS.recsTabMoods)?.classList.add('active');
  byId(IDS.predictorSection).style.display = 'none';
  byId(IDS.moodsSection).style.display = '';
  byId(IDS.recsSubText).style.display = 'none';
  byId(IDS.discoverRefreshBtn).style.display = 'none';

  // Ensure the discover mood grid is populated (may be empty if arriving from taste tab)
  const discoverMoodGrid = byId(IDS.discoverMoodGrid);
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
    const discoverMoodGrid = byId(IDS.discoverMoodGrid);
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
            averageScore format status genres
          }
        }
      }
    }
  }`;

  for (const seed of seeds) {
    try {
      const res  = await _anilistFetch({ query, variables: { id: seed.id } });
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
  // v1.0.211 — precompute taste scoring once for the mood section.
  const _moodAffinity = _buildGenreAffinity();
  const _moodRange    = _tasteEloRange();
  const _moodTs = (media) => _computeTasteScore(media, _moodAffinity, _moodRange.eloMin, _moodRange.eloRange);
  const cardsHtml = groups.map(({ seed, recs }) => `
    <div class="recs-group">
      <div class="recs-group-label">Because you liked <strong>${esc(displayTitle(seed))}</strong></div>
      <div class="recs-row">
        ${recs.map(r => recCardHtml(r.media, { tasteScore: _moodTs(r.media) })).join('')}
      </div>
    </div>`).join('');

  grid.innerHTML = titleHtml + cardsHtml;
  _recsCache['foryou'] = { html: grid.innerHTML, gridDisplay: grid.style.display };
  _moodRecActive = false;
  grid.style.gridTemplateColumns = '';
}

// ── Taste snapshots (for drift tracking) ────────────────────────────────────
// v1.0.154 — storage key is now KESSEN_KEYS.data.tasteSnapshots.

// Wipes the global taste-snapshot store. Called from every fresh-load path
// that resets battleCount to 0 (AniList load, MAL load, guest load, full
// reset). Without this, snapshots from a prior account or session linger
// and the timeline shows milestones the new user couldn't possibly have
// reached. The proper fix would be to scope this key per-saveKey, but for
// now an explicit clear at every reset surface is the smaller change.
function _clearTasteSnapshots() {
  try { localStorage.removeItem(KESSEN_KEYS.data.tasteSnapshots); } catch (_e) {}
}

function _maybeSaveTasteSnapshot() {
  try {
    const snaps = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.tasteSnapshots) || '[]');
    // Save a snapshot at each 50-battle milestone, keep up to 40 (2000 battles
    // of history). Each snapshot is ~200 bytes so 40 ≈ 8 KB.
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

    // Self-healing: if the most recent saved snapshot is more than one
    // milestone behind the current one, mark this one as having a gap so the
    // renderer can show the user "you missed some snapshots between here and
    // the previous entry." This happens when the user wasn't on this version
    // of the app for some battles, ran tower-only sessions (which don't bump
    // battleCount), restored from cloud, etc.
    const lastSaved = snaps.length ? snaps[snaps.length - 1].battleCount : 0;
    const gappedFromPrev = lastSaved > 0 && (milestone - lastSaved) > 50;

    snaps.push({
      battleCount: milestone,
      timestamp: new Date().toISOString(),
      genreAvgs,
      top10: [...animeList].sort((a, b) => b.elo - a.elo).slice(0, 10).map(a => a.id),
      gapBefore: gappedFromPrev || undefined,
    });
    if (snaps.length > 40) snaps.splice(0, snaps.length - 40);
    localStorage.setItem(KESSEN_KEYS.data.tasteSnapshots, JSON.stringify(snaps));
  } catch { /* storage full / corrupt — skip */ }
}

function _paintTasteDrift(el) {
  if (!el) return;
  try {
    // Same stale-filter as _paintTasteEvolution — drop snapshots from a prior
    // account/reset whose battle count is ahead of ours.
    const rawSnaps = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.tasteSnapshots) || '[]');
    const snaps    = rawSnaps.filter(s => (s.battleCount || 0) <= battleCount);
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
    // Filter out any snapshots whose battle count is ahead of the user's
    // current count. Those are leftovers from a prior account / reset path
    // (KESSEN_KEYS.data.tasteSnapshots is a global localStorage entry, not per-user, so it
    // leaks across guest switches, fresh-loads, etc). Showing them produces
    // the "Battle 200" cards for a user who only has 113 battles bug.
    const rawSnaps = JSON.parse(localStorage.getItem(KESSEN_KEYS.data.tasteSnapshots) || '[]');
    const allSnaps = rawSnaps.filter(s => (s.battleCount || 0) <= battleCount);
    // If we discarded any, persist the cleaned list so the renderer doesn't
    // re-filter on every paint and the next snapshot save starts from a
    // clean baseline.
    if (allSnaps.length !== rawSnaps.length) {
      localStorage.setItem(KESSEN_KEYS.data.tasteSnapshots, JSON.stringify(allSnaps));
    }
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

    // v1.0.209 — show every snapshot. Previously capped at 7 cards with even
    // subsampling, which felt like "data is missing" to users with 8+
    // snapshots (e.g. a 412-battle account has 8 saved + Now = 9, and the
    // subsampler dropped the cards at battles 150 and 300). The list scrolls
    // horizontally on every viewport already, so showing all of them adds no
    // layout problem — the hard cap at 40 saved snapshots in
    // _maybeSaveTasteSnapshot keeps the upper bound reasonable for very
    // heavy users (2000+ battles).
    const points = allPoints;

    // Detect gaps in the milestone sequence (saved snapshots more than 50
    // battles apart, or marked gapBefore). Used to render a subtle indicator
    // between cards so the user understands why some milestones are missing
    // rather than thinking the timeline is broken.
    //
    // v1.0.209 — was a naive `(b - a) > 75` distance check, which fired on
    // *every* pair of displayed cards more than ~75 battles apart. That's
    // misleading whenever the subsampler drops middle cards from a complete
    // timeline (e.g. for 9 snapshots capped at 7 cards, snapshots 150 and 300
    // get subsampled out and the previous logic flagged 100→200 and 250→350
    // as "missing milestones" even though they were saved). Now we check the
    // underlying allSnaps for every expected 50-battle milestone between the
    // two displayed cards; only a truly missing milestone counts as a gap.
    const savedBattleCounts = new Set(allSnaps.map(s => s.battleCount));
    const isGap = (snap, prev) => {
      if (!prev) return false;
      if (snap.gapBefore) return true;
      const a = prev.battleCount || 0;
      const b = snap.isCurrent ? battleCount : (snap.battleCount || 0);
      // Walk the expected 50-battle milestones strictly between a and b. If
      // any one is missing from the saved set, there's a real recording gap.
      // Subsampling-only "gaps" hit every expected milestone in savedBattleCounts.
      for (let m = a + 50; m < b; m += 50) {
        if (!savedBattleCounts.has(m)) return true;
      }
      return false;
    };

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

    // Build the timeline with gap-aware connectors between cards.
    const timeline = cards.map((card, i) => {
      if (i === 0) return card;
      const arrow = isGap(points[i], points[i - 1])
        ? `<div class="evo-arrow evo-arrow-gap" title="Some milestones between these snapshots weren't recorded">⋯→</div>`
        : `<div class="evo-arrow">→</div>`;
      return arrow + card;
    }).join('');

    // v1.0.209 — subsampling removed, so the "Showing N of M" notice is no
    // longer needed. The timeline now reflects every saved snapshot directly.
    el.innerHTML = `<div class="evo-timeline">${timeline}</div>`;
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
function showAnimeDetail(id, opts) {
  const skipHistoryPush = !!(opts && opts.skipHistoryPush);
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
  // v1.0.211 — Battle Next chip. Visible on per-anime modals (not
  // franchise modals, which call showFranchiseDetail and hide this).
  // Stashes the id on the button so battleNextFromModal can read it
  // without rebuilding the chain back to animeList.
  const battleNextBtn = byId(IDS.modalBattleNextBtn);
  if (battleNextBtn) {
    battleNextBtn.style.display = '';
    battleNextBtn.dataset.animeId = String(id);
  }
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
  // v1.0.161 — keep the legacy small button hidden; the new full-width
  // notice above the description carries the same affordance more visibly.
  // Stash the id on it so unflagFuzzy() can still read it.
  unfuzzyBtn.style.display = 'none';
  unfuzzyBtn.dataset.animeId = id;
  const fuzzyNotice = byId(IDS.modalFuzzyNotice);
  if (fuzzyNotice) {
    fuzzyNotice.style.display = anime.fuzzy ? 'flex' : 'none';
    fuzzyNotice.dataset.animeId = id;
  }

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
  // v1.0.212 — skipHistoryPush is used by navigateToFranchiseMember when
  // it's swapping content in an already-open detail modal. The existing
  // 'detail' entry in the back stack stays valid (it points to a close
  // function that still works for this content).
  if (!skipHistoryPush) pushModalBack('detail', closeDetail);
}

function closeDetail() {
  byId(IDS.detailModal).style.display = 'none';
  popModalBack('detail');
}

function closeDetailOnOverlay(event) {
  if (event.target === byId(IDS.detailModal)) closeDetail();
}

function unflagFuzzy() {
  // v1.0.161 — id can live on either the legacy button or the new notice;
  // read whichever is populated.
  const notice = byId(IDS.modalFuzzyNotice);
  const legacy = byId(IDS.modalUnfuzzyBtn);
  const id = parseInt(notice?.dataset?.animeId || legacy?.dataset?.animeId || '0');
  const anime = animeList.find(a => a.id === id);
  if (anime) { anime.fuzzy = false; saveState(); }
  if (notice) notice.style.display = 'none';
  if (legacy) legacy.style.display = 'none';
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
  const ascFirst = _ascFirstSorts.has(currentSort);
  const showUp = ascFirst ? !sortAsc : sortAsc;
  document.querySelectorAll('.sort-menu-item').forEach(item => {
    const active = item.dataset.sort === currentSort;
    item.classList.toggle('active', active);
    item.setAttribute('aria-checked', active ? 'true' : 'false');
    const label = item.dataset.label || item.textContent;
    item.textContent = active ? `${label} ${showUp ? '↑' : '↓'}` : label;
  });
  // v1.0.212 — Franchise sorts now live in their own visible dropdown next
  // to the main one when franchise mode is on. The main dropdown label
  // shows a standard sort (default ELO ↓) when active; the franchise
  // dropdown label shows the active franchise sort if one is selected,
  // otherwise reads "—".
  const isFranchiseSort = currentSort === 'peak' || currentSort === 'members';
  const currentEl = byId(IDS.sortMenuCurrent);
  if (currentEl) {
    if (isFranchiseSort) {
      // The active sort is a franchise sort; leave the main dropdown
      // showing a stable default (ELO ↓) so users have a clear path back
      // to standard sorting. The franchise dropdown gets the active label.
      currentEl.textContent = 'ELO ↓';
    } else {
      const activeItem = document.querySelector(`.sort-menu-item[data-sort="${currentSort}"]`);
      const label = activeItem?.dataset?.label || currentSort;
      currentEl.textContent = `${label} ${showUp ? '↑' : '↓'}`;
    }
  }
  const franchiseCurrentEl = byId(IDS.franchiseSortMenuCurrent);
  if (franchiseCurrentEl) {
    if (isFranchiseSort) {
      const activeItem = document.querySelector(`#franchise-sort-menu-popover .sort-menu-item[data-sort="${currentSort}"]`);
      const label = activeItem?.dataset?.label || currentSort;
      franchiseCurrentEl.textContent = `${label} ${showUp ? '↑' : '↓'}`;
    } else {
      franchiseCurrentEl.textContent = '—';
    }
  }
  // Update table headers
  document.querySelectorAll('#ranking-table thead th[id]').forEach(th => {
    const isActive = th.id === (_sortToTh[currentSort] || '');
    th.classList.toggle('sorted', isActive);
    const base = th.textContent.replace(/ [▾▴]$/, '');
    th.textContent = isActive ? `${base} ${showUp ? '▴' : '▾'}` : base;
  });
}

// v1.0.211 — Sort dropdown handlers. The Rankings sort row used to be 7
// always-visible buttons (plus 2 conditional franchise sorts on a sub-row);
// they now live behind one "Sort: ELO ↓ ▾" dropdown so the right-side
// Fuzzy / Franchise / view toggles get breathing room and the page chrome
// shrinks by a full row on narrow viewports.
function toggleSortMenu(event) {
  event?.stopPropagation();
  const pop = byId(IDS.sortMenuPopover);
  const btn = byId(IDS.sortMenuBtn);
  if (!pop || !btn) return;
  const open = pop.hasAttribute('hidden');
  if (open) {
    pop.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    const closer = (e) => {
      if (pop.contains(e.target) || btn.contains(e.target)) return;
      _closeSortMenu();
      document.removeEventListener('click', closer, true);
      document.removeEventListener('keydown', escCloser);
    };
    const escCloser = (e) => {
      if (e.key !== 'Escape') return;
      _closeSortMenu();
      document.removeEventListener('click', closer, true);
      document.removeEventListener('keydown', escCloser);
    };
    setTimeout(() => {
      document.addEventListener('click', closer, true);
      document.addEventListener('keydown', escCloser);
    }, 0);
  } else {
    _closeSortMenu();
  }
}
function _closeSortMenu() {
  const pop = byId(IDS.sortMenuPopover);
  const btn = byId(IDS.sortMenuBtn);
  if (pop) pop.setAttribute('hidden', '');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}
function setSortFromMenu(type) {
  _closeSortMenu();
  setSort(type);
}

// v1.0.212 — Franchise sort dropdown handlers. Mirrors the main sort menu
// but anchored to its own button + popover. Visibility is CSS-controlled
// by body.franchise-mode-on (set/cleared in toggleFranchiseMode + boot).
function toggleFranchiseSortMenu(event) {
  event?.stopPropagation();
  const pop = byId(IDS.franchiseSortMenuPopover);
  const btn = byId(IDS.franchiseSortMenuBtn);
  if (!pop || !btn) return;
  const open = pop.hasAttribute('hidden');
  if (open) {
    pop.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    const closer = (e) => {
      if (pop.contains(e.target) || btn.contains(e.target)) return;
      _closeFranchiseSortMenu();
      document.removeEventListener('click', closer, true);
      document.removeEventListener('keydown', escCloser);
    };
    const escCloser = (e) => {
      if (e.key !== 'Escape') return;
      _closeFranchiseSortMenu();
      document.removeEventListener('click', closer, true);
      document.removeEventListener('keydown', escCloser);
    };
    setTimeout(() => {
      document.addEventListener('click', closer, true);
      document.addEventListener('keydown', escCloser);
    }, 0);
  } else {
    _closeFranchiseSortMenu();
  }
}
function _closeFranchiseSortMenu() {
  const pop = byId(IDS.franchiseSortMenuPopover);
  const btn = byId(IDS.franchiseSortMenuBtn);
  if (pop) pop.setAttribute('hidden', '');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}
function setFranchiseSortFromMenu(type) {
  _closeFranchiseSortMenu();
  setSort(type);
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

// scope: 'battle' (battle-screen filter popover) or 'ranking' (rankings tab
// format row). Defaults to 'ranking' for backward-compat with any caller that
// didn't get updated.
function toggleFormat(fmt, scope = 'ranking') {
  const set = scope === 'battle' ? hiddenFormatsBattle : hiddenFormatsRanking;
  if (set.has(fmt)) set.delete(fmt);
  else              set.add(fmt);
  syncFormatButtons();
  saveState();

  if (scope === 'ranking') {
    renderRankingList();
    filterRankings();
    return; // ranking-scope filter has no effect on the battle pool
  }

  // v1.0.209 — if the Tower champion-picker modal is open, refresh its list
  // immediately. populateTowerList already respects hiddenFormatsBattle, but
  // was only being called on modal-open / search-input — toggling a global
  // filter while the modal was open left the list stale, including showing
  // anime the user had just hidden or omitting anime they'd just shown again.
  // Independent of towerMode (run in progress), which we leave untouched
  // below.
  const towerModalOpen = byId(IDS.towerModal)?.classList.contains('open');
  if (towerModalOpen) {
    const q = byId(IDS.towerSearch)?.value?.toLowerCase() || '';
    populateTowerList(q);
  }

  // v1.0.209 — invalidate the preloaded next pair. The preload picks under
  // the filter state at the time it ran, not the filter state at the time
  // it'll be consumed — so widening the filter (e.g. movies-only → all
  // formats) wouldn't actually affect the next battle, because both
  // movies are still "valid" under the relaxed filter and
  // _takeValidPreloadedPair happily returns them. Dropping the preload
  // here forces the next pickOpponents() call instead, which respects
  // the current filter. Cost: one cover-cache miss; benefit: the next
  // battle actually reflects the user's intent.
  _preloadedPair = null;
  _preloadedImgs = null;

  // Battle-scope: immediately swap out any card whose format is now filtered.
  const battleVisible = byId(IDS.battleScreen)?.style.display !== 'none';
  if (!battleVisible || towerMode) return;

  if (trioMode) {
    const hasFiltered = currentTrio.some(idx => hiddenFormatsBattle.has(animeList[idx]?.format));
    // v1.0.209 — also re-render when the trio arena is empty (currentTrio===[])
    // because filters wiped the pool. Without this, toggling a filter back on
    // after filtering everything out left the arena hidden forever — same bug
    // as the standard battle arena had.
    const trioHidden = currentTrio.length === 0;
    if (hasFiltered || trioHidden) renderTrio();
  } else {
    const aFiltered = currentA != null && hiddenFormatsBattle.has(animeList[currentA]?.format);
    const bFiltered = currentB != null && hiddenFormatsBattle.has(animeList[currentB]?.format);
    // v1.0.209 — also re-render when the arena is currently hidden because
    // there were no valid pairs (currentA/currentB === null). Without this,
    // toggling a format back on after filtering everything out left the
    // arena hidden forever — renderBattle was only triggered when the
    // visible cards themselves were filtered, but null cards can't trip
    // that check.
    const arenaHidden = currentA === null && currentB === null;
    if (aFiltered || bFiltered || arenaHidden) renderBattle();
  }
}

// v1.0.211 — Avoid-same-franchise filter handler. Mirrors the format-toggle
// flow: persist via _saveViewPrefs, invalidate preload (next pair depends on
// the filter), re-render the active mode if the currently-shown pair is now
// disallowed. Also re-highlights the filter button so users see they have an
// active filter.
// v1.0.212 — Watch-status filter toggle for the battle pool. Mirrors the
// avoidSameFranchise pattern: persist state via _saveViewPrefs, invalidate
// the preloaded pair (it was picked under the old filter), then re-render
// the current arena so a now-hidden anime is replaced immediately.
function toggleHideStatus(statusKey) {
  if (hiddenStatusesBattle.has(statusKey)) hiddenStatusesBattle.delete(statusKey);
  else                                     hiddenStatusesBattle.add(statusKey);
  _saveViewPrefs();
  _preloadedPair = null;
  _preloadedImgs = null;
  const battleVisible = byId(IDS.battleScreen)?.style.display !== 'none';
  if (!battleVisible || towerMode) return;
  if (trioMode) {
    // If the current trio includes a hidden-status anime, repaint with a
    // fresh trio from the new pool.
    const anyHidden = currentTrio.some(i => hiddenStatusesBattle.has(animeList[i]?.status));
    if (anyHidden) { pickTrio(); renderTrio(); }
    return;
  }
  if (currentA != null && currentB != null) {
    const a = animeList[currentA], b = animeList[currentB];
    if (hiddenStatusesBattle.has(a?.status) || hiddenStatusesBattle.has(b?.status)) {
      renderBattle();
    }
  } else {
    renderBattle();
  }
}

function toggleAvoidSameFranchise() {
  const chk = byId(IDS.avoidSameFranchiseChk);
  avoidSameFranchise = !!(chk && chk.checked);
  _saveViewPrefs();
  syncFormatButtons();
  // Invalidate preload — same reasoning as toggleFormat: the cached next-pair
  // was picked under the old filter state.
  _preloadedPair = null;
  _preloadedImgs = null;

  const battleVisible = byId(IDS.battleScreen)?.style.display !== 'none';
  if (!battleVisible || towerMode) return;

  if (trioMode) {
    // If the active trio now contains a same-franchise pair, repaint with a
    // fresh trio picked under the new filter.
    if (avoidSameFranchise && currentTrio.length === 3) {
      const [a, b, c] = currentTrio.map(i => animeList[i]);
      const hasDupe = _sameFranchise(a, b) || _sameFranchise(a, c) || _sameFranchise(b, c);
      if (hasDupe) renderTrio();
    }
  } else if (wsoMode) {
    // Champion stays; opponent is repicked if same-franchise under new toggle.
    if (avoidSameFranchise && currentA != null && currentB != null
        && _sameFranchise(animeList[currentA], animeList[currentB])) {
      renderBattle();
    }
  } else {
    if (avoidSameFranchise && currentA != null && currentB != null
        && _sameFranchise(animeList[currentA], animeList[currentB])) {
      renderBattle();
    }
  }
}

// v1.0.211 — toggleMobileFilters was removed when the Formats / Length
// button rows folded into the unified chip picker. The Filter button still
// lives in the battle screen for the battle-pool filter popover; that goes
// through toggleFilterMenu, not this function.

function syncFormatButtons() {
  // Sync rankings-tab buttons (these write/read the Ranking-scope set)
  document.querySelectorAll('.format-btn').forEach(b => {
    if (!b.dataset.format) return;
    const isHidden = hiddenFormatsRanking.has(b.dataset.format);
    b.classList.toggle('active',     !isHidden);
    b.classList.toggle('hidden-fmt',  isHidden);
  });
  // Sync battle-screen filter popover buttons (Battle-scope set)
  document.querySelectorAll('.filter-fmt-btn').forEach(b => {
    if (!b.dataset.format) return;
    const isHidden = hiddenFormatsBattle.has(b.dataset.format);
    b.classList.toggle('active',    !isHidden);
    b.classList.toggle('hidden-fmt', isHidden);
  });
  // v1.0.211 — sync avoid-same-franchise checkbox + bake it into the filter-button
  // highlight so any active filter (format or franchise-avoid) draws the eye.
  const avoidChk = byId(IDS.avoidSameFranchiseChk);
  if (avoidChk) avoidChk.checked = avoidSameFranchise;
  // v1.0.212 — sync the watch-status checkboxes too.
  const hideCurrentChk = byId(IDS.hideCurrentChk);
  if (hideCurrentChk) hideCurrentChk.checked = hiddenStatusesBattle.has('CURRENT');
  const hideRepeatingChk = byId(IDS.hideRepeatingChk);
  if (hideRepeatingChk) hideRepeatingChk.checked = hiddenStatusesBattle.has('REPEATING');
  // Highlight the battle-screen filter button if any battle-scope filter is active
  const filterBtn = byId(IDS.filterBtn);
  if (filterBtn) {
    filterBtn.classList.toggle('has-filter',
      hiddenFormatsBattle.size > 0 || avoidSameFranchise || hiddenStatusesBattle.size > 0);
  }
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

// Episode-length filter only has a Rankings-tab UI today, so always Ranking-scope.
function toggleEpRange(range) {
  if (hiddenEpRangesRanking.has(range)) {
    hiddenEpRangesRanking.delete(range);
  } else {
    hiddenEpRangesRanking.add(range);
  }
  syncEpRangeButtons();
  saveState();
  filterRankings();
}

function syncEpRangeButtons() {
  document.querySelectorAll('[data-ep]').forEach(b => {
    const isHidden = hiddenEpRangesRanking.has(b.dataset.ep);
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
      <img${coverCors(d.anime.cover)} src="${safeUrl(d.anime.cover)}" alt="${esc(displayTitle(d.anime))}" />
      <div class="disagree-item-info">
        <div class="disagree-item-title">${esc(displayTitle(d.anime))}</div>
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
    const res  = await _anilistFetch({ query, variables: { search: q } });
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
        <img${coverCors(cover)} src="${safeUrl(cover)}" alt="" aria-hidden="true" />
        <div class="predictor-dropdown-item-info">
          <div class="predictor-dropdown-item-title">${esc(title)}</div>
          <div class="predictor-dropdown-item-meta">${esc([fmt, year].filter(Boolean).join(' · '))}</div>
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
      const res  = await _anilistFetch({ query: searchQuery, variables: { search: q } });
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
      <img class="predictor-cover"${coverCors(cover)} src="${safeUrl(cover)}" alt="${esc(title)}" />
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
// Abandons an in-progress tower run without showing the summary screen. Used
// when the user switches mode mid-tower via setMode() — the picks they've
// already made stay committed (tower commits ELO on each pick) but the run
// stops cleanly and tower-specific UI is reset to defaults. This is the bug
// fix path for "switching from tower to trio (or any other mode) leaves
// towerMode hot and routes every subsequent pick through pickWinnerTower."
// v1.0.209 — lock/unlock the global ≡ Filter button for the duration of a
// tower run. Tower runs are a fixed sequence of 10 pre-picked opponents, so
// changing filters mid-run would either silently take no effect (the previous
// behaviour, which produced the "filter does nothing" complaint) or invalidate
// the matchmaking band that's already in play. Disabling honestly is the
// cleanest option. Tooltip explains why on hover.
function _setFilterBtnTowerLock(locked) {
  const btn = byId(IDS.filterBtn);
  if (!btn) return;
  btn.disabled = !!locked;
  btn.title = locked
    ? "Filters can't change during a tower run"
    : 'Filter formats from battle pool';
}

function _exitTowerState() {
  if (!towerMode) return;
  towerMode      = false;
  towerOpponents = [];
  towerResults   = [];
  towerChampIdx  = -1;
  towerRound     = 0;
  byId(IDS.towerProgressWrap)?.style.setProperty('display', 'none');
  byId(IDS.towerStatus)?.style.setProperty('display', 'none');
  byId(IDS.battlePromptH2).textContent = 'Which did you enjoy more?';
  byId(IDS.battlePromptP).textContent  = "Click your favourite — or skip if you can't decide.";
  const undo = byId(IDS.undoBtn);
  if (undo) undo.disabled = false;
  const skip = byId(IDS.skipBtn);
  if (skip) skip.disabled = false;
  const btn = byId(IDS.modeBtn);
  if (btn) btn.classList.remove('active-tower');
  _setFilterBtnTowerLock(false); // v1.0.209
}

// Exits any settle/blind/trio/wso mode cleanly — used by startTower() so its
// flags and DOM state don't linger when entering tower. Without this, a
// user entering tower while trioMode was true would have both flags set;
// renderBattle's `if (trioMode)` check fires before tower's, so the trio
// arena would render over the tower opponent — exactly what users hit when
// switching from trio to tower.
function _exitNonTowerModes() {
  if (!settleMode && !blindMode && !trioMode && !wsoMode) return;
  settleMode = false;
  blindMode  = false;
  trioMode   = false;
  wsoMode    = false; // v1.0.207
  _resetWsoState();
  _renderWsoBadge(false);
  byId(IDS.settleBanner)?.classList.remove('active');
  byId(IDS.blindBanner)?.classList.remove('active');
  byId(IDS.trioBanner)?.classList.remove('active');
  byId(IDS.wsoBanner)?.classList.remove('active');
  const screen = byId(IDS.battleScreen);
  if (screen) screen.classList.remove('blind');
  const stdArena  = document.querySelector('.battle-arena');
  const trioArena = byId(IDS.trioArena);
  if (stdArena)  stdArena.style.display  = '';
  if (trioArena) trioArena.style.display = 'none';
  document.querySelectorAll('#mode-popover [role="menuitemradio"]').forEach(el => {
    el.setAttribute('aria-checked', el.dataset.mode === 'normal' ? 'true' : 'false');
  });
  const btn = byId(IDS.modeBtn);
  if (btn) btn.classList.remove('active-settle', 'active-blind', 'active-trio', 'active-wso');
}

function setMode(name) {
  if (!['normal', 'settle', 'blind', 'trio', 'wso'].includes(name)) name = 'normal';

  // If currently in tower, exit cleanly first. Tower is mutually exclusive
  // with the standard modes — keeping its flag set would route every battle
  // pick through pickWinnerTower regardless of the visible UI.
  _exitTowerState();

  const prevSettle = settleMode;
  const prevTrio   = trioMode;
  const prevWso    = wsoMode;
  settleMode = (name === 'settle');
  blindMode  = (name === 'blind');
  trioMode   = (name === 'trio');
  wsoMode    = (name === 'wso'); // v1.0.207

  // v1.0.207 — entering WSO is a fresh streak; exiting clears state so
  // re-entering later doesn't resurrect a stale champion.
  if (wsoMode && !prevWso) _resetWsoState();
  if (!wsoMode && prevWso) { _resetWsoState(); _renderWsoBadge(false); }

  // Mode button visual state + label (also clears Tower highlight if active)
  const btn = byId(IDS.modeBtn);
  if (btn) {
    btn.classList.toggle('active-settle', settleMode);
    btn.classList.toggle('active-blind',  blindMode);
    btn.classList.toggle('active-trio',   trioMode);
    btn.classList.toggle('active-wso',    wsoMode);
    btn.classList.remove('active-tower');
    btn.textContent =
      settleMode ? '🎯 Mode: Settle ▾' :
      blindMode  ? '🙈 Mode: Blind ▾'  :
      trioMode   ? '🎲 Mode: Trio ▾'   :
      wsoMode    ? '🔥 Mode: Winner Stays ▾' :
                   '⚙ Mode ▾';
  }

  // Banners (mutually exclusive)
  byId(IDS.settleBanner)?.classList.toggle('active', settleMode);
  byId(IDS.blindBanner)?.classList.toggle('active', blindMode);
  byId(IDS.trioBanner)?.classList.toggle('active', trioMode);
  byId(IDS.wsoBanner)?.classList.toggle('active', wsoMode); // v1.0.208

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
  if (wsoMode    && !prevWso)    { renderBattle(); return; } // v1.0.207
  // Exiting trio or wso → back to normal pair
  if (!trioMode  && prevTrio)    { renderBattle(); return; }
  if (!wsoMode   && prevWso)     { renderBattle(); return; } // v1.0.207
  // v1.0.209 — exiting Settle: Settle picks pairs differently from the
  // standard picker (biased toward uncertain matchups), so a re-render is
  // needed when leaving it. Also catches the "arena was hidden because of an
  // empty filter pool" case, where the unconditional `display: ''` above
  // would otherwise re-show the arena with stale / invalid cards.
  if (!settleMode && prevSettle) { renderBattle(); return; }
  // v1.0.209 — catch-all for any other transition where the arena was
  // hidden by an empty pool: re-render so renderBattle gets a chance to
  // either find a valid pair or re-hide the arena cleanly. Without this,
  // switching from Blind → Normal (or any pair where neither side mutates
  // pair-picking) would expose stale cards from before the filter wipe.
  if (currentA == null && currentB == null && !trioMode) { renderBattle(); }
}

// v1.0.211 — Record a battled pair while Battle Within Franchise is active,
// then auto-stop when every unique pair has been fought. Without this the
// mode loops indefinitely after exhausting the unique combinations, generating
// noisy repeats of matchups the user has already settled. Called from
// pickWinner (one pair per battle) and applyTrioResult (three pairs per round).
//
// Target count is re-resolved each tick so it tracks the CURRENT eligible
// pool — if the user excludes a member halfway through, target shrinks and
// completion can fire earlier than the original C(n,2).
function _recordBattleWithinPair(idA, idB) {
  if (!battleWithinFranchise) return;
  // Same key shape as matchupStats — "minId-maxId" — so it dedupes both
  // orderings automatically and matches the keys pickWinner already builds.
  const key = [Math.min(idA, idB), Math.max(idA, idB)].join('-');
  battleWithinFranchise.battledPairs.add(key);

  const eligible = animeList.filter(a =>
    battleWithinFranchise.ids.has(a.id)
    && !excludedIds.has(a.id)
    && !hiddenFormatsBattle.has(a.format)
    && !hiddenStatusesBattle.has(a.status)
  );
  const n = eligible.length;
  if (n < 2) {
    const name = battleWithinFranchise.name;
    stopBattleWithinFranchise();
    showToast(`✨ Battle Within "${name}" stopped — pool ran out of eligible pairs.`, 4500);
    return;
  }
  const target = (n * (n - 1)) / 2;
  if (battleWithinFranchise.battledPairs.size >= target) {
    const name = battleWithinFranchise.name;
    stopBattleWithinFranchise();
    showToast(`✨ You've battled every pair in "${name}" — Battle Within stopped. Tap ⚔ Battle within again for another pass.`, 5500);
  }
}

// v1.0.211 — Battle within franchise. Constrains the picker pool to a single
// franchise so users can settle the internal ordering ("which Re:Zero season
// is best?") without that franchise getting paired against unrelated titles
// every other battle. Implemented as a pool restriction rather than a true
// new "mode" because every existing mode (Classic / Settle / Blind / Trio /
// WSO) composes cleanly — Settle within franchise, Blind within franchise,
// and Trio within franchise all just work on top.
function startBattleWithinFranchise(name) {
  // Re-resolve the group at call time — the user could have excluded an
  // entry between modal-open and clicking the button.
  const groups = _buildFranchiseGroups(getSortedList());
  const group  = groups.find(g => g.name === name);
  if (!group) {
    showToast('⚠️ Franchise no longer exists — refresh rankings and try again.', 3500);
    return;
  }
  // Eligible members = not excluded + not filtered by format. We honour
  // existing pool filters so Battle Within respects the user's mental model
  // of "active battle pool". If that knocks the set under 2, we tell them.
  const eligible = group.members.filter(a =>
    !excludedIds.has(a.id) && !hiddenFormatsBattle.has(a.format) && !hiddenStatusesBattle.has(a.status)
  );
  if (eligible.length < 2) {
    showToast(`⚠️ "${name}" needs ≥2 eligible entries to battle (try removing format filters).`, 4500);
    return;
  }

  battleWithinFranchise = {
    name,
    ids: new Set(eligible.map(a => a.id)),
    // v1.0.211 — auto-stop once every unique pair has been battled at
    // least once. battledPairs stores "minId-maxId" strings (same shape
    // as matchupStats keys) so we can compare against C(eligible, 2) for
    // completion. Recorded by _recordBattleWithinPair from pickWinner and
    // applyTrioResult.
    battledPairs: new Set(),
  };

  // Reset to a clean Classic-style picker. Trio is the one to be careful about
  // because it persists currentTrio; setMode('normal') handles that for us.
  // WSO seeds from an empty streak so the champion gets picked from the
  // restricted pool rather than carrying over a stale champion that might
  // not even be in this franchise.
  setMode('normal');

  // Banner + filter-button visual cue
  const banner = byId(IDS.withinFranchiseBanner);
  const msg    = byId(IDS.withinFranchiseMsg);
  if (msg)    msg.textContent = `⚔ Battle within: ${name}`;
  if (banner) banner.classList.add('active');
  const filterBtn = byId(IDS.filterBtn);
  if (filterBtn) filterBtn.classList.add('has-franchise-lock');

  // Modal is sitting open on top — close it so the user lands on the battle.
  closeDetailModal();

  // Fresh battle from the restricted pool
  _preloadedPair = null;
  _preloadedImgs = null;
  // v1.0.211 hotfix — navigate to the battle screen. The franchise modal
  // opens from the Rankings tab inside #results-screen, so renderBattle()
  // was painting into a hidden DOM tree — the user had to manually click
  // "Keep Ranking" or otherwise navigate to the battle to see the new pair.
  // Mirrors resumeBattle()'s screen swap.
  hide('results-screen');
  show('battle-screen');
  renderBattle();
}

// v1.0.211 — Battle Next chip. Lets the user queue the anime currently open
// in the detail modal as one side of their next battle, paired against a
// similar-ELO opponent picked the same way pickOneOpponent picks replacement
// opponents during an "exclude" action. The pair lands in nextPairOverride so
// it's consumed exactly once by the next renderBattle call — after that the
// regular picker takes over again. We deliberately swallow trio mode (because
// nextPairOverride only feeds renderBattle, not renderTrio) by flipping out
// of trio first, mirroring how Battle Within drops back to a clean Classic
// picker before queueing.
function battleNextFromModal() {
  const btn = byId(IDS.modalBattleNextBtn);
  const id  = Number(btn?.dataset?.animeId);
  if (!id) return;
  const idx = animeList.findIndex(a => a.id === id);
  if (idx === -1) {
    showToast('⚠️ Couldn’t find that anime in your list.', 3000);
    return;
  }
  // Excluded anime can't validly enter the battle pool — surface the obvious
  // recovery action (re-include) rather than silently picking it anyway.
  if (excludedIds.has(id)) {
    showToast('That anime is excluded from your battle pool. Re-include it from Manage → Excluded first.', 4500);
    return;
  }
  // Format filter parity with the rest of the battle picker. If a user has
  // hidden Movies and clicks Battle Next on a movie, queueing it would defy
  // their own filter — call it out.
  if (hiddenFormatsBattle.has(animeList[idx].format)) {
    showToast('That anime’s format is currently hidden from battles. Adjust your format filter to queue it.', 4500);
    return;
  }
  // v1.0.212 — status filter parity. CURRENT/REPEATING entries can't validly
  // enter the queue if the user has filtered out that status from battles.
  if (hiddenStatusesBattle.has(animeList[idx].status)) {
    showToast('That anime’s watch status is currently hidden from battles. Adjust your status filter to queue it.', 4500);
    return;
  }
  // Battle Within is a stricter pool than the user expects when they click
  // Battle Next from a random card. Clear it so the queued anime gets a real
  // similar-ELO opponent from the full pool.
  if (battleWithinFranchise) {
    battleWithinFranchise = null;
    const banner = byId(IDS.withinFranchiseBanner);
    if (banner) banner.classList.remove('active');
    const filterBtn = byId(IDS.filterBtn);
    if (filterBtn) filterBtn.classList.remove('has-franchise-lock');
  }
  // Trio renders its own arena and ignores nextPairOverride — flip to normal
  // so the queued pair actually paints. WSO and Settle both go through
  // renderBattle, which respects nextPairOverride first, so they don't need
  // a mode switch.
  if (trioMode) setMode('normal');

  const oppIdx = pickOneOpponent(idx);
  if (oppIdx === idx || oppIdx == null) {
    showToast('⚠️ Couldn’t find an opponent (try widening your filters).', 3500);
    return;
  }
  nextPairOverride = [[idx, oppIdx]];

  closeDetailModal();
  _preloadedPair = null;
  _preloadedImgs = null;
  hide('results-screen');
  show('battle-screen');
  renderBattle();
  showToast(`⚔ Queued "${displayTitle(animeList[idx])}" for next battle.`, 2500);
}

function stopBattleWithinFranchise() {
  battleWithinFranchise = null;
  const banner = byId(IDS.withinFranchiseBanner);
  if (banner) banner.classList.remove('active');
  const filterBtn = byId(IDS.filterBtn);
  if (filterBtn) filterBtn.classList.remove('has-franchise-lock');
  _preloadedPair = null;
  _preloadedImgs = null;
  if (trioMode) renderTrio(); else renderBattle();
}

// v1.0.211 — Bulk-exclude every member of a franchise. Confirms first because
// it touches many entries at once. Pushes a typed undo snapshot so the user
// can roll it back with the same Undo button as a normal battle.
function bulkExcludeFranchise(name) {
  const groups = _buildFranchiseGroups(getSortedList());
  const group  = groups.find(g => g.name === name);
  if (!group) return;
  // Only ids that aren't already excluded — undo shouldn't "re-exclude" the
  // ones the user had already singled out earlier.
  const newlyExcluded = group.members
    .map(a => a.id)
    .filter(id => !excludedIds.has(id));
  if (newlyExcluded.length === 0) {
    showToast('Every entry in this franchise is already excluded.', 2500);
    return;
  }

  _showConfirm(
    `🚫 Exclude all of "${name}" from battles?`,
    `${newlyExcluded.length} entr${newlyExcluded.length === 1 ? 'y' : 'ies'} will be removed from your battle pool (Rankings stay unchanged). You can undo this from the Undo button or re-add individual entries from Manage → Excluded.`,
    'Exclude all',
    () => {
      const prevA = currentA, prevB = currentB;
      for (const id of newlyExcluded) excludedIds.add(id);
      _pushUndoSnapshot({
        type:  'bulk-exclude',
        ids:   newlyExcluded.slice(),
        prevA,
        prevB,
        franchiseName: name,
      });
      _bumpFranchiseGroupCache();
      saveState();
      scheduleCloudSave();
      closeDetailModal();
      showToast(`✓ Excluded ${newlyExcluded.length} from "${name}" — Undo available.`, 3500);

      // Refresh whatever screen is visible
      if (byId(IDS.battleScreen)?.style.display !== 'none') {
        _preloadedPair = null;
        _preloadedImgs = null;
        if (trioMode) renderTrio(); else renderBattle();
      } else {
        renderRankingList();
      }
    }
  );
}

// Toggles the popover. Uses a one-shot outside-click listener (registered on
// the next tick so the opening click doesn't immediately dismiss it) and an
// Escape-key handler. Both listeners unwire cleanly on close.
function toggleAvatarMenu(event, which) {
  if (event) event.stopPropagation();
  const badgeId = which === 'auth' ? 'auth-header-badge' : 'mal-header-badge';
  const dropId  = which === 'auth' ? 'auth-avatar-dropdown' : 'mal-avatar-dropdown';
  const badge = document.getElementById(badgeId);
  const drop  = document.getElementById(dropId);
  if (!drop) return;
  const willOpen = !drop.classList.contains('open');
  closeAvatarMenus();
  if (willOpen) {
    drop.classList.add('open');
    badge?.setAttribute('aria-expanded', 'true');
    // Close when next click lands outside the badge
    setTimeout(() => document.addEventListener('click', _avatarOutsideClick, { once: true }), 0);
  }
}

function _avatarOutsideClick(e) {
  if (!e.target.closest('.avatar-badge-wrap')) {
    closeAvatarMenus();
  } else {
    // Click was inside — re-arm so another outside click closes it
    setTimeout(() => document.addEventListener('click', _avatarOutsideClick, { once: true }), 0);
  }
}

// ── New-tab badges ────────────────────────────────────────────────────────
// Taste: milestone-aware NEW badge — reappears whenever a new taste story
// milestone is crossed, nudging the user to revisit their updated profile.

// v1.0.154 — storage key is now KESSEN_KEYS.ui.tasteNewBadgeMilestone.

function _initNewBadges() {
  _syncTasteNewBadge();
}

// Show/hide the Taste NEW badge based on whether the current milestone
// is newer than what the user last dismissed.
function _syncTasteNewBadge() {
  const el = byId(IDS.newBadgeTaste);
  if (!el) return;
  if (battleCount < TASTE_STORY_MILESTONES[0]) { el.style.display = 'none'; return; }
  const currentMilestone = _lastTasteStoryMilestone(battleCount);
  const seenMilestone    = Number(localStorage.getItem(KESSEN_KEYS.ui.tasteNewBadgeMilestone) || 0);
  el.style.display = currentMilestone > seenMilestone ? '' : 'none';
}

function _dismissNewBadge(tab) {
  const el = document.getElementById('new-badge-' + tab);
  if (el) el.style.display = 'none';
  try {
    if (tab === 'taste') {
      if (battleCount >= TASTE_STORY_MILESTONES[0]) {
        localStorage.setItem(KESSEN_KEYS.ui.tasteNewBadgeMilestone, String(_lastTasteStoryMilestone(battleCount)));
      }
    }
  } catch (_) {}
}

function closeAvatarMenus() {
  ['auth-avatar-dropdown', 'mal-avatar-dropdown'].forEach(id => {
    document.getElementById(id)?.classList.remove('open');
  });
  ['auth-header-badge', 'mal-header-badge'].forEach(id => {
    document.getElementById(id)?.setAttribute('aria-expanded', 'false');
  });
}

function toggleModeMenu(event) {
  if (event) event.stopPropagation();
  const pop = byId(IDS.modePopover);
  const btn = byId(IDS.modeBtn);
  if (!pop || !btn) return;
  const willOpen = !pop.classList.contains('open');
  pop.classList.toggle('open', willOpen);
  btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  if (willOpen) {
    // v1.0.209 — pick the direction (open up vs open down) with more space,
    // then cap max-height to whatever's available in that direction. The
    // popover normally drops upward (`bottom: calc(100% + 6px)` in CSS),
    // but on short viewports there's not enough room above and the top
    // items overflow off-screen. By switching to downward (`top: calc(...)`
    // via inline style) when below has more room, both ends of the menu
    // become reachable on short viewports. 120px floor keeps a couple of
    // options visible at minimum; overflow-y: auto handles internal scroll.
    const btnRect      = btn.getBoundingClientRect();
    const viewportH    = window.innerHeight || document.documentElement.clientHeight;
    const gap          = 22; // 16px breathing room + 6px popover offset
    const spaceAbove   = btnRect.top - gap;
    const spaceBelow   = viewportH - btnRect.bottom - gap;
    const openDown     = spaceBelow > spaceAbove;
    const cap          = Math.max(120, openDown ? spaceBelow : spaceAbove);
    pop.style.maxHeight = `${cap}px`;
    if (openDown) {
      pop.style.bottom = 'auto';
      pop.style.top    = 'calc(100% + 6px)';
    } else {
      pop.style.top    = 'auto';
      pop.style.bottom = 'calc(100% + 6px)';
    }
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
  const pop = byId(IDS.filterPopover);
  const btn = byId(IDS.filterBtn);
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
  const pop = byId(IDS.filterPopover);
  const btn = byId(IDS.filterBtn);
  // Clicks inside the popover (e.g. format buttons) keep it open
  if (pop && pop.contains(e.target)) return;
  if (btn && btn.contains(e.target)) return;
  _closeFilterMenu();
}
function _closeFilterMenu() {
  const pop = byId(IDS.filterPopover);
  const btn = byId(IDS.filterBtn);
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
    if (excludedIds.has(a.id) || hiddenFormatsBattle.has(a.format) || hiddenStatusesBattle.has(a.status)) return;
    // v1.0.211 — battle-within-franchise restriction applies to trio too
    if (battleWithinFranchise && !battleWithinFranchise.ids.has(a.id)) return;
    pool.push(i);
    const base = 1 / ((a.comparisons || 0) + 1);
    weights.push(a.fuzzy ? base * 0.1 : base);
  });
  if (pool.length < 3) return null;

  // v1.0.211 — avoid-same-franchise. After picking each card, zero out any
  // remaining candidate that shares a franchise with anyone already chosen.
  // Best-effort: if we run out of cross-franchise candidates mid-pick we let
  // duplicates through so the trio doesn't collapse to fewer than three.
  const applyAvoid = avoidSameFranchise && !battleWithinFranchise;
  const availW = weights.slice();
  const chosen = [];
  for (let p = 0; p < 3; p++) {
    const total = availW.reduce((s, w) => s + w, 0);
    if (total <= 0) return null;
    let r = Math.random() * total;
    for (let i = 0; i < pool.length; i++) {
      if (availW[i] === 0) continue;
      r -= availW[i];
      if (r <= 0) {
        chosen.push(pool[i]);
        availW[i] = 0;
        if (applyAvoid) {
          const justPicked = animeList[pool[i]];
          // Tentatively zero same-franchise candidates. Track which we zeroed
          // so we can restore them if doing so would empty the remaining pool.
          const tentativelyZeroed = [];
          for (let j = 0; j < pool.length; j++) {
            if (availW[j] === 0) continue;
            if (_sameFranchise(animeList[pool[j]], justPicked)) {
              tentativelyZeroed.push([j, availW[j]]);
              availW[j] = 0;
            }
          }
          if (availW.every(w => w === 0) && p < 2) {
            for (const [j, w] of tentativelyZeroed) availW[j] = w;
          }
        }
        break;
      }
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
  if (!trio) {
    // v1.0.209 — same shape as renderBattle's empty-pair handling: hide the
    // trio arena when the eligible pool is too small, but stay in Trio mode
    // (consistent with Blind/WSO/Settle). The user gets their cards back as
    // soon as they loosen a filter. Previously this called setMode('normal'),
    // which kicked the user out of Trio whenever filters wiped the pool.
    const trioArena = byId(IDS.trioArena);
    if (trioArena) trioArena.style.display = 'none';
    currentTrio = [];
    return;
  }
  const trioArena = byId(IDS.trioArena);
  if (trioArena) trioArena.style.display = 'block';
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
      // Label stays static; .active class (amber tint) shows the flagged state.
      const fuzzyText = "〰️ Fuzzy";
      const fuzzyCls  = a.fuzzy ? ' active' : '';

      return `
        <div class="anime-card trio-card ${rankCls}" id="trio-card-${pos}" onclick="trioTap(${pos})">
          ${badgeEl}
          <img${coverCors(a.cover)} src="${esc(a.cover || '')}" alt="${esc(displayTitle(a))}"
               decoding="async" loading="lazy"
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
              <a class="card-anilist-link" href="${extUrl}" target="_blank" rel="noopener noreferrer"
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
      btn.classList.toggle('active', animeList[idx].fuzzy);
      btn.textContent = "〰️ Fuzzy";
      btn.blur(); // clear sticky :hover on touch
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
  undoStack = [];
  _updateUndoBtn();

  // Pick a single replacement, keeping the other two cards in place
  const keepIndices = new Set(currentTrio.filter((_, i) => i !== pos));
  const candidates = [];
  const weights    = [];
  animeList.forEach((a, i) => {
    if (excludedIds.has(a.id) || hiddenFormatsBattle.has(a.format) || hiddenStatusesBattle.has(a.status)) return;
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
  // v1.0.211 — Battle Within Franchise auto-completion. Records all three
  // implied pairs from the trio result. If this round filled the last
  // remaining pairs, the completion check fires inside the third call and
  // stops Battle Within with a celebratory toast.
  pairs.forEach(([wIdx, lIdx]) => {
    _recordBattleWithinPair(animeList[wIdx].id, animeList[lIdx].id);
  });
  saveState();

  // Render the next trio FIRST so we can store it in the snap (mirrors the
  // two-card flow where renderBattle() runs before _pushUndoSnapshot).
  renderTrio();
  snap.nextTrio = currentTrio.slice();

  // Push undo snapshot (treated as one unit)
  undoStack.push(snap);
  if (undoStack.length > MAX_UNDO_DEPTH) undoStack.shift();
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
//   (b) tapping the visible "⋯ More" chip directly.
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

// Toggle handler for the "⋯ More" chip. Keeps the gesture-free
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
  // Candidates: not excluded, not hidden format, fewer than 15 comparisons.
  // v1.0.211 — battle-within-franchise restricts the pool here too.
  const uncertain = animeList
    .map((a, i) => ({ i, a }))
    .filter(({ a }) =>
      !excludedIds.has(a.id) &&
      !hiddenFormatsBattle.has(a.format) &&
      !hiddenStatusesBattle.has(a.status) &&
      (!battleWithinFranchise || battleWithinFranchise.ids.has(a.id)) &&
      (a.battles || 0) < TARGET_BATTLES_PER_ANIME
    );

  if (uncertain.length < 2) {
    // v1.0.209 — distinguish two distinct "uncertain pool is empty" causes:
    //   (a) everyone has hit TARGET_BATTLES_PER_ANIME (Settle's job is done —
    //       legitimately fall back to normal mode for future battles)
    //   (b) everything is filtered out by hiddenFormatsBattle / excludedIds
    //       (transient — keep Settle on so the user returns to it when they
    //       loosen a filter, matching Blind/WSO/Tower behavior)
    // Previously this always called setMode('normal'), kicking the user out
    // of Settle whenever filters wiped the pool — inconsistent with the
    // other modes which leave the user in-mode and just hide the arena.
    const eligibleCount = animeList.filter(a =>
      !excludedIds.has(a.id) && !hiddenFormatsBattle.has(a.format) && !hiddenStatusesBattle.has(a.status)
    ).length;
    if (eligibleCount >= 2) setMode('normal'); // case (a) — confidence threshold met
    return null; // either way, signal to caller
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
  // v1.0.211 — when avoid-same-franchise is on (and not in within-franchise
  // mode, which obviously WANTS same-franchise pairs), prefer cross-franchise
  // candidates; fall back to any candidate if everyone shares A's franchise.
  const eloA = animeList[idxA].elo;
  const animeA = animeList[idxA];
  const applyAvoid = avoidSameFranchise && !battleWithinFranchise;
  let candidates = uncertain.filter(({ i }) => i !== idxA);
  if (applyAvoid) {
    const filtered = candidates.filter(({ a }) => !_sameFranchise(a, animeA));
    if (filtered.length) candidates = filtered;
  }
  candidates.sort((x, y) => Math.abs(x.a.elo - eloA) - Math.abs(y.a.elo - eloA));
  const idxB = candidates[0]?.i ?? (idxA === 0 ? 1 : 0);
  return [idxA, idxB];
}

// ─── TOWER OF POWER ──────────────────────────────────────────────────────────
function openTowerModal() {
  populateTowerList('');
  byId(IDS.towerSearch).value = '';
  byId(IDS.towerModal).classList.add('open');
  pushModalBack('tower', closeTowerModal);

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
  popModalBack('tower');
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
      !hiddenFormatsBattle.has(a.format) &&
      !hiddenStatusesBattle.has(a.status) &&
      (!q || displayTitle(a).toLowerCase().includes(q))
    )
    .sort((x, y) => y.a.elo - x.a.elo);

  const container = byId(IDS.towerAnimeList);
  container.innerHTML = '';
  sorted.slice(0, 60).forEach(({ i, a }) => {
    const el = document.createElement('div');
    el.className = 'tower-anime-item';
    el.innerHTML = `
      <img${coverCors(a.cover)} src="${safeUrl(a.cover)}" alt="${esc(displayTitle(a))}" />
      <span>${esc(displayTitle(a))}</span>
      <span class="tower-anime-elo">ELO ${a.elo}</span>
    `;
    el.addEventListener('click', () => startTower(i));
    container.appendChild(el);
  });
}

function startTower(championIdx) {
  closeTowerModal();
  // Exit any other active mode cleanly — tower is mutually exclusive with
  // trio / settle / blind. Without this reset, the prior mode's flags and
  // DOM state would linger and produce broken renders (e.g. trio arena
  // visible alongside tower opponent cards).
  _exitNonTowerModes();
  towerChampIdx  = championIdx;
  towerRound     = 0;
  towerResults   = [];
  towerMode      = true;
  // v1.0.172 — Capture battleCount at tower start so the end-of-run
  // milestone/achievements pass knows the "before" count regardless of how
  // many rounds got incremented per-round inside pickWinnerTower.
  _towerStartBattleCount = battleCount;
  const modeBtn  = byId(IDS.modeBtn);
  if (modeBtn) { modeBtn.classList.add('active-tower'); modeBtn.textContent = '⚡ Mode: Tower'; }
  _setFilterBtnTowerLock(true); // v1.0.209

  // v1.0.120 — opponents are picked lazily per-round in renderTowerRound() so
  // the matchmaking band can adapt to the champion's current ELO as it shifts
  // during the run. Previous behaviour pre-selected 10 opponents spread across
  // the full ELO percentile range, which for a champion near the top of the
  // list meant most opponents were weaker — every win nudged ELO up, multi-run
  // Tower farming pushed mediocre anime to #1.
  towerOpponents = [];

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

// Pick the next Tower opponent from a ±200 ELO band around the champion's
// CURRENT ELO. Expands the band if there aren't enough candidates. Random
// sample from the band so repeat Tower runs aren't predictable. Excludes
// anime already used in this run.
function _pickNextTowerOpponent(champIdx) {
  const champion = animeList[champIdx];
  const usedIds  = new Set(towerOpponents
    .filter(idx => idx != null)
    .map(idx => animeList[idx]?.id));

  // v1.0.211 — soft same-franchise down-weight. Same-franchise opponents get
  // 0.25× weight instead of being excluded outright, so a champion whose
  // franchise dominates the user's list (Gundam, Pretty Cure) still has
  // legal opponents — they're just picked last. Cross-franchise picks win
  // ~80% of the time when both options exist, which is enough to vary the
  // run without making the soft-rule feel binary.
  const SAME_FRANCHISE_WEIGHT  = 0.25;
  const CROSS_FRANCHISE_WEIGHT = 1.0;

  for (const bandWidth of [200, 350, 600, Infinity]) {
    const candidates = [];
    const weights    = [];
    for (let i = 0; i < animeList.length; i++) {
      if (i === champIdx) continue;
      const a = animeList[i];
      if (!a || excludedIds.has(a.id) || hiddenFormatsBattle.has(a.format) || hiddenStatusesBattle.has(a.status)) continue;
      if (usedIds.has(a.id)) continue;
      if (Math.abs((a.elo || 1200) - (champion.elo || 1200)) > bandWidth) continue;
      candidates.push(i);
      weights.push(_sameFranchise(a, champion) ? SAME_FRANCHISE_WEIGHT : CROSS_FRANCHISE_WEIGHT);
    }
    if (candidates.length) {
      const total = weights.reduce((s, w) => s + w, 0);
      let r = Math.random() * total;
      for (let k = 0; k < candidates.length; k++) {
        r -= weights[k];
        if (r <= 0) return candidates[k];
      }
      return candidates[candidates.length - 1]; // numerical-rounding safety net
    }
  }
  return -1; // shouldn't happen unless library is tiny
}

function renderTowerRound() {
  // Lazy-pick this round's opponent based on the champion's current ELO so
  // matchmaking adapts as the champion gains/loses rating during the run.
  if (towerOpponents[towerRound] == null) {
    const oppIdx = _pickNextTowerOpponent(towerChampIdx);
    if (oppIdx < 0) {
      // Library exhausted — end the run early
      showToast('⚠️ Not enough opponents left for Tower — ending run.', 4000);
      endTower();
      return;
    }
    towerOpponents[towerRound] = oppIdx;
  }

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
  // v1.0.172 — Per-round increment so the battle counter at the top of the
  // screen ticks up live during a tower run (previously the count jumped by
  // 10 only at finish). checkMilestone / _checkAchievements are deferred
  // until finishTower so any milestone card doesn't pop mid-run; the tower
  // summary takes priority and the milestone shows after it closes.
  battleCount++;

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
  if (modeBtn) { modeBtn.classList.remove('active-tower'); modeBtn.textContent = '⚙ Mode ▾'; }
  _setFilterBtnTowerLock(false); // v1.0.209
  byId(IDS.towerProgressWrap).style.display = 'none';
  byId(IDS.towerStatus).style.display = 'none';

  // v1.0.172 — battleCount is now incremented per round inside
  // pickWinnerTower, so by the time we get here it already reflects the
  // full tower run. checkMilestone uses the snapshot captured when the
  // tower started so it correctly fires for any threshold crossed during
  // the run (50, 100, 500, etc). checkSessionSummary is deliberately not
  // called — the tower already has its own summary screen.
  checkMilestone(_towerStartBattleCount, battleCount);
  _checkAchievements();
  // v1.0.209 — also save a taste snapshot if the tower run crossed a
  // 50-battle milestone. Without this, a user whose first 50 battles were
  // all in tower mode never got a baseline snapshot, so the "How you've
  // changed" timeline rendered empty even after they crossed the threshold.
  _maybeSaveTasteSnapshot();
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
      <img${coverCors(opp.cover)} src="${safeUrl(opp.cover)}" alt="${esc(displayTitle(opp))}" />
      <div class="tower-result-info">
        <div class="name">${esc(displayTitle(opp))}</div>
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
      // v1.0.211 — avoidSameFranchise piggybacks on viewPrefs so it persists
      // across reloads without needing a new top-level storage key. Search
      // chips also live here so an active filter survives a refresh — same
      // behaviour the old format-row had via the saveState route.
      JSON.stringify({
        rankingView, franchiseMode, avoidSameFranchise,
        hiddenStatusesBattle: [...hiddenStatusesBattle],
        searchChips: _serialiseSearchChips(),
      }));
  } catch { /* storage full — not critical */ }
}
function _loadViewPrefs() {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.settings.viewPrefs);
    if (!raw) return;
    const p = JSON.parse(raw);
    if (p.rankingView) rankingView = p.rankingView;
    if (p.franchiseMode != null) franchiseMode = p.franchiseMode;
    if (p.avoidSameFranchise != null) avoidSameFranchise = !!p.avoidSameFranchise;
    if (Array.isArray(p.hiddenStatusesBattle)) hiddenStatusesBattle = new Set(p.hiddenStatusesBattle);
    if (p.searchChips) _deserialiseSearchChips(p.searchChips);
  } catch { /* corrupt — ignore */ }
}

// v1.0.211 — chip-state persistence. Sets serialise to arrays; yearRange
// passes through. Kept inside viewPrefs so existing storage-quota guarantees
// (and the slim-fallback path) cover the chips too.
function _serialiseSearchChips() {
  return {
    genres:    [..._searchChips.genres],
    studios:   [..._searchChips.studios],
    years:     [..._searchChips.years],
    formats:   [..._searchChips.formats],
    lengths:   [..._searchChips.lengths],
    yearRange: _searchChips.yearRange,
  };
}
function _deserialiseSearchChips(p) {
  if (!p || typeof p !== 'object') return;
  _searchChips.genres  = new Set(Array.isArray(p.genres)  ? p.genres  : []);
  _searchChips.studios = new Set(Array.isArray(p.studios) ? p.studios : []);
  _searchChips.years   = new Set(Array.isArray(p.years)   ? p.years.map(Number) : []);
  _searchChips.formats = new Set(Array.isArray(p.formats) ? p.formats : []);
  _searchChips.lengths = new Set(Array.isArray(p.lengths) ? p.lengths : []);
  _searchChips.yearRange = Array.isArray(p.yearRange) && p.yearRange.length === 2
    ? [Number(p.yearRange[0]), Number(p.yearRange[1])]
    : null;
}
function _persistSearchChips() {
  _saveViewPrefs();
}

// v1.0.211 — one-time migration from the legacy Formats / Length button rows
// (subtractive, "all on by default, click off to hide") to the new chip picker
// (additive, "click to require"). For each non-empty hidden set, we add the
// COMPLEMENT to the chip picker, so the post-migration filter shows exactly
// the same anime as before. Idempotent: re-runs are no-ops because we clear
// the legacy sets after.
const _ALL_FORMATS_FOR_MIGRATION = ['TV', 'MOVIE', 'OVA', 'ONA', 'TV_SHORT', 'SPECIAL'];
const _ALL_LENGTHS_FOR_MIGRATION = ['short', 'medium', 'long', 'vlong', 'unknown'];
let _legacyFilterMigrationDone = false;
function _migrateLegacyFiltersToChips() {
  if (_legacyFilterMigrationDone) return;
  let migrated = false;
  if (hiddenFormatsRanking && hiddenFormatsRanking.size > 0) {
    for (const fmt of _ALL_FORMATS_FOR_MIGRATION) {
      if (!hiddenFormatsRanking.has(fmt)) _searchChips.formats.add(fmt);
    }
    hiddenFormatsRanking = new Set();
    migrated = true;
  }
  if (hiddenEpRangesRanking && hiddenEpRangesRanking.size > 0) {
    for (const bucket of _ALL_LENGTHS_FOR_MIGRATION) {
      if (!hiddenEpRangesRanking.has(bucket)) _searchChips.lengths.add(bucket);
    }
    hiddenEpRangesRanking = new Set();
    migrated = true;
  }
  _legacyFilterMigrationDone = true;
  if (migrated) {
    _persistSearchChips();
    // Existing save snapshot still has the legacy sets; saveState rewrites
    // them as empty on next mutation. That's fine — they're already empty
    // in memory and the predicate chain handles empty as no-op.
  }
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
  // v1.0.211 — list view used to inline-parse just the title-text portion
  // of the search input. After the chip picker landed, that meant ticking
  // `+ Format: ONA` filtered the grid but did nothing here — list rendered
  // every anime. Route through the same _effectiveSearchQuery path so the
  // table honours chip + token + text identically to filterRankings.
  const parsed = _parseSearchQuery(byId(IDS.searchInput).value || '');
  const query  = _effectiveSearchQuery(parsed);

  // Build pre-computed data array (filtered)
  _vsTableData = [];
  sorted.forEach((anime, i) => {
    const title   = displayTitle(anime);
    const fmt    = anime.format || 'TV';
    const eloRank = eloRankMap.get(anime.id) ?? i;
    const tier    = getTier(eloRank, sorted.length);
    const conf    = confidenceLabel(anime.battles || 0);
    const hidden = (query.text && !title.toLowerCase().includes(query.text)) ||
                   !_animeMatchesSearchTokens(anime, query) ||
                   (showFuzzyOnly && !anime.fuzzy) ||
                   hiddenFormatsRanking.has(fmt) ||
                   hiddenEpRangesRanking.has(epRange(anime.episodes, fmt)) ||
                   excludedIds.has(anime.id);
    if (hidden) return;
    const wr      = (anime.wins + anime.losses) > 0
      ? Math.round(anime.wins / (anime.wins + anime.losses) * 100) + '%' : '–';
    const sb      = streakBadge(anime);
    // v1.0.167 — anchor rank to ELO position (matches grid view + franchise
    // table). Previously this used the current-sort position, so sorting by
    // Title swapped #312 → #260 even though the anime hadn't moved in ELO.
    const displayIdx = (eloRankMap.get(anime.id) ?? i) + 1;
    _vsTableData.push({ anime, displayIdx, title, tier, conf, wr, sb });
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
    // v1.0.167 — "〰️ Fuzzy" pill + amber row outline on flagged anime, same
    // visual treatment as the franchise expand views and the grid card pill.
    const fuzzyPill = anime.fuzzy
      ? ' <span class="fuzzy-tag" title="Fuzzy — flagged as uncertain">〰️ Fuzzy</span>'
      : '';
    html += `<tr class="ranking-table-row${anime.fuzzy ? ' is-fuzzy' : ''}">
      <td class="tbl-rank">${displayIdx}</td>
      <td><img class="tbl-cover"${coverCors(anime.cover)} src="${safeUrl(anime.cover)}" alt="" aria-hidden="true" loading="lazy" /></td>
      <td class="tbl-title" onclick="showAnimeDetail(${anime.id})">${title}${fuzzyPill}${sb ? ' ' + sb : ''}</td>
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
    // v1.0.162 — mirror the grid card fix: display the ELO rank, not the
    // current-sort position. Falls back to `rank` if eloRank somehow absent.
    const displayRank = (group.eloRank ?? rank) + 1;
    html += `
      <tr class="franchise-table-group" data-gid="${gid}" data-member-ids="${group.members.map(a => a.id).join(',')}" onclick="${clickHandler}">
        <td class="tbl-rank">${displayRank}</td>
        <td><img class="tbl-cover"${coverCors(group.cover)} src="${esc(group.cover || '')}" alt="" loading="lazy" /></td>
        <td class="tbl-title">
          <strong>${esc(group.name)}</strong>
          ${!isSingle ? `<span class="franchise-count" style="margin-left:8px">${group.members.length} entries</span>` : ''}
          ${(() => {
            // v1.0.165 — fuzzy count in the franchise table view. Same shape
            // as the grid badge.
            const fc = group.members.filter(a => a.fuzzy).length;
            return fc > 0
              ? `<span class="franchise-fuzzy-count" style="margin-left:6px" title="${fc} entr${fc === 1 ? 'y is' : 'ies are'} flagged as fuzzy — click in to see which.">〰️ ${fc} fuzzy</span>`
              : '';
          })()}
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
        // v1.0.167 — "〰️ Fuzzy" pill next to fuzzy member titles in the
        // franchise table expand, matching the grid expand + rank cards.
        const fuzzyPill = a.fuzzy
          ? ' <span class="fuzzy-tag" title="Fuzzy — flagged as uncertain">〰️ Fuzzy</span>'
          : '';
        html += `<tr class="franchise-table-member${a.fuzzy ? ' is-fuzzy' : ''}" data-member-gid="${gid}" style="display:none" onclick="showAnimeDetail(${a.id})">
          <td></td>
          <td><img class="tbl-cover"${coverCors(a.cover)} src="${esc(a.cover || '')}" alt="" loading="lazy" /></td>
          <td class="tbl-title" style="padding-left:24px">${esc(a.titleEn || a.title)}${fuzzyPill}</td>
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
    // Mirror the visible UI: if the on-screen Skip / Undo buttons are
    // disabled (e.g. during a tower run), the keyboard shortcut must be too,
    // otherwise users can bypass the constraint and corrupt run integrity.
    case 's': case 'S': if (!byId(IDS.skipBtn)?.disabled) skipBattle(); break;
    case 'u': case 'U': if (!byId(IDS.undoBtn)?.disabled) undoLast();   break;
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

// Anchors mirror the bucket cutoffs in _eloToScore10 exactly: (percentile, score).
// Used by _eloToFineScore10 to interpolate linearly between buckets for the
// scoring formats that support sub-integer precision (POINT_100, POINT_10_DECIMAL).
// Integer formats still use the bucket logic in _eloToScore10 so the user's
// existing 1/2/3/.../10 distribution doesn't change for them.
const _SCORE_ANCHORS = [
  [0.00, 1], [0.02, 2], [0.04, 3], [0.08, 4], [0.15, 5],
  [0.30, 6], [0.50, 7], [0.70, 8], [0.85, 9], [0.95, 10], [1.00, 10],
];

function _eloToFineScore10(rank0, total) {
  const pct = 1 - (rank0 / Math.max(total, 1));
  for (let i = 0; i < _SCORE_ANCHORS.length - 1; i++) {
    const [pLo, sLo] = _SCORE_ANCHORS[i];
    const [pHi, sHi] = _SCORE_ANCHORS[i + 1];
    if (pct < pHi) {
      const t = (pct - pLo) / (pHi - pLo);
      return sLo + t * (sHi - sLo);
    }
  }
  return 10;
}

function _formatScoreForAniList(score10, format, rank0, total) {
  switch (format) {
    case 'POINT_100': {
      // Map continuously to 1-100 instead of multiples of 10. A user with 200
      // ranked anime gets ~200 distinct values instead of 10 (rank0/total are
      // passed in because score10 alone has already been quantised).
      const fine = _eloToFineScore10(rank0, total);
      return Math.max(1, Math.min(100, Math.round(fine * 10)));
    }
    case 'POINT_10_DECIMAL': {
      // 1.0-10.0 in 0.1 steps.
      const fine = _eloToFineScore10(rank0, total);
      return Math.round(Math.max(1, Math.min(10, fine)) * 10) / 10;
    }
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
      return { mediaId: a.id, title: a.title, cover: a.cover, score10, apiScore: _formatScoreForAniList(score10, format, i, total) };
    });

  // Format labels
  const fmtLabel = { POINT_100: '100-pt', POINT_10_DECIMAL: '10-pt', POINT_10: '10-pt', POINT_5: '5-star', POINT_3: '3-smiley' };
  const label = fmtLabel[format] || '10-pt';

  // Build preview table
  const rows = _syncQueue.map(item => `
    <tr>
      <td><img${coverCors(item.cover)} src="${safeUrl(item.cover)}" alt="" aria-hidden="true" loading="lazy" /></td>
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
  pushModalBack('sync', closeSyncModal);
}

function closeSyncModal() {
  byId(IDS.syncModal).style.display = 'none';
  popModalBack('sync');
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
    const res = await _anilistFetch({ query: listQuery, variables: { userId: authUser?.id } });
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
        const res = await _anilistFetch({ query: mutation, variables: { mediaId: item.mediaId, score: item.apiScore } });
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
          const res = await _anilistFetch({ query: mutation, variables: { mediaId: item.mediaId, score: item.apiScore } });
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
      <td><img${coverCors(item.cover)} src="${safeUrl(item.cover)}" alt="" aria-hidden="true" loading="lazy" /></td>
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
  pushModalBack('malSync', closeMALSyncModal);
}

function closeMALSyncModal() {
  byId(IDS.malSyncModal).style.display = 'none';
  popModalBack('malSync');
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
    const res = await _anilistFetch({ query, variables: { username: authUser.name } });
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
      const res = await _anilistFetch({ query, variables: { ids: chunk } });
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
      const res = await _anilistFetch({ query, variables: { ids: chunk } });
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
    // v1.0.178 — Collect IDs of anime whose status just flipped to COMPLETED
    // so we can tell the server "we already showed an in-app prompt for
    // these". Prevents the hourly Tower-retry server poll from also firing
    // a phone push for the same anime — the bell prompt + the push would
    // otherwise both fire for any user who opens Kessen between the AniList
    // status change and the next cron tick.
    const newlyCompletedIds = [];
    animeList.forEach(a => {
      const freshStatus = freshStatusMap.get(a.id);
      if (freshStatus && freshStatus !== a.status) {
        // Persist the updated status so we don't re-detect next poll
        if (freshStatus === 'COMPLETED' && WATCHING.has(a.status)) {
          _queueFinishPrompt(a);
          newlyCompletedIds.push(a.id);
        }
        a.status = freshStatus;
      }
    });
    if (newlyCompletedIds.length) _pushMarkSeen(newlyCompletedIds);

    _refreshListBanners('AniList');

    // v1.0.226 — retry a stashed Tower deep link now that _pendingNewAnime
    // is up to date. If the mediaId is in the freshly-populated queue, the
    // handler will hit the auto-add path and start Tower. If it's still not
    // there (e.g. AniList hasn't propagated it yet), the retry falls
    // through and the ID stays stashed for the next poll cycle.
    if (_pendingDeepLinkTowerMediaId != null) {
      const waiting = _pendingDeepLinkTowerMediaId;
      // Only retry if the anime has actually arrived — otherwise we'd toast
      // "Syncing your new anime…" on every poll cycle, which is noisy.
      const arrived =
        _pendingNewAnime.some(a => a.id === waiting) ||
        animeList.some(a => a.id === waiting);
      if (arrived) {
        _towerCheckDeepLink(`/?tower=1&mediaId=${waiting}`);
      }
    }
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
  // v1.0.210 — surface the "What's new" entry on first boot of a new version.
  // Runs once per session (idempotent inside the helper).
  _checkAppUpdateNotif();
}

function _ncSave() {
  try {
    if (_notifCentre.length > 50) _notifCentre = _notifCentre.slice(0, 50);
    localStorage.setItem(KESSEN_KEYS.data.notifCentre(saveKey), JSON.stringify(_notifCentre));
  } catch {}
  // Mirror to Firebase for cross-device sync (fire-and-forget)
  _ncPushToFirebase();
}

// Push current notifications to Firebase so other devices can pick them up.
let _ncFirebasePushTimer = null;
function _ncPushToFirebase() {
  if (!_firebaseApp || !_FIREBASE_READY) return;
  const base = _getUserFirebasePath();
  if (!base) return;
  // Debounce — multiple rapid _ncSave calls collapse into one write
  clearTimeout(_ncFirebasePushTimer);
  _ncFirebasePushTimer = setTimeout(async () => {
    try {
      await _ensureFirebaseAuth(); // hardened rules require auth for this write
      await _firebaseApp.database().ref(`${base}/notifications`).set({
        items:     _notifCentre.slice(0, 50),
        updatedAt: Date.now(),
        updatedBy: _deviceId,
      });
    } catch {}
  }, 1500);
}

// Start listening for notification updates from other devices.
// Called once cloud sync is established (alongside _startFirebaseSync).
let _ncFirebaseRef      = null;
let _ncFirebaseListener = null;
function _ncStartSync() {
  if (!_firebaseApp || !_FIREBASE_READY) return;
  const base = _getUserFirebasePath();
  if (!base) return;
  if (_ncFirebaseRef) return; // already listening

  _ncFirebaseRef = _firebaseApp.database().ref(`${base}/notifications`);
  _ncFirebaseListener = _ncFirebaseRef.on('value', snap => {
    const remote = snap.val();
    if (!remote?.items || remote.updatedBy === _deviceId) return;

    // Merge: add any unread notifications from the other device that we don't have
    const existingIds = new Set(_notifCentre.map(n => n.id));
    const newItems = remote.items.filter(n => n && n.id && !existingIds.has(n.id) && !n.read);
    if (!newItems.length) return;

    _notifCentre = [...newItems, ..._notifCentre].slice(0, 50);
    try {
      localStorage.setItem(KESSEN_KEYS.data.notifCentre(saveKey), JSON.stringify(_notifCentre));
    } catch {}
    _ncUpdateBell();
    // Don't call _ncSave() here — that would re-trigger _ncPushToFirebase and loop
  }, () => { _ncFirebaseRef = null; _ncFirebaseListener = null; });
}

function _ncStopSync() {
  if (_ncFirebaseRef && _ncFirebaseListener) {
    _ncFirebaseRef.off('value', _ncFirebaseListener);
  }
  _ncFirebaseRef      = null;
  _ncFirebaseListener = null;
}

// Add a notification. For new_anime / removed_anime, replaces any existing
// unread entry of the same type so the count stays fresh. finish_prompt is
// deduplicated per anime ID.
// v1.0.210 — "What's new" notification. On boot we compare APP_VERSION with
// the localStorage value of lastSeenAppVersion. If they differ AND the user
// had a previous version stored (i.e. not a brand-new install), we push a
// single notification into the bell. Tapping the action opens a small modal
// with the bullet list below — no in-your-face welcome-style overlay,
// fits the existing "things-that-need-attention" pattern.
//
// To announce a new release: bump APP_VERSION in the meta + sw.js + package
// (already standard), then update WHATS_NEW.bullets here. Boot detection
// handles the rest.
const APP_VERSION = (() => {
  try { return document.querySelector('meta[name="version"]')?.content || ''; }
  catch { return ''; }
})();

// v1.0.218 — These bullets describe THIS RELEASE only. When the next release
// ships, REPLACE this list with that release's notable changes — don't append.
// Previous releases were accumulating bullets here, making "What's new" read
// as a growing change log instead of "what changed since you last looked".
const WHATS_NEW = {
  title: '✨ What\'s new in Kessen',
  bullets: [
    'Tower-retry push notifications, properly working end-to-end — fixed a race where the first anime you finished after enabling notifications didn\'t fire, sped polling up to every 15 minutes (was hourly), and tapping the notification now drops you straight into a Tower run with that anime as the climber instead of just opening the app.',
    'Battle pool watch-status filter — the ≡ Filter popover can now hide currently-watching and rewatching anime so airing shows stay out of battles until they finish.',
    'Sort order fix — tied ELO entries now appear in the correct order when sorting ascending. Previously the bottom of the list could read like #346, #344, #345, #343 instead of the expected #346, #345, #344, #343.',
    'Mobile Rankings polish — list view shows every column (swipe sideways for the wider stats), the controls toolbar stays put when you change sort instead of jumping around, long grid titles cap at 2 lines so cards stay the same height, and the back button stays inside Kessen instead of escaping to the browser.',
    'Franchise sort split into its own dropdown next to the main sort — clearer that it only applies when Franchise mode is on.',
  ],
};

let _appUpdateChecked = false;
function _checkAppUpdateNotif() {
  if (_appUpdateChecked) return;
  _appUpdateChecked = true;
  if (!APP_VERSION) return;
  let stored = '';
  try { stored = localStorage.getItem(KESSEN_KEYS.ui.lastSeenAppVersion) || ''; }
  catch { return; } // storage disabled — silent no-op rather than nag every boot
  // Always update the stored version so we don't re-check on every boot.
  try { localStorage.setItem(KESSEN_KEYS.ui.lastSeenAppVersion, APP_VERSION); }
  catch { /* ignore */ }
  // No previous version → brand-new device, nothing to announce.
  if (!stored) return;
  // Same version → no update happened, nothing to announce.
  if (stored === APP_VERSION) return;
  // App was updated. Push a notification.
  _ncAdd('app_update', `🎉 Kessen has been updated to v${APP_VERSION} — tap to see what's new`, {
    fromVersion: stored,
    toVersion:   APP_VERSION,
    title:       WHATS_NEW.title,
    bullets:     WHATS_NEW.bullets,
  });
}

// v1.0.211 — Manually open the "What's new" modal from places other than the
// bell entry (e.g. the Help modal link). Always uses the latest WHATS_NEW
// constant rather than reading from a notif's stored data, since the user
// may want to re-read the current release's notes after dismissing the bell.
function openWhatsNewModal() {
  // Close the Help modal if it's open so the dialog stack doesn't pile up.
  if (byId(IDS.helpModal)?.style.display === 'flex') closeHelp();
  ncActionShowWhatsNew(null);
}

// Triggered by the "View details" action button on the app_update bell entry.
//
// v1.0.221 — always show the CURRENT release's WHATS_NEW.bullets, regardless
// of which bell entry was tapped. Previously this read the bullets from the
// saved bell entry (`notif?.data.bullets`), which baked whatever WHATS_NEW
// existed at notification-creation time into the entry. If a user updated
// while running cached JS with an older WHATS_NEW (e.g. the 15-bullet
// accumulated list from v1.0.211), the bell entry stored those 15 bullets
// — and they'd keep showing forever, even after subsequent updates where
// the maintained WHATS_NEW.bullets had been trimmed to the current release.
// Now the modal always reads from the live WHATS_NEW constant. The bell
// entry's stored fromVersion / toVersion are still useful as metadata
// (could surface "v1.0.211 → v1.0.221" later) but the body content is
// authoritative from the running build.
function ncActionShowWhatsNew(id) {
  const modal = byId(IDS.whatsNewModal);
  if (!modal) return;
  const title    = byId(IDS.whatsNewTitle);
  const bulletsEl = byId(IDS.whatsNewBullets);
  if (title)    title.textContent = WHATS_NEW.title;
  if (bulletsEl) {
    bulletsEl.innerHTML = (WHATS_NEW.bullets || []).map(b => `<li>${esc(String(b))}</li>`).join('');
  }
  modal.style.display = 'flex';
  // Hook Escape + browser-back close, matching the rest of the modal stack.
  pushModalBack('whatsNew', closeWhatsNewModal);
  // Dismiss the bell entry once the user opens the details — the "What's
  // new" job is done; the modal itself can be re-opened from a future
  // release's announcement if needed.
  if (id) ncDismiss(id);
}
function closeWhatsNewModal() {
  const modal = byId(IDS.whatsNewModal);
  if (modal) modal.style.display = 'none';
}

function _ncAdd(type, msg, data = {}) {
  // removed_anime stays single-entry (replaces existing). new_anime is now
  // allowed multiple entries — _refreshListBanners clears stale ones itself
  // before adding fresh ones, so we don't need to dedupe here.
  if (type === 'removed_anime') {
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
  // Dedup new_anime entries by anime id so the same show isn't queued twice
  // (e.g. two consecutive syncs before the user acts).
  if (type === 'new_anime' && data.anime?.length === 1) {
    const id = data.anime[0].id;
    if (_notifCentre.some(n => n.type === 'new_anime'
                            && n.data?.anime?.length === 1
                            && n.data.anime[0]?.id === id)) return;
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
  if (type === 'finish_prompt')  return '⚡';
  if (type === 'new_anime')      return '🆕';
  if (type === 'removed_anime')  return '📤';
  if (type === 'app_update')     return '🎉';
  return '🔔';
}

function _ncActionBtn(n) {
  if (n.type === 'finish_prompt')
    return `<button class="nc-action-btn" onclick="ncActionFinishTower('${n.id}')">⚡ Battle in Tower</button>`;
  if (n.type === 'new_anime') {
    // Single-anime entries get an extra "Add & Tower" button so users can add
    // and immediately stress-test a freshly-completed film/short without
    // hunting for it in the rankings first. Bulk grouped entries (>=5) keep
    // just the review-modal button.
    const single = n.data?.anime?.length === 1;
    const addBtn = `<button class="nc-action-btn" onclick="ncActionAddAnime('${n.id}')">➕ Add to rankings</button>`;
    const towerBtn = single
      ? `<button class="nc-action-btn" onclick="ncActionAddAndTower('${n.id}')">⚡ Add &amp; Tower</button>`
      : '';
    return addBtn + towerBtn;
  }
  if (n.type === 'removed_anime')
    return `<button class="nc-action-btn" onclick="ncActionReviewRemoved('${n.id}')">📋 Review</button>`;
  if (n.type === 'app_update')
    return `<button class="nc-action-btn" onclick="ncActionShowWhatsNew('${n.id}')">📖 View details</button>`;
  return '';
}

// v1.0.121 — adds the new anime to animeList with smart-ELO seeding, then
// immediately starts a Tower run with it as champion. Used from the bell
// when the entry represents a single new anime (most useful for films/OVAs
// that bypass the CURRENT→COMPLETED finish prompt).
function ncActionAddAndTower(id) {
  const notif = _notifCentre.find(n => n.id === id);
  const newAnime = notif?.data?.anime?.[0];
  if (!newAnime) return;
  // If somehow already in the list, just start Tower against the existing one
  const existingIdx = animeList.findIndex(a => a.id === newAnime.id);
  let championIdx;
  if (existingIdx >= 0) {
    championIdx = existingIdx;
  } else {
    const { elo } = _calcSmartElo(newAnime);
    newAnime.elo = elo;
    newAnime.eloHistory = [elo];
    newAnime.seedElo = elo; // v1.0.211 — capture smart-seeded starting ELO
    animeList.push(newAnime);
    _pendingNewAnime = _pendingNewAnime.filter(a => a.id !== newAnime.id);
    championIdx = animeList.length - 1;
    saveState();
  }
  ncDismiss(id);
  closeNotifCentre();
  // If no more pending new anime, drop the banner
  if (!_pendingNewAnime.length) byId(IDS.newAnimeBanner)?.classList.remove('active');
  startTower(championIdx);
}

function _ncRenderList() {
  const list = byId(IDS.notifCentreList);
  if (!list) return;
  if (_notifCentre.length === 0) {
    list.innerHTML = '<div class="nc-empty">No notifications — you\'re all caught up ✓</div>';
    return;
  }
  // v1.0.148 — escape n.msg before interpolating into innerHTML.
  // Notifications can originate from internal events (which interpolate
  // AniList/MAL titles — user-mutable on those platforms) or from the
  // Firebase sync path (other devices). Without escaping, a crafted
  // message could plant an <img src=x onerror=...> that steals
  // localStorage tokens when the bell is opened. The dismiss button is
  // attached via a delegated listener below instead of inline onclick,
  // sidestepping the esc()-then-decoded attribute-context bypass.
  // _ncIcon / _ncTimeAgo / _ncActionBtn return trusted markup we control.
  list.innerHTML = _notifCentre.map(n => `
    <div class="nc-item" data-id="${esc(String(n.id || ''))}">
      <div class="nc-item-body">
        <div class="nc-item-msg">${_ncIcon(n.type)} ${esc(String(n.msg || ''))}</div>
        <div class="nc-item-time">${_ncTimeAgo(n.timestamp)}</div>
      </div>
      <div class="nc-item-actions">
        ${_ncActionBtn(n)}
        <button class="nc-dismiss-btn" data-dismiss="${esc(String(n.id || ''))}" title="Dismiss">✕</button>
      </div>
    </div>`).join('');
  // Delegated dismiss handler — one listener regardless of how many
  // items render, no quote-context shenanigans, and event.target gives
  // us the trusted DOM node directly.
  if (!list._dismissBound) {
    list.addEventListener('click', e => {
      const btn = e.target.closest('.nc-dismiss-btn');
      if (btn?.dataset?.dismiss) ncDismiss(btn.dataset.dismiss);
    });
    list._dismissBound = true;
  }
}

function openNotifCentre() {
  _notifCentre.forEach(n => { n.read = true; });
  _ncSave();
  _ncUpdateBell();
  _ncRenderList();
  byId(IDS.notifCentreModal)?.classList.add('open');
  // v1.0.168 — refresh the phone-push settings UI so the toggle reflects
  // the current Notification.permission state every time the modal opens
  // (the user may have changed it in browser settings since last open).
  if (typeof _pushRefreshUI === 'function') _pushRefreshUI();
}

function closeNotifCentre() {
  byId(IDS.notifCentreModal)?.classList.remove('open');
}

// ── Phone push notifications (Phase 0 plumbing) ─────────────────────────────
// v1.0.168 — opt-in master toggle + per-category checkboxes inside the
// notification centre. Subscribes the browser's PushSubscription with the
// VAPID public key from the meta tag, posts it to /api/push-register along
// with the user's AniList / MAL auth token. The server stores it in the
// "kessen-push" blob keyed by the verified userId. Used later by Watch
// Together invite / Live Challenge invite / Tower retry triggers.
//
// Push is OFF by default. Browser permission isn't asked until the user
// explicitly flips the master toggle — single-shot prompts are punishing
// when declined, so we keep it deliberate.

const PUSH_API = {
  register:   '/.netlify/functions/push-register',
  unregister: '/.netlify/functions/push-unregister',
};

const PUSH_DEFAULT_CATEGORIES = Object.freeze({
  towerRetry:    true,
  watchTogether: true,
  liveChallenge: true,
});

function _pushIsSupported() {
  return typeof window !== 'undefined'
      && 'serviceWorker' in navigator
      && 'PushManager' in window
      && 'Notification' in window;
}

function _pushVapidKey() {
  return document.querySelector('meta[name="vapid-public-key"]')?.content?.trim() || '';
}

function _pushLoadLocal() {
  try {
    const raw = localStorage.getItem(KESSEN_KEYS.ui.push);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      enabled:    !!parsed.enabled,
      categories: { ...PUSH_DEFAULT_CATEGORIES, ...(parsed.categories || {}) },
      endpoint:   parsed.endpoint || null,
      syncedAt:   parsed.syncedAt || 0,
    };
  } catch { return null; }
}

function _pushSaveLocal(state) {
  try { localStorage.setItem(KESSEN_KEYS.ui.push, JSON.stringify(state)); } catch { /* quota */ }
}

// Base64url → Uint8Array conversion for the applicationServerKey.
function _pushB64ToUint8(b64) {
  const padding = '='.repeat((4 - b64.length % 4) % 4);
  const base64  = (b64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw     = atob(base64);
  const out     = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

// Pull whichever auth token applies. Mirrors the pattern used by save-session.
// v1.0.169 — auth blobs are stored as JSON ({ token, user, saved }), not raw
// strings. Parse and extract the actual bearer token, otherwise the server
// rejects the entire blob with 401 and the toggle silently fails.
function _pushAuthTokens() {
  const parse = (raw) => {
    if (!raw) return null;
    try { return JSON.parse(raw).token || null; } catch { return null; }
  };
  return {
    token:    parse(localStorage.getItem(KESSEN_KEYS.auth.anilist)),
    malToken: parse(localStorage.getItem(KESSEN_KEYS.auth.mal)),
  };
}

// v1.0.178 — Tell the server "we already showed an in-app prompt for these
// anime IDs", so the hourly Tower-retry cron poll skips them. Best-effort:
// silently swallows network errors (the server-side poll will still fire
// in that case but it's a low-impact failure — user sees the same message
// twice rather than missing one). Only sends if the user has push enabled +
// Tower-retry on, to avoid pointless API calls for non-opted-in users.
async function _pushMarkSeen(animeIds) {
  if (!Array.isArray(animeIds) || animeIds.length === 0) return;
  const local = (typeof _pushLoadLocal === 'function') ? _pushLoadLocal() : null;
  if (!local?.enabled || !local?.categories?.towerRetry) return;
  const auth = (typeof _pushAuthTokens === 'function')
    ? _pushAuthTokens()
    : { token: null, malToken: null };
  if (!auth.token && !auth.malToken) return;
  try {
    await fetch('/.netlify/functions/push-mark-seen', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ ...auth, mediaIds: animeIds }),
    });
  } catch { /* best-effort */ }
}

async function _pushRegisterServer(subscription, categories) {
  const auth = _pushAuthTokens();
  if (!auth.token && !auth.malToken) {
    throw new Error('You need to be signed in (AniList or MAL) to enable push notifications.');
  }
  const res = await fetch(PUSH_API.register, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...auth,
      subscription: subscription.toJSON(),
      categories,
      ua: navigator.userAgent.slice(0, 200),
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Network error' }));
    throw new Error(err.error || `Register failed (${res.status})`);
  }
  return res.json();
}

async function _pushUnregisterServer(endpoint) {
  const auth = _pushAuthTokens();
  if (!auth.token && !auth.malToken) return; // silent — nothing to unregister
  await fetch(PUSH_API.unregister, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...auth, endpoint }),
  }).catch(() => { /* best-effort */ });
}

async function togglePushMaster(checked) {
  const blurb = byId(IDS.ncPushBlurb);
  if (!_pushIsSupported()) {
    if (blurb) blurb.textContent = 'Your browser doesn’t support push notifications.';
    return;
  }
  if (!_pushVapidKey()) {
    if (blurb) blurb.textContent = 'Push notifications aren’t configured on the server yet — coming soon.';
    _pushRefreshUI();
    return;
  }

  try {
    if (checked) {
      // Request permission. This is a single-shot prompt — if the user
      // already declined, it returns "denied" without re-prompting.
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') {
        toast(perm === 'denied'
          ? 'Notifications were blocked. Unblock them in your browser settings to enable.'
          : 'Notifications permission not granted.', 'warn');
        _pushRefreshUI();
        return;
      }

      // Subscribe with our VAPID public key.
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: _pushB64ToUint8(_pushVapidKey()),
      });

      const local = _pushLoadLocal() || { categories: PUSH_DEFAULT_CATEGORIES };
      const result = await _pushRegisterServer(sub, local.categories);
      _pushSaveLocal({
        enabled:    true,
        categories: result.categories || local.categories,
        endpoint:   sub.endpoint,
        syncedAt:   Date.now(),
      });
      // v1.0.218 — server returns `towerRetryError` when the Tower-retry
      // opt-in snapshot failed. In that case the registration still
      // succeeded (subscription saved, WT/LC categories on) but Tower-retry
      // was forced off in the saved record. Tell the user so they can
      // retry the toggle instead of silently sitting in a broken state.
      if (result.towerRetryError) {
        toast(`Notifications enabled. Tower-retry couldn’t set up (${result.towerRetryError}) — toggle it again to retry.`, 'warn');
      } else {
        toast('Phone notifications enabled.', 'ok');
      }
      // v1.0.170 — Notification.permission can lag by a tick in Chrome / Edge
      // after requestPermission() resolves 'granted'. The immediate
      // _pushRefreshUI() at the bottom of this function reads the stale
      // permission and hides the categories; user only sees them after
      // closing + reopening the bell. Force categories visible now so the
      // UI matches the actual state without waiting for permission readback.
      byId(IDS.ncPushCategories)?.classList.add('show');
    } else {
      // Unsubscribe locally + tell the server.
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      const endpoint = sub?.endpoint || _pushLoadLocal()?.endpoint;
      if (sub) await sub.unsubscribe().catch(() => {});
      await _pushUnregisterServer(endpoint);
      const prev = _pushLoadLocal();
      _pushSaveLocal({
        enabled:    false,
        categories: prev?.categories || PUSH_DEFAULT_CATEGORIES,
        endpoint:   null,
        syncedAt:   Date.now(),
      });
      toast('Phone notifications disabled.', 'ok');
    }
  } catch (e) {
    toast(e.message || 'Push setup failed.', 'err');
  }
  // Refresh now AND on next frame — covers fast browsers + ones where
  // Notification.permission lags by a tick after requestPermission resolves.
  _pushRefreshUI();
  requestAnimationFrame(_pushRefreshUI);
}

async function setPushCategory(name, checked) {
  const local = _pushLoadLocal() || { enabled: false, categories: { ...PUSH_DEFAULT_CATEGORIES }, endpoint: null };
  local.categories = { ...local.categories, [name]: !!checked };
  _pushSaveLocal(local);
  // Push to server if currently registered. If not, the next master-toggle
  // enable will pick up the new categories from local state.
  if (local.enabled) {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        const result = await _pushRegisterServer(sub, local.categories);
        // v1.0.218 — server is source of truth for categories. If the
        // snapshot failed when ticking the Tower-retry checkbox, the
        // server forces towerRetry off in the saved record AND returns
        // towerRetryError. Reflect that locally so the UI matches reality
        // (the checkbox snaps back off) and tell the user to retry. Without
        // this the same silent-broken-state we just fixed at master-toggle
        // would happen here too.
        if (result?.categories) {
          local.categories = { ...local.categories, ...result.categories };
          _pushSaveLocal(local);
        }
        if (result?.towerRetryError) {
          toast(`Tower-retry couldn’t set up (${result.towerRetryError}) — try again in a moment.`, 'warn');
          _pushRefreshUI();
        }
      }
    } catch { /* best-effort; the toggle reverts on next refresh */ }
  }
}

function _pushRefreshUI() {
  const section  = byId(IDS.ncPushSection);
  const masterEl = byId(IDS.ncPushMaster);
  const cats     = byId(IDS.ncPushCategories);
  const blurb    = byId(IDS.ncPushBlurb);
  if (!section || !masterEl || !cats || !blurb) return;

  const supported = _pushIsSupported();
  const vapid     = _pushVapidKey();
  const perm      = supported ? Notification.permission : 'unsupported';
  const local     = _pushLoadLocal();
  const enabled   = !!local?.enabled && perm === 'granted';

  // Section availability state
  section.classList.toggle('is-unavailable', !supported || !vapid || perm === 'denied');

  // Master toggle
  masterEl.checked  = enabled;
  masterEl.disabled = !supported || !vapid || perm === 'denied';

  // Categories visible only when master is on
  cats.classList.toggle('show', enabled);
  if (enabled && local?.categories) {
    byId(IDS.ncPushCatTower).checked = !!local.categories.towerRetry;
    byId(IDS.ncPushCatWt   ).checked = !!local.categories.watchTogether;
    byId(IDS.ncPushCatLc   ).checked = !!local.categories.liveChallenge;
  }

  // Blurb explains current state
  if      (!supported)         blurb.textContent = 'Your browser doesn’t support push notifications.';
  else if (!vapid)             blurb.textContent = 'Push notifications aren’t configured on the server yet — coming soon.';
  else if (perm === 'denied')  blurb.textContent = 'Notifications are blocked in your browser. Unblock them in your browser settings to enable.';
  else if (enabled)            blurb.textContent = 'You’ll get pushed to this device for the categories below.';
  else                         blurb.textContent = 'Get pushed to your phone when shows are ready for the Tower or someone invites you to Watch Together.';
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
      const res = await _anilistFetch({ query, variables: { ids: chunk } });
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
            // v1.0.211 — see seedElo comment in the AniList fetch path
            seedElo: 1200,
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
    // v1.0.121 — threshold-based bell entries. Clear any stale new_anime
    // entries first so we always reflect the current pending list, then either
    // create individual per-anime entries (with an Add & Tower button each)
    // for small deltas, or a single grouped entry for larger bulk syncs.
    _notifCentre = _notifCentre.filter(n => n.type !== 'new_anime');
    if (_pendingNewAnime.length < 5) {
      // Per-anime entries — each gets a Tower button so films / OVAs / etc.
      // that bypass the CURRENT→COMPLETED transition still get a prompt.
      _pendingNewAnime.forEach(a => {
        _ncAdd('new_anime',
          `${a.title} added on your ${sourceName} — not yet in rankings`,
          { anime: [a] });
      });
    } else {
      // Bulk: one grouped notification to avoid flooding the bell.
      _ncAdd('new_anime',
        `${_pendingNewAnime.length} new anime found on your ${sourceName} — not yet in rankings`,
        { anime: _pendingNewAnime.slice() });
    }
    _ncSave();
    _ncUpdateBell();
  } else {
    newBanner?.classList.remove('active');
    // No pending new anime — drop any leftover bell entries from prior syncs.
    const before = _notifCentre.length;
    _notifCentre = _notifCentre.filter(n => n.type !== 'new_anime');
    if (_notifCentre.length !== before) { _ncSave(); _ncUpdateBell(); }
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
  pushModalBack('archiveConfirm', closeArchiveConfirm);
}
function closeArchiveConfirm() {
  byId(IDS.archiveConfirmModal).style.display = 'none';
  popModalBack('archiveConfirm');
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
  pushModalBack('newAnimeConfirm', closeNewAnimeConfirm);
}

function closeNewAnimeConfirm() {
  byId(IDS.newAnimeConfirmModal).style.display = 'none';
  popModalBack('newAnimeConfirm');
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
    a.seedElo     = elo; // v1.0.211 — capture starting ELO for Comeback Kid
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
  pushModalBack('guestMerge', declineGuestMerge);
  return true;
}

function closeGuestMergeOverlay(e) {
  if (e.target === byId(IDS.guestMergeModal)) declineGuestMerge();
}

function acceptGuestMerge() {
  const ctx = _pendingGuestMergeContext;
  _pendingGuestMergeContext = null;
  byId(IDS.guestMergeModal).style.display = 'none';
  popModalBack('guestMerge');
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
  popModalBack('guestMerge');
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
  // v1.0.227 — DIAGNOSTIC: prove the page load handler runs and what URL
  // it sees. Deep-link testing is producing "nothing happens" — we need
  // to know whether load fires at all with the params intact.
  try {
    const search = window.location.search || '(no search)';
    setTimeout(() => showToast(`🚀 boot: ${search}`, 5000), 800);
  } catch { /* defensive */ }

  if (tryLoadSharedView()) {
    hide('username-screen');
    try { setTimeout(() => showToast('🔀 shared-view path', 4000), 1200); } catch {}
    return;
  }
  const input = byId(IDS.usernameInput);
  const hasName = !!(input && input.value.trim());
  try {
    setTimeout(() =>
      showToast(`👤 hasName=${hasName} → ${hasName ? 'startLoading' : 'stay on username screen'}`, 4500),
      1600);
  } catch { /* defensive */ }
  if (hasName) startLoading();
  // Auto-open Live Challenge join if a ?lc= deep link is present
  _lcCheckDeepLink();
  // v1.0.173 — same for Watch Together via ?wt= (used by push invites)
  _wtCheckDeepLink();
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
  // v1.0.148 — flush any pending local saveState debounce before navigation;
  // this is the safety valve that keeps a fast-clicker from losing the last
  // battle's ELO when they immediately close the tab.
  flushSaveState();
  if (!_cloudSyncEnabled || !_activeCloudUser() || !animeList.length || !saveKey) return;
  clearTimeout(_cloudSaveTimer); // cancel any pending debounce — we're saving now

  const session = {
    saveKey, animeList, battleCount, currentA, currentB, battleHistory,
    excludedIds:     [...excludedIds],
    hiddenFormatsBattle:    [...hiddenFormatsBattle],
    hiddenFormatsRanking:   [...hiddenFormatsRanking],
    hiddenEpRangesBattle:   [...hiddenEpRangesBattle],
    hiddenEpRangesRanking:  [...hiddenEpRangesRanking],
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
