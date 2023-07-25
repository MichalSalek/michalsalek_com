import { ImageAtom }       from '@/src/UI/components/Image.atom'
import { StaticImageData } from 'next/image'
import { ReactElement }    from 'react'




type Props = {
    image: StaticImageData
    alt: string
    credits: string
}
export const HeroMolecule = ({image, alt, credits}: Props): ReactElement => {


    return <section style={{
        position: 'relative',
        height: 'calc(20vw + 300px)'
    }}>
        <ImageAtom
            image={image}
            alt={alt}
            credits={credits}
            priority={true}
            fill={true}
            asCover={true}
        />
    </section>
}
