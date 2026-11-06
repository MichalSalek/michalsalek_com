import { test, expect } from '@playwright/test';
import { routes, localePath, site } from '../../src/content/site.mjs';
import { heroMedia } from '../../src/content/media-plan.mjs';
import {editorialPlans} from '../../src/content/editorial.mjs';
import {contactTopics} from '../../src/layers/application/contact-context';

// Keep browser tests isolated from the real contact service and analytics.
test.beforeEach(async ({page}) => {
    await page.route('**/*', async route => {
        const request = route.request();
        if (request.method() === 'OPTIONS' || request.method() === 'POST') return route.fulfill({status: 204, headers: {'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'}});
        if (/googletagmanager\.com|google-analytics\.com|analytics\.google\.com/.test(request.url())) return route.fulfill({status: 200, contentType: 'application/javascript', body: ''});
        return route.continue();
    });
});

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
        if (path.startsWith('/software/') && path !== '/software/fullstack/') {
            await expect(page.locator('[data-editorial-chapter]')).toHaveCount(editorialPlans[path].chapters.length);
            await expect(page.locator('.related-services .link-button')).toHaveCount(2);
        }
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
    await expect(page.locator('main').getByRole('link', {name: site.email})).toHaveAttribute('href', `mailto:${site.email}`);
    const send = page.getByRole('button', {name: 'Wyślij wiadomość'});
    if (await send.count()) {
        let requests = 0;
        await page.route('**/*', async route => {
            if (route.request().method() === 'OPTIONS') {
                await route.fulfill({status: 204, headers: {'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'}});
            } else if (route.request().method() === 'POST') {
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
        await expect(page.getByRole('status')).toContainText('została przyjęta');
        await page.getByRole('button', {name: 'OK', exact: true}).click();
        await expect(page.locator('[name="message"]')).toHaveValue('');
        expect(requests).toBe(2);
    } else {
        await expect(page.getByRole('button', {name: 'Otwórz pocztę'})).toBeVisible();
        await expect(page.locator('#email-hint')).toContainText('szkic');
    }
});

test('the homepage ends with a separate full-stack and sound row', async ({page}) => {
    await page.goto('/');
    await expect(page.locator('main .service-card')).toHaveCount(8);
    const additional = page.locator('.additional-services .service-card');
    await expect(additional).toHaveCount(2);
    await expect(additional.nth(0)).toHaveAttribute('href', '/software/fullstack/');
    await expect(additional.nth(1)).toHaveAttribute('href', '/sound/');
    if (test.info().project.name === 'desktop') {
        const first = await additional.nth(0).boundingBox();
        const second = await additional.nth(1).boundingBox();
        expect(first!.y).toBe(second!.y);
        const firstColumn = await page.locator('.service-cards').first().locator('.service-card').nth(0).boundingBox();
        const secondColumn = await page.locator('.service-cards').first().locator('.service-card').nth(1).boundingBox();
        expect(first!.x).toBeCloseTo(firstColumn!.x, 1);
        expect(second!.x).toBeCloseTo(secondColumn!.x, 1);
    }
    await additional.nth(0).click();
    await expect(page.getByRole('heading', {level: 1})).toHaveText('Full-stack engineering');
    await expect(page.locator('[data-editorial-chapter]')).toHaveCount(editorialPlans['/software/fullstack/'].chapters.length);
    await expect(page.locator('main')).toContainText('PostgreSQL');
    await page.goto('/');
    await page.locator('.additional-services .service-card').last().click();
    await expect(page.locator('main .service-card')).toHaveCount(2);
});

test('static content and language links work without JavaScript', async ({browser}) => {
    const context = await browser.newContext({javaScriptEnabled: false});
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:4318/pl/software/backend/');
    await expect(page.getByRole('heading', {name: 'Backend i logika aplikacji', exact: true})).toBeVisible();
    await expect(page.locator('[data-editorial-chapter]').first()).toBeVisible();
    await expect(page.locator('main')).toContainText(/backend/i);
    await page.getByRole('link', {name: 'EN: Switch language to English'}).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.goto('http://127.0.0.1:4318/pl/software/fullstack/');
    await expect(page.locator('[data-editorial-chapter]')).toHaveCount(editorialPlans['/software/fullstack/'].chapters.length);
    await expect(page.locator('main')).toContainText('Node.js');
    await page.goto('http://127.0.0.1:4318/pl/contact/');
    await expect(page.locator('main').getByRole('link', {name: site.email})).toBeVisible();
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

test('mixed service media load with responsive sources and contextual article content', async ({page}) => {
    await page.goto('/pl/');
    const thumbnails = page.locator('.service-artwork-card img');
    await expect(thumbnails).toHaveCount(8);
    for (const image of await thumbnails.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
        if (!(await image.getAttribute('src'))?.endsWith('.svg')) await expect(image).toHaveAttribute('srcset', /750w/);
        expect((await image.boundingBox())!.height).toBe(250);
    }
    for (const locale of site.locales) {
        await page.goto(localePath(locale, '/software/ai-automation/'));
        await expect(page.locator('[data-editorial-cover]')).toHaveCount(1);
        await expect(page.locator('[data-editorial-chapter]')).toHaveCount(editorialPlans['/software/ai-automation/'].chapters.length);
        await expect(page.locator('[data-editorial-exhibit="review"]')).toHaveCount(1);
    }
});

test('service entry pages have distinct opening scenes, readable scope and an immediate enquiry path', async ({page}) => {
    const scenes = new Set<string>();
    for (const [path, id] of Object.entries(heroMedia).filter(([path]) => path.startsWith('/software/'))) {
        await page.goto(localePath('pl', path as keyof typeof heroMedia));
        const hero = page.locator('[data-editorial-cover]');
        await expect(hero).toHaveCount(1);
        await expect(hero).toHaveAttribute('data-asset', id);
        await expect(page.locator(`main [data-asset="${id}"]`)).toHaveCount(1);
        await expect(hero.locator('img')).toHaveAttribute('loading', editorialPlans[path].cover === 'opening' ? 'eager' : 'lazy');
        await expect(page.locator('main article header p').first()).not.toBeEmpty();
        await expect(page.locator('main article header a[href="#project-contact"]')).toHaveCount(1);
        expect(scenes.has(id)).toBe(false); scenes.add(id);
    }
    await page.locator('main article header a[href="#project-contact"]').click();
    await expect(page.locator('[name="subject"]')).not.toHaveValue('');
    await page.goto('/pl/');
    const kinds = await page.locator('.service-artwork-card').evaluateAll(nodes => nodes.slice(0, 6).map(node => node.classList.contains('service-artwork-photo') ? 'photo' : 'illustration'));
    expect(kinds).toEqual(['illustration', 'photo', 'illustration', 'photo', 'illustration', 'photo']);
    await expect(page.locator('[data-asset="payment-and-fulfilment"] img')).toHaveCSS('object-fit', 'contain');
    await expect(page.locator('.enquiry-answers dt')).toHaveCount(3);
});

test('contextual article explainers remain complete vectors inside the reading column', async ({page}) => {
    for (const path of ['/software/custom-software/', '/software/reporting/', '/software/fullstack/']) {
        await page.goto(localePath('pl', path));
        const image = page.locator('main img[src$=".svg"]').first();
        await image.scrollIntoViewIfNeeded();
        await expect(image).toHaveAttribute('src', /\.svg$/);
        expect((await image.boundingBox())!.width).toBeGreaterThan(0);
        expect((await image.boundingBox())!.width).toBeLessThanOrEqual(320);
        await expect(image).toHaveCSS('object-fit', 'contain');
    }
});

test('article contact panel embeds a prefilled form', async ({page}) => {
    await page.goto('/software/backend/');
    await expect(page.locator('.contact-cta form')).toHaveCount(1);
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.backend.en);
    if (test.info().project.name === 'desktop') {
        await page.goto('/contact/');
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
    await page.locator('main article header a[href="#project-contact"]').click();
    await expect(page).toHaveURL(/\/pl\/software\/ai-automation\/#project-contact$/);
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.ai.pl);
    // Reveal the complete field; Chromium can treat a fractionally clipped border as already in view.
    await page.locator('.subject-attention .MuiOutlinedInput-root').evaluate(element => element.scrollIntoView({block: 'center', behavior: 'instant'}));
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
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.integrations.pl);
    expect((await page.locator('[name="subject"]').boundingBox())!.y).toBeGreaterThan(480);
    await page.waitForTimeout(1500);
    expect(await page.evaluate(() => window.__subjectCue.started)).toBe(false);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await page.locator('.subject-attention .MuiOutlinedInput-root').evaluate(element => element.scrollIntoView({block: 'center', behavior: 'instant'}));
    await expect.poll(() => page.evaluate(() => window.__subjectCue.ended)).toBe(true);
    expect(await page.evaluate(() => window.__subjectCue.visible)).toBe(true);
});

test('reduced motion retains a static subject cue without animation', async ({page}) => {
    await recordSubjectCue(page);
    await page.emulateMedia({reducedMotion: 'reduce'});
    await page.goto('/pl/contact/?topic=backend');
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.backend.pl);
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
