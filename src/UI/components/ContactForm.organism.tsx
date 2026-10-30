import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocale } from '@/src/i18n/context';
import { site } from '@/src/content/site.mjs';
import { sendEmail } from '@/src/layers/application/email';

export default function ContactFormOrganism() {
    const {messages} = useLocale();
    const {query} = useRouter();
    const about = typeof query.about === 'string' ? query.about : '';
    const [subject, setSubject] = useState<string | null>(null);
    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
    const external = Boolean(process.env.NEXT_PUBLIC_CONTACT_ENDPOINT);
    const currentSubject = subject ?? about;
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (status === 'sending') return;
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
        <TextField label={messages.email} name="email" type="email" autoComplete="email" required={external} fullWidth value={email} onChange={event => setEmail(event.target.value)}/>
        <TextField label={messages.subject} name="subject" required fullWidth value={currentSubject} onChange={event => setSubject(event.target.value)}/>
        <TextField label={messages.message} name="message" required fullWidth multiline minRows={8} value={text} onChange={event => setText(event.target.value)}/>
        <TextField label={messages.name} name="name" autoComplete="name" fullWidth value={name} onChange={event => setName(event.target.value)}/>
        {!external && <p id="email-hint">{messages.emailHint}</p>}
        <div role="status" aria-live="polite">{status === 'sent' ? messages.sent : status === 'failed' ? messages.failed : ''}</div>
        <Button type="submit" variant="contained" disabled={status === 'sending'} aria-describedby={!external ? 'email-hint' : undefined}>
            {status === 'sending' ? messages.sending : external ? messages.send : messages.openEmail}
        </Button>
    </form>;
}
