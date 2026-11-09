# Production measurements

The final comparable run is [performance-paint/results.json](../reports/performance-paint/results.json). Source remained unchanged across all three builds. Raw samples, range labels, build/source/lock hashes, screenshots, Chrome traces and memory checkpoints accompany that file. Earlier successful and failed experiments remain separate.

Windows 11 (10.0.26200), AMD Ryzen 7 8845HS, Node 24.22.1, Chromium 158.0.8127.18, 1440×900 CSS pixels, DPR 1. CDP applied CPU rate 4 to the main renderer. Every Worker was separately sent the throttling command before resuming; Chromium rejected it as page-only. **Worker preprocessing was unthrottled.** These numbers do not establish a fully CPU4-throttled training pipeline.

Five fresh browser contexts per variant in one browser process, no disk-cache flush. Two identical warmups, then thirty measured zooms and thirty hovers for the million-row detail, separately thirty of each for Compare with R05 + three 8,192-row runs. Each zoom class occurs six times: overview, spike, reset, excluded spike, single step. Nearest-rank p95 is `sorted[ceil(N*.95)-1]`; five-load p95 is therefore the slowest load.

| Correct implementation | Cold p95, ms | Detail zoom p95, ms | Detail hover p95, ms | Compare zoom p95, ms | Compare hover p95, ms |
|---|---:|---:|---:|---:|---:|
| Scan baseline | 3340.1 | 670.8 | 24.9 | 720.4 | 38.5 |
| Stream scanner | 3406.5 | 442.3 | 23.5 | 512.2 | 40.1 |
| Exact index + stream fallback | 3118.3 | 229.9 | 21.5 | 308.5 | 40.9 |

Cold means navigation through three accepted, drawn panels and two RAFs. Zoom means main view-start mark to the last actual chart draw hook. Hover means request to accepted original-source response, **not completed pixel paint**. Separate Playwright action upper bounds include automation overhead. Chrome Performance traces start before the actions; screenshots and tracing have overhead. Playwright traces are not substituted for Chrome traces.

The index improves wide-window selection; it adds 1,696,608 bytes and approximately 243 ms build time for R05 in the measured first activation. Metrics with invalid values, conflicting groups or declared gaps use the unchanged stream scanner. No smoothing, approximate extrema or interpolation was introduced.

Engineering targets remain explicit: cold p95 ≤3000 ms and detail zoom ≤200 ms were missed; hover ≤50 ms passed. Compare zoom also exceeds the 200 ms reference. This is a measured limitation, not a claim that all budgets pass.

The verified paint change eliminated a second complete draw after `uPlot.batch()`. Its genuine failing test is retained in [paint-before](../reports/paint-before/); final Canvas/focus/theme tests pass. Compared with the earlier three-mode run, indexed zoom p95 changed from 226.3 to 229.9 ms, while Compare changed from 333.8 to 308.5 ms. Eliminating the duplicate paint did **not** establish a detail-zoom timing improvement. This sequential experiment is not a randomized causal study.

## Scoped memory

No forced GC was used. CDP main heap, backing storage and the Worker allocation ledger describe different scopes and must not be added to form tab memory.

| Indexed state | Main used JS heap, bytes | Main backing storage, bytes | Worker raw buffers, bytes | Worker unique typed-buffer ledger, bytes |
|---|---:|---:|---:|---:|
| R05 first settled view | 7,082,980 | 1,337,565 | 32,000,000 | 76,696,612 |
| After 20 SPA switches, R05 | 16,599,096 | 1,136,297 | 32,000,000 | 76,696,612 |
| Compare, settled | 16,877,436 | 1,287,016 | 32,786,432 | 78,576,688 |
| Compare, after interactions | 11,211,088 | 603,737 | 32,786,432 | 78,576,688 |

The ledger excludes JS object overhead, browser/Canvas/GPU allocations, unreachable garbage, retiring Worker isolates and process footprint. Rising heap between two unforced-GC samples proves neither a leak nor leak freedom. The separate runtime lifecycle check counts actual live page Workers and chart instances; its scope is recorded independently.

Chrome Task Manager footprint/JavaScript memory remains pending. Native inventory found the isolated test Chrome window, but its binding API rejected the same owner twice; a human readout was requested. [Native status](../reports/manual/native-memory-status.json) preserves that limitation rather than presenting CDP heap as a replacement.

Set `PERF_OUT` to a fresh reports directory before `node scripts/performance.mjs`; completed evidence cannot be overwritten. Large raw Chrome traces remain locally. Source archives store lossless `.json.gz` siblings; `node scripts/trace-archives.mjs --unpack` verifies and restores their exact hashes.
