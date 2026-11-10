# Soup Training Monitor — engineering notes

Five-screen experiment monitor using React, TypeScript, Vite, React Router, Arc UI Free and uPlot. Twenty seeded demonstration snapshots; no live training or automatic stop recommendations.

[Open the production application](https://soup-training-monitor.vercel.app). Build/lint, 106 unit tests and 113 Chromium tests pass. [Submission note](../output/pdf/soup-submission-note.pdf), [acceptance status](implementation-status.md) and [measured performance](performance-results.md) describe completed process-footprint evidence, full-trace latency targets and measured memory growth.

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

Set `PERF_OUT` to a fresh directory; `npm run perf` compares correct scan/stream/indexed variants with five cold loads and thirty detail/Compare range-hover pairs. Earlier stable three-mode results are under `reports/performance-hover-frame-final/`; latest same-source full-trace runs under `reports/perf-targets-2026-11-10/one-row-performance/` and `reports/perf-targets-2026-11-10/final-trace-performance/`. Different revisions are labelled separately. Hover includes browser pointer input through committed source DOM and a two-RAF frame opportunity, not physical display presentation. Workers rejected throttling; CPU4 applies to the main renderer only. Matched previous-source full-trace detail/Compare hover p95 was 88.5/107.5ms. Worst of two final traced runs is 40.6/48.6ms, meeting 50ms; cold 2531.9ms, detail zoom 114.8ms and Compare zoom 131.4ms meet 3000/200ms. See the matched comparison and separate no-trace result in `reports/perf-targets-2026-11-10/`. All intermediate samples and regressions remain available.

`node scripts/tab-memory.mjs` separately captures Windows renderer/Worker process footprint using PID markers and OS counters. Latest 1M headless sample: 145.9MiB private committed, 245.6MiB working set; after 20 transitions 319.5/588.7MiB. Memory growth remains an explicit concern, with no leak-freedom or memory-saving claim. Raw buffers/typed ledger/JS heap/shared browser-GPU memory are distinct scopes, not additive totals. Current checkpoints are under `reports/perf-targets-2026-11-10/final-memory/`; earlier headed lifecycle results remain separate. Exact before/after runtime inputs are archived under `reports/measurement-sources/`.

Large raw traces remain locally; Git/source archives store lossless gzip siblings. Run `node scripts/trace-archives.mjs --unpack` to verify/restore original JSON traces from `reports/trace-archives.json`.

Lighthouse runs separately: temporarily install the official CLI with `npm exec --package=lighthouse`, set `LIGHTHOUSE_CLI` to its `cli/index.js`, choose `LIGHTHOUSE_OUT`, then `npm run audit:lighthouse`. Final HTML/JSON reports are under `reports/perf-targets-2026-11-10/final-lighthouse/`. Its desktop settings differ from the CPU4 comparison; scores do not establish complete accessibility conformance. Full axe incomplete findings and real pixel/SVG checks are under `reports/perf-targets-2026-11-10/final-a11y-summary.json`, `final-contrast/` (528/528 actual pixel dispositions) and `final-runtime/`.

[Source repository](https://github.com/Feruum/SoupTask). The user chose a NEW Vercel project, `soup-training-monitor`; existing `souplanding` is separate. `vercel.json` supplies static SPA routing without returning HTML for missing assets. Actual publication URL and direct-route smoke results are recorded in `reports/deployment.json`.

The submission note must use actual results and distinguish assistant-run verification from human review. Tests cannot certify scientific logger truth, all browsers/viewports, every oscillation or a real training-stop decision. GPU telemetry, real-time logs, artifacts, import/export, authentication and training execution are not fabricated.

The author designed the architecture and data pipeline, made key engineering decisions and reviewed the code. AI helped implement and fix code, develop tests, run browser automation and measurements, and research implementation options. Suggestions were checked against source identities and independent oracles. Saved failures describe accepted corrections; prospective or human checks are never presented as completed assistant evidence. Original foundation documentation is preserved in [scaffold README](scaffold-readme.md).

For exact publication of a locally tested build, run `node scripts/prepare-vercel-output.mjs`, then `vercel deploy --prebuilt --prod` for the already-linked project. `node scripts/verify-deployment-build.mjs` checks served HTML/JS/CSS/Worker bytes against build metadata. Deployment is a separate authorized action.

## Final acceptance and cursor path

`ACCEPTANCE_OUT=<fresh> npx playwright test --config scripts/acceptance.playwright.config.mjs` runs the final production suite on port4188, retries0, with source commit/build metadata. Use your shell's environment-variable syntax. The original default test command uses4173; another app may occupy it locally. Source commit41ae67f contains the tested application; release commits also add evidence and documentation.

Worker-owned bounded exact caches retain at most8192 targets/16384 unique source rows for the current accepted view; arbitrary misses use guarded raw queries. Pixel targets do not reduce Inspector precision. Worker-prepared alignment preserves foreign undefined versus real null breaks. Details and Compare share one persistent all-metric source table. Native pointerrawupdate has a deduplicated fallback; unchanged-row leaf writes are suppressed. Offscreen overlays skip drawing and restore the latest accepted source on reveal. Original raw/epoch/revision/hover guards and two-frame timing remain.
