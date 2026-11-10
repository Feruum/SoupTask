# Assessment B — detector and browser evidence

Target: `src/features/dashboard/DashboardPage.tsx`, dashboard markup directory, and relevant shared/theme source. Independent assessment: did not read Assessment A or earlier reports. No source changes.

## Deterministic scan

Command: `C:/Users/Ferumm/.agents/skills/impeccable/scripts/impeccable.cmd detect --json src/features/dashboard`.

Exit 0; JSON `[]`; **0 detector findings** across this scoped markup directory. Artifact: `reports/calm-review/detector-dashboard.json`. No broad source scan was needed. Zero findings does not establish accessibility or visual correctness.

## Confirmed browser issue

**[P2] Narrow numeric fact splits a digit onto its own line.** At 320 × 844, light theme, selected default `kazakh-sft-005`, the Raw rows value `1,000,000` renders as `1,000,00` followed by a lone `0`. This weakens rapid reading of a key dataset size even though the page has no horizontal overflow. The native screenshot showed the break; computed style is 22px at this width. `src/features/dashboard/dashboard.css:48` permits arbitrary breaks, and `:185` restores 22px on the narrow layout. Preserve complete numbers by adjusting the smallest-width fact typography/spacing, or using one fact per row when the formatted value cannot fit. Recheck both themes at 320px with the million-row run.

Counts: **P0 0 · P1 0 · P2 1 · P3 0**. This is a browser finding, not detector output.

## Verified behavior

- Fresh independent native IAB tab `1`, initially opened at the supplied localhost URL. Inspected dark desktop 1440 × 1000, dark phone 390 × 844, light phone 320 × 844, and light tablet 768 × 1024. All measured document scroll widths stayed within the viewport (1425/1440, 375/390, 305/320, 753/768). The 15px difference is the rendered scrollbar area.
- At 390px the visible bottom navigation targets measured 89.8 × 60px; view links, run actions, metric tabs, and chart settings were at least 44px high. The run disclosure was 341.6 × 70px. No visible undersized target was confirmed in this monitor sample.
- Chart settings opened within the 390px viewport (left 16px, right 359.2px); Escape closed it and returned focus to the labeled summary. Keyboard focus showed an accent outline, computed as 1.6px at the runtime scale.
- On 320px, choosing run 006 with the labeled native select closed the run disclosure, updated the selected run and source-quality values, and moved focus to `h2#selected-run-title`. The worker loading state was exposed and then replaced by measurements. The invalid latest observation was displayed as `Invalid` and accompanied by source-quality information.
- The 320px map fit and exposed a labeled experiment selector. Groups exposed four named choices. Both routes had document scrollWidth 305px. The selected run persisted across the view changes.
- Key computed text colors passed 4.5:1 in both themes: secondary text 6.48:1 light / 8.92:1 dark; action links 6.04:1 / 9.28:1; highlighted fact 5.35:1 / 8.67:1. These are sampled text/background pairs, not an exhaustive contrast audit.
- Native console warning/error collection returned `[]` after the interactions.

## False positives and limits

The initial broad DOM bounding-box probe included range inputs/actions inside closed chart settings as apparent offscreen elements. These are intentionally hidden by native `details`, so they are not page-overflow findings. Group leaf scrollWidth exceeded clientWidth by 1–3px in three small controls; no clipped label was confirmed, so this is recorded as a measurement caveat rather than an issue. `Learning rate` and `Gradient norm` wrap at 320px but remain legible inside 45.6px-high targets; wrapping alone is not flagged.

Reduced motion is **source reviewed only**: `src/styles/theme.css:246` disables scrolling/transitions under the reduced-motion query, and `src/app/App.tsx:46` uses `useReducedMotion`. Runtime preference was false. The documented native browser API provides viewport control but no motion emulation, so no runtime reduced-motion pass is claimed. A full screen-reader flow, 200% zoom, all chart gestures, exhaustive contrast, and exhaustive controls were outside this bounded check.

## Browser visualization and cleanup accounting

The native browser's documented `tab.playwright.evaluate` is read-only; no mutable title or script insertion API is exposed. Following the explicit read-only fallback, mutable injection, `[Human]` presentation, and detector live server were skipped. **No reliable user-visible detector overlay exists.** Fallback signals are CLI JSON, fresh native screenshots in the tool transcript, DOM geometry, accessibility state, sampled computed colors, and verified UI interactions.

The browser stayed in the background. No critique-only server was started. The existing Vite server was kept. The temporary viewport override was reset, and the independently created tab was closed. No temporary source or script files were created. Fresh screenshots were visually inspected through native `getScreenshot`; that API does not expose a file output method, so none of the existing `reports/calm-monitor` PNGs are claimed as fresh captures. Detailed measurements are saved in `reports/calm-review/browser-evidence-b.json`.

Questions skipped: Assessment B supplies isolated evidence; the parent handles synthesis and user close.
