<p align="center">
  <img src="assets/soup-logo.svg" width="48" height="48" alt="Soup logo" />
</p>

<h1 align="center">Soup Training Monitor</h1>

<p align="center">
  Training experiments, original measurements, and a little Kazakh warmth.
</p>

<p align="center">
  <a href="https://soup-training-monitor.vercel.app"><img src="assets/readme/soup-icons/soup-open.png" width="24" height="24" alt="" /> Live demo</a> ·
  <a href="#quick-start"><img src="assets/readme/soup-icons/soup-start.png" width="24" height="24" alt="" /> Quick start</a> ·
  <a href="#the-interface"><img src="assets/readme/soup-icons/soup-monitor.png" width="24" height="24" alt="" /> Screenshots</a> ·
  <a href="docs/engineering-notes.md"><img src="assets/readme/soup-icons/soup-recipe.png" width="24" height="24" alt="" /> Engineering notes</a>
</p>

![Soup pixel-art cover: a sorpa bowl, copper ladle and recipe with Kazakh ornament](assets/readme/soup-cover.png)

A frontend experiment monitor for exploring **20 seeded training snapshots**, comparing runs, and tracing chart values back to their original source. Dark and light themes, keyboard alternatives, and a phone layout are included.

**Demo data only.** Recorded statuses do not represent live training. The app does not execute or automatically stop a run.

## <img src="assets/readme/soup-icons/soup-monitor.png" width="32" height="32" alt="" /> The interface

One selected experiment. One primary metric. Source evidence within reach.

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/readme/monitor-light.png" />
  <source media="(prefers-color-scheme: dark)" srcset="assets/readme/monitor-dark.png" />
  <img src="assets/readme/monitor-dark.png" alt="Soup Monitor with a run navigator, four source summaries and a genuine Loss chart showing its recorded spike" width="1440" />
</picture>

[View dark theme](assets/readme/monitor-dark.png) · [View light theme](assets/readme/monitor-light.png)

These are screenshots of the running application from the recorded release checks. The illustrated cover is separate brand artwork.

<details>
<summary><img src="assets/readme/soup-icons/soup-phone.png" width="24" height="24" alt="" /> Phone layout</summary>

The run chooser folds away, facts reflow into pairs, and persistent navigation remains within reach. Numeric controls provide an alternative to chart gestures.

<p align="center">
  <img src="assets/readme/monitor-mobile.png" alt="The real Soup Monitor at 320 px, with a collapsed run chooser, complete numeric facts and a touch-friendly chart" width="280" />
</p>

</details>

<details>
<summary>Training runs, comparison, and data quality</summary>

### Training runs

Search, filter and sort snapshots; preview a run or select two to four for comparison.

![Training runs with status, source quality and selection controls](assets/readme/training-runs.png)

### Compare

Inspect runs on their original step coordinates, with one shared original-source table and whole-run facts.

![Four training runs with genuine Loss curves and all three original source metrics visible in the shared table](assets/readme/compare.png)

### Data quality

Inspect invalid observations, conflicting duplicates, ordering and missing intervals without silently converting them into valid measurements.

![Data quality matrix and source issue ledger](assets/readme/data-quality.png)

</details>

## A small recipe for trustworthy charts

| <img src="assets/soup-piala.png" width="150" alt="Pixel-art sorpa bowl with Kazakh ornament" /> | <img src="assets/soup-recipe.png" width="150" alt="Pixel-art recipe sheet" /> | <img src="assets/soup-ladle.png" width="150" alt="Pixel-art copper ladle" /> |
| :---: | :---: | :---: |
| **Keep the source** | **Know the recipe** | **Inspect the detail** |
| Immutable measurements stay in a Web Worker. | Seeded fixtures make scenarios reproducible. | Chart readouts lead to exact source observations. |

The same illustration family appears in the app's loading, empty-search, run-information and clean-findings states. The original Soup logo and restrained pixel ornament connect the interface to its Kazakh visual identity. [Asset provenance and prompts](assets/README.md).

- **A visible peak:** the million-row fixture contains one unique Loss maximum, value **100** at step **500,001**. The chart retains its original coordinate.
- **Explicit uncertainty:** NaN, Infinity, conflicts and gaps remain visible as data-quality facts. They never become invented zeros.
- **Direct source inspection:** enter a recorded step with the keyboard, inspect an original observation, or open a revision-bound source link.
- **Calmer exploration:** Monitor is the default; Experiment map and Groups are separate views. Run and metric selection survive Back and refresh.
- **Purposeful interaction:** modest control transitions respect reduced motion. Metric values and graphs do not receive decorative interpolation.

## <img src="assets/readme/soup-icons/soup-start.png" width="32" height="32" alt="" /> Quick start

Use **Node 24.22.1 or newer within 24.x** and **npm 11+**. Keep the committed `package-lock.json`.

```bash
npm ci
npm run dev
```

Open [localhost:5173/dashboard](http://127.0.0.1:5173/dashboard).

To build and preview:

```bash
npm run build
npm run preview
```

The production preview uses [localhost:4173](http://127.0.0.1:4173). Vite fails when the configured port is occupied.

## <img src="assets/readme/soup-icons/soup-layers.png" width="32" height="32" alt="" /> Explore the workspace

| Screen | Route | What you can do |
| --- | --- | --- |
| Monitor | `/dashboard` | Search runs, choose a metric, adjust the range, inspect source values and open history. |
| Experiment map | `/dashboard?view=map` | Select a run and metric through the map, arrow keys or native selectors; inspect the accessible quality table. |
| Groups | `/dashboard?view=groups` | Explore model/method groups and return to the selected run's monitor. |
| Training runs | `/runs` | Search, filter, sort, preview and select comparison runs. |
| Run detail | `/runs/:runId` | Inspect all three metrics, quality, original source rows and run information. |
| Compare | `/compare?runs=kazakh-sft-005,kazakh-sft-006` | Compare two to four snapshots on their raw step coordinates. |
| Data quality | `/data-quality` | Review the workspace matrix and a filtered source issue ledger. |

Wheel or pinch zooms; Shift+wheel pans; dragging selects a range. Numeric range fields and Reset are keyboard alternatives. On phones, tap to inspect and swipe vertically to scroll. Legends highlight series without deleting source data.

## <img src="assets/readme/soup-icons/soup-code.png" width="32" height="32" alt="" /> Built with

| Layer | Choice |
| --- | --- |
| <img src="assets/readme/soup-icons/soup-code.png" width="28" height="28" alt="" /> App | React 19, TypeScript, Vite, React Router SPA |
| <img src="assets/readme/soup-icons/soup-palette.png" width="28" height="28" alt="" /> Interface | Arc UI Free, Lucide, shared CSS theme and Tailwind tooling |
| <img src="assets/readme/soup-icons/soup-chart.png" width="28" height="28" alt="" /> Charts | uPlot with an owned React lifecycle adapter |
| <img src="assets/readme/soup-icons/soup-data.png" width="28" height="28" alt="" /> Data | Module Web Worker, immutable source columns, exact range pipeline |
| <img src="assets/readme/soup-icons/soup-motion.png" width="28" height="28" alt="" /> Motion | Motion and CSS, respecting reduced motion |
| <img src="assets/readme/soup-icons/soup-check.png" width="28" height="28" alt="" /> Verification | Vitest, Playwright, axe, source oracles and Canvas pixel checks |

Raw arrays stay in the Worker. The chart receives a reduced view with original coordinates and provenance. Whole-run summaries come from source data, rather than the reduced chart array. Smoothing and log scale are absent. [Read the data contract](docs/data-contract.md).

## <img src="assets/readme/soup-icons/soup-check.png" width="32" height="32" alt="" /> Verification

```bash
npm run lint
npm test
npm run data:check
npm run test:negative
npx playwright install chromium
npm run build
npm run test:e2e
node scripts/canvas-controls.mjs
```

Playwright starts its own production preview. Keep port **4173** free. Vitest reads unit tests under `src/`; Playwright reads browser tests under `e2e/`.

<!-- release-evidence:start -->
The 11 November 2026 accepted run records **109 unit tests and 131 Chromium tests**, without skips, unexpected/flaky cases or retries. Source/build hashes and earlier failures remain in the [evidence manifest](reports/evidence-manifest.json).

| Evidence | Record |
|---|---|
| Unit/oracles | [109 passes](reports/memory-investigation-2026-11-10/release-final-v2/final-unit.json) |
| Browser acceptance | [131 passes](reports/memory-investigation-2026-11-10/release-final-v2/final-browser/results.json) |
| Actual visible source values | [Two-RAF/cell confirmation](reports/memory-investigation-2026-11-10/release-final-v2/visible-latency.json) |
| Accessibility | [Fresh484 pixel dispositions](reports/memory-investigation-2026-11-10/release-final-v2/final-contrast/ledger.json) |
| Memory | [Retaining chains](reports/memory-investigation-2026-11-10/release-final-v2/final-roundtrip/retainer-analysis.json), [native process counters](reports/memory-investigation-2026-11-10/release-final-v2/final-memory/results.json) |
| Publication | [Direct routes and exact served bytes](reports/deployment.json) |
| Design review | [Impeccable technical audit](reports/memory-investigation-2026-11-10/release-final-v2/impeccable-final-review.md) |

**Expanded limits remain unmet for cold meaningful render, detail hover on entry, compare hover on entry, compare continuous hover. Stable sub-50 ms hover is not established. The demo is delivered with these measured limits; no 100/100 grade is asserted.** Earlier offscreen-readout timings do not prove readable on-screen values. The final criterion keeps current source DOM before both RAF callbacks and validates actual text geometry. Raw R05 storage is32,000,000 bytes; heap, owned buffers and native process memory are distinct, non-additive scopes. A real interrupted-drag listener leak and oversized raster cost were corrected; universal leak freedom is not claimed.

[Measurements](docs/performance-results.md) · [Acceptance map](docs/acceptance-matrix.md) · [Memory investigation](docs/memory-investigation.md)

<details>
<summary><img src="assets/readme/soup-icons/soup-recipe.png" width="24" height="24" alt="" /> Architecture, delivery and further reading</summary>

- [Architecture v2.1](docs/architecture.md), [research](docs/research.md) and [review](docs/review.md) preserve the original decisions and historical witness evidence.
- [Engineering notes](docs/engineering-notes.md) retain the detailed data pipeline, benchmark commands, memory methodology, trace restoration, Lighthouse setup and deployment workflow previously in the main README.
- [Submission note](output/pdf/soup-submission-note.pdf) records executed evidence, measured limits and AI assistance.
- [Scaffold README](docs/scaffold-readme.md) preserves the initial foundation documentation.
- [README image sources](assets/readme/README.md) identify real application captures and the generated cover.

The app uses static SPA routing on Vercel. There is no backend, database, authentication or training execution. GPU telemetry, live logs, artifacts, import/export and automatic stopping are not implemented.

The author designed the architecture and data pipeline, made key engineering decisions and reviewed the code. AI helped write and fix code, develop tests, run automated checks and measurements, and research implementation options. Original-source oracles and saved failures document the checks applied to generated work. Generated artwork is identified in the asset provenance.

[Git dates and measured-source history](docs/git-history.md) distinguish the author's reported 19:00 evening-session start and requested 20:00 first-commit date from unchanged actual measurement timestamps.

</details>

<p align="center">
  <img src="assets/kazakh-ornament.png" width="170" alt="Kazakh ram-horn pixel ornament" />
  <br />
  <sub>BUILT IN KAZAKHSTAN</sub>
</p>
