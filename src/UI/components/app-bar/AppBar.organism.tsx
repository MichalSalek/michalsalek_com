import LanguageIcon from '@mui/icons-material/Language';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom';
import { useLocale } from '@/src/i18n/context';
import { localePath } from '@/src/content/site.mjs';

export const AppBarOrganism = () => {
    const {locale, path, messages} = useLocale();
    const router = useRouter();
    const language = locale === 'en' ? 'pl' : 'en';
    const hashAt = router.asPath.indexOf('#');
    const queryAt = router.asPath.indexOf('?');
    const suffixAt = queryAt >= 0 ? queryAt : hashAt;
    const suffix = suffixAt >= 0 ? router.asPath.slice(suffixAt) : '';
    return <header className="site-header">
        <nav aria-label={locale === 'pl' ? 'Nawigacja główna' : 'Main navigation'}>
            <AppLinkAtom className="brand-link" href="/"><CompanyNameAtom fullName/></AppLinkAtom>
            <div className="header-actions">
                <Link className="language-link" href={`${localePath(language, path)}${suffix}`} hrefLang={language} lang={language} aria-label={`${language.toUpperCase()}: ${messages.switchLanguage}`}>
                    <LanguageIcon fontSize="small"/><span>{language.toUpperCase()}</span>
                </Link>
                <AppLinkAtom className="contact-link" href="/contact/">{messages.contact}</AppLinkAtom>
            </div>
        </nav>
    </header>;
};
