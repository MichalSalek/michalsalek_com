import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {AppLinkAtom} from './AppLink.atom';
import {RichTextAtom} from './RichText.atom';

export function ArticleIntroMolecule({intro, title, contactLabel}: {intro?: string[]; title: string; contactLabel: string}) {
    return <div className="service-intro">
        {intro?.map(text => <Typography component="p" variant="body1" sx={{mt: 0}} key={text}><RichTextAtom text={text}/></Typography>)}
        <AppLinkAtom className="intro-contact-link" href={`/contact/?about=${encodeURIComponent(title)}`}>{contactLabel}<ArrowRightIcon/></AppLinkAtom>
    </div>;
}
