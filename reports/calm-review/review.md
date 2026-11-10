Method: dual-agent (A: /root/calm_design_a · B: /root/calm_detector_b)

# Impeccable review and fixes — Soup Monitor

Target: src/features/dashboard/DashboardPage.tsx. Operate mode, approved reference output/imagegen/05-monitor-calm-v3.png. Review performed 10 November 2026; desktop and mobile, both themes. A completed independently before B's findings entered synthesis.

## Design specificity and overall impression

The approved searchable run navigator, four ruled facts and one substantial genuine chart fit the training investigation task. Soup's warm accent, restrained surfaces and Kazakh pixel identity remain coherent. Keep this composition. The review found continuity, provenance and access defects, rather than a need for another redesign. The scoped deterministic scan returned zero findings; manual browser inspection still found a real numeric wrapping defect.

## Baseline design health

These scores describe the initial review before fixes. No unsupported post-fix score is assigned.

| Nielsen heuristic | Score / 4 | Initial issue |
|---|---:|---|
| System status | 3 | Snapshot provenance missing on mobile |
| Match with real world | 3 | Running lacked visible snapshot qualification |
| User control and freedom | 2 | Back lost run/metric |
| Consistency and standards | 3 | Coherent links, disclosures and controls |
| Error prevention | 3 | Range validation and unchanged source values |
| Recognition over recall | 3 | Return flow required restoring selection |
| Flexibility and efficiency | 2 | No direct arbitrary-step keyboard path |
| Aesthetic and minimalist design | 3 | Calm composition; duplicate mobile selection paths |
| Error recovery | 3 | Clear, reset and retry paths available |
| Help and documentation | 2 | Pointer instructions stronger than keyboard inspection |
| **Total** | **27 / 40** | **Baseline; targeted usability fixes required** |

## Priority findings and disposition

1. **P1, fixed:** Open run → browser Back reset the selected experiment/metric. Both now use validated run/metric query parameters. View navigation preserves them, selection replaces the current history entry, and Back/reload restore context. Regression covers run006 and Learning rate.
2. **P2, fixed:** Mobile could present a demo snapshot as live Running data. Monitor and exploration summaries now visibly show Demo snapshot, Not live and the actual source timestamp with timezone beside run identity.
3. **P2, fixed:** Matching results after the first six were unreachable without abandoning the monitor filter. The six-row default remains; Showing N of M and Show more matching runs reveal the complete filtered collection in place. Regression selects020 after expanding20 matches.
4. **P2, fixed:** Arbitrary recorded-step inspection required a pointer. A disclosed, labeled numeric Arc Input and Arc Button open the existing revision-bound source inspector. Keyboard-only regression submits123 and observes its original source measurement. This is an equivalent numeric path, not keyboard cursor motion inside canvas.
5. **P2, fixed:** Raw rows1,000,000 broke across lines at320px. Narrow fact typography/spacing now preserves the whole value. Both themes are checked for one text rectangle, fitting width and no horizontal page overflow.

Minor finding fixed: source-finding dots retain their visual treatment and now include spoken Source findings text in the run button name. The new inspection field uses existing Arc components with a44px touch target and16px mobile text.

## Strengths, cognitive load and personas

The primary chart is easy to locate; map and groups are separate exploration views. Source spike explanation and links preserve trust. Run switching on phones closes the disclosure and focuses the selected-run heading. Source data and numeric metrics are not decoratively animated.

The resting page has three view choices and three metrics. Six run buttons and a20-option native picker are searchable collection choices, not inherently excessive; the filtered collection is now complete. The expanded mobile chooser retains both native and searchable selection as an intentional platform fallback. No additional panel was added to the resting layout.

Frequent investigators now retain experiment identity after a source trip. Keyboard users can enter the exact step without manipulating a canvas. Interrupted phone users see snapshot qualification before interpreting Latest/Running. These resolve the principal trust valley without changing the approved visual direction.

## Suppressions and intentional design

No new detector ignore was added. The existing file-scoped side-tab exception in src/styles/theme.css remains: its2px issue-strip accent marks actual source observations and links to their source. It is functional data annotation. No decorative card stripe was introduced. Automatic hook hint limits after repeated edits are not new project ignore rules.

## Executed verification

- Scoped Impeccable detector: exit0,0 findings; detector-dashboard.json.
- Build: npm run build -- --outDir tmp/calm-review/verified-build, passed.
- Lint: npm run lint, passed with deny-warnings.
- Unit: npm test -- --outputFile reports/calm-review/unit-results.json,96/96 passed in22 files.
- Full Chromium: npm run test:e2e -- --config tmp/calm-review/playwright.config.ts,92/92 passed; full-results.json.
- Final Arc field/button refinement: same runner with calm-monitor.spec.ts,16/16 passed; e2e-results.json. Covers Back/reload, full filtered results, exact source123, range/Escape, map keyboard, actual spike paint,320/390/768/1440, dark/light, reduced motion, axe and synthesized touch scrolling. At320px the expanded field is also checked for44px height and16px text.

The first full pass recorded90/92: one new assertion incorrectly expected “at step” instead of the existing “at recorded step”; its expectation was corrected. A newly added Compare hover-commit test also failed in that older artifact. Concurrent work changed shared/Compare code; this review did not edit those files. Both tests passed in the next isolated full build. full-before-confirmation.json and failure artifacts retain the original results. The initial navigation regression also failed before the fix, as recorded under red-test-results.

Changed source in this review: DashboardPage.tsx, RunNavigator.tsx, dashboard.css; regression additions in e2e/calm-monitor.spec.ts; Dashboard usage description in README.md. No dependency/lockfile or backend changes.

## Limits and remaining work

This is Chromium emulation and native browser inspection, not physical iPhone/Safari or a complete screen-reader audit. Canvas keyboard cursor movement is not implemented; numeric source inspection is the keyboard alternative. Range and search drafts do not persist across leaving the route. These were not required to close the reviewed run/metric continuity defect. Passing smoke or visual tests are not proof of every million-point invariant or performance budget.

Questions skipped: the user explicitly authorized review and fixes; no unresolved design choice required approval.
