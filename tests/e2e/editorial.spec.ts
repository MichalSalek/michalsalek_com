import {expect, test} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {editorialPaths, editorialPlans} from '../../src/content/editorial.mjs';
import {portfolioMessages, portfolioProjects, portfolioPath} from '../../src/content/portfolio.mjs';
import {localePath, site, type Locale, type PagePath} from '../../src/content/site.mjs';

const representatives: PagePath[] = [
    '/software/ai-automation/', '/portfolio/b2b-service-platform/',
    '/portfolio/shopify-product-experience/', '/portfolio/3d-house-planning/',
    '/sound/studio/', '/software/fullstack/',
];

type Source = {
    intro?: string[];
    audience?: string;
    role?: string;
    stack?: {term: string; detail: string}[];
    sections: {paragraphs: string[]; items?: {title: string; description: string}[]; facts?: {term: string; detail: string}[]}[];
};

function sourceFor(locale: Locale, path: PagePath): Source {
    const project = portfolioProjects.find(candidate => portfolioPath(candidate) === path);
    if (project) return JSON.parse(readFileSync(`src/content/portfolio/${locale}/${project.id}.json`, 'utf8')) as Source;
    const articles = JSON.parse(readFileSync(`src/content/${locale}-articles.json`, 'utf8')) as Record<string, Source>;
    const pages = (JSON.parse(readFileSync(`src/content/${locale}.json`, 'utf8')) as {pages: Record<string, {intro?: string[]}>}).pages;
    return {...articles[path.slice(1, -1)], intro: pages[path].intro};
}

// RichTextAtom renders links and emphasis as HTML while preserving their visible words.
function visibleText(value: string): string {
    return value.replace(/\[([^\]]+)\]\((?:https:\/\/|\/)[^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\s+/g, ' ').trim();
}

for (const locale of site.locales) {
    for (const path of representatives) {
        test(`${locale} ${path}: editorial structure, keyboard navigation and narrow viewport`, async ({page}) => {
            const plan = editorialPlans[path];
            const source = sourceFor(locale, path);
            if (test.info().project.name === 'mobile') await page.setViewportSize({width: 320, height: 844});
            await page.goto(localePath(locale, path));
            await page.evaluate(() => document.fonts.ready);
            const main = page.locator('main');
            const article = main.locator('article[data-editorial-opening]');
            await expect(article).toHaveAttribute('data-editorial-opening', plan.opening);
            await expect(article.locator('[data-editorial-chapter]')).toHaveCount(plan.chapters.length);
            const cover = article.locator('[data-editorial-cover="true"]');
            await expect(cover).toHaveCount(1);
            await expect(cover.locator('img')).toBeVisible();
            if (plan.cover === 'opening') await expect(article.locator('header [data-editorial-cover="true"]')).toHaveCount(1);
            else await expect(article.locator(`[data-editorial-chapter="${plan.cover}"] [data-editorial-cover="true"]`)).toHaveCount(1);

            for (const chapter of plan.chapters) {
                const section = article.locator(`[data-editorial-chapter="${chapter.id}"]`);
                await expect(section.locator('> h2')).toHaveAttribute('id', chapter.id);
                if (!chapter.exhibit) continue;
                const exhibit = section.locator('[data-editorial-exhibit]');
                await expect(exhibit).toHaveCount(1);
                await expect(exhibit).toHaveAttribute('data-editorial-exhibit', chapter.exhibit.kind);
                await expect(exhibit.getByRole('heading', {name: chapter.exhibit.title[locale], exact: true})).toBeVisible();
                await expect(exhibit.locator('figcaption')).toContainText(chapter.exhibit.caption[locale]);
                for (const item of chapter.exhibit.items) {
                    await expect(exhibit.locator('dt').filter({hasText: item.label[locale]})).toBeVisible();
                    await expect(exhibit.locator('dd').filter({hasText: item.detail[locale]})).toBeVisible();
                }
                await expect(exhibit.locator('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])')).toHaveCount(0);
            }
            if (source.role) {
                await expect(article.getByRole('heading', {name: portfolioMessages[locale].role, exact: true})).toBeVisible();
                await expect(article.getByText(source.role, {exact: true})).toBeVisible();
                expect(source.role).toContain('Atomic Concept');
            }
            await expect(main).not.toContainText(/Michał\s+Sałek|Michal\s+Salek/i);
            await expect(main.locator('a a, a button, button a, a [role="button"], button button')).toHaveCount(0);
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

            if (plan.toc !== 'none') {
                const chapter = plan.chapters[plan.chapters.length - 1];
                const link = article.locator(`nav a[href="#${chapter.id}"]`);
                await expect(link).toHaveCount(1);
                await link.focus();
                await expect(link).toBeFocused();
                await page.keyboard.press('Enter');
                await expect(page).toHaveURL(new RegExp(`#${chapter.id}$`));
                await expect(article.locator(`#${chapter.id}`)).toBeInViewport();
                await expect(article.locator(`#${chapter.id}`)).toBeFocused();
            }
        });
    }

    test(`${locale}: all editorial source content remains readable without JavaScript`, async ({browser, baseURL}) => {
        test.setTimeout(120_000);
        const context = await browser.newContext({baseURL, javaScriptEnabled: false});
        try {
            const page = await context.newPage();
            for (const path of editorialPaths) {
                const source = sourceFor(locale, path);
                const response = await page.goto(localePath(locale, path));
                expect(response?.ok(), `${locale} ${path}`).toBe(true);
                const article = page.locator('main article[data-editorial-opening]');
                await expect(article).toHaveCount(1);
                const text = (await article.innerText()).replace(/\s+/g, ' ');
                const sourceTexts = [
                    ...(source.intro ?? []), ...(source.audience ? [source.audience] : []), ...(source.role ? [source.role] : []),
                    ...source.sections.flatMap(section => [
                        ...section.paragraphs,
                        ...(section.items ?? []).flatMap(item => [item.title, item.description]),
                        ...(section.facts ?? []).flatMap(fact => [fact.term, fact.detail]),
                    ]),
                    ...(source.stack ?? []).flatMap(entry => [entry.term, entry.detail]),
                ];
                for (const value of sourceTexts) expect(text, `${locale} ${path}: ${value}`).toContain(visibleText(value));
            }
        } finally {
            await context.close();
        }
    });
}
