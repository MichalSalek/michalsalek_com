import { createContext, useContext } from 'react';
import type en from '@/src/content/en.json';
import type { Locale, PagePath } from '@/src/content/site.mjs';

export type Messages = typeof en.ui;
export const LocaleContext = createContext<{locale: Locale; path: PagePath; messages: Messages} | null>(null);

export function useLocale() {
    const value = useContext(LocaleContext);
    if (!value) throw new Error('Locale provider is missing');
    return value;
}
