import FrontImage from '@/src/UI/assets/front.jpg';
import PlanningImage from '@/src/UI/assets/planning.jpg';
import BackImage from '@/src/UI/assets/back.jpg';
import StudioImage from '@/src/UI/assets/studio.jpg';
import DrumsImage from '@/src/UI/assets/drums.jpg';
import { ClickableCardMolecule } from '@/src/UI/components/clickable-card/ClickableCard.molecule';
import type { ServiceCard } from '@/src/content/load-page';

const images = [
    {image: FrontImage, alt: {en: 'Planning a user interface', pl: 'Planowanie interfejsu użytkownika'}, credits: 'Photo by John Schnobrich on Unsplash'},
    {image: PlanningImage, alt: {en: 'Planning a software project', pl: 'Planowanie projektu oprogramowania'}, credits: 'Image by pressfoto on Freepik'},
    {image: BackImage, alt: {en: 'Software development', pl: 'Tworzenie oprogramowania'}, credits: 'Image by frimufilms on Freepik'},
    {image: StudioImage, alt: {en: 'Music studio', pl: 'Studio muzyczne'}, credits: 'Photo by Caught In Joy on Unsplash'},
    {image: DrumsImage, alt: {en: 'Drum kit', pl: 'Zestaw perkusyjny'}, credits: 'Photo by Josh Sorenson on Unsplash'},
];

export default function RootCardOrganism({version, cards}: {version: 'software' | 'sound'; cards: ServiceCard[]}) {
    return <div className="service-cards">
        {cards.map((card, index) => <ClickableCardMolecule key={card.path}
            {...images[index + (version === 'sound' ? 3 : 0)]} title={card.title}
            content={<>{card.paragraphs.map(text => <p key={text}>{text}</p>)}</>}
            linkPath={card.path} priorityLoad={index === 0}/>) }
    </div>;
}
