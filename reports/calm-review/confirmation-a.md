# Assessment A — bounded fix confirmation

Scope: the four priority findings and one minor accessibility observation from Assessment A. This is a source confirmation, not a new ten-heuristic assessment; the earlier 27/40 score describes the original baseline and has not been rescored.

**Conclusion:** the reviewed changes address each requested issue while retaining the approved run list, primary real graph, and calm monitoring hierarchy. Runtime regression results remain the responsibility of the concurrently running full test pass; this report does not claim those tests passed.

| Original issue | Confirmation evidence | Status |
|---|---|---|
| P1: returning from source selects 005 again | DashboardPage now derives run from `params.get('run')` and metric from `params.get('metric')`; `selectRun` writes both with `setParams`, preserving existing view. Dashboard view links preserve these params. Valid query selection therefore survives component remount, Back, and reload rather than relying on local useState defaults. | Addressed in source; Back/reload runtime regression added and pending full-run result. |
| P2: phone says Running without snapshot provenance | Both monitor header and exploration summary now show `Demo snapshot · Not live` and a formatted `sourceUpdatedAt` time. `.calm-snapshot` has normal visible text styling, not a mobile-hidden header dependency. | Addressed in source; mobile provenance regression added. |
| P2: filtered matches after six cannot be selected in monitor | RunNavigator uses a limit initially six, displays `Showing N of M matching runs`, and offers `Show more matching runs` in increments of six until all matching runs are visible. Search/filter changes reset the limit; Clear resets it too. Because expansion uses the same `matched` collection, it retains filtering. | Addressed in source; complete-20-match selection regression added. |
| P2: arbitrary recorded-step inspection is pointer-only | A native details disclosure, labeled required numeric input, and submit button now provide `Inspect recorded step`. Finite submitted step navigates to the selected run's existing source inspector with step, encoded revision, and `#source`. It reuses existing source inspection rather than adding a second chart or permanent table. | Addressed in source; keyboard step-123 navigation and source-result regression added. |
| Minor: finding dot has no spoken meaning | Run row retains its visual aria-hidden dot and adds screen-reader text `Source findings` within the button name. | Addressed in source. |

The snapshot label is positioned with run identity before summaries, where it qualifies Running/Latest. The recorded-step path remains disclosed, and run expansion preserves the six-row resting default. No broad visual change is required to close these findings.

## Remaining limits

- A fresh native browser tab was attempted at the existing 5173 dev server with `run=kazakh-sft-006&metric=lr`. The tool reported `Browser is not available: iab`, so no new live screenshot or interaction result is claimed here. The browser completion summary was emitted immediately afterward.
- No tab or viewport override was created during this confirmation. The original review's interrupted viewport reset was already reported to the parent; the unavailable browser prevented a new reset here. No critique server was created, and the application server was left intact.
- Regression source explicitly covers selected run/metric Back and reload, all twenty matching runs, keyboard submission of recorded step 123, and visible mobile snapshot qualification. Reading those assertions is not equivalent to observing passing results; the parent must report the actual test outcome.
- Chart range and navigator search/filter draft persistence across route changes were not added. These were not required to close the selected-run/metric continuity finding. Keyboard source inspection now offers a direct equivalent route; keyboard cursor movement inside the canvas remains outside this fix.
- This confirmation does not assert full screen-reader compatibility, new contrast measurements, or all responsive states. No further score is assigned without a complete reassessment.

Files reviewed: `src/features/dashboard/DashboardPage.tsx`, `RunNavigator.tsx`, `dashboard.css`, the relevant regression additions in `e2e/calm-monitor.spec.ts`, and the timestamp formatter. No source edits were made by this reviewer.
