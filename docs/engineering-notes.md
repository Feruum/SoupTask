# Soup Training Monitor — engineering notes

Five-screen experiment monitor using React, TypeScript, Vite, React Router, Arc UI Free and uPlot. Twenty seeded demonstration snapshots; no live training or automatic stop recommendations.

[Open the production application](https://soup-training-monitor.vercel.app). Build/lint, 109 unit tests and 131 Chromium tests pass. [Submission note](../output/pdf/soup-submission-note.pdf), [acceptance status](implementation-status.md) and [measured performance](performance-results.md) describe completed process-footprint evidence, full-trace latency targets and measured memory growth.

## Run

Node 24.22.1+ within 24.x, npm 11+:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173/dashboard. Production preview: `npm run build`, then `npm run preview` at http://127.0.0.1:4173. Vite fails on occupied ports.

## Screens

- `/dashboard`: Monitor opens a searchable run navigator and one genuine metric chart. Run and metric selection survive Back and refresh through query parameters. Search results expand in place; recorded-step inspection works with the keyboard. Experiment map and Groups are separate views (`?view=map` / `?view=groups`); the map retains arrow-key operation and an accessible quality table. Demo provenance is visible on desktop and mobile.
- `/runs`: search, independent status/quality filters, numeric sorting, preview and selection of two to four comparison runs.
- `/runs/:runId`: three independent metric panels, shared numeric range, quality, exact source inspection and provenance.
- `/compare?runs=kazakh-sft-005,kazakh-sft-006`: raw-step comparison, per-run source cursor, whole-run facts and interactive legends.
- `/data-quality`: workspace matrix, filters and a selected-run Worker issue ledger.

Wheel/pinch zooms around the pointer; Shift+wheel pans; drag selects a range. Range fields, buttons and Reset are keyboard alternatives. Legend buttons highlight series without removing source data. Theme selection persists and reduced motion is respected.

## Data truth

Four immutable Float64 columns stay inside one active module Worker. Compare retains at most four selected datasets. Overview pages load a compact manifest rather than generating every dataset.

R05 (`kazakh-sft-005`) has 1,000,000 rows and exactly one injected unique Loss maximum: **sourceIndex 500001, step 500001, value 100**. Four raw columns occupy 32,000,000 bytes; indexes, payloads, heaps and browser memory are additional.

Fixtures cover nonfinite values, duplicate conflicts, source ordering, known gaps, zeros, sparse input, a singleton and old snapshots. Execution status and data quality are independent. Latest invalid/conflicting measurements remain explicit.

Selection retains first/min/max/last per bucket and valid segment, with original coordinates. NaN/Infinity never become zero. Conflicts break the authoritative line and retain finite extrema as markers. Dense topology uses an explicitly disconnected overview with source drill-down. Extrema and the unique spike are preserved; every local oscillation is not promised.

The default exact index uses 256-group blocks and 16-group boundary summaries. Metrics with invalid/conflicting/gapped topology use the unchanged stream scanner. Scan and stream remain available as correct benchmark variants. Index build time and memory are included in evidence.

Compare aligns only reduced views: `undefined` means a foreign alignment position, while null/explicit connectivity marks real breaks. Hover queries source data, not interpolated values. Smoothing and log scale are absent. See [data contract](data-contract.md).

## Checks

```sh
npm run lint
npm test
npm run data:check
npm run test:negative
npx playwright install chromium
npm run build
npm run test:e2e
node scripts/canvas-controls.mjs
```

Playwright starts its own production preview; leave port 4173 free. This Codex Windows sandbox cannot see the external browser cache; actual browser evidence uses approved unsandboxed commands with bundled Node 24.22.1. A normal terminal does not need the ignored local npm bootstrap.

Coverage includes independent provenance/extrema/segment oracles, viewport boundaries, normalization, real Canvas spike/gap pixels, bounded ownership, controlled races, locale/timezone, gestures, keyboard, themes, axe, contrast, DPR and lifecycle. Incorrect samplers and suppressed drawing must fail named assertions; crashes do not count as successful negative controls.

Current output: `reports/perf-targets-2026-11-10/final-unit.json`, `reports/perf-targets-2026-11-10/final-browser/results.json`, `reports/negative-controls/`, `reports/async-negative/`, `reports/perf-targets-2026-11-10/final-canvas/`. Historical failures and scaffold reports remain archived. [Evidence manifest](../reports/evidence-manifest.json) records hashes, execution scope and outstanding requirements.

## Performance and delivery

Use a fresh PERF_OUT and PERF_MODES=indexed with npm run perf; PERF_TRACE=off is separate. Final full traces, no-trace results and native memory are underreports/memory-investigation-2026-11-10/release-final-v2. [Current results](performance-results.md) replace the old offscreen-readout timing claim. Expanded limits remain unmet for cold meaningful render, detail hover on entry, compare hover on entry, compare continuous hover. Stable sub-50 ms hover is not established. The demo is delivered with these measured limits; no 100/100 grade is asserted.

Natural Windows renderer/Worker footprint, retained heap paths and MemoryInfra are separate scopes. A real interrupted-drag listener leak, unbounded timing entries, formatter churn and oversized native raster caches were addressed. [Investigation](memory-investigation.md) records the exact retaining chain and limits. Source raw arrays stay Worker-owned.

Lighthouse and contrast run separately from performance. The current audit has 484 individually reviewed incomplete occurrences; the original 516 remain archived. Human screen-reader certification is not claimed.

[Source repository](https://github.com/Feruum/SoupTask). The user chose a NEW Vercel project, `soup-training-monitor`; existing `souplanding` is separate. `vercel.json` supplies static SPA routing without returning HTML for missing assets. Actual publication URL and direct-route smoke results are recorded in `reports/deployment.json`.

The submission note must use actual results and distinguish assistant-run verification from human review. Tests cannot certify scientific logger truth, all browsers/viewports, every oscillation or a real training-stop decision. GPU telemetry, real-time logs, artifacts, import/export, authentication and training execution are not fabricated.

The author designed the architecture and data pipeline, made key engineering decisions and reviewed the code. AI helped implement and fix code, develop tests, run browser automation and measurements, and research implementation options. Suggestions were checked against source identities and independent oracles. Saved failures describe accepted corrections; prospective or human checks are never presented as completed assistant evidence. Original foundation documentation is preserved in [scaffold README](scaffold-readme.md).

For exact publication of a locally tested build, run `node scripts/prepare-vercel-output.mjs`, then `vercel deploy --prebuilt --prod` for the already-linked project. `node scripts/verify-deployment-build.mjs` checks every served build artifact, including HTML/JS/CSS/Worker/font/image bytes against build metadata. Deployment is a separate authorized action.

## Final acceptance and cursor path

`ACCEPTANCE_OUT=<fresh> npx playwright test --config scripts/acceptance.playwright.config.mjs` runs the final production suite on port4188, retries0, with source commit/build metadata. Use your shell's environment-variable syntax. The original default test command uses4173; another app may occupy it locally. Frozen application/test snapshot 408d27bdc6b0baf2c2136927ba5774dbac799a60 contains the accepted inputs; later release commits add documentation and evidence.

Worker-owned bounded exact caches retain at most8192 targets/16384 unique source rows for the current accepted view; arbitrary misses use guarded raw queries. Pixel targets do not reduce Inspector precision. Worker-prepared alignment preserves foreign undefined versus real null breaks. Details and Compare share one persistent all-metric source table. Native pointerrawupdate has a deduplicated fallback; unchanged-row leaf writes are suppressed. Offscreen overlays skip drawing and restore the latest accepted source on reveal. Original raw/epoch/revision/hover guards and two-frame timing remain.
