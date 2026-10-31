import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import type { Section } from '@/src/content/load-page';
import { useLocale } from '@/src/i18n/context';
import { AppLinkAtom } from './AppLink.atom';
import { ArticleBodyMolecule } from './ArticleBody.molecule';
import { ArticleIntroMolecule } from './ArticleIntro.molecule';
import { ServiceArtworkAtom } from './ServiceArtwork.atom';
import type { VisualAsset } from '@/src/content/visuals.mjs';

export function EngineeringPageOrganism({title, intro, sections, artwork}: {title: string; intro?: string[]; sections: Section[]; artwork: VisualAsset | null}) {
    const {messages} = useLocale();
    return <Container>
        <Typography variant="h1">{title.split(/(full-stack)/i).map((part, index) => <span key={index} style={/^full-stack$/i.test(part) ? {whiteSpace: 'nowrap'} : undefined}>{part}</span>)}</Typography>
        <ArticleIntroMolecule intro={intro} title={title} contactLabel={messages.technicalContact}/>
        {artwork && <ServiceArtworkAtom asset={artwork} variant="hero" priority/>}
        <div className="technical-copy">
            {sections.map((section, index) => <section key={section.title} aria-labelledby={`technical-section-${index}`}>
                <Typography id={`technical-section-${index}`} variant="h2" sx={{mt: 5}}>{section.title}</Typography>
                <Typography component="p" variant="h3">{section.subtitle}</Typography>
                <ArticleBodyMolecule section={section}/>
                {section.facts && <table className="technical-stack" aria-labelledby={`technical-section-${index}`}>
                    <thead><tr><th scope="col">{messages.technicalScope}</th><th scope="col">{messages.technicalTechnologies}</th></tr></thead>
                    <tbody>{section.facts.map(fact => <tr key={fact.term}><th scope="row">{fact.term}</th><td>{fact.detail}</td></tr>)}</tbody>
                </table>}
            </section>)}
            <AppLinkAtom className="intro-contact-link" href={`/contact/?about=${encodeURIComponent(title)}`}>{messages.technicalContact}<ArrowRightIcon/></AppLinkAtom>
        </div>
    </Container>;
}
