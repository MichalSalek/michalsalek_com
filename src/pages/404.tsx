import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
export default function NotFound() {
    return <section className="not-found"><h1>Page not found / Nie znaleziono strony</h1>
        <p><AppLinkAtom href="/">Back to home / Wróć na stronę główną</AppLinkAtom></p>
    </section>;
}
