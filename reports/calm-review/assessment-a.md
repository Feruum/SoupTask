# Assessment A — independent design review

Method: isolated design review, completed without detector output or prior critique reports. Surface: `src/features/dashboard/DashboardPage.tsx`, `RunNavigator.tsx`, and `dashboard.css`, with shared chart and disclosure source consulted. Mode: **Operate**. Baseline approved direction: `output/imagegen/05-monitor-calm-v3.png`.

## Design specificity verdict

The composition feels authored for a training monitor: experiment selection, one substantial real metric graph, whole-run summaries, source integrity, and an explicit path to the original observation. Warm orange against restrained near-black, thin rules, and the lab identity make a coherent product. Keep this monitor/list/large-graph structure. The separate Experiment map and Groups views appropriately keep exploration out of the monitoring task. The most important improvements concern continuity and truthfulness of state, rather than a new visual direction.

## Heuristic scores

Scores describe the reviewed baseline, before any subsequent fixes. Error prevention/recovery scores include source inspection of the range form and retry treatment; forced runtime failure was outside this bounded review.

| # | Heuristic | Score / 4 | Evidence |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Run, metric, loading, and source quality are visible; snapshot provenance disappears on mobile. |
| 2 | Match with real world | 3 | Loss, peak step, raw rows, and model/method align with the task; Running lacks visible snapshot qualification on phone. |
| 3 | User control and freedom | 2 | Escape closes chart settings, filters can clear, range can reset; browser Back loses selected run. |
| 4 | Consistency and standards | 3 | Links, tabs, selection, spacing, and disclosed controls are coherent across the surface. |
| 5 | Error prevention | 3 | Range form rejects empty/nonfinite/reversed bounds; source values are preserved. |
| 6 | Recognition rather than recall | 3 | Selected run and metric remain visible; a return trip requires recalling and restoring the prior run. |
| 7 | Flexibility and efficiency | 2 | Search, filters, native phone picker, and numeric range entry exist; original-value cursor inspection is pointer-only. |
| 8 | Aesthetic and minimalist design | 3 | The large graph and ruled summaries carry a clear hierarchy; expanded phone run switching duplicates two selection interfaces. |
| 9 | Error recovery | 3 | Clear-filter actions, range validation, and Retry are present; recovery paths preserve chart context in source. |
| 10 | Help and documentation | 2 | Docs and gesture guidance exist; the graph does not expose an equally direct keyboard source-inspection cue. |
| **Total** | | **27 / 40** | **Acceptable; targeted usability fixes needed** |

## What works

1. One selected run, four summary facts, and one prominent chart give monitoring a clear reading order. Loss/Learning rate/Gradient norm form a bounded three-choice decision. The spike is represented at its actual magnitude, with an explanation and source link.
2. Phone layout retains the real graph and every meaningful summary. Change run becomes a disclosure, metric labels wrap at 320px without truncation, actions remain textual, and bottom navigation supplies persistent destinations.
3. Progressive disclosure is purposeful: range settings and run history are available without dominating the resting page. A live keyboard check confirmed Escape closes chart settings and returns focus to its summary. Selecting a run on phone collapses the navigator and moves focus to the selected-run heading.

## Priority findings

### P1 — A source-inspection round trip silently selects another run

**Confirmed flow:** at 390 × 844, open Change run, choose `kazakh-sft-006`, choose Open run, then browser Back. The monitor returns to `kazakh-sft-005`, with Loss selected. This is an ordinary monitoring investigation: users leave to inspect evidence and return to the same experiment. Replacing their context with the default can cause them to interpret the wrong run's summaries.

**Source:** DashboardPage initializes selected run to 005 and metric to loss in component-local state; view is the only dashboard selection read from the URL.

**Fix:** preserve run and metric alongside view in the route/query state; restore them on Back and refresh. Preserve the selected chart range if practical, without broadening the visual layout. Suggested command: `$impeccable harden`.

### P2 — The phone monitor presents a historical run as apparently live

**Confirmed:** desktop header shows Demo data. At 390px the header shows only workspace, Docs, and theme. The selected experiment says Running, with Latest loss; no snapshot date or demo qualification is visible beside the run or summaries. Source snapshot is buried in Run details and history. Opening the run detail page reveals the stronger qualification “Demo snapshot” and its timestamp, confirming information exists but is absent at the monitoring decision point.

**Why:** a distracted reader cannot distinguish a currently updating measurement from the recorded status of an immutable example. This is especially relevant in Operate mode.

**Fix:** add a compact, visible snapshot qualification near the selected run/model on both viewport sizes, ideally with the source timestamp. Keep recorded run status, but qualify it as snapshot state. Suggested command: `$impeccable clarify`.

### P2 — Filtered run results stop after six without an in-context route to the rest

**Source-confirmed:** RunNavigator uses `matched.slice(0, 6)`. Its filter footer reports the total matching count, while View all always links to `/runs` without carrying the query or filter. Thus a model search or With findings filter with more than six results gives no way to select later matches in this navigator; the user must abandon the monitor's filtering task and recreate it elsewhere. Phone additionally has an unfiltered native select, which exposes all runs but loses the model/method context and filter intent.

**Fix:** retain the quiet six-row default, but provide Show more matching runs when there are additional results, or carry the filter/search into an explicitly labeled View all matching runs link. Mark the visible/total count so the cap is clear. Suggested command: `$impeccable harden`.

### P2 — Recorded-value inspection has no direct keyboard equivalent on the monitor

**Evidence:** MetricPlot renders its plot/cursor canvas with `aria-hidden="true"`; no focusable plot or key handler appears in that component. The shared CursorReadout only receives observations after pointer/touch cursor movement. The live accessibility tree exposes summary facts and Inspect peak at source, but no way to inspect an arbitrary chart step directly. Numeric range controls are accessible, so zoom is better covered than inspection.

**Why:** keyboard and screen-reader users can reach the peak or open the full run, but cannot follow the chart's “recorded values” task with the same immediacy.

**Fix:** expose a small keyboard-accessible Inspect recorded step route/control near the graph, reusing the existing source inspector. Alternatively support a focused chart cursor with keyboard stepping and textual output. Do not add a second graph or permanently visible data table. Suggested command: `$impeccable harden`.

## Cognitive load

**Two checklist failures: moderate load in the investigation flow; low load in the resting monitor.** Grouping, visual hierarchy, one decision at a time, and progressive disclosure pass. Working memory fails when a source round trip resets the selected run. Minimal choices/chunking is weaker in expanded phone run selection: search, filter, an all-20 native select, and a six-row button list appear together. This is an optional state, not grounds to remove the approved list. Preserve a clear primary selection path and improve result completion rather than redesigning navigation.

Decision points exceeding four options: six run rows in the desktop/expanded phone list; twenty options in the native phone picker. These are searchable experiment collections, so the count alone is not a defect. The real problem is incompleteness of filtered results and duplicate selection paths on phone. Main navigation has four destinations, dashboard views three, metric choices three, and summary facts four.

## Emotional journey

The resting page feels calm and technically credible. The explicit spike explanation reassures a reader that the baseline compression is a faithful scale choice. Selecting a run on phone is well resolved by automatic disclosure closure and heading focus. The main valley occurs after checking source evidence: returning to a different experiment breaks confidence. A second trust gap is the absent mobile snapshot qualification. End a source investigation with restored context and visible provenance.

## Persona red flags

- **Alex, frequent experiment investigator:** can quickly search and select, but loses the chosen run when returning from Open run or another route. Filtered collections over six force extra navigation and repeated query work.
- **Sam, keyboard/screen-reader user:** headings, textual links, native controls, Escape, and selection focus are helpful. The arbitrary recorded-value flow still requires pointer movement or a separate manual route into source inspection. Do not claim the visual plot is accessible merely because nearby summary facts are accessible.
- **Casey, interrupted mobile user:** resting view works at 390px and screenshot evidence covers 320px. The screen says Running without a visible demo timestamp, and source return/refresh cannot restore the chosen experiment. Expanded run switching is long and offers two parallel selectors before the chart.

No project-specific persona was invented: no readable root AGENTS.md Design Context was found in the bounded file check.

## Minor observations

- The yellow finding dot in each run button is aria-hidden with no adjacent screen-reader finding label. Add concise accessible finding text without increasing visual noise.
- The phone chart begins below the fold because run identity and four facts precede it. This is a tradeoff, not a request to shrink or replace the approved graph. The disclosure keeps selection controls out of that resting stack.
- “Raw rows” and “Source values unchanged” convey useful provenance, but render-point count is secondary. Keep it visually subordinate to recorded values and quality.
- Full-page phone screenshots show the fixed bottom bar crossing the document at the captured viewport boundary; that artifact alone does not prove chart data is permanently obscured. The page can scroll past it. Do not treat it as a confirmed blocking overlap.

## Questions for synthesis

- Can the monitor always tell the reader which recorded run, metric, and snapshot they are evaluating, even after returning from source evidence?
- Can later filtered matches be selected without giving up the calm six-row default?
- Can recorded-step inspection be equally clear for touch, mouse, and keyboard users without expanding the resting page?

## Evidence and run notes

Independent fresh native IAB tab created at `http://127.0.0.1:5173/dashboard`; desktop and 390 × 844 inspected. Live tests covered chart settings/Escape, phone disclosure, run 006 selection, Open run, and browser Back. Approved image and current dark-390/light-320 captures were visually inspected. No detector was run or read. No source was edited. No critique server was created; the existing application server was left running. A viewport reset call was aborted before dispatch; parent was notified to reset it during its browser cleanup. CUA completion summary was emitted. Root ignore-list read produced no content. This assessment is a baseline observation, not a review of later fixes.
