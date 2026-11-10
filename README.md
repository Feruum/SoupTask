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
  <img src="assets/readme/monitor-mobile.png" alt="The real Soup Monitor at 320px, with a collapsed run chooser, complete numeric facts and a touch-friendly chart" width="280" />
</p>

</details>

<details>
<summary>Training runs, comparison, and data quality</summary>

### Training runs

Search, filter and sort snapshots; preview a run or select two to four for comparison.

![Training runs with status, source quality and selection controls](assets/readme/training-runs.png)

### Compare

Inspect runs on their original step coordinates, with one shared original-source table and whole-run facts.

![Two training runs compared using genuine metric charts](assets/readme/compare.png)

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

The latest recorded release checks on **10 November 2026** contain **106 passing unit tests** and **113 passing Chromium tests**, with no skipped or flaky cases in that browser run. These are archived results, not a claim that tests were rerun while editing this README.

| Evidence | Record |
| --- | --- |
| Unit results | [106 passing tests](reports/perf-targets-2026-11-10/final-unit.json) |
| Release browser results | [113 passing tests](reports/perf-targets-2026-11-10/final-browser/results.json) |
| Evidence index | [Manifest, scope and hashes](reports/evidence-manifest.json) |
| Deployment | [Direct-route and source verification](reports/deployment.json) |
| Accessibility | [Review notes](docs/accessibility-review.md) |
| Design review | [Final Impeccable review](reports/perf-targets-2026-11-10/impeccable-final-review.md) |

Checks include source identity, the actual painted spike and gap, controlled races, gestures, keyboard access, responsive layouts, themes and axe. Passing tests do not certify scientific logger truth, every browser, every local oscillation or a real training-stop decision.

<details>
<summary><img src="assets/readme/soup-icons/soup-chart.png" width="24" height="24" alt="" /> Performance results and honest limits</summary>

The million-row fixture contains four Float64 source columns totaling **32,000,000 bytes**. Indexes, payloads, heaps and browser process memory are additional scopes.

Two same-source full Chrome trace runs meet all targets. Worst detail/Compare hover p95 is **40.6 / 48.6 ms**; cold is **2531.9 ms** and detail/Compare zoom is **114.8 / 131.4 ms**. Samples are not pooled; the no-trace regime is separate. CPU4 applies to the main renderer; Workers rejected throttling. Hover evidence includes pointer input through committed source DOM and a frame opportunity, not physical display presentation.

The latest headless million-row process sample recorded **145.9 MiB private committed** and **245.6 MiB working set**, growing to **319.5 / 588.7 MiB** after 20 transitions. This is an explicit longer-session concern; no memory-saving or leak-freedom claim is made. Raw buffers, JS heap and process memory must not be added together as one total.

[Measurements and methodology](docs/performance-results.md) · [Full engineering notes](docs/engineering-notes.md) · [Acceptance status](docs/implementation-status.md)

</details>

<details>
<summary><img src="assets/readme/soup-icons/soup-recipe.png" width="24" height="24" alt="" /> Architecture, delivery and further reading</summary>

- [Architecture v2.1](docs/architecture.md), [research](docs/research.md) and [review](docs/review.md) preserve the original decisions and historical witness evidence.
- [Engineering notes](docs/engineering-notes.md) retain the detailed data pipeline, benchmark commands, memory methodology, trace restoration, Lighthouse setup and deployment workflow previously in the main README.
- [Submission note](output/pdf/soup-submission-note.pdf) records executed evidence, measured limits and AI assistance.
- [Scaffold README](docs/scaffold-readme.md) preserves the initial foundation documentation.
- [README image sources](assets/readme/README.md) identify real application captures and the generated cover.

The app uses static SPA routing on Vercel. There is no backend, database, authentication or training execution. GPU telemetry, live logs, artifacts, import/export and automatic stopping are not implemented.

AI assisted design, implementation and verification. Original-source oracles and saved failures document the checks applied to generated work.

</details>

<p align="center">
  <img src="assets/kazakh-ornament.png" width="170" alt="Kazakh ram-horn pixel ornament" />
  <br />
  <sub>BUILT IN KAZAKHSTAN</sub>
</p>
