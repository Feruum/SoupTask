> **Implementation status notice (10 November 2026):** This v2.1 document preserves the original design/review evidence. The user subsequently expanded the application to Dashboard, Training runs, run details, Compare and Data quality. Current implemented behavior and freshly executed results are documented in [README](../README.md), [data contract](data-contract.md) and [evidence manifest](../reports/evidence-manifest.json). Historical witness results below are not application acceptance results.

# Soup Frontend — complete review and change log

**Version:** 2.1 · **Date:** 10 November 2026  
**Reviewed:** v2 RU/EN documents and packaged source/logs, with the original assignment/email and user review as context. Historical v1 corrections below are retained; §8 records this additional v2.1 pass. This review distinguishes defects in v1 from new improvements and from claims requiring qualification.

## 1. Verdict

The v1 direction was useful: retain raw data, preserve extrema, test silent failures and measure honestly. However, it was **not implementation-ready**. Several contracts were ambiguous, accessibility evidence was incomplete, and some sources were labelled verified more confidently than this new audit supports.

Retain **uPlot**, but simplify the product: three independently sampled metric charts; actual-coordinate first/min/max/last lines; explicit data-quality boundaries; no required bands, automatic STOP recommendations or elaborate ML anomaly detector. First implement a correct scanning sampler. Introduce an exact index only if measurements justify its complexity.

The review package is not a SHIP verdict on a finished app. It contains a design plus an executed standalone algorithm witness.

## 2. Response to every supplied review point

### Point 2 — common X and the rendering contract: accept with a correction

In the aligned uPlot format, series within **one instance** share X. The three metric charts need not share the same reduced X array. [S27]

**Change:** each chart receives `[steps, values]`; synchronize the numeric viewport and cursor step, not reduced array indices. Select first/min/max/last in original step order. Bands are optional.

**Further constraint:** at most four points applies per bucket **and valid segment**, not to a bucket crossing arbitrary NaN/gap/conflict boundaries. Keep segment breaks and singleton-point markers. Otherwise the simplification can create a false continuous line or hide an isolated spike.

### Point 3 — automated accessibility: accept, expand beyond one scan

Axe integration is missing from v1’s test plan. Add `@axe-core/playwright` and save the report. A Lighthouse HTML/JSON report and screenshot are additional evidence, not proof of complete accessibility. Automated tools explicitly have limitations. [S30] [S41]

**Change:** scan the list and run page, important states, narrow width and each supported theme. Add keyboard-only zoom/reset/range editing and a textual chart alternative. Test meaningful graphic contrast separately; a Canvas plot is not fully understood by a DOM audit.

### Point 4 — memory and tracing: accept, correct measurement scope

The proposed CDP/Task Manager path is practical, but `JSHeapUsedSize` must not be labelled “tab memory.” Task Manager distinguishes OS memory footprint from JavaScript heap; CDP metrics have target/isolate scope. [S31] [S32] [S34]

**Change:** report main-target heap, raw/index/payload buffer accounting, available Worker measurements, and Task Manager memory-footprint evidence separately. Record unsupported fields explicitly. The cross-origin-isolated memory API is optional, not a deployment prerequisite. [S33]

`browser.startTracing` creates a Chromium performance trace; Playwright context tracing serves a different testing purpose. Apply CPU×4 through CDP and verify/document its coverage, particularly when work is in a Worker. [S35] [S36]

**Precision about v1:** it did not prescribe `measureUserAgentSpecificMemory`; its actual defect was an underspecified memory protocol. We should not invent a previous API error.

### Point 5 — tests must fail on bad implementations: accept, but separate evidence

Add deliberately broken every-N and mean-as-source samplers; run the **same** contracts and save genuine failed output. This tests whether the suite can detect specific defects.

**Correction:** negative-control failures are not the required performance before/after. For speed, compare a correct direct scanner with a correct indexed implementation on equivalent outputs.

Do not promise that LTTB fails a basic isolated-spike fixture; that depends on the signal, parameters and implementation. It has not been tested in the attached witness. A meaningful adversarial case must be constructed and run before claiming failure.

### Point 6 — T04: accept and strengthen

`max(display) >= spikeValue` is too weak: an invented higher peak passes. Require:

- exact identity `(sourceIndex, step, value)` for the intended in-range spike;
- equality of finite displayed and raw visible maxima/minima, with an explicit conflict policy;
- absence of an offscreen spike from the in-window display;
- original coordinates, strict X ordering and no synthetic source-labelled values;
- separate actual-render tests so a correct array cannot mask an invisible Canvas point.

Cover left/right viewport edges, bucket boundaries, narrow/single-step windows, NaN on either side, negative troughs, resize and device-pixel-ratio changes. A finite test set is evidence, not proof for every real-valued viewport; the algorithm argument and property cases supplement it.

### Point 7 — seeded Worker data and controlled network: accept with memory qualification

Four Float64 columns at one million rows occupy exactly **32,000,000 bytes ≈ 30.52 MiB** of element storage, not the whole application. Sorting maps, group/segment indices, temporary allocations, charts and Worker runtime are extra. [S44]

**Change:** deterministic seed + generator version; generate on demand inside the Worker; keep raw there; return small viewport payloads. Transfer detaches transferred buffers, so never transfer the canonical raw store away accidentally. [S42]

Use a controlled asynchronous repository/mock transport for A→B→C races. Include late Worker responses and A→B→A with different revisions, not only fetch cancellation. HTTP delays are a test fixture, not a new backend requirement.

### Point 8 — hierarchical min/max optimization: accept as conditional P1

The idea is sound, but “a pyramid gives O(pixels)” is not a universal exact-query bound. Window edges can split summary nodes, X can be irregular, and many segment boundaries add work.

**Change:** correctness baseline scans the visible raw range; optional optimized path uses exact range summaries plus raw boundary refinement. State a conservative complexity bound including buckets, tree lookup and boundary/segment work. Differentially test both paths. Include build time and index memory in cold-load results.

A coarse node must not import an offscreen spike. No O(width) representation preserves all information in arbitrary five-million-point input; preserve raw and recover detail on demand.

### Point 9 — locale and timezone: accept

`step` remains a numeric count. Locale affects presentation only; timestamps are separate metadata. Use de-DE, ru-RU and an English locale, plus explicit timezone contexts. [S37] [S43]

**Change:** test thousands separators, decimal commas, small learning rates and non-breaking spaces without parsing displayed text back to numeric source values. Test metadata timestamps independently. Freeze the clock in stale-data tests.

## 3. Source and framing corrections

**In v2, all old S01–S26 were revisited; that audit is preserved.** V2.1 selectively reopens technical sources and records its narrower scope separately. Research v2 records confirmed, partial, historical and unverified outcomes. The W&B exact release/date claim is removed; Comet’s documented 15,000 threshold is retained with scope. Official replacement sources were used for ClearML, Datadog rollup, Highcharts approximation and Lightning. The separate Datadog monitor claim, Ray details and Plotly performance claims are not reasserted as verified.

The EN v1 §2 listed NestJS under “not required”; it did not claim the PDF demanded it. Remove the unnecessary name to avoid cross-task noise. The frontend needs no new backend, database or production training infrastructure.

The earlier ECharts comparison overstated progressive rendering for line charts: the inspected line-series source has a disabled default. There is no app benchmark proving uPlot faster. [S29]

The old RU and EN baseline descriptions were not fully equivalent. V2 now uses the same named, semantically correct baseline and optimized candidate in both languages.

## 4. Additional defects and design risks found

| Risk | Why it matters | V2 decision |
|---|---|---|
| Contradictory duplicate steps | Silent last-write-wins can hide a peak | Preserve all rows; conflict range/markers; break the authoritative line |
| Isolated valid point between errors | A line renderer may paint no visible segment | Explicit original-point marker |
| Missing topology after sampling | A null that was discarded can reconnect distant values | Carry break metadata independently of chosen finite points |
| Different sample indices across metrics | Index-based cursor sync selects different original steps | Sync by numeric step; inspect raw separately |
| Warning-only proof | A warning may be correct while the plotted line is wrong | Check data, drawn geometry/pixels and labels separately |
| Summary from reduced arrays | Cards may change with window width | Compute summaries from the canonical source domain |
| Late zoom/hover Worker responses | Right run but wrong window/value can overwrite the UI | `activationEpoch + runId + revision + viewSeq + hoverSeq` guards |
| Unbounded issue objects | Millions of errors can cost more than the numeric columns | Compact flags/runs; paginated inspection; disclosed dense-data mode |
| Optional features crowd out evidence | Bands/smoothing/comparisons increase scope | First ship the required contract and tests, not extras |
| Rendering all points is called “lossless” | A finite canvas cannot resolve all samples | Distinguish storage fidelity from display fidelity |

## 5. Actual work completed in this review

The standalone witness was run on Node v22.16.0, Linux x64:

| Mode | Pass / fail | Exit | Evidence |
|---|---:|---:|---|
| first/min/max/last v2.1 | 25 / 0 | 0 | [green output](evidence/firstminmax-pass.txt) |
| every-N negative control | 11 / 14 | 1 | [red output](evidence/nth-expected-fail.txt) |
| mean negative control | 12 / 13 | 1 | [red output](evidence/mean-expected-fail.txt) |

The archived v2 sampler also ran on the expanded suite: **23 passed / 2 failed**, specifically W19 and W21. See [regression-before output](evidence/v2-regression-before.txt). The runner accepts only expected named assertion failures, not an arbitrary crash. Original v2 source and 18-test logs remain in `../evidence/v2-original/`.

The runner and manifest are in `../evidence/`. These outputs support the stated reference-code properties only. No browser, axe, Lighthouse, deployment or application performance result is fabricated or marked completed.

## 6. Implementation order and release gate

1. Implement generator, raw ownership, normalization and the independent oracle.
2. Implement the correct scanner, segment boundaries and duplicate/conflict policy.
3. Connect one uPlot chart and prove a NaN-adjacent spike is actually drawn; then add the other two.
4. Add list/cards/states, request guards, keyboard controls, accessible raw inspection and locale tests.
5. Run the mandatory browser evidence, then decide whether the index is needed.
6. Run differential tests and before/after measurements; deploy; write the separate ≤2-page note.

**Do not ship** if a peak is hidden or invented, a gap is silently bridged, an invalid/conflicting latest reading appears healthy, or stale async work overwrites the current view. Missing required evidence also blocks an unconditional SHIP decision. The reviewed architecture reduces risk; it does not certify an unbuilt application.

## 7. Honest AI disclosure for this stage

Actually performed by the assistant in this review: read the existing documents, checked primary sources with recorded retrieval limits, revised the design, wrote a standalone reference implementation and executed its Node tests, including negative controls. The user supplied a substantial review that changed the plan.

Not established: that Madi personally ran the code, inspected Chrome pixels, measured memory or checked the deployment. Those checks must be done and recorded before they can appear in a submission as personal verification. Previous AI overstatements are documented above rather than concealed.

## 8. Additional review before Drive upload — v2.1

### Findings and disposition

| Finding | Evidence | Change / remaining boundary |
|---|---|---|
| Randomized oracle verified only global maximum | Source inspection of old `prove`; W16 extends coverage | Check minimum and each bucket/segment’s first/min/max/last with a separate interval oracle |
| Invalid range-index bounds accepted | W19 fails on archived v2 | Require safe integer bounded indices; current witness passes |
| Empty input hid an unknown sampler mode | W21 fails on archived v2 | Validate mode first; reject overflowing viewport span too |
| Negative runner could accept the wrong failure | Old runner only required exit 1 and some failures | Require exact test IDs, assertion failure count, full test total and no skips/crashes |
| “Any known spike” exceeded the selector guarantee | W22 is an explicit counterexample with a smaller local peak | Guarantee bucket/segment extrema and R05’s unique global spike; raw remains available |
| Same-revision A→B→A was not explicitly scoped | Design review, not an executed browser bug | Add monotonic activationEpoch and guards on success/error responses |
| Worker-only request merging may process stale queued work | Design review plus task/microtask semantics [S45] | One in-flight request and latest pending request before dispatch; actual Worker test pending |
| List summaries could diverge from raw fixtures | Design ambiguity, not an observed app defect | Same generator/normalizer for compact manifest; regeneration check planned |

The original v2 18-test outcomes were reproduced before changes. The expanded 25-test suite then reproduced two validation defects in the old source and passed after the fixes. No React or renderer behavior is claimed to be newly implemented.

### Source and package verification scope

A selective primary-source recheck is saved in [source-checks-v2.1.json](evidence/source-checks-v2.1.json), separate from the inherited full v2 audit. Mutable pages still do not establish behavior of an unpinned installed release. The final package includes source hashes, actual logs, local-link checks and a bilingual structure check. This is not an independent certification or a substitute for running the final app.

The upload is a **new v2.1 folder**, leaving existing Drive documents untouched. Architecture and research remain plans plus a limited Node witness. Browser visual tests, duplicate normalization, axe/Lighthouse, CPU×4 measurements, final app deployment and the two-page submission note remain pending.

[S27]: https://github.com/leeoniya/uPlot/blob/master/docs/README.md "uPlot — aligned data format"
[S29]: https://raw.githubusercontent.com/apache/echarts/master/src/chart/line/LineSeries.ts "ECharts — LineSeries implementation and progressive default"
[S30]: https://playwright.dev/docs/accessibility-testing "Playwright — accessibility testing and axe"
[S31]: https://chromedevtools.github.io/devtools-protocol/tot/Performance/ "Chrome DevTools Protocol — Performance domain"
[S32]: https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/pdl/js_protocol.pdl "Chrome DevTools Protocol — Runtime.getHeapUsage schema"
[S33]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/measureUserAgentSpecificMemory "MDN — measureUserAgentSpecificMemory"
[S34]: https://developer.chrome.com/docs/devtools/memory-problems "Chrome DevTools — memory diagnostics and Task Manager"
[S35]: https://playwright.dev/docs/api/class-browser#browser-start-tracing "Playwright — browser.startTracing"
[S36]: https://raw.githubusercontent.com/ChromeDevTools/devtools-protocol/master/pdl/domains/Emulation.pdl "Chrome DevTools Protocol — CPU throttling"
[S37]: https://playwright.dev/docs/emulation "Playwright — locale and timezone emulation"
[S41]: https://developer.chrome.com/docs/lighthouse/accessibility/scoring "Lighthouse — accessibility scoring limits"
[S42]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects "MDN — transferable objects and detached buffers"
[S43]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts "MDN — Intl.NumberFormat.formatToParts"
[S44]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array "MDN — Float64Array"

[S45]: https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth "MDN — event loops, tasks and microtasks"
