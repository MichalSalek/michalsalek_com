import type {ReactNode} from 'react';
import {useLocale} from '@/src/i18n/context';
import {CONTACT_ANCHOR, contactContext, type ContactPlacement} from '@/src/layers/application/contact-context';
import {trackContact} from '@/src/layers/application/contact-analytics';
import {ActionLinkAtom} from './ActionLink.atom';

export function ContactIntentLink({children, placement}: {children: ReactNode; placement: ContactPlacement}) {
    const {locale, path} = useLocale();
    const context = contactContext(locale, path);
    return <ActionLinkAtom href={`#${CONTACT_ANCHOR}`} onClick={() => trackContact('contact_intent', {path, locale, topicId: context.topicId, variant: 'compact', placement})}>{children}</ActionLinkAtom>;
}
