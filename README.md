# michalsalek.com

The source of the Atomic Concept website. Next.js Pages Router builds plain HTML,
CSS, JavaScript and responsive images. Production needs a static web server, with
no Node.js process, API routes or database.

## Development

Use Node.js 24 and npm. Versions are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

For a production preview:

```sh
npm run build
npm run preview
```

The preview runs on port 3100. `npm run start` serves the same static export.

## Checks

```sh
npx playwright install chromium
npm run check
npm run test:e2e
npm run audit:dependencies
```

`check` runs lint, type checks, unit tests, the production build and the static
export audit. Browser tests cover desktop, mobile, language switching and pages
without JavaScript. GitHub Actions runs these checks on pull requests and `main`.

The native TypeScript 7 compiler runs type checks. The TypeScript 6 API remains
installed for Next.js and typescript-eslint compatibility, following the
[TypeScript migration guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6-0).
ESLint uses the latest 9.x version accepted by the plugins in eslint-config-next;
their current peer ranges do not accept ESLint 10. The compression override is a
patched version within the preview server's dependency tree.

## Content and languages

English keeps the existing root URLs. Polish pages live under `/pl/`. The software
homepage is `/`; audio services start at `/sound/`. The old `/software` entry
redirects permanently to `/` on production.

- Routes, origin and locale URL helpers: `src/content/site.mjs`.
- Page metadata, interface labels and service cards: `src/content/en.json` and `pl.json`.
- Article text: `src/content/en-articles.json` and `pl-articles.json`.
- Shared page rendering: `src/UI/components/SitePage.tsx`.
- Visual constraints: [DESIGN.md](DESIGN.md).

Source photographs, illustrations and reusable reserves live in the tracked
[asset library](assets/library/README.md). Current placements are selected in
`src/content/media-plan.mjs`; `npm run generate:visuals` creates responsive,
content-hashed WebP variants, service-specific JPEG share images and native SVG
explainers. Each software article has a distinct opening scene. Illustrations
retain their full frame; photographs may be cropped for cards. Both `dev` and
`build` run this step automatically. Generated files in `public/service-visuals/`
are not tracked, and reserve sources are not exported to the website.

`npm run assets:preview` opens the source catalogue at http://localhost:4325.
After changing the catalogue or placements, run `npm run assets:catalog`.

The homepage ends with full-stack engineering and sound services. The technical
overview is at `/software/fullstack/`. Service articles use at most three main
sections, with scope, practical examples and delivery details in both languages.

Every language is rendered at build time, including its title, description,
canonical URL, hreflang links and structured data. No browser-language redirects
or runtime translation service are required.

The build generates `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` and
Markdown mirrors from the actual HTML. The Markdown is supplementary; HTML is the
canonical source. Crawler access does not guarantee indexing or AI citations.

## Contact

With no configuration, the form prepares a draft in the visitor's email app. It
never reports that a message was delivered. A direct email link is also visible
without JavaScript.

To use an existing external mail service, set `NEXT_PUBLIC_CONTACT_ENDPOINT`
before building. It must accept a CORS-enabled JSON POST with `subject`, `text`,
`replyTo` and `signature`, and return a non-2xx status on failure. No secret may be
included in a public environment variable. See [.env.example](.env.example).

Production retains the existing external contact endpoint through local build
configuration and the `CONTACT_ENDPOINT` GitHub repository variable. Changing it
does not require a backend deployment for this static site.

Optional analytics uses `NEXT_PUBLIC_GA_ID` and starts after the first interaction.
It is disabled when no property is configured.

## Deployment

```sh
npm run deploy:dry
npm run deploy
npm run deploy:rollback
```

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for connection configuration,
verification, rollback and the optional GitHub deployment workflow.

Offer research, design boundaries and the next content work are recorded in [docs/ROADMAP.md](docs/ROADMAP.md).
See [the enquiry and acquisition plan](docs/business/CLIENT-ACQUISITION.md) for
relevant landing links, proof requirements and the next measurement step.
