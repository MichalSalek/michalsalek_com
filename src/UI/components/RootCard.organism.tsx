import FrontImage from '@/src/UI/assets/front.jpg';
import PlanningImage from '@/src/UI/assets/planning.jpg';
import BackImage from '@/src/UI/assets/back.jpg';
import StudioImage from '@/src/UI/assets/studio.jpg';
import DrumsImage from '@/src/UI/assets/drums.jpg';
import { ClickableCardMolecule } from '@/src/UI/components/clickable-card/ClickableCard.molecule';
import Typography from '@mui/material/Typography';
import { RichTextAtom } from './RichText.atom';
import { CompanyNameAtom } from './CompanyName.atom';
import { useLocale } from '@/src/i18n/context';
import type { ServiceCard } from '@/src/content/load-page';

const images = [
    {image: FrontImage, alt: {en: 'Planning a user interface', pl: 'Planowanie interfejsu użytkownika'}, credits: 'Photo by John Schnobrich on Unsplash'},
    {image: PlanningImage, alt: {en: 'Planning a software project', pl: 'Planowanie projektu oprogramowania'}, credits: 'Image by pressfoto on Freepik'},
    {image: BackImage, alt: {en: 'Software development', pl: 'Tworzenie oprogramowania'}, credits: 'Image by frimufilms on Freepik'},
    {image: StudioImage, alt: {en: 'Music studio', pl: 'Studio muzyczne'}, credits: 'Photo by Caught In Joy on Unsplash'},
    {image: DrumsImage, alt: {en: 'Drum kit', pl: 'Zestaw perkusyjny'}, credits: 'Photo by Josh Sorenson on Unsplash'},
];

export default function RootCardOrganism({version, cards, intro = []}: {intro?: string[]; version: 'software' | 'sound'; cards: ServiceCard[]}) {
    const {messages} = useLocale();
    return <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h2" component="h1" sx={{width: '100%', maxWidth: 390, display: 'flex', flexDirection: 'column', rowGap: 2, padding: '2rem 0'}}>
            <CompanyNameAtom fullName style={{textAlign: 'left'}}/><span style={{textAlign: 'right'}}>{version === 'software' ? messages.softwareCategory : messages.soundCategory}</span>
        </Typography>
        {intro.length > 0 && <div className="home-intro">{intro.map(text => <Typography variant="body1" component="p" key={text}><RichTextAtom text={text}/></Typography>)}</div>}
        <div className="service-cards">
        {cards.map((card, index) => <ClickableCardMolecule key={card.path}
            {...images[index + (version === 'sound' ? 3 : 0)]} title={card.title}
            content={<>{card.paragraphs.map(text => <p key={text}><RichTextAtom text={text}/></p>)}</>}
            linkPath={card.path} priorityLoad={index === 0}/>) }
    </div></section>;
}
