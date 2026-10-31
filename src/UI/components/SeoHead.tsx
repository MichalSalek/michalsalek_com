import Head from 'next/head';
import { site, pageUrl } from '@/src/content/site.mjs';
import { getBreadcrumbs } from '@/src/content/breadcrumbs';
import { useLocale } from '@/src/i18n/context';
import type { VisualAsset } from '@/src/content/visuals.mjs';

export function SeoHead({title, description, shareImage}: {title?: string; description?: string; shareImage?: VisualAsset | null}) {
    const {locale, path, messages} = useLocale();
    const canonical = pageUrl(locale, path);
    const image = `${site.origin}${shareImage?.src ?? '/og-image.png'}`;
    const imageAlt = shareImage?.alt ?? `${site.name}: ${title ?? messages.softwareCategory}`;
    const graph: Record<string, unknown>[] = [
        {'@type': 'Organization', '@id': `${site.origin}/#organization`, name: site.name, legalName: `${site.name} - ${site.owner}`, url: site.origin, email: site.email},
        {'@type': 'WebSite', '@id': `${site.origin}/#website`, name: site.name, url: site.origin, inLanguage: site.locales, publisher: {'@id': `${site.origin}/#organization`}},
        {'@type': path === '/contact/' ? 'ContactPage' : 'WebPage', '@id': `${canonical}#page`, url: canonical, name: title, description, inLanguage: locale, isPartOf: {'@id': `${site.origin}/#website`}},
    ];
    if (path.includes('/software/') || path === '/sound/' || path.includes('/sound/')) {
        graph.push({'@type': 'Service', '@id': `${canonical}#service`, name: title, description, url: canonical, provider: {'@id': `${site.origin}/#organization`}});
    }
    if (path !== '/' && title) {
        // The legacy software category and Home share a URL; avoid duplicate schema items.
        const breadcrumbs = getBreadcrumbs(path, messages).filter((item, index, items) => !items.slice(0, index).some(previous => previous.path === item.path));
        graph.push({'@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem', position: index + 1, name: item.label, item: pageUrl(locale, item.path),
        }))});
    }
    return <Head>
        <title>{title ? `${title} | ${site.name}` : `${site.name} | ${site.owner}`}</title>
        {description && <meta name="description" content={description}/>}
        {!title ? <meta name="robots" content="noindex, follow"/> : <>
            <link rel="canonical" href={canonical}/>
            {site.locales.map(language => <link key={language} rel="alternate" hrefLang={language} href={pageUrl(language, path)}/>)}
            <link rel="alternate" hrefLang="x-default" href={pageUrl(site.defaultLocale, path)}/>
        </>}
        <meta property="og:title" content={`${title ?? site.name} | ${site.name}`}/>
        <meta property="og:description" content={description ?? ''}/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={canonical}/>
        <meta property="og:site_name" content={site.name}/>
        <meta property="og:locale" content={locale === 'pl' ? 'pl_PL' : 'en_GB'}/>
        <meta property="og:locale:alternate" content={locale === 'pl' ? 'en_GB' : 'pl_PL'}/>
        <meta property="og:image" content={image}/>
        <meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/>
        <meta property="og:image:type" content={shareImage ? 'image/jpeg' : 'image/png'}/>
        <meta property="og:image:alt" content={imageAlt}/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content={title ?? site.name}/>
        <meta name="twitter:description" content={description ?? ''}/>
        <meta name="twitter:image" content={image}/>
        <meta name="twitter:image:alt" content={imageAlt}/>
        {title && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context': 'https://schema.org', '@graph': graph}).replace(/</g, '\\u003c')}}/>}
    </Head>;
}
