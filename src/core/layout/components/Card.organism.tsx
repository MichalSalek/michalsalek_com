import { getCompanyName } from '@/../public-policies/basic.policy'
import { CardMolecule }   from '@/core/layout/components/Card.molecule'
import BackImage          from '@/core/layout/images/back.jpg'
import DrumsImage         from '@/core/layout/images/drums.jpg'
import FrontImage         from '@/core/layout/images/front.jpg'
import PlanningImage      from '@/core/layout/images/planning.jpg'
import StudioImage        from '@/core/layout/images/studio.jpg'
import { Typography }     from '@mui/material'
import Stack              from '@mui/material/Stack'




type Props = {
    version: 'software' | 'sound'
}


export const CardOrganism = ({version}: Props): JSX.Element => {
    switch (version) {


        case 'software':
            return <Stack flexDirection={'column'} flexWrap={'nowrap'}>

                <Typography variant={'h2'} textAlign={'center'}>{getCompanyName(true)} <br/>
                    <strong> in your Software</strong></Typography>

                <Stack>

                    <CardMolecule
                        image={PlanningImage}
                        alt={'software planning process'}
                        credits={'Photo by Daria Nepriakhina on Unsplash'}
                        title={'Architecture and process planning'}
                        content={<><p>{getCompanyName()} will help you discover and plan areas of your business.</p>
                            <p>Let&apos;s find a definite borders of a features, scopes and modules. </p></>}
                    />


                    <CardMolecule
                        image={FrontImage}
                        alt={'software frontend UI development process in atomic concept'}
                        credits={'Photo by John Schnobrich on Unsplash'}
                        title={'Frontend User Interface'}
                        content={<><p> With {getCompanyName()}, UI of your business views will be solid,
                            reusable <strong>coherent</strong>. </p>
                            <p>From a first byte after page a load to long-life applications - SEO and performance is a key.</p></>}
                    />


                    <CardMolecule
                        image={BackImage}
                        alt={'software backend development process in atomic concept'}
                        credits={'Photo by Christina on Unsplash'}
                        title={'Backend logic and operations'}
                        content={<><p> Want to process some data? Need a microservice? </p>
                            <p>{getCompanyName()} use an event driven solutions to keep perfect timing and wayback machine possibilities.</p></>}
                    />

                </Stack>

            </Stack>



        case 'sound':
            return <Stack flexDirection={'column'} flexWrap={'nowrap'}>


                <Typography variant={'h2'} textAlign={'center'}>{getCompanyName(true)} <br/> <strong> for sound and music </strong></Typography>

                <Stack>

                    <CardMolecule
                        image={StudioImage}
                        alt={'music studio services in atomic concept'}
                        credits={'Photo by Caught In Joy on Unsplash'}
                        title={'Mixing and mastering all-in services'}
                        content={<><p>Looking for a nice sound? Want to boost your music? </p></>}
                    />


                    <CardMolecule
                        image={DrumsImage}
                        alt={'drumkit'}
                        credits={'Photo by Josh Sorenson on Unsplash'}
                        title={'Soundtracks and beats'}
                        content={<><p> You can order {getCompanyName()} prepared music. </p>
                            <p>Are you a singer or rapper? Want to have your own music to video? Take a look.</p></>}
                    />

                </Stack>

            </Stack>
    }

}
