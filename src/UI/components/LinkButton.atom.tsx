import type { ReactNode } from 'react';
import { AppLinkAtom } from './AppLink.atom';
import { appStyles } from '@/src/UI/styles/constants';

export const LinkButtonAtom = ({href, children}: {href: string; children: ReactNode}) =>
    <AppLinkAtom className="link-button" href={href} style={appStyles.cardBoxShadow}>{children}</AppLinkAtom>;
