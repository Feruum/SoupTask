# Hover optimization correctness review

Date: 10 November 2026. Method: read-only source review of the formatter cache, cursor store, workspace transport, controller, Canvas pointer lifecycle, source readouts and relevant test sources. No browser, build, test or performance workload was started during this review. This report does not certify a new latency result or assign a numerical quality score.

## Finding requiring resolution

### P1: independently published cursor snapshots lack the displayed-view identity

Locations at review time: `src/worker/cursor-store.ts` CursorState; `src/worker/use-workspace.ts` accepted view/hover branches; `src/features/shared/Workspace.tsx` Charts/CursorReadout.

The accepted source cursor currently carries hoverSeq and hoverStep, but no viewSeq or activation identity. Controller.receive dispatches its pending request before invoking the current view acceptance callback. A pending hover therefore can be sent before the accepted-view React state update commits. That callback clears the cursor and queues setState for the new view. A sufficiently fast hover reply can subsequently publish into useSyncExternalStore, whose synchronous subscriber update can render Charts against the previous view prop while the surrounding normal React update is pending.

The cursor markers/readout can then temporarily belong to the new requested viewport while the Canvas axes still belong to the previous displayed viewport. `useHoverPaint` rejects mismatched viewSeq for instrumentation, but that check does not gate the readout or marker consumers themselves. This is a static scheduling finding, not a browser-reproduced timing claim.

Recommended resolution: tag cursor snapshots with their accepted view and activation identity and display them only when they match the displayed view. Alternatively bind snapshots to the accepted WorkspaceView object reference and gate by that reference, which also distinguishes reused viewSeq values across activations. Preserve current run/revision/epoch and sequence guards. Add a controlled fast-hover/delayed-view-commit regression rather than relying on random delays.

## Nonblocking edge to consider

`MetricPlot` re-queries the saved physical pointer after its data/topology effect. ResizeObserver calls setSize and reports a rounded per-metric width; the hook skips a new view when this rounded width did not change. A fractional layout resize that changes geometry but not this bucket width may therefore leave a stationary pointer using its preceding accepted source query until the pointer moves. This narrow path was not reproduced in a browser here; it should not be reported as an executed failure. Calling the saved-pointer reconciliation after a real setSize would make the behavior explicit.

## Checks supported by source inspection

- Formatter options remain identical to the uncached implementation for step, ordinary and scientific formatting. Nonfinite/null branches and explicit signed-zero handling are retained. The cache is bounded at 32 entries; normal application locales reuse a small fixed set of formatters.
- Cursor store getSnapshot returns a stable object between publications. subscribe returns a matching unsubscribe. The React hook creates one retained store per mounted workspace hook rather than one per hover.
- Workspace activation and range intent clear the store. Disposed/session/request/view guards still reject late Worker replies before decode. StrictMode cleanup terminates the obsolete Worker and removes handlers.
- Accepted hover publishes bounded source rows only. Canonical raw columns remain Worker-owned; transferable render data and source provenance are unchanged by this optimization.
- Controller still limits actual dispatch to one in-flight request plus one latest pending request. Direct pointer dispatch removes the extra animation-frame queue without introducing an unbounded Worker message queue.
- Pointer listeners are removed and wheel/resize frames cancelled during chart cleanup. A committed changed view explicitly resets pointer deduplication and re-queries a stationary physical pointer.
- Readouts still cover all three metric panels. Keeping the last accepted source available outside the Canvas permits the user to activate Pin source; pinned records remain independent from subsequent cursor changes.

## Evidence boundary

Relevant regression sources inspected: `e2e/hover-scheduling.spec.ts`, `e2e/hover-paint.spec.ts`, `src/data/format-workload.test.ts`. Existing before/after reports and the root's full browser run are separate executed evidence, not results produced by this review. The final CPU-throttled hover performance target still requires the root's fresh measurements after correctness fixes and source freeze.

## Resolution addendum — accepted-view identity gate

A follow-up read-only inspection confirmed the P1 fix in the current source. The finding above is retained as historical review evidence, not an outstanding release defect.

- CursorState now carries the actual accepted WorkspaceView object reference.
- The hook keeps an acceptedView reference, clears it on workspace activation and range intent, and binds an accepted hover only when its viewSeq matches that accepted view.
- cursorForView returns the source snapshot only for the exact displayed WorkspaceView reference; otherwise it returns the stable empty snapshot. Object identity distinguishes both different view sequences and new activations that reuse a sequence number.
- Charts applies this gate before producing Canvas cursor points and calling useHoverPaint. CursorReadout independently applies the same gate before displaying source facts or Pin actions.
- Worker decoding creates a fresh WorkspaceView object per accepted response. The React state and cursor snapshot refer to that same accepted object, so delayed parent commits hide future-view source facts until the matching view is displayed.

The inspected component regression source is `src/charts/cursor-view.test.ts`, which renders the actual CursorReadout. It covers a future-view snapshot, a new activation with a reused view sequence, and the positive case retaining the exact source observation for the displayed view.

Existing results inspected, without rerunning them:

- `reports/cursor-view-before-confirmed.json`: 3 tests, 2 expected failures and 1 positive pass; success false. The two failures are the future-view and reused-sequence cases.
- `reports/cursor-view-after.json`: the same 3 tests pass; success true.
- `reports/cursor-view-before.json`: the initial 3 failures remain preserved. Its positive-case failure additionally assumed an English-formatted value. The final positive assertion checks the exact raw-value title, avoiding that unrelated locale assumption.

Conclusion of this review addendum: the identified mismatched-view cursor publication is resolved by the displayed-view identity gate, with positive and negative component evidence. The narrow fractional-resize requery observation remains unverified and nonblocking. This addendum makes no claim about newly measured hover latency, full browser acceptance or performance-target compliance; those remain separate root-run evidence.

## Final addendum — pointer-origin identity and resize reconciliation

A further read-only inspection confirms the input-side counterpart to the displayed-cursor gate:

- MetricPlot receives viewToken from the same WorkspaceView used by Charts. Its appliedView reference is updated only after the data/scales batch completes, and is cleared during chart cleanup.
- Cursor events forward that applied reference. The workspace hover callback accepts a query only when its non-null origin is exactly the currently accepted WorkspaceView. Activation and pending range changes null the accepted reference, so old axes cannot enqueue a source query for a future viewport.
- After a new view is applied, the saved physical pointer is reconciled with deduplication reset, allowing the current coordinate to issue a valid fresh query. Existing run/workspace/request/sequence guards and consumer display gates remain in place.
- ResizeObserver now reconciles the pointer after setSize and width notification. This addresses the earlier narrow fractional-width observation without requiring a new sampled view when its rounded resolution did not change. When a width notification does request a new view, the input origin guard rejects the obsolete coordinate until the matching view is applied.
- The production MetricPlot consumer found by search is the shared Charts component, and it passes the accepted viewToken through. No untagged production source-hover caller was found in the inspected tree.

Executed evidence inspected, not rerun by this reviewer: `reports/hover-origin-before/results.json` retains one failed held-view browser assertion (expected true, received false); `reports/hover-origin-after/results.json` records four expected tests, zero unexpected, zero skipped and zero flaky. The held-real-Worker test source in `e2e/hover-scheduling.spec.ts` checks that steps derived from previous axes are not posted for the pending new range, then confirms a valid re-query after releasing the accepted view.

Review conclusion: the previously identified display-side race and the additional input-origin race are addressed in the inspected implementation. The earlier fractional-resize observation is also addressed by explicit reconciliation. No additional scope or identity mismatch was identified in this focused pass. This is not a substitute for the root's full acceptance run or final performance measurements; no new application code, test execution, browser session or benchmark was produced by this addendum.
