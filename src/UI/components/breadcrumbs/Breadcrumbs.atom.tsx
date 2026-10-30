import { useLocale } from '@/src/i18n/context';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';

export const BreadcrumbsAtom = () => {
    const {path, messages} = useLocale();
    const hidden = path === '/' || path === '/sitemap/';
    return <nav className="breadcrumbs" aria-label={messages.sitemap} style={hidden ? {visibility: 'hidden'} : undefined}>
        <span><AppLinkAtom href="/sitemap/">{messages.sitemap}</AppLinkAtom></span>
        <span><AppLinkAtom href="/">{messages.home}</AppLinkAtom></span>
        {path.startsWith('/sound/') && path !== '/sound/' && <span><AppLinkAtom href="/sound/">{messages.sound}</AppLinkAtom></span>}
    </nav>;
};
