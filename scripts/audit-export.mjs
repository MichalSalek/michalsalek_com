import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { load } from 'cheerio';
import { routes, site, localePath, pageUrl } from '../src/content/site.mjs';
import { createHash } from 'node:crypto';
import { heroMedia } from '../src/content/media-plan.mjs';
import sharp from 'sharp';
import {findPortfolioProject, portfolioProjects, portfolioPath} from '../src/content/portfolio.mjs';
import {editorialPlans} from '../src/content/editorial.mjs';

const visible = value => value.replace(/\[([^\]]+)\]\((?:https:\/\/|\/)[^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\s+/g, ' ').trim();

const sitemap = await readFile('out/sitemap.xml', 'utf8');
const titles = new Set();
const descriptions = new Set();
let pages = 0;
for (const locale of site.locales) {
    for (const path of routes) {
        const relative = localePath(locale, path);
        const html = await readFile(`out${relative}index.html`, 'utf8');
        const $ = load(html);
        const label = `${locale} ${path}`;
        const expectedForms = path === '/sitemap/' ? 0 : 1;
        assert.equal($('main form.contact-form').length, expectedForms, `${label}: exactly one contextual contact form on each offer/contact page`);
        assert.equal($('footer form').length, 0, `${label}: no form inside the global footer`);
        if (expectedForms) {
            assert.equal($('main form.contact-form-compact').length, path === '/contact/' ? 0 : 1, `${label}: appropriate contact variant`);
            assert.equal($('#project-contact').length, 1, `${label}: stable contact heading`);
        }
        const footer = $('.site-shell > footer');
        assert.equal(footer.find('section').length, 4, `${label}: four footer navigation groups`);
        assert.equal(footer.find('a[href^="mailto:"]').length, 1, `${label}: direct footer contact`);
        assert.equal($('html').attr('lang'), locale, `${label}: html lang`);
        assert.equal($('h1').length, 1, `${label}: one h1`);
        assert.equal($('head title').length, 1, `${label}: one title`);
        const title = $('title').text();
        assert(!titles.has(title), `${label}: duplicate title`); titles.add(title);
        const description = $('meta[name="description"]').attr('content');
        assert(description?.length >= 60, `${label}: description`);
        assert(!descriptions.has(description), `${label}: duplicate description`); descriptions.add(description);
        assert.equal($('link[rel="canonical"]').attr('href'), pageUrl(locale, path), `${label}: canonical`);
        assert.equal($('meta[name="robots"][content*="noindex"]').length, 0, `${label}: accidental noindex`);
        for (const language of site.locales) {
            assert.equal($(`link[hreflang="${language}"]`).attr('href'), pageUrl(language, path), `${label}: hreflang ${language}`);
        }
        assert.equal($('link[hreflang="x-default"]').attr('href'), pageUrl(site.defaultLocale, path));
        const json = JSON.parse($('script[type="application/ld+json"]').text());
        assert(json['@graph'].some(node => node.inLanguage === locale && node.url === pageUrl(locale, path)), `${label}: structured data`);
        assert(sitemap.includes(`<loc>${pageUrl(locale, path)}</loc>`), `${label}: sitemap`);
        $('script, style').remove();
        assert($('main').text().trim().length > 70, `${label}: content must exist without JavaScript`);
        for (const element of $('a[href^="/"]')) {
            const href = $(element).attr('href').split(/[?#]/)[0];
            if (href) await access(`out${href.endsWith('/') ? `${href}index.html` : href}`);
        }
        for (const element of $('img')) {
            assert($(element).attr('alt')?.trim(), `${label}: image alt`);
            const src = $(element).attr('src');
            if (src.startsWith('/')) await access(`out${src}`);
            assert($(element).attr('width') || $(element).attr('style')?.includes('position:absolute'), `${label}: reserved image geometry`);
        }
        for (const element of $('picture source')) {
            const source = $(element).attr('srcset');
            assert(source?.startsWith('/service-visuals/'), `${label}: static responsive artwork`);
            await access(`out${source}`);
        }
        if (heroMedia[path]) {
            const hero = $('[data-editorial-cover]');
            assert.equal(hero.length, 1, `${label}: one opening image`);
            assert.equal(hero.attr('data-asset'), heroMedia[path], `${label}: contextual opening image`);
            assert.equal($(`[data-asset="${heroMedia[path]}"]`).length, 1, `${label}: opening image must not repeat in the article`);
            const image = $('meta[property="og:image"]').attr('content');
            assert(image?.startsWith(`${site.origin}/service-visuals/`), `${label}: service-specific social image`);
            const info = await sharp(`out${new URL(image).pathname}`).metadata();
            assert.equal(info.width, 1200); assert.equal(info.height, 630);
            assert($('meta[property="og:image:alt"]').attr('content')?.trim(), `${label}: social image description`);
        }
        const md = relative === '/' ? '/index.md' : `${relative.slice(0, -1)}.md`;
        const mirror = await readFile(`out${md}`, 'utf8');
        assert(!mirror.includes('email-hint') && !mirror.includes('contact-feedback'), `${label}: form internals excluded from text mirrors`);
        for (const anchor of $('main a[href]')) {
            if ($(anchor).closest('[data-text-export="exclude"], .contact-invitation p').length) continue;
            const href = $(anchor).attr('href');
            if (/^(\/|#|https?:|mailto:|tel:)/.test(href) && $(anchor).text().trim()) {
                assert(mirror.includes(`<${new URL(href, pageUrl(locale, path)).href}>`), `${label}: published link destination in Markdown`);
            }
        }
        assert(mirror.includes($('h1').text()), `${label}: Markdown mirror`);
        for (const item of $('.enquiry-answers dt, .enquiry-answers dd')) assert(mirror.includes($(item).text().trim()), `${label}: enquiry answers in the Markdown mirror`);
        for (const cell of $('main table th, main table td')) assert(mirror.includes($(cell).text().trim()), `${label}: technical table in the Markdown mirror`);
        const project = findPortfolioProject(path);
        if (['b2b-service-platform', 'shopify-product-experience'].includes(project?.id)) {
            assert.equal($('[data-application-demo]').length, 1, `${label}: real demo present in final HTML`);
            assert.equal($('[data-application-demo] picture source').length, 1, `${label}: dedicated mobile demo`);
            const caption = locale === 'pl' ? 'Widok aplikacji z danymi demonstracyjnymi' : 'Application view with demonstration data';
            assert.equal($('[data-application-demo] figcaption').text(), caption);
            assert(mirror.includes(caption), `${label}: demonstration disclosure in Markdown`);
            assert(mirror.includes($('[data-application-demo] img').attr('alt')), `${label}: demonstration description in Markdown`);
        }
        const plan = editorialPlans[path];
        if (plan) {
            const content = project ? JSON.parse(await readFile(`src/content/portfolio/${locale}/${project.id}.json`, 'utf8')) : JSON.parse(await readFile(`src/content/${locale}-articles.json`, 'utf8'))[path.slice(1, -1)];
            const mainText = visible($('main').text());
            const markdownText = visible(mirror);
            assert.equal($('article[data-editorial-opening]').attr('data-editorial-opening'), plan.opening, `${label}: individual opening`);
            assert.deepEqual($('[data-editorial-chapter]').toArray().map(element => $(element).attr('data-editorial-chapter')), plan.chapters.map(chapter => chapter.id), `${label}: individual outline`);
            assert.equal($('[data-editorial-exhibit]').length, plan.chapters.filter(chapter => chapter.exhibit).length, `${label}: topical explainers`);
            const texts = [...(content.intro ?? []), ...content.sections.flatMap(section => [...section.paragraphs, ...(section.items ?? []).flatMap(item => [item.title, item.description]), ...(section.facts ?? []).flatMap(item => [item.term, item.detail])]), ...(content.stack ?? []).flatMap(item => [item.term, item.detail]), ...(content.role ? [content.role] : [])];
            for (const text of texts) {
                assert(mainText.includes(visible(text)), `${label}: source text in HTML: ${text.slice(0, 55)}`);
                assert(markdownText.includes(visible(text)), `${label}: source text in Markdown: ${text.slice(0, 55)}`);
            }
            for (const chapter of plan.chapters) if (chapter.exhibit) assert(markdownText.includes(visible(chapter.exhibit.caption[locale])), `${label}: explanatory caption in Markdown`);
            for (const anchor of $('main a[href^="#"]')) assert.equal($(`[id="${$(anchor).attr('href').slice(1)}"]`).length, 1, `${label}: working chapter anchor`);
        }
        if (project) {
            const content = JSON.parse(await readFile(`src/content/portfolio/${locale}/${project.id}.json`, 'utf8'));
            const article = json['@graph'].find(node => node['@type'] === 'Article');
            assert.equal(article?.headline, project[locale].title, `${label}: project article schema`);
            assert.equal(article?.dateModified, project.updatedAt, `${label}: editorial update date`);
            assert.equal($('meta[property="og:type"]').attr('content'), 'article', `${label}: article preview`);
            for (const section of content.sections) {
                assert.equal($(`main [id="${section.id}"]`).length, 1, `${label}: preserved section anchor ${section.id}`);
                for (const paragraph of section.paragraphs) assert(mirror.includes(paragraph), `${label}: full project text in Markdown`);
                for (const item of section.items) assert(mirror.includes(item.description), `${label}: project details in Markdown`);
            }
            assert(mirror.includes(content.role), `${label}: responsibility in Markdown`);
        }
        if (path === '/portfolio/') {
            const list = json['@graph'].find(node => node['@type'] === 'ItemList');
            assert.equal(list?.numberOfItems, portfolioProjects.length, `${label}: portfolio schema count`);
            assert.deepEqual(list.itemListElement.map(item => item.url), portfolioProjects.map(item => pageUrl(locale, portfolioPath(item))), `${label}: portfolio schema URLs`);
            for (const item of portfolioProjects) assert.equal($(`main article a[href="${localePath(locale, portfolioPath(item))}"]`).length, 1, `${label}: one complete project link`);
        }
        pages++;
    }
}
assert.equal((sitemap.match(/<loc>/g) ?? []).length, pages, 'Sitemap must contain only current routes');
const notFound = load(await readFile('out/404.html', 'utf8'));
assert(notFound('meta[name="robots"]').attr('content')?.includes('noindex'), '404 noindex');
for (const asset of ['robots.txt', 'llms.txt', 'llms-full.txt', 'og-image.png', '.htaccess', 'release.json']) await access(`out/${asset}`);
const robots = await readFile('out/robots.txt', 'utf8');
assert(robots.includes('Allow: /') && !robots.includes('Disallow: /'), 'Crawler access');
const release = JSON.parse(await readFile('out/release.json', 'utf8'));
for (const [path, hash] of Object.entries(release.assets)) {
    const source = await readFile(`out${path}`);
    assert.equal(createHash('sha256').update(source).digest('hex'), hash, `${path}: release artwork hash`);
    if (!path.startsWith('/service-visuals/')) continue;
    assert.equal(path.match(/\.([a-f0-9]{12})\.(svg|webp|jpg)$/)?.[1], hash.slice(0, 12), `${path}: immutable media URL`);
    if (!path.endsWith('.svg')) continue;
    const document = load(source.toString('utf8'), {xml: true});
    assert.equal(document('script, image, foreignObject').length, 0, `${path}: self-contained vector artwork`);
    assert.equal(document('text, clipPath').length, 0, `${path}: simple artwork without UI labels or diagonal backdrops`);
}
console.log(`Export audit passed: ${pages} localized HTML pages, links, images, metadata, sitemap, JSON-LD and Markdown.`);
