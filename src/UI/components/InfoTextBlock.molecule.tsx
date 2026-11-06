import type { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styles from './infoTextBlock.module.scss';

export const InfoTextBlockMolecule = ({items}: {items: {heading: ReactNode; content: ReactNode}[]}) =>
    <Stack data-info-panels sx={{alignItems: 'stretch'}}>{items.map((item, index) =>
        <Card key={index} data-info-panel className={styles.panel} variant="outlined" sx={{bgcolor: 'primary.main', pt: '1rem', pb: '.5rem', minHeight: 150, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CardContent sx={{width: '100%'}}>
                <Typography variant="h3" className={styles.heading} sx={{minHeight: 80}}>{item.heading}</Typography>
                <div>{item.content}</div>
            </CardContent>
        </Card>)}</Stack>;
