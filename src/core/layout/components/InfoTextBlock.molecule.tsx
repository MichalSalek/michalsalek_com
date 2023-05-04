import { Typography } from '@mui/material'
import Card           from '@mui/material/Card'
import CardContent    from '@mui/material/CardContent'
import Stack          from '@mui/material/Stack'
import { Fragment }   from 'react'




type Props = {
    data: { heading: string | JSX.Element, content: string | JSX.Element }[]
}

export const InfoTextBlockMolecule = ({data}: Props): JSX.Element => {


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
