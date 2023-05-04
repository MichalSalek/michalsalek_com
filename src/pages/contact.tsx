import { GeneralPageProps }      from '@/src/pages/_app'
import { TextField, Typography } from '@mui/material'
import Container                 from '@mui/material/Container'




const PAGE_TITLE = 'Contact with the office'

export default function Page() {
    return <Container>

        <Typography variant={'h1'}>{PAGE_TITLE}</Typography>

        <TextField variant="outlined" placeholder={'Contact form'}/>

    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
