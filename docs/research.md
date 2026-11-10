> **Implementation status notice (10 November 2026):** This v2.1 document preserves the original design/review evidence. The user subsequently expanded the application to Dashboard, Training runs, run details, Compare and Data quality. Current implemented behavior and freshly executed results are documented in [README](../README.md), [data contract](data-contract.md) and [evidence manifest](../reports/evidence-manifest.json). Historical witness results below are not application acceptance results.

# Soup Training Monitor — research and evidence audit

**Version:** 2.1 · **Reviewed:** 10 November 2026 · **Language:** English  
**Purpose:** explain the problem-solving approaches studied, the evidence behind them, and what we will adopt. This is not a completed take-home submission or a benchmark report.

Read [review.md](review.md) for corrections to v1 and [architecture.md](architecture.md) for the implementation contract. The original S01–S26 identifiers are retained so every old claim can be traced.

## 1. Research question and evidence levels

The Soup brief asks whether a person could trust a training chart when deciding whether to stop a $500 run. Its concrete hazards include an isolated spike in one million samples, non-finite values, duplicate/unsorted steps, missing observations, stale results, misleading formatting and smoothing.

The central question is therefore: **what information may the display discard, and what must remain provably observable?** A fast renderer does not answer this question by itself.

Evidence is labelled as follows:

| Level | Meaning |
|---|---|
| Assignment | Explicit requirement in the supplied Frontend PDF or invitation email |
| Documented | A successfully read official document/source describes the behavior |
| Vendor claim | Product marketing describes a property; not independently tested here |
| Historical | An issue/release documents a past event; not necessarily current behavior |
| Proposed | Our design or inference; not a claim about a vendor implementation |
| Executed witness | The included standalone Node code was actually run |
| Pending | Application behavior, browser measurements or tests not yet executed |

Public documentation establishes intended behavior, not the correctness of every product version. Mutable `latest`/`master` URLs are not pinned release evidence. Pin dependencies and record commit hashes when implementing. Failed retrieval means **not verified in this review**, not “false.”

## 2. What products actually contribute

### 2.1 Neptune: show dispersion, not only an average

The documentation describes interval aggregation with an average and min/max band, finer detail on zoom, and interpolation for some empty intervals. [S01] [S02]

**Our lesson:** preserve extrema and distinguish aggregated views from observations. **Our departure:** do not manufacture measured points in gaps. A band is an observed range, not a statistical confidence interval. For the first uPlot implementation, an actual-coordinate first/min/max/last line is simpler than a band; the underlying principle survives that change.

### 2.2 Weights & Biases: full fidelity is a product promise to verify

The Models page advertises full-fidelity visibility of spikes. The old missing-points issue provides historical context. The exact “Server 0.84, August 2026” assertion was not cleanly confirmed from the release body obtained in this review, so it is removed. [S03] [S04] [S05]

**Our lesson:** define our own mathematical and rendered-output contracts; neither a product label nor a release number proves them. We do not infer W&B’s proprietary sampling algorithm.

### 2.3 Comet: storing every value is not displaying every value

The retrieved documentation distinguishes complete metric assets from sampled built-in charts. It states a 15,000-value per-metric/per-experiment threshold for the documented sampling path; the logging guide notes configurable on-premises behavior. [S06] [S07] [S08]

**Our lesson:** keep raw data and display data separate. The raw inspector must reach actual observations even when the plot is reduced. We do not adopt a 15,000-point cap, or claim the documented threshold applies to every deployment indefinitely.

### 2.4 TensorBoard: bounded random sampling has a different contract

Its HTTP API describes data that **may** be reservoir-sampled, while retaining the latest item. This is not a statement about every current TensorBoard chart configuration. [S09]

**Our inference:** a non-mandatory middle point can be absent from a bounded random sample. Therefore that mechanism alone cannot guarantee inclusion of Soup’s isolated middle spike. The method is not “bad”; it is insufficient for our particular invariant.

### 2.5 ClearML: smoothing and source visibility are separate decisions

The official documentation source describes smoothing controls, Show Originals, and different iteration/time axes. [S10]

**Our lesson:** source values remain primary. For the minimum implementation, omit smoothing rather than add an untested transformation. A future smoothed overlay must be labelled and must not replace raw extrema, summaries or warnings.

### 2.6 Grafana, Datadog and Highcharts: resolution has semantics

Grafana connects maximum data points to panel width and data-source aggregation; its time-series options expose null handling. Datadog documents different rollup aggregators. Highcharts exposes grouping approximations rather than a single universal meaning of a bucket. [S11] [S12] [S13] [S15] [S16]

**Our lesson:** resizing, aggregation choice and gap policy are correctness inputs, not cosmetic settings. A maximum answers a different question from an average. We test narrow screens and preserve original X coordinates. The specific Datadog monitor-trigger statement from v1 is excluded because S14 was not successfully read.

### 2.7 Aim and MLflow: provenance is a separate part of trust

Aim documents comparison/aggregation options, including outlier controls; MLflow documents run provenance and experiment artifacts. Neither retrieved source establishes our precise isolated-spike guarantee. [S17] [S18]

**Our lesson:** keep seed, generator version, run identity and sample provenance. Do not silently remove outliers or confuse comparison features with proof of chart fidelity.

### 2.8 SageMaker and Lightning: stop conditions need a defined objective

SageMaker’s tuning decisions concern objective values and trials; Lightning’s EarlyStopping implementation exposes explicit monitoring/stopping parameters. [S19] [S20] [S22]

**Our conclusion:** our frontend can state observed facts and support investigation, but it should not claim a reliable automated STOP decision from one spike and three supplied metrics. Ray/ASHA details are not reaffirmed here because the relevant pages could not be retrieved. [S21]

## 3. Renderer decision: uPlot, with a narrow responsibility

Use **uPlot for three independent numeric-X charts**. Its aligned format shares X within an instance; this does not force all three charts to have identical reduced X arrays. Built-in aggregation is not part of its role. [S23] [S27]

The architecture supplies already-validated, viewport-specific points. A small adapter handles lifecycle, ranges, gaps, markers and cursor inspection. Bands are optional. We are choosing a suitable implementation boundary, **not claiming a measured performance victory over ECharts**.

The inspected ECharts line-series source defaults `progressive` to zero with a disabling comment. Our earlier generic claim that progressive rendering is a ready-made advantage for these line charts was too broad. This does not mean no ECharts series supports progressive rendering. [S29]

Plotly/WebGL claims from v1 are not used to justify the decision because S24 was not successfully read. Another renderer remains possible, but changing it cannot replace the data contracts or tests. [S24]

## 4. What we learned beyond vendor documentation

These are **our deductions and design choices**, not claims that vendors implement the same design.

1. **Retention, selection and perception are different guarantees.** A raw spike can exist in storage, survive the sampler, and still disappear visually because a single point is not drawn or the Y scale clips it.
2. **First/min/max/last is a selection rule, not lossless compression.** It retains selected extrema and boundaries, not every oscillation. Keep raw observations and support closer inspection.
3. **Topology matters.** NaN, conflicting duplicate steps and known gaps divide the line into valid segments. Four points per bucket is only a clean-segment bound.
4. **A wrong maximum can pass a weak test.** `displayMax >= spikeValue` accepts a fabricated higher value. Verify exact source identity and equality to an independent raw-range oracle.
5. **Faster queries need exact boundaries.** A summary node containing an offscreen spike cannot be reused wholesale for a window that excludes it.
6. **The output size has a lower bound.** Arbitrarily many alternating gaps cannot all be expressed in a fixed number of connected line points. Degrade explicitly to a disconnected overview, rather than secretly bridge errors.
7. **Async identity is part of visual truth.** Run, revision, viewport and hover responses all require stale-result rejection.
8. **A truthful performance comparison preserves semantics.** Compare a correct scanner to a correct indexed query engine. Incorrect samplers belong to negative-control experiments, not to a headline speedup claim.

## 5. Re-audit of all original sources S01–S26

The table below preserves the **v2 source-audit results**. V2.1 does not claim to have reopened all 44 references again. Its separate selective check is recorded in [source-checks-v2.1.json](evidence/source-checks-v2.1.json). Replacement sources are official and their URLs appear in the references and machine-readable audit. Unverified entries are retained for traceability, not cited as supporting evidence.

| ID | Status | Review result |
|---|---|---|
| [S01] | Confirmed | Mean and min/max rendering, finer detail on zoom; empty-range interpolation is also documented. |
| [S02] | Confirmed | Min/max bands are observed ranges; do not relabel as confidence intervals. |
| [S03] | Partial; exact claim removed | The release listing and indexed excerpts were inconsistent. The exact 0.84 / August 2026 claim is removed; no claim that this release does not exist. |
| [S04] | Vendor claim | Full-fidelity spike visibility is a vendor claim; no internal sampling algorithm is inferred. |
| [S05] | Historical record | A historical issue and maintainer follow-up; not proof of a current bug in every version. |
| [S06] | Confirmed | Full-history compressed CSV and sampled built-in charts are distinct representations. |
| [S07] | Confirmed | The retrieved documentation states 15,000 values per metric per experiment before downsampling. Scope to that documentation, not all configurations forever. |
| [S08] | Confirmed | Reservoir sampling is documented; on-premises settings can be adjusted. |
| [S09] | Confirmed | The HTTP API says values may be reservoir-sampled and the latest is retained. Do not generalize to every current TensorBoard renderer. |
| [S10] | Official replacement read | The site fetch was blocked; the official documentation repository was read instead. Smoothing / Show Originals / axis semantics confirmed. |
| [S11] | Confirmed | Max-data-points depends on panel width; aggregation is data-source dependent. |
| [S12] | Confirmed | Null-connection and axis settings are documented. They are choices, not guarantees of truthful defaults. |
| [S13] | Official replacement read | The site response format could not be read; official source Markdown confirms avg/min/max rollups. |
| [S14] | Not reverified | The metric-monitor page could not be read in this pass. The specific monitor-trigger statement is not retained as verified. |
| [S15] | Confirmed | Pixel-width data grouping and configurable approximation are documented. |
| [S16] | Official replacement read | The original spline page failed; the official equivalent line-series approximation page was read. |
| [S17] | Confirmed | Explorer comparison / aggregation / outlier settings confirmed; no proof of a particular spike-preserving renderer. |
| [S18] | Confirmed | Tracking provenance is documented; no isolated-spike rendering guarantee established. |
| [S19] | Confirmed | Early stopping concerns tuning trials and a defined objective, not an arbitrary single loss spike. |
| [S20] | Confirmed | Tuning completion criteria are documented; they are outside the frontend implementation scope. |
| [S21] | Not reverified | Ray pages returned rate-limit/fetch failures. ASHA details are omitted from the newly verified findings. |
| [S22] | Official replacement read | The API page failed; the official EarlyStopping source confirms explicit monitor / patience / finite / divergence settings. |
| [S23] | Confirmed | Canvas rendering and absent built-in aggregation confirmed. Vendor benchmark numbers are not our app measurements. |
| [S24] | Not reverified | The Plotly page was not successfully read. Its performance / WebGL-limit claims are excluded from the verified comparison. |
| [S25] | Confirmed | Non-finite numbers stringify to null; raw generation avoids this transport ambiguity. |
| [S26] | Confirmed | Chrome Performance workflow checked. No Soup browser trace has been recorded. |

The full original and replacement URLs, status labels and notes are in [source-audit.json](evidence/source-audit.json). Keeping a failed link in the audit does not make its old assertion verified.

## 6. Additional implementation evidence checked

| Subject | Checked primary source | Consequence for our plan |
|---|---|---|
| uPlot data and gap API | [S27] [S28] | Separate chart arrays; preserve gaps and coordinate units |
| ECharts line defaults | [S29] | Remove the overbroad progressive-rendering comparison |
| Automated accessibility | [S30] [S41] | Add axe plus a saved Lighthouse report; still test manually |
| Memory observability | [S31] [S32] [S33] [S34] | Report target/scopes; JS heap is not total tab memory |
| Chrome trace and throttling | [S35] [S36] | Use a Chromium performance trace, not only Playwright’s test trace |
| Locale and controlled requests | [S37] [S38] [S43] | Deterministic race tests and locale-aware output |
| Meaningful contrast | [S39] [S40] | Test text and graphics separately |
| Worker ownership | [S42] [S44] | Retain raw buffers in one owner; transfer only disposable payloads |

## 7. Executed evidence added during this review

A small standalone Node witness is included; it is **not the finished application**.

| Algorithm used by the same suite | Tests | Passed | Failed | Process exit |
|---|---:|---:|---:|---:|
| Segment-aware first/min/max/last, v2.1 | 25 | 25 | 0 | 0 |
| Every-N selection negative control | 25 | 11 | 14 | 1 |
| Mean-as-observed-point negative control | 25 | 12 | 13 | 1 |
| Archived v2 sampler on the expanded suite | 25 | 23 | 2 | 1 |

Reproduce from this package root:

```bash
node docs/evidence/run-witness.mjs
```

The runner saves genuine test output and a manifest with Node/platform, source/log hashes and exit codes. A zero runner exit means the correct implementation passed, each negative control failed the **expected named assertion tests**, and the archived v2 code reproduced precisely W19/W21. Unexpected failures, crashes, timeouts, skips or missing reports fail the runner. Individual expected-failing test processes still return nonzero. The original 18-test outputs are preserved under `evidence/v2-original/`.

The witness checks one million rows, deterministic four-column generation, original coordinate provenance, viewport/bucket edges, offscreen spikes, isolated NaN-adjacent spikes, negative troughs, non-finite values, a known gap, empty ranges, selected-point ordering, seeded irregular-X cases and an independent range-index query oracle. V2.1 also checks both extrema and first/last within each bucket–segment intersection, deterministic ties, source immutability, invalid query bounds/modes and an explicit counterexample to preserving every local peak.

**Limits:** sorted unique finite X is a precondition; duplicate normalization is not implemented. The witness’s per-sample tree is not the proposed compact block index. It allocates temporary structures and is not production-optimized. It runs neither uPlot nor Workers in a browser. These are Node tests, not the planned Vitest/Playwright acceptance suite. LTTB was not implemented or tested. Log durations are runner output, **not frontend performance measurements**.

## 8. Conclusions and remaining unknowns

**Chosen:** raw data ownership in a Worker; three uPlot charts; segment-aware first/min/max/last selection; exact source inspection; strict async identity; correctness-first baseline; indexed optimization only with measured need and differential tests.

**Rejected as sufficient:** average-only display, random/every-N selection, a warning card instead of a rendered spike, a generic “full fidelity” label, JS heap alone as tab memory, a Lighthouse score alone as accessibility proof.

**Still pending:** browser adapter, React UI, duplicate/conflict rendering, axe results, Lighthouse output, actual Canvas assertions, CPU×4 browser traces, per-target memory evidence, production deployment and the final SHIP verdict. These documents do not claim those tasks were completed.

The long research and architecture belong in `docs/`. Soup’s separate submission note must still be no more than two pages. Describe actual AI assistance and actual human checks; do not copy prospective verification steps as completed work.

## 9. Second-pass findings specific to v2.1

The main rendering decision stands. This pass found narrower defects rather than a reason to switch libraries:

- **Evidence gap:** the v2 randomized helper asserted the visible maximum, not the minimum or every bucket’s four-point contract. The new exhaustive interval-based oracle and minimum assertion strengthen coverage; this was a test weakness, not an observed loss of a valid point in the correct sampler.
- **Executed defects:** the old range index accepted NaN/fractional query bounds; an empty input bypassed sampler-mode validation. Expanded tests fail on the archived code and pass after validation fixes. These are public-boundary robustness defects, not proof that the standard 1M fixture was wrong.
- **Overbroad guarantee:** first/min/max/last does not preserve every local peak; W22 demonstrates this with two unequal peaks in one bucket. The required injected R05 spike is a unique global maximum, which fits the proven contract.
- **Design hardening, not executed app evidence:** monotonic activation epochs cover same-revision A→B→A; stale errors get guards too; coalescing occurs before dispatch to a busy Worker; list summaries derive from the same fixture logic. Task-queue vs microtask behavior informs the scheduling proposal. [S45]

Only selected technical sources were reopened: Neptune rendering, Comet Total Fidelity, uPlot format/API, ECharts line defaults, Playwright accessibility/tracing, Chrome memory diagnostics, and the MDN task/microtask guide. Their public pages support the scoped descriptions; no vendor application was benchmarked. The source-check JSON distinguishes this pass from the inherited v2 audit.

[S01]: https://docs.neptune.ai/smoothing "Neptune — Smoothing and rendering/downsampling"
[S02]: https://docs.neptune.ai/error_bands "Neptune — Min/Max error bands"
[S03]: https://github.com/wandb/server/releases "W&B Server releases (Full Fidelity Band/Line and bug fixes)"
[S04]: https://site.wandb.ai/models/ "W&B Models full-fidelity feature"
[S05]: https://github.com/wandb/wandb/issues/4177 "W&B — Missing chart datapoints issue and full-fidelity response"
[S06]: https://www.comet.com/docs/v2/guides/experiment-management/total-fidelity/ "Comet — Total fidelity metrics"
[S07]: https://www.comet.com/docs/v2/guides/experiment-management/limits-and-performance/ "Comet — Limits and performance"
[S08]: https://www.comet.com/docs/v2/guides/experiment-management/log-data/metrics-and-parameters/ "Comet — Metrics logging and reservoir sampling"
[S09]: https://github.com/tensorflow/tensorboard/blob/master/tensorboard/http_api.md "TensorBoard — HTTP API and reservoir sampling"
[S10]: https://github.com/clearml/clearml-docs/blob/main/docs/webapp/webapp_exp_track_visual.md "ClearML — Scalar charts, data zoom and Show Originals"
[S11]: https://grafana.com/docs/grafana/latest/visualizations/panels-visualizations/query-transform-data/ "Grafana — Query options and Max data points"
[S12]: https://grafana.com/docs/grafana/latest/visualizations/panels-visualizations/visualizations/time-series/ "Grafana — Time-series null/gap/axis behavior"
[S13]: https://raw.githubusercontent.com/DataDog/documentation/master/content/en/dashboards/functions/rollup.md "Datadog — Rollup aggregators"
[S14]: https://docs.datadoghq.com/monitors/types/metric/ "Datadog — Metric monitors and max thresholds"
[S15]: https://www.highcharts.com/docs/stock/data-grouping "Highcharts Stock — Data grouping"
[S16]: https://api.highcharts.com/highstock/series.line.dataGrouping.approximation "Highcharts — Grouping approximation options"
[S17]: https://aimstack.readthedocs.io/en/latest/ui/pages/explorers.html "Aim — Metrics Explorer"
[S18]: https://mlflow.org/docs/latest/ml/tracking/ "MLflow — Tracking"
[S19]: https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-early-stopping.html "AWS SageMaker — Stop training jobs early"
[S20]: https://docs.aws.amazon.com/sagemaker/latest/dg/automatic-model-tuning-progress.html "AWS SageMaker — Tuning completion criteria"
[S21]: https://docs.ray.io/en/latest/tune/getting-started.html "Ray Tune — ASHA and early stopping"
[S22]: https://github.com/Lightning-AI/pytorch-lightning/blob/master/src/lightning/pytorch/callbacks/early_stopping.py "Lightning — EarlyStopping callback"
[S23]: https://github.com/leeoniya/uPlot "uPlot — performance, non-features, gap/band support"
[S24]: https://plotly.com/python/performance/ "Plotly — high-performance charts and WebGL limits"
[S25]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify "MDN — JSON.stringify and non-finite numbers"
[S26]: https://developer.chrome.com/docs/devtools/performance "Chrome DevTools — Performance and 4× CPU throttling"
[S27]: https://github.com/leeoniya/uPlot/blob/master/docs/README.md "uPlot — aligned data format"
[S28]: https://raw.githubusercontent.com/leeoniya/uPlot/master/dist/uPlot.d.ts "uPlot — public TypeScript API, gaps and coordinate units"
[S29]: https://raw.githubusercontent.com/apache/echarts/master/src/chart/line/LineSeries.ts "ECharts — LineSeries implementation and progressive default"
[S30]: https://playwright.dev/docs/accessibility-testing "Playwright — accessibility testing and axe"
[S31]: https://chromedevtools.github.io/devtools-protocol/tot/Performance/ "Chrome DevTools Protocol — Performance domain"
[S32]: https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/pdl/js_protocol.pdl "Chrome DevTools Protocol — Runtime.getHeapUsage schema"
[S33]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/measureUserAgentSpecificMemory "MDN — measureUserAgentSpecificMemory"
[S34]: https://developer.chrome.com/docs/devtools/memory-problems "Chrome DevTools — memory diagnostics and Task Manager"
[S35]: https://playwright.dev/docs/api/class-browser#browser-start-tracing "Playwright — browser.startTracing"
[S36]: https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/pdl/domains/Emulation.pdl "Chrome DevTools Protocol — CPU throttling"
[S37]: https://playwright.dev/docs/emulation "Playwright — locale and timezone emulation"
[S38]: https://playwright.dev/docs/mock "Playwright — network mocking"
[S39]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html "WCAG 2.2 — text contrast"
[S40]: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html "WCAG 2.2 — non-text contrast"
[S41]: https://developer.chrome.com/docs/lighthouse/accessibility/scoring "Lighthouse — accessibility scoring limits"
[S42]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects "MDN — transferable objects and detached buffers"
[S43]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts "MDN — Intl.NumberFormat.formatToParts"
[S44]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array "MDN — Float64Array"

[S45]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth "MDN — event loops, tasks and microtasks"
