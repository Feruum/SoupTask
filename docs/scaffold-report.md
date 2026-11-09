# Foundation implementation and verification

Date: 10 November 2026. Existing architecture.md, research.md and review.md v2.1 were read and preserved.

## Delivered

React 19 + TypeScript + Vite foundation; npm lockfile; Tailwind and Arc Free with one foundation import; Lucide; shared black/white Soup shell; working `/runs`, `/runs/:runId`, `/compare`, `/data-quality`; genuine uPlot charts; owned React lifecycle adapter; module Workers and small deterministic source pipeline; separate unit and browser runners; local assets; documentation and raw reports.

The initial scope had only two routes. The user explicitly expanded it to connect all generated navigation pages, then requested minimum interaction motion and an Impeccable review. Comparison and data-quality pages were added under that authorization. No backend, DB, auth, import or training control was added.

## Files

Full created application/configuration/asset list: `../reports/created-files.txt`.

| Area | Created files |
| --- | --- |
| Package/tooling | package.json, package-lock.json, .npmrc, .nvmrc, .gitignore, .oxlintrc.json, components.json |
| App configuration | index.html, vite.config.ts, vitest.config.ts, playwright.config.ts, tsconfig.json, tsconfig.app.json, tsconfig.node.json |
| Shell | src/main.tsx, src/app/App.tsx, src/styles/theme.css |
| UI | src/features/runs/RunsPage.tsx, RunPage.tsx; src/features/compare/ComparePage.tsx; src/features/quality/QualityPage.tsx |
| Chart integration | src/charts/MetricPlot.tsx, axis-format.ts |
| Data | src/data/types.ts, demo.ts, pipeline.ts, compare.ts, format.ts |
| Worker | src/worker/protocol.ts, training.worker.ts, use-run-data.ts |
| Tests | src/data/demo.test.ts, compare.test.ts; src/worker/protocol.test.ts; src/styles/theme.test.ts; src/charts/axis-format.test.ts; e2e/foundation.spec.ts |
| Arc source | 13 official registry files under src/components/arc, including foundation, button, search-field, badge, empty-state, input and motion tokens |
| Assets | assets/soup-logo.svg, kazakh-ornament.png, original kazakh-footer.png reference, README.md, references/*.png |
| Documentation/evidence | README.md, docs/scaffold-plan.md, this report, reports/* |

## Environment and commands

Final checks used **Node 24.22.1**, **npm 12.2.2**, React **19.3.1**, TypeScript **7.0.2**, Vite **8.3.7**, React Router **7.18.5**, uPlot **1.6.32**, Vitest **5.1.0**, Playwright **1.65.0**, axe **4.14.0**. `reports/dependencies.json` contains the actual installed tree. Chromium installation reported Chrome for Testing **158.0.8127.18**, Playwright revision **1254**.

Executed installation/setup equivalents, using the ignored local npm wrapper because npm was missing from PATH:

```bash
npm exec --yes --package=create-vite -- create-vite tmp/vite-scaffold --template react-ts --no-interactive
npm install --save-exact react-router-dom uplot lucide-react @fontsource-variable/inter @fontsource-variable/geist
npm install --save-dev --save-exact tailwindcss @tailwindcss/vite vitest @playwright/test @axe-core/playwright
npm exec --yes --package=shadcn@latest -- shadcn add @uiarc/arc-foundation @uiarc/button @uiarc/search-field @uiarc/badge @uiarc/empty-state @uiarc/input --yes
npm exec -- playwright install chromium
npm run dev
npm run build
npm run lint
npm test
npm run test:e2e
npm ls --depth=0 --json
```

Also downloaded the original Soup SVG, read the requested Arc installation/AI/catalog pages and individual component Markdown, and generated the transparent ornament with built-in imagegen. Official docs confirmed React 19, TypeScript, `@/*`, foundation import, registry URLs and the supported props. No Pro source or second UI kit.

## Actual results

| Check | Result | Evidence |
| --- | --- | --- |
| Production build | Passed, TypeScript + Vite | reports/build.log |
| Lint | Passed with deny-warnings | reports/lint.log |
| Unit tests | **27 passed**, 5 files | reports/unit-results.json, unit.log |
| Chromium browser tests | **7 passed**, 0 failed/skipped/flaky | reports/e2e-results.json, e2e.log |
| Axe | **16 scans, 0 violations** across 4 routes × 2 themes × 320/1440px | Full axe attachments in browser JSON; reports/axe-summary.json |
| Contrast tokens | 20 checked text/control/focus/chart color pairs passed | theme.test.ts, unit results |
| Impeccable detector | `[]`, zero deterministic findings | reports/impeccable-detector-final.json |
| Screenshot inspection | Desktop and narrow views inspected before fixes; light desktop comparison and narrow dark list confirmed afterward | output/critique-a/*; reports/screenshots/* |

The axe output also retains **56 incomplete color-contrast node instances** in the final scan, primarily obscured/overlapping backgrounds and offscreen table cells. These are not violations, and they are not a complete contrast certification. Token tests and screenshot inspection supplement axe; manual assistive-technology and full Canvas interpretation remain outside the executed checks. No incomplete item was filtered out to obtain the passing result.

The browser suite exercises actual Worker-backed render integration, raw loss 8.742 at recorded step 2560, NaN at step 3200, keyboard run navigation/zoom/reset, unknown-run recovery, search recovery, comparison deselection and keyboard per-step comparison, data-quality deep links, responsive overflow, themes and reduced motion. It saves screenshots for all routes in both themes and widths. It does **not** establish million-point correctness, all possible data races, full keyboard usability, Canvas pixel correctness or a production SHIP decision.

## Preserved failures and corrections

- Initial Node resolution under the elevated shell used 24.18.0, yielding engine warnings. The local npm wrappers were changed to use the exact bundled Node 24.22.1.
- First Arc installation failed because npm's extracted Windows shim expected `bin/node_modules/npm`. A project-local ignored wrapper fixed that path; official Arc installation then succeeded.
- Initial build exposed incomplete uPlot selection typing, Node-vs-browser TS lib separation, and unsupported `@fontsource-variable/*/latin.css` imports. These were corrected against installed types/package exports. Initial output is retained in `reports/build-initial.log`.
- Initial lint found effect-state and semantic-region issues. State resets moved to explicit retry actions; native sections/outputs were used. Three narrowly documented lint exceptions report external uPlot/Worker construction failures; no contrast checks were disabled. Initial lint output is retained.
- Test-first fixture work produced 3 expected failures before implementation; comparison alignment and duplicate-axis-label regressions each produced another expected failure. `unit-red.json`, `comparison-red.json`, `axis-label-red.json` preserve these.
- A premature browser attempt began while Chromium was still installing; it failed and left its preview process. The task-owned session was stopped before rerunning. A separate attempt correctly refused to reuse occupied port 4173.
- First complete browser run: 3 passed / 4 failed. Axe identified invalid `<dl>` children and accessible names that omitted visible link text. Markup and names were fixed, not suppressed. `reports/e2e-initial.json` and `reports/first-browser-run/` preserve that run.
- Initial image integration incorrectly rendered a screenshot crop. It was replaced with a generated standalone transparent ornament; original reference retained unused.
- An intermediate build warned about a >500kB JS chunk. Route-level lazy loading removed that warning. No performance benchmark is inferred from bundle size.

## Impeccable review

Two isolated assessments ran: an unanchored visual review and independent detector/browser evidence. Assessment A completed before the parent read Assessment B findings. Baseline review **28/40**, Operate mode; the intended visual world was retained. Four P2 issues were fixed in one bounded pass: distinct LR ticks had identical labels; first row implied selection; comparison lacked a keyboard exact-step alternative; mobile hid documentation. The original scores were not fabricated into a higher post-fix score.

Read `reports/impeccable-assessment-a.md`, `impeccable-assessment-b.md` and `impeccable-review.md`. Browser detector overlay was unavailable because the CUA evaluate surface is read-only; no injection or visible overlay is claimed. The app dev server remains running at 5173 because the user asked for access. No review-only server remains running.

## Remaining work

This is a runnable demo foundation. The full v2.1 take-home still needs 20 scenarios, duplicate/conflict normalization, segment-aware sampling, one-million-point bounded ownership/payloads, dense topology fallback, controlled async race matrix, actual Canvas/axis visual contracts and negative controls, CPU×4 performance traces and before/after measurements, scoped memory evidence, locale/timezone tests, Lighthouse/manual access checks, deployment and the submission note. Current smoke/unit checks are not proof of those properties.
