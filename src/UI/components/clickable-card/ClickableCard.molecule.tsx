import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom';
import { ImageAtom } from '@/src/UI/components/Image.atom';
import { useLocale } from '@/src/i18n/context';

type Props = {image: StaticImageData; alt: string | {en: string; pl: string}; credits: string; title: string; content: ReactNode; linkPath: string; priorityLoad?: boolean};
export const ClickableCardMolecule = ({image, alt, credits, title, content, linkPath, priorityLoad}: Props) => {
    const {messages} = useLocale();
    return <AppLinkAtom href={linkPath} className="service-card">
        <ImageAtom image={image} alt={alt} credits={credits} height={250} priority={priorityLoad}/>
        <div className="service-card-content"><h2>{title}</h2>{content}<span className="read-more">{messages.readMore} <span aria-hidden="true">→</span></span></div>
    </AppLinkAtom>;
};
