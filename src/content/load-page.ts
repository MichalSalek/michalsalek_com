import type { Locale, PagePath } from './site.mjs';
import type { Messages } from '@/src/i18n/context';
import { readFile } from 'node:fs/promises';
import type { VisualAsset } from './visuals.mjs';

export type ArticleMedia = {section: number; after: number; variant: 'wide' | 'inline'; asset: VisualAsset};
export type Section = {title: string; subtitle: string; paragraphs: string[]; facts?: {term: string; detail: string}[]; media?: ArticleMedia[]};
export type ServiceCard = {path: PagePath; title: string; paragraphs: string[]; artwork: VisualAsset | null};
export type SitePageProps = {
    locale: Locale;
    path: PagePath;
    title: string;
    description: string;
    intro?: string[];
    messages: Messages;
    cards: ServiceCard[];
    artwork: VisualAsset | null;
    shareImage: VisualAsset | null;
    sections: Section[];
    navigation: {path: PagePath; title: string}[];
};

export async function loadPage(locale: Locale, path: PagePath): Promise<SitePageProps> {
    const dictionary = locale === 'pl' ? (await import('./pl.json')).default : (await import('./en.json')).default;
    const articles = locale === 'pl' ? (await import('./pl-articles.json')).default : (await import('./en-articles.json')).default;
    const article = articles[path.slice(1, -1) as keyof typeof articles];
    const cards = path === '/' ? dictionary.cards.software : path === '/sound/' ? dictionary.cards.sound : [];
    const manifest = JSON.parse(await readFile('public/service-visuals/manifest.json', 'utf8')) as Record<Locale, Partial<Record<PagePath, {card: VisualAsset | null; hero: VisualAsset | null; share?: VisualAsset | null; article?: ArticleMedia[]}>>>;
    const artwork = manifest[locale][path]?.hero ?? null;
    return {
        locale, path, ...dictionary.pages[path], messages: dictionary.ui,
        cards: cards.map(card => {
            const artwork = manifest[locale][card.path as PagePath]?.card ?? null;
            if (path === '/' && !artwork) throw new Error(`Missing card artwork: ${locale} ${card.path}`);
            return {...card, path: card.path as PagePath, artwork};
        }), artwork, shareImage: manifest[locale][path]?.share ?? null, sections: (article?.sections ?? []).map((section, index) => ({...section, media: (manifest[locale][path]?.article ?? []).filter(item => item.section === index)})),
        navigation: Object.entries(dictionary.pages).map(([key, value]) => ({path: key as PagePath, title: value.title})),
    };
}
