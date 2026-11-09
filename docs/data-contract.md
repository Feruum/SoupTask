# Source and rendering contract

This document describes the implemented data/core pipeline. Browser painting,
accessibility and performance are separate acceptance layers; passing core tests
does not establish those results.

## Reproduction and source ownership

`src/data/catalog.ts` defines 20 versioned descriptors. `generateRun` creates
four immutable-by-convention `Float64Array` columns: step, loss, lr and grad_norm.
The row position is the permanent sourceIndex. Generator inputs and anomaly
coordinates are deterministic. R05 contains 1,000,000 rows and one injected loss
spike at `(sourceIndex=500001, step=500001, value=100)`. R19 is a singleton.

The four R05 element stores occupy 32,000,000 bytes. This is not total application
or tab memory. `allocationBytes` counts distinct backing buffers owned by the
normalized store, including its indexes, without counting views twice.

Raw stores belong in the Worker. The UI receives compact metadata, render views
and bounded source pages. `scripts/build-manifest.mjs` processes runs sequentially
and writes only descriptors, summaries, quality counts and domains. Run
`node scripts/check-manifest.mjs` to compare this compact manifest with regenerated
source facts. No million-row JSON is committed.

`src/data/repository.ts` exposes asynchronous `list({signal})` and
`getDescriptor(id,{signal})`. `createRepository(loader)` accepts deferred/error/empty
loaders for deterministic tests. Returned metadata is deeply cloned so consumers
cannot mutate the shared manifest. Pre-aborted requests do not invoke the loader;
later aborts reject with AbortError even if the loader subsequently resolves.
The default repository performs no raw generation or simulated network delay.
Repository tests and actual results are in `src/data/repository.test.ts` and
[repository-unit.json](../reports/repository-unit.json).

## Normalization and facts

Normalization sorts an index map by `(step, sourceIndex)` and groups equal steps;
it never rewrites source arrays. Non-finite X is quarantined from chart coordinates
and remains source-inspectable. Non-finite Y retains its NaN/+Infinity/-Infinity
identity in raw storage.

Each metric is evaluated independently. Equal finite duplicates share one
deterministic representative. Unequal finite values, or finite/non-finite mixtures,
are conflicting groups with no authoritative single line value. All-invalid groups
have no finite representative. Finite conflict extrema remain renderable markers.
Known-cadence gaps and invalid/conflicting groups split valid segments. Without
cadence, sparse step numbers are not declared missing observations.

Whole-run extrema use finite raw values, including observations with invalid X;
their minStep/maxStep is null if the selected extreme has no finite coordinate.
Equal extrema choose the earliest finite numeric step, then original source order.
Latest status is evaluated at the highest finite X group. An invalid or conflicting
latest group never borrows an older healthy-looking primary value. `lastFinite`
is a separately qualified earlier unambiguous observation.

Quality counters have distinct units: duplicateRows counts additional source rows;
duplicateGroups counts step groups; conflictGroups totals conflicting metric groups
(one step can conflict in multiple metrics). Global gaps counts known missing
intervals once; per-metric gap counts describe each metric's connectivity. Nonfinite
counts are metric observations, not unique affected rows. Out-of-order counts
decreases between successive finite source steps, even across an invalid-X row.
These counters must not be added together and labelled unique affected runs/rows.

## View selection and guarantees

`sampleView` accepts inclusive finite `[a,b]`, finite span, positive plot width and
explicit scan/stream mode. Validation runs even for empty input. Binary search
selects the source group bounds. Bucket count is `clamp(floor(width),1,2048)`;
interior buckets are half-open and the final bucket includes b.

Within each bucket/valid-segment intersection, retain first/min/max/last original
references, deduplicate them and restore numeric step order. Stream mode uses
constant accumulators per active intersection; scan mode retains candidate index
lists as the correct allocation-heavier baseline. Each zoom queries normalized
source access, never an earlier reduced view.

Every finite render point exactly matches its sourceIndex, step and value. Visible
finite min/max include conflict markers and equal the raw finite extrema with valid
X in the requested window. The unique R05 maximum therefore survives every window
containing it and never enters a window excluding it. This does not promise every
local oscillation survives reduction. Break metadata is independent of selections;
the adapter must honor it and explicitly paint singleton/critical markers.

If points, conflict markers and topology exceed 16,384 elements per run/metric,
selection switches to labelled disconnected-extrema mode. It returns bucket
min/max source references, no line points and no connecting paths. Raw inspection
and quality counts remain available. The cap is also checked after the last
pending segment flush.

For Compare, only small render views may be aligned. Undefined means a foreign
series alignment slot; null represents a genuine observed invalid/break. Converting
foreign slots to null creates false gaps. Each run/metric retains its own source
extrema guarantee; a combined maximum alone is not sufficient evidence.

## Bounded inspection

`sourcePage` reads original arrival order, at most 50 rows per page. sourceIndex is
zero-based and never becomes the normalized position. `inspectSource` validates its
index. `inspectGroup(step,page,pageSize)` returns `{rows,total}` for exact duplicate
membership, with at most 50 rows; all members remain reachable by page. `inspectStep`
is a compatibility helper returning only the first bounded group page and must not
be labelled a complete large-group result. The Worker/UI should use `inspectGroup`
when displaying group membership and show the total/page information.

`issuePage` constructs only the requested page of human-readable issue records.
Metric filters retain structural issues, since invalid X/order/gaps affect source
interpretation across metrics. Known issue kinds and pagination bounds are validated.
Non-finite values travel through structured clone, not lossy JSON serialization.

## Actual verification and limits

Focused implemented tests are in `src/data/demo.test.ts`, `src/data/compare.test.ts`
and `src/core/engine.test.ts`. The latest focused green output is
[full-core-unit.json](../reports/full-core-unit.json). Cases include deterministic
1M generation, exact spike provenance, inclusive/offscreen windows, fractional
widths, independent raw extrema and bucket/segment oracles, scan/stream equality,
conflicts, signed zero, invalid X, source immutability, bounded inspection and dense
fallback including the final-flush boundary.

`node scripts/run-negative-controls.mjs` runs the new core suite against intentional
every-fourth selection, bucket-mean-as-source, fabricated-peak and bridged-gap
defects. The runner requires exact
named assertion failures, expected test totals and no skips; arbitrary crashes do
not qualify. Current expected failures are eight for nth, seven for mean, six for
fabricated peaks and two for bridged gaps across a 12-test contract suite.
Actual output, runtime/source/test/log hashes and timestamped historical runs are
linked by [negative-controls/manifest.json](../reports/negative-controls/manifest.json).
These are correctness experiments, not performance before/after measurements.

An exact block index is implemented in `src/sampling/block-index.ts`, activated
after real stream-scanner zoom measurements exceeded the chosen target. It uses
256-group outer blocks, compact 16-group summaries within boundary blocks, and
raw scans of at most 15 groups at each remaining micro boundary. Fully contained
block summaries are combined through a min/max tree. Summaries never extend
outside the exact requested group interval. Metric eligibility is conservative:
metrics containing invalid values, conflicts or known gaps use the unchanged
stream scanner, including its dense fallback. Other metrics can be indexed
independently. This is exact acceleration for eligible metrics, not a claim of
width-only complexity for arbitrary topology.

`buildRunIndex` exposes actual buildMs and unique extra buffer byteLength for
Worker activation timing and allocation accounting. The index remains Worker-owned;
its buffers must not be transferred with render payloads. Provenance and boundary
differential tests are in `src/sampling/block-index.test.ts`; actual focused output
is [block-index-unit.json](../reports/block-index-unit.json). Build time, extra
buffers and browser improvement require repeatable production measurements;
Node test durations are not those measurements. Core tests
do not prove Canvas paint, assistive-technology access, all browser behavior,
scientific validity of logged measurements, or practical 5M performance. Those
limits must remain visible in the submission's evidence and verdict.
