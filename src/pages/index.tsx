import { CardOrganism }          from '@/src/core/layout/components/Card.organism'
import { CompanyNameAtom }       from '@/src/core/layout/components/CompanyName.atom'
import { InfoTextBlockMolecule } from '@/src/core/layout/components/InfoTextBlock.molecule'
import { GeneralPageProps }      from '@/src/pages/_app'
import { Typography }            from '@mui/material'
import Box                       from '@mui/material/Box'
import Container                 from '@mui/material/Container'




const PAGE_TITLE = 'Be a Pro, with a modern online services'

export default function Page() {
    return <Container>

        <Typography variant={'h1'}>{PAGE_TITLE}</Typography>

        <CardOrganism version={'software'}/>

        <CardOrganism version={'sound'}/>

        <Box paddingY={5}/>

        <InfoTextBlockMolecule data={[
            {
                heading: <>What is the <CompanyNameAtom fullName={true}/>?</>,
                content: 'Explanation'
            },
            {
                heading: <>What kind of services the <CompanyNameAtom fullName={true}/> provide?</>,
                content: 'Explanation'
            },
            {
                heading: <>What does <CompanyNameAtom fullName={true}/> specialize in?</>,
                content: 'Explanation'
            }
        ]}/>

    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
