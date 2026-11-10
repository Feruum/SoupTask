# Approved dashboard redesign

Implement `output/imagegen/04-dashboard-dribbble-v2-dark.png`, approved by the user with “работай”. Scope: dashboard presentation and small source-derived view helpers. Preserve the shared shell, routes, source pipeline, run-history component and keyboard/source-inspection capabilities.

1. Add tested metadata grouping and finite-observation tile-count helpers. No fabricated data points or radial randomness. Tiles summarize finite row counts on a logarithmic scale; metric findings remain labelled separately.
2. Replace the dashboard's large KPI row and spaced cards with an inline summary, dominant radial mosaic, compact group/selected-run/loss column and findings rail. Use existing `useWorkspace` and `Charts` for genuine raw Loss rendering.
3. Keep original radial keyboard selection, selectors, exact-count table, source finding totals and RunHistory. Add styles scoped to the dashboard; adapt the same composition for white theme and narrow layouts.
4. Verify helpers, build/lint and focused browser interactions. Capture desktop/mobile in both themes, inspect the result against the approved image, and fix observed issues in a bounded confirmation pass.
