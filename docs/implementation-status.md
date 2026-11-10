# Acceptance status — 11 November 2026

The five screens and 20 deterministic demo snapshots are implemented. Frozen application/test snapshot: `408d27bdc6b0baf2c2136927ba5774dbac799a60`. Build, lint,109 unit tests and 131 Chromium tests pass; no skipped, flaky, unexpected tests or test retries in the accepted run. Manifest regeneration covers all 20 runs. [Evidence manifest](../reports/evidence-manifest.json) supplies actual hashes and the final publication verdict.

The common readout is visible on wide screens, with full text-bound/clipping checks and both RAF callbacks retained. Explicit layout ownership replaces global body:has; text nodes are reused; microtasks coalesce source writes; Pin uses the row actually displayed. Raw metrics, extrema, invalid values, gaps and identity guards remain intact.

Expanded limits remain unmet for cold meaningful render, detail hover on entry, compare hover on entry, compare continuous hover. Stable sub-50 ms hover is not established. The demo is delivered with these measured limits; no 100/100 grade is asserted.

30 axe audits report zero violations. All 484 current contrast incomplete occurrences have pixel dispositions; the original 516 remain separately archived. Lighthouse Performance 95–97, Accessibility/Best Practices 100. Browser evidence is not human assistive-technology certification. [Accessibility review](accessibility-review.md).

A real interrupted-drag listener leak was fixed. Current-source retained-object, MemoryInfra, native process-memory and boundary checks are recorded. Memory remains scoped; no universal leak-freedom or flat private-memory claim is made. [Memory investigation](memory-investigation.md).

[GitHub](https://github.com/Feruum/SoupTask) and the separate [production project](https://soup-training-monitor.vercel.app) are the delivery targets. Exact remote-byte and route smoke results are in the deployment record. There is no backend, live telemetry, smoothing, log scale, training control or invented GPU telemetry. Original live-discussion scoring/cancellation email was not verified; no 100/100 grade is claimed.

The author designed the architecture and data pipeline, made the key engineering decisions and reviewed the code. AI helped implement and fix code, develop tests and independent oracles, run automated browser checks, collect traces and measurements, and research implementation options. Human NVDA/VoiceOver testing was not recorded. The author sends the submission email personally.
