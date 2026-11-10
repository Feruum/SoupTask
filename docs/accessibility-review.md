# Accessibility review - 10 November 2026

Assistant-run evidence, not human screen-reader certification. The final Chromium suite has 94 passing tests. Thirty full axe audits cover five screens at320/768/1440 CSS px in both themes: zero violations,516 color-contrast incomplete occurrences. [Full axe results](../reports/review-release/a11y-summary.json) retain findings and targets; they have not been silently converted into automated passes.

Incomplete cases involve SVG overlap, floating labels, sticky/clipped cells and small metadata. Review combines semantic-token contrast assertions, source/background inspection, screenshots, keyboard focus tests and actual runtime pixels. Text/table alternatives preserve run, metric and quality information independently of color. Remaining incomplete combinations are a limit of the automated result, not a complete WCAG certificate.

[Final runtime colors and lifecycle](../reports/runtime-review-final/runtime-contrast.json) samples actual opaque Canvas pixels, spike pixels and computed SVG text/background in the final Dashboard map:

| Theme | Minimum Canvas series contrast | Minimum SVG text contrast |
|---|---:|---:|
| Dark | 7.89:1 | 8.41:1 |
| Light | 4.94:1 | 6.15:1 |

Intentional inactive-series dimming is outside this unfocused-series sample. Legends and raw inspection remain available. Runtime screenshots and accessibility trees are in reports/runtime-review-final. The responsive suite checks page overflow, DPR 2, keyboard flow, range alternatives, reduced motion and source formatting. Screen captures are assistant visual samples, not exhaustive human review of every scroll position or physical touchpad/device.

Twenty production SPA transitions settle to one Worker and three uPlot instances. After context close, zero observed Workers remain. Large retiring Workers took 262-353 ms in the final check; every count is retained. Earlier premature lifecycle assertion failures remain archived. Settled counts do not prove leak freedom or total process-memory bounds.

Separate [Lighthouse desktop reports](../reports/lighthouse-release-final/summary.json): performance 97-98, accessibility 100, best practices 100. The failed system-Chrome launch is retained under lighthouse-review-final; the harness now uses the documented CHROME_PATH variable to select Chromium. Scores do not certify full WCAG conformance. Human NVDA/VoiceOver verification is unrecorded.
