import { Typography }                  from '@mui/material'
import Image, { StaticImageData }      from 'next/image'
import { CSSProperties, ReactElement } from 'react'




type Props = {
    image: StaticImageData
    alt: string
    credits: string
    height?: number
    priority?: boolean
    fill?: boolean
    asCover?: boolean
    style?: CSSProperties
}


export const ImageAtom = ({
    image,
    alt,
    credits,
    height = undefined,
    priority = false,
    fill = false,
    asCover = false,
    style
}: Props): ReactElement => {

    return <figure>
        <Image
            src={image}
            alt={`Picture showing ${alt}`}
            height={height}
            priority={priority}
            fill={fill}
            style={{...style, objectFit: asCover ? 'cover' : 'initial'}}
        />
        <Typography
            variant={'caption'}
            style={{position: 'absolute', top: 5, right: 5}}
        >{credits}</Typography>
    </figure>
}