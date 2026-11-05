import {routes, type Locale, type PagePath} from './site.mjs';
import type { Messages } from '@/src/i18n/context';
import { readFile } from 'node:fs/promises';
import type { VisualAsset } from './visuals.mjs';
import {portfolioProjects, portfolioPath, findPortfolioProject, getPageMetadata, type PortfolioContent, type PortfolioProject} from './portfolio.mjs';

export type ArticleMedia = {section: number; after: number; variant: 'wide' | 'inline'; asset: VisualAsset};
export type Section = {title: string; subtitle: string; paragraphs: string[]; facts?: {term: string; detail: string}[]; media?: ArticleMedia[]};
export type ServiceCard = {path: PagePath; title: string; paragraphs: string[]; artwork: VisualAsset | null};
export type PortfolioCard = {id: string; path: PagePath; title: string; category: string; summary: string; artwork: VisualAsset};
export type PortfolioDetail = {project: PortfolioProject; content: PortfolioContent; previous: {path: PagePath; title: string} | null; next: {path: PagePath; title: string} | null; services: {path: PagePath; title: string}[]};
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
    portfolioCards: PortfolioCard[];
    portfolioDetail: PortfolioDetail | null;
};

export async function loadPage(locale: Locale, path: PagePath): Promise<SitePageProps> {
    const dictionary = locale === 'pl' ? (await import('./pl.json')).default : (await import('./en.json')).default;
    const articles = locale === 'pl' ? (await import('./pl-articles.json')).default : (await import('./en-articles.json')).default;
    const article = articles[path.slice(1, -1) as keyof typeof articles];
    const cards = path === '/' ? dictionary.cards.software : path === '/sound/' ? dictionary.cards.sound : [];
    const manifest = JSON.parse(await readFile('public/service-visuals/manifest.json', 'utf8')) as Record<Locale, Partial<Record<PagePath, {card: VisualAsset | null; hero: VisualAsset | null; share?: VisualAsset | null; article?: ArticleMedia[]}>>>;
    const artwork = manifest[locale][path]?.hero ?? null;
    const project = findPortfolioProject(path);
    const projectIndex = project ? portfolioProjects.indexOf(project) : -1;
    const neighbor = (index: number) => portfolioProjects[index] ? {path: portfolioPath(portfolioProjects[index]), title: portfolioProjects[index][locale].title} : null;
    const portfolioCards = path === '/' || path === '/portfolio/' ? portfolioProjects.filter(item => path !== '/' || item.featured).map(item => {
        const media = manifest[locale][portfolioPath(item)]?.card;
        if (!media) throw new Error(`Missing portfolio artwork: ${item.id}`);
        return {id: item.id, path: portfolioPath(item), ...item[locale], artwork: media};
    }) : [];
    return {
        locale, path, ...getPageMetadata(locale, path, dictionary.pages), messages: dictionary.ui,
        cards: cards.map(card => {
            const artwork = manifest[locale][card.path as PagePath]?.card ?? null;
            if (path === '/' && !artwork) throw new Error(`Missing card artwork: ${locale} ${card.path}`);
            return {...card, path: card.path as PagePath, artwork};
        }), artwork, shareImage: manifest[locale][path]?.share ?? null, sections: (article?.sections ?? []).map((section, index) => ({...section, media: (manifest[locale][path]?.article ?? []).filter(item => item.section === index)})),
        navigation: routes.map(route => ({path: route, title: getPageMetadata(locale, route, dictionary.pages).title})),
        portfolioCards,
        portfolioDetail: project ? {
            project, content: JSON.parse(await readFile(`src/content/portfolio/${locale}/${project.id}.json`, 'utf8')) as PortfolioContent,
            previous: neighbor(projectIndex - 1), next: neighbor(projectIndex + 1),
            services: project.services.map(service => ({path: service, title: getPageMetadata(locale, service, dictionary.pages).title})),
        } : null,
    };
}
