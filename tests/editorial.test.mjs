import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {compileEditorial, compileWithPlan, compositionSignature, editorialPaths, editorialPlans} from '../src/content/editorial.mjs';
import {portfolioPath, portfolioProjects} from '../src/content/portfolio.mjs';
import {routes} from '../src/content/site.mjs';

const json = async path => JSON.parse(await readFile(path, 'utf8'));
const locales = ['pl', 'en'];
const sort = values => values.map(value => JSON.stringify(value)).sort();

async function sources(locale) {
    const articles = await json(`src/content/${locale}-articles.json`);
    const services = Object.fromEntries(Object.entries(articles)
        .filter(([key]) => key.startsWith('software/') || key.startsWith('sound/'))
        .map(([key, article]) => [`/${key}/`, article]));
    const projects = await Promise.all(portfolioProjects.map(async project => [portfolioPath(project), await json(`src/content/portfolio/${locale}/${project.id}.json`)]));
    return {...services, ...Object.fromEntries(projects)};
}

function sourceStructure(sections) {
    return sections.map(section => ({paragraphs: section.paragraphs.length, items: (section.items ?? []).length, facts: (section.facts ?? []).length}));
}

test('editorial registry covers exactly the terminal service and project articles', async () => {
    const expected = Object.keys(await sources('en')).sort();
    assert(expected.length > 0);
    assert.deepEqual([...editorialPaths].sort(), expected);
    assert.equal(new Set(editorialPaths).size, expected.length);
    for (const path of editorialPaths) assert(routes.includes(path), path);
    assert.equal(compileEditorial({locale: 'en', path: '/', sections: []}), null);
    assert.equal(compileEditorial({locale: 'en', path: '/portfolio/', sections: []}), null);
});

test('every localized plan preserves each source paragraph, item and fact exactly once', async () => {
    const all = await Promise.all(locales.map(sources));
    assert.deepEqual(Object.keys(all[0]).sort(), Object.keys(all[1]).sort());
    for (const path of editorialPaths) {
        assert.deepEqual(sourceStructure(all[0][path].sections), sourceStructure(all[1][path].sections), `${path} locale source structure`);
        for (const [index, locale] of locales.entries()) {
            const source = all[index][path];
            const compiled = compileEditorial({locale, path, sections: source.sections, intro: source.intro ?? [], role: source.role ?? '', audience: source.audience ?? '', stack: source.stack ?? [], projectId: path.startsWith('/portfolio/') ? 'project' : ''});
            assert(compiled, `${locale} ${path}`);
            assert.equal(compiled.chapters.length, editorialPlans[path].chapters.length);
            const actual = {
                paragraphs: compiled.chapters.flatMap(chapter => chapter.paragraphs.map(paragraph => paragraph.text)),
                items: compiled.chapters.flatMap(chapter => chapter.items),
                facts: compiled.chapters.flatMap(chapter => chapter.facts),
            };
            const expected = {
                paragraphs: source.sections.flatMap(section => section.paragraphs),
                items: source.sections.flatMap(section => section.items ?? []),
                facts: source.sections.flatMap(section => section.facts ?? []),
            };
            for (const key of Object.keys(expected)) assert.deepEqual(sort(actual[key]), sort(expected[key]), `${locale} ${path} ${key}`);
            assert.deepEqual(compiled.intro, source.intro ?? []);
            assert.equal(compiled.role, source.role ?? '');
            assert.deepEqual(compiled.stack, source.stack ?? []);
        }
    }
});

test('compositions vary in structure, length and reference format', () => {
    const plans = Object.values(editorialPlans);
    const signatures = plans.map(compositionSignature);
    assert.equal(new Set(signatures).size, plans.length, 'each article has a distinct structural signature');
    const chapterCounts = new Set(plans.map(plan => plan.chapters.length));
    assert(chapterCounts.size > 1, 'chapter counts should vary');
    for (const [path, plan] of Object.entries(editorialPlans)) {
        assert(plan.chapters.length >= 2 && plan.chapters.length <= 5, `${path} chapter count`);
        assert(plan.chapters.some(chapter => chapter.exhibit), `${path} needs an exhibit`);
    }
    assert(new Set(plans.map(plan => plan.reference)).size >= 3, 'reference formats should vary');
    assert(new Set(plans.map(plan => plan.opening)).size >= 3, 'opening compositions should vary');
});

test('compiler rejects incomplete, repeated and invalid selections and untranslated content', () => {
    const section = {title: 'Source', paragraphs: ['One', 'Two'], items: [{title: 'Item', description: 'Description'}], facts: [{term: 'Fact', detail: 'Detail'}]};
    const input = {locale: 'en', path: '/test/', sections: [section]};
    const plan = {opening: 'essay', cover: 'opening', toc: 'none', reference: 'inline', chapters: [
        {id: 'first', title: {pl: 'Pierwszy', en: 'First'}, layout: 'prose', take: [{section: 0, paragraphs: [0], items: 'all'}]},
        {id: 'second', title: {pl: 'Drugi', en: 'Second'}, layout: 'reference', take: [{section: 0, paragraphs: [1], facts: 'all'}]},
    ]};
    assert.equal(compileWithPlan(plan, input).chapters.length, 2);
    const missing = structuredClone(plan);
    delete missing.chapters[1].take[0].facts;
    assert.throws(() => compileWithPlan(missing, input), /Missing editorial content/);
    const duplicate = structuredClone(plan);
    duplicate.chapters[1].take[0].paragraphs = [0, 1];
    assert.throws(() => compileWithPlan(duplicate, input), /Repeated editorial content/);
    const outOfRange = structuredClone(plan);
    outOfRange.chapters[1].take[0].paragraphs = [2];
    assert.throws(() => compileWithPlan(outOfRange, input), /Invalid editorial selection/);
    const untranslated = structuredClone(plan);
    untranslated.chapters[0].title.en = '';
    assert.throws(() => compileWithPlan(untranslated, input), /Missing editorial translation/);
});
