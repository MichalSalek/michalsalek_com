export const CONTACT_DRAFT_KEY = 'contact-draft:v1';

export type ContactDraft = {
    version: 1;
    about: string;
    subject: string | null;
    text: string;
    email: string;
    name: string;
};

const limits = {about: 2000, subject: 2000, text: 100000, email: 1000, name: 1000};

export function parseContactDraft(raw: string | null): ContactDraft | null {
    if (!raw || raw.length > 110000) return null;
    try {
        const value: unknown = JSON.parse(raw);
        if (!value || typeof value !== 'object') return null;
        const draft = value as Record<string, unknown>;
        if (draft.version !== 1) return null;
        for (const key of ['about', 'text', 'email', 'name'] as const) {
            if (typeof draft[key] !== 'string' || draft[key].length > limits[key]) return null;
        }
        if (draft.subject !== null && (typeof draft.subject !== 'string' || draft.subject.length > limits.subject)) return null;
        return {version: 1, about: draft.about as string, subject: draft.subject as string | null, text: draft.text as string, email: draft.email as string, name: draft.name as string};
    } catch { return null; }
}

export function readContactDraft(): ContactDraft | null {
    try { return parseContactDraft(window.sessionStorage.getItem(CONTACT_DRAFT_KEY)); }
    catch { return null; }
}

export function saveContactDraft(draft: ContactDraft): void {
    try {
        if (!draft.subject && !draft.text && !draft.email && !draft.name) {
            window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
            return;
        }
        const raw = JSON.stringify(draft);
        if (parseContactDraft(raw)) window.sessionStorage.setItem(CONTACT_DRAFT_KEY, raw);
    } catch { /* Storage may be blocked or full; the form remains usable. */ }
}

export function clearContactDraft(): void {
    try { window.sessionStorage.removeItem(CONTACT_DRAFT_KEY); }
    catch { /* Storage may be blocked. */ }
}

export function contactMailto(address: string, subject: string, text: string, name: string, email: string): string {
    const body = `${text}\n\n${name}${email ? `\n${email}` : ''}`;
    return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
