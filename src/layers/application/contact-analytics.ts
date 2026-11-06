import {localePath, site, type Locale, type PagePath} from '../../content/site.mjs';
import {knownSource, isContactTopic, type ContactPlacement, type ContactVariant} from './contact-context.ts';

export type ContactEvent = 'contact_intent' | 'contact_start' | 'generate_lead' | 'contact_error' | 'contact_email_open';
export type ContactEventContext = {path: PagePath; locale: Locale; sourcePath?: string; topicId: string; variant: ContactVariant; placement: ContactPlacement};
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } }
let configured = false;
export function analyticsQueue(path: PagePath, locale: Locale): Window['gtag'] {
    if (typeof window === 'undefined') return undefined;
    const id = process.env.NEXT_PUBLIC_GA_ID;
    if (!id || !/^G-[A-Z0-9]+$/.test(id)) return undefined;
    window.dataLayer ??= [];
    // Match the standard gtag queue contract before the delayed script arrives.
    // GA consumes an Arguments object, rather than a custom event-array queue.
    // eslint-disable-next-line prefer-rest-params
    window.gtag ??= function () { window.dataLayer!.push(arguments); };
    if (!configured) {
        configured = true;
        window.gtag('js', new Date());
        window.gtag('config', id, {send_page_view: false, page_location: `${site.origin}${localePath(locale, path)}`, page_referrer: ''});
    }
    return window.gtag;
}
export function trackContact(event: ContactEvent, context: ContactEventContext): void {
    try {
        const pagePath = localePath(context.locale, context.path);
        const parameters = {
            page_path: knownSource(pagePath), source_path: knownSource(context.sourcePath) ?? pagePath, language: context.locale,
            topic_id: isContactTopic(context.topicId) ? context.topicId : 'custom',
            form_variant: context.variant, placement: context.placement,
            page_location: `${site.origin}${pagePath}`, page_referrer: '',
        };
        analyticsQueue(context.path, context.locale)?.('event', event, parameters);
    } catch { /* Analytics is optional and cannot affect contact. */ }
}
