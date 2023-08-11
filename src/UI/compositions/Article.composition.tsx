import { Container }               from '@mui/material'
import Typography                  from '@mui/material/Typography'
import { ReactElement, ReactNode } from 'react'




type Props = {
    children: ReactNode
    title: string
}

export const ArticleComposition = ({children, title}: Props): ReactElement => {
    return <Container>

        <Typography variant={'h1'}>{title}</Typography>

        {children}

    </Container>
}
