# Website refresh

## Foundation

The first stage updates the existing Next.js Pages Router site while retaining
static hosting and the minimal visual direction. It adds English and Polish
exports, shared metadata and URLs, crawlable content, generated discovery files,
repeatable checks, CI and a versioned static deployment with rollback.

The homepage now focuses on software. Sound remains a separate destination.
Existing photos are retained. Translations adapt the previous text; they are not
the final sales copy. The architecture text no longer confuses event sourcing
with UDP transport.

## Next: make the offer concrete

The existing frontend/backend/architecture categories describe technical layers.
They do not yet explain which customer problem is worth bringing to this business.
The next stage should choose a primary customer and entry service before rewriting
the homepage.

The owner confirmed Atomic Concept as a distinct brand for AI services,
business-process automation and software engineering. The next offer should
connect independent software delivery, backend work and integrations to that
positioning. Connect each service to a clear
problem, a deliverable and the next contact step. Keep frontend skills as part of
delivering complete products.

Decisions for the next stage:

1. Which customers and project sizes should the website attract?
2. Which existing work can be shown publicly, with whose permission?
3. What is the first engagement: a scoped implementation, an existing-system review
   or ongoing product development?
4. Should production enquiries use an external form service or direct email?
5. What audio work is currently available, and which samples can be published?

## Content and proof

Write a short, specific PL/EN homepage with a clear contact action. Replace broad
technical promises with examples, constraints and verified outcomes. Add a human
profile and selected public work. Publish no client figures or private product
identities without explicit permission.

Plan replacement imagery around each section's actual subject. Prefer original
work, a portrait or relevant visuals over unrelated stock imagery. Keep current
image dimensions, responsive formats and build-time optimization.

Useful interaction should help visitors describe their project or choose a
service. Add it only when the enquiry path and the information it needs are clear.
A backend is not a prerequisite for these interactions.

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
