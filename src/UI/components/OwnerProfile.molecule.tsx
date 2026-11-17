import {useLocale} from '@/src/i18n/context';
import {site} from '@/src/content/site.mjs';
import {contactHref, contactPlacement} from '@/src/layers/application/contact-context';
import {AppLinkAtom} from './AppLink.atom';

export function OwnerProfile() {
    const {locale, path, messages} = useLocale();
    return <div className="owner-profile">
        <p><strong>{site.owner}</strong>{' '}{messages.profileExperience}</p>
        <div className="owner-profile-links">
            <AppLinkAtom href="/software/fullstack/">{messages.profileSkills}</AppLinkAtom>
            <AppLinkAtom href={contactHref(locale, path, 'recruitment')} contactPlacement={contactPlacement(path)}>{messages.profileContact}</AppLinkAtom>
        </div>
    </div>;
}
