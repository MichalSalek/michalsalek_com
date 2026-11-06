import {useEffect, useState} from 'react';
import Script from 'next/script';
import {localePath, site} from '@/src/content/site.mjs';
import {useLocale} from '@/src/i18n/context';
import {analyticsQueue} from './contact-analytics';

export function Analytics() {
    const [active, setActive] = useState(false);
    const {path, locale} = useLocale();
    const id = process.env.NEXT_PUBLIC_GA_ID;
    useEffect(() => {
        try { analyticsQueue(path, locale)?.('event', 'page_view', {page_location: `${site.origin}${localePath(locale, path)}`, page_referrer: ''}); }
        catch { /* Optional analytics must not affect navigation. */ }
    }, [path, locale]);
    useEffect(() => {
        const activate = () => { if (window.location.hostname === new URL(site.origin).hostname) setActive(true); };
        window.addEventListener('pointerdown', activate, {once: true});
        window.addEventListener('keydown', activate, {once: true});
        return () => {
            window.removeEventListener('pointerdown', activate);
            window.removeEventListener('keydown', activate);
        };
    }, []);
    if (!active || !id || !/^G-[A-Z0-9]+$/.test(id)) return null;
    return <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload"/>;
}
