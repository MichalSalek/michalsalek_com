import { ImageAtom }                from '@/core/layout/components/Image.atom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Typography }               from '@mui/material'
import Button                       from '@mui/material/Button'
import Card                         from '@mui/material/Card'
import CardActionArea               from '@mui/material/CardActionArea'
import CardActions                  from '@mui/material/CardActions'
import CardContent                  from '@mui/material/CardContent'
import { StaticImageData }          from 'next/image'
import { ReactNode }                from 'react'




type Props = {
    image: StaticImageData
    alt: string
    credits: string
    title: string
    content: ReactNode
}


export const CardMolecule = ({image, alt, credits, title, content}: Props): JSX.Element => {

    return <Card sx={{maxWidth: 310}}>
        <CardActionArea>
            <ImageAtom
                image={image}
                alt={alt}
                credits={credits}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography component={'span'} variant="body2">
                    <>{content}</>
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" endIcon={<ArrowRightIcon scale={1}/>}>
               <Typography variant={'button'}>More</Typography>
            </Button>
        </CardActions>
    </Card>
}