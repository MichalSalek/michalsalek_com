import type { ReactNode } from 'react';
import { AppLinkAtom } from './AppLink.atom';
import { appStyles } from '@/src/UI/styles/constants';

// Repeated read-more controls name their destination without changing the card layout.
export const LinkButtonAtom = ({href, children, context}: {href: string; children: ReactNode; context?: string}) =>
    <AppLinkAtom className="link-button" href={href} style={appStyles.cardBoxShadow}>{children}{context && <span className="visually-hidden">: {context}</span>}</AppLinkAtom>;
