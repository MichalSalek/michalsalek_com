import StudioImage from '@/assets/library/photos/audio-studio.jpg';
import { ContactIntentLink } from './ContactIntentLink.molecule';
import styles from './deliverySteps.module.scss';
import DrumsImage from '@/assets/library/photos/audio-soundtracks.jpg';
import { ClickableCardMolecule } from '@/src/UI/components/clickable-card/ClickableCard.molecule';
import Typography from '@mui/material/Typography';
import { RichTextAtom } from './RichText.atom';
import { CompanyNameAtom } from './CompanyName.atom';
import { useLocale } from '@/src/i18n/context';
import type { ServiceCard } from '@/src/content/load-page';
import { additionalServices } from '@/src/content/site.mjs';
import { AppLinkAtom } from './AppLink.atom';
import type { ReactNode } from 'react';

const images = {
    '/sound/studio/': {image: StudioImage, alt: {en: 'Music studio', pl: 'Studio muzyczne'}, credits: 'Photo by Caught In Joy on Unsplash'},
    '/sound/soundtracks/': {image: DrumsImage, alt: {en: 'Drum kit', pl: 'Zestaw perkusyjny'}, credits: 'Photo by ASBA DRUMS'},
};

export default function RootCardOrganism({version, cards, intro = [], afterIntro}: {intro?: string[]; version: 'software' | 'sound'; cards: ServiceCard[]; afterIntro?: ReactNode}) {
    const {messages} = useLocale();
    const groups = version === 'software' ? [cards.filter(card => !additionalServices.includes(card.path)), cards.filter(card => additionalServices.includes(card.path))] : [cards];
    return <div className="services-overview">
        {intro.length > 0 ? <section className="home-intro" aria-labelledby="home-intro-title">
            <Typography id="home-intro-title" variant="h1" component="h1">{messages.heroTitle}</Typography>
            <div className="home-intro-copy">
                {intro.map(text => <Typography variant="body1" component="p" sx={{mt: 0}} key={text}><RichTextAtom text={text}/></Typography>)}
                <div className="home-actions">
                    <AppLinkAtom href="/portfolio/" className="hero-portfolio-link">{messages.heroPortfolio}<span aria-hidden="true">→</span></AppLinkAtom>
                    <ContactIntentLink placement="home">{messages.talk}</ContactIntentLink>
                </div>
            </div>
        </section> : <div className="sound-intro"><Typography variant="h1" component="h1">{messages.sound}</Typography><p><CompanyNameAtom fullName/></p></div>}
        {afterIntro}
        {version === 'software' && <div className="services-heading"><Typography variant="h2" component="h2">{messages.servicesTitle}</Typography><p>{messages.servicesIntro}</p></div>}
        {groups.map((group, groupIndex) => <div className={`service-cards${version === 'software' ? ' software-services' : ''}${groupIndex ? ' additional-services' : ''}`} key={groupIndex}>
        {group.map((card, index) => <ClickableCardMolecule key={card.path}
            {...images[card.path as keyof typeof images]} artwork={card.artwork} title={card.title}
            content={<>{card.paragraphs.map(text => <p key={text}><RichTextAtom text={text}/></p>)}</>}
            linkPath={card.path} priorityLoad={groupIndex === 0 && index === 0}/>) }
    </div>)}
        {intro.length > 0 && <section className="home-process" aria-labelledby="home-process-title">
            <Typography id="home-process-title" variant="h2" component="h2">{messages.introTitle}</Typography>
            <ol className={styles.steps}>{messages.deliverySteps.map(step => <li key={step.title}><strong>{step.title}</strong><span>{step.description}</span></li>)}</ol>
        </section>}
    </div>;
}
