import { GeneralPageProps }     from '@/src/pages/_app'
import { RootCardOrganismLazy } from '@/src/UI/components/_lazyComponents.aggregate'




const PAGE_TITLE = 'Software services'

export default function Page() {
    return <RootCardOrganismLazy version={'software'}/>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}