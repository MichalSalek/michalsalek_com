# Design constraints

The owner's original design at commit `b5ed0e1` is the visual reference. Keep its
indigo cards, square geometry, typography, spacing, subtle photo credits, bordered
Read More control with arrow, contrast-based card hover, article link panels and
two-column contact form. Keep the original header treatment and button shadows.
Do not replace these with a new visual system during content or tooling changes.

The October 2026 refresh adds static English/Polish routes, accessible navigation
and reliable contact handling. These changes must respect the original appearance.

- Preserve the delayed three-pulse subject highlight after a service CTA, the
  page transition and the contact feedback/OK interaction. Start the cue only
  when its input is fully visible; use a static cue with reduced motion.
- Keep the introduction structured with a clear heading, readable emphasis and
  deliberate desktop/mobile composition. Two bare paragraphs are insufficient.
- Keep six main software cards, followed by a separate row with full-stack
  engineering and sound services, in that order. Preserve the original cards.
- Service illustrations are sparse and context-specific on a light neutral
  background. No large indigo fields, diagonal backdrop divisions, gradients,
  blurred effects or clay-like rendering. The former C + E treatment was rejected
  after publication: its backdrop was too strong and its interface examples
  looked interactive. Software articles currently use text without those heroes.
  Replacement article artwork requires review in the real page layout before
  publication.
- Article content has at most three main sections. Paragraph indentation is 2rem,
  shared through `.article-copy`. Headings and sublines make sense independently.
- No card movement on hover. Preserve the original contrast/saturation effect.
- Photo credits stay at the top right, 6px, without a background panel.
- Breadcrumbs retain Sitemap, Home, the category and the current page. Keep the
  original 12.8px uppercase type (Roboto/Helvetica/Arial fallback), dark neutral
  text, slash separators and bold unlinked current item. Breadcrumbs must not
  inherit the brown body text or the page typography font stack.
- The homepage presents the implementation company, without a personal profile
  or links to source-code profiles.
- Keep real links and buttons, with no nested interactive elements.
- Keep meaningful text and language links in the initial static HTML.
- Reserve image geometry. Prioritize only the first visible card or article hero.
- Generate software artwork with `npm run generate:visuals`, using the shared
  palette and localized descriptions. SVG URLs contain content hashes.
- The full-stack page uses a concise technical reference format: technologies,
  architecture and delivery practices, without a personal biography, marketing
  claims or code dumps. Stack tables become labelled rows on small screens.
- Keep the existing system font fallback; do not load additional fonts.
- Fit header controls and content at 320px without horizontal scrolling.
- Preserve the software-first homepage and separate `/sound/` services.
- Verify desktop, mobile, hover, contact and article layouts against the original
  export after changing shared components. Content improvements are not approval
  to redesign established components.
