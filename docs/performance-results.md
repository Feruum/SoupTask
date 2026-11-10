# Production measurements - 10 November 2026

The latest indexed build is [hover-guarded-performance/results.json](../reports/hover-guarded-performance/results.json). It includes final cursor/view identity fixes and an unchanged application source hash. The earlier, internally stable three-mode comparison is [performance-hover-frame-final/results.json](../reports/performance-hover-frame-final/results.json). These are different revisions, not one unchanged-source experiment.

Windows 11 build 26200, Ryzen 7 8845HS, Node 24.22.1, Chromium 158.0.8127.18, 1440x900 CSS px, DPR 1. CPU rate 4 applies to the main renderer. Workers rejected their separate throttling command and remained unthrottled. Five fresh contexts per variant, same browser process, OS caches not flushed; two warmups then 30 range/hover pairs for detail and separately Compare (R05 plus three ordinary runs). No forced GC. Nearest-rank p95 is sorted[ceil(N*.95)-1]. Shared-machine background work was not completely controlled; sequential results are not a randomized causal study.

| Source / implementation | Cold p95 ms | Detail zoom | Pointer-to-frame hover | Compare zoom | Compare pointer-to-frame |
|---|---:|---:|---:|---:|---:|
| Earlier scan | 2881.6 | 546.3 | 130.8 | 588.8 | 198.2 |
| Earlier stream | 2987.3 | 408.8 | 159.2 | 462.2 | 206.1 |
| Earlier indexed | 2750.1 | 203.1 | 120.7 | 284.8 | 209.5 |
| Latest indexed | 3089.5 | 197.1 | 88.7 | 241.0 | 115.1 |

Latest p50 cold/zoom/hover:2708.6/168.6/74.8 ms. Detail accepted-response p95 is23.1 ms, DOM commit 33.5 ms, request-to-frame 73.2 ms. Those smaller numbers do not replace 88.7 ms pointer-input-to-frame. Compare hover improved approximately 45%, detail 27%, while cold load regressed. Intermediate runs remain under hover-optimized-performance and hover-final-performance, including regressions.

Cold ends after three accepted/drawn panels and two RAFs. Zoom ends at the actual chart draw hook. Hover correlates browser pointer timestamp, workspace/view/hover identity, committed source rows and a two-RAF rendering opportunity. This is not physical monitor presentation. Actual source tooltip screenshots and Chrome rendering/paint traces accompany samples. Playwright trace is not substituted for Chrome Performance trace.

Optimizations cache at most 32 Intl.NumberFormat instances, publish cursor changes to chart subscribers instead of feature pages, and dispatch raw queries without an extra RAF. Source values remain unchanged. Controlled tests reject old-axis input while a new view is pending. Diagnostic profiles found 3264 formatter constructions before and zero after warmup; instrumented profiles are separate from the normal benchmark. The exact index adds 1,696,608 bytes; topology needing real breaks still uses the stream scanner.

Expanded targets: cold<=3000 ms missed; detail zoom<=200 ms passed; Compare zoom<=200 ms missed; pointer-to-frame hover<=50 ms missed in both modes. The original PDF gives no numeric latency ceilings. Verdict: DON'T SHIP against expanded engineering targets. First profile remaining input/commit/frame delay and Compare drawing without weakening truthfulness or changing the measurement endpoint.

## Actual process memory

[Headless paired snapshots](../reports/tab-memory-headless-pair/indexed/results.json) associate the page renderer and each Worker with Windows PIDs via trace markers, deduplicate PIDs and record OS counters. Latest build at1M: **143.7 MiB private committed,242.3 MiB working set**. Earlier scan:147.2/246.0 MiB. One sample per version, no GC: no repeatable memory-saving claim. Raw storage 32,000,000 bytes; indexed unique typed-buffer ledger 76,696,612 bytes INCLUDING raw. Do not add those to process footprint.

The separate earlier [headed lifecycle experiment](../reports/tab-memory-final/results.json) recorded 136.7/197.0 MiB initially,242.9/315.8 MiB after 20 switches,251.2/323.7 MiB in Compare. It is an earlier build and different browser configuration. Unforced-GC growth proves neither a leak nor leak freedom.

OS counters include renderer/Worker native allocations. Shared browser/GPU/utility subtotals remain separate, not assigned wholly to the tab. Working-set sums may count shared pages twice; samples are sequential, not atomic. This is scoped process footprint, not universal total tab/GPU memory or a Task Manager screenshot. CDP dump requests acknowledged, but native dump GUID matching failed; that false flag is retained. Missing-PID and unexpectedly closed-browser attempts remain in tab-memory-comparison directories.

## Reproduction

Set a fresh PERF_OUT; set PERF_MODES=indexed then run `node scripts/performance.mjs` for the default build, or omit PERF_MODES for all three variants. Completed results cannot be overwritten. Set MEMORY_HEADLESS=true, MEMORY_INITIAL_ONLY=true and MEMORY_OUT to a fresh directory before `node scripts/tab-memory.mjs`. Shell syntax varies. Earlier/latest exact performance runtime inputs and instructions are under reports/measurement-sources.

Run `node scripts/trace-archives.mjs --unpack` to verify/restore lossless trace JSON. Lighthouse HTML/JSON are separately under reports/lighthouse-release-final; its desktop simulation differs from CPU 4.
