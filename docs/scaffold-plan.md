# Soup Training Monitor foundation

Scope authorized on 10 November 2026. Read architecture.md, research.md and review.md v2.1 before implementation. Existing documents and generated design references remain intact.

## Decisions

- React 19, TypeScript and Vite, npm and package-lock.json. Node 24.22.1.
- React Router client SPA: /runs and /runs/:runId. The user subsequently explicitly expanded scope to connect all generated pages, adding /compare and /data-quality. The accepted images guide colors, density and branding; unsupported import/export/training controls are omitted.
- Arc Free through its official shadcn registry. Foundation imported once. Tailwind is included because the requested stack explicitly lists it; no second UI kit. Arc metric-card is deliberately excluded: its odometer animates through invented numerical values. Use a semantic definition list for static raw summary values.
- Own a small uPlot React adapter, as requested by architecture §6.6. uPlot owns drawing; React owns lifecycle and an accessible raw-data alternative. No extra React chart wrapper.
- Small deterministic fixtures only. Each loaded run has a module Worker that owns raw columns, returns small copies, echoes activation identity and terminates on cleanup. Detail uses one Worker; the bounded three-run comparison uses three. No million-point sampler claims.
- Unit tests restricted to src/**/*.test.ts; Playwright restricted to e2e/**/*.spec.ts. Real Chromium checks both routes, Worker integration, keyboard, responsive widths, themes, reduced motion and axe. Token contrast tests cover text and chart strokes.

## Work sequence

1. Inspect existing project and official Arc documentation; preserve assets and documents.
2. Bootstrap npm locally if absent, use the official Vite React TS template to verify current compatible versions, install dependencies and the exact Arc Free items required.
3. Write and run failing deterministic fixture / render-contract unit tests and route/browser smoke checks.
4. Implement the small data pipeline, Worker boundary, adapter, two routes, theme and responsive shell.
5. Build, lint, run unit and production-browser tests. Inspect actual screenshots, fix observed problems and save genuine reports.
6. Document commands, versions, assets, results, installation failures and explicit remaining v2.1 work in README and the scaffold report.

No backend, database, auth, import, training control, automatic stop, smoothing, million-point proof or deployment in this stage. Comparison was added only after the user's explicit scope expansion. The user then requested minimal interaction motion and an Impeccable design review. No numerical interpolation animations or decorative chart animation.
