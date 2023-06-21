import { getCompanyName } from '@/shared-policies/core.policy'
import { AppLinkAtom }    from '@/src/UI/components/_atoms/AppLink.atom'
import { ReactElement }   from 'react'




type Props = {
    redirectOnClick?: boolean
    fullName?: boolean
}


export const CompanyNameAtom = ({redirectOnClick = false, fullName}: Props): ReactElement => {

    if (redirectOnClick) {
        return <span><AppLinkAtom href="/">{getCompanyName(fullName)}</AppLinkAtom></span>
    } else {
        return <span>{getCompanyName(fullName)}</span>
    }

}
