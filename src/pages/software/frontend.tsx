import { GeneralPageProps }         from '@/src/pages/_app'
import frontend                     from '@/src/UI/assets/frontend.jpg'
import { ContentBlockOrganismLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import { AppLinkAtom }              from '@/src/UI/components/AppLink.atom'
import { CompanyNameAtom }          from '@/src/UI/components/CompanyName.atom'
import { HeroMolecule }             from '@/src/UI/components/Hero.molecule'
import { ArticleComposition }       from '@/src/UI/compositions/Article.composition'




const PAGE_TITLE = 'Frontend services'

export default function Page() {
    return <ArticleComposition title={PAGE_TITLE} internalLinksToShow={['/software/architecture', '/software/backend', '/software/frontend']}>

        <HeroMolecule
            image={frontend}
            alt={'user flow planning methods'}
            credits={'Photo by Kelly Sikkema on Unsplash'}
        />



        <ContentBlockOrganismLazy
            title={<>

                Lightning fast User Interface

            </>}
            subtitle={<>

                to help your client feel the flow.

            </>}
            body={<>

                <strong>A good application is one that helps the user.</strong> Properly written,
                optimized source code allows today&apos;s modern browser technologies to spread their wings.
                <br/>
                <br/>
                We don&apos;t force the user to wait senselessly where it is not necessary.
                Sometimes, however, waiting is unavoidable – for example: for database reads/writes,
                {' '}<AppLinkAtom href={'/software/backend/'}>to perform operations on the backend</AppLinkAtom>, or when a network traffic is heavy loaded –
                <strong> then the frontend takes responsibility for the whole user experience</strong>.
                Proper manipulation of loaders, transitions, or micro–animations makes the application
                seem to have a flow and anyway – <strong>it feels to runs smoothly</strong>.

            </>}
        />



        <ContentBlockOrganismLazy
            title={<>

                Comfort in any situation

            </>}
            subtitle={<>

                because real life is not perfect.

            </>}
            body={<>

                Sometimes there are situations in which the Internet temporarily goes down.
                <br/>
                There are many clever ways to get out of this situation <strong>with class and show professionalism to the customer</strong>.
                A user filled out a form and can&apos;t send it? Let&apos;s cache it in case he wants to refresh the page.
                User moves and uses unstable mobile internet? Let&apos;s detect it and inform him or her about it.
                In addition, let&apos;s queue the events he performed – to be executed when the connection returns to normal.
                {' '}<AppLinkAtom href={'/software/architecture/'}>We can easy do that, having proper frontend architecture.</AppLinkAtom>
                <br/>
                We are aware of these and many other solutions <strong>to simply help the person who wants to use your services</strong>.

            </>}
        />


        <ContentBlockOrganismLazy
            title={<>

                Good communication is key

            </>}
            subtitle={<>

                to get full speed.

            </>}
            body={<>

                To achieve optimal speed in the performance of your app – a good frontend alone is not enough.
                Planned concepts must be followed at the level of both <AppLinkAtom href={'/software/architecture/'}>server architecture and database models</AppLinkAtom>.
                This is not possible when different teams deal with different layers of the application.
                Moreover – when they do not consistently set requirements.
                Also, it is very important to set minimalist portions of data so as not to overload network traffic and waste transfer.
                To address this – at <CompanyNameAtom fullName={true}/> we model
                applications using Domain Driven Design and Behavior Driver Design – <strong>business flow over technology</strong>.
                <br/>
                <br/>
                <strong>Technology is a tool, not a toy</strong>.

            </>}
        />

    </ArticleComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}