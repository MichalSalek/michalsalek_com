import StudioImage from '@/src/UI/assets/studio.jpg';
import { AppLinkAtom } from './AppLink.atom';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DrumsImage from '@/src/UI/assets/drums.jpg';
import { ClickableCardMolecule } from '@/src/UI/components/clickable-card/ClickableCard.molecule';
import Typography from '@mui/material/Typography';
import { RichTextAtom } from './RichText.atom';
import { CompanyNameAtom } from './CompanyName.atom';
import { useLocale } from '@/src/i18n/context';
import type { ServiceCard } from '@/src/content/load-page';
import { additionalServices } from '@/src/content/site.mjs';

const images = {
    '/sound/studio/': {image: StudioImage, alt: {en: 'Music studio', pl: 'Studio muzyczne'}, credits: 'Photo by Caught In Joy on Unsplash'},
    '/sound/soundtracks/': {image: DrumsImage, alt: {en: 'Drum kit', pl: 'Zestaw perkusyjny'}, credits: 'Photo by Josh Sorenson on Unsplash'},
};

export default function RootCardOrganism({version, cards, intro = []}: {intro?: string[]; version: 'software' | 'sound'; cards: ServiceCard[]}) {
    const {messages} = useLocale();
    const groups = version === 'software' ? [cards.filter(card => !additionalServices.includes(card.path)), cards.filter(card => additionalServices.includes(card.path))] : [cards];
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
        {groups.map((group, groupIndex) => <div className={`service-cards${groupIndex ? ' additional-services' : ''}`} key={groupIndex}>
        {group.map((card, index) => <ClickableCardMolecule key={card.path}
            {...images[card.path as keyof typeof images]} artwork={card.artwork} title={card.title}
            content={<>{card.paragraphs.map(text => <p key={text}><RichTextAtom text={text}/></p>)}</>}
            linkPath={card.path} priorityLoad={groupIndex === 0 && index === 0}/>) }
    </div>)}</section>;
}
