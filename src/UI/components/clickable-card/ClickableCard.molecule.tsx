import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from 'next/link';
import { pageHref } from '@/src/content/site.mjs';
import { ImageAtom } from '@/src/UI/components/Image.atom';
import { appStyles } from '@/src/UI/styles/constants';
import { useLocale } from '@/src/i18n/context';
import scss from './clickableCard.module.scss';

type Props = {image: StaticImageData; alt: string | {en: string; pl: string}; credits: string; title: string; content: ReactNode; linkPath: string; priorityLoad?: boolean};
export const ClickableCardMolecule = ({image, alt, credits, title, content, linkPath, priorityLoad}: Props) => {
    const {messages, locale} = useLocale();
    return <Card elevation={0} sx={{display: 'flex', flexDirection: 'column'}}>
            <CardActionArea component={Link} href={pageHref(locale, linkPath)} className={`${scss.link} service-card`} sx={{display: 'flex', flexDirection: 'column', bgcolor: 'primary.main', p: 0, flex: 1, height: '100%', minHeight: 570}}>
                <ImageAtom image={image} alt={alt} credits={credits} height={250} priority={priorityLoad}/>
                <CardContent sx={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h3" component="h2" sx={{color: 'white', minHeight: '4rem'}}>{title}</Typography>
                    <Typography component="div" variant="body2" sx={{color: 'white'}}>{content}</Typography>
                    <div className="read-more-wrap"><Typography component="span" className="read-more" variant="button" sx={{color: 'white', display: 'inline-flex', borderColor: 'white', ...appStyles.cardBoxShadow}}>{messages.readMore}<ArrowRightIcon/></Typography></div>
                </CardContent>
            </CardActionArea>
    </Card>;
};
