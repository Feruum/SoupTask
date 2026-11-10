# Assessment B bounded confirmation

**PASS** against the current development server at `http://127.0.0.1:5173/dashboard` in fresh isolated Chromium context, viewport **320 × 844**, locale en-US, Asia/Qyzylorda timezone.

- Light and dark themes: `Raw rows` displays **1,000,000** on one line. A DOM text range returned one rectangle, width 90.06px; both full-page screenshots visually confirm the complete number. The original numeric wrapping finding is resolved.
- Light and dark themes: document scrollWidth **320px**, viewport width **320px**; no page horizontal overflow.
- Both themes show **Demo snapshot · Not live · Nov 9, 2026, 5:00 PM (Asia/Qyzylorda)** under the selected run.
- Expanded **Inspect recorded step** form remains within the viewport: left 16px, right 304px, width 288px. The recorded-step input and **Inspect step at source** action remain within those bounds. This confirmation checked disclosure/layout only; the parent’s focused/full tests cover submission behavior.

Evidence: `confirmation-b.json`, `confirmation-light-320.png`, `confirmation-dark-320.png`. Screenshots were opened and visually inspected. No detector rerun and no source changes.

Native browser fallback: the earlier IAB handle returned `Browser is not available: 2`; a fresh native surface inventory returned `browsers: []`. Therefore this bounded check used the installed Playwright Chromium browser. The sandbox could not access its installed browser path; the authorized escalated local check succeeded. `confirm-b.mjs` records the exact check for reproducibility.

Cleanup: isolated context and browser process closed in `finally`; no native tab or viewport override was created in this confirmation. The existing user development server remains running. No critique-only server was started.
