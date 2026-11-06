import Typography from '@mui/material/Typography';
import {useRouter} from 'next/router';
import {useLocale} from '@/src/i18n/context';
import {site} from '@/src/content/site.mjs';
import {CONTACT_ANCHOR, contactContext, contactPlacement, type ContactVariant} from '@/src/layers/application/contact-context';
import ContactFormOrganism from './ContactForm.organism';
import {EmailContactLink} from './EmailContactLink.molecule';
import {RichTextAtom} from './RichText.atom';

export function ContactSection({variant = 'compact', title}: {variant?: ContactVariant; title?: string}) {
    const {locale, path, messages} = useLocale();
    const router = useRouter();
    const full = variant === 'full';
    return <section className={`contact-cta contact-section contact-section-${variant}`} aria-labelledby={CONTACT_ANCHOR}>
        <div className="contact-invitation">
            <Typography variant={full ? 'h1' : 'h2'} component={full ? 'h1' : 'h2'} id={CONTACT_ANCHOR} tabIndex={-1}>{title ?? messages.talk}</Typography>
            <Typography variant="body1" component="p"><RichTextAtom text={messages.contactIntro}/></Typography>
            <p>{messages.directEmail} <EmailContactLink placement={contactPlacement(path)}>{site.email}</EmailContactLink></p>
        </div>
        <ContactFormOrganism variant={variant} context={contactContext(locale, path, router.isReady ? router.query : {})} placement={contactPlacement(path)}/>
    </section>;
}
