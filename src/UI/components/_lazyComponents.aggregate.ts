import dynamic from 'next/dynamic'




export const InfoTextBlockMoleculeLazy =
    dynamic(() => import('./InfoTextBlock.molecule'), {
        ssr: false
    })

export const RootCardOrganismLazy =
    dynamic(() => import('./RootCard.organism'), {
        ssr: false
    })

export const ContentBlockOrganismLazy =
    dynamic(() => import('./ContentBlock.organism'), {
        ssr: false
    })

export const InternalLinkingMoleculeLazy =
    dynamic(() => import('./InternalLinking.molecule'), {
        ssr: false
    })
