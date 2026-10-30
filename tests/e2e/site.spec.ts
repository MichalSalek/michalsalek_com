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
        await expect(page.locator('main a[href*="github.com"]')).toHaveCount(0);
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
    await expect(page.locator('main .service-card')).toHaveCount(6);
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
    await expect(card.locator('figcaption')).toHaveCount(0);
    await card.scrollIntoViewIfNeeded();
    const before = await card.boundingBox();
    await card.hover();
    await page.waitForTimeout(160);
    expect(await card.boundingBox()).toEqual(before);
    await expect(card.locator('img')).toBeVisible();
    if (test.info().project.name === 'desktop') {
        const rows = await page.locator('.read-more').evaluateAll(nodes => {
            const grouped: Record<string, number[]> = {};
            for (const node of nodes) {
                const row = String(Math.round(node.closest('.service-card')!.getBoundingClientRect().top));
                (grouped[row] ??= []).push(node.getBoundingClientRect().bottom);
            }
            return Object.values(grouped);
        });
        for (const positions of rows) expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(2);
    }
    await page.goto('/sound/');
    const credit = page.locator('.service-card figcaption').first();
    await expect(credit).toHaveCSS('font-size', '6px');
    await expect(credit).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});

test('service illustrations load and select a localized mobile detail', async ({page}) => {
    await page.goto('/pl/');
    const thumbnails = page.locator('.service-artwork-card img');
    await expect(thumbnails).toHaveCount(6);
    for (const image of await thumbnails.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveJSProperty('naturalWidth', 1200);
        expect((await image.boundingBox())!.height).toBe(250);
    }
    for (const locale of site.locales) {
        await page.goto(localePath(locale, '/software/ai-automation/'));
        const image = page.locator('.service-artwork-hero img');
        const mobile = page.viewportSize()!.width < 600;
        await expect(image).toHaveJSProperty('naturalWidth', mobile ? 600 : 1200);
        expect(await image.evaluate(node => (node as HTMLImageElement).currentSrc)).toContain(`ai-${locale}-`);
        expect(await image.evaluate(node => (node as HTMLImageElement).currentSrc)).toContain(mobile ? '-mobile.' : '-detail.');
        await expect(image).toHaveAttribute('alt', new RegExp(locale === 'pl' ? '^Przykładowy interfejs:' : '^Example interface:'));
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

type CueSample = {background: string; width: number; height: number};
type CueRecording = {started: boolean; ended: boolean; visible: boolean; opacity: string; focused: boolean; scroll: number; samples: CueSample[]};
declare global { interface Window { __subjectCue: CueRecording } }

async function recordSubjectCue(page: import('@playwright/test').Page) {
    await page.addInitScript(() => {
        window.__subjectCue = {started: false, ended: false, visible: false, opacity: '', focused: false, scroll: 0, samples: []};
        document.addEventListener('animationstart', event => {
            if (event.animationName !== 'subject-attention') return;
            const box = event.target as HTMLElement;
            const rect = box.getBoundingClientRect();
            const state = window.__subjectCue;
            state.started = true;
            state.visible = rect.top >= (document.querySelector('header')?.getBoundingClientRect().bottom ?? 0) && rect.bottom <= innerHeight;
            state.opacity = getComputedStyle(document.getElementById('main-app-content-box')!).opacity;
            state.focused = document.activeElement?.getAttribute('name') === 'subject';
            state.scroll = scrollY;
            const sample = () => {
                const bounds = box.getBoundingClientRect();
                state.samples.push({background: getComputedStyle(box).backgroundColor, width: bounds.width, height: bounds.height});
                if (!state.ended) requestAnimationFrame(sample);
            };
            sample();
        });
        document.addEventListener('animationend', event => {
            if (event.animationName === 'subject-attention') window.__subjectCue.ended = true;
        });
    });
}

test('a real service CTA produces three visible pulses without moving or focusing the input', async ({page}) => {
    await recordSubjectCue(page);
    await page.goto('/pl/software/ai-automation/');
    const service = await page.locator('h1').innerText();
    await page.locator('.contact-cta .link-button').first().click();
    await expect(page.locator('[name="subject"]')).toHaveValue(service);
    await expect.poll(() => page.evaluate(() => window.__subjectCue.ended)).toBe(true);
    const cue = await page.evaluate(() => window.__subjectCue);
    expect(cue.visible).toBe(true);
    expect(cue.opacity).toBe('1');
    expect(cue.focused).toBe(false);
    const changes = cue.samples.filter((sample, index, all) => index === 0 || sample.background !== all[index - 1].background);
    expect(changes.filter(sample => sample.background === 'rgb(232, 234, 246)')).toHaveLength(3);
    expect(new Set(cue.samples.map(sample => `${sample.width}:${sample.height}`)).size).toBe(1);
    expect(await page.evaluate(() => scrollY)).toBe(cue.scroll);
});

test('an offscreen subject waits for the reader to reveal it before pulsing', async ({page}) => {
    await recordSubjectCue(page);
    await page.setViewportSize({width: 320, height: 480});
    await page.goto('/pl/contact/?about=Integracje');
    await expect(page.locator('[name="subject"]')).toHaveValue('Integracje');
    expect((await page.locator('[name="subject"]').boundingBox())!.y).toBeGreaterThan(480);
    await page.waitForTimeout(1500);
    expect(await page.evaluate(() => window.__subjectCue.started)).toBe(false);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await page.locator('[name="subject"]').scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => window.__subjectCue.ended)).toBe(true);
    expect(await page.evaluate(() => window.__subjectCue.visible)).toBe(true);
});

test('reduced motion retains a static subject cue without animation', async ({page}) => {
    await recordSubjectCue(page);
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.goto('/pl/contact/?about=Test');
    await expect(page.locator('[name="subject"]')).toHaveValue('Test');
    const inputBox = page.locator('.subject-attention .MuiOutlinedInput-root');
    await expect(inputBox).toHaveCSS('background-color', 'rgb(232, 234, 246)');
    await page.waitForTimeout(1500);
    await expect(inputBox).toHaveCSS('background-color', 'rgb(232, 234, 246)');
    expect(await page.evaluate(() => window.__subjectCue.started)).toBe(false);
});


test('breadcrumbs keep the original hierarchy and a distinct current page', async ({page}) => {
    await page.goto('/software/backend/');
    const trail = page.getByRole('navigation', {name: 'Breadcrumb', exact: true});
    await expect(trail.locator('li')).toHaveText(['Sitemap', 'Home', 'Software', 'Backend']);
    await expect(trail).toHaveCSS('font-family', 'Roboto, Helvetica, Arial, sans-serif');
    await expect(trail.locator('[aria-current="page"]')).toHaveCSS('color', 'rgba(0, 0, 0, 0.87)');
    await expect(trail.locator('[aria-current="page"]')).toHaveCSS('font-weight', '700');
    await expect(trail.locator('[aria-current="page"]')).toHaveCSS('text-decoration-line', 'none');
    await expect(trail.locator('[aria-current="page"] a, a[aria-current="page"]')).toHaveCount(0);
    await page.goto('/pl/sound/studio/');
    await expect(page.getByRole('navigation', {name: 'Ścieżka nawigacji'}).locator('li')).toHaveText(['Mapa strony', 'Strona główna', 'Dźwięk', 'Studio']);
});
