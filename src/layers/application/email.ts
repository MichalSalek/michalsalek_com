import { reportIssue }     from '@/src/layers/application/ErrorTracker'
import { isProductionEnv } from '@msalek/utils'
import axios               from 'axios'




export type SendEmail = {
    subject: string
    text: string
}

export const sendEmail = async (payload: SendEmail): Promise<void> => {

    if (process.env.NEXT_PUBLIC_MAILING_SERVICE_URL_PROD || process.env.NEXT_PUBLIC_MAILING_SERVICE_URL_DEV) {

        const URL = isProductionEnv(true) ?
                    process.env.NEXT_PUBLIC_MAILING_SERVICE_URL_PROD :
                    process.env.NEXT_PUBLIC_MAILING_SERVICE_URL_DEV

        try {
            await axios.post(URL as string, payload)
        } catch (e) {
            reportIssue(e)
        }
    } else {
        console.warn('No email provider.')
    }
}
