import LanguageIcon from '@mui/icons-material/Language';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom';
import { useLocale } from '@/src/i18n/context';
import { localePath } from '@/src/content/site.mjs';
import scss from './appBar.module.scss';

export const AppBarOrganism = () => {
    const {locale, path, messages} = useLocale();
    const router = useRouter();
    const elevated = useScrollTrigger({disableHysteresis: true, threshold: 0});
    const language = locale === 'en' ? 'pl' : 'en';
    const hashAt = router.asPath.indexOf('#');
    const queryAt = router.asPath.indexOf('?');
    const suffixAt = queryAt >= 0 ? queryAt : hashAt;
    const suffix = suffixAt >= 0 ? router.asPath.slice(suffixAt) : '';
    return <AppBar component="header" className={scss.host} elevation={elevated ? 1 : 0} sx={{backgroundColor: 'rgba(255, 255, 255, .3)', backdropFilter: 'blur(5px) saturate(200%) contrast(36%) brightness(150%)', borderTop: '4px solid', borderTopColor: 'primary.main'}}>
        <Toolbar component="nav" aria-label={locale === 'pl' ? 'Nawigacja główna' : 'Main navigation'} sx={{padding: '0 !important'}}>
            <AppLinkAtom className="brand-link" href="/"><CompanyNameAtom fullName/></AppLinkAtom>
            <div style={{flex: 1}}/>
            <Link className="language-link" href={`${localePath(language, path)}${suffix}`} hrefLang={language} lang={language} aria-label={`${language.toUpperCase()}: ${messages.switchLanguage}`}><LanguageIcon fontSize="small"/><span>{language.toUpperCase()}</span></Link>
            <AppLinkAtom className="contact-link" href="/contact/"><span>{messages.contact}</span><ContactMailIcon/></AppLinkAtom>
        </Toolbar>
    </AppBar>;
};
