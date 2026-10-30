export type SendEmailDTO = {subject: string; text: string; replyTo: string; signature: string};

export async function sendEmail(payload: SendEmailDTO): Promise<void> {
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    if (!endpoint) throw new Error('Contact endpoint is not configured');
    const response = await fetch(endpoint, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload), signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Contact service returned ${response.status}`);
}
