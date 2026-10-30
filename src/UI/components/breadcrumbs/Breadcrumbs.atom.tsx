import { useLocale } from '@/src/i18n/context';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';

export const BreadcrumbsAtom = () => {
    const {path, messages} = useLocale();
    return <nav className="breadcrumbs" aria-label={messages.sitemap}>
        {path !== '/' && <AppLinkAtom href="/">{messages.home}</AppLinkAtom>}
        {path.startsWith('/sound/') && path !== '/sound/' && <AppLinkAtom href="/sound/">{messages.sound}</AppLinkAtom>}
    </nav>;
};
