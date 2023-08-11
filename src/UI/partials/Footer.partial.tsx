import { AppLinkAtom }     from '@/src/UI/components/AppLink.atom'
import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom'
import { Typography }      from '@mui/material'
import Stack               from '@mui/material/Stack'
import Link                from 'next/link'
import { ReactElement }    from 'react'




export const FooterPartial = (): ReactElement => {

    return <>


        <Stack mt={30} pt={5} mb={1} flexDirection={'column'}>

            <Stack alignItems={'baseline'}>
                <AppLinkAtom href="/software"><Typography variant={'body2'}><strong>Software</strong> services</Typography></AppLinkAtom>
                <p><CompanyNameAtom redirectOnClick={true}/></p>
                <AppLinkAtom href="/sound"><Typography variant={'body2'}><strong>Sound</strong> services</Typography></AppLinkAtom>
            </Stack>


            <Stack>
                <Typography
                    variant={'body2'}
                    fontFamily={'verdana'}
                    fontSize={8}
                >Atomic Concept - Michał Sałek | VAT PL9442267029</Typography>
            </Stack>


        </Stack>


    </>
}
