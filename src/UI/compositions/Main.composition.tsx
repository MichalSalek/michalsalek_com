import type { ReactNode } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { mainTheme } from '@/src/UI/styles/theme';
import { HeaderPartial } from '@/src/UI/partials/Header.partial';
import { FooterPartial } from '@/src/UI/partials/Footer.partial';
import { BreadcrumbsAtom } from '@/src/UI/components/breadcrumbs/Breadcrumbs.atom';
import { SeoHead } from '@/src/UI/components/SeoHead';
import { useLocale } from '@/src/i18n/context';
import type { SitePageProps } from '@/src/content/load-page';
import { Analytics } from '@/src/layers/application/Analytics';

export const MainComposition = ({children, title, description, shareImage}: Partial<SitePageProps> & {children: ReactNode}) => {
    const {messages} = useLocale();
    return <ThemeProvider theme={mainTheme}>
        <CssBaseline/>
        <Head><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="icon" href="/favicon.ico"/></Head>
        <SeoHead title={title} description={description} shareImage={shareImage}/>
        <div className="site-shell">
            <a className="skip-link" href="#main-app-content-box">{messages.skip}</a>
            <HeaderPartial/>
            <main style={{marginTop: '7rem'}}>
                <Container maxWidth="xl"><div id="main-app-content-box" tabIndex={-1}><Container><BreadcrumbsAtom/></Container>{children}</div></Container>
            </main>
            <FooterPartial/>
        </div>
        <Analytics/>
    </ThemeProvider>;
};
