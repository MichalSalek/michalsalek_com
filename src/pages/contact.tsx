import { sendEmail }                                     from '@/src/layers/application/email'
import { GeneralPageProps }                              from '@/src/pages/_app'
import { ContentBlockOrganism }                          from '@/src/UI/components/ContentBlock.organism'
import { mainTheme }                                     from '@/src/UI/styles/theme'
import { freezeThreadAndWait }                           from '@msalek/utils'
import { Container, FormControl, TextField, Typography } from '@mui/material'
import Box                                               from '@mui/material/Box'
import Button                                            from '@mui/material/Button'
import Stack                                             from '@mui/material/Stack'
import React, { FormEvent, useMemo, useState }           from 'react'




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
    const [messageWasSent, setMessageWasSent] = useState(false)

    const unlockForm = async () => {
        setMessageWasSent(false)
        setFormDisabled(false)
        await freezeThreadAndWait(100)
        clearForm()
    }


    const sendEmailCallback = async () => {
        setFormDisabled(true)

        if (subject && text) {
            await sendEmail({
                subject, text: text + `
             
             *** Email to reply: ${yourEmail} ***
             
             ${yourName}
             `
            })
            setMessageWasSent(true)

        } else {
            setFormDisabled(false)
            setFormError(true)
            await freezeThreadAndWait(200)
            setFormError(false)
            await freezeThreadAndWait(200)
            setFormError(true)
            await freezeThreadAndWait(200)
            setFormError(false)
        }
    }


    const getButtonColor = useMemo(() => {
        if (messageWasSent) {
            return 'success'
        } else if (formError) {
            return 'error'
        } else {
            return 'primary'
        }
    }, [messageWasSent, formError])




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
            aria-autocomplete={'both'}
            onSubmit={(e: FormEvent) => {
                e?.preventDefault()
                messageWasSent ? unlockForm() : sendEmailCallback()
            }}
            sx={{
                width: '100%'
            }}
        >
            <Stack
                maxWidth={'1000px'}
                justifyContent={'center'}
                flexWrap={'wrap'}
                alignItems={'baseline'}
                rowGap={0}
            >

                <Stack
                    flexDirection={'column'}
                    rowGap={0}
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
                        autoComplete={'email'}
                        value={yourEmail}
                        onChange={(event) =>
                            setYourEmail(event.target.value)}
                    />


                </Stack>



                <Stack
                    flexDirection={'column'}
                    flex={2}
                    rowGap={0}
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

                    <Stack
                        sx={{
                            position: 'relative'
                        }}>
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
                            sx={{width: '100%'}}
                        />

                        {messageWasSent && <Stack sx={{
                            position: 'absolute',
                            top: 0,
                            height: '40%'
                        }}>
                            <Typography
                                variant={'body1'}
                                color={mainTheme.palette.success.main}
                                fontWeight={'400'}
                            >Your message has been sent. Thank you.</Typography>
                        </Stack>}

                    </Stack>


                    <TextField
                        disabled={formDisabled}
                        label={'Your name'}
                        autoComplete={'given-name'}
                        value={yourName}
                        onChange={(event) =>
                            setYourName(event.target.value)}
                    />


                    <Button
                        color={getButtonColor}
                        type={'submit'}
                        sx={{my: '2rem'}}
                        size={'large'}
                    >{messageWasSent ? 'OK' : 'SEND'}</Button>

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
