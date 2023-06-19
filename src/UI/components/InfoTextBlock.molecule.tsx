import { Typography }             from '@mui/material'
import Card                       from '@mui/material/Card'
import CardContent                from '@mui/material/CardContent'
import Stack                      from '@mui/material/Stack'
import { Fragment, ReactElement } from 'react'




type Props = {
    data: { heading: string | ReactElement, content: string | ReactElement }[]
}

export const InfoTextBlockMolecule = ({data}: Props): ReactElement => {


    return <Stack alignItems={'flex-start'}>

        {data.map((el, index) => <Fragment key={index}>


            <Card variant={'outlined'}>
                <CardContent>
                    <Typography variant={'h3'}>{el.heading}</Typography>
                    <Typography variant={'body1'}>{el.content}</Typography>
                </CardContent>

            </Card>


        </ Fragment>)}


    </Stack>
}
