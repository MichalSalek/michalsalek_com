import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';

export default function ContentBlockOrganism({title, subtitle, body}: {title?: ReactNode; subtitle?: ReactNode; body?: ReactNode}) {
    return <section className="content-section">
        {title && <Typography variant="h2">{title}</Typography>}
        {subtitle && <Typography variant="h3" component="p">{subtitle}</Typography>}
        <div className="article-body">{body}</div>
    </section>;
}
