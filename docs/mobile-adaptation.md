# Soup: compact layouts

The existing desktop visual direction is preserved. Mobile adaptations prioritize the active measurement or investigation before secondary context.

- Dashboard: selected experiment → selected facts/actions → raw Loss. The map, model/method tree, findings and activity history remain available through disclosures.
- Training runs: search first, secondary filters disclosed, run rows reflow with labeled values/actions, and Preview opens/focuses the compact panel above the collection.
- Run detail: concise two-column summaries, a two-by-two section control on phones, disclosed numeric range controls, touch chart inspection and preserved source tools.
- Comparison: selected identities and remove controls precede the editable chooser. Raw summaries remain available through disclosure. Source values and chart colors are preserved.
- Data quality: secondary workspace totals/matrix disclose; investigation controls and issue records remain near the beginning of the page. Do not insert a full summary table above the mobile ledger without equivalent disclosure.

`ResponsiveDisclosure` uses native details/summary, stays expanded on desktop, and defaults secondary content closed on compact layouts. Its state is user controlled on the current layout. Shared compact detection covers width ≤760px plus a short landscape viewport with a coarse pointer. Comparison uses the same component at its 1100px stacked-layout breakpoint. CSS queries and the component's media query must stay aligned.

Preserve 16px input/select text on touch layouts, 44px effective action targets, and safe-area padding. Native vertical scrolling must work across a chart. A short touch tap inspects a recorded value; an interrupted/swiping pointer clears the draft. Numeric range controls provide an explicit alternative to gestures. Do not add decorative chart animations or intermediate numeric values.

Dense chart marks and activity squares have equivalent larger selection/date controls. Raw multidimensional tables retain contained horizontal scrolling with a visible cue; mobile run rows and issue records expose their essential actions without that sideways travel.

Meaningful regression coverage is in `e2e/mobile-workflows.spec.ts`: result placement, row action visibility, preview destination, selected comparison identities, investigation proximity, physical synthesized touch tap/swipe, keyboard range/disclosure operation, landscape navigation and axe in both themes at320px.

Review artifacts, independent assessments, before/after renders and verification results are in `reports/mobile-review/`. The implementation was confirmed in a bounded initial inspection plus one design confirmation, with further checks restricted to actual test failures and concurrent integration changes.
