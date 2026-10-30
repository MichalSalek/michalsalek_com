import type { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { PagePath } from '@/src/content/site.mjs';
import { useLocale } from '@/src/i18n/context';
import { InfoTextBlockMolecule } from '@/src/UI/components/InfoTextBlock.molecule';
import { LinkButtonAtom } from '@/src/UI/components/LinkButton.atom';
import { GoToContactFormMolecule } from '@/src/UI/components/GoToContactForm.molecule';

export const ArticleComposition = ({children, title, links}: {children: ReactNode; title: string; links: {path: PagePath; title: string}[]}) => {
    const {messages} = useLocale();
    return <Container>
        <Typography variant="h1">{title}</Typography>
        {children}
        <Divider/>
        <aside className="related-services"><Typography variant="h3" sx={{mb: 5}}>{messages.relatedIntro}</Typography>
            <InfoTextBlockMolecule items={links.map(link => ({heading: link.title, content: <LinkButtonAtom href={link.path}>{messages.readMore}</LinkButtonAtom>}))}/>
        </aside>
        <Divider/>
        <GoToContactFormMolecule objectOfInterest={title}/>
    </Container>;
};
