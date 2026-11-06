import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import RootCardOrganism from '@/src/UI/components/RootCard.organism';
import ContentBlockOrganism from '@/src/UI/components/ContentBlock.organism';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import type { SitePageProps } from '@/src/content/load-page';
import { RichTextAtom } from './RichText.atom';
import {ContactSection} from './ContactSection.organism';
import {PortfolioIndexPage, PortfolioShowcase} from './portfolio/Portfolio.organism';
import {EditorialArticle} from './editorial/EditorialArticle.organism';

export default function SitePage({path, title, cards, artwork, sections, messages, navigation, intro, portfolioCards, editorial}: SitePageProps) {
    if (editorial) return <EditorialArticle document={editorial} title={title} artwork={artwork}/>;
    if (path === '/portfolio/') return <PortfolioIndexPage cards={portfolioCards}/>;
    if (path === '/' || path === '/sound/') return <>
        <RootCardOrganism version={path === '/' ? 'software' : 'sound'} cards={cards} intro={intro}/>
        {path === '/' && <PortfolioShowcase cards={portfolioCards}/>}
        {sections.length > 0 && <Container>{sections.map(section => <ContentBlockOrganism key={section.title} title={section.title} subtitle={section.subtitle} body={<>{section.paragraphs.map(text => <p key={text}><RichTextAtom text={text}/></p>)}</>}/>)}</Container>}
        {path === '/' && <Container><ContentBlockOrganism title={messages.startTitle} body={<dl className="enquiry-answers">{messages.startQuestions.map(item => <div key={item.question}><dt>{item.question}</dt><dd>{item.answer}</dd></div>)}</dl>}/></Container>}
        <Container><ContactSection/></Container>
    </>;
    if (path === '/contact/') return <Container>
        <ContactSection variant="full" title={title}/>
    </Container>;
    if (path === '/sitemap/') return <Container>
        <Typography variant="h1">{title}</Typography>
        <ul className="sitemap-list">{navigation.map(link => <li key={link.path}><AppLinkAtom href={link.path}>{link.title}</AppLinkAtom></li>)}</ul>
    </Container>;
    throw new Error(`No page composition registered: ${path}`);
}
