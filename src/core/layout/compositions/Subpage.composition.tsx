import { Typography } from '@mui/material'
import Container      from '@mui/material/Container'
import { ReactNode }  from 'react'




type Props = {
    children: ReactNode
    title: string
}

export const SubpageComposition = ({children, title}: Props): JSX.Element => {
    return <Container>

        <Typography variant={'h1'}>{title}</Typography>

        {children}

    </Container>
}
