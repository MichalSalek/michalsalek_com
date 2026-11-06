import test from 'node:test';
import assert from 'node:assert/strict';
import {parseContactDraft, contactMailto, readContactDraft, saveContactDraft, clearContactDraft, CONTACT_DRAFT_KEY} from '../src/layers/application/contact-draft.ts';

test('draft parser accepts bounded versioned fields and rejects malformed input', () => {
    const draft = {version: 1, about: 'AI', subject: 'Własny temat', text: 'Łódź\nA&B', email: 'a@example.com', name: 'Żaneta'};
    assert.deepEqual(parseContactDraft(JSON.stringify(draft)), draft);
    for (const raw of ['{', 'null', JSON.stringify({...draft, version: 2}), JSON.stringify({...draft, text: 1}), JSON.stringify({...draft, text: 'x'.repeat(100001)})]) assert.equal(parseContactDraft(raw), null);
});

test('storage failures do not escape and empty drafts are removed', () => {
    const previous = globalThis.window;
    const values = new Map();
    globalThis.window = {sessionStorage: {getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key)}};
    try {
        const draft = {version: 1, about: 'AI', subject: null, text: 'tekst', email: '', name: ''};
        saveContactDraft(draft);
        assert.deepEqual(readContactDraft(), draft);
        saveContactDraft({...draft, text: ''});
        assert.equal(values.has(CONTACT_DRAFT_KEY), false);
        globalThis.window = {get sessionStorage() { throw new Error('blocked'); }};
        assert.equal(readContactDraft(), null);
        assert.doesNotThrow(() => saveContactDraft(draft));
        assert.doesNotThrow(clearContactDraft);
    } finally { globalThis.window = previous; }
});

test('email fallback encodes subject and message without changing special characters', () => {
    const url = new URL(contactMailto('contact@example.com', 'Żółć & ? #', 'Pierwsza linia\nDruga & +', 'Łucja', 'a+b@example.com'));
    assert.equal(url.searchParams.get('subject'), 'Żółć & ? #');
    assert.equal(url.searchParams.get('body'), 'Pierwsza linia\nDruga & +\n\nŁucja\na+b@example.com');
});
