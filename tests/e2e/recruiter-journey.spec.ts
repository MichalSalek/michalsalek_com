import {expect, test} from '@playwright/test';
import {portfolioMessages, portfolioPath, portfolioProjects} from '../../src/content/portfolio.mjs';
import {localePath, site} from '../../src/content/site.mjs';

test.beforeEach(async ({page}) => {
    await page.route('**/*', async route => {
        const request = route.request();
        if (!['GET', 'HEAD'].includes(request.method())) return route.abort();
        if (/googletagmanager\.com|google-analytics\.com|analytics\.google\.com/.test(request.url())) return route.fulfill({status: 200, contentType: 'application/javascript', body: ''});
        return route.continue();
    });
});

for (const locale of site.locales) {
    test(`${locale}: a recruiter can identify the developer and assess each case`, async ({page}) => {
        await page.goto(localePath(locale, '/'));
        const home = page.locator('main');
        await expect(home).toContainText('Michał Sałek');
        await expect(home).toContainText('2019');
        await expect(home.locator('.home-intro')).toContainText('Node.js');
        const skills = home.getByRole('link', {name: locale === 'pl' ? 'technologie i sposób pracy' : 'technologies and engineering practices'});
        await expect(skills).toHaveAttribute('href', localePath(locale, '/software/fullstack/'));
        const contact = home.locator('.home-intro').getByRole('link', {name: locale === 'pl' ? 'Porozmawiajmy o współpracy' : 'Discuss working together'});
        await expect(contact).toHaveAttribute('href', '#project-contact');

        await page.goto(localePath(locale, '/portfolio/'));
        await expect(page.locator('main header')).toContainText(locale === 'pl' ? 'Michała Sałka' : 'Michał Sałek');
        for (const project of portfolioProjects) {
            await page.goto(localePath(locale, portfolioPath(project)));
            const article = page.locator('main article[data-editorial-kind="project"]');
            const opening = article.locator('header');
            await expect(opening).toContainText('Michał Sałek');
            await expect(opening.getByRole('heading', {name: portfolioMessages[locale].role, exact: true})).toBeVisible();
            await expect(opening.getByRole('list', {name: portfolioMessages[locale].technologies}).locator('li')).toHaveText(project.technologies);
            await expect(opening.getByText('NDA', {exact: true})).toBeVisible();

            if (['b2b-service-platform', 'shopify-product-experience'].includes(project.id)) {
                const demoLink = opening.locator('a[href="#editorial-demos-title"]');
                await expect(demoLink).toBeVisible();
                await demoLink.click();
                await expect(page).toHaveURL(/#editorial-demos-title$/);
                await expect(article.locator('#editorial-demos-title')).toBeInViewport();
                await expect(article.locator('[data-application-demo="true"]')).toHaveCount(1);
            }
        }
        await page.goto(localePath(locale, '/contact/'));
        await expect(page.locator('.contact-invitation')).toContainText(locale === 'pl' ? 'rekrutacji' : 'hiring');
    });
}
