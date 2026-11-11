# Soup Training Monitor

11 November 2026 · [Demo](https://soup-training-monitor.vercel.app) · [Repository main 3f4ba7c](https://github.com/Feruum/SoupTask/tree/3f4ba7c9dda108bc2a18908da021f36f6cdbcbd1) · [Measured build 408d27b](https://github.com/Feruum/SoupTask/tree/408d27bdc6b0baf2c2136927ba5774dbac799a60)

**Verdict: SHIP for evaluation.** The demo is ready for Soup's review. Before using it on live training runs, first check whether memory plateaus over longer sessions, fix any confirmed retention, and repeat the same performance profiles.

## Product and truthful data

Five screens use 20 reproducible demo snapshots. A Worker owns four original Float64 columns per run. The sampler preserves visible extrema and source identity. Invalid values, conflicts and known gaps break the line. The chart is linear with no smoothing or log mode; recorded zero remains a real value.

**Try it.** Open [R05](https://soup-training-monitor.vercel.app/runs/kazakh-sft-005), zoom around its unique Loss peak (100 at step and source index 500001 of 1,000,000 rows), then inspect the original row. [Compare](https://soup-training-monitor.vercel.app/compare) shows the recorded step and values per run. Data quality links findings to the source.

## Research applied to Soup

W&B and Comet informed the run-to-metrics workflow. A historical W&B issue showed samples changing on refresh; Soup checks the spike against the original row and tests intentional omissions and fabricated values. [W&B case](https://github.com/wandb/wandb/issues/4177) · [Comet experiment guide](https://www.comet.com/docs/v2/guides/comet-ui/experiment-management/single-experiment-page/)

Grafana's batched tooltip and TradingView's separate cursor layer informed readout and chart updates. Chrome's layout guidance helped diagnose page-wide work from a global selector and repeated text replacement. [Research and primary sources](https://github.com/Feruum/SoupTask/blob/3ddd6e04ef687ac83799f6f9763a2c6650c23f91/docs/research-complete-2026-11-10.md)

## Verification and test limits

Build, lint, **109 unit tests**, **131 Chromium tests** and all 20 manifest entries passed. Canvas and source checks cover the spike, NaN gaps, zero, duplicate/order handling, races and formatting. Browser checks cover filters, loading/empty/error, keyboard and layouts at 320/768/1440 px. [Test map and outputs](https://github.com/Feruum/SoupTask/blob/3ddd6e04ef687ac83799f6f9763a2c6650c23f91/docs/acceptance-matrix.md) · [Deployed asset parity and smoke](https://github.com/Feruum/SoupTask/blob/3ddd6e04ef687ac83799f6f9763a2c6650c23f91/reports/deployment.json)

Thirty axe audits found no violations. Pixel checks reviewed 484 contrast occurrences on the final build; 516 were reviewed on an earlier build. These are separate sets. [Accessibility evidence](https://github.com/Feruum/SoupTask/blob/3ddd6e04ef687ac83799f6f9763a2c6650c23f91/docs/accessibility-review.md)

Tests use synthetic snapshots and Chromium. They do not establish real-log accuracy, Firefox/Safari parity, exhaustive sort order, or leak freedom in longer sessions.

## AI assistance

I conceived the product, designed the architecture and pipeline, researched articles and solutions, and reviewed the code. AI wrote code and tests and proposed alternatives. I kept the proposed shared source readout and requested clearer spike and NaN explanations after reviewing the charts.

<!-- pagebreak -->

## Performance: before and after

p95 in milliseconds. Before `5215fc9` and after `408d27b` used the same corrected harness: Windows 11, Ryzen 7, Chromium 158, 1440×900, DPR 1, CPU ×4 on the main renderer only. Each run used five cold contexts and 30 samples per interaction scenario.

| Metric | Budget | Before trace | After trace 1 | After trace 2 | After no trace |
| --- | ---: | ---: | ---: | ---: | ---: |
| R05 cold render | 3,000 | 2,859.4 | 2,807.3 | **3,013.6** | 2,680.4 |
| R05 zoom | 200 | 138.7 | 120.3 | 122.2 | 113.3 |
| Compare zoom | 200 | 164.8 | 161.0 | 142.3 | 126.8 |
| R05 hover on entry | 50 | 57.5 | **64.5** | **52.8** | 37.5 |
| Compare hover on entry | 50 | 70.0 | **56.7** | **56.0** | 49.9 |
| R05 continuous hover | 50 | n/a | 43.1 | 45.0 | 41.3 |
| Compare continuous hover | 50 | n/a | **50.9** | **50.8** | 49.8 |

The optimization replaced `body:has()` with an explicit class, reused text nodes and batched updates. Compare hover improved in both traced runs; R05 hover on entry was mixed. Bold marks final budget misses. The separate no-trace run met the targets. Sequential runs do not isolate the effect of each change. [Raw results, traces and protocol](https://github.com/Feruum/SoupTask/blob/3ddd6e04ef687ac83799f6f9763a2c6650c23f91/docs/performance-results.md) · [Same-harness comparison](https://github.com/Feruum/SoupTask/blob/3ddd6e04ef687ac83799f6f9763a2c6650c23f91/reports/memory-investigation-2026-11-10/release-final-v2/latency-comparison.json)

![Compare with four runs and original values visible](../assets/readme/compare.png)

## Memory at 1,000,000 rows

Before/after covers latency. Memory below was measured on `408d27b`, with no matched `5215fc9` baseline. Windows renderer and Worker counters include native allocations and exclude shared GPU/browser processes. [Raw memory results](https://github.com/Feruum/SoupTask/blob/3ddd6e04ef687ac83799f6f9763a2c6650c23f91/reports/memory-investigation-2026-11-10/release-final-v2/final-memory/results.json)

| Checkpoint | Private committed (MiB) | Working set (MiB) |
| --- | ---: | ---: |
| R05, settled after load | 149.4 | 247.3 |
| R05, after 20 SPA switches | 262.0 | 376.6 |
| Compare, R05 and three other runs | 273.8 | 377.8 |

Fixed a uPlot mouseup listener retained after interrupted drag. Separate heap checks found no new accumulation of detached nodes after 20 and 60 rounds. The process footprint still rose; this does not by itself establish another leak. [Memory investigation](https://github.com/Feruum/SoupTask/blob/3ddd6e04ef687ac83799f6f9763a2c6650c23f91/docs/memory-investigation.md)

## Surprises and remaining concerns

An early hover test counted offscreen values. The corrected test checks the current source cells after two animation frames, including clipping and cell-center occlusion. Remaining concerns are slower traced interactions and whether process memory settles during longer navigation sessions.
