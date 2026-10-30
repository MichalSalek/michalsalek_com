import Typography from '@mui/material/Typography';
import { InfoTextBlockMolecule } from './InfoTextBlock.molecule';
import { LinkButtonAtom } from './LinkButton.atom';
import { useLocale } from '@/src/i18n/context';

export const GoToContactFormMolecule = ({objectOfInterest}: {objectOfInterest?: string}) => {
    const {messages} = useLocale();
    return <section className="contact-cta">
        <Typography variant="h3">{messages.talk}</Typography>
        <Typography variant="body2" sx={{mb: 5}}>{messages.talkIntro}</Typography>
        <InfoTextBlockMolecule items={[
            {heading: messages.interested, content: <LinkButtonAtom href={`/contact/${objectOfInterest ? `?about=${encodeURIComponent(objectOfInterest)}` : ''}`}>{messages.ask}</LinkButtonAtom>},
            {heading: messages.generalHeading, content: <LinkButtonAtom href="/contact/">{messages.general}</LinkButtonAtom>},
        ]}/>
    </section>;
};
