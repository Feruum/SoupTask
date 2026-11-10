# Soup Training Monitor

A React + TypeScript + Vite SPA using Arc UI Free, Tailwind CSS, Lucide and real uPlot charts. This is a small integration foundation, not the completed million-point take-home task.

## Run locally

Tested with **Node 24.22.1** (see `.nvmrc`) and **npm 12.2.2**. Use a normal Node installation that includes npm.

```bash
npm ci
npm run dev
```

Open http://localhost:5173/runs. Vite binds to `127.0.0.1`, uses port 5173 and fails rather than silently changing ports. `npm run preview` serves the production build on port 4173.

```bash
npm run build
npm run lint
npm test
npx playwright install chromium
npm run test:e2e
```

Playwright starts and stops its own production preview on 4173. Build before running it. Leave that port free. Development on 5173 can remain running. `npm run test:watch` runs Vitest interactively. Unit tests only match `src/**/*.test.ts`; Playwright only matches `e2e/**/*.spec.ts`.

## Pages

- `/runs`: searchable fixture list and numeric latest-loss sorting.
- `/runs/:runId`: raw loss chart, keyboard zoom/reset, exact source-step inspection and paginated raw rows for all three metrics. Unknown IDs have an explicit recovery state.
- `/compare`: select the three fixtures, compare real loss/LR/gradient-norm curves, shared step range and raw summary table. This was added after the user explicitly expanded the initial two-route scope.
- `/data-quality`: small source audit and a link directly to the injected NaN observation.

Sidebar links are real routes. Black and white themes share Soup's terracotta brand. The theme stays selected during SPA navigation and resets to dark on a full reload. Data is labelled as demo snapshots, not live training.

## Architecture and components

`src/data/` contains deterministic seeded generation, raw-derived summaries and a narrow plot-data conversion. Fixture sizes are 384 and 512 observations (1,408 total), capped at 2,048 per run. NaN/Infinity become explicit plot gaps; original typed-column values remain available to the inspector. Unsorted/duplicate X is rejected, not silently normalized. Zero remains a valid zero.

`src/worker/` contains a module Worker and typed request/reply boundary. Workers own raw Float64 columns and transfer disposable small copies. Success and failure replies carry run, revision and activation identity; obsolete Workers are terminated. Detail mounts one Worker; the small comparison mounts three. Large raw arrays are not supported by this scaffold.

`src/charts/MetricPlot.tsx` is the owned React integration for uPlot: create, `setData`, `setScale`, `ResizeObserver` + `setSize`, observer/listener cleanup and `destroy`. Theme changes recreate the instance to update Canvas colors. Ordinary data/range updates reuse it. StrictMode is enabled. This is the requested React adapter; no separate `uplot-react` dependency is needed.

`src/app/` owns routing and the shared shell. Routes load lazily. `src/styles/theme.css` supplies semantic light/dark tokens and responsive layout. Tailwind is installed because the requested stack explicitly includes it; Arc itself uses CSS modules. Arc foundation is imported **once**, in `src/main.tsx`. TypeScript and Vite both map `@/*` to `src/*`.

Only these Arc Free components were installed from the official registry: `button`, `search-field`, `badge`, `empty-state`, `input`, plus foundation and their motion-token dependencies. `components.json` configures the official registry for the shadcn CLI. No second full UI kit or Pro components. `metric-card` was deliberately excluded because its documented odometer animates numbers through intermediate values. Raw metrics use plain semantic text.

Minimal motion is limited to sidebar selection, button feedback, the theme icon and page headings. Graphs and measured numbers do not animate through fabricated values. Reduced motion removes the custom movement; Arc controls receive the user's reduced-motion preference.

## Assets

- `assets/soup-logo.svg`: original downloaded Soup logo, unchanged, using its original color.
- `assets/kazakh-ornament.png`: generated standalone RGBA ornament with real alpha transparency. Used by the sidebar; there is no black screenshot tile. Footer wording is real HTML text.
- `assets/kazakh-footer.png`: supplied screenshot reference only; not rendered in the interface.
- `assets/references/`: all six generated visual references. These PNGs guide the design and are not imported into the application bundle.

See `assets/README.md` for the image-generation brief and source provenance.

## Checks and actual evidence

Real command output and JSON reports live in `reports/`; `docs/scaffold-report.md` records versions, commands, initial failures, fixes and remaining work. Initial failed unit results and the first axe failures are retained separately. The final browser report contains attached full axe results, including incomplete/manual-review items; an empty violations array is not a complete accessibility certification.

The browser suite checks navigation, actual uPlot mounting, a raw spike value, source inspection, search recovery, missing data, comparison selection, keyboard zoom, theme variants, reduced motion and 320/1440px layouts. Token tests check text, controls, focus and actual chart-stroke colors. Browser tests use the production build.

Smoke tests **do not prove that a million-point spike is visible**. They do not certify Canvas pixels or screen-reader usability. A Playwright test trace is not a Chrome CPU×4 performance trace and is never labelled as one here.

## Remaining task work

The v2.1 documents remain the full-task contract. Still pending: all 20 scenarios; duplicate/conflict normalization; segment-aware first/min/max/last sampling; million-point ownership and bounded payloads; adversarial same-revision/viewport/hover races; actual Canvas/axis/marker assertions and negative controls; CPU×4 before/after traces, memory accounting and browser-memory evidence; locale/timezone matrix; Lighthouse and manual assistive-technology checks; deployment and submission note.

No backend, database, login, import, training execution or automatic stop endpoint is included. Smoothing and logarithmic scale are absent. Configuration/logs/export controls from illustrative images are not fabricated. Static hosting must fall back unknown application routes to `index.html` for direct SPA navigation; deployment is not configured in this stage.

## Tooling note

This desktop environment had Node but no usable npm on PATH. A local, ignored npm bootstrap from the official npm registry was used under `tmp/tooling/`. The first Arc CLI attempt failed because the extracted npm Windows shim expected a different installation layout; it succeeded after adding local wrappers that explicitly invoke the bundled Node. An early shell also resolved Node 24.18.0 and produced engine warnings; subsequent install/check commands explicitly used 24.22.1. These wrappers are environment-specific, not needed with a normal Node/npm installation.
