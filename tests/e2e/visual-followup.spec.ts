import {expect, test, type Page} from '@playwright/test';
import {localePath, routes, site} from '../../src/content/site.mjs';

test.beforeEach(async ({page}) => {
    await page.route('**/*', async route => {
        const request = route.request();
        if (['POST', 'OPTIONS'].includes(request.method())) return route.fulfill({status: 204});
        const host = new URL(request.url()).hostname;
        if (['googletagmanager.com', 'google-analytics.com'].some(domain => host === domain || host.endsWith(`.${domain}`))) return route.fulfill({status: 200, body: ''});
        return route.continue();
    });
});

async function checkSequence(page: Page, vertical: boolean) {
    const sequence = page.locator('[data-exhibit-sequence]');
    await expect(sequence.locator('ol > li')).toHaveCount(3);
    const boxes = await sequence.locator('ol > li').evaluateAll(elements => elements.map(element => {
        const rect = element.getBoundingClientRect();
        return {x: rect.x, y: rect.y, width: rect.width, height: rect.height};
    }));
    for (let index = 1; index < boxes.length; index++) {
        if (vertical) {
            expect(Math.abs(boxes[index].x - boxes[0].x)).toBeLessThan(1);
            expect(boxes[index].y).toBeGreaterThanOrEqual(boxes[index - 1].y + boxes[index - 1].height);
        } else {
            expect(Math.abs(boxes[index].y - boxes[0].y)).toBeLessThan(1);
            expect(boxes[index].x).toBeGreaterThanOrEqual(boxes[index - 1].x + boxes[index - 1].width);
        }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}

for (const locale of site.locales) {
    test(`${locale}: sitemap groups preserve every public destination exactly once`, async ({page}) => {
        await page.goto(localePath(locale, '/sitemap/'));
        await expect(page.locator('.sitemap-groups section > h2')).toHaveCount(5);
        const links = await page.locator('.sitemap-groups a').evaluateAll(elements => elements.map(element => element.getAttribute('href')));
        expect(links.sort()).toEqual(routes.map(path => localePath(locale, path)).sort());
    });

    test(`${locale}: sequential exhibits preserve the reading direction on desktop and phones`, async ({page}, info) => {
        for (const path of ['/software/automation/', '/software/frontend/'] as const) {
            await page.goto(localePath(locale, path));
            await checkSequence(page, info.project.name === 'mobile');
            if (info.project.name === 'mobile') {
                await page.setViewportSize({width: 320, height: 844});
                await checkSequence(page, true);
                await page.setViewportSize({width: 390, height: 844});
            }
        }
    });

    test(`${locale}: an unknown URL keeps its HTTP status and requested navigation language`, async ({page}) => {
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        const response = await page.goto(`${locale === 'pl' ? '/pl' : ''}/missing-visual-review-page/`);
        expect(response?.status()).toBe(404);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.getByRole('navigation', {name: locale === 'pl' ? 'Nawigacja główna' : 'Main navigation', exact: true})).toBeVisible();
        await expect(page.getByRole('navigation', {name: locale === 'pl' ? 'Nawigacja w stopce' : 'Footer navigation', exact: true})).toBeVisible();
        await expect(page.locator('header .language-link')).toHaveAttribute('hrefLang', locale === 'pl' ? 'en' : 'pl');
        await expect(page.getByRole('link', {name: 'Back to home', exact: true})).toHaveAttribute('href', `${site.origin}/`);
        await expect(page.getByRole('link', {name: 'Wróć na stronę główną', exact: true})).toHaveAttribute('href', `${site.origin}/pl/`);
        expect(errors).toEqual([]);
    });
}
