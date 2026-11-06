import {serviceEditorialPlans} from './editorial-services.mjs';
import {projectEditorialPlans} from './editorial-projects.mjs';

export const editorialPlans = {...serviceEditorialPlans, ...projectEditorialPlans};
export const editorialPaths = Object.keys(editorialPlans);

const pick = (selection, list, label) => {
    if (selection === undefined) return [];
    const indexes = selection === 'all' ? list.map((_, index) => index) : selection;
    if (!Array.isArray(indexes) || indexes.some(index => !Number.isInteger(index) || index < 0 || index >= list.length)) throw new Error(`Invalid editorial selection: ${label}`);
    return indexes;
};
const localized = (value, locale, label) => {
    if (!value || typeof value[locale] !== 'string' || !value[locale].trim()) throw new Error(`Missing editorial translation: ${locale} ${label}`);
    return value[locale];
};

export function compositionSignature(plan) {
    const cover = plan.cover === 'opening' ? 'opening' : `chapter-${plan.chapters.findIndex(chapter => chapter.id === plan.cover)}`;
    return [plan.opening, cover, plan.toc, plan.reference, ...plan.chapters.map(chapter => `${chapter.layout}:${chapter.exhibit?.kind ?? 'text'}:${chapter.exhibitPosition ?? 'after'}`)].join('|');
}

export function compileWithPlan(plan, input) {
    const {locale, path, sections} = input;
    const seen = new Set();
    const anchored = new Set();
    const ids = plan.chapters.map(chapter => chapter.id);
    if (!['essay','split','panorama','compact','feature'].includes(plan.opening) || !['none','inline','rail'].includes(plan.toc) || !['glossary','notes','table','inline'].includes(plan.reference)) throw new Error(`Invalid editorial composition: ${path}`);
    if (new Set(ids).size !== ids.length || ids.some(id => !/^[a-z][a-z0-9-]*$/.test(id))) throw new Error(`Invalid editorial chapter identities: ${path}`);
    if (plan.cover !== 'opening' && !ids.includes(plan.cover)) throw new Error(`Unknown editorial cover placement: ${path}`);
    if (input.role && plan.roleAt && plan.roleAt !== 'opening' && !ids.includes(plan.roleAt)) throw new Error(`Unknown editorial responsibility placement: ${path}`);
    const consume = key => {
        if (seen.has(key)) throw new Error(`Repeated editorial content: ${path} ${key}`);
        seen.add(key);
    };
    const chapters = plan.chapters.map(chapter => {
        if (!['prose','aside','split','sequence','ledger','decisions','feature','reference'].includes(chapter.layout)) throw new Error(`Unknown editorial chapter layout: ${path} ${chapter.id}`);
        if (chapter.exhibit && !['review','records','states','lineage','permissions','layers','history','delivery','terrain','mix','score','publication'].includes(chapter.exhibit.kind)) throw new Error(`Unknown editorial exhibit: ${path} ${chapter.id}`);
        if (chapter.exhibit?.icons && chapter.exhibit.icons.length !== chapter.exhibit.items.length) throw new Error(`Incomplete editorial drawings: ${path} ${chapter.id}`);
        const paragraphs = [], items = [], facts = [], anchors = [];
        for (const take of chapter.take) {
            const section = sections[take.section];
            if (!section) throw new Error(`Unknown editorial source section: ${path} ${take.section}`);
            if (!anchored.has(take.section)) {
                anchored.add(take.section);
                if (section.id && section.id !== chapter.id && !ids.includes(section.id)) anchors.push(section.id);
            }
            for (const index of pick(take.paragraphs, section.paragraphs, `${path} paragraphs`)) {
                const key = `${take.section}:p:${index}`; consume(key);
                paragraphs.push({key, text: section.paragraphs[index], media: (section.media ?? []).filter(media => media.after === index).map(media => ({variant: media.variant, asset: media.asset}))});
            }
            for (const index of pick(take.items, section.items ?? [], `${path} items`)) {
                consume(`${take.section}:i:${index}`);items.push(section.items[index]);
            }
            for (const index of pick(take.facts, section.facts ?? [], `${path} facts`)) {
                consume(`${take.section}:f:${index}`);facts.push(section.facts[index]);
            }
        }
        const title = chapter.title ? localized(chapter.title, locale, `${path} ${chapter.id}`) : sections[chapter.take[0]?.section]?.title;
        if (!title) throw new Error(`Missing editorial chapter title: ${path} ${chapter.id}`);
        const exhibit = chapter.exhibit ? {
            kind: chapter.exhibit.kind,
            ...(chapter.exhibit.icons ? {icons: chapter.exhibit.icons} : {}),
            title: localized(chapter.exhibit.title, locale, `${path} exhibit title`),
            caption: localized(chapter.exhibit.caption, locale, `${path} exhibit caption`),
            items: chapter.exhibit.items.map(item => ({label: localized(item.label, locale, `${path} exhibit label`), detail: localized(item.detail, locale, `${path} exhibit detail`)})),
        } : undefined;
        return {id: chapter.id, title, layout: chapter.layout, paragraphs, items, facts, anchors,
            ...(chapter.note ? {note: localized(chapter.note, locale, `${path} note`)} : {}),
            ...(exhibit ? {exhibit} : {}), exhibitPosition: chapter.exhibitPosition ?? 'after', reference: chapter.reference ?? plan.reference};
    });
    for (const [sectionIndex, section] of sections.entries()) {
        for (const [kind, list] of [['p', section.paragraphs], ['i', section.items ?? []], ['f', section.facts ?? []]]) {
            for (const index of list.keys()) if (!seen.has(`${sectionIndex}:${kind}:${index}`)) throw new Error(`Missing editorial content: ${path} ${sectionIndex}:${kind}:${index}`);
        }
    }
    return {
        kind: input.projectId ? 'project' : 'service', opening: plan.opening, cover: plan.cover, toc: plan.toc, reference: plan.reference, roleAt: plan.roleAt ?? 'opening',
        intro: input.intro ?? [], audience: input.audience ?? '', role: input.role ?? '', category: input.category ?? '', projectId: input.projectId ?? '', stack: input.stack ?? [],
        chapters, related: input.related ?? [], previous: input.previous ?? null, next: input.next ?? null,
    };
}

export function compileEditorial(input) {
    const plan = editorialPlans[input.path];
    return plan ? compileWithPlan(plan, input) : null;
}
