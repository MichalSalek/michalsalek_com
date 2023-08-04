import { sendEmail }                                     from '@/src/layers/application/email'
import { GeneralPageProps }                              from '@/src/pages/_app'
import { ContentBlockOrganism }                          from '@/src/UI/components/ContentBlock.organism'
import { freezeThreadAndWait }                           from '@msalek/utils'
import { Container, FormControl, TextField, Typography } from '@mui/material'
import Button                                            from '@mui/material/Button'
import Stack                                             from '@mui/material/Stack'
import React, { FormEvent, useState }                    from 'react'




const PAGE_TITLE = 'Contact with us'

export default function Page() {

    const [subject, setSubject] = useState('')
    const [yourEmail, setYourEmail] = useState('')
    const [yourName, setYourName] = useState('')
    const [text, setText] = useState('')

    const clearForm = () => {
        setSubject('')
        setText('')
    }


    const [formDisabled, setFormDisabled] = useState(false)
    const [formError, setFormError] = useState(false)


    const sendEmailCallback = async (e: FormEvent) => {
        e?.preventDefault()

        setFormDisabled(true)

        if (subject && text) {
            await sendEmail({
                subject, text: text + `
             
             *** Email to reply: ${yourEmail} ***
             
             ${yourName}
             `
            })
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


        <ContentBlockOrganism
            subtitle={<>

                How can we help you?

            </>}
            body={<>

                Use the contact form below.
                We always try to make our response time as fast as possible.
                Usually it is one day.
                <br/>
                <br/>
                Give us your email address to enable us to respond.
            </>}
        />



        <FormControl
            component={'form'}
            onSubmit={sendEmailCallback}
            sx={{
                width: '100%'
            }}
        >
            <Stack
                maxWidth={'1000px'}
                justifyContent={'center'}
                flexWrap={'wrap'}
                alignItems={'baseline'}
            >

                <Stack
                    flexDirection={'column'}
                    rowGap={1}
                    flex={1}
                    alignItems={'stretch'}
                    minWidth={'320px'}
                >

                    <TextField
                        error={formError}
                        disabled={formDisabled}
                        label={'Email to reply *'}
                        placeholder={'Reply to'}
                        type={'email'}
                        value={yourEmail}
                        onChange={(event) =>
                            setYourEmail(event.target.value)}
                    />


                </Stack>



                <Stack
                    flexDirection={'column'}
                    flex={2}
                    rowGap={1}
                    alignItems={'stretch'}
                    minWidth={'320px'}
                >

                    <TextField
                        error={formError}
                        disabled={formDisabled}
                        label={'Subject *'}
                        placeholder={'Email title'}
                        value={subject}
                        onChange={(event) =>
                            setSubject(event.target.value)}
                    />

                    <TextField
                        error={formError}
                        disabled={formDisabled}
                        multiline={true}
                        minRows={12}
                        label={'Message *'}
                        placeholder={'Email body'}
                        value={text}
                        onChange={(event) =>
                            setText(event.target.value)}
                    />



                    <TextField
                        disabled={formDisabled}
                        label={'Your name'}
                        value={yourName}
                        onChange={(event) =>
                            setYourName(event.target.value)}
                    />


                    <Button
                        color={formError ? 'error' : 'primary'}
                        disabled={formDisabled}
                        type={'submit'}
                        sx={{my: 5}}
                        size={'large'}
                    >send</Button>

                </Stack>

            </Stack>
        </FormControl>



    </Container>
}




export async function getStaticProps(): Promise<{ props: GeneralPageProps }> {
    return {
        props: {title: PAGE_TITLE} // will be passed to the page component as props
    }
}
