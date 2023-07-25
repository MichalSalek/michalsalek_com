import { GeneralPageProps } from '@/src/pages/_app'
import { RootCardOrganism } from '@/src/UI/components/RootCardOrganism'
import { Container }        from '@mui/material'




const PAGE_TITLE = 'Sound online services'

export default function Page() {
    return <Container>

        <RootCardOrganism version={'sound'}/>

    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
