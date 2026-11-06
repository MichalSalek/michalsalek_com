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
  The final row starts in the same first and second columns as the rows above;
  retain empty grid columns instead of centering its two cards as a separate group.
- Service illustrations are sparse and context-specific on a light neutral
  background. No large indigo fields, diagonal backdrop divisions, gradients,
  blurred effects or clay-like rendering. The former C + E treatment was rejected
  after publication: its backdrop was too strong and its interface examples
  looked interactive. Use the approved mix of contextual photographs and indigo
  illustrations. Media must explain the adjacent paragraph; avoid filler and
  unrelated visual metaphors. Keep the distinct waveform on the final sound card.
- Alternate photographs and illustrations across the first six cards. Keep
  full-stack and sound artwork unchanged. Fit complete illustrations into their
  card frame, including the exported derivative; crop only photographs.
- Every article has its own contextual cover, placed in the opening or beside
  the passage it explains. Do not repeat that cover within the article. Reuse
  smaller explainers only where their meaning matches the paragraph. Keep all
  illustration edges visible.
- Terminal articles use individual editorial plans with two to five chapters,
  distinct openings, contextual exhibits and varied reference formats. Shared
  primitives preserve the brand, not a fixed sequence of three equal text bands.
  Body text stays on white. Headings make sense independently. First-paragraph
  indentation is optional within the new compositions and must not impair rhythm.
- No card movement on hover. Preserve the original contrast/saturation effect.
- Photo credits stay at the top right, 6px, without a background panel.
- Breadcrumbs retain Sitemap, Home, the category and the current page. Keep the
  original 12.8px uppercase type (Roboto/Helvetica/Arial fallback), dark neutral
  text, slash separators and bold unlinked current item. Breadcrumbs must not
  inherit the brown body text or the page typography font stack.
  Link targets reserve at least 24px of height so wrapped rows remain separable.
- The homepage presents the implementation company, without a personal profile
  or links to source-code profiles.
- Keep real links and buttons, with no nested interactive elements.
- Primary links to contact, portfolio and case studies use `ActionLinkAtom`:
  the same outlined treatment and a right arrow. Plain in-text references retain
  their reading style. Indigo panels own their foreground explicitly; article
  typography must not override text inside these reused surfaces.
- Main navigation sits in a centered XL container (1536px maximum), including
  on ultrawide displays. Keep the current 320px control layout.
- Keep meaningful text and language links in the initial static HTML.
- Keep starting, scoping and pricing answers visible as plain text. No invented
  client results, prices or deadlines. Service-specific link previews use existing
  source artwork, with translated titles, descriptions and alternative text.
- Reserve image geometry. Prioritize only the first visible card or article hero.
- Source media and reusable reserves live in `assets/library/`. Select them in
  `src/content/media-plan.mjs`; `npm run generate:visuals` exports only selected
  assets, with localized alt text and content-hashed responsive image variants.
  Small inline explainers are SVGs. Avoid blurred placeholders and raster upscaling.
  Exclude photographs showing hands, including the former frontend, wireframe,
  drummer and mixing photographs. The old backend workspace remains a specifically
  approved reserve.
- The full-stack page uses a concise technical reference format: technologies,
  architecture and delivery practices, without a personal biography, marketing
  claims or code dumps. Stack tables become labelled rows on small screens.
- Keep the existing system font fallback; do not load additional fonts.
- Fit header controls and content at 320px without horizontal scrolling.
- Preserve the software-first homepage and separate `/sound/` services.
- Portfolio uses a single-column article list with full-row links, contextual
  thumbnails and readable summaries. On narrow screens, artwork precedes text.
  Case studies share typographic primitives and individual narrative plans;
  lifecycle context belongs in the prose. Introduce purpose and users clearly,
  with engineering later in the reading order.
- Portfolio responsibility statements and narrative use Atomic Concept as the
  subject in both languages, without personal names or career details.
- The November portfolio extension adds a header/footer link, homepage project
  previews and tighter opening/footer spacing. Preserve the approved service
  grid and contact interactions. At mobile widths, the contact icon retains its
  accessible name while the text label is hidden to fit the header.
- In-page anchors scroll smoothly. The HTML document declares
  `data-scroll-behavior="smooth"` so Next.js restores position immediately on
  route changes, keeping contact-field attention independent of scroll animation.
- Related-service and contact groups start after a deliberate section gap.
  Verify their whole visible text and CTA states on every affected route and locale,
  using readable lower-section captures and measured composed contrast.
- Verify desktop, mobile, hover, contact and article layouts against the original
  export after changing shared components. Content improvements are not approval
  to redesign established components.
- The delivery process is a semantic, open list within the existing homepage
  introduction: horizontal on desktop and vertical on mobile, without numbered
  tiles or connecting arrows. Keep the approved service-card arrangement.
- Each offer page has one compact contact section before the footer, with an
  invitation beside a form at 900px and above. Fields are at most 680px wide,
  email precedes subject, and the message grows from six rows. The contact page
  retains its full two-column form and twelve-row message. Compact feedback sits
  below the message in normal flow. Contact links scroll to the section heading.
- The indigo footer has four navigation groups and explicit light text, with
  four/two/one columns at 900/600px. Its content is at most 1536px wide. Preserve
  readable 44px links and visible hover/focus states.
- Application views use real components with neutral demonstration data. Keep
  complete desktop/mobile geometry, lazy responsive sources and a readable
  demonstration caption. Photo-credit styling does not apply to these captions.
- Large article visuals explain the adjacent subject. Use authored, localized
  diagrams for events, conditions, data relationships and responsibilities;
  select them in `src/content/explanation-plans.mjs`. Connectors represent actual
  sequences only. Parallel responsibilities and comparisons have no sequence
  arrows. Diagram labels remain ordinary static HTML, including on mobile and
  without JavaScript. The reusable indigo drawings are a shared visual vocabulary,
  not application controls or screenshots.
- Unlabelled supporting illustrations are at most 480px wide and 300px high;
  inline accents are at most 160px wide. Generic interface artwork does not take
  the place of a contextual explanation. Preserve full-stack and sound card art.
