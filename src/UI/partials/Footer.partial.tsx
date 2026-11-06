import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom';
import { EmailContactLink } from '@/src/UI/components/EmailContactLink.molecule';
import { getBreadcrumbs } from '@/src/content/breadcrumbs';
import { portfolioPath, portfolioProjects, portfolioMessages } from '@/src/content/portfolio.mjs';
import { primaryServices, site, standardRoutes } from '@/src/content/site.mjs';
import { useLocale } from '@/src/i18n/context';
import {contactHref, contactTopics, topicForPage} from '@/src/layers/application/contact-context';
import styles from './footer.module.scss';

const technologySlugs = ['fullstack', 'architecture', 'backend', 'frontend'];
const projectLabels: Record<string, {en: string; pl: string}> = {
    'b2b-service-platform': {en: 'B2B SaaS platform', pl: 'Platforma B2B SaaS'},
    'shopify-product-experience': {en: 'E-commerce application', pl: 'Aplikacja e-commerce'},
    'remote-ai-assistant': {en: 'AI assistant', pl: 'Asystent AI'},
};

export const FooterPartial = () => {
    const {messages, locale, path: currentPath} = useLocale();
    const label = (path: typeof standardRoutes[number]) => getBreadcrumbs(path, messages, locale).at(-1)?.label ?? path;
    const technology = technologySlugs.flatMap(slug => standardRoutes.filter(path => path === `/software/${slug}/`));
    const sound = standardRoutes.filter(path => path.startsWith('/sound/'));
    const groups = [
        {title: messages.footerServices, links: primaryServices.map(path => ({path, label: contactTopics[topicForPage(path)][locale]}))},
        {title: messages.footerProjects, links: [{path: '/portfolio/', label: portfolioMessages[locale].all}, ...portfolioProjects.filter(project => project.featured).map(project => ({path: portfolioPath(project), label: projectLabels[project.id]?.[locale] ?? project[locale].title}))]},
        {title: messages.footerTechnology, links: technology.map(path => ({path, label: label(path)}))},
        {title: messages.footerSound, links: sound.map(path => ({path, label: path === '/sound/' ? messages.sound : label(path)}))},
    ];
    return <footer className={styles.footer}>
        <div className={styles.container} data-footer-content>
            <div className={styles.brand}>
                <div className={styles.company}><CompanyNameAtom redirectOnClick fullName/></div>
                <p>{messages.footerSummary}</p>
                <EmailContactLink placement="footer">{site.email}</EmailContactLink>
                <p>{messages.responseTime}</p>
            </div>
            <nav className={styles.groups} aria-label={locale === 'pl' ? 'Nawigacja w stopce' : 'Footer navigation'}>
                {groups.map(group => <section key={group.title}>
                    <h2>{group.title}</h2>
                    <ul>{group.links.map(link => <li key={link.path}><AppLinkAtom href={link.path}>{link.label}</AppLinkAtom></li>)}</ul>
                </section>)}
            </nav>
            <div className={styles.bottom}>
                <nav aria-label={locale === 'pl' ? 'Informacje o firmie' : 'Company information'}>
                    <AppLinkAtom href="/">{messages.breadcrumbHome}</AppLinkAtom>
                    <AppLinkAtom href={contactHref(locale, currentPath)}>{messages.contact}</AppLinkAtom>
                    <AppLinkAtom href="/sitemap/">{messages.sitemap}</AppLinkAtom>
                </nav>
                <p>Atomic Concept - Michał Sałek | VAT PL9442267029</p>
            </div>
        </div>
    </footer>;
};
