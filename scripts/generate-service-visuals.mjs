import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { sceneByPath, visualPalette as c } from '../src/content/visuals.mjs';
import { primaryServices, site } from '../src/content/site.mjs';

const directory = new URL('../public/service-visuals/', import.meta.url);
await mkdir(directory, {recursive: true});
const currentFiles = new Set();
const escape = value => String(value).replace(/[&<>"']/g, character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'}[character]));
const rect = (x, y, width, height, fill = c.surface, stroke = 'none', weight = 1) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" stroke="${stroke}" stroke-width="${weight}"/>`;
const line = (x1, y1, x2, y2, stroke = c.ink, weight = 5) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${stroke}" stroke-width="${weight}"/>`;
const path = (d, stroke = c.ink, weight = 6, fill = 'none') => `<path d="${d}" stroke="${stroke}" stroke-width="${weight}" fill="${fill}"/>`;
const text = (x, y, content, size = 22, fill = c.ink, weight = 400) => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${escape(content)}</text>`;
const svg = (width, height, content, label) => `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img"><title>${escape(label)}</title>${content}</svg>\n`;
const check = (x, y, size = 28, stroke = c.navy, weight = 5) => path(`M${x} ${y+size*.5}l${size*.32} ${size*.32}L${x+size} ${y}`, stroke, weight);
const arrow = (x, y, length = 64, stroke = c.ink) => path(`M${x} ${y}h${length}m-20 -20l20 20-20 20`, stroke, 7);
const paper = (x, y, w, h, id) => rect(x, y, w, h, c.paper, c.ink, 6).replace('<rect ', `<rect ${id ? `id="${id}" ` : ''}`);
const browser = (x, y, w, h) => paper(x, y, w, h) + line(x, y+48, x+w, y+48, c.ink, 5) + [0, 1, 2].map(i => rect(x+22+i*24, y+18, 10, 10, c.ink)).join('');
const rows = (x, y, width, count = 4, stroke = c.ink) => Array.from({length: count}, (_, i) => line(x, y+i*46, x+width*(i % 2 ? .76 : 1), y+i*46, stroke, 9)).join('');

function card(scene) {
    const backdrop = rect(0, 0, 1200, 800, c.paper) + path('M0 0H1200V160L0 610Z', 'none', 0, c.navy);
    let subject;
    if (scene === 'ai') {
        subject = paper(76, 277, 244, 350) + rows(110, 325, 170, 5)
            + paper(414, 277, 342, 350, 'primary-document') + rect(455, 319, 68, 68, c.navy) + rows(546, 335, 168, 2, c.navy) + rows(455, 438, 259, 3, c.navy)
            + path('M850 277H1020L1052 324H1136V627H850Z', 'none', 0, c.accent) + check(910, 400, 162, c.paper, 17)
            + arrow(338, 451, 55) + arrow(775, 451, 55);
    } else if (scene === 'automation') {
        subject = paper(76, 310, 244, 276) + rect(112, 350, 68, 68, c.navy) + rows(112, 460, 168, 2)
            + paper(414, 250, 342, 396) + path('M585 315l82 82-82 82-82-82Z', c.navy, 6, c.tint) + path('M585 479v40h-61v31M585 519h82v31', c.navy, 7) + rect(499, 550, 50, 50, c.navy) + rect(625, 550, 84, 50, c.navy)
            + rect(850, 310, 286, 276, c.accent) + check(919, 386, 146, c.paper, 16)
            + arrow(338, 451, 55) + arrow(775, 451, 55);
    } else if (scene === 'integrations') {
        subject = browser(76, 272, 350, 356) + rows(112, 370, 158, 3) + rect(304, 363, 74, 74, c.navy)
            + browser(770, 272, 366, 356) + rows(808, 370, 280, 3)
            + rect(486, 350, 224, 202, c.accent) + path('M523 424h147m-23-23l23 23-23 23m23 40H523m23-23l-23 23 23 23', c.paper, 10)
            + path('M426 401h60M710 501h60', c.ink, 7);
    } else if (scene === 'websites') {
        subject = browser(76, 244, 790, 400) + rect(112, 334, 292, 76, c.navy) + rows(112, 452, 288, 2) + rect(112, 560, 166, 40, c.navy)
            + rect(450, 334, 372, 266, c.tint) + rect(486, 370, 122, 194, c.navy) + rect(642, 370, 144, 84, c.paper, c.ink, 4) + rows(642, 500, 144, 2)
            + paper(930, 344, 206, 300) + rect(956, 380, 154, 42, c.tint, c.ink, 3) + rect(956, 450, 154, 80, c.tint, c.ink, 3) + rect(956, 562, 154, 44, c.accent);
    } else if (scene === 'applications') {
        subject = browser(76, 244, 660, 400) + rect(76, 292, 132, 352, c.navy) + rows(100, 340, 82, 5, c.paper)
            + [0, 1, 2].map((i) => rect(250, 332+i*92, 436, 64, i === 1 ? c.tint : c.paper, c.ink, 3) + rect(270, 352+i*92, 24, 24, i === 1 ? c.accent : c.navy) + line(318, 364+i*92, 640, 364+i*92, c.ink, 8)).join('')
            + paper(798, 300, 338, 344) + rect(834, 336, 266, 48, c.navy) + rows(834, 438, 184, 2) + check(1044, 416, 48, c.navy, 7) + rect(834, 564, 266, 42, c.accent);
    } else if (scene === 'reporting') {
        subject = [0, 1, 2].map(i => paper(76, 274+i*126, 204, 96) + rows(103, 310+i*126, 148, 1)).join('')
            + path('M280 322h66v126h70M280 448h136M280 574h66V448', c.ink, 6)
            + browser(416, 244, 720, 400) + path('M464 582h620M464 582V336', c.ink, 5)
            + [112, 174, 142, 224].map((h,i) => rect(506+i*142, 582-h, 78, h, i === 3 ? c.accent : c.navy)).join('');
    } else throw new Error(`No card illustration for ${scene}`);
    return svg(1200, 800, backdrop + subject + rect(76, 680, 1060, 4, c.ink), scene);
}

// Text stays in the static article; these UI examples are localized illustrations.
function hero(scene, common, mobile, activeNav) {
    const width = mobile ? 600 : 1200;
    const height = mobile ? 720 : 600;
    let content = rect(0, 0, width, height, c.paper);
    if (mobile) {
        content += rect(0, 0, 600, 80, c.navy) + text(30, 51, common.example, 28, c.surface, 600)
            + text(30, 135, scene.headline, 32, c.ink, 600);
        scene.steps.forEach((step, i) => {
            const x = 30+i*180;
            content += text(x+4, 194, step, 24, i === 1 ? c.navy : c.muted, i === 1 ? 600 : 400)
                + rect(x, 211, 180, 4, i === 1 ? c.navy : c.line);
        });
        content += rect(30, 254, 540, 294, c.surface, c.line) + text(54, 300, scene.panel, 27, c.navy, 600);
        scene.rows.forEach(([label, value], i) => {
            const y = 354+i*73;
            content += line(54, y-28, 546, y-28, c.line, 1) + text(54, y, label, 25, c.muted);
            if (value) content += text(54, y+29, value, 25, c.ink, 500);
            else content += line(54, y+23, 546, y+23, c.line, 2);
        });
        content += check(32, 576, 26, c.navy, 4) + text(78, 601, scene.checks[0], 25)
            + rect(30, 638, 540, 52, c.navy) + text(54, 673, scene.action, 25, c.surface, 600);
    } else {
        content += rect(0, 0, 208, 600, c.navy);
        const sidebarWords = scene.sidebar.split(' ');
        let sidebarLine = '';
        let sidebarY = 58;
        for (const word of sidebarWords) {
            if (`${sidebarLine} ${word}`.trim().length > 14 && sidebarLine) {
                content += text(28, sidebarY, sidebarLine, 23, c.surface, 600);
                sidebarY += 31;
                sidebarLine = word;
            } else sidebarLine = `${sidebarLine} ${word}`.trim();
        }
        content += text(28, sidebarY, sidebarLine, 23, c.surface, 600);
        common.nav.forEach((label, i) => {
            const y = 190+i*65;
            if (i === activeNav) content += rect(18, y-32, 172, 50, c.surface);
            content += text(32, y, label, 21, i === activeNav ? c.navy : c.surface, i === activeNav ? 600 : 400);
        });
        content += text(244, 47, common.workspace, 18, c.muted) + text(930, 47, common.example, 18, c.muted) + line(244, 69, 1164, 69, c.line, 1)
            + text(244, 129, scene.headline, 36, c.ink, 600) + text(244, 165, scene.description, 20, c.muted);
        scene.steps.forEach((step, i) => {
            const x = 244+i*306;
            content += text(x+4, 215, step, 19, i === 1 ? c.navy : c.muted, i === 1 ? 600 : 400) + rect(x, 233, 306, 3, i === 1 ? c.navy : c.line);
        });
        content += rect(244, 274, 487, 224, c.surface, c.line) + text(266, 311, scene.panel, 22, c.navy, 600);
        scene.rows.forEach(([label, value], i) => {
            const y = 358+i*55;
            content += line(266, y-25, 709, y-25, c.line, 1) + text(266, y, label, 20, c.muted);
            if (value) content += `<text x="709" y="${y}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${c.ink}">${escape(value)}</text>`;
            else content += line(492, y, 709, y, c.line, 2);
        });
        content += rect(755, 274, 409, 224, c.surface, c.line) + text(777, 311, scene.checkTitle, 22, c.navy, 600);
        scene.checks.forEach((label, i) => {
            const y = 358+i*55;
            content += check(779, y-16, 21, c.navy, 3) + text(817, y, label, 19);
        });
        content += rect(244, 530, 487, 46, c.navy) + text(266, 560, scene.action, 20, c.surface, 600);
    }
    return svg(width, height, content, scene.heroAlt);
}

async function asset(name, content, alt, width, height) {
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
    const filename = `${name}.${hash}.svg`;
    currentFiles.add(filename);
    await writeFile(new URL(filename, directory), content);
    return {src: `/service-visuals/${filename}`, alt, width, height};
}
const manifest = {};
for (const locale of site.locales) {
    const dictionary = JSON.parse(await readFile(new URL(`../src/content/${locale}.json`, import.meta.url), 'utf8'));
    const visuals = dictionary.visuals;
    manifest[locale] = {};
    for (const [page, scene] of Object.entries(sceneByPath)) {
        const data = visuals[scene];
        const cardAsset = primaryServices.includes(page) ? await asset(`${scene}-card`, card(scene), data.cardAlt, 1200, 800) : null;
        const activeNav = scene === 'ai' ? 2 : scene === 'reporting' ? 3 : 0;
        const desktopAsset = await asset(`${scene}-${locale}-detail`, hero(data, visuals.common, false, activeNav), data.heroAlt, 1200, 600);
        const mobileAsset = await asset(`${scene}-${locale}-mobile`, hero(data, visuals.common, true), data.heroAlt, 600, 720);
        manifest[locale][page] = {card: cardAsset, hero: {...desktopAsset, mobile: {src: mobileAsset.src, width: mobileAsset.width, height: mobileAsset.height}}};
    }
}
await writeFile(new URL('manifest.json', directory), `${JSON.stringify(manifest, null, 2)}\n`);
for (const filename of await readdir(directory)) {
    if (/^[a-z-]+\.[a-f0-9]{12}\.svg$/.test(filename) && !currentFiles.has(filename)) await unlink(new URL(filename, directory));
}
console.log('Service visuals generated from the shared palette and localized interface labels.');
