import test from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const { sendEmail } = await import(pathToFileURL(resolve(process.env.EMAIL_TEST_MODULE ?? 'src/layers/application/email.ts')));
const payload = {subject: 'Project', text: 'Message', replyTo: 'test@example.com', signature: 'Test'};

test('contact rejects an absent service instead of pretending a message was sent', async () => {
    const previous = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    delete process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    try { await assert.rejects(sendEmail(payload), /not configured/); }
    finally {
        if (previous === undefined) delete process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
        else process.env.NEXT_PUBLIC_CONTACT_ENDPOINT = previous;
    }
});

test('contact delivery requires an HTTP success and propagates provider failures', async () => {
    const previous = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    const originalFetch = globalThis.fetch;
    process.env.NEXT_PUBLIC_CONTACT_ENDPOINT = 'https://contact.example.com';
    try {
        globalThis.fetch = async () => new Response('', {status: 502});
        await assert.rejects(sendEmail(payload), /502/);
        globalThis.fetch = async () => new Response(null, {status: 204});
        await sendEmail(payload);
    } finally {
        globalThis.fetch = originalFetch;
        if (previous === undefined) delete process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
        else process.env.NEXT_PUBLIC_CONTACT_ENDPOINT = previous;
    }
});
