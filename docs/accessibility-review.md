# Accessibility review record

This is an assistant-run review, not a human screen-reader certification. Final Chromium acceptance contains 49 passing tests. Thirty full axe audits cover all five screens at 320, 768 and 1440 CSS pixels in both themes, with no violations. Additional mobile, keyboard, touch, DPR2, focus and reduced-motion scenarios are separate tests. Full engine output, including incomplete findings, remains in [a11y-summary.json](../reports/a11y-summary.json) and the embedded attachments of [e2e-full.json](../reports/e2e-full.json).

## Incomplete findings and disposition

The final axe run retains 610 **occurrences** of color-contrast incomplete findings, not 610 distinct confirmed violations. Targets include overlapping SVG run labels, floating input-label layers, sticky/clipped table cells, status pills and their small metadata. Axe could not establish some background/overlap combinations. Those occurrences have not been silently deleted or relabelled as automated passes.

Review evidence consists of semantic-token contrast tests, source inspection of text/background assignments, keyboard activation/focus tests, screenshots across the tested viewports, and the separate actual runtime checks below. Decorative SVG routing/grid marks have exact text/table alternatives; run/metric selection, status and quality information do not depend on color alone. A previous incomplete `aria-label` on an unnamed generic history-legend div was corrected to a labelled native figure; the final audit no longer reports that finding.

The assistant visually inspected the saved dark Dashboard and light four-run Compare screenshots: layouts, legends, metric labels and summary steps are visible without page-level horizontal overflow. The responsive browser suite checks all screen widths; this visual sample is not claimed as exhaustive human review of every table-scroll position.

## Real runtime colors and lifecycle

[runtime-contrast.json](../reports/manual/runtime-contrast.json) samples actual opaque pixels from every unfocused Canvas comparison-series color, the actual R05 spike pixels, and computed SVG text fill/background. Results:

| Theme | Minimum actual Canvas series contrast | Minimum SVG text contrast |
|---|---:|---:|
| Dark | 7.89:1 | 8.41:1 |
| Light | 4.94:1 | 6.15:1 |

Intentional dimming of inactive series during explicit focus is outside that unfocused-series sample. Legends, raw values and source inspection remain available. Screenshots and the Dashboard accessibility tree are retained under `reports/manual/`.

The same separate unthrottled runtime check observed one settled live page Worker and exactly three uPlot instances after each of 20 SPA transitions, and zero observed Workers after context close. Large retiring Workers disappeared after 279–372 ms; the initial assertion made before settlement failed and is preserved in [lifecycle-initial](../reports/lifecycle-initial/). The bounded settled-state condition and all intermediate counts are retained. These facts are not total process memory or proof about every possible navigation schedule.

Lighthouse is a separate desktop-preset audit: performance 96–97, accessibility 100, best practices 100 on the five routes. Neither its score nor a zero-violation axe result certifies complete WCAG conformance. Human NVDA/VoiceOver review has not been recorded. Chrome Task Manager footprint evidence remains pending because native window binding failed.
