import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { localePath, routes, site } from '../src/content/site.mjs';

const base = (process.argv[2] ?? site.origin).replace(/\/$/, '');
const local = JSON.parse(await readFile('out/release.json', 'utf8'));
const expected = process.argv[3] ?? local.sha;
async function request(path, options = {}) {
    const response = await fetch(`${base}${path}`, {signal: AbortSignal.timeout(20000), ...options});
    assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
    return response;
}
const stamp = `?release=${expected}`;
const live = await (await request(`/release.json${stamp}`, {cache: 'no-store'})).json();
assert.equal(live.sha, expected, 'Wrong deployed revision');
assert.equal(live.dirty, false, 'Production must identify a committed revision');
for (const locale of site.locales) for (const path of routes) {
    const relative = localePath(locale, path);
    // Check the canonical URL too: a cache-busting request alone can hide stale HTML.
    const html = await (await request(relative)).text();
    assert.equal(createHash('sha256').update(html).digest('hex'), local.pages[relative], `${relative}: HTML differs from the built artifact`);
}
for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/og-image.png']) await request(path);
for (const agent of ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'GPTBot', 'ChatGPT-User', 'ClaudeBot']) {
    await request('/', {headers: {'User-Agent': agent}});
    await request('/pl/', {headers: {'User-Agent': agent}});
}
for (const [source, target] of [['/software', '/'], ['/software/', '/'], ['/pl/software/', '/pl/'], ['/contact.html', '/contact/']]) {
    const response = await fetch(`${base}${source}`, {redirect: 'manual', signal: AbortSignal.timeout(20000)});
    assert.equal(response.status, 301, `${source}: permanent redirect`);
    assert.equal(new URL(response.headers.get('location'), base).pathname, target, `${source}: redirect target`);
}
const missing = await fetch(`${base}/missing-release-probe-${expected}/`, {signal: AbortSignal.timeout(20000)});
assert.equal(missing.status, 404, 'Missing pages must return 404');
assert((await missing.text()).includes('Page not found'), 'Custom static 404 page');
if (base === site.origin) {
    const www = await fetch(base.replace('https://', 'https://www.'), {redirect: 'manual', signal: AbortSignal.timeout(20000)});
    assert.equal(www.status, 301, 'www must redirect permanently');
    assert.equal(www.headers.get('location'), `${site.origin}/`, 'www canonical target');
}
console.log(`Live verification passed: ${expected}, ${Object.keys(local.pages).length} exact HTML artifacts, redirects, 404 and crawler access.`);
