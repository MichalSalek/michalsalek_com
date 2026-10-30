import type { GetStaticPaths, GetStaticProps } from 'next';
import SitePage from '@/src/UI/components/SitePage';
import { routes, site, localePath, type Locale, type PagePath } from '@/src/content/site.mjs';
import { loadPage, type SitePageProps } from '@/src/content/load-page';

export default SitePage;

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: site.locales.flatMap(locale => routes.map(path => ({params: {path: localePath(locale, path).split('/').filter(Boolean)}}))),
    fallback: false,
});

export const getStaticProps: GetStaticProps<SitePageProps> = async ({params}) => {
    const segments = Array.isArray(params?.path) ? [...params.path] : [];
    const locale: Locale = segments[0] === 'pl' ? 'pl' : 'en';
    if (locale === 'pl') segments.shift();
    const path = (segments.length ? `/${segments.join('/')}/` : '/') as PagePath;
    if (!routes.includes(path)) return {notFound: true};
    return {props: await loadPage(locale, path)};
};
