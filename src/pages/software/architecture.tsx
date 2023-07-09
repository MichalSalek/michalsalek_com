import { HeroMolecule }       from '@/src/UI/components/Hero.molecule'
import { SubpageComposition } from '@/src/UI/compositions/Subpage.composition'
import molecules              from '@/src/UI/images/molecules.jpg'
import { GeneralPageProps }   from '@/src/pages/_app'
import { Typography }         from '@mui/material'
import Card                   from '@mui/material/Card'
import CardContent            from '@mui/material/CardContent'




const PAGE_TITLE = 'Software architecture'

export default function Page() {
    return <SubpageComposition title={PAGE_TITLE}>

        <HeroMolecule
            image={molecules}
            alt={'software achitecture concept'}
            credits={'Photo by Terry Vlisidis on Unsplash'}
        />


        {/*@todo: przerobic te segmenty ponizej na molekule:*/}

        <Card elevation={0} sx={{minWidth: '100%'}}>

            <CardContent>
                <Typography variant={'h2'}>Easy and understandable Project maintenance</Typography>

                <Typography variant={'body1'}>
                   <p>Jeśli będziesz chciał w przyszłości powierzyć kod innemu zespołowi deweloperskemu. </p>
                    Struktura plików oraz katalogów kodu źródłowego pozostanie jasna oraz udokumentowana w stosownym miejscu.
                    Wszystko po to, by osoby techniczne chcący dokonywać dalszych zmian, usprawnień i modyfikacji Twojej aplikacji
                    mieli w tym pełną swobodę.
                </Typography>

            </CardContent>

            <CardContent>
                <Typography variant={'h2'}>Easy and understandable Project structure</Typography>

                <Typography variant={'body1'}>No matter what your political opinions of Obama are, very few people out there can say his speeches were poorly written. The man knew how to make a speech! Always bringing in emotion, making a moral stand or inspiring unity – Obama’s speeches had it
                    all.</Typography>
                <Typography variant={'body1'}>So, why not use his wise words instead of Lorem Ipsum? Obama Ipsum is bound to make your product feel more real, as it will include current issues and debates that are still on-going, even with the radical change in administration.</Typography>

            </CardContent>

        </Card>


    </SubpageComposition>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
