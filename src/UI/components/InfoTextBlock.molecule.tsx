import { appColors } from '@/src/UI/styles/constants'
import { mainTheme } from '@/src/UI/styles/theme'
import Typography                                      from '@mui/material/Typography'
import Card                                            from '@mui/material/Card'
import CardContent                                     from '@mui/material/CardContent'
import Stack                                           from '@mui/material/Stack'
import { CSSProperties, Fragment, lazy, ReactElement } from 'react'




export type InfoTextBlockMoleculeData = { heading?: string | ReactElement | undefined, content: string | ReactElement }[]

type Props = {
    data: InfoTextBlockMoleculeData
    largeRowGap?: boolean
    variantDark?: boolean
}

const InfoTextBlockMolecule = ({data, largeRowGap = false, variantDark = false}: Props): ReactElement => {

    const flexCenter: CSSProperties = {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    }

    const variantDarkStyle: {cardStyle: CSSProperties, typographyStyle: CSSProperties} | undefined = variantDark ? {
        cardStyle: {
            backgroundColor: mainTheme.palette.primary.main,
            paddingTop: '1rem',
            paddingBottom: '0.5rem'
        },
        typographyStyle: {
            color: appColors.white
        }
    } : undefined

    return <Stack alignItems={'flex-start'} rowGap={largeRowGap ? 15 : undefined}>

        {data.map((el, index) => {

            const addonContentStyle: CSSProperties | undefined = typeof el.content !== 'string' ? {margin: 0, width: '100%'} : undefined

            return <Fragment key={index}>


                <Card variant={'outlined'}
                      sx={{...flexCenter, ...variantDarkStyle?.cardStyle, minHeight: '150px'}}>
                    <CardContent>
                        {el.heading && <Typography
                            variant={'h3'}
                            sx={{minHeight: '80px', ...variantDarkStyle?.typographyStyle}}
                        >{el.heading}</Typography>}
                        <Typography
                            variant={'body1'}
                            sx={{...addonContentStyle, ...variantDarkStyle?.typographyStyle}}
                        >{el.content}</Typography>
                    </CardContent>

                </Card>


            </ Fragment>
        })}


    </Stack>
}

export default InfoTextBlockMolecule
