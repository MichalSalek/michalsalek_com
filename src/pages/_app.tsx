import type { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v16-pagesRouter';
import { MainComposition } from '@/src/UI/compositions/Main.composition';
import { LocaleContext } from '@/src/i18n/context';
import type { SitePageProps } from '@/src/content/load-page';
import en from '@/src/content/en.json';
import { useEffect } from 'react';
import '@/src/UI/styles/globals.scss';
import { useRouteChangeTransitionController } from '@/src/layers/core/useRouteChangeTransition.controller';

export type GeneralPageProps = SitePageProps;

export default function App(props: AppProps<SitePageProps>) {
    const { Component, pageProps } = props;
    useRouteChangeTransitionController();
    const locale = pageProps.locale ?? 'en';
    const path = pageProps.path ?? '/';
    const messages = pageProps.messages ?? en.ui;
    // _document only renders on full loads; client navigation must update lang too.
    useEffect(() => { document.documentElement.lang = locale; }, [locale]);
    return <AppCacheProvider {...props}>
        <LocaleContext.Provider value={{locale, path, messages}}>
            <MainComposition {...pageProps}>
                <Component {...pageProps}/>
            </MainComposition>
        </LocaleContext.Provider>
    </AppCacheProvider>;
}
