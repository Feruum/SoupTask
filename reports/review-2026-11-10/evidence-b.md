# Assessment B: detector and browser evidence

Completed independently by `/root/impeccable_evidence_b` on 2026-11-10. App source remained read-only. No Assessment A report, scores, or earlier review report was read. The permitted ignore file `.impeccable/critique/ignore.md` does not exist. Parent ran context; B did not rerun it.

## Target and deterministic scan

- Stable target: `src/app/App.tsx`, with representative surfaces in `src/features` and charts in `src/charts`.
- Storage slug query succeeded: `src-app-app-tsx`.
- Exactly one detector invocation: `C:\Users\Ferumm\.agents\skills\impeccable\scripts\impeccable.cmd detect --json src/app src/features src/charts`.
- Exit code **0**. Raw stdout **`[]`**. Stderr empty.
- Findings **0**; rules triggered **0**; finding file/line locations **none**; detector false positives **none**, because no findings were emitted.
- Raw outputs are retained as `evidence-b.detector.json`, `evidence-b.detector.exitcode.txt`, and `evidence-b.detector.stderr.txt` beside this report.
- Scope inventory: 32 files: 17 `.tsx`, 12 `.ts`, 3 `.css`. Markup directories were passed, rather than CSS-only files. This is below the 500-file ceiling. Detector output itself does not report its number of scanned files.

A clean detector result is limited to its rules; it does not establish overall usability or accessibility.

## Native browser evidence

Created a fresh independent hidden ChatGPT in-app browser tab (B tab ID `1`, browser `2`), initially at the live origin, which redirected to `/dashboard`. No existing user or A tab was reused. Used native CUA AX snapshots, screenshots, documented read-only DOM evaluation, and captured console logs. No custom Playwright/Puppeteer process was used.

One bounded desktop/mobile inspection pass covered five representative routes. Desktop viewport was 1280 × 720; mobile override was 390 × 844. Screenshots were rendered in the CUA tool transcript; this tool did not return filesystem screenshot paths, so no local screenshot artifacts are claimed.

| Route | Observed desktop state | Observed mobile state |
|---|---|---|
| `/dashboard` | Workspace overview, experiment map, experiment groups, snapshot findings; 20 runs, 4 running, 8 needing attention | Selected experiment comes first; run summary and Raw loss above collapsed secondary sections; four labelled bottom navigation links |
| `/runs` | Loaded 20-row table, labelled filters, source loss preview | Run preview and Filters and sorting collapse; rows reflow as cards; no document-wide horizontal overflow |
| `/runs/kazakh-sft-005` | Source summary and range controls loaded; million-row run; latest loss 0.201573, minimum 0.200327, peak 100.000 at step 500,001 | Summary uses two columns; four run sections wrap into two rows; range controls collapse; scrolling shows the narrow spike and loss axis, followed by learning-rate chart |
| `/compare?runs=kazakh-sft-001,kazakh-sft-010,kazakh-sft-004` | Three chosen runs present; recorded-step alignment; range resolves to 0–8,191; three metric charts and summaries exist | Three removable selection chips, collapsed run editor, metric choices in two rows, collapsed range controls; Loss heading begins at y≈654 |
| `/data-quality?run=kazakh-sft-006` | Workspace totals, category summary, quality matrix, selected source ledger; ledger resolves to two NaN findings at steps 4,096 and 8,191 | Workspace category and matrix sections collapse, bringing selected Source issue ledger into the first screen |

All five routes reported equal document scrollWidth/clientWidth: **1265/1265 desktop**, **375/375 mobile**. This accounts for the native scrollbar and is evidence against document-wide horizontal overflow at these sizes. Wide quality tables are contained: mobile category table approximately 392px and matrix 842px inside approximately 342px parents with `overflow-x:auto`; the issue ledger reflows to approximately 342px. These widths are not counted as page overflow defects.

Loading feedback was visibly present during lazy-page or worker preparation (`Loading page…`, `Preparing source measurements in a Worker…`), then replaced by loaded content. A first screenshot immediately after navigation sometimes captured that normal intermediate state; later heading/DOM checks confirmed content arrival. No durations or performance scores are inferred from this.

Console reads sampled warnings and errors across the five routes and returned **`[]`**. A final filter for `impeccable` also returned **`[]`**, as expected without injection. The browser API used here does not provide a network-response status collector; no HTTP status, failed-request, or zero-network-error claim is made.

Dashboard light theme was also inspected at 390 × 844. Labels, source values, collapsed layout and bottom navigation remained visible. Restored the original dark theme and confirmed the toggle label returned to `Switch to light theme`.

## Browser-derived observations for synthesis

1. **Raw issue identifiers reach user-facing controls.** The quality type selector exposes `nan`, `posInf`, `negInf`, `duplicate`, `conflict`, `invalidX`, `outOfOrder`, and `gap`; the loaded ledger's Type cells show `nan`. Source confirmation: `src/features/quality/QualityPage.tsx:12` declares these identifiers; line 52 renders `{k}` directly as the option label; line 54 renders `{i.kind}` in the ledger. This is a concrete copy/recognition issue that the deterministic detector did not flag. User-friendly category wording already appears in the workspace summary, making the raw-code wording inconsistent within the same page.
2. **Desktop filter labels are visually cramped.** At 1280 × 720, `Status`, `Data quality`, and `Sort by` sit inline immediately beside their selects, with little breathing room between the preceding control and the next label. They are still legible and functionally labelled. Source: `src/features/runs/RunsPage.tsx:67` renders the inline labelled filter cluster. Treat as a minor layout observation, not a blocking interaction failure.
3. **Mobile task access is substantially preserved.** Dashboard action targets measured Open run ≈70×44px, Compare ≈51×44px, Inspect issues ≈97×44px. Four bottom-navigation targets measured ≈90×60px each; the theme toggle and three dashboard metric choices measured 44px high. These are direct measurements of representative controls, not an exhaustive target-size audit.

## Excluded false alarms and limits

- The native AX export initially displayed some run filter select names/options as blank. DOM inspection and source confirmed wrapping `label` elements (`Status`, `Data quality`, `Sort by`), and screenshots displayed those labels and current values. Do not report these selects as unlabeled based on that AX export alone.
- An exploratory DOM size read returned some small inline links and content inside collapsed responsive disclosures. That query did not establish visibility, surrounding target spacing, or the effective clickable label. It is not used to claim WCAG target-size failures.
- The comparison range fields appeared blank in one immediate screenshot while loading. Subsequent DOM state reported values 0 and 8191. Do not treat this transient capture as persistent empty range state.
- Narrow charts display fewer rendered points than source observations; the million-row run's peak remained visible. No source-data loss is inferred from displayed-point counts.
- No exhaustive keyboard traversal, screen-reader session, contrast-ratio calculation, modal/empty/error-state stress pass, reduced-motion check, or heavy performance audit was run. Parent owns any further measurements.

## Injection fallback and cleanup

Mutable injection preflight was **unavailable**, not attempted through a forbidden channel. The exposed browser Playwright `evaluate` and locator evaluation APIs are explicitly read-only. Tab capabilities listed only `pageAssets` and `webmcp`; browser capabilities listed only `visibility` and `viewport`. No documented API could set `document.title` and append a script. B did not attempt to bypass that restriction.

Accordingly, the Impeccable live-server, `[Human]` browser presentation, script injection and in-page detector execution were skipped. **No reliable user-visible overlay exists**, and no overlay/browser-presentation success is claimed. Fallback signal is the single CLI scan plus native browser screenshots, AX/DOM inspection and captured console logs.

No local server or background process was started, so no PID/stop operation was necessary. No temporary injection files were created. Theme was restored to dark; the viewport capability `reset()` returned successfully; B's own temporary tab was explicitly closed. CUA completion summary was sent exactly once after the final CUA operation. Only these retained `evidence-b.*` report files were written; no app or edit-context files were changed.

Questions skipped: Assessment B is evidence-only; parent owns synthesis and the required user close.
