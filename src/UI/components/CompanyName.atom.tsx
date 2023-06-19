import { getCompanyName } from '@/shared-policies/core.policy'
import Link               from 'next/link'
import { ReactElement }   from 'react'




type Props = {
    redirectOnClick?: boolean
    fullName?: boolean
}


export const CompanyNameAtom = ({redirectOnClick = false, fullName}: Props): ReactElement => {

    if (redirectOnClick) {
        return <span><Link href="/">{getCompanyName(fullName)}</Link></span>
    } else {
        return <span>{getCompanyName(fullName)}</span>
    }

}
