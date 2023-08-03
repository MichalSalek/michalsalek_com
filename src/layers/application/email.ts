import { reportIssue } from '@/src/layers/application/ErrorTracker'
import axios           from 'axios'




export type SendEmail = {
    subject: string
    text: string
}

export const sendEmail = (payload: SendEmail) => {
    if (!process.env.NEXT_PUBLIC_MAILING_SERVICE_URL) {
        console.warn('No email provider.')
        return void undefined
    }

    try {
        void axios.post(process.env.NEXT_PUBLIC_MAILING_SERVICE_URL, payload)
    } catch (e) {
        reportIssue(e)
    }
}
