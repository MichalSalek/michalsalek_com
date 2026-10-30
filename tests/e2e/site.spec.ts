import { test, expect } from '@playwright/test';
import { routes, localePath, site } from '../../src/content/site.mjs';

for (const locale of site.locales) for (const path of routes) {
    test(`${locale} ${path} renders without errors or horizontal overflow`, async ({page}) => {
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(localePath(locale, path));
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
        await expect(page.locator('h1')).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        expect(await page.locator('a a, a button, button a, a [role="button"], a [tabindex="0"], p p').count()).toBe(0);
        expect(errors).toEqual([]);
    });
}

test('language switch preserves the page and contact subject', async ({page}) => {
    await page.goto('/contact/?about=Backend%20%26%20AI');
    await expect(page.locator('[name="subject"]')).toHaveValue('Backend & AI');
    await page.getByRole('link', {name: 'PL: Zmień język na polski'}).click();
    await expect(page).toHaveURL(/\/pl\/contact\/\?about=Backend%20%26%20AI/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl');
    await expect(page.locator('[name="subject"]')).toHaveValue('Backend & AI');
    await page.getByRole('link', {name: 'EN: Switch language to English'}).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('contact mode is explicit and delivery feedback reflects the service response', async ({page}) => {
    if (test.info().project.name === 'mobile') await page.setViewportSize({width: 320, height: 844});
    await page.goto('/pl/contact/');
    await expect(page.getByRole('status')).toBeEmpty();
    await expect(page.getByRole('link', {name: site.email})).toHaveAttribute('href', `mailto:${site.email}`);
    const send = page.getByRole('button', {name: 'Wyślij wiadomość'});
    if (await send.count()) {
        let requests = 0;
        await page.route('**/*', async route => {
            if (route.request().method() === 'POST') {
                requests++;
                await route.fulfill({status: requests === 1 ? 502 : 204, headers: {'access-control-allow-origin': '*'}});
            } else await route.continue();
        });
        await page.locator('[name="email"]').fill('test@example.com');
        await page.locator('[name="subject"]').fill('Project');
        await page.locator('[name="message"]').fill('Test message kept after failure');
        await send.click();
        await expect(page.getByRole('status')).toContainText('Nie udało się');
        const feedbackBox = await page.getByRole('status').boundingBox();
        const messageBox = await page.locator('.contact-message-body').boundingBox();
        expect(feedbackBox!.y + feedbackBox!.height).toBeLessThanOrEqual(messageBox!.y + messageBox!.height);
        await expect(page.locator('[name="message"]')).toHaveValue('Test message kept after failure');
        await page.getByRole('button', {name: 'OK', exact: true}).click();
        await expect(page.locator('[name="message"]')).toHaveValue('Test message kept after failure');
        await send.click();
        await expect(page.getByRole('status')).toContainText('została wysłana');
        await page.getByRole('button', {name: 'OK', exact: true}).click();
        await expect(page.locator('[name="message"]')).toHaveValue('');
        expect(requests).toBe(2);
    } else {
        await expect(page.getByRole('button', {name: 'Otwórz pocztę'})).toBeVisible();
        await expect(page.locator('#email-hint')).toContainText('szkic');
    }
});

test('software owns the homepage while sound stays separately accessible', async ({page}) => {
    await page.goto('/');
    await expect(page.locator('main .service-card')).toHaveCount(3);
    await expect(page.locator('main .service-card[href*="/sound/"]')).toHaveCount(0);
    await page.locator('footer').getByRole('link', {name: 'Sound services'}).click();
    await expect(page.locator('main .service-card')).toHaveCount(2);
});

test('static content and language links work without JavaScript', async ({browser}) => {
    const context = await browser.newContext({javaScriptEnabled: false});
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4318/pl/software/backend/');
    await expect(page.getByRole('heading', {name: 'Backend i logika aplikacji', exact: true})).toBeVisible();
    await expect(page.getByText('Na każdym etapie', {exact: false})).toBeVisible();
    await page.getByRole('link', {name: 'EN: Switch language to English'}).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.goto('http://127.0.0.1:4318/pl/contact/');
    await expect(page.getByRole('link', {name: site.email})).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    await context.close();
});

test('the original card treatment keeps readable controls, discreet credits and a stationary hover', async ({page}) => {
    await page.goto('/');
    const card = page.locator('.service-card').first();
    const title = card.locator('h2');
    await expect(title).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(card.locator('.read-more')).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(card.locator('p').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(card.locator('.read-more')).toHaveCSS('text-decoration-line', 'none');
    await expect(card.locator('figcaption')).toHaveCSS('font-size', '6px');
    await expect(card.locator('figcaption')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await card.scrollIntoViewIfNeeded();
    const before = await card.boundingBox();
    await card.hover();
    await page.waitForTimeout(160);
    expect(await card.boundingBox()).toEqual(before);
    await expect(card.locator('img')).toBeVisible();
    if (test.info().project.name === 'desktop') {
        const positions = await page.locator('.read-more').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().bottom));
        expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(2);
    }
});

test('article contact panels keep both enquiry paths and prefill the service', async ({page}) => {
    await page.goto('/software/backend/');
    await expect(page.locator('.contact-cta .link-button')).toHaveCount(2);
    const enquiry = page.locator('.contact-cta .link-button').first();
    await enquiry.click();
    await expect(page.locator('[name="subject"]')).not.toHaveValue('');
    if (test.info().project.name === 'desktop') {
        const email = await page.locator('[name="email"]').boundingBox();
        const subject = await page.locator('[name="subject"]').boundingBox();
        expect(Math.abs(email!.y - subject!.y)).toBeLessThan(2);
        expect(email!.x).toBeLessThan(subject!.x);
    }
});

test('a CTA highlights the prefilled subject and respects reduced motion', async ({page}) => {
    await page.goto('/pl/software/ai-automation/');
    await page.locator('.contact-cta .link-button').first().click();
    const subject = page.locator('[name="subject"]');
    await expect(subject).toHaveValue('Automatyzacje AI dla Twojej firmy');
    const field = subject.locator('xpath=ancestor::*[contains(@class,"MuiFormControl-root")]');
    await expect.poll(() => field.evaluate(el => el.getAnimations().length)).toBeGreaterThan(0);
    const filters = await field.evaluate(el => {
        const animation = el.getAnimations()[0];
        animation.pause();
        animation.currentTime = 850;
        const lit = getComputedStyle(el).filter;
        animation.currentTime = 950;
        const unlit = getComputedStyle(el).filter;
        return {lit, unlit};
    });
    expect(filters.lit).toContain('drop-shadow');
    expect(filters.unlit).not.toBe(filters.lit);
    expect(filters.unlit === 'none' || filters.unlit.includes('rgba(0, 0, 0, 0)')).toBe(true);
    await page.emulateMedia({reducedMotion: 'reduce'});
    await expect(field).toHaveCSS('animation-duration', '0s');
    await expect(subject).toHaveValue('Automatyzacje AI dla Twojej firmy');
});
