import { SubpageComposition } from '@/src/UI/compositions/Subpage.composition'
import { GeneralPageProps }   from '@/src/pages/_app'




const PAGE_TITLE = 'Frontend services'

export default function Page() {
    return <SubpageComposition title={PAGE_TITLE}>

        10

    </SubpageComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}