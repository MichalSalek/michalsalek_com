# Project portfolio

The portfolio presents anonymous project case studies in English and Polish. It
uses the existing static export, route registry and deployment. There is no CMS,
database or runtime content service.

## Adding a project

1. Add a public record to `src/content/portfolio.mjs`. Its stable ID selects the
   content files; its slug forms `/portfolio/<slug>/`. Include both localized
   summaries and metadata, editorial dates, a cover asset and relevant services.
2. Add matching JSON files under `src/content/portfolio/pl/` and `en/`, named after
   the ID. Follow `PortfolioContent` in `portfolio.d.mts`: introduction, audience,
   responsibility, the context/delivery/engineering sections and a stack table.
3. Register an original anonymous cover in the asset catalogue. Card and opening
   placements derive from the project record. Localized social previews are
   generated automatically.
   Text-free portfolio artwork uses the catalogue's `webpQuality` setting for
   efficient derivatives. The original sources remain unchanged.
4. Run `npm run check` and `npm run test:e2e`, review both languages and publish
   through the normal release process. Adding a project does not require editing
   page components or duplicating its URL in a second route list.

`featured` selects homepage previews. The full portfolio has no item-count cap.
Previous/next navigation follows catalogue order. The standard metadata resolver
covers both service pages and portfolio pages. Long case-study content is loaded
at build time only for its page.

## Editorial contract

Explain the purpose and user workflows before the engineering. Attribute the
scope and delivery responsibility to Atomic Concept consistently in both
languages. Do not name individuals, describe personal career history or switch
to a personal voice. Keep the actual technical contribution precise.

Keep client and product identities, internal paths and source evidence outside
this public repository. Review the visible text, metadata, structured data,
Markdown mirrors, asset names and image descriptions for identifying details.
Technology vendor names are part of the engineering description.

Use the same presentation for every project. Describe current capabilities and
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
