import { GET_CONTACT_EMAIL_ADDRESS } from '@/shared-policies/core.policy'
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
        top: 0,
        height: '40%',
        p: 5
    }}>
        {
            isSuccessfully ?
            <Typography
                variant={'body1'}
                color={mainTheme.palette.success.main}
                fontWeight={'400'}
            >Your message has been sent. Thank you.</Typography>
                          :
            <Typography
                variant={'body1'}
                color={mainTheme.palette.error.main}
                fontWeight={'400'}
            >Connection problem here. Please send this message manually to: {GET_CONTACT_EMAIL_ADDRESS()}</Typography>
        }

    </Stack>
}