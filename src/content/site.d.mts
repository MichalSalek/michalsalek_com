export type Locale = 'en' | 'pl';
export type PagePath = '/' | '/software/architecture/' | '/software/backend/' | '/software/frontend/' | '/sound/' | '/sound/studio/' | '/sound/soundtracks/' | '/contact/' | '/sitemap/' | '/software/ai-automation/' | '/software/integrations/' | '/software/custom-software/';
export const site: {origin: string; name: string; owner: string; email: string; defaultLocale: Locale; locales: Locale[]};
export const routes: PagePath[];
export const primaryServices: PagePath[];
export function localePath(locale: Locale, path?: PagePath): string;
export function pageUrl(locale: Locale, path?: PagePath): string;
export function pageHref(locale: Locale, href: string): string;
