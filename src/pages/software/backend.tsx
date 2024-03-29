import { GeneralPageProps }         from '@/src/pages/_app'
import backend                      from '@/src/UI/assets/backend.jpg'
import { ContentBlockOrganismLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import { AppLinkAtom }              from '@/src/UI/components/AppLink.atom'
import { HeroMolecule }             from '@/src/UI/components/Hero.molecule'
import { ArticleComposition }       from '@/src/UI/compositions/Article.composition'




const PAGE_TITLE = 'Backend services'

export default function Page() {
    return <ArticleComposition title={PAGE_TITLE} internalLinksToShow={['/software/architecture', '/software/backend', '/software/frontend']}>

        <HeroMolecule
            image={backend}
            alt={'backend domain driver design'}
            credits={'Photo by Daria Nepriakhina on Unsplash'}
        />


        <ContentBlockOrganismLazy
            title={<>

                Backend perfect fit for a real-time experience

            </>}
            subtitle={<>

                without unnecessary markup.

            </>}
            body={<>

                The backend technology must be created to work closely with the <AppLinkAtom href={'/software/frontend/'}>user interface</AppLinkAtom>.
                We know how important it is to optimize the services that <strong>fulfill your business needs</strong>,
                so at every stage of server code development we take care of the necessary minimum needed for the application to work.
                <br/>
                <br/>
                We do not use omni-channel solutions that cause unnecessary overhead – consuming your transfer and the resources of your servers.
                We always think about <strong>performance and a high scalability factor</strong> to maintain the highest efficiency.
            </>}
        />



        <ContentBlockOrganismLazy
            title={<>

                We don&apos;t promise miracles at the beginning

            </>}
            subtitle={<>

                we spend more time analyzing.

            </>}
            body={<>

                The best job done is the one that <strong>accomplishes your needs without overcomplicated solutions</strong>.
                <br/>
                The key to success is analysis. We need to understand exactly what you want to achieve –
                that way we will code a service that accomplishes <strong>exactly what you want to achieve</strong>. No acrobatics or over-engineering.
                <br/>
                <br/>
                Things that are too complicated and hard to understand seem professional at first glance,
                but over time they become impossible to maintain and incredibly expensive.

            </>}
        />



        <ContentBlockOrganismLazy
            title={<>

                Digital solutions in an analog world

            </>}
            subtitle={<>

                it&apos;s not that difficult.

            </>}
            body={<>

                Many things that seem abstract – have many analogies in the real world. We can find them and rearrange them for you.
                This makes the understanding of how a web application works much clearer, and thus <strong>becomes much more digestible</strong>.

            </>}
        />

    </ArticleComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}