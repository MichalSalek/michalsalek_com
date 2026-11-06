import test from 'node:test';
import assert from 'node:assert/strict';
import {parseContactDraft, contactMailto, readContactDraft, saveContactDraft, clearContactDraft, CONTACT_DRAFT_KEY, LEGACY_CONTACT_DRAFT_KEY} from '../src/layers/application/contact-draft.ts';

const v2 = {version: 2, topicId: 'ai', subjectMode: 'manual', subject: 'Własny temat', text: 'Łódź\nA&B', email: 'a@example.com', name: 'Żaneta'};
const v1 = {version: 1, about: 'AI', subject: null, text: 'tekst', email: '', name: ''};

test('parser validates version 2, fields, topic and bounds', () => {
    assert.deepEqual(parseContactDraft(JSON.stringify(v2)), v2);
    for (const raw of ['{', 'null', JSON.stringify({...v2, version: 3}), JSON.stringify({...v2, topicId: 'bogus'}), JSON.stringify({...v2, subjectMode: 'bogus'}), JSON.stringify({...v2, text: 1}), JSON.stringify({...v2, text: 'x'.repeat(100001)})]) assert.equal(parseContactDraft(raw), null);
});

test('legacy drafts preserve manual subjects, including an intentional empty subject', () => {
    assert.deepEqual(parseContactDraft(JSON.stringify(v1)), {...v2, topicId: 'ai', subjectMode: 'auto', subject: '', text: 'tekst', email: '', name: ''});
    for (const subject of ['', 'Własny temat']) {
        const migrated = parseContactDraft(JSON.stringify({...v1, subject}));
        assert.equal(migrated.subjectMode, 'manual');
        assert.equal(migrated.subject, subject);
    }
    const custom = parseContactDraft(JSON.stringify({...v1, about: 'Niestandardowy temat'}));
    assert.equal(custom.subjectMode, 'manual');
    assert.equal(custom.subject, 'Niestandardowy temat');
});

test('storage migrates and clears both versions, with memory fallback when blocked', () => {
    const previous = globalThis.window;
    const values = new Map([[LEGACY_CONTACT_DRAFT_KEY, JSON.stringify(v1)]]);
    globalThis.window = {sessionStorage: {getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key)}};
    try {
        const migrated = readContactDraft();
        assert.equal(migrated.topicId, 'ai');
        saveContactDraft(migrated);
        assert.equal(values.has(LEGACY_CONTACT_DRAFT_KEY), false);
        assert.deepEqual(JSON.parse(values.get(CONTACT_DRAFT_KEY)), migrated);
        globalThis.window = {get sessionStorage() { throw new Error('blocked'); }};
        assert.deepEqual(readContactDraft(), migrated);
        saveContactDraft(v2);
        assert.deepEqual(readContactDraft(), v2);
        clearContactDraft();
        assert.equal(readContactDraft(), null);
        globalThis.window = {sessionStorage: {getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key)}};
        values.set(LEGACY_CONTACT_DRAFT_KEY, JSON.stringify(v1));
        clearContactDraft();
        assert.equal(values.has(CONTACT_DRAFT_KEY), false);
        assert.equal(values.has(LEGACY_CONTACT_DRAFT_KEY), false);
    } finally { clearContactDraft(); globalThis.window = previous; }
});

test('mailto encodes special characters and preserves message, source and signature order', () => {
    const url = new URL(contactMailto('contact@example.com', 'Żółć & ? #', 'Pierwsza linia\nDruga & +\n\nhttps://michalsalek.com/pl/', 'Łucja', 'a+b@example.com'));
    assert.equal(url.searchParams.get('subject'), 'Żółć & ? #');
    assert.equal(url.searchParams.get('body'), 'Pierwsza linia\nDruga & +\n\nhttps://michalsalek.com/pl/\n\nŁucja\na+b@example.com');
});
