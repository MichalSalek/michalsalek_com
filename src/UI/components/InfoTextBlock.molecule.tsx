import { Typography }             from '@mui/material'
import Card                       from '@mui/material/Card'
import CardContent                from '@mui/material/CardContent'
import Stack                      from '@mui/material/Stack'
import { Fragment, ReactElement } from 'react'



export type InfoTextBlockMoleculeData = { heading?: string | ReactElement | undefined, content: string | ReactElement }[]

type Props = {
    data: InfoTextBlockMoleculeData
}

export const InfoTextBlockMolecule = ({data}: Props): ReactElement => {


    return <Stack alignItems={'flex-start'} my={10}>

        {data.map((el, index) => <Fragment key={index}>


            <Card variant={'outlined'}>
                <CardContent>
                    {el.heading && <Typography
                        variant={'h3'}
                        sx={{minHeight: '100px'}}
                    >{el.heading}</Typography>}
                    <Typography
                        variant={'body1'}
                        sx={typeof el.content !== 'string' ? {textAlign: 'center', margin: 0} : undefined}
                    >{el.content}</Typography>
                </CardContent>

            </Card>


        </ Fragment>)}


    </Stack>
}
