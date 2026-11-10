# Production performance — 10 November 2026

Application source commit: `41ae67f48be6364f719ba38ad71d694c8ae484fe`. Source hash `68b68de6f774bf3624dffc7257711bbd6655d3dc7875f7fbdfb195959a8ae5aa`; tested build hash `5a3fe0fd9d66886ff8d35a2141aaeb31c28a7f153c2fcc4142d80971b9ae735a`. Later documentation/tooling commits do not change the application inputs. [Build metadata](../reports/build-metadata.json) and [matched comparison](../reports/perf-targets-2026-11-10/latency-comparison.json) bind the measurements; the benchmark's recursive source hash uses a different documented inventory algorithm.

## Protocol and results

Windows 11 build 26200, Ryzen 7 8845HS, Chromium 158.0.8127.18, Node 24.22.1, production, 1440×900, DPR 1. Main renderer CPU ×4. A separate throttling command was attempted for every Worker target and was unsupported; Worker preprocessing is **not established as CPU ×4**. Five fresh browser contexts per run share a browser process; OS caches are not flushed. Two warmups then 30 range/hover pairs in details and separately 30 in four-run Compare (R05, R01, R02, R06). Overview, spike, reset, excluded-spike and single-step windows repeat six times. No forced GC. Percentiles use nearest rank.

| p95, ms | Before, full trace | After 1, full trace | Confirmation, full trace | Separate no trace | Target |
|---|---:|---:|---:|---:|---:|
| Cold meaningful render | 2493.6 | 2279.9 | 2531.9 | 2518.9 | ≤3000 |
| Detail zoom | 149.6 | 106.8 | 114.8 | 113.3 | ≤200 |
| Detail pointer-to-source-frame | 88.5 | 40.6 | 35.5 | 37.0 | ≤50 |
| Compare zoom | 214.7 | 123.2 | 131.4 | 107.6 | ≤200 |
| Compare pointer-to-source-frame | 107.5 | 48.6 | 40.0 | 40.7 | ≤50 |

Targets use the **worse of the two full-recording p95 results**, never pooled samples or the no-trace regime. All five targets pass. Cold confirmation is about 1.5% slower than the new baseline; this is within budget, not a cold-load improvement claim. Shared-machine sequential runs are not a randomized causal study.

- [Before](../reports/perf-targets-2026-11-10/before-trace-performance/results.json): clean isolated build of previous source commit `9206963`, same installed dependencies/current harness. This is not asserted to reproduce historical deployed asset bytes.
- [After 1](../reports/perf-targets-2026-11-10/one-row-performance/results.json), [full-trace confirmation](../reports/perf-targets-2026-11-10/final-trace-performance/results.json), [no-trace result](../reports/perf-targets-2026-11-10/final-latency-performance/results.json): identical application source and harness, unchanged-source checks retained.
- [Historical scan/stream/index comparison](../reports/performance-hover-frame-final/results.json) motivated the conditional exact index. It is an earlier UI revision, not final-screen acceptance.

Cold ends after three accepted/drawn charts and two RAF callbacks. Zoom ends at the accepted chart draw hook. Hover starts at the original browser pointer event timestamp and requires accepted source DOM for the current workspace/view/hover identity before **two RAF callbacks**. Positive CSS geometry and visibility are checked. This proves a rendering opportunity, not physical monitor presentation or that every source region is within the viewport. Worker-response, DOM-commit and automation upper bounds remain separate metrics. Real source screenshots and independent Canvas assertions complement timing hooks.

Full Chrome Performance recordings start before measured actions and include devtools timeline, frame screenshots, User Timing, V8 and top-level events. These are not Playwright traces. Recording overhead remains included; no-trace samples are explicitly separate. All samples, unsuccessful intermediate experiments and raw red/green outputs remain archived. [Lossless trace inventory](../reports/trace-archives.json) maps original and gzip SHA256 values; `node scripts/trace-archives.mjs --unpack` restores exact JSON.

## What changed

Bounded exact source caches are prepared by the Worker for accepted display-pixel targets; misses keep the guarded raw query. Independent reduced series are aligned in the Worker. Whole-run summaries do not rerender on cursor/zoom. Native pointer offsets avoid layout reads; secure-origin pointerrawupdate has a deduplicated pointermove fallback. Persistent readout leaf nodes skip unchanged original rows, attributes and Pin actions. Details and Compare share one table containing all three raw metrics, actual steps, distance and source actions. Fixed columns and reserved space prevent layout shifts.

The native uPlot crosshair/drag path is retained: muting it did not improve the diagnostic result. Offscreen overlay work is deferred, old ink cleared once and the latest accepted cursor redrawn on reveal; real-pixel tests cover restoration. Numeric range controls avoid concurrent decorative transitions. No source precision, extrema guarantee, gap topology, async guards or two-frame endpoint was weakened. See [primary-source research and rejected experiments](performance-research-2026-11-10.md).

## Memory — actual process counters, separately scoped

[Final memory results](../reports/perf-targets-2026-11-10/final-memory/results.json): one isolated headless page, unthrottled, no forced GC. User Timing markers associate the renderer and every live dedicated Worker with Windows PIDs. The same renderer/Worker PID is deduplicated. Native Windows private committed bytes and working sets include native allocations; JS heap alone does not replace these counters.

| Checkpoint | Private committed, MiB | Working set, MiB | Main JS heap used, MiB |
|---|---:|---:|---:|
| R05, settled | 145.9 | 245.6 | 8.2 |
| R05 after 20 SPA transitions | 319.5 | 588.7 | 44.8 |
| R05 + three ordinary runs, Compare | 295.8 | 448.3 | 16.9 |

**Memory grew after repeated transitions.** Natural heap reduction in the following Compare checkpoint is consistent with transient garbage, but does not establish leak freedom. First follow-up for a longer-lived product is retained-object/GC analysis over repeated cycles. No memory reduction or hard memory-budget success is claimed. Separate earlier headed/headless samples remain history, not matched current before/after memory proof.

R05 raw columns total 32,000,000 bytes; indexed owned typed-buffer ledger is 76,696,612 bytes **including raw**. Compare raw is 32,786,432 bytes and ledger 78,576,688. Current render buffers and cache target/row counts are recorded per checkpoint. Do not add these to process counters. Shared browser/GPU/utility subtotals are separate, working sets may share pages, counters and markers are sequential, and this is not universal total tab/GPU memory or a Task Manager screenshot. Dump request success does not imply native GUID matching.

[Lifecycle evidence](../reports/perf-targets-2026-11-10/final-runtime/runtime-contrast.json) independently observes one Worker and three charts in every settled state over 20 SPA changes, then zero Workers on context close. Retiring Workers may overlap before settling. This verifies those lifecycle observations, not absence of all listeners or leaks.

## Reproduction

Use fresh output directories. `npm run build`; `node scripts/build-metadata.mjs`; `PERF_OUT=<fresh> PERF_MODES=indexed npm run perf` with the actual environment-variable syntax of your shell. `PERF_TRACE=off` selects the separate no-recording regime; default is full. Check `scripts/performance.mjs` for supported controls. Run heavy suites sequentially. `MEMORY_OUT=<fresh> node scripts/tab-memory.mjs` records process footprint; `LIGHTHOUSE_OUT=<fresh> LIGHTHOUSE_CLI=<official-cli/index.js> npm run audit:lighthouse` is separate.

[Final Lighthouse](../reports/perf-targets-2026-11-10/final-lighthouse/summary.json): Performance 94/97/97/95/98 across Dashboard/Runs/Detail/Compare/Quality; Accessibility and Best Practices 100 throughout. Desktop simulation differs from this CPU ×4 custom protocol and does not establish full accessibility conformance.
