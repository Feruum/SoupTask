# Mobile adaptation: verification

Date: 2026-11-10, Asia/Qyzylorda. Dev app: http://localhost:5173/dashboard. HTTP200 verified before handoff.

## Actual results

- TypeScript and production Vite build: passed with `npm run build -- --outDir tmp/mobile-review/verified-build`.
- `npm run lint`: passed, no warnings.
- `npm test -- --outputFile reports/mobile-review/unit-results.json`: **95 passed, 21 files**. This report has its own path so concurrent focused test runs cannot overwrite it.
- Final targeted browser run: **13/13 passed**, 25.3s. `mobile-workflows.spec.ts`, `summary-quality.spec.ts`, `pinned-source.spec.ts`; report `e2e-results.json`.
- Last full browser run before the final selector fix: **44/45 passed**; archived `e2e-full-results.json`. Its sole failure was exact-label lookup of Summary metric. The control now has an explicit matching accessible name. Its three summary/quality scenarios, all nine mobile scenarios and the pinned-source scenario passed in the final targeted run. The full45 were not rerun after this one-property fix; do not present this as a final45/45 run.

Browsers ran against an isolated production artifact on port4188 using ignored `tmp/mobile-review/playwright.config.ts`, leaving dev5173 available. The local npm wrapper is `tmp/tooling/bin/npm.cmd`; bundled Node is put in PATH for this Windows session. No dependencies or lockfile changes were required by this adaptation.

## Meaningful checks

The nine new mobile scenarios cover selected dashboard/result placement, row values/actions within the viewport, effective checkbox label and Preview destination, removable comparison identities, quality investigation proximity, synthesized touch tap-to-inspect plus vertical scroll, keyboard disclosure/range operation, landscape navigation, visible input text size and axe in both themes at320px. Separate full-suite checks passed all five routes in dark/light at320/768/1440, source maximum pixels, gap rendering, resize/DPR, source revision/inspection, navigation, comparison and history.

Visual inspection used one before batch and one confirmation batch, covering320/390 portrait,768 tablet,1440 desktop and844×390 landscape. Current dashboard before/after measurements at390px: selected result1395→327px; Loss1820→748px; initial page4083→1550px. Geometry/screen captures are in `before/` and `after/`. The later added issue-type overview was also disclosed to preserve the mobile ledger's <650px regression bound.

Touch evidence is synthesized Chromium input (Playwright tap and CDP touchStart/touchMove/touchEnd), not a physical phone. Safari, actual iPhone/Android devices and a full screen-reader session were not tested. These checks do not establish correctness of arbitrary million-point data sets.

## Failures observed and resolved

- The placement test initially failed at selectedY1395px, establishing the original mobile defect.
- One initial test used an ambiguous h2 selector (run name and nested Loss heading). It now targets the run heading by exact accessible name; Preview behavior itself was already visible.
- Concurrent shared-chart/source changes exposed a same-run pinned-source navigation failure; the shared route logic was updated in the parallel work, then the pinned-source test passed. No claim is made that this adaptation authored that core fix.
- A new issue-type overview pushed the mobile ledger to1402px during a later integration run. Its compact disclosure now keeps the investigation near the beginning; the mobile ledger test passed again.
- Summary metric's exact-label test failed; the explicit accessible name fixed it, and the final summary tests passed.
- A concurrent in-progress Worker update temporarily failed TypeScript because issuesQuery/issuesPending were not yet defined. The completed shared update was preserved and the final production build passed. No errors were bypassed.

## Files in this adaptation

New: `src/features/shared/ResponsiveDisclosure.tsx`, `src/styles/mobile.css`, `e2e/mobile-workflows.spec.ts`, `docs/mobile-adaptation.md`, the independent review/confirmation reports and evidence here.

Updated: `DashboardPage.tsx` and dashboard.css; RunsPage.tsx; ComparePage.tsx; QualityPage.tsx; shared Workspace.tsx; charts/MetricPlot.tsx; Arc SearchField CSS; styles/theme.css; main.tsx; index.html. Other concurrent core, Worker, summaries and test additions were preserved. The adaptation did not add backend/auth/import features.

## Impeccable accounting

- Context loader: already run once earlier in the conversation; not rerun.
- Target slug: src-features-dashboard-dashboardpage-tsx; critique ignore.md absent.
- Independent A/B assessments complete; A output finished before B findings entered synthesis.
- Design confirmation: **26/40→30/40**, five initial priority defects addressed; no remaining original P1/P2.
- Deterministic CLI: before0/after0 findings; reuse B's saved results, no redundant parent detector run.
- Browser evidence: A independent native tab + fresh parent exact-size captures; B fresh hidden IAB tab with390×844 viewport.
- Overlay unavailable because documented evaluation is read-only. No live detector server or user-visible overlay claimed. B reset its viewport and closed its tab. No critique-only server remains; automated preview servers stop with Playwright.
- No new suppressions. Existing file-scoped side-tab exception remains for the recorded-step `.issue-strip > a` marker.
- Snapshot written: `.impeccable/critique/2026-11-09T22-43-29Z__src-features-dashboard-dashboardpage-tsx.md`. First stored run for this target, so no stored multi-run trend;26→30 is the independent before/confirmation comparison.
- Temporary snapshot body removed after persistence; retained scripts/configs under ignored tmp are local QA tooling, not shipped application files.
- Questions skipped: the user explicitly requested review and mobile fixes; the approved identity and scope were already established.

No mandatory mobile-adaptation work remains. The global suite result and final targeted result are recorded separately above without claiming a new full-suite green run.
