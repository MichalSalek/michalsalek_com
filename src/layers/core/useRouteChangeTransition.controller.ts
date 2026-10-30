import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useRouteChangeTransitionController = () => {
    const router = useRouter();
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        const content = () => document.getElementById('main-app-content-box');
        const start = () => { clearTimeout(timer); content()?.classList.add('app-routing-transition'); };
        const stop = () => { timer = setTimeout(() => content()?.classList.remove('app-routing-transition'), 30); };
        router.events.on('routeChangeStart', start);
        router.events.on('routeChangeComplete', stop);
        router.events.on('routeChangeError', stop);
        return () => {
            clearTimeout(timer);
            content()?.classList.remove('app-routing-transition');
            router.events.off('routeChangeStart', start);
            router.events.off('routeChangeComplete', stop);
            router.events.off('routeChangeError', stop);
        };
    }, [router.events]);
};
