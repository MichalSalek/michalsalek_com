import { Typography }                            from '@mui/material'
import Card                                      from '@mui/material/Card'
import CardContent                               from '@mui/material/CardContent'
import Stack                                     from '@mui/material/Stack'
import { CSSProperties, Fragment, ReactElement } from 'react'




export type InfoTextBlockMoleculeData = { heading?: string | ReactElement | undefined, content: string | ReactElement }[]

type Props = {
    data: InfoTextBlockMoleculeData
    largeRowGap?: boolean
}

export const InfoTextBlockMolecule = ({data, largeRowGap = false}: Props): ReactElement => {

    const flexCenter: CSSProperties = {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    }


    return <Stack alignItems={'flex-start'} rowGap={largeRowGap ? 15 : undefined}>

        {data.map((el, index) => <Fragment key={index}>


            <Card variant={'outlined'}
                  sx={{minHeight: '150px', ...flexCenter}}>
                <CardContent>
                    {el.heading && <Typography
                        variant={'h3'}
                        sx={{minHeight: '100px'}}
                    >{el.heading}</Typography>}
                    <Typography
                        variant={'body1'}
                        sx={typeof el.content !== 'string' ? {margin: 0, width: '100%'} : undefined}
                    >{el.content}</Typography>
                </CardContent>

            </Card>


        </ Fragment>)}


    </Stack>
}
