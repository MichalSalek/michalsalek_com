import {expect, test, type Page, type Route} from '@playwright/test';
import {localePath, routes, site} from '../../src/content/site.mjs';
import {contactTopics, knownSource} from '../../src/layers/application/contact-context';

type EventRow = [string, string, Record<string, unknown>];
const cors = {'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'};
const data = {email: 'person+test@example.test', subject: 'Private subject & #', message: 'Private message\nline two', name: 'Private Name'};

async function isolateNetwork(page: Page, onPost: (route: Route) => Promise<void> = route => route.fulfill({status: 204, headers: cors})) {
    await page.route('**/*', async route => {
        const request = route.request();
        if (request.method() === 'OPTIONS') return route.fulfill({status: 204, headers: cors});
        if (request.method() === 'POST') return onPost(route);
        if (/googletagmanager\.com|google-analytics\.com|analytics\.google\.com/.test(request.url())) return route.fulfill({status: 200, contentType: 'application/javascript', body: ''});
        return route.continue();
    });
}
async function fill(page: Page) { for (const [key, value] of Object.entries(data)) await page.locator(`[name="${key}"]`).fill(value); }
async function events(page: Page): Promise<EventRow[]> {
    return page.evaluate(() => (window.dataLayer ?? []).map(entry => Array.from(entry as ArrayLike<unknown>)).filter(entry => entry[0] === 'event') as EventRow[]);
}
async function assertEventsArePrivate(page: Page) {
    const allRows = await events(page);
    const pageViews = allRows.filter(row => row[1] === 'page_view');
    for (const [, , params] of pageViews) {
        expect(Object.keys(params).sort()).toEqual(['page_location', 'page_referrer']);
        expect(params.page_referrer).toBe('');
        expect(String(params.page_location)).not.toMatch(/[?#]/);
    }
    const rows = allRows.filter(row => row[1] !== 'page_view');
    for (const [, name, params] of rows) {
        expect(['contact_intent', 'contact_start', 'generate_lead', 'contact_error', 'contact_email_open']).toContain(name);
        expect(Object.keys(params).sort()).toEqual(['form_variant', 'language', 'page_location', 'page_path', 'page_referrer', 'placement', 'source_path', 'topic_id'].sort());
        expect(params.page_referrer).toBe('');
        expect(knownSource(params.source_path)).toBe(params.source_path);
        expect(params.page_location).toBe(`${site.origin}${params.page_path}`);
        expect(String(params.page_location)).not.toMatch(/[?#]/);
        expect(JSON.stringify(params)).not.toMatch(/person\+test|Private|example\.test/);
    }
    return rows;
}

for (const locale of site.locales) {
    test(`${locale}: each public route has its expected contact form`, async ({page}) => {
        test.setTimeout(120_000);
        await isolateNetwork(page);
        expect(routes).toHaveLength(24);
        for (const path of routes) {
            await page.goto(localePath(locale, path));
            const section = page.locator('.contact-cta');
            if (path === '/sitemap/') { await expect(section).toHaveCount(0); continue; }
            await expect(section).toHaveCount(1);
            const variant = path === '/contact/' ? 'full' : 'compact';
            await expect(section).toHaveClass(new RegExp(`contact-section-${variant}`));
            await expect(section.locator('h1, h2')).toHaveAttribute('id', 'project-contact');
            await expect(section.locator('#project-contact')).toHaveAttribute('tabindex', '-1');
            const renderedRows = await section.locator('textarea[name="message"]').evaluate(element => element.getBoundingClientRect().height / parseFloat(getComputedStyle(element).lineHeight));
            expect(renderedRows).toBeCloseTo(variant === 'full' ? 12 : 6, 0);
        }
    });

    for (const variant of ['full', 'compact'] as const) {
        const path = variant === 'full' ? '/contact/' : '/software/backend/';
        test(`${locale} ${variant}: failed response retains data, retry sends exact payload and success clears both drafts`, async ({page}) => {
            let requests = 0;
            const payloads: unknown[] = [];
            await isolateNetwork(page, async route => {
                requests++;
                payloads.push(route.request().postDataJSON());
                await route.fulfill({status: requests === 1 ? 502 : 204, headers: cors});
            });
            await page.goto(`${localePath(locale, path)}?ignored=private`);
            await fill(page);
            const form = page.locator('form.contact-form');
            const send = form.locator('button[type="submit"]');
            await send.click();
            await expect(form.getByRole('button', {name: 'OK', exact: true})).toBeVisible();
            const mailto = new URL((await form.locator('a[href^="mailto:"]').getAttribute('href'))!);
            expect(mailto.searchParams.get('subject')).toBe(data.subject);
            expect(mailto.searchParams.get('body')).toBe(`${data.message}\n\n${site.origin}${localePath(locale, path)}\n\n${data.name}\n${data.email}`);
            const fallback = form.locator('a[href^="mailto:"]');
            await fallback.evaluate(link => link.addEventListener('click', event => event.preventDefault()));
            await fallback.click();
            await send.click();
            await expect(page.locator('[name="message"]')).toHaveValue(data.message);
            await send.click();
            await expect(form.getByRole('button', {name: 'OK', exact: true})).toBeVisible();
            expect(requests).toBe(2);
            expect(payloads).toEqual(Array(2).fill({subject: data.subject, text: `${data.message}\n\n${site.origin}${localePath(locale, path)}`, replyTo: data.email, signature: data.name}));
            const telemetry = await assertEventsArePrivate(page);
            expect(telemetry.map(row => row[1])).toEqual(['contact_start', 'contact_error', 'contact_email_open', 'generate_lead']);
            expect(telemetry[3][2]).toMatchObject({language: locale, form_variant: variant, page_path: localePath(locale, path), topic_id: 'custom'});
            await page.evaluate(() => sessionStorage.setItem('contact-draft:v1', '{}'));
            await send.click();
            await expect(page.locator('[name="message"]')).toHaveValue('');
            expect(await page.evaluate(() => [sessionStorage.getItem('contact-draft:v1'), sessionStorage.getItem('contact-draft:v2')])).toEqual([null, null]);
        });
    }
}

test('hero contact link keeps the path and does not focus an input', async ({page}) => {
    await isolateNetwork(page);
    await page.goto('/pl/software/ai-automation/');
    const link = page.locator('main article header a[href="#project-contact"]');
    await expect(link).toHaveClass(/action-link/);
    await link.click();
    await expect(page).toHaveURL(/\/pl\/software\/ai-automation\/#project-contact$/);
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.ai.pl);
    expect(await page.evaluate(() => ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName ?? ''))).toBe(false);
    const telemetry = await assertEventsArePrivate(page);
    expect(telemetry.map(row => row[1])).toEqual(['contact_intent']);
});

test('message grows with content without internal scrolling', async ({page}) => {
    await isolateNetwork(page);
    await page.goto('/software/backend/');
    const textarea = page.locator('textarea[name="message"]');
    const before = (await textarea.boundingBox())!.height;
    await textarea.fill(Array.from({length: 30}, (_, index) => `Line ${index + 1}`).join('\n'));
    await expect.poll(async () => (await textarea.boundingBox())!.height).toBeGreaterThan(before);
    expect(await textarea.evaluate(element => element.scrollHeight <= element.clientHeight + 1)).toBe(true);
});

test('pending delivery survives navigation and a second submit cannot send or emit another lead', async ({page}) => {
    let release!: () => void;
    const pending = new Promise<void>(resolve => { release = resolve; });
    let requests = 0;
    const bodies: unknown[] = [];
    await isolateNetwork(page, async route => {
        requests++;
        bodies.push(route.request().postDataJSON());
        await pending;
        await route.fulfill({status: 204, headers: cors});
    });
    await page.goto('/software/backend/');
    await fill(page);
    const form = page.locator('form.contact-form');
    await form.locator('button[type="submit"]').click();
    await expect(form).toHaveAttribute('aria-busy', 'true');
    await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'Portfolio'}).click();
    await expect(page.locator('form.contact-form')).toHaveAttribute('aria-busy', 'true');
    await page.locator('form.contact-form').evaluate(form => form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true})));
    expect(requests).toBe(1);
    release();
    await expect(page.getByRole('button', {name: 'OK', exact: true})).toBeVisible();
    expect(bodies).toEqual([{subject: data.subject, text: `${data.message}\n\n${site.origin}/software/backend/`, replyTo: data.email, signature: data.name}]);
    const telemetry = await assertEventsArePrivate(page);
    const leads = telemetry.filter(row => row[1] === 'generate_lead');
    expect(leads).toHaveLength(1);
    expect(leads[0][2]).toMatchObject({page_path: '/software/backend/', form_variant: 'compact', placement: 'service'});
});

test('restored draft emits no contact_start until the visitor edits', async ({page}) => {
    await isolateNetwork(page);
    await page.addInitScript(() => sessionStorage.setItem('contact-draft:v2', JSON.stringify({version: 2, topicId: 'backend', subjectMode: 'manual', subject: 'Saved', text: 'saved', email: '', name: ''})));
    await page.goto('/contact/');
    await expect(page.locator('[name="message"]')).toHaveValue('saved');
    expect((await assertEventsArePrivate(page)).filter(row => row[1] === 'contact_start')).toHaveLength(0);
    await page.locator('[name="message"]').fill('edited');
    expect((await assertEventsArePrivate(page)).filter(row => row[1] === 'contact_start')).toHaveLength(1);
});

test('an unresponsive provider times out and retains the draft', async ({page}) => {
    test.setTimeout(35_000);
    await isolateNetwork(page, async route => { await new Promise(resolve => setTimeout(resolve, 17_000)); await route.abort().catch(() => {}); });
    await page.goto('/contact/');
    await fill(page);
    await page.locator('form.contact-form button[type="submit"]').click();
    await expect(page.getByRole('button', {name: 'OK', exact: true})).toBeVisible({timeout: 22_000});
    await page.getByRole('button', {name: 'OK', exact: true}).click();
    await expect(page.locator('[name="message"]')).toHaveValue(data.message);
    const telemetry = await assertEventsArePrivate(page);
    expect(telemetry.filter(row => row[1] === 'contact_error')).toHaveLength(1);
    expect(telemetry.filter(row => row[1] === 'generate_lead')).toHaveLength(0);
});

test('contact query selects a known topic and uses only a valid source in the payload', async ({page}) => {
    const bodies: unknown[] = [];
    await isolateNetwork(page, async route => { bodies.push(route.request().postDataJSON()); await route.fulfill({status: 204, headers: cors}); });
    await page.goto('/contact/?topic=backend&about=AI&from=%2Fpl%2Fsoftware%2Fbackend%2F');
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.backend.en);
    await page.locator('[name="email"]').fill(data.email);
    await page.locator('[name="message"]').fill(data.message);
    await page.locator('[name="name"]').fill(data.name);
    await page.locator('form.contact-form button[type="submit"]').click();
    await expect(page.getByRole('button', {name: 'OK', exact: true})).toBeVisible();
    expect(bodies).toEqual([{subject: contactTopics.backend.en, text: `${data.message}\n\n${site.origin}/pl/software/backend/`, replyTo: data.email, signature: data.name}]);
    const telemetry = await assertEventsArePrivate(page);
    expect(telemetry.filter(row => row[1] === 'generate_lead')[0][2]).toMatchObject({page_path: '/contact/', source_path: '/pl/software/backend/', topic_id: 'backend', form_variant: 'full'});
    expect(await page.evaluate(() => (window.dataLayer ?? []).every(entry => Object.prototype.toString.call(entry) === '[object Arguments]'))).toBe(true);
});


test('header and footer contact links retain a known service source', async ({page}) => {
    await isolateNetwork(page);
    await page.goto('/pl/software/backend/');
    const header = page.locator('header a.contact-link');
    const footer = page.getByRole('contentinfo').getByRole('link', {name: 'Kontakt', exact: true});
    for (const link of [header, footer]) {
        const url = new URL((await link.getAttribute('href'))!, 'https://example.test');
        expect(url.pathname).toBe('/pl/contact/');
        expect(url.searchParams.get('topic')).toBe('backend');
        expect(url.searchParams.get('from')).toBe('/pl/software/backend/');
    }
    await header.click();
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.backend.pl);
});
