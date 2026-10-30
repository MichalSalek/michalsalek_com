import { useLocale } from '@/src/i18n/context';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import { getBreadcrumbs } from '@/src/content/breadcrumbs';

export const BreadcrumbsAtom = () => {
    const {path, messages} = useLocale();
    const hidden = path === '/' || path === '/sitemap/';
    const items = getBreadcrumbs(path, messages);
    return <nav className="breadcrumbs" aria-label={messages.breadcrumbNavigation} aria-hidden={hidden} style={hidden ? {visibility: 'hidden'} : undefined}>
        <ol>
            {path !== '/sitemap/' && <li><AppLinkAtom href="/sitemap/">{messages.sitemap}</AppLinkAtom></li>}
            {items.map((item, index) => <li key={`${item.path}-${index}`}>
                {index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <AppLinkAtom href={item.path}>{item.label}</AppLinkAtom>}
            </li>)}
        </ol>
    </nav>;
};
