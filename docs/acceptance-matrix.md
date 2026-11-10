# Requirement-to-evidence map

Frozen source: `408d27bdc6b0baf2c2136927ba5774dbac799a60`. All links below are executed evidence; older experiments remain under their original directories.

| Requirement | Current evidence |
|---|---|
|20 runs, four fields,1M exact unique spike,32 MB raw | [Unit/oracle results](../reports/memory-investigation-2026-11-10/release-final-v2/final-unit.json), [four release commands](../reports/memory-investigation-2026-11-10/release-final-v2/final-checks.json) |
| Truthful extrema, gaps, conflicts, source identity and bounded inspection | Unit/property tests; [131 browser tests](../reports/memory-investigation-2026-11-10/release-final-v2/final-browser/results.json); [actual Canvas controls](../reports/memory-investigation-2026-11-10/release-final-v2/final-canvas/manifest.json) |
| Stale replies, ABA/revisions, queues and ownership | Unit races; [named stale-control failure](../reports/async-negative/manifest.json); browser lifecycle |
| Five screens, routing, search/filters/selection, keyboard/mobile/themes | Browser run; [production smoke](../reports/deployment.json) |
| Visible actual values and two-frame endpoint | [Independent frame/cell confirmation](../reports/memory-investigation-2026-11-10/release-final-v2/visible-latency.json); source-cell fault cases |
| Accessibility, formatting and fresh incomplete findings | [Axe](../reports/memory-investigation-2026-11-10/release-final-v2/final-a11y-summary.json), [484 pixel dispositions](../reports/memory-investigation-2026-11-10/release-final-v2/final-contrast/ledger.json), original 516 retained |
| Memory and resource lifetime | [B/T/F retainer chains](../reports/memory-investigation-2026-11-10/release-final-v2/final-roundtrip/retainer-analysis.json), [MemoryInfra](../reports/memory-investigation-2026-11-10/release-final-v2/final-roundtrip/native-attribution.json), [natural process counters](../reports/memory-investigation-2026-11-10/release-final-v2/final-memory/results.json) |
| Module boundaries and telemetry | [Boundary graph](../reports/memory-investigation-2026-11-10/release-final-v2/module-boundaries.json), [bounded-page/full-trace control](../reports/memory-investigation-2026-11-10/release-final-v2/final-timing-trace/results.json) |
| Production latency and separate no-trace | [Comparison](../reports/memory-investigation-2026-11-10/release-final-v2/latency-comparison.json), [visible target gate](../reports/memory-investigation-2026-11-10/release-final-v2/visible-latency.json) |
| Submission | README, [two-page note](../output/pdf/soup-submission-note.pdf), [AI disclosure](submission-note.md), [evidence manifest](../reports/evidence-manifest.json) |

Expanded limits remain unmet for cold meaningful render, detail hover on entry, compare hover on entry, compare continuous hover. Stable sub-50 ms hover is not established. The demo is delivered with these measured limits; no 100/100 grade is asserted. The original PDF has no numeric latency ceiling. Exact published bytes/routes are checked separately; the author sends the local email draft personally. A100/100 grade, scientific validity of logger input and universal browser/accessibility correctness are not asserted.
