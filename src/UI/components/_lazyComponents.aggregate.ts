import dynamic from 'next/dynamic'




export const InfoTextBlockMoleculeLazy =
    dynamic(() => import('./InfoTextBlock.molecule'), {
        ssr: false
    })

export const RootCardOrganismLazy =
    dynamic(() => import('./RootCard.organism'), {
        ssr: true
    })

export const ContentBlockOrganismLazy =
    dynamic(() => import('./ContentBlock.organism'), {
        ssr: true
    })

export const InternalLinkingMoleculeLazy =
    dynamic(() => import('./InternalLinking.molecule'), {
        ssr: false
    })
