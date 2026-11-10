# Soup Training Monitor

Frontend delivery — 10 November 2026. [Production](https://soup-training-monitor.vercel.app) · [Repository](https://github.com/Feruum/SoupTask). Five screens: Dashboard, Training runs, Run details, Compare and Data quality. All data is labelled demonstration snapshots. The separate Soup landing deployment is unchanged.

## Product and truthful charts

Twenty deterministic scenarios include NaN/Infinity, duplicate conflicts, unsorted steps, cadence gaps, zero, tiny values and a singleton. R05 has 1,000,000 rows and one unique Loss maximum: sourceIndex 500001, step 500001, value 100. Four raw Float64 columns remain Worker-owned. Independent per-metric reduction preserves exact source coordinates and visible finite extrema. Conflicts and known gaps break the authoritative line; source members remain inspectable. No smoothing or interpolation is represented as a measurement.

Dashboard includes a focused monitor and interactive run/metric map with text alternatives. Charts support wheel/pinch zoom, Shift-wheel pan, drag and keyboard range controls. Details and Compare share one stable source table with all three raw metrics, actual steps, distance and source-qualified Pin. Whole-run facts remain independent of the viewport; NaN never becomes zero. No scientific training-stop recommendation is fabricated.

## Verification and evidence

Source commit 41ae67f48be6364f719ba38ad71d694c8ae484fe; source/build hashes are in reports/build-metadata.json. Build, lint, 106 unit tests (27 files), 113 Chromium acceptance tests and regeneration of all 20 manifest entries pass. No skipped/flaky browser cases or retries. Raw oracles, controlled stale-response races, locale/timezone, keyboard, synthesized touch, responsive layouts, DPR2, actual Canvas spike/gap pixels and cleanup are covered. Six injected fault classes fail named assertions; failed results remain archived.

Thirty axe audits report zero violations. All 528 fresh contrast incomplete occurrences have individual screenshot/pixel dispositions (minimum 5.096:1); the original 516 are also retained. Actual Canvas/SVG contrast is checked in both themes. Separate Lighthouse Performance is 94–98, Accessibility/Best Practices 100. This is assistant-run evidence, not human screen-reader certification. Tests cannot prove every oscillation, every browser or scientific logger validity.

<!-- pagebreak -->

## Performance and verdict

Windows 11, Ryzen 7 8845HS, Chromium158, 1440×900, DPR1. Main renderer CPU×4; Worker throttling unsupported. Each run uses five cold contexts and 30 detail plus 30 four-run Compare range/hover pairs, nearest-rank p95, no forced GC. Two same-source full Chrome recordings pass all expanded targets. Worst p95: cold 2531.9ms; detail/Compare zoom 114.8/131.4ms; detail/Compare hover 40.6/48.6ms. Matched previous-source full-trace baseline: 2493.6ms cold, 149.6/214.7ms zoom, 88.5/107.5ms hover. Cold confirmation is slightly slower, within budget. Separate no-trace results are not pooled.

Hover retains the original browser pointer timestamp through current source DOM and two RAF callbacks: a rendering opportunity, not physical monitor presentation. Exact bounded source caches, unchanged-row suppression, shared readouts and offscreen overlay deferral reduce work. Native crosshair/drag remains. Traces, raw samples, failed experiments and before/after source identities are retained. Shared-machine sequential measurements limit causal inference.

**SHIP for the implemented demonstration frontend**, conditional on the generated evidence manifest having no pending checks and exact published-byte verification. The original PDF has no numeric ceilings; the expanded latency targets now pass. Longer-session retained-memory analysis is the first next improvement, not an unverified claim of leak freedom.

## What surprised me and still concerns me

Raw lookup was already fast; duplicated DOM updates and frame work dominated hover. A genuine MutationObserver test caught repeated unchanged-row writes, and report HTML unexpectedly changed Tailwind output until source scanning was bounded. Native renderer/Worker footprint at 1M is 145.9MiB private committed /245.6MiB working set, growing to 319.5/588.7MiB after 20 transitions. Raw columns are 32,000,000 bytes; indexed owned buffers 76,696,612 bytes including raw. These scopes are not additive. Shared GPU/browser memory is separate. Settled lifecycle checks observe one Worker/three charts and zero Workers after close; memory growth remains a concern requiring retained-object analysis.

## AI assistance and handoff

The author designed the architecture and data pipeline, made the key engineering decisions and reviewed the code. AI helped implement and fix code, develop automated tests and independent oracles, run browser checks, collect performance traces and measurements, and research implementation options. Proposed implementations were checked against original source identities, actual Canvas pixels and red/green tests; unsuccessful optimizations remain visible. Human NVDA/VoiceOver review and changed-deadline/live-discussion cancellation were not verified. README, docs/performance-results.md and reports/evidence-manifest.json provide reproduction and scope. The author will send the submission email personally.
