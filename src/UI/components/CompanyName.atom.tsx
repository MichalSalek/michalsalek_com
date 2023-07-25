import { getCompanyName } from '@/shared-policies/core.policy'
import { AppLinkAtom }                 from '@/src/UI/components/_atoms/AppLink.atom'
import { CSSProperties, ReactElement } from 'react'




type Props = {
    redirectOnClick?: boolean
    fullName?: boolean
}

const TradeMarkAtom = (): ReactElement => <small>™</small>


export const CompanyNameAtom = ({redirectOnClick = false, fullName}: Props): ReactElement => {

    const style: CSSProperties = {whiteSpace: 'nowrap'}

    if (redirectOnClick) {
        return <span style={style}><strong><AppLinkAtom href="/">{getCompanyName(fullName)}</AppLinkAtom> <TradeMarkAtom/></strong></span>
    } else {
        return <span style={style}><strong>{getCompanyName(fullName)} <TradeMarkAtom/></strong></span>
    }

}
