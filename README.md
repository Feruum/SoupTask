# Soup Training Monitor

Five-screen experiment monitor using React, TypeScript, Vite, React Router, Arc UI Free and uPlot. Twenty seeded demonstration snapshots; no live training or automatic stop recommendations.

[Open the production application](https://soup-training-monitor.vercel.app). Build/lint, 95 unit tests and 49 Chromium tests pass. [Submission note](output/pdf/soup-submission-note.pdf), [acceptance status](docs/implementation-status.md) and [measured performance](docs/performance-results.md) describe the remaining footprint evidence and missed engineering budgets.

## Run

Node 24.22.1+ within 24.x, npm 11+:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173/dashboard. Production preview: `npm run build`, then `npm run preview` at http://127.0.0.1:4173. Vite fails on occupied ports.

## Screens

- `/dashboard`: select a run and metric by clicking a ring sector, using arrow keys or native selectors. Inner band Loss, middle LR, outer Gradient norm. Tile length encodes finite row count (log); colors identify method/model groups and diamonds mark quality findings. The accessible table supplies exact counts.
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

Compare aligns only reduced views: `undefined` means a foreign alignment position, while null/explicit connectivity marks real breaks. Hover queries source data, not interpolated values. Smoothing and log scale are absent. See [data contract](docs/data-contract.md).

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

Actual output: `reports/full-unit.json`, `reports/e2e-full.json`, `reports/acceptance-release/`, `reports/negative-controls/`, `reports/async-negative/`, `reports/canvas-controls-final/`. Historical failures and scaffold reports remain archived. [Evidence manifest](reports/evidence-manifest.json) records hashes, execution scope and outstanding requirements.

## Performance and delivery

Set `PERF_OUT` to a fresh output directory, then `npm run perf` builds correct scan/stream/indexed variants, records five cold loads and thirty zoom/hover measurements per detail and Compare, Chromium traces, per-target CPU4 coverage and scoped memory. Completed evidence is not overwritten. Final comparable results are under `reports/performance-paint/`; earlier runs are separate. Workers rejected throttling, so only main-renderer CPU4 is established. CDP heap, backing storage, Worker ledger and Task Manager footprint are different scopes, not a summable tab total.

Large raw traces remain locally; Git/source archives store lossless gzip siblings. Run `node scripts/trace-archives.mjs --unpack` to verify/restore original JSON traces from `reports/trace-archives.json`.

Lighthouse runs separately: temporarily install the official CLI with `npm exec --package=lighthouse`, set `LIGHTHOUSE_CLI` to its `cli/index.js`, choose `LIGHTHOUSE_OUT`, then `npm run audit:lighthouse`. Final HTML/JSON reports are under `reports/lighthouse-final/`. Its desktop settings differ from the CPU4 comparison; scores do not establish complete accessibility conformance. Full axe incomplete findings and real pixel/SVG checks are under `reports/a11y-summary.json` and `reports/manual/`.

The user chose a NEW Vercel project, `soup-training-monitor`; existing `souplanding` is separate. `vercel.json` supplies static SPA routing without returning HTML for missing assets. Actual publication URL and direct-route smoke results are recorded in `reports/deployment.json`.

The submission note must use actual results and distinguish assistant-run verification from human review. Tests cannot certify scientific logger truth, all browsers/viewports, every oscillation or a real training-stop decision. GPU telemetry, real-time logs, artifacts, import/export, authentication and training execution are not fabricated.

AI assisted architecture, implementation, tests, browser automation, profiling and documentation. Suggestions were checked against source identities and independent oracles. Saved failures describe accepted corrections; prospective or human checks are never presented as completed assistant evidence. Original foundation documentation is preserved in [scaffold README](docs/scaffold-readme.md).
