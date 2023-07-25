import { GeneralPageProps }     from '@/src/pages/_app'
import { CompanyNameAtom }      from '@/src/UI/components/CompanyName.atom'
import { ContentBlockOrganism } from '@/src/UI/components/ContentBlock.organism'
import { HeroMolecule }         from '@/src/UI/components/Hero.molecule'
import { SubpageComposition } from '@/src/UI/compositions/Subpage.composition'
import molecules              from '@/src/UI/assets/molecules.jpg'




const PAGE_TITLE = 'Software architecture'

export default function Page() {
    return <SubpageComposition title={PAGE_TITLE}>

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
            body={<><p>

                Discover Event Sourcing. At <CompanyNameAtom/>, we use the high-speed UDP protocol available to your customers at critical areas,
                which has long been used by all multiplayer games, chat rooms and GPS navigation. Our applications are lightning fast,
                because we know the importance of a lightning-fast responsive interface - the domain of the top players in the software market.
            </p>
            </>}
        />


        <ContentBlockOrganism
            title={<>

                Easy and understandable project maintenance

            </>}
            subtitle={<>

                if you want to outsource the code to another development team in the future.

            </>}
            body={<p>

                The structure of the files and directories of the source code will remain clear and documented in an appropriate place.
                All this so that technical people who want to make further changes, improvements and modifications to your application
                have full freedom in this.

            </p>}
        />


        <ContentBlockOrganism
            title={<>

                High scalability through modularization

            </>}
            subtitle={<>

                in case of rapid growth of your business.

            </>}
            body={<>
                <p>

                    Learn the advantages of the DDD model and CQRS in practice.
                    An application written according to <CompanyNameAtom/> guidelines has a modular stucture
                    with clearly defined input and output models - so you can, if necessary, separate the most loaded
                    functionality of your application to more server machines.
                </p>
                <p>
                    In addition, most components can be reused multiple times, even in other projects.
                </p>
            </>}
        />



    </SubpageComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
