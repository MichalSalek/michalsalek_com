# Website refresh

## Foundation

The first stage updates the existing Next.js Pages Router site while retaining
static hosting and the minimal visual direction. It adds English and Polish
exports, shared metadata and URLs, crawlable content, generated discovery files,
repeatable checks, CI and a versioned static deployment with rollback.

The homepage focuses on AI and software for small and medium businesses. Sound
remains a separate destination. Both languages include six service pages:
AI integrations, workflow automation, existing-system integrations, business
websites, custom applications and reporting. Existing
engineering articles remain available as background, with their original URLs.
The last homepage row links to a technical full-stack overview and sound services.

## Current offer

The audience is a business owner who wants a particular task improved, without
needing a technical specification. The offer includes process discovery, a scoped
implementation, deployment and an agreed handover or maintenance arrangement.
The copy retains the owner's original ideas about analysis, maintainability and
avoiding unnecessary complexity. Present complete company delivery and responsibility. Keep personal biography,
career history and GitHub links out of the marketing pages. The approved copy
direction uses plain language, a clear service scope and responsibility for
delivery, without superiority, slogans or metaphors.
Service articles use at most three main sections and include practical workflows,
scope, data or failure cases, acceptance and handover. English and Polish retain
the same meaning. The full-stack overview can name technologies and engineering
practices for technically literate readers, without becoming a personal CV.

See [the content brief](business/CONTENT-BRIEF.md) and
[market evidence and limitations](business/MARKET-RESEARCH.md). Proposed use cases
are not presented as customer results. No fixed prices, deadlines or ROI claims
have been invented. Research supports the first offer structure; actual enquiries
should determine the next specialisation.

## Visual reference

The original site at `b5ed0e1` is the design reference, as defined in `../DESIGN.md`.
Retain its cards, thumbnails, subtle credits, bordered Read More controls, contrast
hover, article panels and contact form. Also retain the delayed subject highlight
after a CTA, the page transition and the feedback/OK flow. Start the subject cue
only once the field is in view and the page transition has finished. Reduced
motion keeps a static highlight. The introduction uses a heading/body layout
and emphasis rather than isolated paragraphs.
Framework updates and content work do not imply approval for a redesign.

## Next: proof, imagery and enquiries

1. Select projects or engineering examples that may be shown publicly, with any
   required client permission. Add specific outcomes only when verified.
2. Review the implemented mix of contextual photographs and sparse indigo
   illustrations. The first six cards alternate media types; every software
   article has its own opening scene and relevant body illustrations. Sources and
   reserves live in `assets/library/`. Keep illustration edges visible, image
   geometry reserved and the original controls intact. Generated examples describe
   possible applications, not delivered client work.
3. Review actual enquiries for the requested task, existing tools, source and
   project fit. Use this evidence before choosing an industry niche or package.
4. Decide which audio work is currently available and which samples may be shared.
5. Add lightweight conversion measurement and verify indexing using the owner's
   search accounts. Avoid overlapping trackers.

## Direct service enquiries

Visitors following a referral can open the relevant service directly. Each page
starts with its scope, a contact link and a distinct opening image. Its existing
three sections cover a possible workflow, implementation details and handover.
The homepage explains what to send, how current tools are assessed and how scope,
price and timeframe are agreed. Contact remains available without a specification.

Each software service exports its own social share image from existing artwork,
with a localized title, description and image alternative. Preview metadata is
static; publishing and the sharing platform's cache determine when a new preview
appears externally. No external-platform acceptance is claimed by the local audit.

See [the acquisition plan](business/CLIENT-ACQUISITION.md) for relevant service
links, reply patterns and the next proof and measurement priorities.

## Search and AI visibility

Keep page text in static HTML. Maintain reciprocal hreflang links, canonical URLs,
valid structured data, internal links and working sitemaps. Markdown mirrors and
LLM discovery files must continue to be generated from the same published text.

Validate indexing in Search Console and Bing Webmaster Tools using the owner's
accounts. Accessible pages and structured data make content understandable; they
do not guarantee a search position, a citation, or inclusion in model training.
The next growth lever is useful, specific public evidence of work.

References:

- [Google: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: AI features and websites](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI crawler controls](https://developers.openai.com/api/docs/bots)
- [Next.js static exports](https://nextjs.org/docs/pages/guides/static-exports)

## Lightweight measurement

The existing GA4 property is retained. A later measurement step should define
contact-link clicks, contact submission results and service-to-contact navigation,
with page language and source context. Keep one analytics owner per event. GTM
can manage tags if it simplifies maintenance; evaluate PostHog only when its
additional product or event analysis answers a concrete question. Do not install
several overlapping trackers by default.

AI referrals, human enquiries and crawler visits are different measures. Track
human conversions by referrer or UTM when available, and crawler requests through
server logs. Missing referrers must remain unknown. Search Console measures search
visibility; Bing Webmaster Tools has a separate AI Performance report for the
Microsoft experiences it covers, not a universal count of all LLM citations.

## Multilingual discovery

Every locale has a stable public URL and a self-referencing canonical. Hreflang
links identify the translations; the sitemap lists both versions. A crawler does
not need to negotiate a language with cookies, browser preferences or a language
switcher implemented only in JavaScript. English is language-wide, without
separate US and UK copies.

Search and training are separate channels. OAI-SearchBot serves ChatGPT search,
GPTBot may collect training content, and ChatGPT-User fetches pages for user
actions. Access does not guarantee inclusion or a recommendation. Maintain clear
public evidence, specific service pages and useful answers in both languages.
Markdown mirrors and llms.txt supplement the HTML; they do not replace indexing
or guarantee that an assistant will read them.

[Microsoft AI Performance report](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)
