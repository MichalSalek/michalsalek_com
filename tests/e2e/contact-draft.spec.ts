import {test, expect, type Page} from '@playwright/test';
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

const fields = {email: 'ola+test@example.com', subject: 'Własny & temat #1', message: 'Pierwsza linia\nDruga & + ?', name: 'Łucja Żółć'};
async function fillDraft(page: Page) { for (const [name, value] of Object.entries(fields)) await page.locator(`[name="${name}"]`).fill(value); }
async function expectDraft(page: Page) { for (const [name, value] of Object.entries(fields)) await expect(page.locator(`[name="${name}"]`)).toHaveValue(value); }

test('manual draft survives route changes, reload and language switch', async ({page}) => {
    await page.goto('/contact/?topic=backend');
    await fillDraft(page);
    await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'Portfolio'}).click();
    await expectDraft(page);
    await page.goBack();
    await expectDraft(page);
    await page.reload();
    await expectDraft(page);
    await page.getByRole('link', {name: 'PL: Zmień język na polski'}).click();
    await expectDraft(page);
});

test('automatic subject follows route and language while preserving other fields', async ({page}) => {
    await page.goto('/software/backend/');
    await page.locator('[name="message"]').fill(fields.message);
    await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'Portfolio'}).click();
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.software.en);
    await expect(page.locator('[name="message"]')).toHaveValue(fields.message);
    await page.getByRole('link', {name: 'PL: Zmień język na polski'}).click();
    await expect(page.locator('[name="subject"]')).toHaveValue(contactTopics.software.pl);
    await expect(page.locator('[name="message"]')).toHaveValue(fields.message);
});

test('an intentionally empty manual subject stays empty across route and language changes', async ({page}) => {
    await page.goto('/software/backend/');
    await page.locator('[name="subject"]').fill('');
    await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'Portfolio'}).click();
    await expect(page.locator('[name="subject"]')).toHaveValue('');
    await page.getByRole('link', {name: 'PL: Zmień język na polski'}).click();
    await expect(page.locator('[name="subject"]')).toHaveValue('');
    await page.reload();
    await expect(page.locator('[name="subject"]')).toHaveValue('');
});

test('legacy empty manual subject migrates and unknown about remains manual', async ({page}) => {
    await page.addInitScript(() => sessionStorage.setItem('contact-draft:v1', JSON.stringify({version: 1, about: 'Backend', subject: '', text: 'legacy', email: '', name: ''})));
    await page.goto('/software/backend/');
    await expect(page.locator('[name="subject"]')).toHaveValue('');
    await expect(page.locator('[name="message"]')).toHaveValue('legacy');
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem('contact-draft:v1'))).toBeNull();
    await expect.poll(() => page.evaluate(() => JSON.parse(sessionStorage.getItem('contact-draft:v2')!).subjectMode)).toBe('manual');
});

test('unknown legacy query subject remains manual when navigating to another page', async ({page}) => {
    await page.goto('/contact/?about=Unusual%20project');
    await expect(page.locator('[name="subject"]')).toHaveValue('Unusual project');
    await expect.poll(() => page.evaluate(() => JSON.parse(sessionStorage.getItem('contact-draft:v2') ?? 'null')?.subjectMode)).toBe('manual');
    await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'Portfolio'}).click();
    await expect(page.locator('[name="subject"]')).toHaveValue('Unusual project');
});

test('malformed session draft leaves the form usable', async ({page}) => {
    await page.addInitScript(() => sessionStorage.setItem('contact-draft:v2', '{broken'));
    await page.goto('/contact/');
    await fillDraft(page);
    await expectDraft(page);
});

test('blocked session storage retains draft across client-side route navigation', async ({page}) => {
    await page.addInitScript(() => Object.defineProperty(window, 'sessionStorage', {get() { throw new Error('blocked'); }}));
    await page.goto('/contact/');
    await fillDraft(page);
    await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'Portfolio'}).click();
    await expectDraft(page);
    await page.goBack();
    await expectDraft(page);
});
