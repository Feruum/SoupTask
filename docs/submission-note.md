# Soup Training Monitor

Full frontend delivery - 10 November 2026. [Production](https://soup-training-monitor.vercel.app) and [source repository](https://github.com/Feruum/SoupTask). Five screens: Dashboard, Training runs, Run details, Compare and Data quality. Sources are explicitly demonstration snapshots. Existing Soup landing deployment is separate.

## Product and source truth

Dashboard opens a focused run monitor; Experiment map and Groups remain local views. Circle sectors select a run and metric. Charts support wheel/pinch zoom, Shift-wheel pan, drag selection and keyboard ranges. Compare emphasizes series consistently and queries original rows by numeric step. Source/quality links retain revision and sourceIndex. Fixed source readouts avoid sudden page movement; empty findings distinguish clean snapshots from filter misses.

Twenty deterministic scenarios cover nonfinite values, duplicates, ordering, cadence gaps, zeros, tiny values and a singleton. R05 has 1,000,000 rows and one injected unique Loss maximum: sourceIndex 500001, step 500001, value 100. Four raw Float64 columns remain Worker-owned. Rendering preserves original coordinates and visible extrema; conflicts and known gaps break the authoritative line. No smoothing, interpolation or scientific stop recommendation is fabricated.

## Verification

Build and lint pass; 99 unit tests and 94 Chromium acceptance tests pass, no skipped/flaky browser tests. Independent raw oracles, controlled async races, current-view cursor guards, real Canvas spike/gap pixels, keyboard, gestures, responsive layouts, DPR 2, locale/timezone and cleanup are exercised. Six fault classes must fail named assertions; raw failures remain available. Four Impeccable findings and later layout/clarity regressions are corrected with red/green evidence.

Thirty axe audits: zero violations, 516 incomplete contrast occurrences retained. Actual Canvas contrast is at least 7.89:1 dark /4.94:1 light; SVG text 8.41:1 /6.15:1. Separate Lighthouse desktop: performance 97-98; accessibility and best practices 100. This is not human screen-reader certification.

<!-- pagebreak -->

## Measured performance and verdict

Windows 11, Ryzen 7 8845HS, Chromium 158,1440x900,DPR 1. Five cold contexts and 30 interactions per detail/Compare; nearest-rank p95. Main CPU rate 4; Worker throttling explicitly unsupported. Latest indexed cold 3089.5 ms, detail zoom 197.1 ms, Compare zoom 241.0 ms. Pointer-input-to-source-frame p95 improved 120.7 to88.7 ms in detail and 209.5 to115.1 ms in Compare. Cold load regressed from 2750.1 ms. All samples, intermediate runs and immutable before/after runtime sources are retained.

Hover ends at a committed-source two-RAF rendering opportunity, not merely Worker receipt or physical monitor presentation. Before/after revisions differ; shared-machine activity limits causal inference. Formatter caching and isolated chart subscriptions remove repeated constructors and feature-page rerenders without weakening source identity.

**DON'T SHIP against expanded latency targets.** Detail zoom meets 200 ms; cold 3000 ms, Compare zoom 200 ms and both hover 50 ms targets remain missed. The original PDF has no numeric ceiling. First profile remaining input/commit/frame delay and Compare drawing; retain the same endpoint and correctness tests.

## Memory and surprises

Latest 1M headless Windows PID-associated renderer/Worker footprint: 143.7 MiB private committed, 242.3 MiB working set. Earlier scan 147.2/246.0 MiB; one sample each, no memory-saving claim. Raw 32,000,000 bytes; indexed typed-buffer ledger 76,696,612 bytes INCLUDING raw, not additive to OS footprint. Shared browser/GPU memory remains separately scoped; working sets can share pages. CDP dump GUID validation failed and is labelled accordingly. Earlier headed 20-switch samples are separate, not latest-build memory or leak-freedom proof.

Twenty final SPA transitions settle to one Worker/three charts, then zero Workers on close. Retiring Workers persist briefly. Profiling exposed repeated Intl constructors; tests also caught old-view cursor publication and abrupt readout layout shifts. Genuine failures and corrections are preserved.

## AI disclosure and reproduction

AI assisted architecture, implementation, independent test oracles, fault injection, browser automation, profiling and documentation. Proposals were revised against raw identities and Canvas pixels. Humans supplied requirements, visual feedback, Vercel authentication and project choice; another agent completed Dashboard. No human NVDA/VoiceOver or scientific-model review is claimed. Original changed-deadline/live-discussion cancellation email was not found.

README, docs/performance-results.md and reports/evidence-manifest.json provide commands, hashes, scope and limitations. Lossless trace archives restore via scripts/trace-archives.mjs --unpack. Five production routes, reloads, actual Worker/assets and exact spike/source pass smoke checks. Submission email is drafted locally and awaits explicit send authorization.
