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
const captures = [], issues = [], states = [];
const surfaces = [
    ['body', '[data-editorial-chapter], .home-intro, main .contact-form, .service-cards, main article, .sitemap-list'],
    ['examples', '[data-project-examples]'], ['related', '.related-services'],
    ['contact', '.contact-cta'], ['project-ending', 'main article > footer'],
    ['footer', '.site-shell > footer'],
];

async function capture(page, filename, target) {
    if (target) {
        const top = await target.evaluate(element => element.getBoundingClientRect().top + scrollY);
        await page.evaluate(y => scrollTo({top: Math.max(0, y - 160), behavior: 'instant'}), top);
    } else await page.evaluate(() => scrollTo({top: 0, behavior: 'instant'}));
    await page.waitForTimeout(250);
    await page.screenshot({path: path.join(output, filename)});
}

try {
    for (const [viewport, size] of [['desktop', {width: 1440, height: 1000}], ['mobile', {width: 390, height: 844}]]) {
        const context = await browser.newContext({viewport: size});
        const page = await context.newPage();
        page.on('pageerror', error => issues.push({url: page.url(), message: error.message}));
        for (const locale of site.locales) for (const route of routes) {
            const url = localePath(locale, route);
            const response = await page.goto(`${base}${url}`, {waitUntil: 'load'});
            if (response.status() !== 200 || createHash('sha256').update(await response.body()).digest('hex') !== local.pages[url]) throw new Error(`The captured HTML differs from the current export: ${url}`);
            await page.evaluate(() => document.fonts.ready);
            const prefix = `${locale}-${route.split('/').filter(Boolean).join('-') || 'home'}-${viewport}`;
            const service = editorialPaths.includes(route) && !findPortfolioProject(route);
            const expected = ['top', 'body', ...(service && projectsForService(locale, route).length ? ['examples'] : []), ...(service ? ['related'] : []), ...(service || route === '/' || route === '/sound/' ? ['contact'] : []), ...(findPortfolioProject(route) ? ['project-ending'] : []), 'footer'];
            const actual = [];
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
                if (['related', 'contact', 'examples'].includes(name)) {
                    const filename = `${prefix}-${name}-complete.png`;
                    await target.screenshot({path: path.join(output, filename)});
                }
            }
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
            if (overflow) issues.push({url, viewport, message: 'Horizontal overflow'});
            captures.push({url, locale, viewport, prefix, expected, actual});
        }

        // All writes are intercepted. These images show feedback and the local draft, not real delivery.
        await page.route('**/*', async route => {
            const method = route.request().method();
            if (method === 'POST' || method === 'OPTIONS') await route.fulfill({status: method === 'POST' ? 502 : 204, headers: {'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'}});
            else await route.continue();
        });
        for (const locale of site.locales) {
            await page.goto(`${base}${localePath(locale, '/software/automation/')}`, {waitUntil: 'load'});
            for (const [name, selector] of [['action', 'main article header a.action-link'], ['card', '.related-services [data-info-panel] a']]) {
                const link = page.locator(selector).first();
                await link.evaluate(element => element.scrollIntoView({block: 'center', behavior: 'instant'}));
                if (viewport === 'desktop') {
                    await link.hover(); await page.waitForTimeout(200);
                    await page.screenshot({path: path.join(output, `${locale}-${viewport}-${name}-hover.png`)});
                }
                await link.focus(); await page.waitForTimeout(200);
                const bounds = await link.boundingBox();
                const headerBottom = await page.locator('.site-shell > header').evaluate(element => element.getBoundingClientRect().bottom);
                if (!bounds || bounds.y < headerBottom || bounds.y + bounds.height > size.height) throw new Error(`Focused control is outside the captured viewport: ${locale} ${viewport} ${name}`);
                await page.screenshot({path: path.join(output, `${locale}-${viewport}-${name}-focus.png`)});
            }
            await page.goto(`${base}${localePath(locale, '/contact/')}?about=Enquiry%20preview`, {waitUntil: 'load'});
            await page.locator('[name="message"]').fill('Preview draft. No message is sent.');
            await page.locator('[name="email"]').fill('preview@example.com');
            const send = page.getByRole('button', {name: locale === 'pl' ? 'Wyślij wiadomość' : 'Send message', exact: true});
            if (await send.count()) {
                await send.click();
                const fallback = page.locator('main a.action-link[href^="mailto:"]');
                await fallback.waitFor();
                await capture(page, `${locale}-${viewport}-contact-failure.png`, page.locator('.contact-form'));
                await capture(page, `${locale}-${viewport}-email-fallback.png`, fallback);
                states.push({locale, viewport, failure: 'captured'});
            } else states.push({locale, viewport, failure: 'not available: email-client mode'});
        }
        await context.close();
    }
    const page = await browser.newPage({viewport: {width: 3840, height: 1400}});
    for (const locale of site.locales) {
        await page.goto(`${base}${localePath(locale, '/')}`);
        const nav = await page.locator('header nav').first().boundingBox();
        await page.screenshot({path: path.join(output, `${locale}-header-4k.png`), clip: {x: Math.max(0, nav.x - 16), y: 0, width: Math.min(3840, nav.width + 32), height: 112}});
    }
    const missing = captures.flatMap(item => item.expected.filter(surface => !item.actual.includes(surface)).map(surface => ({url: item.url, viewport: item.viewport, surface})));
    const inventory = {sha: release.sha, base, views: captures.length, captures, states, missing, issues};
    await writeFile(path.join(output, 'inventory.json'), JSON.stringify(inventory, null, 2));
    const files = captures.flatMap(item => item.actual.map(surface => `${item.prefix}-${surface}.png`));
    const index = ['# Capture inventory', '', `Build: ${release.sha}. Views: ${captures.length}. Missing: ${missing.length}.`, '', ...files.map(file => `- [${file}](${file})`)];
    await writeFile(path.join(output, 'INDEX.md'), index.join('\n') + '\n');
    console.log(JSON.stringify({views: captures.length, screenshots: files.length, states, missing: missing.length, issues}));
    if (missing.length || issues.length) process.exitCode = 1;
} finally { await browser.close(); }
