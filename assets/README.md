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

`SoupArt.tsx` displays them as decorative images with empty alt text; the neighboring real headings retain the meaning of each state. Only the piala's steam region moves during loading, using two CSS-clipped render layers of the same original image. Reduced motion shows a static image. Charts, metric values and data handling are unchanged by this integration.
