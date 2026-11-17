import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom';
import { useLocale } from '@/src/i18n/context';
import { localePath } from '@/src/content/site.mjs';
import {contactHref} from '@/src/layers/application/contact-context';

export const AppBarOrganism = () => {
    const {locale, path, messages} = useLocale();
    const router = useRouter();
    const language = locale === 'en' ? 'pl' : 'en';
    const hashAt = router.asPath.indexOf('#');
    const queryAt = router.asPath.indexOf('?');
    const suffixAt = queryAt >= 0 ? queryAt : hashAt;
    const suffix = suffixAt >= 0 ? router.asPath.slice(suffixAt) : '';
    return <AppBar component="header" elevation={0} sx={{backgroundColor: 'var(--site-surface)', color: 'var(--site-ink)', borderBottom: '1px solid var(--site-border)'}}>
        <Container maxWidth="xl" disableGutters>
        <Toolbar component="nav" aria-label={locale === 'pl' ? 'Nawigacja główna' : 'Main navigation'} sx={{padding: '0 !important'}}>
            <AppLinkAtom className="brand-link" href="/"><CompanyNameAtom fullName/></AppLinkAtom>
            <div style={{flex: 1}}/>
            <AppLinkAtom className="portfolio-link" href="/portfolio/" aria-current={path.startsWith('/portfolio/') ? 'true' : undefined}>Portfolio</AppLinkAtom>
            <Link className="language-link" href={`${localePath(language, path)}${suffix}`} hrefLang={language} lang={language} aria-label={`${language.toUpperCase()}: ${messages.switchLanguage}`}><LanguageIcon fontSize="small"/><span>{language.toUpperCase()}</span></Link>
            <AppLinkAtom className="contact-link" href={contactHref(locale, path)} aria-label={messages.contact}><span>{messages.contact}</span><MailOutlineIcon/></AppLinkAtom>
        </Toolbar>
        </Container>
    </AppBar>;
};
