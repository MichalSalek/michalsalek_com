import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom';
import { useLocale } from '@/src/i18n/context';
import { site } from '@/src/content/site.mjs';

export const FooterPartial = () => {
    const {messages} = useLocale();
    return <footer className="site-footer">
        <div><CompanyNameAtom fullName redirectOnClick/>
            <nav aria-label={messages.sitemap}>
                <AppLinkAtom href="/">{messages.home}</AppLinkAtom>
                <AppLinkAtom href="/sound/">{messages.sound}</AppLinkAtom>
                <AppLinkAtom href="/contact/">{messages.contact}</AppLinkAtom>
                <AppLinkAtom href="/sitemap/">{messages.sitemap}</AppLinkAtom>
            </nav>
            <p>{site.name} - {site.owner} | VAT PL9442267029</p>
        </div>
    </footer>;
};
