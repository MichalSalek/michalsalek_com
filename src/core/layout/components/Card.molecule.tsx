import { ImageAtom }       from '@/src/core/layout/components/Image.atom'
import { AppRoutes }       from '@/src/core/routes.config'
import ArrowRightIcon      from '@mui/icons-material/ArrowRight'
import { Typography }      from '@mui/material'
import Button              from '@mui/material/Button'
import Card                from '@mui/material/Card'
import CardActionArea      from '@mui/material/CardActionArea'
import CardActions         from '@mui/material/CardActions'
import CardContent         from '@mui/material/CardContent'
import { StaticImageData } from 'next/image'
import Link                from 'next/link'
import { ReactNode }       from 'react'




type Props = {
    image: StaticImageData
    alt: string
    credits: string
    title: string
    content: ReactNode
    linkPath: AppRoutes
}


export const CardMolecule = ({image, alt, credits, title, content, linkPath}: Props): JSX.Element => {

    return <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}
    >
        <Link
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

        </Link>


        <CardActions>

            <Link href={linkPath}>

                <Button size="small" color={'primary'} endIcon={<ArrowRightIcon scale={1}/>}>
                    <Typography variant={'button'}>More</Typography>
                </Button>

            </Link>

        </CardActions>


    </Card>
}
