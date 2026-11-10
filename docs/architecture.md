> **Implementation status notice (10 November 2026):** This v2.1 document preserves the original design/review evidence. The user subsequently expanded the application to Dashboard, Training runs, run details, Compare and Data quality. Current implemented behavior and freshly executed results are documented in [README](../README.md), [data contract](data-contract.md) and [evidence manifest](../reports/evidence-manifest.json). Historical witness results below are not application acceptance results.

# Soup Training Monitor — implementation architecture

**Version:** 2.1 · **Date:** 10 November 2026 · **Language:** English  
**Status:** proposed application architecture, with a small executed Node reference witness. **The React application, browser acceptance tests, performance trace and deployment do not yet exist in this package.**

Companions: [research.md](research.md), [review.md](review.md), [executed witness manifest](evidence/witness-manifest.json). English and Russian versions describe the same decisions.

## 1. Objective, scope and non-goals

Build a frontend that displays training metrics without silently hiding facts important to a person deciding whether to continue an expensive run. A chart is successful only if the shown values, missingness, provenance and current run identity are trustworthy.

### Assignment requirements

The supplied Frontend PDF requires 20 generated runs with `step`, `loss`, `lr`, `grad_norm`; deliberately broken values/order/gaps; one million-point run with a single middle spike; sortable/filterable list; three metric charts and summary cards; loading/empty/error; responsive layout, keyboard access and contrast. It also requires automated truthfulness evidence, CPU×4 first-render/zoom/hover traces, tab memory, before/after results, silent-failure analysis, deployment and a SHIP/DON’T SHIP verdict.

The invitation email cancels the live discussion. It does not remove the other deliverables or explain a new scoring allocation. The deadline remains 48 hours from receiving that email.

### Deliberate limits

No production backend, database, training execution, login, billing, GPU STOP endpoint or live training infrastructure. A controlled async mock exists to reproduce delayed/error responses. This is a frontend fixture system, not the Full-Stack task.

No mandatory comparison workspace, min/max bands or sophisticated anomaly classifier. No default smoothing. A warning reports an observed data issue, not a scientifically justified training-stop recommendation.

## 2. Decisions and responsibilities

| Area                  | Decision                                                        | Why                                                                 |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------- |
| Application           | React + TypeScript + Vite                                       | Small static frontend; explicit types and testable modules          |
| UI components         | A small set of shadcn/ui or equivalent components use uiarc.dev | Reuse controls, not an entire unrelated admin product               |
| Renderer              | uPlot; three independent instances                              | Narrow rendering responsibility; numeric X                          |
| Integration           | Small owned React adapter/hook                                  | Explicit lifecycle, viewport and redraw guards; wrapper is optional |
| Data ownership        | One active-run Web Worker                                       | Raw arrays remain off the main thread                               |
| Baseline sampler      | Exact visible-range scan + first/min/max/last                   | Simple reference implementation and oracle comparisons              |
| Optional acceleration | Block summaries / exact range index                             | Only after profiling and output-equivalence tests                   |
| Unit tests            | Vitest; deterministic/property cases                            | Validate transformations independently of rendering                 |
| Browser tests         | Playwright + `@axe-core/playwright`                             | Actual interactions, visuals, accessibility and races               |
| Performance           | Chromium CDP + Chrome Performance + Task Manager                | Trace and memory evidence with explicit scope                       |
| Deployment            | Static Vercel or GitHub Pages                                   | No cross-origin isolation needed for the baseline design            |

Pin actual package versions in a lockfile when implementing; do not interpret this table as a claim that a particular untested version combination works. No measured “uPlot is faster than ECharts” assertion is made. uPlot’s documented format and API motivate the adapter boundary. [S23] [S27] [S28]

## 3. End-to-end architecture

```text
Run manifest: 20 small descriptors, seeds, scenarios, generator version
                         |
                async RunRepository
             controlled delays/errors in tests
                         |
Main thread              |             Worker: active run/revision
-------------------------+-----------------------------------------
React state/controller   |    Generate four immutable Float64 columns
 runId / revision        |                       |
 viewSeq / hoverSeq      |    Validate X; stable order; group equal step
                         |                       |
 request viewport ------>|    Quality flags + per-metric valid segments
                         |       |                       |
                         |    raw summaries       direct scan / index
                         |       |                       |
 small response <--------|-------+------- RenderView + provenance
       |
       +--> Loss uPlot [xLoss, yLoss]
       +--> LR uPlot   [xLR, yLR]
       +--> Grad uPlot [xGrad, yGrad]
       +--> quality rail / source inspector / accessible tables
```

**Separation:** raw data answers what was recorded; normalization answers what can be ordered/interpreted; selection answers what must be represented in the current view; the renderer draws that representation. Summary and issue counts are not calculated from a reduced chart array.

## 4. Data model and ownership

### 4.1 Seeded generation

Store small run descriptors in source control, not a million-row JSON file. Each descriptor contains `runId`, `scenarioId`, unsigned seed, row count, generator version and optional expected cadence / source-updated timestamp.

Use a specified integer PRNG such as the included Mulberry32 implementation. Derive each run’s seed independently so run generation order does not change its values. Define injected anomaly coordinates explicitly. Avoid relying on engine-dependent transcendental rounding for byte-identical fixture expectations; compare such generated floats with a documented tolerance if introduced.

Generate the active run in the Worker. Build the small run-list summaries with the **same generator and normalization rules**, one run at a time, in a reproducible build script. Commit only the compact manifest, with seed, scenario and generator/normalizer versions; CI regenerates summaries and compares them to the manifest. Never invent summary cards independently of raw fixtures, and never keep all 20 full datasets resident. The one-million fixture has exactly one injected, unique central spike; other fixture variations are separate runs or test cases.

```ts
type Metric = "loss" | "lr" | "grad_norm";

type RawColumns = {
  step: Float64Array;
  loss: Float64Array;
  lr: Float64Array;
  grad_norm: Float64Array;
};

type RunIdentity = {
  runId: string;
  revision: string; // includes generatorVersion + seed + scenarioVersion
};

// The row position is the immutable sourceIndex; no million-row object array.
```

Four columns occupy `4 × 8 × 1_000_000 = 32_000_000` bytes, about `30.52 MiB`. That is only element storage. This arithmetic is also checked by the included witness. Float64 representation preserves non-finite numeric values without the JSON conversion to null. [S25] [S44]

### 4.2 Allocation ledger

Track `byteLength` by owned allocation, not by counting views of the same buffer twice. Extra memory may include a 4-byte-per-row ordering map, unique-step group boundaries/X values, representative indices, flags, segment boundaries and index nodes. A naive full set of these columns can add tens of megabytes; budget it explicitly rather than claiming a 32 MB app.

Avoid allocating objects such as `{step, loss, ...}` for every row. Keep issue details compact and produce human-readable records only for the inspected/paginated range. An identity ordering map can be omitted for already sorted data if the accessor supports both cases.

### 4.3 Worker protocol

```ts
type SessionIdentity = RunIdentity & {
  activationEpoch: number; // increments for every activation, including A -> B -> A
};

type ViewRequest = SessionIdentity & {
  kind: "view";
  viewSeq: number;
  xMin: number;
  xMax: number;
  chartWidthsCssPx: Record<Metric, number>;
  mode: "scan" | "indexed";
};

type InspectRequest = SessionIdentity & {
  kind: "inspect";
  viewSeq: number;
  hoverSeq: number;
  metric: Metric;
  targetStep: number;
};
```

Every response, **including errors**, echoes session identity and sequence fields. Accept it only if they still match the current controller. `activationEpoch` is allocated monotonically by the main-thread controller and never resets on returning to a run. This rejects an old A reply after A→B→A even when A has the **same revision** and local sequence numbers coincide. Increment `viewSeq` on range, size or relevant rendering-policy change; increment `hoverSeq` on inspection changes. Three charts are committed as one view transaction with their own measured plot widths. Cache keys include the relevant identity, range, widths and sampler-policy version; an old failure cannot replace a current success.

Raw stays Worker-owned. Transfer only newly produced, disposable render payload buffers; transferring a buffer detaches it from the sender. Never detach the sole raw store. [S42] Dispose the old revision or retain it in an explicitly bounded cache. No SharedArrayBuffer is needed.

Use **at most one in-flight view request plus one latest pending view in the main-thread controller**; do not post every wheel event and hope that a busy Worker can merge messages it has not read. Discard stale completed replies, then dispatch the latest pending request. Chunk long generation/index work with a yield to the task queue so messages can be processed; repeatedly awaiting an already-resolved promise is not a cancellation mechanism. Replacing/terminating an obsolete Worker is a simpler alternative on run replacement. Raw-buffer cleanup and error replies use the same activation guard. These are implementation requirements, not executed Worker evidence. The scheduling distinction follows the task/microtask model. [S45]

## 5. Normalization and data-quality policy

### 5.1 Preserve the source, normalize a view

Validate finite numeric X before ordering; invalid X cannot be plotted, so retain its raw row in an explicit structural-issue list. For valid X, sort source indices by `(step, sourceIndex)` and group equal steps. Do not mutate the raw arrays to make input appear clean.

Evaluate each metric independently within a step group:

| Group contents               | Canonical line value          | Source/quality handling                              |
| ---------------------------- | ----------------------------- | ---------------------------------------------------- |
| One finite observation       | The original value            | Retain sourceIndex                                   |
| Equal finite observations    | One representative            | Preserve count and all raw members                   |
| Only non-finite observations | No finite line value          | Preserve NaN/+Inf/−Inf type and count                |
| Different finite values      | No authoritative single value | Conflict range/points at the actual step; break line |
| Finite mixed with non-finite | No authoritative single value | Conflict plus invalid information; no silent winner  |

Numerically equal `0`/`-0` may share a visual value, but raw sign remains inspectable. Do not use `NaN === NaN` as an equality policy. Document the chosen numeric equality and deterministic representative tie rule.

A conflict in loss does not automatically invalidate LR at the same step. Quality summaries distinguish raw observation counts, unique-step counts and per-metric issue counts.

### 5.2 Segments and gaps

A valid line segment contains strictly ordered, unambiguous finite metric values and no known missing interval between adjacent points. NaN/Infinity, conflicts and **known-cadence** gaps terminate connectivity. Without expected cadence, sparse step numbers are not automatically lost events.

Retain break information independently of the selected finite points. A dropped null must never allow a line to bridge an invalid interval. Missing measurements do not require a fabricated “zero” or fake observed point. Drawing a straight connector between valid samples is a visual convention, not a claim that every intermediate X was measured; hover must not present interpolated values as raw.

### 5.3 Summary semantics

Cards use raw-domain facts, never downsampled values. Clearly separate:

- last recorded source event from highest numeric step;
- latest step status from the last earlier finite value;
- full-run summaries from viewport summaries;
- finite extrema from invalid/conflict counts.

When the highest step is invalid or conflicting, show that state as the primary latest status. A previous finite loss can be displayed only with its earlier step and qualification. Invalid-only data is “no finite measurements,” not zero loss or successful convergence.

## 6. Exact rendering contract

### 6.1 Viewport and buckets

Use numeric X: `scales.x.time = false`. Each metric chart gets its own aligned `[x, y]` arrays, satisfying unique ascending X and equal lengths. [S27]

The logical viewport is the inclusive interval `[a,b]`. Reject non-finite endpoints, an overflowing non-finite span `b-a`, reversed bounds and non-positive/non-finite widths at the request boundary. Index ranges are a separate domain: require safe integer indices `0 <= begin <= end <= N`. Validate the sampler mode even on empty data. Source X normalization remains a one-time precondition, not a hidden full-array scan on every zoom. Find raw/group bounds with lower/upper-bound searches. For bucket assignment, all interior buckets are left-inclusive/right-exclusive; the final bucket includes `b`. For `a === b`, perform a single-step data query and use a small **axis-only** padding for rendering, not invented observations.

Proposed resolution policy: `B = clamp(floor(plotWidthCssPx), 1, 2048)`. This is our tunable configuration, not a library fact. Test fractional widths and floating boundary arithmetic. Device-pixel ratio influences drawing/coordinates, not the interpretation of source X.

### 6.2 First/min/max/last, per segment

Within each bucket intersected with a valid segment, retain unique original indices for first, finite minimum, finite maximum and last. Sort them by actual step; break ties deterministically using sourceIndex. Never relocate extrema to the bucket midpoint and never replace an observation with an average labelled raw.

For clean data, this emits at most `4B` finite points before deduplication. With segment splits the bound contains additional work/output proportional to visible topology. **Do not enforce 4B by discarding break evidence.**

At close zoom, return all in-range observations permitted by the conflict policy. Re-query raw or an exact raw-derived index; never reduce an already reduced display as the source for a new zoom.

### 6.3 Invalid, conflicting and isolated values

The small renderer payload may use ordinary `(number | null)[]` for Y, because Float64Array has no null element. Keep the large raw columns typed. A non-finite observation contributes an actual-X break/issue, not a numeric point.

Known gaps without an observed null require explicit connectivity metadata. The uPlot adapter can refine `series.gaps`; preserve existing null-generated gaps and add known-gap ranges, with the coordinate units defined by the checked API. Its gap callback uses canvas-coordinate ranges, not arbitrary CSS-pixel values. [S28]

Draw markers for singleton valid segments and critical extrema. A one-point segment cannot rely on a connecting line being visible. For a one-observation view, do not assume an aligned one-element array is supported by the pinned renderer. A scaffold may use distinct axis-only X anchors with null Y around the actual observation; tag them as scaffold, exclude them from source/issue counts and the observation oracle, and never invent a second finite sample. Test this adapter path explicitly. Preserve both endpoints of a gap visually without connecting across it; test clipping at endpoint pixels.

Conflict observations cannot share duplicate X in the authoritative aligned line. Use a separate overlay/issue layer: actual-step finite min/max markers with original source IDs, accessible details for all members, and a break in the main line. If a unique extreme occurs in a conflict, it must remain represented in that layer.

### 6.4 Dense pathological inputs

Many alternating finite/invalid points can create O(N) segment boundaries. A fixed small connected polyline cannot faithfully encode arbitrary topology.

**Explicit fallback:** switch that metric to a labelled **disconnected extrema overview**: retain actual bucket extrema as points, draw no connecting path, show invalid/conflict counts and clustered issue locations, and preserve raw drill-down. Do not claim that every individual gap or sample is resolved at overview scale. If even the safe fallback cannot be produced, show a bounded error state and source inspection rather than a falsely complete line.

This protects finite extrema and avoids invented continuity, but it is a degraded mode that must be tested and disclosed. The required million-point single-spike fixture should normally stay on the ordinary line path.

### 6.5 Axes, clipping, hover and synchronized charts

Default Y bounds include finite visible extrema, including conflict overlays; apply a deterministic nonzero pad for constant series. No fixed bounds that silently clip the spike. An empty/all-invalid domain has an explicit state, not fake zero measurements.

Synchronize X range across the three charts, **not reduced point indices**. Each chart can select different X positions because its extrema differ. For the cursor, request raw inspection at a numeric step. Report the actual selected step and distance; when no observation is sufficiently close or the cursor is in a known gap, say so instead of inventing an interpolated observation.

An aggregate tooltip shows `bucket bounds`, `count`, `min/max` and source references, explicitly labelled aggregated. A raw tooltip shows sourceIndex, actual step and actual metric value. A source point and a bucket average are never interchangeable.

Coalesce pointer requests and reject stale hover responses. Do not rerun the million-row sampler on each pointer movement.

### 6.6 Renderer lifecycle and optional transformations

Create one chart instance per mounted metric component; update it, do not recreate it for every hover. Disconnect ResizeObserver/listeners, destroy instances and terminate obsolete work on cleanup. Exercise React StrictMode mount/unmount and zero-size-to-visible transitions.

Apply a returned view as one identity-consistent update. Guard programmatic range updates against recursive zoom events; hide or label an old revision until all displayed charts/cards agree.

Smoothing is **off/absent in the minimum implementation**. A test ensures raw values are not transformed. An optional future smoothed overlay must preserve original points and warnings. Log scale is optional and must be disabled with a reason when the selected metric’s domain includes zero/negative values; do not clamp them to epsilon. Neither option changes summaries.

## 7. Truthfulness invariants and why the sampler works

Let `R(V)` be the finite raw observations with valid X inside viewport V. Let `D(V)` be all represented original finite observations: line samples plus conflict/extremum markers. Break/issue records are not numeric observations.

**Invariants:**

1. Every `d ∈ D(V)` matches an actual raw `(sourceIndex, step, value)` and lies in V.
2. If `R(V)` is nonempty, `max D(V) = max R(V)` and `min D(V) = min R(V)`; conflict overlays are included.
3. The R05 injected spike is a **unique global maximum**, so every window containing it must retain its exact source identity; an excluded spike must never enter through a coarse summary. More generally retain first/min/max/last for every bucket–valid-segment intersection, with deterministic tie-breaking. This does **not** promise to retain every local peak when a larger peak lies in the same bucket. An arbitrary explicitly pinned anomaly would need an additional retained-source rule; that extension is not implemented.
4. No drawn connecting path crosses a declared break. Dense fallback has no connecting paths.
5. Invalids never become finite zeroes. Counts/types remain inspectable.
6. Display settings do not mutate raw data or whole-run facts.
7. Displayed run/revision/view identity matches the current controller.
8. The painted graph, axis transform and labels agree with the selected data contract.

**Selection argument:** any finite visible maximum belongs to a bucket/segment or conflict group. Keeping each such group’s maximum preserves the global maximum. Selecting actual original indices preserves coordinate provenance. The same argument applies to minima. Splitting before aggregation prevents one segment from overwriting another’s connectivity.

This argument does **not** prove that Canvas painted the marker, that every local oscillation survives, or that the source measurements describe a well-trained model. Those are separate concerns. Tests supplement the argument with adversarial input and actual rendered-output assertions.

## 8. Performance architecture: correct baseline before a faster index

### 8.1 Three distinct modes

| Mode                  | Meaning                                               | Use                                       |
| --------------------- | ----------------------------------------------------- | ----------------------------------------- |
| Negative controls     | Every-N / mean-as-source, deliberately incorrect      | Demonstrate that contracts detect defects |
| Correct scanner       | Binary-search range then scan visible values/segments | Baseline and independent reference        |
| Exact indexed sampler | Raw-derived range summaries plus exact boundaries     | Candidate optimization, after validation  |

Do not use an incorrect sampler as a supposedly equivalent fast/slow comparator. Keep renderer, data, viewport and validity policy the same when isolating sampler performance.

### 8.2 Direct scanner

After one-time normalization, query approximately costs `O(log N + V + B + K)`, where V is visible observations, B buckets and K visible topology/issue work. The million-point overview scans a million values; narrow zoom scans a smaller range.

The included witness intentionally uses a simple allocation-heavy implementation for inspectability. It is not the final production scanner or a browser benchmark.

### 8.3 Optional compact block index

Proposed starting point: fixed-size leaf blocks of 256 normalized groups, with typed-array summaries and a hierarchy above them. Store source references to extrema, counts and boundary flags, not only min/max values detached from X.

For each viewport bucket:

1. Convert its exact numeric X interval into group-index bounds.
2. Identify valid-segment intersections and conflicts through a separate topology index.
3. Combine summaries only for fully contained ranges.
4. Scan partial leaf boundaries or descend to finer nodes.
5. Recover actual first/min/max/last source references and merge in step order.

Never use a node extending outside a bucket/window as its exact answer. This is the offscreen-spike failure case.

A conservative bound for this simple design includes `O((B + K)(log N + L))` query work plus emitted output, where L is leaf size; actual complexity depends on topology traversal and reuse. For regular aligned clean views, work can approach a width-dependent amount, but **unconditional O(pixels) is not promised**.

Build once per immutable revision, invalidate on revision change, and include build time/memory in cold-load measurements. Differentially compare results to the scanner across boundaries, irregular X, invalids and conflicts. Do not compare only `max`; compare provenance and break semantics too.

The witness contains a **different per-sample exact range tree** to check the range-query idea. It is not evidence that the proposed compact block implementation exists or has the predicted speed.

### 8.4 Five million points

The same separation can scale conceptually: raw retention, compact index and width-limited view. Four raw Float64 columns alone would be 160,000,000 bytes. That arithmetic is not a memory/performance approval for a target device. Five-million-point browser execution remains untested; if needed, measure memory first and consider bounded server/chunked storage outside this frontend scope.

“Lose nothing” means retaining source access, not reconstructing every oscillation from a few thousand display points.

## 9. Controlled asynchronous behavior

`RunRepository` returns small descriptors/revisions through an async interface. Production demo latency may be simulated, but it must be labelled demo data. Tests use deferred response gates rather than flaky sleep-only schedules. Playwright network routing is available for HTTP-style mocks; a directly injected repository is also acceptable. [S38]

Required sequences:

| Scenario                    | Controlled resolution order           | Required state                                      |
| --------------------------- | ------------------------------------- | --------------------------------------------------- |
| A→B→C                       | C, then A, then B                     | Only C’s data/cards/axes/errors remain              |
| A→B→A, same or new revision | Current A, then previous-activation A | Only current activation epoch/revision remains      |
| Same run, two zooms         | New zoom before old zoom              | Only newest viewport is committed                   |
| Two hover requests          | Latest resolves first                 | Old tooltip cannot overwrite it                     |
| Abort ignored by mock       | Old request still resolves            | Identity guard still rejects it                     |
| Old request fails late      | Current success, then old error       | No stale error replaces the current view            |
| Resize during zoom          | New width/view reply, then old reply  | All charts use the current view and measured widths |
| Refresh fails               | Old same-run data still exists        | Explicit stale/error state, not “fresh success”     |

Use AbortController to save work where supported **and** identity checks for correctness. `sourceUpdatedAt` and `fetchedAt` are different. Freeze the test clock and label fixture timestamps; a static seeded run is not a real live feed.

## 10. Minimal user-facing product

**Run list:** name/scenario, row count, latest step status, qualified finite loss, quality counts and source age. Sorting uses raw numeric data and an explicit invalid-last policy. Filtering never mutates datasets. Empty search results differ from no runs and from a load error.

**Run page:** three metric charts, shared numeric range controls, reset, source inspector, status/summary cards, quality panel and visible aggregation mode. Range controls and inspector must work without dragging or hovering.

**State model:** loading, ready, refreshing, stale, empty, error and degraded quality are distinct. Never display an old run’s chart under a new run title. An error in one chart is not silently labelled empty success.

**Accessibility alternative:** concise textual extrema/latest/quality summary and paginated or selected-range raw rows with keyboard navigation. Do not put one million DOM rows on the page. Use semantic headings, named controls and visible focus; do not encode severity only with color.

## 11. Accessibility, contrast, locale and timezone

### 11.1 Automated and manual access checks

Add `@axe-core/playwright` for both routes, important error/empty states, 320px width and supported themes. Save violations **and incomplete/manual-review findings**. Do not suppress contrast checks merely to get a green result. [S30]

Save a Lighthouse HTML/JSON report and screenshot from the production build, recording browser/configuration. A score alone does not cover manual checks or establish full conformance. [S41]

Use design-token tests for ordinary text contrast (4.5:1), qualifying large text (3:1), and meaningful graphical/control boundaries (3:1 against relevant adjacent colors), applying the documented exceptions correctly. Check actual canvas stroke/fill configurations as well as DOM tokens. [S39] [S40]

Manual acceptance: keyboard-only run selection, zoom-in/out/reset and precise range entry; inspect an anomaly and a raw row without mouse; focus remains predictable after navigation; a screen reader can obtain the core chart facts. Axe cannot certify the visual meaning of every Canvas mark.

### 11.2 Number and date rules

Numeric source values never pass through localized strings to drive calculations. Use Intl formatting at the presentation boundary. Verify known expected tokens/values independently, not just “formatter equals itself.” German separators, Russian non-breaking spaces and decimal commas require deliberate assertions. [S37] [S43]

Use sufficient significant digits for small learning rates; `0.0001` must not display as an authoritative `0.00`. A compact axis label can be approximate if its full value is available and no ambiguity is concealed.

Test `en-US`, `de-DE`, `ru-RU` and explicit timezone contexts. Changing timezone cannot change X=`step`. Timestamp tests use one fixed UTC instant and explicit displayed zone; stale age uses a frozen clock. Do not confuse locale punctuation with a change in underlying value.

## 12. Automated acceptance matrix

**Status key:** “witness” means limited coverage by the included Node example, not the final app test. Every final Vitest/browser test remains to be implemented and run.

| ID  | Contract                                                                         | Current evidence                                        |
| --- | -------------------------------------------------------------------------------- | ------------------------------------------------------- |
| T01 | Exactly 20 descriptors and four fields                                           | Pending                                                 |
| T02 | 1M rows, deterministic raw columns, one injected spike                           | Witness for one fixture                                 |
| T03 | Exact spike source identity at full view                                         | Witness                                                 |
| T04 | In/out-of-window, edge and bucket-boundary spike rules                           | Witness                                                 |
| T05 | Width changes preserve selected extrema                                          | Witness; not pixels                                     |
| T06 | NaN/+Inf/−Inf remain invalid, never zero                                         | Witness                                                 |
| T07 | Invalid adjacency preserves segment breaks and isolated spike                    | Witness; renderer pending                               |
| T08 | Identical duplicates retain provenance/count                                     | Pending                                                 |
| T09 | Conflicting duplicates retain extrema and no silent winner                       | Pending                                                 |
| T10 | Stable numeric sort and invalid-X quarantine                                     | Pending                                                 |
| T11 | Known-cadence gap vs legitimate sparse steps                                     | Witness checks explicit break only                      |
| T12 | Axis/cards/tooltip numeric provenance and formatting                             | Pending                                                 |
| T13 | Default Y range contains raw/conflict extrema                                    | Pending                                                 |
| T14 | Log mode rejects nonpositive domain without coercion                             | Pending                                                 |
| T15 | No hidden smoothing; optional overlay cannot replace raw                         | Pending                                                 |
| T16 | Seed/generator determinism                                                       | Witness                                                 |
| T17 | Empty/all-invalid/single-step domains                                            | Witness for data queries                                |
| T18 | Seeded irregular-X/property cases                                                | Witness; expand for normalization                       |
| T19 | Indexed query equals independent scan                                            | Witness for per-sample index only                       |
| T20 | Latest invalid/conflict is not replaced by healthy-looking old value             | Pending                                                 |
| T21 | Buffer ownership, revision invalidation and bounded caches                       | Pending                                                 |
| T22 | Activation/run/view/hover guards, including stale errors and same-revision A→B→A | Pending                                                 |
| T23 | Fabricated high peak rejected, not merely `>= spike`                             | Witness invokes the actual provenance assertion         |
| T24 | Same suite fails on specified negative controls                                  | Executed; exact failure IDs and assertion types checked |
| T25 | First/min/max/last for every bucket and segment; limits of local-peak retention  | Expanded witness; not Canvas evidence                   |
| T26 | Invalid modes/viewports/index bounds rejected, even for empty data               | Witness; two old-code regressions recorded              |
| T27 | Raw columns unchanged; deterministic tie identity                                | Witness                                                 |

| ID  | Browser acceptance                    | Required evidence                                                                   |
| --- | ------------------------------------- | ----------------------------------------------------------------------------------- |
| E01 | Sort/filter/navigation                | Correct source-based values and route                                               |
| E02 | Loading/empty/error/degraded states   | Distinct visible and accessible states                                              |
| E03 | All controlled async races from §9    | Final identity, all three charts/cards and errors                                   |
| E04 | Stale/refresh error behavior          | Frozen-clock age and source/fetch distinction                                       |
| E05 | Actual spike stroke/marker and breaks | Render contract plus Canvas visual assertions                                       |
| E06 | Keyboard-only flow                    | Named controls, focus, no drag-only functionality                                   |
| E07 | 320/768/desktop and DPR variation     | No hidden/clipped extrema or inaccessible controls                                  |
| E08 | Locale/timezone scenarios             | Numeric semantics unchanged; expected text tokens                                   |
| E09 | Render failure/resize                 | Error visible, not fake empty-success chart                                         |
| E10 | Axe                                   | Saved result; applicable required violations resolved; incomplete findings reviewed |
| E11 | Contrast/Canvas/manual access         | Token assertions plus recorded manual checks                                        |
| E12 | Lifecycle                             | No duplicate charts/listeners; cleanup works                                        |
| E13 | Production CPU×4 interactions         | Chrome trace and measured first render/zoom/hover                                   |
| E14 | Memory and repeated run switches      | Scoped counters, Task Manager, allocation ledger                                    |

### Visual assertions must be capable of detecting a broken renderer

A correct `RenderView` plus a DOM warning is insufficient. Test a known marker/line location with the actual axis transform, screenshot or targeted pixel region; inspect narrow/high-DPR cases. Include a test-only fault that suppresses drawing while leaving data and warnings intact: the visual assertion must fail. Record browser/font/DPR because pixel snapshots are environment-sensitive.

The reference-code suite proves no Canvas result. Its raw green/red logs must not be renamed “Playwright results.”

## 13. Performance and memory measurement protocol

### 13.1 Reproducible environment

Use production builds, the same browser version/hardware, viewport/DPR, dataset revision and scripted interactions. Record commit, package lock hash, OS/CPU, Node/browser versions, seed, mode and throttling configuration. Define any acceptance targets **before** measuring; Soup specifies required measurements but no numeric latency threshold.

Separate cold generation/normalization/index/first paint from warm zoom/hover. Use at least a documented repeated sequence, report sample count and p50/p95 rather than one favorable run. Keep tracing overhead and cache/warmup treatment consistent. Report slower results and index-build regressions.

### 13.2 Tracing recipe

On Chromium, open a CDP session, enable Performance metrics, set `Emulation.setCPUThrottlingRate({rate: 4})`, and capture using `browser.startTracing(page, {path, screenshots: true})`; stop in a finally block. The result is a Chromium trace for DevTools, distinct from Playwright context tracing. [S31] [S35] [S36]

Add app marks for request start, data ready, normalization done, index ready, view returned, chart draw and inspector update. A draw callback or double requestAnimationFrame is a timing aid, **not proof that a user-visible pixel was painted**; inspect the trace’s rendering/paint activity. Start tracing before the action being measured.

Do not automatically assume main-target CPU throttling slows every Worker execution by the same factor. Verify coverage with the chosen Chromium version and trace; report main-thread versus Worker coverage or limitations. Do not label an unthrottled preprocessing benchmark “CPU×4 end-to-end.”

### 13.3 Memory: separate metrics, explicit scopes

| Measure                                      | How                                                                 | What not to claim                                          |
| -------------------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------- |
| Main target JS heap                          | CDP Performance `JSHeapUsedSize`                                    | Not total tab/Worker/GPU memory                            |
| Isolate heap/backing storage where supported | Runtime.getHeapUsage; record field support and target               | Do not sum overlapping measures as unique total            |
| Worker numeric buffers                       | Explicit owned `byteLength` ledger; optional Worker-target counters | Not all Worker runtime memory                              |
| Browser process/tab evidence                 | Chrome Task Manager screenshot, memory footprint and JS columns     | Shared/process costs are not perfectly isolated per object |
| Growth/leak signal                           | Repeated run switches and settled snapshots                         | One flat reading does not prove no leaks                   |

The Runtime protocol identifies separate heap/backing-storage fields; Chrome Task Manager distinguishes footprint from JavaScript memory. [S32] [S34] Attach Worker targets for extra counters only where supported, and state missing coverage.

`measureUserAgentSpecificMemory` is optional and requires the documented isolation/security conditions. We do not add COOP/COEP or SharedArrayBuffer solely to make it available. Thus baseline deployment does not depend on whether a host permits custom headers. [S33]

Measure without silently forcing GC in one variant but not the other. If explicit GC is used for a diagnostic, label that separate experiment.

### 13.4 Required result table — unmeasured until the app exists

| Metric                                             | Correct scan baseline | Correct indexed candidate | Status  |
| -------------------------------------------------- | --------------------- | ------------------------- | ------- |
| Cold first meaningful render, CPU×4 scope recorded | Not measured          | Not measured              | Pending |
| Normalization/index build                          | Not measured          | Not measured              | Pending |
| Zoom response p50/p95 and sample count             | Not measured          | Not measured              | Pending |
| Hover response p50/p95 and sample count            | Not measured          | Not measured              | Pending |
| Main JS heap / backing / Worker ledger             | Not measured          | Not measured              | Pending |
| Task Manager footprint evidence                    | Not measured          | Not measured              | Pending |
| Long tasks / visible rendering issues              | Not measured          | Not measured              | Pending |

The Node witness durations are **not substitutes** for any row above. If the indexed candidate is not built, document the actual optimization compared (e.g. full scan vs visible-range scan) and do not rename the measured change.

## 14. Twenty-run fixture plan

All runs expose the four required columns. Loading/empty/error mocks are additional tests, not replacements for these twenty.

| ID  | Scenario                                         |
| --- | ------------------------------------------------ |
| R01 | Clean fast convergence                           |
| R02 | Clean slow convergence                           |
| R03 | Noisy improvement                                |
| R04 | Sustained divergence                             |
| R05 | 1,000,000 samples; one unique central loss spike |
| R06 | NaN in loss                                      |
| R07 | Positive infinity in loss                        |
| R08 | Negative infinity in loss                        |
| R09 | Identical duplicate step groups                  |
| R10 | Conflicting duplicate step groups                |
| R11 | Unsorted source arrival                          |
| R12 | Missing steps with explicit expected cadence     |
| R13 | Zero loss, including latest value                |
| R14 | Plateau without an automatic STOP claim          |
| R15 | Small learning rates and schedule changes        |
| R16 | Grad-norm spike                                  |
| R17 | Multiple independent metric issues               |
| R18 | Sparse observations with cadence unspecified     |
| R19 | A single observation / singleton rendering       |
| R20 | Old source-updated metadata / stale fixture      |

Adversarial test-only variants add NaN on both sides of a spike, offscreen extrema, invalid X, many alternating gaps and same-step finite/non-finite conflict. Do not inject extra spikes into R05 merely to make a different test convenient.

## 15. Proposed repository structure

```text
src/
  app/                    # routes, state controller, identity guards
  data/                   # manifest, seed PRNG, scenario definitions
  core/                   # columns, ordering, groups, segments, raw oracle
  sampling/               # correct scan, optional exact block index
  worker/                 # ownership, requests, coalescing, small payloads
  charts/                 # uPlot adapter, gaps, markers, range/cursor sync
  features/runs/          # list, filters, detail, cards, quality/inspector
  formatting/             # Intl boundary and numeric/date contracts
  tests/                  # Vitest contracts + test-only negative controls
 e2e/                     # Playwright UI, visual, race, locale, axe tests
 scripts/                 # repeatable perf/negative-control runners
 docs/en/                 # architecture, research, review
 docs/ru/                 # equivalent Russian documents
 reports/                 # actual outputs only, with metadata manifest
 public/                  # no million-row JSON dump
 README.md
```

The files in this package are documents and `evidence/` witness code; the tree above is a **target layout**, not a claim that those modules have been implemented.

## 16. Delivery sequence and honest release decision

**P0:** deterministic source and normalization; correct scanner; actual uPlot spike/gap rendering; three charts, list/cards/states; controlled races; keyboard/contrast/locale; unit/browser evidence; production measurements and deployment.

**Conditional P1:** exact block index when profiling shows a meaningful need. **Optional P2:** bands, comparisons, smoothing, exports and richer anomaly interpretation. Do not implement these at the expense of required proof.

Submit repository + deployed link, actual tests/raw output, Chrome trace/screenshots, before/after measurements and a separate ≤2-page note containing verdict, first fix, surprises/concerns and factual AI disclosure. This long architecture is supporting material, not the two-page note.

**DON’T SHIP** when any required truth contract fails, measurements are missing, identity races remain, or the interface cannot be operated as required. **SHIP with stated limitations** is a candidate only after the implemented app passes the chosen gates and measured limits are acceptable. Current package status: **design reviewed; reference algorithm partly tested; application release not assessed**.

## 17. Limits and current evidence

The expanded Node witness has **25 passing tests** for its correct mode. Every-N passes 11/fails 14; mean-as-source passes 12/fails 13. The archived v2 sampler run against the same expanded suite passes 23/fails 2 (W19, W21), demonstrating the two validation defects fixed in v2.1. The runner checks expected named assertion failures and rejects unexpected failures/crashes/skips; it does not treat any nonzero exit as evidence of useful tests. It assumes sorted unique finite X; it does not implement the app’s duplicate pipeline, uPlot adapter, browser Worker, accessibility or deployment. Read its manifest and raw logs before reusing results.

The original v2 source/logs are preserved in `evidence/v2-original/`; current outputs and source hashes are in the current witness manifest. These red/green results are correctness experiments, not performance before/after. The original source audit is carried forward; the separate `source-checks-v2.1.json` records only the sources actually reopened in this pass.

No test proves the ML logger told the truth, the model will converge, every browser paints identically, or any $500 run should be stopped. Our narrower promise is to preserve and expose source facts under an explicitly tested frontend presentation contract.

[S23]: https://github.com/leeoniya/uPlot "uPlot — performance, non-features, gap/band support"
[S25]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify "MDN — JSON.stringify and non-finite numbers"
[S27]: https://github.com/leeoniya/uPlot/blob/master/docs/README.md "uPlot — aligned data format"
[S28]: https://raw.githubusercontent.com/leeoniya/uPlot/master/dist/uPlot.d.ts "uPlot — public TypeScript API, gaps and coordinate units"
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
