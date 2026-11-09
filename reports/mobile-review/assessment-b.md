# Assessment B — detector and browser evidence

Status: completed before implementation changes. Assessment B remained isolated from Assessment A and prior critique reports. Implementation files were read only; only this report and detector stdout were written. Target: `src` in `C:/Users/Ferumm/projects/soupTask`.

## Deterministic detector

Executed exactly once:

```text
C:/Users/Ferumm/.agents/skills/impeccable/scripts/impeccable.cmd detect --json src
```

Exit code: **0**. Stdout: **[]**. Total deterministic findings: **0**. Rule counts and file locations: none returned. Raw stdout is saved at `reports/mobile-review/detector-before.json` (valid UTF-8 JSON). This is a clean result for this detector's rules, not proof of mobile usability. CSS evidence below was inspected manually and is not attributed to the detector. The markup target was the source directory, not a CSS-only file. Ignore file `.impeccable/critique/ignore.md` was absent.

## Browser method and limits

Created a fresh hidden IAB tab specifically for B. Used a temporary browser viewport of **390 × 844** and visited all five requested routes. Browser rendering had `innerWidth = 390` and document client/scroll width **375 px** (15 px reserved by the visible vertical scrollbar). All five routes stayed at document scroll width 375 px, so no page-level horizontal overflow was observed at this size. Screenshots were viewed through native CUA; the parent is independently saving its own before screenshots.

The available Playwright `evaluate` API is explicitly **read-only**. The documented browser surface supplies no mutable script-injection operation. Therefore mutable preflight (changing title and appending a script), the detector overlay, `[Human]` presentation, and `detect.js` injection were unavailable. No attempted workaround or injection was used. No detector live server was started, so there is no server to stop. Browser remained hidden throughout. Fallback evidence: native screenshots, accessibility state, read-only DOM geometry/computed CSS, source inspection, and console log inspection. The temporary viewport was reset and B's tab closed. Console errors/warnings captured at the end of the five-route inspection: **0**. This was one bounded review, not a complete touch/gesture or keyboard test.

## Route evidence

| Route | Observed at 390 × 844 | Geometry and source evidence |
|---|---|---|
| `/dashboard` | Heading, full-width metric controls, experiment map, and fixed four-item bottom navigation fit the screen. The radial map dominates the first screen. | SVG sector bounding boxes sampled around **21–42 px**, below a comfortable 44 px touch target. Separate experiment/metric selectors exist below the map, and a table is in a collapsed disclosure. `ExperimentMap.tsx:82`, `:91`, `:92`; `dashboard.css:17`, `:34`, `:113`. |
| `/runs` | Header, summary cards and filters fill the first screen; run table lies below. | Table **896.55 px** inside **342 px** `.table-scroll` with `overflow-x:auto`. Compare checkbox is **18 × 18 px**, run link about **85–88 × 15.2 px**, Preview button **77.9 × 36 px**. `RunsPage.tsx:52` has a bare checkbox inside a table cell (no larger wrapping label). |
| `/runs/kazakh-sft-005` | Run identifier, metadata and four metric summaries wrap cleanly. All section tabs fit at this viewport. | Three plot hosts each **333.6 px** wide. Chart highlight buttons measured **129.4 × 36 px**. `theme.css:305`; `Workspace.tsx:160`. |
| `/compare?runs=kazakh-sft-005,kazakh-sft-006` | Selected-run list and its search dominate the opening screen; list scrolls inside its own 220 px region. Charts are lower down. | Plot hosts each **333.6 px**. Summary table **649 px** inside **342 px** scroll wrapper. Visible-metric Loss tab **30.54 × 44 px**; highlight buttons **36 px** high. The checkbox's 18 px box is inside a full `.run-checkbox` label of minimum **64 px** height, so its input rectangle alone is not the effective tap target. `theme.css:165`, `:273`, `:301`; `ComparePage.tsx:56`. |
| `/data-quality` | Initial matrix view shows Run and Loss, plus part of Learning rate; later metrics/structural columns are horizontally outside the initial view. | Matrix **837.56 px** inside **342 px** scroll wrapper. Quality cells **48.8 × 36 px**; run links roughly **99–103 × 16.8 px**. `QualityPage.tsx:41–45`; `theme.css:295`. |

## Confirmed mobile concerns for synthesis

1. **Small targets in the primary run-selection workflow.** The runs table uses bare 18 px compare checkboxes, very short run links, and 36 px Preview buttons. Selecting runs is the gateway to comparison, and the first column's checkbox has no larger associated label. Increase the effective clickable area to at least 44 px and make the run-opening action a roomy control. Source: `RunsPage.tsx:52`; `theme.css:262`; `button.module.css:30`.
2. **Wide analytical tables require substantial horizontal travel.** Runs, comparison summaries and the quality matrix use correctly contained horizontal scrolling, but the quality screenshot presents only a small part of the matrix with no visible scroll instruction. Preserve semantics and values while adding a mobile presentation that keeps run identity and actionable findings readily available, or at minimum a visible scroll cue and sticky first column. Source: `theme.css:115`; `QualityPage.tsx:41`; `ComparePage.tsx:56`; `RunsPage.tsx:52`.
3. **Repeated secondary analytical actions remain smaller than 44 px.** Highlight-series controls are 36 px high across run/detail comparison charts; quality cells are 36 px high; the Loss metric tab is only 30.54 px wide. These should receive larger hit areas at the mobile breakpoint. Source: `theme.css:273`, `:295`, `:305`.

The experiment map's many narrow SVG sectors and the compact history grid are dense data visualizations with alternative controls. Avoid mechanically enlarging the marks until they overlap. Prefer a mobile-friendly selector/summary immediately adjacent to the visualization; retain the exact visual encoding and source counts. The existing map selectors and history date picker mitigate the small-mark concern. Source: `ExperimentMap.tsx:91`; `RunHistory.tsx:56`; `theme.css:334–341`.

## False-positive and measurement triage

- The first raw overflow query reported the dashboard's **1,140.6 px** accessible table. It is inside a **closed `<details>`**, so it is not visible page overflow and must not become a finding.
- The `.group-model-label` connector pseudo-element creates approximately **15 px** apparent scroll overflow in a label. It is intentional graph connective decoration, not document overflow.
- Screen-reader-only legends/spans have large scroll widths within a 1 px box by design. Do not count them as layout breakage.
- Search inputs measured only **21 px** high internally. Their surrounding shell is a full-height control and the screenshots show normal fields. Do not report the input child rectangle alone as a small search target.
- Comparison checkboxes have larger clickable `<label>` rows (`.run-checkbox`, min-height 64 px); the 18 px native box is a false positive for effective hit area there. This does not apply to the bare runs-table checkboxes.
- A table wider than its viewport is not page-level overflow when contained by `.table-scroll`. The practical issue is mobile discoverability and repeated sideways movement, not broken containment.
- No deterministic false positives exist because the CLI returned no findings. The above are manual geometry triage items.

## Execution accounting

- Assessment independence: preserved; no A or prior critique report read.
- Target slug/persistence: parent-owned; not rerun here.
- Deterministic detector: completed once, exit 0, full JSON saved, no truncation.
- Browser: fresh B-only tab, five required routes, native screenshots/read-only measurements.
- Visibility: hidden; no user-visible overlay claimed.
- Overlay preflight/injection: unavailable under documented read-only evaluate contract.
- Live server: not started; cleanup not applicable.
- Browser cleanup: viewport reset, B-only tab closed, CUA completion recorded.
- Temporary files: none created; report and raw detector output are deliverables.
- Implementation edits: none.
