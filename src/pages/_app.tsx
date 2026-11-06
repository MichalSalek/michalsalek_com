import type { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v16-pagesRouter';
import { MainComposition } from '@/src/UI/compositions/Main.composition';
import { LocaleContext } from '@/src/i18n/context';
import type { SitePageProps } from '@/src/content/load-page';
import en from '@/src/content/en.json';
import pl from '@/src/content/pl.json';
import { useEffect, useSyncExternalStore } from 'react';
import {useRouter} from 'next/router';
import '@/src/UI/styles/globals.scss';
import { useRouteChangeTransitionController } from '@/src/layers/core/useRouteChangeTransition.controller';

export type GeneralPageProps = SitePageProps;
// The router already causes renders; the store only reconciles the static hydration snapshot.
const noExternalSubscription = () => () => {};

export default function App(props: AppProps<SitePageProps>) {
    const { Component, pageProps } = props;
    const router = useRouter();
    useRouteChangeTransitionController();
    // DECISION: Match the bilingual static 404 during hydration, then localize its shell from the requested URL.
    const locale = useSyncExternalStore(noExternalSubscription,
        () => pageProps.locale ?? (router.isReady && /^\/pl(?:\/|$)/.test(router.asPath) ? 'pl' : 'en'),
        () => pageProps.locale ?? 'en');
    const path = pageProps.path ?? '/';
    const messages = pageProps.messages ?? (locale === 'pl' ? pl.ui : en.ui);
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
