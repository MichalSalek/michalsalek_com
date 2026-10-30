import type { Locale, PagePath } from './site.mjs';
import type { Messages } from '@/src/i18n/context';

export type Section = {title: string; subtitle: string; paragraphs: string[]};
export type ServiceCard = {path: PagePath; title: string; paragraphs: string[]};
export type SitePageProps = {
    locale: Locale;
    path: PagePath;
    title: string;
    description: string;
    messages: Messages;
    cards: ServiceCard[];
    sections: Section[];
    navigation: {path: PagePath; title: string}[];
};

export async function loadPage(locale: Locale, path: PagePath): Promise<SitePageProps> {
    const dictionary = locale === 'pl' ? (await import('./pl.json')).default : (await import('./en.json')).default;
    const articles = locale === 'pl' ? (await import('./pl-articles.json')).default : (await import('./en-articles.json')).default;
    const article = articles[path.slice(1, -1) as keyof typeof articles];
    const cards = path === '/' ? dictionary.cards.software : path === '/sound/' ? dictionary.cards.sound : [];
    return {
        locale, path, ...dictionary.pages[path], messages: dictionary.ui,
        cards: cards as ServiceCard[], sections: article?.sections ?? [],
        navigation: Object.entries(dictionary.pages).map(([key, value]) => ({path: key as PagePath, title: value.title})),
    };
}
