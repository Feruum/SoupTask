# Assessment A — independent design review

Date: 2026-11-10. Mode: Operate; all ten heuristics apply. Target: `src/app/App.tsx` and Dashboard, Training runs, Run detail, Compare, Data quality. Read-only assessment; no detector output or previous critique scores consumed. No app files edited.

## Evidence and limits

Read the five page implementations, shared Workspace and responsive disclosure, chart implementation, theme/mobile CSS, and worker inspection state. No critique ignore file was present.

Inspected the live incumbent at `https://soup-training-monitor.vercel.app` in a newly created Zen tab, using native CUA because the browser connector inventory was empty (the initial Edge entrypoint was unavailable). Visually inspected desktop Dashboard, Runs, Compare and Run detail; inspected Data quality, Run detail and Dashboard at the browser's 375 × 667 responsive viewport. Dark and light themes were sampled on representative desktop/mobile pages. The tab was closed and its theme restored to dark. No local server was started.

CUA screenshots are emitted inline in this assessment's tool transcript; the documented capture API did not provide saved screenshot paths. Evidence captures include “Inspecting desktop dashboard layout,” “Reviewing training run collection,” “Checking light comparison chart readability,” “Reading run metrics and section controls,” “Testing unmatched source query response,” “Inspecting mobile quality hierarchy,” “Reviewing mobile ledger and light theme,” and “Verifying chart guidance in compact layout.” A desktop ChatGPT notification partially occluded the lower-right corner; findings do not rely on that region. Native accessibility snapshots were occasionally stale immediately after navigation; settled screenshots and subsequent snapshots were used. This is simulated mobile, not physical-device testing. Full screen-reader and keyboard traversal were not completed, so no blanket accessibility compliance claim is made.

## Design specificity

The interface has a clear Soup identity: warm burnt-orange emphasis, restrained warm surfaces, small Kazakh ornament, the experiment instrument/map, and recipe details. It feels like a measurement workspace rather than a generic SaaS template. The map needs its existing legend, selector and accessible-table alternative to be understood; those support a distinctive composition without making the map the sole route to a run. Preserve this visual world.

## Nielsen scores

| Heuristic | Score / 4 | Reason |
|---|---:|---|
| Visibility of system status | 3 | Selection, active route, range updates and worker loading are communicated; a zero-match source inspection gives no completion response. |
| Match with real world | 3 | ML terminology and source provenance fit the task; issue filters expose internal enum spellings. |
| User control and freedom | 3 | Clear navigation, range reset, comparison removal and filter recovery; intermediate-width preview destination is remote. |
| Consistency and standards | 3 | Cohesive controls, panels, themes and navigation; compact chart instructions assume controls that some hosts omit. |
| Error prevention | 3 | Four-member constraint, known-run validation, finite range checks and revision checks are meaningful safeguards. |
| Recognition rather than recall | 3 | Run metadata, persistent legends, whole-run summaries and exact-source links retain context; tablet preview introduces a memory bridge. |
| Flexibility and efficiency | 3 | Search, filters, sorting, multi-select, range fields, gesture zoom and source deep links serve expert workflows. |
| Aesthetic and minimalist design | 3 | Strong typography, measured decoration and purposeful color; some collection controls are cramped at laptop width. |
| Error recognition and recovery | 2 | Most invalid routes and quality states suggest recovery; unmatched source query is indistinguishable from inactivity. |
| Help and documentation | 2 | Docs and contextual chart/source explanations exist; mobile preview zoom guidance refers to an absent control. |
| **Total** | **28 / 40** | **Good foundation; targeted interaction refinements.** |

## Strengths

1. Source truth is treated as part of the interface: immutable snapshots, actual recorded steps, invalid/conflicting latest measurements, provenance links, and whole-run versus visible-window distinctions are explicit.
2. The layout has a coherent identity and reliable visual hierarchy. Small branded details support the instrument character without overwhelming the operational screens; light theme retains the same hierarchy.
3. Compact layouts make deliberate tradeoffs: bottom navigation, large native selectors, disclosed secondary panels, and labeled ledger cards preserve the main task at 375 pixels. Execution status and data quality remain distinct.

## Actionable issues

### A1 — P2: Source inspector silently returns no match

**Location:** `src/features/shared/Workspace.tsx:190`; accepted inspection reply state at `src/worker/use-workspace.ts:82`.

**Verified:** On live R05 Source, submitted recorded step `1000001` (beyond its highest recorded step `999999`). The input remained visible with no result, no “not found,” and no completion status. Source rendering gates the entire result block on `inspection.length > 0`; an accepted empty result cannot render feedback.

**Impact:** An investigator cannot distinguish “no original observation” from an unresponsive Inspect action. The missing response is especially confusing when checking sparse or irregular steps.

**Refinement:** Track whether an inspection has completed, including zero results. Announce “No observation at recorded step …” with the accepted query and a concise route to Browse source rows or a different step. Keep submitted query, pending state and accepted result distinct.

### A2 — P2: Laptop/tablet preview updates below all twenty rows

**Location:** `src/features/runs/RunsPage.tsx:55`, `:66`, `:72`; `src/styles/theme.css:299`; `src/features/shared/ResponsiveDisclosure.tsx:5`.

**Verified:** Desktop screenshot showed the Runs table occupying the complete content width; accessibility order placed the Run preview after all twenty rows. CSS stacks the two-column layout at 1400px, but JS compact behavior activates only at 760px. `previewRun` scrolls/focuses its destination only when that compact predicate is true.

**Impact:** Between 761px and 1400px, Preview changes a panel several screens below the action without bringing it into view. The user must discover the panel and remember which row was selected. This is a source/placement-confirmed issue; I did not complete a separate live click-and-scroll reproduction at each intermediate width.

**Refinement:** Use the actual stacked-preview breakpoint for destination scrolling/focus, or place the disclosed preview before the collection in that layout. Preserve the side-by-side wide-screen behavior.

### A3 — P2: Compact previews direct users to a nonexistent zoom control

**Location:** `src/features/shared/Workspace.tsx:169`; compact hosts at `src/features/dashboard/DashboardPage.tsx:86` and `src/features/runs/RunsPage.tsx:66`.

**Verified:** The 375px live Dashboard shows “Use Adjust chart range to zoom” beneath Raw loss. Its accessibility snapshot has no Adjust chart range control, and its source only mounts compact Charts. The Runs preview uses the same compact component without RangeControls. Run detail/Compare do mount RangeControls.

**Impact:** Phone users follow an instruction that cannot be completed in that context. Gesture-only zoom is not a substitute for the named accessible control.

**Refinement:** Give compact preview charts context-specific help and link to the full run for range adjustment, or expose the actual range disclosure in those hosts. Keep full-chart instructions for hosts that provide it.

### A4 — P2: Issue filters and ledger use internal enum names

**Location:** `src/features/quality/QualityPage.tsx:12`, `:52`, `:54`.

**Verified:** Live Data quality AX exposes `nan`, `posInf`, `negInf`, `invalidX`, and `outOfOrder` as option labels; the mobile ledger's Type heading is `nan`. The issue summary already uses clearer display labels such as “Invalid step coordinates” and “Out-of-order source.”

**Impact:** Users must translate between the summary and ledger while narrowing a finding. Even ML users should not need to infer whether `invalidX` means bad steps or invalid metric values.

**Refinement:** Keep enum values in URLs and queries, but share human-readable labels across filters, ledger headings and issue-location accessible names. Preserve the existing technical raw values.

No P0/P1 issue was established in this bounded review.

## Cognitive load

Moderate in the affected collection flow: two checklist failures, minimal choices and working-memory continuity. The filter toolbar presents search plus three filters/sort selectors and a direction control; Compare exposes up to twenty run choices within a searchable scroll region; Quality has eight issue types. These are necessary data choices, so do not arbitrarily truncate them to four. Search, grouping and native selection provide the needed structure. The actionable memory burden is A2, not the mere existence of twenty experiments. Grouping, hierarchy and progressive disclosure otherwise pass. Four main destinations and three dashboard metrics are manageable.

## Emotional journey

The dashboard's instrument and regional identity make an assured opening. The single R05 peak, clear source link and raw-value language turn an alarming shape into an investigable fact rather than an automated diagnosis. Compare reinforces trust with original-step alignment and preserved gaps. The main valley is the source lookup with no reply (A1), where confidence is lost just as the user asks for exact proof. The best ending is a resolved source observation with revision context; make unsuccessful lookups equally explicit.

## Persona walkthroughs

- **Alex, impatient power user:** Search, multi-select and URL-backed comparison are efficient. A2 makes Preview feel ineffective on ordinary laptop widths; A1 creates unnecessary retries during exact-step checks.
- **Sam, keyboard/accessibility-dependent:** Native inputs, labels, skip link, route headings and source table alternatives are solid source-level affordances. A3 promises a control absent from the reading order. Focus CSS exists, but full keyboard and screen-reader operation was not verified and is not scored as universally passing.
- **Casey, distracted mobile user:** Bottom navigation and 44px primary controls work well in the simulated 375px view. Disclosed secondary tools reduce scroll burden. The raw issue labels and inaccurate preview help add interpretation/search effort during a short phone session.

## Minor observations

- Singular counts appear as “1 findings” in collection rows; use a count-aware noun when touching that copy.
- At laptop width the Status/Data quality/Sort labels run close to adjacent controls. The disclosure wrapper uses display:contents, so direct-child flex label rules do not reach its labels. Recheck label/control grouping if adjusting this toolbar; this is visual polish rather than a blocked task.
- Keep the explicit Raw loss label on the Dashboard: the global metric buttons change the map and selected summary while this preview stays loss. That distinction is visible and should survive future refinement.

Questions skipped: isolated Assessment A handoff; parent owns synthesis and the user-facing close.
