import {expect, test} from '@playwright/test';
import {portfolioMessages, portfolioPath, portfolioProjects} from '../../src/content/portfolio.mjs';
import {localePath, site} from '../../src/content/site.mjs';

for (const locale of site.locales) {
    test(`${locale}: portfolio cards keep their grid, actions and technology labels`, async ({page}) => {
        for (const width of [1440, 1024, 390, 320]) {
            await page.setViewportSize({width, height: 900});
            await page.goto(localePath(locale, '/'));
            await page.evaluate(() => document.fonts.ready);
            const showcase = page.locator('section[aria-labelledby="portfolio-showcase-title"]');
            const cards = showcase.locator('article');
            await expect(cards).toHaveCount(3);
            await expect(cards.locator('figure[data-asset-kind="illustration"]')).toHaveCount(3);
            const metrics = await showcase.evaluate(section => {
                const rect = (el: Element) => {
                    const r = el.getBoundingClientRect();
                    return {x: r.x, y: r.y, right: r.right, bottom: r.bottom, height: r.height};
                };
                const header = section.querySelector('header')!;
                const rows = Array.from(section.querySelectorAll('article'));
                return {
                    header: Array.from(header.children).map(rect),
                    cards: rows.map(row => {
                        const copy = row.querySelector('a > div')!;
                        const action = copy.querySelector(':scope > span:last-child')!;
                        return {row: rect(row), image: rect(row.querySelector('figure')!), title: rect(row.querySelector('h2')!), action: rect(action),
                            contentRight: rect(copy).right - parseFloat(getComputedStyle(copy).paddingRight)};
                    }),
                    overflow: document.documentElement.scrollWidth > window.innerWidth,
                };
            });
            expect(metrics.overflow).toBe(false);
            for (const card of metrics.cards) expect(Math.abs(card.action.right - card.contentRight)).toBeLessThan(1.1);
            if (width >= 700) {
                const [, left, right] = metrics.cards;
                expect(Math.abs(metrics.header[0].y - metrics.header[1].y)).toBeLessThan(1.1);
                expect(Math.abs(metrics.header[1].x - right.row.x)).toBeLessThan(1.1);
                expect(Math.abs(metrics.cards[0].image.right - (left.row.right + right.row.x) / 2)).toBeLessThan(1.1);
                expect(Math.abs(left.image.height - right.image.height)).toBeLessThan(1.1);
                expect(Math.abs(left.title.y - right.title.y)).toBeLessThan(1.1);
                expect(Math.abs(left.action.bottom - right.action.bottom)).toBeLessThan(1.1);
            } else {
                for (const card of metrics.cards) expect(card.image.bottom).toBeLessThanOrEqual(card.title.y);
            }
        }
        await page.goto(localePath(locale, '/portfolio/'));
        for (const project of portfolioProjects) {
            const card = page.locator(`article[id="${project.id}"]`);
            await expect(card.locator('figure')).toHaveAttribute('data-asset-kind', 'illustration');
            await expect(card.getByText('NDA', {exact: true})).toBeVisible();
            await expect(card.getByRole('list', {name: portfolioMessages[locale].technologies}).locator('li')).toHaveText(project.technologies);
        }
    });

    test(`${locale}: application demonstrations start below the opening viewport`, async ({page}) => {
        for (const [width, height] of [[3840, 2160], [1920, 1080], [1440, 900], [390, 844]]) {
            await page.setViewportSize({width, height});
            for (const project of portfolioProjects.filter(item => ['b2b-service-platform', 'shopify-product-experience'].includes(item.id))) {
                await page.goto(localePath(locale, portfolioPath(project)));
                await page.evaluate(() => document.fonts.ready);
                const demo = page.locator('[data-application-demo="true"]');
                await expect(demo).toHaveCount(1);
                const rect = await demo.boundingBox();
                expect(rect!.y).toBeGreaterThanOrEqual(height);
                await demo.scrollIntoViewIfNeeded();
                const image = demo.locator('img');
                await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
                const fullImage = demo.getByRole('link');
                await expect(fullImage).toHaveAttribute('href', /^\/service-visuals\/.+\.webp$/);
                await expect(fullImage).toHaveAttribute('target', '_blank');
                if (width === 1920) {
                    const response = await page.request.get((await fullImage.getAttribute('href'))!);
                    expect(response.status()).toBe(200);
                    expect(response.headers()['content-type']).toContain('image/webp');
                }
            }
        }
    });
}
