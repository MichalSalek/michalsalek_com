import { GeneralPageProps }         from '@/src/pages/_app'
import drumset                      from '@/src/UI/assets/drumset.jpg'
import { ContentBlockOrganismLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import { AppLinkAtom }              from '@/src/UI/components/AppLink.atom'
import { CompanyNameAtom }          from '@/src/UI/components/CompanyName.atom'
import { HeroMolecule }             from '@/src/UI/components/Hero.molecule'
import { ArticleComposition }       from '@/src/UI/compositions/Article.composition'




const PAGE_TITLE = 'Music to a buy or an order'

export default function Page() {
    return <ArticleComposition title={PAGE_TITLE} internalLinksToShow={['/sound/soundtracks', '/sound/studio']}>


        <HeroMolecule
            image={drumset}
            alt={'making music by drumming or beats composing'}
            credits={'Photo by ASBA DRUMS'}
        />


        <ContentBlockOrganismLazy
            title={<>

                Order a backing track

            </>}
            subtitle={<>

                for your videos, commercials and trailers.

            </>}
            body={<>

                We will compose music and sound design for your materials. <strong>Specify your vision to us</strong> and we will do the rest.
                We have the ability to use <strong>samplers and high quality processors</strong>.
                We also have instruments such as <strong>electric guitar, bass guitar, drum set</strong>.
                <br/>
                <br/>
                Our each idea always sounds top, because we have a knowledge about <AppLinkAtom href={'/sound/studio/'}> mix and mastering</AppLinkAtom> – for any sound sources.

            </>}
        />


        <ContentBlockOrganismLazy
            title={<>

                Singing? Do you rap? You are a creative performer

            </>}
            subtitle={<>

                and you need a producer.

            </>}
            body={<>

                You&apos;ve certainly happened to sift through huge packages of beats and backing tracks.
                We know it. It&apos;s hard to hit a backing track that will suit us one 100 percent.
                That&apos;s what music is all about – to <strong>perfectly realize your vision</strong> – without using half-measures.
                <br/>
                <br/>
                We will create a primer for you in the <strong>climate you feel best in</strong>.
                You will also be assured that the primer will be special and unique. <strong>No one else will record to it</strong>.

            </>}
        />



        <ContentBlockOrganismLazy
            title={<>

                Lease an <CompanyNameAtom/> original music

            </>}
            subtitle={<>

                which we are working on.

            </>}
            body={<>

                You also have the option to purchase a <strong>lease license</strong> and use the already finished primer,
                which comes out more favorably priced.
                We create music that is equally <strong>suitable for your vocals and soundtrack for video productions</strong>.
                Check out our services and achieve your goal without obstacles – <strong>technology is on our side</strong>.
            </>}
        />

    </ArticleComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}