# Scoped review of Assessment A fixes

2026-11-10. Read-only follow-up of A1–A4. All four original findings are addressed in the current source. No new blocking regression was established. This is not a new full Impeccable assessment and does not assign a revised numerical score.

| Original issue | Disposition | Evidence |
|---|---|---|
| A1: silent unmatched source lookup | Resolved in source and existing focused runtime evidence; new refusal-race case still needs final runtime confirmation | `src/features/shared/Workspace.tsx:185` onward now distinguishes submitted, accepted, pending and failed inspections. Zero results produce a query-specific status and Browse source rows recovery. Editing the draft does not relabel the accepted result. Accepted pagination uses accepted query context. `src/worker/use-workspace.ts:80`, `:93`, `:146` correlate replies to the dispatched query and expose pending/error state. |
| A2: remote stacked preview | Resolved | `src/features/runs/RunsPage.tsx:17` uses a 1400px stacked predicate matching `src/styles/theme.css:299`; `previewRun` scrolls and focuses the preview heading at that breakpoint. Existing focused tests assert heading focus and on-screen placement at 1024, 1280 and 1400px. Wide-screen side-by-side behavior remains intact. |
| A3: missing range control named in compact help | Resolved | `src/features/shared/Workspace.tsx:172` gives compact hosts an actual “Open run and adjust range” link. Full-chart hosts keep the Adjust chart range guidance. Existing test follows the link from both Dashboard and Runs at 390px and confirms the destination control exists. |
| A4: internal issue enum labels | Resolved | `src/features/quality/issue-labels.ts` centralizes readable labels. Quality filter options retain stable enum values while rendering those labels. QualityPage and RunQualityPanel ledger headings and strip accessible names use the same labels; issue summaries share the relevant display names. Existing test covers +Infinity, invalid coordinates, ledger row headings, strip accessible name and stable outOfOrder URL value. |

## Latest inspection-race change

I re-read `inspect()` after the worker's latest change. Its queued/busy preflight now preserves an existing pending inspection's request identity and pending flag when B is refused, instead of replacing A's query. The controller also refuses a busy explicit request before incrementing the inspection sequence. This directly addresses the reported A/B refusal race by inspection. The new gated-reply test in `e2e/review-fixes.spec.ts` covers A pending, refused B, delivery of A's original loss peak, and re-enabled submit.

The saved `reports/review-fixes-final/results.json` records eight expected passes, zero failures, zero flaky tests. It was written before the newly added refusal test and the latest hook change (saved result 09:29:06; hook 09:30:38; test 09:31:08 local time). Do not describe that existing report as proof that the ninth case passed; parent owns its final confirmation run.

## Visual fit and evidence limits

The fixes preserve the incumbent Soup palette, typography, ornament, navigation and page structure. The new inspector status uses existing tokens through a small scoped CSS module. The singular finding noun in Runs was also corrected. No speculative redesign or new page was introduced.

Reviewed current source, existing focused tests and their result JSON. Viewed both saved `accepted-hover-frame.png` captures under `reports/review-fixes-final/artifacts/hover-paint-*`; they show the existing dark Run/Compare visual system remains coherent, but do not show the four changed states. No fresh browser, native CUA, performance test or detector was run during this follow-up, as requested. Updated mobile/light-theme visual confirmation remains with the parent's scheduled confirmation round. No app or tooling files were edited.

No additional actionable regression found within this scoped review.
