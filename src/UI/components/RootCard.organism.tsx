import FrontImage from '@/src/UI/assets/front.jpg';
import PlanningImage from '@/src/UI/assets/planning.jpg';
import BackImage from '@/src/UI/assets/back.jpg';
import StudioImage from '@/src/UI/assets/studio.jpg';
import BackendImage from '@/src/UI/assets/backend.jpg';
import FrontendImage from '@/src/UI/assets/frontend.jpg';
import { AppLinkAtom } from './AppLink.atom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DrumsImage from '@/src/UI/assets/drums.jpg';
import { ClickableCardMolecule } from '@/src/UI/components/clickable-card/ClickableCard.molecule';
import Typography from '@mui/material/Typography';
import { RichTextAtom } from './RichText.atom';
import { CompanyNameAtom } from './CompanyName.atom';
import { useLocale } from '@/src/i18n/context';
import type { ServiceCard } from '@/src/content/load-page';

const images = {
    '/software/ai-automation/': {image: BackendImage, alt: {en: 'Code for data processing', pl: 'Kod do przetwarzania danych'}, credits: 'Photo by Daria Nepriakhina on Unsplash'},
    '/software/automation/': {image: PlanningImage, alt: {en: 'Planning a business process', pl: 'Planowanie procesu w firmie'}, credits: 'Image by pressfoto on Freepik'},
    '/software/integrations/': {image: BackImage, alt: {en: 'Software integration work', pl: 'Praca nad integracją oprogramowania'}, credits: 'Image by frimufilms on Freepik'},
    '/software/websites/': {image: FrontImage, alt: {en: 'Working on a website', pl: 'Praca nad stroną internetową'}, credits: 'Photo by John Schnobrich on Unsplash'},
    '/software/custom-software/': {image: FrontendImage, alt: {en: 'Planning an application interface', pl: 'Planowanie interfejsu aplikacji'}, credits: 'Photo by Kelly Sikkema on Unsplash'},
    '/software/reporting/': {image: PlanningImage, alt: {en: 'Organising business information', pl: 'Porządkowanie informacji w firmie'}, credits: 'Image by pressfoto on Freepik'},
    '/sound/studio/': {image: StudioImage, alt: {en: 'Music studio', pl: 'Studio muzyczne'}, credits: 'Photo by Caught In Joy on Unsplash'},
    '/sound/soundtracks/': {image: DrumsImage, alt: {en: 'Drum kit', pl: 'Zestaw perkusyjny'}, credits: 'Photo by Josh Sorenson on Unsplash'},
};

export default function RootCardOrganism({version, cards, intro = []}: {intro?: string[]; version: 'software' | 'sound'; cards: ServiceCard[]}) {
    const {messages} = useLocale();
    return <section style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h2" component="h1" sx={{width: '100%', maxWidth: 390, display: 'flex', flexDirection: 'column', rowGap: 2, padding: '2rem 0'}}>
            <CompanyNameAtom fullName style={{textAlign: 'left'}}/>{' '}<span style={{textAlign: 'right'}}>{version === 'software' ? messages.softwareCategory : messages.soundCategory}</span>
        </Typography>
        {intro.length > 0 && <section className="home-intro" aria-labelledby="home-intro-title">
            <Typography id="home-intro-title" variant="h2" sx={{m: 0}}>{messages.introTitle}</Typography>
            <div className="home-intro-copy">
                {intro.map(text => <Typography variant="body1" component="p" sx={{mt: 0}} key={text}><RichTextAtom text={text}/></Typography>)}
                <AppLinkAtom className="intro-contact-link" href={`/contact/?about=${encodeURIComponent(messages.softwareCategory)}`}>{messages.introContact}<ArrowRightIcon/></AppLinkAtom>
            </div>
        </section>}
        <div className="service-cards">
        {cards.map((card, index) => <ClickableCardMolecule key={card.path}
            {...images[card.path as keyof typeof images]} title={card.title}
            content={<>{card.paragraphs.map(text => <p key={text}><RichTextAtom text={text}/></p>)}</>}
            linkPath={card.path} priorityLoad={index === 0}/>) }
    </div></section>;
}
