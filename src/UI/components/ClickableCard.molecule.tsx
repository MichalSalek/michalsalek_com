import { AppRoutes }               from '@/src/layers/core/routes.config'
import { AppLinkAtom }             from '@/src/UI/components/AppLink.atom'
import { ImageAtom }            from '@/src/UI/components/Image.atom'
import { appColors, appStyles } from '@/src/UI/styles/constants'
import { mainTheme }            from '@/src/UI/styles/theme'
import Typography              from '@mui/material/Typography'
import Card                        from '@mui/material/Card'
import CardActionArea              from '@mui/material/CardActionArea'
import CardContent                 from '@mui/material/CardContent'
import Stack                       from '@mui/material/Stack'
import { StaticImageData }         from 'next/image'
import { ReactElement, ReactNode } from 'react'
import ArrowRightIcon  from '@mui/icons-material/ArrowRight'



type Props = {
    image: StaticImageData
    alt: string
    credits: string
    title: string
    content: ReactNode
    linkPath: AppRoutes
    buttonContent?: string
    priorityLoad?: boolean
}


export const ClickableCardMolecule = ({image, alt, credits, title, content, linkPath, buttonContent = 'Read More', priorityLoad = true}: Props): ReactElement => {

    return <Card
        elevation={0}
        sx={{
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'space-between'
        }}
    >
        <AppLinkAtom
            href={linkPath}
            style={{textDecoration: 'none', height: '100%'}}
        >

            <CardActionArea
                sx={{
                    display:         'flex',
                    flexDirection:   'column',
                    backgroundColor: mainTheme.palette.primary.main,
                    p:               0,
                    height:          '100%',
                    minHeight:       '570px'
                }}
            >
                <ImageAtom
                    image={image}
                    alt={alt}
                    credits={credits}
                    priority={priorityLoad}
                    height={250}
                />
                <CardContent sx={{
                    height:        '100%',
                    display:       'flex',
                    flexDirection: 'column'
                }}>
                    <Stack columnGap={0} rowGap={0} justifyContent={'flex-start'} alignItems={'flex-start'} flexDirection={'column'}>

                        <Typography
                            variant="h3"
                            component="div"
                            color={appColors.white}
                            sx={{
                                minHeight: '4rem'
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            component={'span'}
                            variant="body2"
                            color={appColors.white}
                        >
                            <>{content}</>
                        </Typography>


                        <Stack
                            justifyContent={'flex-end'}
                            flex={1}
                            minHeight={'unset'}
                            alignItems={'flex-end'}
                            width={'100%'}
                        >
                            <Typography
                                sx={{
                                    display: 'flex',
                                    ...appStyles.cardBoxShadow
                                }}
                                variant={'button'}
                                color={appColors.white}
                                borderColor={appColors.white}>{buttonContent} <ArrowRightIcon/></Typography>
                        </Stack>

                    </Stack>
                </CardContent>

            </CardActionArea>

        </AppLinkAtom>


    </Card>
}
