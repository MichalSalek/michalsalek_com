import {useEffect, useRef, useState} from 'react';
import {clearContactDraft, emptyContactDraft, readContactDraft, saveContactDraft, type ContactDraft} from '@/src/layers/application/contact-draft';
import type {ContactContext} from '@/src/layers/application/contact-context';

export function useContactDraft(context: ContactContext, ready: boolean) {
    const {topicId, autoSubject, sourcePath, legacySubject} = context;
    const [draft, setDraft] = useState<ContactDraft>(() => emptyContactDraft(topicId));
    const current = useRef(draft);
    useEffect(() => {
        if (!ready) return;
        const restored = readContactDraft() ?? current.current;
        const next: ContactDraft = {...restored, ...(restored.subjectMode === 'auto' ? {topicId, subject: autoSubject, ...(legacySubject ? {subjectMode: 'manual' as const, subject: legacySubject} : {})} : {})};
        current.current = next;
        setDraft(next);
        saveContactDraft(next);
    }, [topicId, autoSubject, sourcePath, legacySubject, ready]);
    function update(patch: Partial<Pick<ContactDraft, 'subject' | 'text' | 'email' | 'name'>>) {
        const next: ContactDraft = {...current.current, ...patch, ...(Object.hasOwn(patch, 'subject') ? {subjectMode: 'manual' as const} : {})};
        current.current = next;
        saveContactDraft(next);
        setDraft(next);
    }
    function clear() {
        clearContactDraft();
        const empty = {...emptyContactDraft(topicId), subject: autoSubject};
        current.current = empty;
        setDraft(empty);
    }
    return {draft, update, clear};
}
