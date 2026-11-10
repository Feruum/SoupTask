# Impeccable: Soup mobile review

Method: dual-agent (A: `/root/mobile_design_review` · B: `/root/mobile_detector_review`). Independent source/visual assessment and detector/browser assessment; A finished before the parent read B. Scope: Dashboard, Training runs, Run detail, Compare, Data quality. Primary target: `src/features/dashboard/DashboardPage.tsx`.

## Design specificity

Soup's circular experiment map, experiment tree, source links, burnt orange/teal/ochre/purple palette and restrained pixel ornament form a coherent identity. Preserve the desktop three-column composition. The original mobile implementation copied desktop reading order too literally, placing secondary visualizations and entire tables before the results users needed.

The deterministic detector returned **0 findings before and after**. This did not contradict the design review: the principal problems were mobile task order, target sizes and proximity between an action and its result.

## Heuristic scores

All ten heuristics apply to this operational product. Scores are design judgments, not a certification.

| Heuristic | Before | Confirmed after | Evidence |
|---|---:|---:|---|
| Visibility of system status | 3 | 3 | Selected runs, source counts and loading/refresh status remain explicit. |
| Match with real world | 3 | 3 | Run/metric/source vocabulary; removed Worker ownership from ledger instructions. |
| User control and freedom | 3 | 3 | Clear filters, edit/remove selection, native disclosures, back links and reset remain. |
| Consistency and standards | 3 | 3 | Shared surfaces, theme tokens, tabs and persistent navigation. |
| Error prevention | 3 | 3 | Four-run limit, source revisions and numeric range validation preserved. |
| Recognition rather than recall | 2 | 3 | Comparison identities visible; row actions and values grouped. |
| Flexibility and efficiency | 2 | 3 | Selected dashboard result, preview and quality ledger are reachable immediately. |
| Aesthetic and minimalist design | 2 | 3 | Secondary mobile content uses disclosure; desktop instrument composition preserved. |
| Error recovery | 3 | 3 | Existing retry, stale-source and explicit invalid-selection paths retained. |
| Help and documentation | 2 | 3 | Touch-specific guidance and table swipe cues; Docs remains available. |
| **Total** | **26/40** | **30/40 — Good** | No score of 4 is claimed from this bounded review. |

## Priority issues and completed fixes

1. **P1 — Runs hid essential values/actions in wide columns.** Mobile rows now place status, latest Loss, step, quality, comparison selection and Preview together. A 44px label enlarges the effective checkbox target. Preview opens the compact panel above the collection, scrolls it into view and focuses its heading. Search remains immediate; secondary filters/sorting disclose. Desktop table remains available. Relevant command: Impeccable adapt.
2. **P1 — Dashboard selected result followed the full map and tree.** Mobile now presents run selection → selected facts/actions → actual Loss. Map, groups, findings and history remain available through disclosures. At 390px selected-run top moved from **1395px to 327px**; Loss top from **1820px to 748px**. Initial page height fell from **4083px to 1550px**. Relevant commands: adapt/layout.
3. **P1 — Quality investigation followed twenty matrix rows.** The full matrix is disclosed, with a swipe cue and sticky run identity. Ledger controls appear around **497px** from the top at 390px. Issue records keep metric, step, source, raw value and inspection action together. Relevant command: adapt.
4. **P2 — Compare showed a count while hiding selected identities.** Removable selected identifiers appear first. Edit comparison runs discloses the chooser and static context. Chooser height at 390px dropped from **553px to 72px** in its initial state. Full raw summaries remain available. Relevant commands: adapt/clarify.
5. **P2 — Small phones stretched summaries and clipped tabs.** Summaries stay in concise pairs at 320px; section tabs use two-by-two layout; inputs/selects use 16px text; secondary interactive targets receive 44px areas. Landscape touch uses compact reading order and bottom navigation. Touch charts support tap-to-inspect and native vertical page scrolling, with explicit range controls. Relevant commands: adapt/clarify.

All five original priorities were addressed in the single implementation batch and bounded confirmation. Final confirmation by A is in `confirmation-a.md`; B's post-fix detector record is in `confirmation-b.md`.

## Cognitive load, emotional journey and personas

The initial review found five cognitive-load failures: mobile focus, hierarchy, visible choice burden, working-memory demands and progressive disclosure. The corrected order removes mandatory travel through secondary content, shows the current comparison identities and keeps actions beside their values. The analytical task itself remains complex; the interface keeps source facts, invalid values and provenance explicit.

The desktop's confident first impression is preserved. Mobile users now reach the result promised by a selection before entering secondary context. Source links and unchanged numeric values continue to support trust.

- **Casey, mobile user:** primary controls are larger; values/actions no longer require sideways travel through run rows; preview and investigation have visible destinations.
- **Alex, power user:** search, URL selection, keyboard range controls and source inspection remain intact; less scrolling is required to inspect the chosen run.
- **Sam, accessibility-dependent user:** native disclosures, labeled selectors, keyboard controls and exact tables remain. Automated axe and keyboard tests complement visual review; full screen-reader and physical-device behavior are outside the evidence collected.

## Intentional design retained

The radial sectors and activity squares remain dense data marks. Mobile run/metric selectors and the history date field provide larger alternative controls; marks were not enlarged into overlapping hit areas. Wide raw comparison/matrix tables retain their two-dimensional structure with visible swipe guidance. Ordinary vertical browsing through twenty mobile run records remains; search and filters narrow that list.

No new rule suppressions were added. The existing narrow `side-tab` exception for `.issue-strip > a` in `src/styles/theme.css` remains: its 2px border is a recorded-step issue marker linked to source data, not a decorative card stripe.

## Evidence and limits

Before/after captures and geometry: `reports/mobile-review/before/` and `after/`. Portrait widths 320 and 390, tablet 768, desktop 1440 and landscape 844×390 were inspected in Chromium. Browser tests separately exercise actual synthesized touch events, tap-to-inspect, vertical swipe scrolling, keyboard controls and axe in both themes. Physical iPhone/Android devices, Safari and a full assistive-technology session were not tested. The detector overlay was unavailable through the documented read-only browser evaluation surface; no live-server overlay or user-visible injection is claimed.

Questions skipped: the user already authorized the mobile fixes and review; scope and approved visual identity were established in the conversation.
