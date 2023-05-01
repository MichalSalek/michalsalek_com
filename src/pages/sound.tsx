import { CardOrganism } from '@/src/core/layout/components/Card.organism'
import Container        from '@mui/material/Container'




export default function Page() {
    return <Container>

        <CardOrganism version={'sound'}/>

    </Container>
}




export async function getStaticProps() {
    return {
        props: {} // will be passed to the page component as props
    }
}