# Asset library

Original source media, contextual illustrations and reusable reserves for the site.
The [asset index](INDEX.md) lists dimensions, credits and current placements.

Run `npm run assets:preview` to browse the library at http://localhost:4325.
Run `npm run assets:catalog` after changing the catalogue or media plan.

`catalog.json` records each source, its origin, credit and English/Polish alt text.
`src/content/media-plan.mjs` selects cards and article paragraphs by asset ID.
The build exports only selected assets. Reserves stay in the repository and do not
increase the published website payload.

Photographs have responsive, high-quality derivatives for their display size and
pixel density. Card derivatives use lossless WebP; larger photographs use WebP at
quality 94. Raster illustrations use lossless WebP. Source files are never upscaled.
Small inline illustrations have SVG versions for sharp rendering at any density;
their earlier raster versions remain available as reserves.

Generated photographs depict illustrative scenarios, not delivered client projects.
Stock images retain their existing credits. The low-resolution legacy planning
photograph is a reserve and should not be enlarged. The former frontend and
wireframe photographs with hands have been excluded. The legacy backend workspace
is retained as an approved fallback.

Keep new media tied to a specific service or paragraph. Avoid adding copy solely
to make room for an unrelated image. Keep photographs free of people and server
equipment, and illustrations in the indigo/grey palette.
