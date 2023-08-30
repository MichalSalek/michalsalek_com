import { GeneralPageProps }     from '@/src/pages/_app'
import { RootCardOrganismLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import Container            from '@mui/material/Container'




const PAGE_TITLE = 'Sound online services'

export default function Page() {
    return <RootCardOrganismLazy version={'sound'}/>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
