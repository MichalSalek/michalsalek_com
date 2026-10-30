import type { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { PagePath } from '@/src/content/site.mjs';
import { useLocale } from '@/src/i18n/context';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';

export const ArticleComposition = ({children, title, links}: {children: ReactNode; title: string; links: {path: PagePath; title: string}[]}) => {
    const {messages} = useLocale();
    return <Container>
        <Typography variant="h1">{title}</Typography>
        {children}
        <aside className="related-services"><h2>{messages.related}</h2>
            <ul>{links.map(link => <li key={link.path}><AppLinkAtom href={link.path}>{link.title}</AppLinkAtom></li>)}</ul>
        </aside>
        <section className="contact-cta"><h2>{messages.talk}</h2>
            <AppLinkAtom href={`/contact/?about=${encodeURIComponent(title)}`}>{messages.ask}</AppLinkAtom>
        </section>
    </Container>;
};
