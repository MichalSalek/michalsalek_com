import music_studio                 from '@/src/UI/assets/music_studio.jpg'
import { CompanyNameAtom }          from '@/src/UI/components/CompanyName.atom'
import { ContentBlockOrganism } from '@/src/UI/components/ContentBlock.organism'
import { GoToContactFormMolecule }  from '@/src/UI/components/GoToContactForm.molecule'
import { HeroMolecule }         from '@/src/UI/components/Hero.molecule'
import { InternalLinkingMolecule }  from '@/src/UI/components/InternalLinking.molecule'
import { SubpageComposition }   from '@/src/UI/compositions/Subpage.composition'
import { GeneralPageProps }     from '@/src/pages/_app'
import { Divider }                  from '@mui/material'
import React                    from 'react'




const PAGE_TITLE = 'Online studio services'

export default function Page() {
    return <SubpageComposition title={PAGE_TITLE}>


        <HeroMolecule
            image={music_studio}
            alt={'producer mix and mastering professional service'}
            credits={'Photo by Tima Miroshnichenko'}
        />



        <ContentBlockOrganism
            title={<>

                <CompanyNameAtom fullName={true}/> can mix your tracks online

            </>}
            subtitle={<>

                and help you to prepare them properly.

            </>}
            body={<>

                We will find a way to <strong>improve your sound</strong>. We specialize in mixing and mastering pre-submitted multitracks.
                <br/>
                <br/>
                If you <strong>have made recordings at home</strong> using the home-recording methods,
                or <strong>recorded tracks in the studio</strong> and did not want to use local mixing services – you are in the right place.
                We will advise you on <strong>how to best prepare yours multi-tracks</strong> for mailing to our studio.
                After reviewing the material – we will be able to price the services – <strong>mixing and mastering</strong> separately.
            </>}
        />



        <ContentBlockOrganism
            title={<>

                Let us know your vision to sound good

            </>}
            subtitle={<>

                we need to receive on the same waves.

            </>}
            body={<>

                When recording your music, you certainly set a specific goal.
                <strong> Share it with us</strong> so that together <strong>we can strive for the same</strong>.
                Prepare links to the songs <strong>you were inspired by</strong>.
                Mark the tracks that you appreciate for: the sound of the drums, an interesting effect on the vocals,
                or the general perception of the whole.
                We will listen to <strong>everything and bring it down to a common denominator</strong> – producing a track or an entire album for you.
                <br/>
                <br/>
                <strong>You always receive the material we prepare as a fully modular package</strong>,
                so that you can rework the accompaniment yourself as needed.
            </>}
        />



        <ContentBlockOrganism
            title={<>

                Check out our specialization. Kick, snare and bass

            </>}
            subtitle={<>

                we are the best at this.

            </>}
            body={<>

                Most often we work on music from the genres of <strong>metal, hip-hop, strong electronic music, drum and bass </strong>
                and it <strong>works out best</strong> for us. We always try to find the power and majesty of sound, so that the recordings sound strong and wide.
                <br/>
                <br/>
                We are willing to try something new – it is always worth writing to us and presenting your project anyway.

            </>}
        />


        <ContentBlockOrganism
            title={<>

                We use high-tech

            </>}
            subtitle={<>

                do not waste time on experiments that go nowhere.

            </>}
            body={<>

                Our listening system consists of equipment from <strong>ADAM AUDIO</strong>.
                <strong> ARTURIA</strong> and <strong>KLARK TEKNIK</strong> are responsible for the signal path.
                The signal is processed with <strong>balanced cables</strong> so that we can forget about noise and interference.
                We also support ourselves with listening equipment from <strong>BEYERDYNAMIC</strong>.
                The whole process is carried out in a professional Digital Audio Workstation.

            </>}
        />


        <Divider/>

        <GoToContactFormMolecule objectOfInterest={PAGE_TITLE}/>

        <Divider/>

        <InternalLinkingMolecule
            itemsToShow={['/sound/soundtracks', '/sound/studio']}
        />




    </SubpageComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
