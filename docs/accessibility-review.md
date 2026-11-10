# Accessibility and runtime review — 10 November 2026

Source commit `41ae67f48be6364f719ba38ad71d694c8ae484fe`; hashes are recorded in [build metadata](../reports/build-metadata.json). [Final browser acceptance](../reports/perf-targets-2026-11-10/final-browser/results.json) has 113 passes, no skipped/unexpected/flaky cases, retries 0. Coverage includes five screens, dark/light, 320/768/1440px, DPR 2, keyboard, synthesized Chromium touch, wheel/pinch/pan/drag, focus, reduced motion and locale/timezone cases. This is browser automation, not physical-device or human assistive-technology certification.

## Axe incomplete findings are preserved and individually reviewed

[Thirty final axe audits](../reports/perf-targets-2026-11-10/final-a11y-summary.json) report zero violations and **528 color-contrast incomplete occurrences**. All 528 have an individual [same-source/build pixel ledger](../reports/perf-targets-2026-11-10/final-contrast/ledger.json), with original and text-masked screenshots, unique selector, actual geometry, nested scrolling, ancestor clipping/opacity, foreground and actual painted background. All are verified text; minimum reviewed contrast is **5.096:1**, above 4.5:1. This compares intended composited foreground against the worst actual background beneath glyph pixels, not antialiased edge pixels.

The [original 516 occurrences](../reports/perf-targets-2026-11-10/contrast-full/ledger.json) were also individually reviewed and retained. They belong to an earlier build and do not replace the fresh 528. Axe's raw incomplete findings have not been deleted or reclassified as automatic passes. Pixel replay is assistant-run evidence, not universal WCAG conformance or a human screen-reader certificate.

## Canvas, SVG, keyboard and lifecycle

[Runtime results](../reports/perf-targets-2026-11-10/final-runtime/runtime-contrast.json) check actual opaque Canvas series pixels at ≥3:1 and SVG text at ≥4.5:1 in both themes, with the genuine R05 source spike. Unfocused series are checked; intentionally dimmed inactive series are outside that sample, with text legends/source tables retained. The radial map has native selector, arrow-key and equivalent table alternatives.

The shared source table exposes run, actual step, all three raw metrics, distance and source-qualified Pin actions. Its internal horizontal/vertical scroll area is keyboard accessible. Fixed columns/reserved space avoid appearing-coordinate reflow; duplicate sourceIndex members, revision links, NaN, tiny LR and signed-zero source inspection remain available. Tests cover mobile traversal and repeated leave/re-enter without feature-page rerenders. Offscreen overlays redraw on reveal; a real Learning Rate pixel assertion guards this behavior.

Twenty settled SPA transitions each retain one Worker and three plots; context close leaves zero observed Workers. Cleanup disconnects ResizeObserver/IntersectionObserver, RAFs and listeners in source, but the browser counter does not measure every individual listener. Retiring Workers can overlap briefly. Process memory grows across transitions and remains an explicit [limitation](performance-results.md).

## Impeccable and remaining scope

[Final Impeccable 4.6 review](../reports/perf-targets-2026-11-10/impeccable-final-review.md) records the bounded code review, detector's actual limitations, responsive/gesture evidence and open concerns. Four prior fixes remain covered: Inspector empty/error feedback, intermediate-width preview, truthful zoom instructions and readable issue names. Clean snapshots and filtered misses are distinct; stale source timestamps do not imply corrupt observations. The Loss spike annotation explains linear-axis compression independently from nonfinite gaps.

[Separate Lighthouse desktop reports](../reports/perf-targets-2026-11-10/final-lighthouse/summary.json) score Accessibility/Best Practices 100; Performance 94–98. These scores and zero axe violations do not certify NVDA/VoiceOver behavior, all engines/devices, all zoom/text-size configurations or full WCAG AA. Human screen-reader testing remains unrecorded. No unresolved occurrence is silently dropped.
