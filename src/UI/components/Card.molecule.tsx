import { AppRoutes }               from '@/src/layers/core/routes.config'
import { AppLinkAtom }             from '@/src/UI/components/_atoms/AppLink.atom'
import { ImageAtom }               from '@/src/UI/components/Image.atom'
import ArrowRightIcon              from '@mui/icons-material/ArrowRight'
import { Typography }              from '@mui/material'
import Button                      from '@mui/material/Button'
import Card                        from '@mui/material/Card'
import CardActionArea              from '@mui/material/CardActionArea'
import CardActions                 from '@mui/material/CardActions'
import CardContent                 from '@mui/material/CardContent'
import { StaticImageData }         from 'next/image'
import { ReactElement, ReactNode } from 'react'




type Props = {
    image: StaticImageData
    alt: string
    credits: string
    title: string
    content: ReactNode
    linkPath: AppRoutes
}


export const CardMolecule = ({image, alt, credits, title, content, linkPath}: Props): ReactElement => {

    return <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}
    >
        <AppLinkAtom
            href={linkPath}
            style={{textDecoration: 'none'}}
        >

            <CardActionArea
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <ImageAtom
                    image={image}
                    alt={alt}
                    credits={credits}
                    priority={true}
                    height={250}
                />
                <CardContent
                    sx={{
                        flex: 1
                    }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography component={'span'} variant="body2">
                        <>{content}</>
                    </Typography>
                </CardContent>
            </CardActionArea>

        </AppLinkAtom>


        <CardActions>

            <AppLinkAtom href={linkPath}>

                <Button size="small" color={'primary'} endIcon={<ArrowRightIcon scale={1}/>}>
                    <Typography variant={'button'}>More</Typography>
                </Button>

            </AppLinkAtom>

        </CardActions>


    </Card>
}
