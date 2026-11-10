# Soup visual assets

`soup-logo.svg` is the original file retrieved from https://souplanding-omega.vercel.app/soup/logo.svg. It is not an AI recreation.

`kazakh-ornament.png` was generated with the built-in imagegen tool from the supplied pixel ornament as a visual reference. It is a 2172×724 RGBA PNG. Its alpha channel ranges from 0 to 255, verified using Pillow. It replaces the initial, incorrectly embedded screenshot crop.

Generation brief: a standalone transparent pixel-art Kazakh koshkar-muiz double ram-horn ornament for Soup; angular mirrored curling horns, central upright motif and a few square flecks; terracotta #C0512D with darker #713822 accents; flat pixel colors, sparse composition, landscape 3:1; no text, black rectangle, frame, screenshot, UI, glow or baked checkerboard. Real HTML supplies the footer wording. Rendered unchanged, no post-generation bitmap editing.

`kazakh-footer.png` preserves the original user-supplied screenshot as reference. It is not used by the running interface.

`references/` contains the six previously generated desktop design references: run list, detail and comparison in dark and light themes. They are visual direction, not required feature inventories or test evidence.

## Soup illustration family

Three standalone assets were generated with the built-in imagegen tool, using `kazakh-ornament.png` as the pixel-geometry and palette reference:

- `soup-piala.png`: Kazakh ceramic sorpa bowl with a ram-horn band and angular steam. Used in empty run searches and measurement loading.
- `soup-recipe.png`: folded recipe sheet with a Kazakh ornament and abstract ingredient marks. Used beside the existing Run information metadata.
- `soup-ladle.png`: copper ladle with an ornamental handle. Used when the selected data-quality filters return no findings.

All three are unmodified 1254×1254 RGBA PNGs. Each has transparent corners and an alpha range of 0–255, checked using Pillow. No background was composited into the files. The full generation prompts and built-in mode are recorded in `soup-illustrations.prompts.json`.

The originals remain unchanged. The application now serves nearest-neighbor128/256/512px derivatives from `ui/` through srcset rather than decoding1254px art for small controls. `scripts/build-ui-art.mjs` and `assets/ui/manifest.json` record deterministic sizes and source/derivative hashes. This technical resize preserves the pixel artwork and transparency; it is not new generated artwork. The memory investigation records the native raster-cache effect separately from natural process memory.

`SoupArt.tsx` displays them as decorative images with empty alt text; the neighboring real headings retain the meaning of each state. Only the piala's steam region moves during loading, using two CSS-clipped render layers of the same original image. Reduced motion shows a static image. Charts, metric values and data handling are unchanged by this integration.

## README artwork

`readme/soup-cover.png` is a new wide pixel-art cover generated with built-in imagegen for the repository README. It brings the sorpa bowl, ladle, recipe and Kazakh ornament together on a warm near-black background. It is brand artwork, not a generated application screenshot. The original logo is retained separately. The full prompt and unmodified real release screenshots are documented in [readme/README.md](readme/README.md).
