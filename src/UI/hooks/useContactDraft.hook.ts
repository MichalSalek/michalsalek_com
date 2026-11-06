import {useEffect, useRef, useState} from 'react';
import {clearContactDraft, readContactDraft, saveContactDraft, type ContactDraft} from '@/src/layers/application/contact-draft';

const emptyDraft = (about: string): ContactDraft => ({version: 1, about, subject: null, text: '', email: '', name: ''});

export function useContactDraft(about: string, ready: boolean) {
    const [draft, setDraft] = useState<ContactDraft>(() => emptyDraft(''));
    const current = useRef(draft);
    const initialized = useRef(false);
    useEffect(() => {
        if (!ready) return;
        const stored = readContactDraft() ?? (initialized.current ? current.current : null);
        const restored = stored ? {...stored, about, subject: about && about !== stored.about ? null : stored.subject ?? (about ? null : stored.about || null)} : emptyDraft(about);
        // Reading after hydration keeps the first client render identical to the server.
        current.current = restored;
        initialized.current = true;
        setDraft(restored);
        saveContactDraft(restored);
    }, [about, ready]);

    function update(patch: Partial<Pick<ContactDraft, 'subject' | 'text' | 'email' | 'name'>>) {
        const next = {...current.current, about, ...patch};
        current.current = next;
        saveContactDraft(next);
        setDraft(next);
    }

    function clear() {
        clearContactDraft();
        const empty = emptyDraft(about);
        current.current = empty;
        setDraft(empty);
    }
    return {draft, update, clear};
}
