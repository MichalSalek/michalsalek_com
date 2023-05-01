import { CompanyNameAtom } from '@/src/core/layout/components/CompanyName.atom'
import { Typography }      from '@mui/material'
import Stack               from '@mui/material/Stack'
import { getCompanyName }  from '@/public-policies/basic.policy'
import Link                from 'next/link'




export const FooterPartial = (): JSX.Element => {

    return <Stack mt={5} pt={5} mb={1} alignItems={'baseline'}>
        <Link href="/software"><Typography variant={'body2'}>Software services</Typography></Link>
        <p><CompanyNameAtom redirectOnClick={true}/></p>
        <Link href="/sound"><Typography variant={'body2'}>Sound services</Typography></Link>
    </Stack>
}
