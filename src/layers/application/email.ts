import { reportIssue }     from '@/src/layers/application/errorTracker'
import { isProductionEnv } from '@msalek/utils'
import axios               from 'axios'




export type SendEmailDTO = {
    subject: string
    text: string
    replyTo: string
    signature: string
}

export const sendEmail = async (payload: SendEmailDTO): Promise<void> => {

    if (process.env.NEXT_PUBLIC_MAILING_SERVICE_URL_PROD || process.env.NEXT_PUBLIC_MAILING_SERVICE_URL_DEV) {

        const URL = isProductionEnv(true) ?
                    process.env.NEXT_PUBLIC_MAILING_SERVICE_URL_PROD :
                    process.env.NEXT_PUBLIC_MAILING_SERVICE_URL_DEV

        try {
            await axios.post(URL as string, payload)
            await Promise.resolve()
        } catch (e) {
            reportIssue(e)
            await Promise.reject(e)
        }
    } else {
        console.warn('No email provider.')
    }
}
