import ExportedImage from 'next-image-export-optimizer';
import type { StaticImageData } from 'next/image';
import type { CSSProperties } from 'react';
import { useLocale } from '@/src/i18n/context';

type Props = {
    image: StaticImageData; alt: string | {en: string; pl: string}; credits: string;
    height?: number; priority?: boolean; fill?: boolean; asCover?: boolean; style?: CSSProperties;
};
export const ImageAtom = ({image, alt, credits, height, priority = false, fill = false, asCover = false, style}: Props) => {
    const {locale} = useLocale();
    return <figure className="service-image" style={fill ? {position: 'absolute', inset: 0} : {height: height ?? 'auto'}}>
        <ExportedImage src={image} alt={typeof alt === 'string' ? alt : alt[locale]}
            height={fill ? undefined : height} preload={priority} fetchPriority={priority ? 'high' : undefined} fill={fill}
            sizes={fill ? '(max-width: 599px) calc(100vw - 64px), (max-width: 1248px) calc(100vw - 96px), 1152px' : '(max-width: 699px) calc(100vw - 48px), (max-width: 1199px) calc(50vw - 36px), 564px'}
            style={{...style, objectFit: asCover || height ? 'cover' : 'contain', width: fill ? undefined : '100%', height: fill ? undefined : height}}/>
        <figcaption>{credits}</figcaption>
    </figure>;
};
