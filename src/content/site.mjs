import {portfolioRoutes} from './portfolio.mjs';

export const site = {
    origin: 'https://michalsalek.com',
    name: 'Atomic Concept',
    owner: 'Michał Sałek',
    email: 'contact@michalsalek.com',
    defaultLocale: 'en',
    locales: ['en', 'pl'],
};

// Public routes, sitemap, language links and export checks share this registry.
export const standardRoutes = ['/', '/software/architecture/', '/software/backend/', '/software/frontend/', '/sound/', '/sound/studio/', '/sound/soundtracks/', '/contact/', '/sitemap/', '/software/ai-automation/', '/software/integrations/', '/software/custom-software/', '/software/websites/', '/software/automation/', '/software/reporting/', '/software/fullstack/'];
export const routes = [...standardRoutes, ...portfolioRoutes];

export const primaryServices = ['/software/ai-automation/', '/software/automation/', '/software/integrations/', '/software/websites/', '/software/custom-software/', '/software/reporting/'];
export const additionalServices = ['/software/fullstack/', '/sound/'];

const sitemapSections = [
    {id: 'services', title: {pl: 'Usługi dla firm', en: 'Business services'}, paths: primaryServices},
    {id: 'engineering', title: {pl: 'Zaplecze techniczne', en: 'Engineering'}, paths: routes.filter(path => path.startsWith('/software/') && !primaryServices.includes(path))},
    {id: 'sound', title: {pl: 'Dźwięk', en: 'Sound'}, paths: routes.filter(path => path.startsWith('/sound/'))},
    {id: 'portfolio', title: {pl: 'Portfolio', en: 'Portfolio'}, paths: routes.filter(path => path.startsWith('/portfolio/'))},
];
export const sitemapGroups = [...sitemapSections, {id: 'other', title: {pl: 'Pozostałe strony', en: 'Other pages'}, paths: routes.filter(path => !sitemapSections.some(section => section.paths.includes(path)))}];

export const relatedServices = {
    '/software/ai-automation/': ['/software/automation/', '/software/custom-software/'],
    '/software/automation/': ['/software/ai-automation/', '/software/integrations/'],
    '/software/integrations/': ['/software/automation/', '/software/reporting/'],
    '/software/websites/': ['/software/custom-software/', '/software/integrations/'],
    '/software/custom-software/': ['/software/integrations/', '/software/reporting/'],
    '/software/reporting/': ['/software/integrations/', '/software/custom-software/'],
    '/software/architecture/': ['/software/backend/', '/software/frontend/'],
    '/software/backend/': ['/software/architecture/', '/software/frontend/'],
    '/software/frontend/': ['/software/architecture/', '/software/backend/'],
};

export function localePath(locale, path = '/') {
    if (!site.locales.includes(locale) || !routes.includes(path)) throw new Error(`Unknown page: ${locale} ${path}`);
    return `${locale === site.defaultLocale ? '' : `/${locale}`}${path}`;
}

export function pageUrl(locale, path = '/') {
    return `${site.origin}${localePath(locale, path)}`;
}

export function pageHref(locale, href) {
    const suffixAt = href.search(/[?#]/);
    const base = suffixAt < 0 ? href : href.slice(0, suffixAt);
    const suffix = suffixAt < 0 ? '' : href.slice(suffixAt);
    const path = /^\/software\/?$/.test(base) ? '/' : `${base.replace(/\/$/, '')}/`;
    return `${localePath(locale, path)}${suffix}`;
}
