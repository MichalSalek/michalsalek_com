import { lazy } from 'react'




export const InfoTextBlockMoleculeLazy =
    lazy(() => import('./InfoTextBlock.molecule'))

export const RootCardOrganismLazy =
    lazy(() => import('./RootCard.organism'))

export const ContentBlockOrganismLazy =
    lazy(() => import('./ContentBlock.organism'))

export const InternalLinkingMoleculeLazy =
    lazy(() => import('./InternalLinking.molecule'))
