import axios from 'axios'




export type SendEmail = {
    subject: string
    text: string
}

export const sendEmail = (payload: SendEmail) => {
    if (!process.env.NEXT_PUBLIC_MAILING_SERVICE_URL) {
        console.warn('No email provider.')
        return void undefined
    }

    axios.post(process.env.NEXT_PUBLIC_MAILING_SERVICE_URL, payload)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
