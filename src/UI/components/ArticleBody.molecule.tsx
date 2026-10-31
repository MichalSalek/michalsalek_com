import {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import type {Section} from '@/src/content/load-page';
import {RichTextAtom} from './RichText.atom';
import {ServiceArtworkAtom} from './ServiceArtwork.atom';

export function ArticleBodyMolecule({section}: {section: Section}) {
    return <Typography component="div" variant="body1" className="article-copy">
        {section.paragraphs.map((text, index) => <Fragment key={text}>
            {section.media?.filter(item => item.after === index && item.variant === 'inline').map(item => <ServiceArtworkAtom key={item.asset.id} asset={item.asset} variant="inline"/>)}
            <p><RichTextAtom text={text}/></p>
            {section.media?.filter(item => item.after === index && item.variant === 'wide').map(item => <ServiceArtworkAtom key={item.asset.id} asset={item.asset} variant="wide"/>)}
        </Fragment>)}
    </Typography>;
}
