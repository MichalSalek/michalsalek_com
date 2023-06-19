import { SubpageComposition } from '@/src/UI/compositions/Subpage.composition'
import { GeneralPageProps }   from '@/src/pages/_app'
import { Typography }         from '@mui/material'




const PAGE_TITLE = 'Online studio services'

export default function Page() {
    return <SubpageComposition title={PAGE_TITLE}>

        <Typography variant={'body1'}>body</Typography>
    </SubpageComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}