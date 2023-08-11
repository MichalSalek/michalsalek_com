import { GET_CONTACT_EMAIL_ADDRESS } from '@/shared-policies/core.policy'
import { appColors }                 from '@/src/UI/styles/colors'
import { mainTheme }                 from '@/src/UI/styles/theme'
import { Typography }                from '@mui/material'
import Stack                         from '@mui/material/Stack'
import React, { ReactElement }       from 'react'


type Props = {
    isSuccessfully: boolean
}

export const ContactFormFeedbackAtom = ({isSuccessfully}: Props): ReactElement => {


    return <Stack sx={{
        position: 'absolute',
        top: '15%',
        p: 5,
        backgroundColor: isSuccessfully ? mainTheme.palette.success.main : mainTheme.palette.error.main,
        minHeight: 'unset',
        maxWidth: '90%'
    }}>
        {
            isSuccessfully ?
            <Typography
                m={0}
                variant={'body1'}
                color={appColors.transparentWhite}
                fontWeight={'500'}
            >Your message has been sent. Thank you.</Typography>
                          :
            <Typography
                m={0}
                variant={'body1'}
                color={appColors.transparentWhite}
                fontWeight={'500'}
            >Connection problem here. Please send this message manually to: <strong>{GET_CONTACT_EMAIL_ADDRESS()}</strong>. Or try again.</Typography>
        }

    </Stack>
}