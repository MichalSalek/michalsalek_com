import { AppLinkAtom }     from '@/src/UI/components/AppLink.atom'
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom'
import Stack               from '@mui/material/Stack'
import Typography          from '@mui/material/Typography'




export default function Page() {
    return <Stack flexDirection={'column'}>

        <Typography variant={'h2'}>Connection problem.</Typography>

        <Typography variant={'body1'}>Go back to home page:</Typography>

        <CompanyNameAtom fullName={true} redirectOnClick={true}/>

        <Typography variant={'body1'}>Are you looking for something else?</Typography>

        <AppLinkAtom href="/contact">
            <Typography variant="body2">Contact us
            </Typography>
        </AppLinkAtom>

    </Stack>
}
