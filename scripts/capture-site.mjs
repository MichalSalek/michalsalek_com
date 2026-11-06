import {chromium} from '@playwright/test';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {routes, site, localePath} from '../src/content/site.mjs';
import {editorialPaths} from '../src/content/editorial.mjs';
import {findPortfolioProject, projectsForService} from '../src/content/portfolio.mjs';

const args = process.argv.slice(2);
const option = name => args[args.indexOf(name) + 1];
if (!args.includes('--base-url')) throw new Error('Usage: npm run qa:visuals -- --base-url http://127.0.0.1:4326 [--out .playwright-mcp/site-review]');
const base = option('--base-url').replace(/\/$/, '');
const output = path.resolve(args.includes('--out') ? option('--out') : '.playwright-mcp/site-review');
const local = JSON.parse(await readFile('out/release.json', 'utf8'));
const release = await (await fetch(`${base}/release.json`, {cache: 'no-store'})).json();
if (release.sha !== local.sha || JSON.stringify(release.pages) !== JSON.stringify(local.pages)) throw new Error('The preview is not serving the current exported build');
await mkdir(output, {recursive: true});
const browser = await chromium.launch();
const captures = [], issues = [], states = [], files = [], bounds4k = [];
const surfaces = [
    ['body', '[data-editorial-chapter], .home-intro, main .contact-form, .service-cards, main article, .sitemap-list'],
    ['examples', '[data-project-examples]'], ['related', '.related-services'],
    ['contact', '.contact-cta:has(.contact-form-compact)'], ['project-ending', 'main article > footer'],
    ['footer', '.site-shell > footer'],
];

async function safeContext(viewport) {
    const context = await browser.newContext({viewport});
    // Install before the first navigation, including all state and responsive captures.
    await context.route('**/*', async route => {
        const request = route.request();
        const url = request.url();
        if (['POST', 'OPTIONS'].includes(request.method())) {
            await route.fulfill({status: request.method() === 'POST' ? 502 : 204, headers: {'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'}});
        } else if (/(^|\.)(google-analytics\.com|googletagmanager\.com|analytics\.google\.com|posthog\.com)$/.test(new URL(url).hostname)) await route.fulfill({status: 200, contentType: 'application/javascript', body: ''});
        else await route.continue();
    });
    return context;
}
async function checkedGoto(page, url) {
    const response = await page.goto(`${base}${url}`, {waitUntil: 'load'});
    if (!response || response.status() !== 200 || createHash('sha256').update(await response.body()).digest('hex') !== local.pages[url]) throw new Error(`The captured HTML differs from the current export: ${url}`);
    await page.evaluate(() => document.fonts.ready);
}
async function capture(page, filename, target) {
    if (target) {
        const top = await target.evaluate(element => element.getBoundingClientRect().top + scrollY);
        await page.evaluate(y => scrollTo({top: Math.max(0, y - 160), behavior: 'instant'}), top);
    } else await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
    await page.waitForTimeout(250);
    await page.screenshot({path: path.join(output, filename)});
    files.push(filename);
}
async function complete(target, filename) {
    const page = target.page();
    const viewport = page.viewportSize();
    const bounds = await target.boundingBox();
    const isHeader = await target.evaluate(element => Boolean(element.closest('.site-shell > header')));
    // A tall element crop must be painted inside the real viewport. The normal
    // viewport frames retain navigation; fixed chrome is omitted only in crops.
    try {
        if (bounds && bounds.height + 160 > viewport.height) await page.setViewportSize({width: viewport.width, height: Math.ceil(bounds.height + 160)});
        await page.waitForTimeout(300);
        await target.screenshot({path: path.join(output, filename), style: `.skip-link { visibility: hidden !important; } ${isHeader ? '' : '.site-shell > header { visibility: hidden !important; }'}`});
    } finally { await page.setViewportSize(viewport); }
    files.push(filename);
}
async function tiles(page, target, prefix, viewportHeight) {
    const box = await target.evaluate(element => ({top: element.getBoundingClientRect().top + scrollY, height: element.getBoundingClientRect().height}));
    const stride = viewportHeight - 160;
    const count = Math.max(1, Math.ceil(box.height / stride));
    for (let index = 0; index < count; index++) {
        await page.evaluate(y => scrollTo({top: Math.max(0, y), behavior: 'instant'}), box.top + index * stride - 80);
        await page.waitForTimeout(150);
        const filename = `${prefix}-tile-${index + 1}.png`;
        await page.screenshot({path: path.join(output, filename)});
        files.push(filename);
    }
    return count;
}
function monitor(page, viewport) {
    page.on('pageerror', error => issues.push({url: page.url(), viewport, message: error.message}));
}
async function checkOverflow(page, url, viewport) {
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) issues.push({url, viewport, message: 'Horizontal overflow'});
}

try {
    for (const [viewport, size] of [['desktop', {width: 1440, height: 1000}], ['mobile', {width: 390, height: 844}], ['narrow', {width: 320, height: 844}]]) {
        const context = await safeContext(size);
        const page = await context.newPage();
        monitor(page, viewport);
        for (const locale of site.locales) for (const route of routes) {
            const url = localePath(locale, route);
            await checkedGoto(page, url);
            const prefix = `${locale}-${route.split('/').filter(Boolean).join('-') || 'home'}-${viewport}`;
            const service = editorialPaths.includes(route) && !findPortfolioProject(route);
            const hasContact = route !== '/contact/' && route !== '/sitemap/';
            const expected = viewport === 'narrow'
                ? ['navigation', 'footer', ...(hasContact ? ['contact'] : []), ...(route === '/contact/' ? ['full-form'] : [])]
                : ['top', 'body', ...(service && projectsForService(locale, route).length ? ['examples'] : []), ...(service ? ['related'] : []), ...(hasContact ? ['contact'] : []), ...(route === '/contact/' ? ['full-form'] : []), ...(findPortfolioProject(route) ? ['project-ending'] : []), ...(editorialPaths.includes(route) ? ['chapters'] : []), ...(['/portfolio/b2b-service-platform/', '/portfolio/shopify-product-experience/'].includes(route) ? ['demo'] : []), 'footer'];
            const actual = [], chapterTiles = [];
            if (viewport === 'narrow') {
                for (const [name, selector] of [['navigation', '.site-shell > header'], ['footer', '.site-shell > footer'], ['contact', '.contact-cta:has(.contact-form-compact)'], ['full-form', '.contact-form-full']]) {
                    const target = page.locator(selector).first();
                    if (await target.count()) { await complete(target, `${prefix}-${name}-complete.png`); actual.push(name); }
                }
            } else {
                await capture(page, `${prefix}-top.png`); actual.push('top');
                for (const [name, selector] of surfaces) {
                    if (name === 'project-ending' && !findPortfolioProject(route)) continue;
                    let target;
                    for (const candidate of selector.split(', ')) {
                        const match = page.locator(candidate).first();
                        if (await match.count()) { target = match; break; }
                    }
                    if (!target) continue;
                    await capture(page, `${prefix}-${name}.png`, target); actual.push(name);
                    if (['related', 'contact', 'examples', 'footer'].includes(name)) await complete(target, `${prefix}-${name}-complete.png`);
                }
                const fullForm = page.locator('.contact-form-full').first();
                if (await fullForm.count()) { await complete(fullForm, `${prefix}-full-form-complete.png`); actual.push('full-form'); }
                const chapters = page.locator('[data-editorial-chapter]');
                for (let index = 0; index < await chapters.count(); index++) chapterTiles.push(await tiles(page, chapters.nth(index), `${prefix}-chapter-${index + 1}`, size.height));
                if (chapterTiles.length) actual.push('chapters');
                const demos = page.locator('main article [data-application-demo]');
                for (let index = 0; index < await demos.count(); index++) await complete(demos.nth(index), `${prefix}-demo-${index + 1}-complete.png`);
                if (await demos.count()) actual.push('demo');
            }
            await checkOverflow(page, url, viewport);
            captures.push({url, locale, viewport, prefix, expected, actual, chapterTiles});
        }
        if (viewport !== 'narrow') for (const locale of site.locales) {
            await checkedGoto(page, localePath(locale, '/software/automation/'));
            for (const [name, selector] of [['action', 'main article header a.action-link'], ['card', '.related-services [data-info-panel] a']]) {
                const link = page.locator(selector).first();
                await link.evaluate(element => element.scrollIntoView({block: 'center', behavior: 'instant'}));
                if (viewport === 'desktop') {
                    await link.hover(); await page.waitForTimeout(200);
                    const filename = `${locale}-${viewport}-${name}-hover.png`;
                    await page.screenshot({path: path.join(output, filename)}); files.push(filename);
                }
                await link.focus(); await page.waitForTimeout(200);
                const bounds = await link.boundingBox();
                const headerBottom = await page.locator('.site-shell > header').evaluate(element => element.getBoundingClientRect().bottom);
                if (!bounds || bounds.y < headerBottom || bounds.y + bounds.height > size.height) throw new Error(`Focused control is outside the captured viewport: ${locale} ${viewport} ${name}`);
                const filename = `${locale}-${viewport}-${name}-focus.png`;
                await page.screenshot({path: path.join(output, filename)}); files.push(filename);
            }
            for (const [variant, route] of [['full', '/contact/'], ['compact', '/software/automation/']]) {
                let responseStatus = 502;
                await page.route('**/*', async request => {
                    const method = request.request().method();
                    if (method === 'POST' || method === 'OPTIONS') await request.fulfill({status: method === 'POST' ? responseStatus : 204, headers: {'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'}});
                    else await request.fallback();
                });
                await page.goto(`${base}${localePath(locale, route)}`, {waitUntil: 'load'});
                await page.locator('[name="message"]').fill('Preview draft. No message is sent.');
                await page.locator('[name="email"]').fill('preview@example.com');
                const send = page.getByRole('button', {name: locale === 'pl' ? 'Wyślij wiadomość' : 'Send message', exact: true});
                if (await send.count()) {
                    await send.click();
                    const fallback = page.locator('main a.action-link[href^="mailto:"]');
                    await fallback.waitFor();
                    await complete(page.locator('.contact-form'), `${locale}-${viewport}-${variant}-failure-complete.png`);
                    await capture(page, `${locale}-${viewport}-${variant}-email-fallback.png`, fallback);
                    await page.getByRole('button', {name: 'OK', exact: true}).click();
                    responseStatus = 204;
                    await send.click();
                    await page.locator('.contact-feedback.sent').waitFor();
                    await complete(page.locator('.contact-form'), `${locale}-${viewport}-${variant}-acceptance-complete.png`);
                    await page.getByRole('button', {name: 'OK', exact: true}).click();
                    states.push({locale, viewport, variant, failure: 'captured', acceptance: 'captured'});
                } else states.push({locale, viewport, variant, failure: 'not available: email-client mode'});
                await page.unroute('**/*');
            }
        }
        await context.close();
    }
    const context = await safeContext({width: 3840, height: 1400});
    const page = await context.newPage();
    monitor(page, '4k');
    for (const locale of site.locales) {
        const url = localePath(locale, '/');
        await checkedGoto(page, url);
        for (const [name, selector] of [['header', '.site-shell > header nav'], ['footer', '[data-footer-content]']]) {
            const target = page.locator(selector).first();
            const bounds = await target.boundingBox();
            if (!bounds || bounds.width > 1536.5) issues.push({url, viewport: '4k', message: `${name} exceeds 1536px: ${bounds?.width ?? 'missing'}`});
            bounds4k.push({locale, name, width: bounds?.width ?? null});
            if (bounds) await complete(target, `${locale}-${name}-4k.png`);
        }
        await checkOverflow(page, url, '4k');
    }
    await context.close();
    const missing = captures.flatMap(item => item.expected.filter(surface => !item.actual.includes(surface)).map(surface => ({url: item.url, viewport: item.viewport, surface})));
    const inventory = {sha: release.sha, base, views: captures.length, captures, states, bounds4k, missing, issues, completeCapture: 'Tall elements painted in an expanded-height viewport; fixed header and skip link hidden only in non-header element crops. Viewport frames retain normal chrome.'};
    await writeFile(path.join(output, 'inventory.json'), JSON.stringify(inventory, null, 2));
    const index = ['# Capture inventory', '', `Build: ${release.sha}. Views: ${captures.length}. Missing: ${missing.length}.`, '', ...files.map(file => `- [${file}](${file})`)];
    await writeFile(path.join(output, 'INDEX.md'), index.join('\n') + '\n');
    console.log(JSON.stringify({views: captures.length, screenshots: files.length, states, bounds4k, missing, issues}));
    if (missing.length || issues.length) process.exitCode = 1;
} finally { await browser.close(); }
