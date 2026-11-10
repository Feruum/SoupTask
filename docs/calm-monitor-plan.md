# Approved calm monitor

Implement `output/imagegen/05-monitor-calm-v3.png`, approved by the user. Scope: Dashboard presentation, run navigator, view navigation and mobile adaptation. Preserve shared source ownership, Worker pipeline, uPlot, exact data, source routes, map/group selection and run history.

Use Monitor / Experiment map / Groups query-backed views. Monitor has a small searchable navigator, selected-run heading, four inline source facts, one actual metric chart, concise selected-source quality, a workspace quality link and disclosed details/history. All numeric values come from the current catalog/accepted view, including explicit invalid/conflicting latest states. The raster is a visual reference; its illustrative run metadata is not copied into data.

On narrow/tablet widths the run navigator discloses, the result remains first, facts reflow into pairs, and controls retain 44px effective areas/16px input text. Landscape touch follows the existing compact-layout rule. Both themes remain supported.

Verify new layout, all-catalog search, filters, unchanged selected data after empty search, run/metric changes, tab/back behavior, map keyboard/source navigation, range settings, real spike pixels, mobile touch and axe. Update old dashboard expectations to the newly authorized information architecture. Use a separate preview build for QA so other work does not mutate the tested artifact. Inspect desktop/mobile in one batch; make one correction pass only for observed issues.
