# Assessment A — independent design review

Target: `src/app/App.tsx` and four existing routes. Mode: Operate. Read-only review; detector output was neither run nor read. Context launcher ran in parent. One bounded browser capture round used new Playwright Edge pages at 1440×1000 and 390×844, on `/runs`, `/runs/kazakh-sft-003`, `/compare`, and `/data-quality`. Screenshots: `output/critique-a/`. Dark theme inspected live; light theme reviewed in tokens only. No source edits.

**Verdict:** A coherent, credible demo foundation. Keep its current visual direction. The near-black surfaces, terracotta Soup identity, restrained Kazakh ornament, quiet typography, and straightforward chart framing feel intentionally related. The dashboard composition itself is conventional, appropriately so for an operating tool. No redesign is warranted. Four bounded defects below merit fixing; missing million-point functionality is explicitly outside this review.

## Nielsen scores

| Heuristic | Score | Evidence |
|---|---:|---|
| 1. Visibility of system status | 3 | Active navigation, loading/retry states, visible range and demo labels; first-row highlight implies a nonexistent state. |
| 2. Match with real world | 3 | Run/metric vocabulary fits the audience; renderer name and engineering acceptance terms intrude into product copy. |
| 3. Control and freedom | 3 | Back link, clear search, run deselection, reset zoom, error retry. |
| 4. Consistency and standards | 3 | Strong shared shell and controls; arbitrary selected-looking first row. |
| 5. Error prevention | 3 | Native bounded source-step input, disabled irrelevant zoom controls, no destructive actions. |
| 6. Recognition over recall | 3 | Labels and exact-value inspector are explicit; comparison curve interpretation still depends on sight/color. |
| 7. Flexibility and efficiency | 2 | Direct run links, keyboard-operable standard controls, three-run selection; no keyboard equivalent for comparison cursor. |
| 8. Aesthetic/minimalist design | 3 | Strong spacing and restrained ornament; several repeated fixture disclaimers and implementation terms. |
| 9. Error recovery | 3 | Specific source-step validation, chart fallback guidance, retries, unknown-run exit. Source-reviewed, failure states not induced. |
| 10. Help/documentation | 2 | Desktop documentation link and useful inline labels; documentation disappears on narrow screens. |

**28/40 — Good.** All ten apply; no n/a.

## Strengths

- The source inspector and expandable source rows provide a useful alternative to chart hovering. The quality issue links point to the relevant recorded step.
- Clear scope honesty: seeded data and raw/missing-value behavior are stated. No live-training claim is implied.
- Desktop and narrow layouts preserve hierarchy and stay within the viewport (document width equals 1440/390 on all four routes). Horizontal table overflow is contained rather than breaking the shell.

## Prioritized findings

1. **P2 — Learning-rate axis repeats different ticks as the same number.** `/compare`, desktop and narrow screenshots: two consecutive upper Y ticks both read `2e-5`. `src/charts/MetricPlot.tsx:44` uses `toExponential(0)`, collapsing distinct tick values. Use enough significant digits to make adjacent labels unique. This is an actual data-display defect, not a request for more chart features.
2. **P2 — First run looks selected although nothing is selected.** `/runs`, both captures: the first row uses the same large terracotta surface as active navigation. `src/styles/theme.css:121` applies it to `tbody tr:first-child` regardless of run identity, query, or sorting. Remove the permanent highlight, or connect it to a real, labeled state. Otherwise a user can read it as a chosen/recommended run.
3. **P2 — Comparison has no equivalent nonvisual route to the plotted information.** `src/charts/MetricPlot.tsx:88` hides plots from the accessibility tree. On `/compare`, `src/features/compare/ComparePage.tsx:60–66` exposes a hover-only loss readout and only whole-run loss summaries; learning-rate and gradient curves have no exact comparison readout or descriptive equivalent. Screenshot `desktop-compare.png` shows the spike and differing learning schedules that sight supplies. A concise dynamic text summary plus an accessible per-step comparison readout would close this gap without adding production-scale functionality.
4. **P2 — Documentation vanishes at narrow widths.** `src/styles/theme.css:205` hides `.sidebar-bottom`, containing the only docs link in `src/app/App.tsx`. All four narrow screenshots show no replacement access. Keep a compact docs link in the responsive shell or page footer. Existing help should remain reachable on the supported layout.

## Cognitive load and personas

**Low overall, with one localized failure:** comparison interpretation requires bridging the plot, legend, and summaries; recognition/working-memory support fails for nonvisual users. Chunking, proximity grouping, hierarchy, one-decision-at-a-time flow, and progressive disclosure otherwise pass. No actionable decision point exceeds four choices: three primary destinations, three run checkboxes, three chart actions, two sort options. Five table columns are information rather than five simultaneous actions; they do not automatically constitute overload.

**Alex:** Runs open quickly and comparison starts with all three selected; no forced onboarding. The repeated scientific labels slow exact interpretation. Centered zoom and small demo selection are current foundation limits, not release-blocking missing features.

**Sam:** Explicit labels, skip link, native checkboxes, focusable overflow regions and the source inspector are good foundations. Comparison curves remain visual-only, and color is the only connection between a run and its curve. Source navigation lets Sam inspect a single run but imposes a memory bridge to compare three. No claim of full keyboard/screen-reader QA is made from screenshots alone.

**Emotional journey:** The shell gives a calm, trustworthy entry; visible anomaly preservation reassures rather than conceals problems. The useful endpoint is inspecting a source value. Minor valley: this endpoint is followed by engineering backlog language, which distracts from the completed task.

**Minor observation (no new work item):** `RunPage.tsx:61,86` and `QualityPage.tsx` footnotes mention uPlot, dense-gap fallback and acceptance tests. One plain fixture-scope sentence would communicate the same limitation more cleanly.

**Question candidate for parent synthesis:** Should a user be able to understand the comparison's spike and learning-rate differences without hovering or distinguishing the three series colors?
