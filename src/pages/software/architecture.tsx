import { GeneralPageProps }        from '@/src/pages/_app'
import molecules                from '@/src/UI/assets/molecules.jpg'
import { CompanyNameAtom }      from '@/src/UI/components/CompanyName.atom'
import { ContentBlockOrganism } from '@/src/UI/components/ContentBlock.organism'
import { GoToContactFormMolecule } from '@/src/UI/components/GoToContactForm.molecule'
import { HeroMolecule }            from '@/src/UI/components/Hero.molecule'
import { InternalLinkingMolecule } from '@/src/UI/components/InternalLinking.molecule'
import { ArticleComposition }      from '@/src/UI/compositions/Article.composition'
import { Divider }                 from '@mui/material'
import React                       from 'react'




const PAGE_TITLE = 'Software architecture'

export default function Page() {
    return <ArticleComposition title={PAGE_TITLE}>

        <HeroMolecule
            image={molecules}
            alt={'software achitecture concept'}
            credits={'Photo by Ashraful Islam on Unsplash'}
        />



        <ContentBlockOrganism
            title={<>

                High performance

            </>}
            subtitle={<>

                so your customers don&apos;t have to wait.

            </>}
            body={<>

                Discover Event Sourcing. At <CompanyNameAtom/>, we use the <strong>high-speed UDP protocol</strong> available to your customers at critical areas,
                which has long been used by all multiplayer games, chat rooms and GPS navigation. Our applications are lightning fast,
                because we know the importance of a <strong>lightning-fast responsive interface</strong> – the domain of the top players in the software market.

            </>}
        />


        <ContentBlockOrganism
            title={<>

                Easy and understandable project maintenance

            </>}
            subtitle={<>

                if you want to outsource the code to another development team in the future.

            </>}
            body={<>

                The structure of the files and directories of the source code will remain clear and documented in an appropriate place.
                All this so that technical people who want to make further changes, improvements and modifications to your application
                have <strong>full freedom</strong> in this.

            </>}
        />


        <ContentBlockOrganism
            title={<>

                High scalability through modularization

            </>}
            subtitle={<>

                in case of rapid growth of your business.

            </>}
            body={<>

                Learn the advantages of the <strong>DDD</strong> model and <strong>CQRS</strong> in practice.
                An application written according to <CompanyNameAtom/> guidelines has a modular structure
                with clearly defined input and output models – so you can, if necessary, <strong>separate the most loaded
                functionality of your application</strong> to more server machines.

                <br/>
                <br/>

                In addition, most components can be reused multiple times, even in other projects.

            </>}
        />


        <ContentBlockOrganism
            title={<>

                Time is always flowing

            </>}
            subtitle={<>

                let&apos;s not forget that.

            </>}
            body={<>

                When designing complex networks of systems – we do not mindlessly push data.
                <strong> Everything that can happen in your application is an event</strong>. Each event happens at a specific point in time.
                Software created in this convention allows you <strong>to do more</strong> – easily travel back in time when dealing with a claim,
                for example. The ease of imagining the flow of execution increases –
                because <strong>everything always happens after something that came before, or before something that is yet to come</strong>.

            </>}
        />


        <Divider/>

        <GoToContactFormMolecule objectOfInterest={PAGE_TITLE}/>

        <Divider/>

        <InternalLinkingMolecule
            itemsToShow={['/software/architecture', '/software/backend', '/software/frontend']}
        />



    </ArticleComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
