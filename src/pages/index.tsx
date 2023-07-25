import { GeneralPageProps }      from '@/src/pages/_app'
import { CardOrganism }          from '@/src/UI/components/Card.organism'
import { CompanyNameAtom }       from '@/src/UI/components/CompanyName.atom'
import { InfoTextBlockMolecule } from '@/src/UI/components/InfoTextBlock.molecule'
import { Container, Typography } from '@mui/material'
import Box                       from '@mui/material/Box'




const PAGE_TITLE = 'A quality value you can get and give.'

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
