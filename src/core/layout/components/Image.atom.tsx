import { Typography }             from '@mui/material'
import Image, { StaticImageData } from 'next/image'




type Props = {
    image: StaticImageData
    alt: string
    credits: string
    height?: number
    priority?: boolean
}


export const ImageAtom = ({image, alt, credits, height = 250, priority = false}: Props): JSX.Element => {

    return <figure>
        <Image
            src={image}
            alt={`Picture showing ${alt}`}
            height={height}
            priority={priority}
        />
        <Typography
            variant={'caption'}
            style={{position: 'absolute', top: 5, right: 5}}
        >{credits}</Typography>
    </figure>
}