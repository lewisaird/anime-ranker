# Kessen beta — update post (short version)

Hey everyone, big batch of fixes since launch — most of these came directly from your feedback.

**Imports**

- **POINT_100 warm-start fixed.** Users on AniList's 100-point scoring were having every show pushed to the top of the ELO range because the seeding was reading 75/100 as 75/10. Now respects your actual scoring format. (Thanks Rinko.)
- **Custom-list duplicates fixed.** Same anime in multiple lists was being imported once per list. Now imported once, and existing saves auto-deduplicate on load.

**Tower Mode**

Tower used to pick opponents spread across your full ELO range, so a champion near the top mostly fought weaker shows and ELO inflated with each run. Now: each round picks from a band around the champion's current rating, randomly sampled. Brand-new anime (under 20 battles) move ~50% faster so they still place quickly when prompted to Tower from the new-anime notification.

**Stats**

- **Rivalries rewritten as franchise-vs-franchise.** The old "same two anime fought 3+ times" was statistically near-impossible — now it's franchises (using AniList's relations graph, so Monogatari, Fate, etc. roll up properly) that keep meeting without either dominating.

**Multiplayer**

- **Watch Together rejoin actually works now.** Closing the modal mid-game preserves the session; you'll see a Rejoin banner next time you open it.
- **Live Challenge — guest rematch works** (button was rendering but doing nothing).
- **Disconnect handling improved** in both modes — brief Wi-Fi drops no longer permanently flag you as offline; mid-round disconnects no longer freeze the game.
- **Auto-advance between rounds** — Next button still there as override.

**Mobile**

- Vote cards now stack vertically on mobile, matching the main battle layout.
- Android hardware back button dismisses modals instead of exiting the app.
- Sticky-hover on touch buttons fixed.

Thanks again to everyone testing. Keep the feedback coming.
