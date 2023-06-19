import { CardOrganism }     from '@/src/UI/components/Card.organism'
import { GeneralPageProps } from '@/src/pages/_app'
import Container            from '@mui/material/Container'




const PAGE_TITLE = 'Software services'

export default function Page() {
    return <Container>

        <CardOrganism version={'software'}/>

    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}