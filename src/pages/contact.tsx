import { sendEmail }                        from '@/src/layers/application/email'
import { GeneralPageProps }                 from '@/src/pages/_app'
import { Container, TextField, Typography } from '@mui/material'
import Button                               from '@mui/material/Button'
import { useCallback, useState }            from 'react'




const PAGE_TITLE = 'Contact with the office'

export default function Page() {

    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')

    const sendEmailCallback = useCallback(() => {
        sendEmail({subject, text})
    }, [subject, text])

    return <Container>

        <Typography variant={'h1'}>{PAGE_TITLE}</Typography>

        <TextField
            variant="outlined"
                   placeholder={'Subject'}
                   onBlur={(event) => setSubject(event.target.value)}
        />
        <TextField
            multiline={true}
            variant="outlined"
            placeholder={'Text'}
            onBlur={(event) => setText(event.target.value)}
        />

        <Button onClick={sendEmailCallback}>send</Button>

    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
