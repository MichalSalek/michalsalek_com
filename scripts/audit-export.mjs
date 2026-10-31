import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { load } from 'cheerio';
import { routes, site, localePath, pageUrl } from '../src/content/site.mjs';
import { createHash } from 'node:crypto';
import { heroMedia } from '../src/content/media-plan.mjs';
import sharp from 'sharp';

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
            const hero = $('.service-artwork-hero');
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
        assert(mirror.includes($('h1').text()), `${label}: Markdown mirror`);
        for (const item of $('.enquiry-answers dt, .enquiry-answers dd')) assert(mirror.includes($(item).text().trim()), `${label}: enquiry answers in the Markdown mirror`);
        for (const cell of $('main table th, main table td')) assert(mirror.includes($(cell).text().trim()), `${label}: technical table in the Markdown mirror`);
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
