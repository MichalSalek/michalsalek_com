import {test, expect, type Page} from '@playwright/test';

const fields = {email: 'ola+test@example.com', subject: 'Własny & temat #1', message: 'Pierwsza linia\nDruga & + ?', name: 'Łucja Żółć'};

async function fillDraft(page: Page) {
    for (const [name, value] of Object.entries(fields)) await page.locator(`[name="${name}"]`).fill(value);
}
async function expectDraft(page: Page) {
    for (const [name, value] of Object.entries(fields)) await expect(page.locator(`[name="${name}"]`)).toHaveValue(value);
}

test('draft survives header portfolio navigation, back, reload and language switch', async ({page}) => {
    await page.goto('/contact/?about=Backend');
    await fillDraft(page);
    await page.getByRole('navigation', {name: 'Main navigation'}).getByRole('link', {name: 'Portfolio'}).click();
    await page.goBack();
    await expectDraft(page);
    await page.reload();
    await expectDraft(page);
    await page.getByRole('link', {name: 'PL: Zmień język na polski'}).click();
    await expectDraft(page);
    await page.goto('/pl/contact/?about=Inna%20us%C5%82uga');
    await expect(page.locator('[name="subject"]')).toHaveValue('Inna usługa');
    await expect(page.locator('[name="message"]')).toHaveValue(fields.message);
});

test('a new service replaces the previous generated subject and keeps the message', async ({page}) => {
    await page.goto('/contact/?about=Backend');
    await page.locator('[name="message"]').fill(fields.message);
    await page.goto('/contact/?about=Automation');
    await expect(page.locator('[name="subject"]')).toHaveValue('Automation');
    await expect(page.locator('[name="message"]')).toHaveValue(fields.message);
});

test('malformed session draft leaves the form usable', async ({page}) => {
    await page.addInitScript(() => sessionStorage.setItem('contact-draft:v1', '{broken'));
    await page.goto('/contact/');
    await fillDraft(page);
    await expectDraft(page);
});

test('unavailable session storage leaves the form usable', async ({page}) => {
    await page.addInitScript(() => Object.defineProperty(window, 'sessionStorage', {get() { throw new Error('blocked'); }}));
    await page.goto('/contact/');
    await fillDraft(page);
    await expectDraft(page);
});

test('provider failure preserves draft and offers an exact email fallback; success acknowledgement clears it', async ({page}) => {
    await page.goto('/contact/');
    const send = page.getByRole('button', {name: 'Send message'});
    test.skip(await send.count() === 0, 'Requires a build with NEXT_PUBLIC_CONTACT_ENDPOINT configured');
    let requests = 0;
    await page.route('**/*', async route => {
        if (route.request().method() === 'OPTIONS') {
            await route.fulfill({status: 204, headers: {'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'}});
        } else if (route.request().method() === 'POST') {
            requests++;
            await route.fulfill({status: requests === 1 ? 502 : 204, headers: {'access-control-allow-origin': '*'}});
        } else await route.continue();
    });
    await fillDraft(page);
    await send.click();
    await expect(page.getByRole('button', {name: 'OK', exact: true})).toBeVisible();
    const href = await page.getByRole('link', {name: 'Open email app'}).getAttribute('href');
    const mailto = new URL(href!);
    expect(mailto.searchParams.get('subject')).toBe(fields.subject);
    expect(mailto.searchParams.get('body')).toBe(`${fields.message}\n\n${fields.name}\n${fields.email}`);
    await page.reload();
    await expectDraft(page);
    await send.click();
    await expect(page.getByRole('button', {name: 'OK', exact: true})).toBeVisible();
    await page.getByRole('button', {name: 'OK', exact: true}).click();
    await expect(page.locator('[name="message"]')).toHaveValue('');
    await page.reload();
    await expect(page.locator('[name="message"]')).toHaveValue('');
    expect(await page.evaluate(() => sessionStorage.getItem('contact-draft:v1'))).toBeNull();
    expect(requests).toBe(2);
});
