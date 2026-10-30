export const site = {
    origin: 'https://michalsalek.com',
    name: 'Atomic Concept',
    owner: 'Michał Sałek',
    email: 'contact@michalsalek.com',
    defaultLocale: 'en',
    locales: ['en', 'pl'],
};

// Public routes, sitemap, language links and export checks share this registry.
export const routes = ['/', '/software/architecture/', '/software/backend/', '/software/frontend/', '/sound/', '/sound/studio/', '/sound/soundtracks/', '/contact/', '/sitemap/', '/software/ai-automation/', '/software/integrations/', '/software/custom-software/', '/software/websites/', '/software/automation/', '/software/reporting/'];

export const primaryServices = ['/software/ai-automation/', '/software/automation/', '/software/integrations/', '/software/websites/', '/software/custom-software/', '/software/reporting/'];

export const relatedServices = {
    '/software/ai-automation/': ['/software/automation/', '/software/custom-software/'],
    '/software/automation/': ['/software/ai-automation/', '/software/integrations/'],
    '/software/integrations/': ['/software/automation/', '/software/reporting/'],
    '/software/websites/': ['/software/custom-software/', '/software/integrations/'],
    '/software/custom-software/': ['/software/integrations/', '/software/reporting/'],
    '/software/reporting/': ['/software/integrations/', '/software/custom-software/'],
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
