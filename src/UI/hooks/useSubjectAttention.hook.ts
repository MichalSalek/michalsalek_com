import { useEffect, type RefObject } from 'react';

// A service enquiry should be noticeable when the field is actually visible.
export const useSubjectAttention = (ref: RefObject<HTMLDivElement | null>, active: boolean, enquiry: string) => {
    useEffect(() => {
        const field = ref.current;
        const inputBox = field?.querySelector<HTMLElement>('.MuiOutlinedInput-root');
        if (!active || !field || !inputBox) return;
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let finished = false;
        let frame = 0;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const stopWaiting = () => { cancelAnimationFrame(frame); clearTimeout(timer); };
        const visible = () => {
            const bounds = inputBox.getBoundingClientRect();
            const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
            const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
            return bounds.top >= Math.max(0, headerBottom) && bounds.bottom <= viewportHeight && bounds.left >= 0 && bounds.right <= window.innerWidth;
        };
        const settled = () => {
            const page = document.getElementById('main-app-content-box');
            return !page || (!page.classList.contains('app-routing-transition') && Number(getComputedStyle(page).opacity) >= .999);
        };
        const start = () => {
            if (finished || !visible() || document.visibilityState !== 'visible') return;
            if (!settled()) { frame = requestAnimationFrame(start); return; }
            // Keep the original short delay, but start its clock only in view.
            timer = setTimeout(() => {
                if (!visible() || !settled() || document.visibilityState !== 'visible') { wait(); return; }
                field.dataset.attention = 'pulse';
                finished = true;
                observer.disconnect();
            }, 800);
        };
        const wait = () => {
            stopWaiting();
            if (motion.matches) {
                field.dataset.attention = 'static';
                return;
            }
            delete field.dataset.attention;
            if (!finished && visible()) start();
        };
        const observer = new IntersectionObserver(wait, {threshold: [0, 1]});
        const cancel = () => { finished = true; stopWaiting(); observer.disconnect(); delete field.dataset.attention; };
        const motionChange = () => { finished = false; observer.observe(inputBox); wait(); };
        observer.observe(inputBox);
        motion.addEventListener('change', motionChange);
        document.addEventListener('visibilitychange', wait);
        inputBox.addEventListener('focusin', cancel);
        wait();
        return () => {
            stopWaiting();
            observer.disconnect();
            motion.removeEventListener('change', motionChange);
            document.removeEventListener('visibilitychange', wait);
            inputBox.removeEventListener('focusin', cancel);
            delete field.dataset.attention;
        };
    }, [ref, active, enquiry]);
};
