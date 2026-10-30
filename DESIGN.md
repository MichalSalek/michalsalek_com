# Design constraints

This refresh keeps the existing white canvas, indigo palette, square geometry,
readable typography and photography. A new visual identity and replacement images
are a separate step.

## Style policy

- Use the existing palette in `src/UI/styles/constants.ts` and the CSS variables in
  `src/UI/styles/globals.scss`. Keep text contrast clear in both languages.
- Use the locally hosted Mona Sans family with system fallbacks.
- Reserve image geometry before loading. Only the first visible card or article
  hero gets loading priority. Generate responsive WebP files at build time.
- Keep links as links and actions as buttons. Do not nest interactive elements.
- Header controls must fit at 320px. Controls have at least 44px touch targets.
- Preserve the software-first homepage. Sound services remain under `/sound/`.
- Keep every public paragraph and language link in the initial static HTML.
- Use restrained interaction transitions, flat surfaces and no decorative shadows.

Check the production export on mobile and desktop after changing shared styles.
