import { getCompanyName } from '@/public-policies/basic.policy'
import Link               from 'next/link'




type Props = {
    redirectOnClick?: boolean
    fullName?: boolean
}


export const CompanyNameAtom = ({redirectOnClick = false, fullName}: Props): JSX.Element => {

    if (redirectOnClick) {
        return <span><Link href="/">{getCompanyName(fullName)}</Link></span>
    } else {
        return <span>{getCompanyName(fullName)}</span>
    }

}
