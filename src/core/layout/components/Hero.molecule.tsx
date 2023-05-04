import { ImageAtom }                from '@/src/core/layout/components/Image.atom'
import { appColors }                from '@/src/core/layout/styles/colors'
import { blue, deepPurple, indigo } from '@mui/material/colors'
import { StaticImageData }          from 'next/image'




type Props = {
    image: StaticImageData
    alt: string
    credits: string
}
export const HeroMolecule = ({image, alt, credits}: Props): JSX.Element => {


    return <header style={{
        position: 'relative',
        height: 'calc(20vw + 300px)',
        borderColor: indigo[900],

        borderTopStyle: 'dashed',
        borderBottomStyle: 'dashed',
        borderLeftStyle: 'solid',
        borderRightStyle: 'solid',

        borderTopWidth: 'calc(3vw + 30px)',
        borderBottomWidth: 'calc(3vw + 30px)',
        borderLeftWidth: 'calc(1vw + 5px)',
        borderRightWidth: 'calc(1vw + 5px)',
        borderLeftColor: indigo[400],
        borderRightColor: indigo[400]


    }}>
        <ImageAtom
            image={image}
            alt={alt}
            credits={credits}
            priority={true}
            fill={true}
            asCover={true}
            style={{
                borderWidth: '3px',
                borderColor: appColors.white,
                borderStyle: 'outset'

            }}
        />
    </header>
}
