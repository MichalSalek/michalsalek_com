import { GeneralPageProps }         from '@/src/pages/_app'
import molecules                    from '@/src/UI/assets/molecules.jpg'
import { ContentBlockOrganismLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import { CompanyNameAtom }          from '@/src/UI/components/CompanyName.atom'
import { HeroMolecule }             from '@/src/UI/components/Hero.molecule'
import { ArticleComposition }       from '@/src/UI/compositions/Article.composition'
import React                        from 'react'




const PAGE_TITLE = 'O dupie marynie'

export default function Page() {
    return <ArticleComposition title={PAGE_TITLE} internalLinksToShow={['/software/architecture', '/software/backend', '/software/frontend']}>

        <HeroMolecule
            image={molecules}
            alt={'software achitecture concept'}
            credits={'Photo by Ashraful Islam on Unsplash'}
        />

        <ContentBlockOrganismLazy
            title={<>

                Dupa dupa men

            </>}
            subtitle={<>

                Dupa dupa men

            </>}
            body={<>

                Discover Event Sourcing. At <CompanyNameAtom/>, we use the <strong>high-speed UDP protocol</strong> available to your customers at critical areas,
                which has long been used by all multiplayer games, chat rooms and GPS navigation. Our applications are lightning fast,
                because we know the importance of a <strong>lightning-fast responsive interface</strong> – the domain of the top players in the software market.

                Discover Event Sourcing. At <CompanyNameAtom/>, we use the <strong>high-speed UDP protocol</strong> available to your customers at critical areas,
                which has long been used by all multiplayer games, chat rooms and GPS navigation. Our applications are lightning fast,
                because we know the importance of a <strong>lightning-fast responsive interface</strong> – the domain of the top players in the software market.

                Discover Event Sourcing. At <CompanyNameAtom/>, we use the <strong>high-speed UDP protocol</strong> available to your customers at critical areas,
                which has long been used by all multiplayer games, chat rooms and GPS navigation. Our applications are lightning fast,
                because we know the importance of a <strong>lightning-fast responsive interface</strong> – the domain of the top players in the software market.

                Discover Event Sourcing. At <CompanyNameAtom/>, we use the <strong>high-speed UDP protocol</strong> available to your customers at critical areas,
                which has long been used by all multiplayer games, chat rooms and GPS navigation. Our applications are lightning fast,
                because we know the importance of a <strong>lightning-fast responsive interface</strong> – the domain of the top players in the software market.

            </>}
        />

    </ArticleComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
