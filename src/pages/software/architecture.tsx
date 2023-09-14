import { GeneralPageProps }         from '@/src/pages/_app'
import molecules                    from '@/src/UI/assets/molecules.jpg'
import { ContentBlockOrganismLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import { AppLinkAtom }              from '@/src/UI/components/AppLink.atom'
import { CompanyNameAtom }          from '@/src/UI/components/CompanyName.atom'
import { HeroMolecule }             from '@/src/UI/components/Hero.molecule'
import { ArticleComposition }       from '@/src/UI/compositions/Article.composition'
import React                        from 'react'




const PAGE_TITLE = 'Software architecture'

export default function Page() {
    return <ArticleComposition title={PAGE_TITLE} internalLinksToShow={['/software/architecture', '/software/backend', '/software/frontend']}>

        <HeroMolecule
            image={molecules}
            alt={'software achitecture concept'}
            credits={'Photo by Ashraful Islam on Unsplash'}
        />

        <ContentBlockOrganismLazy
            title={<>

                High performance

            </>}
            subtitle={<>

                so your customers don&apos;t have to wait.

            </>}
            body={<>

                Discover Event Sourcing. At <CompanyNameAtom/>, we use the <strong>high-speed UDP protocol</strong> available to your customers at performance-critical areas,
                which has long been used by all multiplayer games, chat rooms and GPS navigation. Our applications are lightning fast,
                because we know the importance of a <strong>lightning-fast responsive interface</strong> – the domain of the top players in the software market.

            </>}
        />


        <ContentBlockOrganismLazy
            title={<>

                Easy and understandable project maintenance

            </>}
            subtitle={<>

                if you want to outsource the code to another development team in the future.

            </>}
            body={<>

                The structure of the files and directories of the source code will remain clear and documented in an appropriate place.
                This will give your team <strong>full visibility and freedom</strong>, to make improvements and modifications with ease.
            </>}
        />


        <ContentBlockOrganismLazy
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
                functionality of your application</strong> through more servers.<br/>
                <AppLinkAtom href={'/software/frontend/'}>Modular frontend</AppLinkAtom> give to you great <strong>Google Page Speed Web Vitals scores</strong>.<br/>
                <AppLinkAtom href={'/software/backend/'}>Modular backend</AppLinkAtom> give to you great speed across the world with individual deploy strategy like a stacking blocks.<br/>


                <br/>
                <br/>

                In addition, most components can be reused multiple times, even in other projects.

            </>}
        />


        <ContentBlockOrganismLazy
            title={<>

                Time is always flowing

            </>}
            subtitle={<>

                let&apos;s not forget that.

            </>}
            body={<>

                When designing complex networks of systems – we do not mindlessly push data.
                <strong> Everything that can happen in your application is an event – one single thing in given time</strong>. Each event happens at a specific point in time.
                Software created in this convention allows you <strong>to do more</strong> – easily travel back in time when dealing with a claim,
                for example.

            </>}
        />

    </ArticleComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
