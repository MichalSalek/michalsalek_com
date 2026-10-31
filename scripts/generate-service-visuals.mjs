import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { sceneByPath, visualPalette as c } from '../src/content/visuals.mjs';
import { site } from '../src/content/site.mjs';

const directory = new URL('../public/service-visuals/', import.meta.url);
await mkdir(directory, {recursive: true});
const currentFiles = new Set();
const rect = (x, y, width, height, fill = c.surface, stroke = c.ink, weight = 5) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" stroke="${stroke}" stroke-width="${weight}"/>`;
const path = (d, stroke = c.ink, weight = 5, fill = 'none') => `<path d="${d}" stroke="${stroke}" stroke-width="${weight}" fill="${fill}" stroke-linecap="square" stroke-linejoin="miter"/>`;
const circle = (x, y, radius, fill = c.surface, stroke = c.ink, weight = 5) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${weight}"/>`;
const ellipse = (x, y, rx, ry, fill = c.surface) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${c.ink}" stroke-width="5"/>`;

function card(scene) {
    let subject;
    if (scene === 'ai') {
        subject = path('M392 166H698L792 260V634H392Z', c.ink, 5, c.surface)
            + path('M698 166V260H792', c.muted, 4)
            + path('M444 326H620M444 500H690M444 556H634', c.muted, 5)
            + rect(430, 376, 324, 64, c.sage, 'none') + path('M450 409H658', c.ink, 5)
            + path('M828 392h55m-16-16l16 16-16 16', c.muted, 4)
            + [0,1,2].map(i => rect(908, 334+i*56, 18, 18, i===1?c.accent:c.line, 'none')).join('');
    } else if (scene === 'automation') {
        subject = path('M326 350H544M654 350H870M600 404V550H810', c.muted, 5)
            + rect(216, 296, 110, 110, c.surface) + rect(544, 296, 110, 110, c.sage) + rect(870, 296, 110, 110, c.surface)
            + circle(870, 550, 60) + path('M870 516v34h30', c.accent, 6)
            + path('M710 334l16 16-16 16', c.muted, 4);
    } else if (scene === 'integrations') {
        subject = rect(234, 266, 232, 268, c.surface) + rect(734, 266, 232, 268, c.surface)
            + path('M466 360H548V440H652V360H734', c.sage, 15)
            + path('M290 326h80M290 474h120M790 326h120M790 474h80', c.muted, 5)
            + circle(548, 360, 10, c.accent, 'none') + circle(652, 440, 10, c.accent, 'none');
    } else if (scene === 'websites') {
        subject = rect(280, 198, 640, 404, c.surface) + path('M280 258H920', c.muted, 4)
            + [0,1,2].map(i=>circle(312+i*24, 228, 4, c.muted, 'none')).join('')
            + rect(670, 312, 194, 234, c.sage, 'none') + rect(330, 318, 254, 32, c.navy, 'none')
            + path('M330 400H584M330 448H528M330 496H564', c.muted, 5);
    } else if (scene === 'applications') {
        subject = rect(310, 172, 254, 218, c.surface) + rect(614, 172, 254, 218, c.tint)
            + rect(310, 440, 254, 188, c.sage) + rect(614, 440, 254, 188, c.surface)
            + path('M350 222h94M350 268h154M654 490h94M654 536h154', c.muted, 5)
            + rect(654, 212, 38, 38, c.accent, 'none');
    } else if (scene === 'reporting') {
        subject = path('M288 230V610H932', c.muted, 4)
            + rect(360, 406, 112, 204, c.tint, c.ink, 4)
            + rect(546, 266, 112, 344, c.sage, c.ink, 4)
            + rect(732, 342, 112, 268, c.surface, c.ink, 4)
            + path('M288 310H310M288 410H310M288 510H310', c.muted, 4)
            + rect(774, 300, 28, 8, c.accent, 'none');
    } else if (scene === 'fullstack') {
        subject = path('M402 190l-62 62 62 62M798 190l62 62-62 62', c.muted, 6)
            + rect(438, 192, 324, 120, c.surface) + path('M476 238H692M476 274H620', c.muted, 4)
            + path('M600 312v88M600 480v64', c.muted, 4)
            + rect(388, 400, 424, 80, c.sage) + circle(426, 440, 6, c.accent, 'none')
            + path('M476 440H694', c.muted, 4)
            + path('M480 568V622C480 666 720 666 720 622V568', c.ink, 5, c.surface) + ellipse(600,568,120,30);
    } else if (scene === 'sound') {
        subject = path('M220 400H980', c.line, 3)
            + [62,108,166,248,340,276,190,122,74].map((height,i)=>path(`M${300+i*75} ${400-height/2}v${height}`, i===4?c.accent:c.ink, i===4?9:5)).join('');
    } else throw new Error(`No card illustration for ${scene}`);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img"><title>${scene}</title>${rect(0, 0, 1200, 800, c.paper, 'none')}${subject}</svg>\n`;
}

async function asset(name, content, alt) {
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
    const filename = `${name}.${hash}.svg`;
    currentFiles.add(filename);
    await writeFile(new URL(filename, directory), content);
    return {src: `/service-visuals/${filename}`, alt, width: 1200, height: 800};
}
const manifest = {};
for (const locale of site.locales) {
    const dictionary = JSON.parse(await readFile(new URL(`../src/content/${locale}.json`, import.meta.url), 'utf8'));
    manifest[locale] = {};
    for (const [page, scene] of Object.entries(sceneByPath)) {
        const cardAsset = await asset(`${scene}-card`, card(scene), dictionary.visuals[scene].cardAlt);
        // DECISION: Interface-like heroes were rejected. Replacement artwork is reviewed locally before publication.
        manifest[locale][page] = {card: cardAsset, hero: null};
    }
}
await writeFile(new URL('manifest.json', directory), `${JSON.stringify(manifest, null, 2)}\n`);
for (const filename of await readdir(directory)) {
    if (/^[a-z-]+\.[a-f0-9]{12}\.svg$/.test(filename) && !currentFiles.has(filename)) await unlink(new URL(filename, directory));
}
console.log('Light service illustrations generated from the shared palette.');
