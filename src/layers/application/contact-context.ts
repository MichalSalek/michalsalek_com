import {localePath, routes, site, type Locale, type PagePath} from '../../content/site.mjs';
import {legacyContactTopics} from '../../content/contact-legacy-topics.mjs';
import {portfolioPath, portfolioProjects} from '../../content/portfolio.mjs';

export const CONTACT_ANCHOR = 'project-contact';
export const contactTopics = {
    general: {pl: 'Zapytanie o współpracę', en: 'Cooperation enquiry'},
    software: {pl: 'Projekt oprogramowania', en: 'Software project'},
    ai: {pl: 'Wdrożenie AI', en: 'AI integration'},
    automation: {pl: 'Automatyzacja procesów', en: 'Workflow automation'},
    integrations: {pl: 'Integracje systemów', en: 'System integrations'},
    website: {pl: 'Strona internetowa', en: 'Business website'},
    application: {pl: 'Aplikacja lub system', en: 'Application or system'},
    reporting: {pl: 'Raporty i analityka', en: 'Reporting and analytics'},
    fullstack: {pl: 'Rozwój i utrzymanie oprogramowania', en: 'Software development and maintenance'},
    architecture: {pl: 'Architektura oprogramowania', en: 'Software architecture'},
    backend: {pl: 'Backend', en: 'Backend'}, frontend: {pl: 'Frontend', en: 'Frontend'},
    sound: {pl: 'Usługi dźwiękowe', en: 'Sound services'}, studio: {pl: 'Miks i mastering', en: 'Mixing and mastering'},
    music: {pl: 'Muzyka na zamówienie', en: 'Original music'}, saas: {pl: 'Aplikacja SaaS', en: 'SaaS application'},
    ecommerce: {pl: 'Aplikacja e-commerce', en: 'E-commerce application'},
    'product-website': {pl: 'Strona produktowa', en: 'Product website'},
    'ai-assistant': {pl: 'Asystent AI', en: 'AI assistant'}, '3d': {pl: 'Aplikacja 3D', en: '3D application'},
} as const;
export type ContactTopic = keyof typeof contactTopics;
export type ContactVariant = 'full' | 'compact';
export type ContactPlacement = 'home' | 'service' | 'sound' | 'portfolio' | 'project' | 'contact' | 'header' | 'footer';
export type ContactContext = {topicId: ContactTopic; autoSubject: string; sourcePath: string; legacySubject?: string};
const serviceTopics: Record<string, ContactTopic> = {
    'ai-automation': 'ai', automation: 'automation', integrations: 'integrations', websites: 'website',
    'custom-software': 'application', reporting: 'reporting', fullstack: 'fullstack', architecture: 'architecture',
    backend: 'backend', frontend: 'frontend', studio: 'studio', soundtracks: 'music',
};
const projectTopics: Record<string, ContactTopic> = {
    'b2b-service-platform': 'saas', 'shopify-product-experience': 'ecommerce', 'technology-product-website': 'product-website',
    'editorial-search-analytics': 'reporting', 'service-business-platform': 'saas', 'remote-ai-assistant': 'ai-assistant', '3d-house-planning': '3d',
};
export function isContactTopic(value: unknown): value is ContactTopic {
    return typeof value === 'string' && Object.hasOwn(contactTopics, value);
}
export function topicForPage(path: PagePath): ContactTopic {
    const parts = path.split('/').filter(Boolean);
    if (parts[0] === 'portfolio' && parts[1]) return isContactTopic(projectTopics[parts[1]]) ? projectTopics[parts[1]] : 'software';
    if (parts[1]) return isContactTopic(serviceTopics[parts[1]]) ? serviceTopics[parts[1]] : 'general';
    return parts[0] === 'sound' ? 'sound' : path === '/' || path === '/portfolio/' ? 'software' : 'general';
}
export function knownSource(value: unknown): string | null {
    if (typeof value !== 'string') return null;
    return site.locales.some(locale => routes.some(path => localePath(locale, path) === value)) ? value : null;
}
export function legacyTopic(value: string): ContactTopic | null {
    const normalized = value.trim().toLocaleLowerCase();
    for (const [id, labels] of Object.entries(contactTopics)) if (Object.values(labels).some(label => label.toLocaleLowerCase() === normalized)) return id as ContactTopic;
    const aliases: Record<string, ContactTopic> = {ai: 'ai', automation: 'automation', automatyzacje: 'automation', integracje: 'integrations', 'ai i oprogramowanie': 'software', 'ai and software': 'software'};
    const published = legacyContactTopics[normalized];
    if (isContactTopic(published)) return published;
    const project = portfolioProjects.find(item => [item.en.title, item.pl.title].some(title => title.toLocaleLowerCase() === normalized));
    return project ? topicForPage(portfolioPath(project)) : isContactTopic(aliases[normalized]) ? aliases[normalized] : null;
}
export function contactContext(locale: Locale, path: PagePath, query: Record<string, unknown> = {}): ContactContext {
    const topicId = path === '/contact/' && isContactTopic(query.topic) ? query.topic : topicForPage(path);
    const about = path === '/contact/' && !isContactTopic(query.topic) && typeof query.about === 'string' ? query.about.slice(0, 2000) : '';
    const legacy = about ? legacyTopic(about) : null;
    return {topicId: legacy ?? topicId, autoSubject: about ? (legacy ? contactTopics[legacy][locale] : about) : contactTopics[topicId][locale], sourcePath: path === '/contact/' ? knownSource(query.from) ?? localePath(locale, path) : localePath(locale, path), ...(about && !legacy ? {legacySubject: about} : {})};
}
export function contactHref(locale: Locale, path: PagePath): string {
    return path === '/contact/' ? '/contact/' : `/contact/?topic=${topicForPage(path)}&from=${encodeURIComponent(localePath(locale, path))}`;
}
export function contactPlacement(path: PagePath): ContactPlacement {
    return path === '/' ? 'home' : path === '/portfolio/' ? 'portfolio' : path.startsWith('/portfolio/') ? 'project' : path === '/contact/' ? 'contact' : path === '/sound/' ? 'sound' : 'service';
}
export function withContactSource(text: string, sourcePath: string): string {
    const suffix = `\n\n${site.origin}${knownSource(sourcePath) ?? '/'}`;
    return text.endsWith(suffix) ? text : `${text}${suffix}`;
}
