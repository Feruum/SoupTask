# Production performance and memory — 11 November 2026

Frozen source commit: `408d27bdc6b0baf2c2136927ba5774dbac799a60`. [Source/build metadata](../reports/build-metadata.json) binds the current application. Historical reports remain archived and do not replace final-source acceptance.

## Corrected visible-hover endpoint

Earlier readouts could sit below the viewport. Those historical results measured DOM plus two RAFs and did not prove readable on-screen values. The desktop table now occupies a permanent area below a separate chart scroller. The current criterion requires original source DOM before BOTH RAF checks; at the second check, actual-step/metric text must fit viewport and clipping bounds and pass cell-center occlusion sampling. Missing observations are explicit. No physical monitor presentation or every-pixel occlusion guarantee is asserted. [Correction, experiments and limits](visible-hover-verification.md).

Windows 11, Ryzen 7 8845HS, Chromium 158,1440×900,DPR 1, production. CPU ×4 applies to the main renderer; Worker throttling commands were unsupported. Each full recording uses five fresh browser contexts, two warmups and 30 range/hover pairs in details and separately30 in four-run Compare, plus separate 30-sample continuous movement series. Nearest-rank p95, no forced GC, no pooled samples. Shared-machine sequential measurements are not randomized causal proof.

| p95,ms | Worse of two final full recordings | Limit | Result |
|---|---:|---:|---|
| Cold meaningful render | 3013.6 | 3000 | Miss |
| Detail zoom | 122.2 | 200 | Pass |
| Detail hover on entry | 64.5 | 50 | Miss |
| Compare zoom | 161.0 | 200 | Pass |
| Compare hover on entry | 56.7 | 50 | Miss |
| Detail continuous hover | 45.0 | 50 | Pass |
| Compare continuous hover | 50.9 | 50 | Miss |

Expanded limits remain unmet for cold meaningful render, detail hover on entry, compare hover on entry, compare continuous hover. Stable sub-50 ms hover is not established. The demo is delivered with these measured limits; no 100/100 grade is asserted.

[Full recording 1](../reports/memory-investigation-2026-11-10/release-final-v2/performance-trace/results.json) · [confirmation](../reports/memory-investigation-2026-11-10/release-final-v2/performance-confirmation/results.json) · [separate no-trace regime](../reports/memory-investigation-2026-11-10/release-final-v2/performance-no-trace/results.json) · [independent visible-value gate](../reports/memory-investigation-2026-11-10/release-final-v2/visible-latency.json) · [same-harness comparison](../reports/memory-investigation-2026-11-10/release-final-v2/latency-comparison.json). Trace overhead remains included; no-trace results never replace a failing recorded result.

The earlier correct-visibility baseline had detail/Compare hover p95 of 57.5/70.0 ms, cold 2859.4 ms and detail/Compare zoom 138.7/164.8 ms. The final measurements improve some metrics and regress others; the complete comparison retains both. The older offscreen numbers are a different evidence scope.

## Scoped native memory

[Current natural-GC process counters](../reports/memory-investigation-2026-11-10/release-final-v2/final-memory/results.json) deduplicate renderer and live dedicated-Worker PIDs using their own trace markers. Private committed memory and working set include native allocations; JS heap and typed buffers are separate and must not be added to them. Shared GPU/browser/utility processes are not wholly assigned to the tab. This is not universal total tab/GPU memory or a Task Manager screenshot.

| Checkpoint | Private committed,MiB | Working set,MiB |
|---|---:|---:|
| 1M-settled | 149.4 | 247.3 |
| 1M-after-20-SPA-switches | 262.0 | 376.6 |
| Compare-1M-plus-three | 273.8 | 377.8 |

The confirmed interrupted-drag leak was an outstanding uPlot document mouseup listener. Cleanup removes the actual registered listener before destroy. Canvas bitmaps are zero-sized on unmount; timing entries are capped128/name; Intl formatter caches are bounded32; decorative art now uses128/256/512 px variants instead of 1254 px decoding. Raw R05 storage remains32,000,000 bytes; the owned indexed buffer ledger is76,696,612 bytes including raw. No raw ownership or numerical guarantee was weakened.

[Final B→T→F retainer analysis](../reports/memory-investigation-2026-11-10/release-final-v2/final-roundtrip/retainer-analysis.json) and [native MemoryInfra attribution](../reports/memory-investigation-2026-11-10/release-final-v2/final-roundtrip/native-attribution.json) are separate forced-snapshot diagnostics. Rolling-baseline20/60-round results do not mean zero total detached objects or universal leak freedom. [Full investigation and before-fix retaining chain](memory-investigation.md) preserves the original document→listener→uPlot path, native raster findings and natural-memory limits.

## Reproduction

Use fresh output directories. Run build and build-metadata, then set PERF_OUT and PERF_MODES=indexed before npm run perf. PERF_TRACE=off selects a separately labelled regime. MEMORY_OUT selects the natural Windows-counter experiment; ROUNDTRIP_OUT and ROUNDTRIP_DRAG=true select the separate retained-memory diagnosis. Heavy checks run sequentially. node scripts/trace-archives.mjs --unpack verifies/restores exact archived profiler JSON. Final Lighthouse scores are95–97 Performance; Accessibility/Best Practices 100. These settings differ from the custom CPU4 protocol.
