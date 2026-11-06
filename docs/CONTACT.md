# Enquiries and navigation

The site shares one contact form across both locales. Each of the 22 offer and
portfolio pages has one compact section before the global footer. `/contact/`
uses the full presentation; sitemap and error pages use contact links. The footer
has no form. `ContactSection` owns the invitation and anchor; `ContactFormOrganism`
owns fields, validation and feedback. Compact fields are ordered email, subject,
message, optional name, at most 680px wide. Textareas grow from six rows (compact)
or twelve (full). Primary introductory CTAs use `ActionLinkAtom` and scroll to
`#project-contact`, without focusing an input or opening a phone keyboard.

## Context and drafts

`contact-context.ts` maps registered page identities to stable topic IDs and PL/EN
labels. A project title is not a generated subject. Automatic topics follow the
current page and language. A manual topic, including an intentionally empty one,
survives navigation and language changes. Email, message and name are shared in
the tab. Version two of the `sessionStorage` draft records the topic ID and
whether the subject is automatic or manual. Version-one drafts migrate all fields;
unknown old `about` values remain manual text. Blocked or malformed storage cannot
prevent editing; a memory copy preserves navigation within the running tab.

The dedicated contact page accepts `topic` and `from`. A recognized topic takes
precedence over the legacy `about` parameter; saved manual text takes precedence
over both. Legacy public labels remain recognized. `from` must exactly match a
known localized path. External URLs, query strings, hashes and unknown paths are
rejected. Without a valid source the current page supplies it.

The canonical source URL is appended when preparing an endpoint request or an
email-client fallback. It is never inserted into the editable draft. The endpoint
contract remains `subject`, `text`, `replyTo`, `signature`. An in-memory lock
prevents duplicate requests, including during client-side navigation. A successful
HTTP response means the endpoint accepted the enquiry. It does not prove inbox
delivery. Timeout and HTTP errors keep the draft; the complete email-client
fallback remains available. The feedback button `OK` acknowledges the result:
success clears the draft, failure retains it.

## Measurement

The existing GA4 integration uses its normal `dataLayer`/`gtag` queue before the
delayed script is loaded, without an additional SDK. Optional or blocked analytics
never controls form behaviour. Events are:

| Event | Trigger |
| --- | --- |
| `contact_intent` | A contact CTA is clicked |
| `contact_start` | The first manual edit of the mounted form |
| `generate_lead` | The endpoint accepts one request |
| `contact_error` | A failed response or timeout |
| `contact_email_open` | An email-client link is opened |

The context contains only a registered localized page path, language, stable topic
ID (or `custom`), form variant and placement. Standard GA page locations omit
queries and hashes; referrers are not forwarded. Field contents, manual subjects,
emails and names are not sent. Restoring a draft does not start a form. Accepted
requests emit one lead event. The event follows
[Google's generate_lead definition](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#generate_lead);
it is not a qualified opportunity, sale or inbox receipt.

## Footer and discovery

The footer groups services, portfolio, engineering and audio. Service and project
identities come from the existing registries and `featured` flags; `AppLinkAtom`
localizes links. It has four columns from 900px, two from 600px and one below.
Content and header are bounded to 1536px; links reserve at least 44px and have
explicit light hover/focus styles on indigo.

Static HTML retains the fields and real navigation links. Markdown mirrors and
`llms-full.txt` exclude the form internals, feedback and repeated invitation,
retaining article content, demonstration captions and one contact line per page.
The export audit checks the full route set for form counts, footer groups, source
images, metadata and discovery parity. Browser tests intercept delivery and
analytics; capture inventories compare expected and captured route/locale views.
