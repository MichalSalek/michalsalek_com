import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { portfolioProjects, portfolioMessages, portfolioPath } from '../../src/content/portfolio.mjs';
import { localePath, site, type Locale } from '../../src/content/site.mjs';

const switchLabel: Record<Locale, string> = {
    en: 'PL: Zmień język na polski',
    pl: 'EN: Switch language to English',
};

for (const locale of site.locales) {
    const other: Locale = locale === 'en' ? 'pl' : 'en';
    test(`${locale}: portfolio listing, language, return and contact journeys`, async ({page}) => {
        test.setTimeout(120_000);
        await page.goto(localePath(locale, '/portfolio/'));
        await expect(page.getByRole('heading', {level: 1})).toHaveText('Portfolio');
        await expect(page.getByText(portfolioMessages[locale].confidentiality, {exact: true})).toBeVisible();
        for (const project of portfolioProjects) {
            const path = portfolioPath(project);
            const row = page.locator('main article').filter({has: page.getByRole('heading', {name: project[locale].title, exact: true})});
            const card = row.locator(`a[href="${localePath(locale, path)}"]`);
            await expect(row).toHaveCount(1);
            await expect(row.locator('a')).toHaveCount(1);
            await expect(card).toHaveCount(1);
            await expect(card.locator('a, button, [role="button"]')).toHaveCount(0);
            const image = card.locator('img');
            await image.scrollIntoViewIfNeeded();
            await expect(image).toBeVisible();
            await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0 && img.naturalHeight > 0)).toBe(true);
            const dimensions = await image.boundingBox();
            expect(dimensions && dimensions.width > 0 && dimensions.height > 0).toBe(true);
            const heading = await card.getByRole('heading', {name: project[locale].title, exact: true}).boundingBox();
            if (test.info().project.name === 'desktop') expect(dimensions!.x + dimensions!.width).toBeLessThanOrEqual(heading!.x);
            else expect(dimensions!.y + dimensions!.height).toBeLessThanOrEqual(heading!.y);
            await card.click();
            await expect(page).toHaveURL(new RegExp(`${localePath(locale, path)}$`));
            await expect(page.getByRole('heading', {level: 1})).toHaveText(project[locale].title);
            for (const id of ['context', 'delivery', 'engineering']) {
                await expect(page.locator(`section#${id}`)).toBeVisible();
                await expect(page.locator(`a[href="#${id}"]`)).toHaveCount(1);
            }
            await page.getByRole('link', {name: switchLabel[locale]}).click();
            await expect(page).toHaveURL(new RegExp(`${localePath(other, path)}$`));
            await expect(page.getByRole('heading', {level: 1})).toHaveText(project[other].title);
            await page.getByRole('link', {name: switchLabel[other]}).click();
            await expect(page.getByRole('heading', {level: 1})).toHaveText(project[locale].title);
            await page.getByRole('link', {name: portfolioMessages[locale].contact}).click();
            await expect(page.locator('[name="subject"]')).toHaveValue(project[locale].title);
            await page.goBack();
            await page.getByRole('link', {name: portfolioMessages[locale].all, exact: true}).click();
            await expect(page).toHaveURL(new RegExp(`${localePath(locale, '/portfolio/')}#${project.id}$`));
        }
    });

    test(`${locale}: detail content remains available without JavaScript`, async ({browser, baseURL}) => {
        test.setTimeout(60_000);
        const context = await browser.newContext({baseURL, javaScriptEnabled: false});
        try {
            const page = await context.newPage();
            for (const project of portfolioProjects) {
                const content = JSON.parse(readFileSync(`src/content/portfolio/${locale}/${project.id}.json`, 'utf8'));
                await page.goto(localePath(locale, portfolioPath(project)));
                await expect(page.getByRole('heading', {level: 1})).toHaveText(project[locale].title);
                await expect(page.locator('section#engineering')).toContainText(content.sections[2].paragraphs[0]);
                await expect(page.locator('section#engineering')).toContainText(content.stack[0].term);
                await expect(page.getByRole('link', {name: switchLabel[locale]})).toHaveAttribute('href', localePath(other, portfolioPath(project)));
            }
        } finally {
            await context.close();
        }
    });

    test(`${locale}: unknown portfolio project returns 404`, async ({request}) => {
        const response = await request.get(`${locale === 'pl' ? '/pl' : ''}/portfolio/unknown-project-for-test/`);
        expect(response.status()).toBe(404);
    });

    test(`${locale}: navigation, titles and technology tables fit at 320px`, async ({page}) => {
        test.setTimeout(60_000);
        await page.setViewportSize({width: 320, height: 844});
        for (const project of portfolioProjects) {
            await page.goto(localePath(locale, portfolioPath(project)));
            await page.evaluate(() => document.fonts.ready);
            const nav = page.getByRole('navigation', {name: locale === 'pl' ? 'Nawigacja główna' : 'Main navigation'});
            const links = nav.getByRole('link');
            const rects = await links.evaluateAll(elements => elements.map(element => {
                const rect = element.getBoundingClientRect();
                return {left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom};
            }));
            expect(rects.length).toBeGreaterThan(1);
            for (const rect of rects) expect(rect.left >= 0 && rect.right <= 320).toBe(true);
            for (let i = 1; i < rects.length; i++) expect(rects[i - 1].right <= rects[i].left).toBe(true);
            for (const selector of ['h1', 'section#engineering table']) {
                const element = page.locator(selector);
                await expect(element).toBeVisible();
                expect(await element.evaluate(node => {
                    const rect = node.getBoundingClientRect();
                    return rect.left >= 0 && rect.right <= window.innerWidth && node.scrollWidth <= node.clientWidth;
                })).toBe(true);
            }
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        }
    });
}
