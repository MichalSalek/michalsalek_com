import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { portfolioProjects, portfolioIndex, portfolioPath, portfolioRoutes, findPortfolioProject, getPageMetadata } from '../src/content/portfolio.mjs';
import { routes, site, standardRoutes } from '../src/content/site.mjs';

const nonempty = (value, label) => assert.equal(typeof value === 'string' && value.trim().length > 0, true, label);
const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

test('portfolio catalogue has unique identities, localized summaries and registered routes', () => {
    assert(portfolioProjects.length > 0);
    for (const key of ['id', 'slug']) {
        const values = portfolioProjects.map(project => project[key]);
        assert.equal(new Set(values).size, values.length, `duplicate ${key}`);
        for (const value of values) assert.match(value, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
    assert.deepEqual(portfolioRoutes, ['/portfolio/', ...portfolioProjects.map(portfolioPath)]);
    for (const route of portfolioRoutes) assert.equal(routes.filter(item => item === route).length, 1, route);
    for (const project of portfolioProjects) {
        assert.equal(findPortfolioProject(portfolioPath(project)), project);
        assert(validDate(project.publishedAt), `${project.id}: published date`);
        assert(validDate(project.updatedAt), `${project.id}: updated date`);
        assert(project.updatedAt >= project.publishedAt, `${project.id}: update precedes publication`);
        assert(project.services.length > 0);
        for (const service of project.services) assert(standardRoutes.includes(service), `${project.id}: ${service}`);
        for (const locale of site.locales) for (const field of ['title', 'category', 'summary', 'description']) {
            nonempty(project[locale][field], `${project.id} ${locale} ${field}`);
        }
    }
    assert.equal(findPortfolioProject('/portfolio/nonexistent/'), undefined);
});

test('metadata resolver covers portfolio and regular pages and rejects unknown input', async () => {
    for (const locale of site.locales) {
        const {pages} = JSON.parse(await readFile(`src/content/${locale}.json`, 'utf8'));
        assert.deepEqual(getPageMetadata(locale, '/portfolio/', pages), portfolioIndex[locale]);
        for (const project of portfolioProjects) {
            assert.deepEqual(getPageMetadata(locale, portfolioPath(project), pages), {
                title: project[locale].title, description: project[locale].description,
            });
        }
        for (const path of standardRoutes) {
            const {title, description, intro} = pages[path];
            assert.deepEqual(getPageMetadata(locale, path, pages), {title, description, ...(intro ? {intro} : {})});
        }
        assert.throws(() => getPageMetadata(locale, '/portfolio/nonexistent/', pages), /Missing page metadata/);
    }
    assert.throws(() => getPageMetadata('de', '/portfolio/', {}), /Unknown locale/);
});

test('all case studies have meaningful content and corresponding locale structure', async () => {
    const sectionIds = ['context', 'delivery', 'engineering'];
    const expectedFiles = portfolioProjects.map(project => `${project.id}.json`).sort();
    for (const locale of site.locales) {
        const files = (await readdir(`src/content/portfolio/${locale}`)).filter(name => name.endsWith('.json')).sort();
        assert.deepEqual(files, expectedFiles, `${locale}: content files`);
    }
    for (const project of portfolioProjects) {
        const structures = [];
        for (const locale of site.locales) {
            const data = JSON.parse(await readFile(`src/content/portfolio/${locale}/${project.id}.json`, 'utf8'));
            const label = `${project.id} ${locale}`;
            nonempty(data.audience, `${label} audience`);
            nonempty(data.role, `${label} role`);
            assert(Array.isArray(data.intro) && data.intro.length > 0, `${label} intro`);
            data.intro.forEach(text => nonempty(text, `${label} intro paragraph`));
            assert(Array.isArray(data.sections), `${label} sections`);
            assert.deepEqual(data.sections.map(section => section.id), sectionIds, label);
            for (const section of data.sections) {
                nonempty(section.title, `${label} ${section.id} title`);
                assert(Array.isArray(section.paragraphs) && section.paragraphs.length > 0, `${label} ${section.id} paragraphs`);
                section.paragraphs.forEach(text => nonempty(text, `${label} ${section.id} paragraph`));
                assert(Array.isArray(section.items), `${label} ${section.id} items`);
                for (const item of section.items) {
                    nonempty(item.title, `${label} ${section.id} item title`);
                    nonempty(item.description, `${label} ${section.id} item description`);
                }
            }
            assert(Array.isArray(data.stack) && data.stack.length > 0, `${label} stack`);
            for (const item of data.stack) {
                nonempty(item.term, `${label} stack term`);
                nonempty(item.detail, `${label} stack detail`);
            }
            structures.push({intro: data.intro.length, sections: data.sections.map(section => ({id: section.id, paragraphs: section.paragraphs.length, items: section.items.length})), stack: data.stack.length});
        }
        assert.deepEqual(structures[0], structures[1], `${project.id}: locale structure differs`);
    }
});
