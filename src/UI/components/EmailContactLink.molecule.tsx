import type {ReactNode} from 'react';
import {useLocale} from '@/src/i18n/context';
import {site} from '@/src/content/site.mjs';
import {contactContext, type ContactPlacement} from '@/src/layers/application/contact-context';
import {trackContact} from '@/src/layers/application/contact-analytics';

export function EmailContactLink({children, placement}: {children: ReactNode; placement: ContactPlacement}) {
    const {locale, path} = useLocale();
    return <a href={`mailto:${site.email}`} onClick={() => trackContact('contact_email_open', {locale, path, topicId: contactContext(locale, path).topicId, variant: path === '/contact/' ? 'full' : 'compact', placement})}>{children}</a>;
}
