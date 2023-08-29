import { GeneralPageProps }                                  from '@/src/pages/_app'
import { ContactFormOrganismLazy, ContentBlockOrganismLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import Container                                             from '@mui/material/Container'
import Typography                                            from '@mui/material/Typography'
import React                                                 from 'react'




const PAGE_TITLE = 'Contact with us'

export default function Page() {
    return <Container>
        <Typography variant={'h1'}>{PAGE_TITLE}</Typography>

        <ContentBlockOrganismLazy
            subtitle={<>

                How can we help you?

            </>}
            body={<>

                Use the contact form below.
                We always try to make our response time as fast as possible.
                Usually it is one day.
                <br/>
                <br/>
                Give us your email address to enable us to respond.
            </>}
        />

        <ContactFormOrganismLazy/>


    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
