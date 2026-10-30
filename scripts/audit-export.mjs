import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { load } from 'cheerio';
import { routes, site, localePath, pageUrl } from '../src/content/site.mjs';

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
        const md = relative === '/' ? '/index.md' : `${relative.slice(0, -1)}.md`;
        const mirror = await readFile(`out${md}`, 'utf8');
        assert(mirror.includes($('h1').text()), `${label}: Markdown mirror`);
        pages++;
    }
}
assert.equal((sitemap.match(/<loc>/g) ?? []).length, pages, 'Sitemap must contain only current routes');
const notFound = load(await readFile('out/404.html', 'utf8'));
assert(notFound('meta[name="robots"]').attr('content')?.includes('noindex'), '404 noindex');
for (const asset of ['robots.txt', 'llms.txt', 'llms-full.txt', 'og-image.png', '.htaccess', 'release.json']) await access(`out/${asset}`);
const robots = await readFile('out/robots.txt', 'utf8');
assert(robots.includes('Allow: /') && !robots.includes('Disallow: /'), 'Crawler access');
console.log(`Export audit passed: ${pages} localized HTML pages, links, images, metadata, sitemap, JSON-LD and Markdown.`);
