import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function ContentBlockOrganism({title, subtitle, body}: {title?: ReactNode; subtitle?: ReactNode; body?: ReactNode}) {
    return <section className="content-section">
        <Card elevation={0} sx={{minWidth: '100%', background: 'transparent'}}>
            <CardContent sx={{px: 0}}>
                {title && <Typography variant="h2">{title}</Typography>}
                {subtitle && <Typography variant="h3" component="p">{subtitle}</Typography>}
                <Typography component="div" variant="body1" className="article-body">{body}</Typography>
            </CardContent>
        </Card>
    </section>;
}
