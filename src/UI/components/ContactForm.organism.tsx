import {useSyncExternalStore, useRef, useState, type FormEvent} from 'react';
import {useRouter} from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {useLocale} from '@/src/i18n/context';
import {site} from '@/src/content/site.mjs';
import {useSubjectAttention} from '@/src/UI/hooks/useSubjectAttention.hook';
import {useContactDraft} from '@/src/UI/hooks/useContactDraft.hook';
import {contactMailto} from '@/src/layers/application/contact-draft';
import {withContactSource, type ContactContext, type ContactPlacement, type ContactVariant} from '@/src/layers/application/contact-context';
import {trackContact} from '@/src/layers/application/contact-analytics';
import {acknowledgeDelivery, deliverContact, deliveryStatus, serverDeliveryStatus, subscribeDelivery} from '@/src/layers/application/contact-delivery';
import {ActionLinkAtom} from './ActionLink.atom';

const subscribe = () => () => {};
export default function ContactFormOrganism({variant, context, placement}: {variant: ContactVariant; context: ContactContext; placement: ContactPlacement}) {
    const {messages, locale, path} = useLocale();
    const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
    const {isReady} = useRouter();
    const {draft, update, clear} = useContactDraft(context, isReady);
    const {text, email, name} = draft;
    const subject = draft.subjectMode === 'manual' ? draft.subject : context.autoSubject;
    const status = useSyncExternalStore(subscribeDelivery, deliveryStatus, serverDeliveryStatus);
    const subjectRef = useRef<HTMLDivElement>(null);
    const started = useRef(false);
    const [subjectEdited, setSubjectEdited] = useState(false);
    useSubjectAttention(subjectRef, (draft.subjectMode === 'auto' || Boolean(context.legacySubject && subject === context.legacySubject && !subjectEdited)) && status === 'idle', context.autoSubject);
    const external = Boolean(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT);
    const feedback = status === 'sent' || status === 'failed';
    const locked = status === 'sending' || feedback;
    const eventContext = {path, locale, sourcePath: context.sourcePath, topicId: draft.subjectMode === 'manual' ? 'custom' : context.topicId, variant, placement};
    const mailto = contactMailto(site.email, subject, withContactSource(text, context.sourcePath), name, email);
    function edit(patch: Parameters<typeof update>[0]) {
        if (Object.hasOwn(patch, 'subject')) setSubjectEdited(true);
        if (!started.current) { started.current = true; trackContact('contact_start', eventContext); }
        update(patch);
    }
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (deliveryStatus() === 'sending') return;
        if (feedback) {
            if (status === 'sent') { clear(); started.current = false; }
            acknowledgeDelivery();
            return;
        }
        if (!external) {
            trackContact('contact_email_open', eventContext);
            window.location.href = mailto;
            return;
        }
        void deliverContact({subject, text: withContactSource(text, context.sourcePath), replyTo: email, signature: name}, eventContext);
    }
    return <form className={`contact-form contact-form-${variant}`} data-text-export="exclude" onSubmit={submit} aria-busy={status === 'sending'}>
        <div className="contact-fields">
            <div className="contact-email">
                <TextField label={messages.email} name="email" type="email" autoComplete="email" required={external} fullWidth disabled={locked} value={email} onChange={event => edit({email: event.target.value})}/>
            </div>
            <div className="contact-message">
                <TextField ref={subjectRef} key={context.autoSubject} className="subject-attention" label={messages.subject} name="subject" required fullWidth disabled={locked} value={subject} onChange={event => edit({subject: event.target.value})}/>
                <div className="contact-message-body">
                    <TextField label={messages.message} name="message" required fullWidth multiline minRows={variant === 'compact' ? 6 : 12} disabled={locked} value={text} onChange={event => edit({text: event.target.value})}/>
                    <div role="status" aria-live="polite" className={feedback ? `contact-feedback ${status}` : undefined}>{status === 'sent' ? messages.sent : status === 'failed' ? messages.failed : ''}</div>
                </div>
                <TextField label={messages.name} name="name" autoComplete="name" fullWidth disabled={locked} value={name} onChange={event => edit({name: event.target.value})}/>
                {!external && <p id="email-hint">{messages.emailHint}</p>}
                {status === 'failed' && <ActionLinkAtom href={mailto} onClick={() => trackContact('contact_email_open', eventContext)}>{messages.openEmail}</ActionLinkAtom>}
                <Button sx={{my: '2rem', minHeight: '3rem', alignItems: 'center'}} size="large" type="submit" variant="contained" color={status === 'sent' ? 'success' : status === 'failed' ? 'error' : 'primary'} disabled={!hydrated || status === 'sending'} aria-label={status === 'sending' ? messages.sending : undefined} aria-describedby={!external ? 'email-hint' : undefined}>
                    {status === 'sending' ? <CircularProgress thickness={20} size={24} color="inherit"/> : feedback ? 'OK' : external ? messages.send : messages.openEmail}
                </Button>
            </div>
        </div>
    </form>;
}
