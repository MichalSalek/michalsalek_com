# Individual article compositions

Terminal service and project pages use authored composition plans. The shared
renderer supplies typography, media, figures, references and navigation; the plan
decides the opening relationship, chapter order, contextual exhibits and cover
position for each topic. Home, index and contact pages retain their own views.

## Content and plans

The existing locale files and portfolio JSON remain the source of the factual
copy. `editorial-services.mjs` and `editorial-projects.mjs` contain presentation
plans, localized chapter headings and short explanations for the figures. They
do not contain copies of the original paragraphs.

Each chapter selects paragraphs, items or fact rows from the source sections.
The compiler rejects missing, repeated and out-of-range selections. New material
cannot disappear silently when an outline changes. Both languages use the same
structural plan, with their own authored labels. Source section anchors remain
available when their content moves into a differently named chapter.

Use a cover once, in the opening or next to a relevant chapter. Source inline
illustrations remain attached to the paragraph they explain. Figures use ordinary
HTML labels and captions; decorative SVG never carries the only copy of a fact.
Do not imply that schematic data is a measured customer result.

`explanation-plans.mjs` adds concrete visual explanations to selected chapters.
Each diagram names its existing chapter and supplies its own English and Polish
title, caption, steps and optional exception. `ContextDiagram` draws sequences,
parallel lanes, comparisons or a shared context with HTML labels and native SVG
illustrations. Only genuine sequences use ordered lists and directional
connectors. At narrow container widths they become vertical, without shrinking
the text. Home, audio and portfolio indexes have their own concise overviews;
contact and sitemap pages do not need explanatory artwork.

Keep these explanations distinct from the existing exhibits: show the mechanism
where the prose introduces it, rather than repeating a nearby diagram. Supporting
cover illustrations stay compact. Large application captures are reserved for
the actual application demonstrations. The export audit checks diagram placement,
both languages and complete descriptions in HTML and Markdown.

Set `sequence: true` on an existing exhibit only when its entries are consecutive
stages. It then uses the same ordered drawings as the authored diagrams, with
vertical steps on phones. Other state collections remain parallel descriptions.

## Composition choices

Openings can use an essay lead, a text-and-image split, a panoramic media break,
a compact introduction or a title beside a narrative column. Chapters can use
reading prose, an aside, a paired visual, an actual sequence, a definition ledger,
decision notes or a technical reference. Choose forms for their content.

The composition signature ignores chapter names. It measures the opening, cover
position, navigation, chapter forms, figures and reference format. Existing pages
have distinct signatures; this is a mechanical check, followed by a visual review.
Changing names alone does not create a new composition.

Technical details stay later in the reading order. A glossary, compact notes,
inline terms or a real comparison table may fit. A table is optional. The company
voice and anonymous project identities apply equally to prose and figures.

Primary page links use the shared `ActionLinkAtom`. Reused indigo information
panels own their foreground; article heading styles must not override them.
Related content has a clear section gap. Service-to-project links derive from
the existing portfolio service mapping, without a second hand-maintained list.

## Verification

`npm run check` validates complete source coverage in both languages, builds the
static pages and checks the actual HTML and Markdown for preserved content,
working anchors, the intended outline and a single cover. Browser tests cover
representative compositions, keyboard links, small screens and all article text
without JavaScript. Review full-page rhythm as well as readable viewport crops.
`npm run qa:visuals` inventories the affected surfaces and captures lower sections
in each route/locale, alongside the automated contrast and interactive-state checks.
