import { getCompanyName } from '@/../public-policies/basic.policy'
import { CardMolecule }   from '@/core/layout/components/Card.molecule'
import { ImageAtom }      from '@/core/layout/components/Image.atom'
import FrontImage         from '@/core/layout/images/front.jpg'
import PlanningImage      from '@/core/layout/images/planning.jpg'
import Button             from '@mui/material/Button'
import Card               from '@mui/material/Card'
import CardActionArea     from '@mui/material/CardActionArea'
import CardActions        from '@mui/material/CardActions'
import CardContent        from '@mui/material/CardContent'
import Stack              from '@mui/material/Stack'
import Typography         from '@mui/material/Typography'




export default function Home() {
    return <Stack flexDirection={'column'} flexWrap={'nowrap'}>

        <Typography variant={'h2'}>{getCompanyName} in your Software</Typography>

        <Stack>

            <CardMolecule
                image={PlanningImage}
                alt={'software planning proccess'}
                credits={'Photo by Daria Nepriakhina on Unsplash'}
                title={'Architecture and process planning'}
                content={<><p>{getCompanyName} will help you discover and plan areas of your business.</p>
                    <p>Let&apos;s find a definite borders of a features, scopes and modules. </p></>}
            />


            <CardMolecule
                image={FrontImage}
                alt={'software frontend UI development proccess'}
                credits={'Photo by John Schnobrich on Unsplash'}
                title={'Frontend User Interface'}
                content={<><p> With {getCompanyName}, UI of your business views will be solid,
                    reusable <strong>coherent</strong>. </p>
                    <p>From a first byte after page a load to long-life applications - SEO and performance is a key.</p></>}
            />

        </Stack>

    </Stack>
}
