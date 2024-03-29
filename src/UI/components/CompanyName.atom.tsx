import { GET_COMPANY_NAME }            from '@/shared-policies/core.policy'
import { AppLinkAtom }                 from '@/src/UI/components/AppLink.atom'
import { CSSProperties, ReactElement } from 'react'




type Props = {
    redirectOnClick?: boolean
    fullName?: boolean
    style?: CSSProperties
}

const TradeMarkAtom = (): ReactElement => <small>™</small>


export const CompanyNameAtom = ({redirectOnClick = false, fullName, style}: Props): ReactElement => {

    const concatenatedStyle: CSSProperties = {
        whiteSpace: 'nowrap',
        color:      'inherit',
        ...style
    }

    if (redirectOnClick) {
        return <span style={concatenatedStyle}>
            <strong>
                <AppLinkAtom style={{color: 'inherit'}} href="/">
                    {GET_COMPANY_NAME(fullName)} <TradeMarkAtom/>
                </AppLinkAtom>
            </strong>
        </span>
    } else {
        return <span style={concatenatedStyle}>
            <strong>
                {GET_COMPANY_NAME(fullName)} <TradeMarkAtom/>
            </strong>
        </span>
    }

}
