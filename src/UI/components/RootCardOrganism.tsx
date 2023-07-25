import { CardMolecule }            from '@/src/UI/components/Card.molecule'
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom'
import BackImage           from '@/src/UI/assets/back.jpg'
import DrumsImage          from '@/src/UI/assets/drums.jpg'
import FrontImage          from '@/src/UI/assets/front.jpg'
import PlanningImage       from '@/src/UI/assets/planning.jpg'
import StudioImage         from '@/src/UI/assets/studio.jpg'
import { Typography }      from '@mui/material'
import Stack                       from '@mui/material/Stack'
import { ReactElement, ReactNode } from 'react'




type Props = {
    version: 'software' | 'sound'
}

const OutsideWrapper = ({children}: { children: ReactNode }): ReactElement => <Stack
    flexDirection={'column'}
    flexWrap={'nowrap'}
    mb={5}
> {children} </Stack>


const InsideWrapper = ({children}: { children: ReactNode }): ReactElement => <Stack
    alignItems={'stretch'}
    rowGap={5}
> {children} </Stack>


const CardsSectionTitleWithCompanyName = ({content}: { content: string }) =>
    <Typography
        variant={'h2'}
        sx={{
            width: '100%',
            maxWidth: '390px',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            padding: '2rem 0'
        }}>
        <CompanyNameAtom
            fullName={true}
            style={{
                textAlign: 'left'
            }}/>
        <span
            style={{
                textAlign: 'right'
            }}> {content}</span>
    </Typography>


export const RootCardOrganism = ({version}: Props): ReactElement => {
    switch (version) {


        case 'software':
            return <OutsideWrapper>

                <CardsSectionTitleWithCompanyName content={'in your software'}/>

                <InsideWrapper>

                    <CardMolecule
                        linkPath={'/software/architecture'}
                        image={PlanningImage}
                        alt={'software planning process'}
                        credits={'Photo by Daria Nepriakhina on Unsplash'}
                        title={'Architecture and process planning'}
                        content={<><p><CompanyNameAtom/> will help you discover and plan areas of your business.</p>
                            <p>Let&apos;s find a definite borders of a features, scopes and modules. </p></>}
                    />


                    <CardMolecule
                        linkPath={'/software/frontend'}
                        image={FrontImage}
                        alt={'software frontend UI development process in atomic concept'}
                        credits={'Photo by John Schnobrich on Unsplash'}
                        title={'Frontend User Interface'}
                        content={<><p> With <CompanyNameAtom/>, UI of your business views will be solid,
                            reusable <strong>coherent</strong>. </p>
                            <p>From a first byte after page a load to long-life applications - SEO and performance is a key.</p></>}
                    />


                    <CardMolecule
                        linkPath={'/software/backend'}
                        image={BackImage}
                        alt={'software backend development process in atomic concept'}
                        credits={'Photo by Christina on Unsplash'}
                        title={'Backend logic and operations'}
                        content={<><p> Want to process some data? Need a microservice? </p>
                            <p><CompanyNameAtom/> use an event driven solutions to keep perfect timing and wayback machine possibilities.</p></>}
                    />

                </InsideWrapper>

            </OutsideWrapper>



        case 'sound':
            return <OutsideWrapper>

                <CardsSectionTitleWithCompanyName content={'for sound and music'}/>

                <InsideWrapper>

                    <CardMolecule
                        linkPath={'/sound/studio'}
                        image={StudioImage}
                        alt={'music studio services in atomic concept'}
                        credits={'Photo by Caught In Joy on Unsplash'}
                        title={'Mixing and mastering all-in services'}
                        content={<><p>Looking for a nice sound? Want to boost your music? </p></>}
                    />


                    <CardMolecule
                        linkPath={'/sound/soundtracks'}
                        image={DrumsImage}
                        alt={'drumkit'}
                        credits={'Photo by Josh Sorenson on Unsplash'}
                        title={'Soundtracks and beats'}
                        content={<><p> You can order <CompanyNameAtom/> prepared music. </p>
                            <p>Are you a singer or rapper? Want to have your own music to video? Take a look.</p></>}
                    />

                </InsideWrapper>
            </OutsideWrapper>
    }

}
