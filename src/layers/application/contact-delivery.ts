import {sendEmail, type SendEmailDTO} from './email.ts';
import {trackContact, type ContactEventContext} from './contact-analytics.ts';

export type DeliveryStatus = 'idle' | 'sending' | 'sent' | 'failed';
let status: DeliveryStatus = 'idle';
const listeners = new Set<() => void>();
export const subscribeDelivery = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
export const deliveryStatus = () => status;
export const serverDeliveryStatus = (): DeliveryStatus => 'idle';
function publish(next: DeliveryStatus) { status = next; for (const listener of listeners) listener(); }
export function acknowledgeDelivery() { if (status !== 'sending') publish('idle'); }
export async function deliverContact(payload: SendEmailDTO, context: ContactEventContext): Promise<void> {
    // The shared synchronous lock also survives route changes and rapid clicks.
    if (status !== 'idle') return;
    publish('sending');
    try {
        await sendEmail(payload);
        trackContact('generate_lead', context);
        publish('sent');
    } catch {
        trackContact('contact_error', context);
        publish('failed');
    }
}
