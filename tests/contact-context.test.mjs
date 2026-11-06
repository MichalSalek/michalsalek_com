import test from 'node:test';
import assert from 'node:assert/strict';
import {contactContext, contactTopics, knownSource, topicForPage, withContactSource} from '../src/layers/application/contact-context.ts';
import {localePath, routes, site} from '../src/content/site.mjs';

const expected = {
    '/software/ai-automation/': 'ai', '/software/automation/': 'automation', '/software/integrations/': 'integrations',
    '/software/websites/': 'website', '/software/custom-software/': 'application', '/software/reporting/': 'reporting',
    '/software/fullstack/': 'fullstack', '/software/architecture/': 'architecture', '/software/backend/': 'backend', '/software/frontend/': 'frontend',
    '/sound/': 'sound', '/sound/studio/': 'studio', '/sound/soundtracks/': 'music',
    '/portfolio/b2b-service-platform/': 'saas', '/portfolio/shopify-product-experience/': 'ecommerce',
    '/portfolio/technology-product-website/': 'product-website', '/portfolio/editorial-search-analytics/': 'reporting',
    '/portfolio/service-business-platform/': 'saas', '/portfolio/remote-ai-assistant/': 'ai-assistant', '/portfolio/3d-house-planning/': '3d',
};

test('services and projects use stable topic IDs with localized subjects', () => {
    for (const [path, id] of Object.entries(expected)) {
        assert.equal(topicForPage(path), id, path);
        for (const locale of site.locales) assert.deepEqual(contactContext(locale, path), {topicId: id, autoSubject: contactTopics[id][locale], sourcePath: localePath(locale, path)});
    }
});

test('known topic wins over legacy about; known legacy labels localize, unknown text is preserved', () => {
    assert.equal(contactContext('en', '/contact/', {topic: 'backend', about: 'AI'}).autoSubject, contactTopics.backend.en);
    assert.equal(contactContext('pl', '/contact/', {about: 'Backend'}).autoSubject, contactTopics.backend.pl);
    assert.equal(contactContext('en', '/contact/', {about: 'Bardzo własny temat'}).autoSubject, 'Bardzo własny temat');
});

test('source accepts only exact known localized paths, with no URL, query or fragment', () => {
    for (const locale of site.locales) for (const path of routes) assert.equal(knownSource(localePath(locale, path)), localePath(locale, path));
    for (const value of ['https://michalsalek.com/pl/', '/pl/?email=a', '/pl/#x', '/pl', '//evil.test/', '/unknown/', ['/', '/pl/'], null]) assert.equal(knownSource(value), null);
    assert.equal(contactContext('pl', '/contact/', {from: '/software/backend/?x=1'}).sourcePath, '/pl/contact/');
    assert.equal(contactContext('en', '/contact/', {from: '/pl/software/backend/'}).sourcePath, '/pl/software/backend/');
    assert.equal(withContactSource('Message', '/pl/software/backend/'), 'Message\n\nhttps://michalsalek.com/pl/software/backend/');
});

test('an already appended canonical source is not duplicated', () => {
    const message = 'Message\n\nhttps://michalsalek.com/pl/software/backend/';
    assert.equal(withContactSource(message, '/pl/software/backend/'), message);
});

test('legacy query values matching object prototype keys remain plain subject text', () => {
    for (const about of ['constructor', '__proto__']) {
        const context = contactContext('en', '/contact/', {about});
        assert.equal(context.topicId, 'general');
        assert.equal(context.autoSubject, about);
        assert.equal(context.legacySubject, about);
    }
});
