import { GeneralPageProps } from '@/src/pages/_app'
import { CompanyNameAtom }  from '@/src/UI/components/CompanyName.atom'
// import { InfoTextBlockMolecule } from '@/src/UI/components/InfoTextBlock.molecule'
import { RootCardOrganism } from '@/src/UI/components/RootCardOrganism'
import { Typography }       from '@mui/material'
import Box                  from '@mui/material/Box'
import { lazy, Suspense }   from 'react'




const InfoTextBlockMolecule =
    lazy( () =>  import('../UI/components/InfoTextBlock.molecule'))


const PAGE_TITLE = 'A quality value you can get and give.'

export default function Page() {
    return <>

        <Typography variant={'h1'}>{PAGE_TITLE}</Typography>

        <RootCardOrganism version={'software'}/>

        <RootCardOrganism version={'sound'} priorityLoad={false}/>

        <Box paddingY={5}/>


        <Suspense fallback={<span>ŁADOWANKO</span>}>
            <InfoTextBlockMolecule
                largeRowGap={true}
                data={[
                    {
                        heading: <>Who are we?</>,
                        content: <>

                                     It is a contractor guided by a <strong>set of best practices</strong>.
                                     The name is not accidental – the atomic approach allows to build molecules and whole
                                     organisms from the smallest atoms. <strong>Always maintaining consistency</strong>.

                                 </>
                    },
                    {
                        heading: <>What kind of services we provide?</>,
                        content: <>

                                     We specialize in small and medium-sized solutions.
                                     We will make software that will <strong>simplify or automate the process of your business</strong>, or some part of it.
                                     We are also professionally involved in <strong>audio production and sound processing</strong>.

                                 </>
                    },
                    {
                        heading: <>What does <CompanyNameAtom fullName={true}/> specialize in?</>,
                        content: <>

                                     We specialize in non-trivial solutions where <strong>performance and cleverness</strong> are valued.
                                     Do you feel that some current process is unnecessarily consuming your time and money?
                                     Contact us, <strong>we&apos;ll take a look at it</strong>.

                                 </>
                    }
                ]}/>
        </Suspense>

    </>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
