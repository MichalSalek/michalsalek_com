import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { pageHref } from '@/src/content/site.mjs';
import { useLocale } from '@/src/i18n/context';
import {contactContext} from '@/src/layers/application/contact-context';
import {trackContact} from '@/src/layers/application/contact-analytics';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & Omit<LinkProps, 'href'> & {href: string; children: ReactNode};
export const AppLinkAtom = ({href, children, onClick, ...props}: Props) => {
    const {locale, path} = useLocale();
    return <Link {...props} href={pageHref(locale, href)} onClick={event => {
        onClick?.(event);
        if (!event.defaultPrevented && href.split(/[?#]/)[0] === '/contact/') trackContact('contact_intent', {locale, path, topicId: contactContext(locale, path).topicId, variant: 'full', placement: props.className === 'contact-link' ? 'header' : 'footer'});
    }}>{children}</Link>;
};
