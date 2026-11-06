import type {ComponentProps} from 'react';
import {AppLinkAtom} from './AppLink.atom';

type Props = ComponentProps<typeof AppLinkAtom>;

/** Shared visual treatment for a primary link that opens another page. */
export function ActionLinkAtom({children, className = '', href, ...props}: Props) {
    const content = <><span>{children}</span><span data-link-arrow aria-hidden="true">→</span></>;
    const classes = `action-link ${className}`.trim();
    return href.startsWith('/')
        ? <AppLinkAtom {...props} href={href} className={classes}>{content}</AppLinkAtom>
        : <a {...props} href={href} className={classes}>{content}</a>;
}
