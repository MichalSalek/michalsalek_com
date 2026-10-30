import type { ReactNode } from 'react';
import Head from 'next/head';
import localFont from 'next/font/local';
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

const font = localFont({src: [
    {path: '../fonts/Mona-Sans-Light.woff2', weight: '300'},
    {path: '../fonts/Mona-Sans-Regular.woff2', weight: '400'},
    {path: '../fonts/Mona-Sans-SemiBold.woff2', weight: '600'},
], display: 'swap', variable: '--font-mona'});

export const MainComposition = ({children, title, description}: Partial<SitePageProps> & {children: ReactNode}) => {
    const {messages} = useLocale();
    return <ThemeProvider theme={mainTheme}>
        <CssBaseline/>
        <Head><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="icon" href="/favicon.ico"/></Head>
        <SeoHead title={title} description={description}/>
        <div className={`${font.variable} site-shell`}>
            <a className="skip-link" href="#main-app-content-box">{messages.skip}</a>
            <HeaderPartial/>
            <main id="main-app-content-box" tabIndex={-1}>
                <Container maxWidth="xl"><BreadcrumbsAtom/>{children}</Container>
            </main>
            <FooterPartial/>
        </div>
        <Analytics/>
    </ThemeProvider>;
};
