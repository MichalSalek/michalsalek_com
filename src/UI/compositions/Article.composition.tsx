import { GoToContactFormMolecule }        from '@/src/UI/components/GoToContactForm.molecule'
import { Container, Divider }             from '@mui/material'
import Typography                         from '@mui/material/Typography'
import React, { ReactElement, ReactNode } from 'react'




type Props = {
    children: ReactNode
    title: string
}

export const ArticleComposition = ({children, title}: Props): ReactElement => {
    return <Container>

        <Typography variant={'h1'}>{title}</Typography>

        {children}

        <Divider/>

        <GoToContactFormMolecule objectOfInterest={title}/>

    </Container>
}
