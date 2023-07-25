import { Typography }   from '@mui/material'
import Card             from '@mui/material/Card'
import CardContent      from '@mui/material/CardContent'
import { ReactElement } from 'react'




type Props = {
    title?: ReactElement | string | undefined
    subtitle?: ReactElement | string | undefined
    body?: ReactElement | string | undefined
}

export const ContentBlockOrganism = ({title, subtitle, body}: Props): ReactElement => {

    return <article>
        <Card elevation={0} sx={{minWidth: '100%'}}>

            <CardContent>
                <Typography variant={'h2'}>{title}</Typography>

                <Typography variant={'h3'}>{subtitle}</Typography>

                <Typography variant={'body1'}>{body}</Typography>

            </CardContent>

        </Card>
    </article>
}
