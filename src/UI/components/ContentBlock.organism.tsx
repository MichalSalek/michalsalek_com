import { Typography }   from '@mui/material'
import Card             from '@mui/material/Card'
import CardContent      from '@mui/material/CardContent'
import { ReactElement } from 'react'




type Props = {
    title?: ReactElement | string | undefined
    subtitle?: ReactElement | string | undefined
    body?: ReactElement | string | undefined
}

const ContentBlockOrganism = ({title, subtitle, body}: Props): ReactElement => {

    return <article>
        <Card elevation={0} sx={{minWidth: '100%'}}>

            <CardContent sx={{px: 0}}>
                <Typography variant={'h2'}>{title}</Typography>

                <Typography variant={'h3'}>{subtitle}</Typography>

                <Typography variant={'body1'} sx={{textIndent: '3rem'}}>{body}</Typography>

            </CardContent>

        </Card>
    </article>
}

export default ContentBlockOrganism