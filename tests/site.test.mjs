import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { routes, standardRoutes, localePath, pageUrl, pageHref, site } from '../src/content/site.mjs';
import {getPageMetadata} from '../src/content/portfolio.mjs';

test('language counterparts have distinct, stable URLs', () => {
    for (const path of routes) {
        assert.equal(pageUrl('en', path), `${site.origin}${path}`);
        assert.equal(localePath('pl', path), `/pl${path}`);
    }
    assert.throws(() => localePath('de', '/'));
    assert.throws(() => localePath('pl', '/unknown/'));
    assert.equal(pageHref('pl', '/contact?about=Backend%20%26%20AI#form'), '/pl/contact/?about=Backend%20%26%20AI#form');
    assert.equal(pageHref('en', '/software/'), '/');
});

test('every locale covers the same pages and interface messages', async () => {
    const en = JSON.parse(await readFile('src/content/en.json', 'utf8'));
    const pl = JSON.parse(await readFile('src/content/pl.json', 'utf8'));
    assert.deepEqual(Object.keys(en.pages), standardRoutes);
    assert.deepEqual(Object.keys(pl.pages), standardRoutes);
    assert.deepEqual(Object.keys(en.ui).sort(), Object.keys(pl.ui).sort());
    for (const path of routes) {
        assert.notEqual(getPageMetadata('en', path, en.pages).title, getPageMetadata('pl', path, pl.pages).title);
        assert.notEqual(getPageMetadata('en', path, en.pages).description, getPageMetadata('pl', path, pl.pages).description);
    }
    for (const locale of site.locales) {
        const articles = JSON.parse(await readFile(`src/content/${locale}-articles.json`, 'utf8'));
        assert.deepEqual(Object.keys(articles).sort(), standardRoutes.filter(path => path === '/' || path.startsWith('/software/') || /^\/sound\/.+\/$/.test(path)).map(path => path.slice(1,-1)).sort());
        for (const [path, article] of Object.entries(articles)) {
            assert(article.sections.length >= (path === '' ? 1 : 3));
            assert(article.sections.length <= 3, `${locale} ${path}: no more than three main sections`);
            for (const section of article.sections) assert(section.title && section.subtitle && section.paragraphs.length);
        }
    }
});
