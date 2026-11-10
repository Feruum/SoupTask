# README media

`soup-cover.png` is a new README-only brand illustration, generated with the built-in image_gen tool on 10 November 2026. The original 2172×724 raster is preserved without bitmap editing. Its palette and Kazakh ram-horn pixel geometry continue the existing piala/recipe/ladle family. It is not a screenshot and does not replace the original Soup logo. The complete prompt is in [soup-cover.prompt.txt](soup-cover.prompt.txt).

The six screenshot files are unmodified copies of actual release browser captures, recorded 10 November 2026 in `reports/perf-targets-2026-11-10/final-browser/results.json`. They are not generated interface mockups.

| README file | Original under `reports/perf-targets-2026-11-10/final-browser/artifacts/` |
| --- | --- |
| `monitor-dark.png` | `acceptance-dark-1440px-fiv-44e33-e-and-responsive-acceptance/-dashboard.png` |
| `monitor-light.png` | `acceptance-light-1440px-fi-d9346-e-and-responsive-acceptance/-dashboard.png` |
| `monitor-mobile.png` | `acceptance-dark-320px-five-0084d-e-and-responsive-acceptance/-dashboard.png` |
| `training-runs.png` | `acceptance-dark-1440px-fiv-44e33-e-and-responsive-acceptance/-runs.png` |
| `compare.png` | `acceptance-dark-1440px-fiv-44e33-e-and-responsive-acceptance/-compare-runs-kazakh-sft-005-kazakh-sft-006.png` |
| `data-quality.png` | `acceptance-dark-1440px-fiv-44e33-e-and-responsive-acceptance/-data-quality.png` |

The README switches the Monitor screenshot with the reader's preferred color scheme and offers direct links to both themes. All images have repository-relative paths, so the README does not depend on a temporary local server or an external image host.

The main README also reuses the existing transparent piala, recipe, ladle and ornament files, plus the original Soup SVG logo. Their separate provenance remains in [the asset catalog](../README.md).

## README icons

`soup-icons/` contains 12 original PNG icons generated individually with the built-in imagegen tool on 10 November 2026. They replace the rejected Lucide exports in the README. Each uses a transparent background, stepped pixel silhouettes, Soup terracotta/copper, cream and restrained teal, with Kazakh ram-horn details.

The family includes a monitor with a piala, a starting ladle, recipe card, chart in a spoon, data stockpot, verification shield, code chip, stacked dishes, phone with a piala, launch arrow in a bowl, spice palette and rising steam. The original generated rasters are copied unchanged; no bitmap cropping, recoloring or compositing is applied.

The README renders them at 24–32px beside real text. Empty image alt text avoids repeating adjacent labels. [View the complete icon gallery](soup-icons/README.md) and [the exact generation prompts](soup-icons/prompts.json). They are local assets and require no icon service. The application itself still uses its existing interface libraries; this replacement is scoped to README artwork.
