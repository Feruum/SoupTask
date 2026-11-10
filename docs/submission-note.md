# Soup Training Monitor

Frontend delivery — 11 November 2026. [Production](https://soup-training-monitor.vercel.app) · [Repository](https://github.com/Feruum/SoupTask). Five screens: Dashboard, Training runs, Run details, Compare and Data quality. All data is demonstration snapshots; no live training or automatic stop recommendation is fabricated.

## Product and truthful data

Twenty deterministic scenarios cover nonfinite values, duplicates/conflicts, unsorted steps, known gaps, zero, tiny metrics and a singleton. R05 has 1,000,000 rows and exactly one Loss maximum: sourceIndex 500001, step 500001, value 100. Four immutable Float64 columns stay Worker-owned. Sampling preserves original provenance and visible extrema; conflicts/known gaps break authoritative lines. Source inspection retains original rows and revision. No smoothing or interpolation is presented as a measurement.

The interface includes searchable/filterable runs, URL-based two–four-run comparison, an interactive metric-quality map with text alternatives, range gestures/keyboard controls and an issue ledger. The shared source table shows actual step, all metrics, distance and source-qualified Pin. On wide screens it stays in a dedicated visible area above which charts scroll. Explicit layout ownership replaces global body:has, text nodes are reused and microtasks coalesce writes.

## Verification

Frozen snapshot 408d27bdc6b0baf2c2136927ba5774dbac799a60. Build/lint, 109 unit tests, 131 Chromium tests and all 20 regenerated manifest entries pass; no skipped/flaky cases or retries in the accepted run. Independent raw oracles, named fault controls, actual Canvas spike/gap pixels, controlled races, locale/timezone, keyboard, touch synthesis, both themes and DPR 2 are covered. Earlier genuine failures remain archived.

30 axe audits have zero violations. All 484 fresh contrast incomplete occurrences have pixel dispositions; original 516 are retained separately. Lighthouse Performance 95–97, Accessibility/Best Practices 100. These are automated observations, not human screen-reader or universal WCAG certification.

<!-- pagebreak -->

## Performance and limits

Windows 11/Ryzen 7/Chromium 158, 1440×900, DPR 1, CPU ×4 main renderer; Worker throttling unsupported. Two final full Chrome recordings each use five cold contexts, 30 detail and 30 Compare entry interactions, with separate 30-sample continuous movement per workspace. Nearest-rank p95, no pooling/forced GC. Worst p95: cold 3013.6 ms; detail/Compare zoom 122.2/161.0 ms; detail/Compare hover 64.5/56.7 ms. No-trace results are separate.

Current source DOM precedes BOTH RAF checks. Actual step/metric text must fit viewport/clipping bounds and pass cell-center occlusion sampling. Earlier offscreen-readout timing did not establish visible values and is not used as final visible-hover proof. Two RAFs establish a rendering opportunity, not physical monitor presentation. Expanded limits remain unmet for cold meaningful render, detail hover on entry, compare hover on entry, compare continuous hover. Stable sub-50 ms hover is not established. The demo is delivered with these measured limits; no 100/100 grade is asserted.

## Memory findings

A real uPlot document-mouseup listener leak on interrupted drag was fixed. Canvas buffers are released at unmount, timing entries and Intl caches are bounded, and decorative images use appropriately sized derivatives. The surprising failures were a retained document listener and an offscreen readout that looked fast in timing alone. Final B/T/F snapshots after 20/60 rounds found no newly accumulating detached candidates; this is not zero total detached objects.

Natural Windows renderer/Worker private committed / working set: 149.4/247.3 MiB initially, 262.0/376.6 after 20 switches, and 273.8/377.8 in Compare. Native MemoryInfra, raw 32 MB, indexed buffers 76.7 MB including raw, and JS heap are separate scopes. Do not add them to process counters. Remaining memory growth is a concern; universal leak freedom is not claimed.

## AI assistance and handoff

The author designed the architecture and data pipeline, made the key engineering decisions and reviewed the code. AI helped implement and fix code, develop tests and independent oracles, run automated browser checks, collect traces and measurements, and research implementation options. Human NVDA/VoiceOver testing was not recorded. The author sends the submission email personally. The changed-deadline/live-discussion cancellation was not verified. README, performance-results, the evidence manifest and the archived failures provide reproduction and scope.
