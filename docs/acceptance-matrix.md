# Requirement-to-evidence matrix

Current primary artifacts are the final application outputs below. Historical witness/scaffold logs remain supporting history, not substitutes for current results.

| Requirement / plan tasks | Implementation and executed verification | Evidence |
|---|---|---|
| Environment / F00 | Installed versions, lock, source and build hashes; actual Node 24.22.1 | `reports/build-metadata.json`, build/lint logs |
| Twenty scenarios, deterministic R05 / F01, F06 | Exact 1M spike, raw storage, seed/revision, manifest regeneration | `src/core/engine.test.ts`, `src/data/*.test.ts`, `reports/hover-final-guarded-unit.json` |
| Visible extrema, boundaries, provenance / F02, F05, F15, C01 | Independent raw-window/bucket oracles; scan/stream/index differential cases; topology fallback | `src/sampling/block-index.test.ts`, `src/core/topology.test.ts` |
| Worker ownership and async / F03, F07 | Real transferable render buffers; retained raw inspection; controlled epochs/revisions, pending replacement and operation pages | `src/worker/*test.ts`, `reports/async-negative/` |
| Actual Canvas / F04, F09, F12 | Pixel spike and NaN gap, exact source row, critical markers, paint/focus/theme behavior; suppressed drawing genuinely fails | `e2e/chart-paint.spec.ts`, `e2e/canvas-gap.spec.ts`, `reports/canvas-review-final/` |
| Runs/details / F08 | Search/filter/sort, independent preview/Compare selection, range gestures, pinned exact source, accepted pagination | `e2e/interactions.spec.ts`, `e2e/source-pagination.spec.ts`, `e2e/pinned-source.spec.ts` |
| Compare / F09 | URL IDs and limits, rapid CPU4 selection/back-forward, actual steps, three metric summaries, invalid latest and earlier finite step | `e2e/comparison-selection.spec.ts`, `e2e/summary-quality.spec.ts` |
| Quality / F10 | Manifest matrix, unit-aware issue totals, bounded Worker ledger, accepted filter/page identity, source/revision links | `src/features/quality/issue-summary.test.ts`, `e2e/summary-quality.spec.ts` |
| Dashboard / F11 | Real manifest counts, run/metric sector selection, keyboard/native/table alternatives, selected source preview and findings | `e2e/dashboard-redesign.spec.ts`, `e2e/run-history.spec.ts` |
| Negative controls / F12 | Named assertion failures for every-N, mean, fabricated peak, bridged gap, stale acceptance and suppressed drawing; arbitrary crashes rejected | `reports/negative-controls/manifest.json`, `reports/async-negative/manifest.json`, Canvas manifest |
| Accessibility/formatting/mobile/lifecycle / F13 | 94 browser tests, 30 axe audits, actual contrast, three locales/timezones, DPR2, keyboard/touch, reduced motion and 20 settled transitions | `reports/release-final-browser/results.json`, `docs/accessibility-review.md` |
| Before/after and memory / F14–F16 | Same-source three-mode production run, five cold loads, 30 detail + 30 Compare interactions, Chrome traces and scoped ledgers | `reports/performance-hover-frame-final/results.json`, `reports/hover-guarded-performance/results.json`, `reports/tab-memory-headless-pair/`, `docs/performance-results.md` |
| Publication / F17 | Real new project; five direct/reload routes, original R05 source and Canvas, JS Worker, assets/cache validation, missing asset 404 | `reports/deployment.json`, `reports/deployed-prebuilt-final/`, actual production URL |
| Submission / F18 | README, this matrix, factual disclosure, exact two-page PDF, evidence inventory, local source repository/archive | `output/pdf/soup-submission-note.pdf`, `reports/evidence-manifest.json` |

Evidence collection is complete for the implemented frontend, including scoped native renderer/Worker memory and pointer-to-frame hover. Verdict remains **DON'T SHIP against expanded latency targets**: cold, Compare zoom and both hover targets are missed. The original PDF specifies no numeric latency ceiling and does not require the Task Manager UI specifically. Worker throttling was unsupported. Human screen-reader certification, changed-deadline/live-discussion cancellation and email sending remain unconfirmed. A 100/100 grade is not asserted.
