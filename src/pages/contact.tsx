import { sendEmail }                                                       from '@/src/layers/application/email'
import { GeneralPageProps }                                                from '@/src/pages/_app'
import { ContactFormFeedbackAtom }                                         from '@/src/UI/components/ContactFormFeedback.atom'
import { ContentBlockOrganism }                                            from '@/src/UI/components/ContentBlock.organism'
import { useFakeLoadingHook }                                              from '@/src/UI/hooks/useFakeLoading.hook'
import { freezeThreadAndWait }                                             from '@msalek/utils'
import { CircularProgress, Container, FormControl, TextField, Typography } from '@mui/material'
import Button                                                              from '@mui/material/Button'
import Stack                                                               from '@mui/material/Stack'
import React, { FormEvent, useMemo, useState }                             from 'react'




const PAGE_TITLE = 'Contact with us'

export default function Page() {


    const [yourEmail, setYourEmail] = useState('')
    const [yourName, setYourName] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')

    const isFormValid = useMemo(() => Boolean(subject && text), [subject, text])

    const clearFormAction = () => {
        setSubject('')
        setText('')
    }


    const [formDisabled, setFormDisabled] = useState(false)
    const [formError, setFormError] = useState(false)

    const [isMessageSuccessfullySent, setIsMessageSuccessfullySent] = useState(true)
    const [showFeedbackInfo, setShowFeedbackInfo] = useState(false)


    const {
        loading,
        setLoading,
        loadingProgressValue,
        resetLoadingProgressValue
    } = useFakeLoadingHook()


    const [disableButtonAction, setDisableButtonAction] = useState(false)

    const unlockFormAction = async () => {
        setShowFeedbackInfo(false)
        setFormDisabled(false)
        await freezeThreadAndWait(100)
        setFormError(false)
        resetLoadingProgressValue()
    }

    const doErrorAnimationForm = async (): Promise<void> => {
        setFormError(true)
        await freezeThreadAndWait(100)
        setFormError(false)
        await freezeThreadAndWait(100)
        setFormError(true)
        await freezeThreadAndWait(200)
        setFormError(false)
        await freezeThreadAndWait(100)
        setFormError(true)
        await freezeThreadAndWait(500)
        setFormError(false)
    }

    const submitHanlder = async () => {
        setFormDisabled(true)

        if (!isFormValid) {
            setFormDisabled(false)
            await doErrorAnimationForm()
            return void undefined
        }


        setDisableButtonAction(true)
        setLoading(true)

        try {

            await sendEmail({
                subject, text: text + `
             
             *** Email to reply: ${yourEmail} ***
             
             ${yourName}
             `
            })
            await freezeThreadAndWait(700)
            setIsMessageSuccessfullySent(true)
            clearFormAction()

        } catch (e) {
            setIsMessageSuccessfullySent(false)
            setFormError(true)
        }

        setLoading(false)
        setShowFeedbackInfo(true)
        setDisableButtonAction(false)
    }


    const getButtonColor = useMemo(() => {
        if (showFeedbackInfo && isMessageSuccessfullySent) {
            return 'success'
        } else if (formError) {
            return 'error'
        } else {
            return 'primary'
        }
    }, [showFeedbackInfo, isMessageSuccessfullySent, formError])




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
            onSubmit={async (e: FormEvent) => {
                e?.preventDefault()
                showFeedbackInfo ? await unlockFormAction() : await submitHanlder()
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

                        {showFeedbackInfo && <ContactFormFeedbackAtom isSuccessfully={isMessageSuccessfullySent}/>}

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
                        sx={{
                            my: '2rem',
                            height: '3rem',
                            alignItems: 'center',
                            pointerEvents: disableButtonAction ? 'none' : 'all'
                        }}
                        size={'large'}
                    >{loading ?

                      <CircularProgress
                          thickness={20}
                          size={24}
                          color={'inherit'}
                          variant="determinate"
                          value={loadingProgressValue}
                      />


                              :

                      showFeedbackInfo ? 'OK' : 'SEND'}</Button>

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
