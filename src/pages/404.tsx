import {ActionLinkAtom} from '@/src/UI/components/ActionLink.atom';
import {site} from '@/src/content/site.mjs';
export default function NotFound() {
    return <section className="not-found"><h1>Page not found / Nie znaleziono strony</h1>
        <div className="recovery-links">
            <ActionLinkAtom href={`${site.origin}/`} lang="en" hrefLang="en">Back to home</ActionLinkAtom>
            <ActionLinkAtom href={`${site.origin}/pl/`} lang="pl" hrefLang="pl">Wróć na stronę główną</ActionLinkAtom>
        </div>
    </section>;
}
