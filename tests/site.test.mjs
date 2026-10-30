import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { routes, localePath, pageUrl, pageHref, site } from '../src/content/site.mjs';

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
    assert.deepEqual(Object.keys(en.pages), routes);
    assert.deepEqual(Object.keys(pl.pages), routes);
    assert.deepEqual(Object.keys(en.ui).sort(), Object.keys(pl.ui).sort());
    for (const path of routes) {
        assert.notEqual(en.pages[path].title, pl.pages[path].title);
        assert.notEqual(en.pages[path].description, pl.pages[path].description);
    }
    for (const locale of site.locales) {
        const articles = JSON.parse(await readFile(`src/content/${locale}-articles.json`, 'utf8'));
        assert.deepEqual(Object.keys(articles).sort(), routes.filter(path => path === '/' || path.startsWith('/software/') || /^\/sound\/.+\/$/.test(path)).map(path => path.slice(1,-1)).sort());
        for (const article of Object.values(articles)) {
            assert(article.sections.length >= 3);
            for (const section of article.sections) assert(section.title && section.subtitle && section.paragraphs.length);
        }
    }
});
