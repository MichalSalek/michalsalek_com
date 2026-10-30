import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import sharp from 'sharp';
import { site, routes, localePath, pageUrl } from '../src/content/site.mjs';

const xml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const sitemap = [];
const full = [];
const index = [`# ${site.name}`, '', `> Software and audio services by ${site.owner}.`, '', `Contact: ${site.email}`, '', '## Pages', ''];
const hashes = {};
await sharp('public/og-image.svg').png().toFile('out/og-image.png');
// MyDevil also discovers static error pages through its errors directory.
await mkdir('out/errors', {recursive: true});
await copyFile('out/404.html', 'out/errors/404.html');
for (const locale of site.locales) {
    for (const path of routes) {
        const relative = localePath(locale, path);
        const file = `out${relative}index.html`;
        const html = await readFile(file, 'utf8');
        const $ = load(html);
        $('script, style, noscript').remove();
        const title = $('h1').first().text().trim();
        const lines = [`# ${title}`, '', `HTML: ${pageUrl(locale, path)}`, `Language: ${locale}`, ''];
        $('main h2, main h3, main p, main li').each((_, element) => {
            const text = $(element).text().replace(/\s+/g, ' ').trim();
            if (text) lines.push(`${element.tagName.startsWith('h') ? '## ' : ''}${text}`, '');
        });
        lines.push(`Contact: ${site.email}`, '');
        const markdown = lines.join('\n');
        const mdPath = relative === '/' ? '/index.md' : `${relative.slice(0, -1)}.md`;
        await mkdir(`out${mdPath.slice(0, mdPath.lastIndexOf('/') + 1)}`, {recursive: true});
        await writeFile(`out${mdPath}`, markdown);
        index.push(`- [${title} (${locale})](${site.origin}${mdPath}): ${pageUrl(locale, path)}`);
        full.push(markdown);
        hashes[relative] = createHash('sha256').update(html).digest('hex');
        sitemap.push(`<url><loc>${xml(pageUrl(locale, path))}</loc>${site.locales.map(language => `<xhtml:link rel="alternate" hreflang="${language}" href="${xml(pageUrl(language, path))}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${xml(pageUrl(site.defaultLocale, path))}"/></url>`);
    }
}
await writeFile('out/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemap.join('\n')}\n</urlset>\n`);
await writeFile('out/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
await writeFile('out/llms.txt', `${index.join('\n')}\n`);
await writeFile('out/llms-full.txt', full.join('\n\n'));
const sha = execFileSync('git', ['rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
const dirty = execFileSync('git', ['status', '--porcelain'], {encoding: 'utf8'}).trim().length > 0;
await writeFile('out/release.json', JSON.stringify({sha, dirty, builtAt: new Date().toISOString(), pages: hashes}, null, 2) + '\n');
console.log(`Generated ${sitemap.length} sitemap entries and Markdown mirrors from exported HTML.`);
