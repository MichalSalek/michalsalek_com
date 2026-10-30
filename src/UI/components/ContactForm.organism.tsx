import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocale } from '@/src/i18n/context';
import { site } from '@/src/content/site.mjs';
import { sendEmail } from '@/src/layers/application/email';

const subscribe = () => () => {};

export default function ContactFormOrganism() {
    const {messages} = useLocale();
    const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
    const {query} = useRouter();
    const about = typeof query.about === 'string' ? query.about : '';
    const [subject, setSubject] = useState<string | null>(null);
    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
    const external = Boolean(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT);
    const currentSubject = subject ?? about;
    const feedback = status === 'sent' || status === 'failed';
    const locked = status === 'sending' || feedback;
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (status === 'sending') return;
        if (feedback) {
            if (status === 'sent') { setText(''); setSubject(''); }
            setStatus('idle');
            return;
        }
        if (!external) {
            const body = `${text}\n\n${name}${email ? `\n${email}` : ''}`;
            window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(currentSubject)}&body=${encodeURIComponent(body)}`;
            return;
        }
        setStatus('sending');
        try {
            await sendEmail({subject: currentSubject, text, replyTo: email, signature: name});
            setStatus('sent');
        } catch {
            setStatus('failed');
        }
    }
    return <form className="contact-form" onSubmit={submit} aria-busy={status === 'sending'}>
        <div className="contact-fields">
            <div className="contact-email">
                <TextField label={messages.email} name="email" type="email" autoComplete="email" required={external} fullWidth disabled={locked} error={status === 'failed'} value={email} onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className="contact-message">
                <TextField key={about} className={about ? 'subject-attention' : undefined} label={messages.subject} name="subject" required fullWidth disabled={locked} error={status === 'failed'} value={currentSubject} onChange={event => setSubject(event.target.value)}/>
                <div className="contact-message-body">
                    <TextField label={messages.message} name="message" required fullWidth multiline minRows={12} disabled={locked} error={status === 'failed'} value={text} onChange={event => setText(event.target.value)}/>
                    <div role="status" aria-live="polite" className={feedback ? `contact-feedback ${status}` : undefined}>{status === 'sent' ? messages.sent : status === 'failed' ? messages.failed : ''}</div>
                </div>
                <TextField label={messages.name} name="name" autoComplete="name" fullWidth disabled={locked} value={name} onChange={event => setName(event.target.value)}/>
                {!external && <p id="email-hint">{messages.emailHint}</p>}
                <Button sx={{my: '2rem', height: '3rem', alignItems: 'center'}} size="large" type="submit" variant="contained" color={status === 'sent' ? 'success' : status === 'failed' ? 'error' : 'primary'} disabled={!hydrated || status === 'sending'} aria-label={status === 'sending' ? messages.sending : undefined} aria-describedby={!external ? 'email-hint' : undefined}>
                    {status === 'sending' ? <CircularProgress thickness={20} size={24} color="inherit"/> : feedback ? 'OK' : external ? messages.send : messages.openEmail}
                </Button>
            </div>
        </div>
    </form>;
}
