import { GeneralPageProps } from '@/src/pages/_app'
import RootCardOrganism     from '@/src/UI/components/RootCard.organism'
import { Container }        from '@mui/material'




const PAGE_TITLE = 'Software services'

export default function Page() {
    return <Container>

        <RootCardOrganism version={'software'}/>

    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}