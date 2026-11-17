# Project portfolio

The portfolio presents anonymous project case studies in English and Polish. It
uses the existing static export, route registry and deployment. There is no CMS,
database or runtime content service.

## Adding a project

1. Add a public record to `src/content/portfolio.mjs`. Its stable ID selects the
   content files; its slug forms `/portfolio/<slug>/`. Include both localized
   summaries and metadata, editorial dates, a cover asset, relevant services and
   a short list of technologies verified against the case study's scope.
2. Add matching JSON files under `src/content/portfolio/pl/` and `en/`, named after
   the ID. Follow `PortfolioContent` in `portfolio.d.mts`: introduction, audience,
   responsibility, the context/delivery/engineering sections and a stack table.
3. Register an original anonymous cover in the asset catalogue. Card and opening
   placements derive from the project record. Localized social previews are
   generated automatically.
   Use the shared neutral and brick-red vector language for cards; application
   demonstrations belong inside the article, not on a card or in its opening.
4. Add an individual composition to `src/content/editorial-projects.mjs`. Select
   the source paragraphs and items once each, and choose contextual exhibits,
   cover position and a suitable reference format. See [EDITORIAL.md](EDITORIAL.md).
5. Run `npm run check` and `npm run test:e2e`, review both languages and publish
   through the normal release process. Adding a project does not require editing
   page components or duplicating its URL in a second route list.

`featured` selects homepage previews. The full portfolio has no item-count cap.
Previous/next navigation follows catalogue order. The standard metadata resolver
covers both service pages and portfolio pages. Long case-study content is loaded
at build time only for its page.

## Interface demonstrations

The business-account and commerce-catalog studies include views rendered from
real application components with synthetic data and neutral branding in an
isolated demonstration. No customer database is used; writes are intercepted.
The private capture setup and source mapping stay outside this repository.

Sanitized desktop and mobile sources live in `assets/library/demos/`. The media
catalogue records `kind: screenshot`, `localizedSources`, `mobileSources`, localized
alternative text and a readable demonstration caption. `media-plan.mjs` attaches
them to source paragraphs. Screenshots are displayed together after the case-study
chapters, keeping the opening free of application screens at large viewport sizes.
Services and projects receive media before editorial compilation, so a catalogue entry alone does not publish a screenshot. The normal
generator creates content-hashed, lossless WebP sizes without raster enlargement;
the mobile source keeps the whole relevant interface. Captions identify example
data, with a link to a larger image for inspecting details. These are demonstrations, not customer production
screenshots or measured business outcomes.

## Editorial contract

Explain the purpose and user workflows before the engineering. Identify Michał
Sałek's actual responsibility near the start of each case in both languages, and
distinguish his work from other teams' work. Show verified technologies without
implying that a person worked alone or that every project was an Atomic Concept
engagement. Do not publish a private CV or invent results and career details.

Keep client and product identities, internal paths and source evidence outside
this public repository. Review the visible text, metadata, structured data,
Markdown mirrors, asset names and image descriptions for identifying details.
Technology vendor names are part of the engineering description.

Use shared visual primitives with an individual narrative for every project.
Describe current capabilities and
target development accurately in the prose. Dates identify publication and
editorial changes; builds do not refresh them. Publish measurements and results
only when supported. Diagnostic stores, audit trails and operational logs are
different mechanisms and should be described accordingly.

## Discovery and verification

The index exports CollectionPage and ItemList structured data. Individual pages
export WebPage and Article data with the company as publisher. All pages have
localized canonical, hreflang, breadcrumbs and share metadata. Sitemap, Markdown
and LLM discovery files derive from the exported HTML.

Contract tests cover catalogue identities, route registration, content completeness
and language parity. Browser tests cover navigation, contact subjects, JavaScript-free
content, 404 responses and narrow layouts. The export audit checks the entire
published set and the release verifier compares HTML and media with production.
