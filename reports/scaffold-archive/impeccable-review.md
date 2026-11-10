# Soup Training Monitor design critique

**Provenance:** dual independent assessments; A completed before B findings entered synthesis. Mode: Operate. Target: src/app/App.tsx and the four routed pages. Existing black/white Soup palette, Arc controls and sparse pixel Kazakh brand detail were preserved. No redesign.

**Baseline: 28/40, Good.** This is the independently scored pre-fix review, not an invented post-fix grade. First critique for this target; no historical trend.

| Nielsen heuristic | Baseline score |
| --- | ---: |
| System status | 3 |
| Real-world fit | 3 |
| User control | 3 |
| Consistency | 3 |
| Error prevention | 3 |
| Recognition | 3 |
| Efficiency | 2 |
| Minimalism | 3 |
| Error recovery | 3 |
| Help | 2 |

All ten apply; maximum 40.

## Specificity and strengths

The restrained near-black/white surfaces, terracotta Soup logo, quiet controls and small generated Kazakh ornament give the otherwise familiar operating layout a coherent product identity. The raw-value inspector, quality deep link and explicit demo snapshots support trust. Four routes remain usable at narrow widths without page-level horizontal overflow.

Cognitive load is low: three destinations, three selected-run choices and three chart actions. The comparison originally forced a visual/color memory bridge; the added per-step table now exposes the same three metrics for each selected run.

## Priority findings and dispositions

1. **P2, fixed:** distinct learning-rate ticks rounded to the same `2e-5` text. Added adaptive scientific precision and a regression test that failed on the old formatter.
2. **P2, fixed:** the first run always had a selected-looking terracotta row. Removed that false state; keyboard focus has a real neutral row context.
3. **P2, fixed:** comparison curves had only hover/visual interpretation. Added keyboard-operable step input and a raw loss/LR/gradient table for every selected run; NaN and absent observations remain explicit.
4. **P2, fixed:** the only documentation link vanished on mobile. Added a compact real Docs link to the narrow header.

Minor copy refinement: renderer and engineering-backlog language was removed from the user-facing chart/quality footer while retaining honest demo scope. Full limitations remain in README and the implementation report.

## Personas and remaining limits

Alex can select runs, reset ranges and inspect a step without a forced tour. Sam now has a comparison value path that does not require color or hovering. Full screen-reader testing and interpreting every Canvas mark remain unverified. The unchanged core direction was confirmed in one post-fix screenshot round; no open-ended polishing loop.

The deterministic detector returned zero findings before and after fixes. Browser checks passed with zero axe violations, but incomplete contrast/manual-review items remain recorded rather than hidden. See the implementation report for exact counts and scope.

Questions skipped: the user had already specified the direction, requested the review during implementation, and authorized the concrete refinements; no unresolved design choice remains. This is a completion record, not a request to restart design discovery.
