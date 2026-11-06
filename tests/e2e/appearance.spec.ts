import {expect, test, type Locator, type Page} from '@playwright/test';
import {editorialPaths} from '../../src/content/editorial.mjs';
import {localePath, primaryServices, relatedServices, routes, site} from '../../src/content/site.mjs';
import {projectsForService} from '../../src/content/portfolio.mjs';

const servicePaths = editorialPaths.filter(path => !path.startsWith('/portfolio/'));

// Compute both pixels through every ancestor, including translucent backgrounds and
// group opacity. Text and background take the same path until the text is painted.
async function contrastForDirectText(locator: Locator) {
    return locator.evaluate(element => {
        type Color = [number, number, number, number];
        const parse = (value: string): Color => {
            const parts = value.match(/[\d.]+/g)?.map(Number);
            if (!parts || parts.length < 3) throw new Error(`Unsupported computed color: ${value}`);
            return [parts[0], parts[1], parts[2], parts[3] ?? 1];
        };
        const over = (top: Color, bottom: Color): Color => {
            const a = top[3] + bottom[3] * (1 - top[3]);
            if (a === 0) return [0, 0, 0, 0];
            return [0, 1, 2].map(i => (top[i] * top[3] + bottom[i] * bottom[3] * (1 - top[3])) / a).concat(a) as Color;
        };
        const style = getComputedStyle(element);
        let foreground: Color = parse(style.color);
        let background: Color = [0, 0, 0, 0];
        for (let node: Element | null = element; node; node = node.parentElement) {
            const current = getComputedStyle(node);
            const bg = parse(current.backgroundColor);
            foreground = over(foreground, bg);
            background = over(background, bg);
            const opacity = Number(current.opacity);
            foreground[3] *= opacity;
            background[3] *= opacity;
        }
        foreground = over(foreground, [255, 255, 255, 1]);
        background = over(background, [255, 255, 255, 1]);
        const luminance = (color: Color) => color.slice(0, 3).map(channel => {
            const c = channel / 255;
            return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        }).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
        const light = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
        const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.6667 && Number(style.fontWeight) >= 700);
        return {ratio: (light[0] + 0.05) / (light[1] + 0.05), minimum: large ? 3 : 4.5, text: [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').trim(), foreground, background};
    });
}

async function checkContrast(page: Page, selector: string, context: string) {
    const candidates = page.locator(selector);
    for (let i = 0; i < await candidates.count(); i++) {
        const element = candidates.nth(i);
        const result = await contrastForDirectText(element);
        if (!result.text || !(await element.isVisible())) continue;
        expect(result.ratio, `${context}: “${result.text}” foreground ${result.foreground} background ${result.background}`).toBeGreaterThanOrEqual(result.minimum);
    }
}

const textTargets = [
    '.related-services h3', '.contact-cta h3',
    '.related-services [data-info-panel] :is(h1,h2,h3,h4,h5,h6,a)',
    '.contact-cta [data-info-panel] :is(h1,h2,h3,h4,h5,h6,a)',
    '.related-services [data-info-panel] a *', '.contact-cta [data-info-panel] a *',
    'a.action-link', 'a.action-link *',
].join(', ');

for (const locale of site.locales) {
    test(`${locale}: contact failure and acceptance feedback have readable contrast`, async ({page}) => {
        let attempts = 0;
        await page.route('**/*', async route => {
            const method = route.request().method();
            if (method === 'POST' || method === 'OPTIONS') await route.fulfill({status: method === 'POST' ? (++attempts === 1 ? 502 : 204) : 204, headers: {'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'}});
            else await route.continue();
        });
        await page.goto(localePath(locale, '/contact/'));
        const send = page.getByRole('button', {name: locale === 'pl' ? 'Wyślij wiadomość' : 'Send message', exact: true});
        test.skip(await send.count() === 0, 'Requires the endpoint-configured build');
        await page.locator('[name="email"]').fill('preview@example.com');
        await page.locator('[name="subject"]').fill('Feedback check');
        await page.locator('[name="message"]').fill('This request is intercepted locally.');
        for (const state of ['failed', 'sent']) {
            await send.click();
            await expect(page.locator(`[role="status"].${state}`)).toBeVisible();
            await checkContrast(page, '[role="status"]', `${locale} feedback ${state}`);
            await page.getByRole('button', {name: 'OK', exact: true}).click();
        }
        expect(attempts).toBe(2);
    });
    test(`${locale}: services lead to relevant case studies and contextual enquiries`, async ({page}) => {
        for (const path of primaryServices) {
            await page.goto(localePath(locale, path));
            const examples = projectsForService(locale, path);
            const section = page.locator('[data-project-examples]');
            await expect(section.locator('a')).toHaveCount(examples.length);
            const project = examples[0];
            await section.locator(`a[href="${localePath(locale, project.path)}"]`).click();
            await expect(page.locator('h1')).toHaveText(project.title);
            await page.locator('main article footer a[href*="/contact/"]').click();
            await expect(page.locator('[name="subject"]')).toHaveValue(project.title);
        }
    });
    test(`${locale}: service card headings retain readable contrast`, async ({page}) => {
        for (const path of servicePaths.filter(path => Object.hasOwn(relatedServices, path))) {
            await page.goto(localePath(locale, path));
            await expect(page.locator('.related-services h3'), `${path} related headings`).toHaveCount(2);
            await checkContrast(page, '.related-services h3', `${locale} ${path}`);
        }
    });

    test(`${locale}: info panels and action links have readable text on every page`, async ({page}) => {
        test.setTimeout(120_000);
        for (const path of routes) {
            await page.goto(localePath(locale, path));
            const panels = page.locator('.related-services [data-info-panel], .contact-cta [data-info-panel]');
            if (servicePaths.includes(path) || path === '/' || path === '/sound/') {
                expect(await panels.count(), `${path}: info panels`).toBeGreaterThanOrEqual(2);
                expect(await page.locator('.contact-cta [data-info-panel] h3').count(), `${path}: contact panel headings`).toBeGreaterThanOrEqual(2);
            }
            if (Object.hasOwn(relatedServices, path)) expect(await page.locator('.related-services [data-info-panel] h3').count(), `${path}: related panel headings`).toBeGreaterThanOrEqual(2);
            const actions = page.locator('a.action-link');
            for (let i = 0; i < await actions.count(); i++) {
                const action = actions.nth(i);
                await expect(action).toHaveAttribute('href', /^(\/(?!\/)|mailto:)/);
                await expect(action.locator('[data-link-arrow][aria-hidden="true"]')).toHaveCount(1);
                expect((await action.boundingBox())!.height, `${locale} ${path} action target height`).toBeGreaterThanOrEqual(44);
            }
            await checkContrast(page, textTargets, `${locale} ${path}`);
        }
    });

    test(`${locale}: representative actions and card links remain readable on hover and focus`, async ({page}, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'Hover and keyboard focus are exercised in the desktop browser.');
        await page.goto(localePath(locale, '/software/automation/'));
        for (const selector of ['header a.action-link', '.related-services [data-info-panel] a', '.contact-cta [data-info-panel] a']) {
            const link = page.locator(selector).first();
            await expect(link).toBeVisible();
            await link.hover();
            await page.waitForTimeout(200);
            await checkContrast(page, selector + ', ' + selector + ' *', `${locale} ${selector} hover`);
            await link.focus();
            await page.mouse.move(0, 0);
            await page.waitForTimeout(200);
            await expect(link).toBeFocused();
            await checkContrast(page, selector + ', ' + selector + ' *', `${locale} ${selector} focus`);
        }
    });

    test(`${locale}: primary actions share the same presentation`, async ({page}) => {
        const styles = async (selector: string) => {
            const link = page.locator(selector);
            await expect(link).toHaveCount(1);
            return link.evaluate(element => {
                const s = getComputedStyle(element);
                const arrow = element.querySelector('[data-link-arrow]');
                if (!arrow) throw new Error('Primary action is missing its arrow');
                const a = getComputedStyle(arrow);
                return {border: s.border, fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight, padding: s.padding, textTransform: s.textTransform, arrow: {fontSize: a.fontSize, fontWeight: a.fontWeight, lineHeight: a.lineHeight}};
            });
        };
        await page.goto(localePath(locale, '/'));
        const intro = await styles('.home-intro a.action-link');
        expect(await styles('section[aria-labelledby="portfolio-showcase-title"] > a.action-link')).toEqual(intro);
        await page.goto(localePath(locale, '/software/automation/'));
        expect(await styles('article > header a.action-link')).toEqual(intro);
        await page.goto(localePath(locale, '/portfolio/b2b-service-platform/'));
        expect(await styles('article > footer > a.action-link[href*="/contact/"]')).toEqual(intro);
    });

    test(`${locale}: navigation fits at 4K and 320px`, async ({page}, testInfo) => {
        test.skip(testInfo.project.name !== 'desktop', 'Viewport sizes are set explicitly.');
        for (const width of [3840, 320]) {
            await page.setViewportSize({width, height: 900});
            await page.goto(localePath(locale, '/'));
            await page.evaluate(() => document.fonts.ready);
            const nav = page.locator('header nav[aria-label]').first();
            const box = await nav.boundingBox();
            expect(box).not.toBeNull();
            expect(box!.width).toBeLessThanOrEqual(1536 + 1);
            expect(Math.abs((box!.x + box!.width / 2) - width / 2)).toBeLessThanOrEqual(1);
            const links = nav.locator('a:visible');
            const boxes = await Promise.all((await links.all()).map(link => link.boundingBox()));
            expect(boxes.length).toBeGreaterThanOrEqual(4);
            for (const [i, current] of boxes.entries()) {
                expect(current).not.toBeNull();
                expect(current!.x).toBeGreaterThanOrEqual(box!.x - 1);
                expect(current!.x + current!.width).toBeLessThanOrEqual(box!.x + box!.width + 1);
                if (i > 0) expect(current!.x).toBeGreaterThanOrEqual(boxes[i - 1]!.x + boxes[i - 1]!.width - 1);
            }
            expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
        }
    });
}
