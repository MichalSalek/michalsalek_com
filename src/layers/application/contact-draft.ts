import {isContactTopic, legacyTopic, type ContactTopic} from './contact-context.ts';

export const CONTACT_DRAFT_KEY = 'contact-draft:v2';
export const LEGACY_CONTACT_DRAFT_KEY = 'contact-draft:v1';
export type ContactDraft = {
    version: 2; topicId: ContactTopic; subjectMode: 'auto' | 'manual'; subject: string;
    text: string; email: string; name: string;
};
const limits = {subject: 2000, text: 100000, email: 1000, name: 1000};
let memoryDraft: ContactDraft | null = null;

export function emptyContactDraft(topicId: ContactTopic = 'general'): ContactDraft {
    return {version: 2, topicId, subjectMode: 'auto', subject: '', text: '', email: '', name: ''};
}
export function parseContactDraft(raw: string | null): ContactDraft | null {
    if (!raw || raw.length > 650000) return null;
    try {
        const value: unknown = JSON.parse(raw);
        if (!value || typeof value !== 'object') return null;
        const draft = value as Record<string, unknown>;
        for (const key of ['text', 'email', 'name'] as const) if (typeof draft[key] !== 'string' || draft[key].length > limits[key]) return null;
        const fields = {text: draft.text as string, email: draft.email as string, name: draft.name as string};
        if (draft.version === 1) {
            if (typeof draft.about !== 'string' || draft.about.length > limits.subject || (draft.subject !== null && (typeof draft.subject !== 'string' || draft.subject.length > limits.subject))) return null;
            const topicId = legacyTopic(draft.about);
            const manual = draft.subject !== null || Boolean(draft.about && !topicId);
            return {...emptyContactDraft(topicId ?? 'general'), ...fields, subjectMode: manual ? 'manual' : 'auto', subject: typeof draft.subject === 'string' ? draft.subject : manual ? draft.about : ''};
        }
        if (draft.version !== 2 || !isContactTopic(draft.topicId) || !['auto', 'manual'].includes(draft.subjectMode as string) || typeof draft.subject !== 'string' || draft.subject.length > limits.subject) return null;
        return {version: 2, topicId: draft.topicId, subjectMode: draft.subjectMode as ContactDraft['subjectMode'], subject: draft.subject, ...fields};
    } catch { return null; }
}
export function readContactDraft(): ContactDraft | null {
    try {
        const raw = window.sessionStorage.getItem(CONTACT_DRAFT_KEY) ?? window.sessionStorage.getItem(LEGACY_CONTACT_DRAFT_KEY);
        return parseContactDraft(raw) ?? memoryDraft;
    } catch { return memoryDraft; }
}
export function saveContactDraft(draft: ContactDraft): void {
    memoryDraft = draft;
    try {
        if (draft.subjectMode === 'auto' && !draft.text && !draft.email && !draft.name) window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
        else if (parseContactDraft(JSON.stringify(draft))) window.sessionStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(draft));
        window.sessionStorage.removeItem(LEGACY_CONTACT_DRAFT_KEY);
    } catch { /* A blocked or full store must not prevent editing. */ }
}
export function clearContactDraft(): void {
    memoryDraft = null;
    try {
        window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
        window.sessionStorage.removeItem(LEGACY_CONTACT_DRAFT_KEY);
    } catch { /* The in-memory draft was cleared too. */ }
}
export function contactMailto(address: string, subject: string, text: string, name: string, email: string): string {
    return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${text}\n\n${name}${email ? `\n${email}` : ''}`)}`;
}
