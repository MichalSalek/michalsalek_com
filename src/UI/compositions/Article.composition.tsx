import { InternalLinkingMoleculeLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import { GoToContactFormMolecule }     from '@/src/UI/components/GoToContactForm.molecule'
import { InternalLinkingMoleculeProps }   from '@/src/UI/components/InternalLinking.molecule'
import Container             from '@mui/material/Container'
import Divider             from '@mui/material/Divider'
import Typography                         from '@mui/material/Typography'
import  { ReactElement, ReactNode } from 'react'




type Props = {
    children: ReactNode
    title: string
    internalLinksToShow?: InternalLinkingMoleculeProps['itemsToShow']
}

export const ArticleComposition = ({children, title, internalLinksToShow}: Props): ReactElement => {
    return <Container>

        <Typography variant={'h1'}>{title}</Typography>

        {children}

        <Divider/>

        <InternalLinkingMoleculeLazy
            itemsToShow={internalLinksToShow}
        />

        <Divider/>

        <GoToContactFormMolecule objectOfInterest={title}/>

    </Container>
}
