import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { pageHref } from '@/src/content/site.mjs';
import { useLocale } from '@/src/i18n/context';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & Omit<LinkProps, 'href'> & {href: string; children: ReactNode};
export const AppLinkAtom = ({href, children, ...props}: Props) => {
    const {locale} = useLocale();
    return <Link {...props} href={pageHref(locale, href)}>{children}</Link>;
};
