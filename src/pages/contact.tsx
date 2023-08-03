import { sendEmail }                                     from '@/src/layers/application/email'
import { GeneralPageProps }                              from '@/src/pages/_app'
import { freezeThreadAndWait }                           from '@msalek/utils'
import { Container, FormControl, TextField, Typography } from '@mui/material'
import Button                                            from '@mui/material/Button'
import { useState }                                      from 'react'




const PAGE_TITLE = 'Contact with us'

export default function Page() {

    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')

    const clearForm = () => {
        setSubject('')
        setText('')
    }


    const [formDisabled, setFormDisabled] = useState(false)
    const [formError, setFormError] = useState(false)


    const sendEmailCallback = async () => {
        setFormDisabled(true)

        if (subject && text) {
            await sendEmail({subject, text})
            await freezeThreadAndWait(500)
            clearForm()

        } else {
            setFormDisabled(false)
            setFormError(true)
            await freezeThreadAndWait(400)
            setFormError(false)
            await freezeThreadAndWait(200)
            setFormError(true)
            await freezeThreadAndWait(300)
            setFormError(false)
        }

        await freezeThreadAndWait(300)
        setFormDisabled(false)
    }

    return <Container>

        <Typography variant={'h1'}>{PAGE_TITLE}</Typography>

        <FormControl
            component={'section'}
        >

            <TextField
                error={formError}
                disabled={formDisabled}
                placeholder={'Subject'}
                value={subject}
                onChange={(event) =>
                    setSubject(event.target.value)}
            />
            <TextField
                error={formError}
                disabled={formDisabled}
                multiline={true}
                placeholder={'Text'}
                value={text}
                onChange={(event) =>
                    setText(event.target.value)}
            />

            <Button
                color={formError ? 'error' : 'primary'}
                disabled={formDisabled}
                onClick={sendEmailCallback}
                sx={{my: 5}}>send</Button>

        </FormControl>



    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
