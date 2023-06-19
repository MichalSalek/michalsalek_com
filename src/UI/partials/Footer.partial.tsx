import { CompanyNameAtom } from '@/src/UI/components/CompanyName.atom'
import { Typography }      from '@mui/material'
import Stack               from '@mui/material/Stack'
import Link                from 'next/link'
import { ReactElement }    from 'react'




export const FooterPartial = (): ReactElement => {

    return <>


        <Stack mt={5} pt={5} mb={1} flexDirection={'column'}>

            <Stack alignItems={'baseline'}>
                <Link href="/software"><Typography variant={'body2'}>Software services</Typography></Link>
                <p><CompanyNameAtom redirectOnClick={true}/></p>
                <Link href="/sound"><Typography variant={'body2'}>Sound services</Typography></Link>
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
