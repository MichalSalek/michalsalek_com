import Typography              from '@mui/material/Typography'
import Container                   from '@mui/material/Container'
import { ReactElement, ReactNode } from 'react'




type Props = {
    children: ReactNode
    title: string
}

export const SubpageComposition = ({children, title}: Props): ReactElement => {
    return <Container>

        <Typography variant={'h1'}>{title}</Typography>

        {children}

    </Container>
}
