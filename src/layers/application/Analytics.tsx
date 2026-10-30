import { useEffect, useState } from 'react';
import Script from 'next/script';
import { site } from '@/src/content/site.mjs';

export function Analytics() {
    const [active, setActive] = useState(false);
    const id = process.env.NEXT_PUBLIC_GA_ID;
    useEffect(() => {
        const activate = () => {
            if (window.location.hostname === new URL(site.origin).hostname) setActive(true);
        };
        window.addEventListener('pointerdown', activate, {once: true});
        window.addEventListener('keydown', activate, {once: true});
        return () => {
            window.removeEventListener('pointerdown', activate);
            window.removeEventListener('keydown', activate);
        };
    }, []);
    if (!active || !id || !/^G-[A-Z0-9]+$/.test(id)) return null;
    return <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload"/>
        <Script id="ga-init" strategy="lazyOnload">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}</Script>
    </>;
}
