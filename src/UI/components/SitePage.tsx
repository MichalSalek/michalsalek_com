import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RootCardOrganism from '@/src/UI/components/RootCard.organism';
import ContentBlockOrganism from '@/src/UI/components/ContentBlock.organism';
import ContactFormOrganism from '@/src/UI/components/ContactForm.organism';
import { ArticleComposition } from '@/src/UI/compositions/Article.composition';
import { HeroMolecule } from '@/src/UI/components/Hero.molecule';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import type { SitePageProps } from '@/src/content/load-page';
import { site } from '@/src/content/site.mjs';
import molecules from '@/src/UI/assets/molecules.jpg';
import backend from '@/src/UI/assets/backend.jpg';
import frontend from '@/src/UI/assets/frontend.jpg';
import studio from '@/src/UI/assets/music_studio.jpg';
import drumset from '@/src/UI/assets/drumset.jpg';

const heroes = {
    '/software/architecture/': {image: molecules, credits: 'Photo by Ashraful Islam on Unsplash'},
    '/software/backend/': {image: backend, credits: 'Photo by Daria Nepriakhina on Unsplash'},
    '/software/frontend/': {image: frontend, credits: 'Photo by Kelly Sikkema on Unsplash'},
    '/sound/studio/': {image: studio, credits: 'Photo by Tima Miroshnichenko'},
    '/sound/soundtracks/': {image: drumset, credits: 'Photo by ASBA DRUMS'},
};

export default function SitePage({path, title, cards, sections, messages, navigation}: SitePageProps) {
    if (path === '/' || path === '/sound/') return <>
        <Typography variant="h1">{title}</Typography>
        <RootCardOrganism version={path === '/' ? 'software' : 'sound'} cards={cards}/>
        <section className="contact-cta"><h2>{messages.talk}</h2><AppLinkAtom href="/contact/">{messages.contact}</AppLinkAtom></section>
    </>;
    if (path === '/contact/') return <Container>
        <Typography variant="h1">{title}</Typography><p className="page-intro">{messages.contactIntro}</p>
        <p>{messages.directEmail} <a href={`mailto:${site.email}`}>{site.email}</a></p>
        <ContactFormOrganism/>
    </Container>;
    if (path === '/sitemap/') return <Container>
        <Typography variant="h1">{title}</Typography>
        <ul className="sitemap-list">{navigation.map(link => <li key={link.path}><AppLinkAtom href={link.path}>{link.title}</AppLinkAtom></li>)}</ul>
    </Container>;
    const hero = heroes[path as keyof typeof heroes];
    const prefix = path.startsWith('/sound/') ? '/sound/' : '/software/';
    const links = navigation.filter(link => link.path.startsWith(prefix) && link.path !== path);
    return <ArticleComposition title={title} links={links}>
        {hero && <HeroMolecule {...hero} alt={title}/>}
        {sections.map(section => <ContentBlockOrganism key={section.title} title={section.title} subtitle={section.subtitle}
            body={<>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</>}/>) }
    </ArticleComposition>;
}
