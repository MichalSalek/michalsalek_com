import { TextField } from '@mui/material'
import Container     from '@mui/material/Container'




export default function Page() {
    return <Container>

        <TextField variant="outlined" placeholder={'Contact form'}/>

    </Container>
}




export async function getStaticProps() {
    return {
        props: {} // will be passed to the page component as props
    }
}
