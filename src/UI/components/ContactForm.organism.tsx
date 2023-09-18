import { sendEmail }                                                    from '@/src/layers/application/email'
import { ContactFormFeedbackAtom }                                      from '@/src/UI/components/ContactFormFeedback.atom'
import { useFakeLoadingHook }                                           from '@/src/UI/hooks/useFakeLoading.hook'
import { useStateBlinking }                                             from '@/src/UI/hooks/useStateBlinking.hook'
import { mainTheme }                                                    from '@/src/UI/styles/theme'
import { freezeThreadAndWait }                                          from '@msalek/utils'
import Button                                                           from '@mui/material/Button'
import CircularProgress                                                 from '@mui/material/CircularProgress'
import FormControl                                                      from '@mui/material/FormControl'
import Stack                                                            from '@mui/material/Stack'
import TextField                                                        from '@mui/material/TextField'
import { useRouter }                                                    from 'next/router'
import React, { FormEvent, ReactElement, useEffect, useMemo, useState } from 'react'




const ContactFormOrganism = (): ReactElement => {

    const router = useRouter()
    const {about} = router.query
    const passedEmailSubject = about ? `[ ${about as string} ]` : ''

    const [yourEmail, setYourEmail] = useState('')
    const [yourName, setYourName] = useState('')
    const [subject, setSubject] = useState(passedEmailSubject)
    const [text, setText] = useState('')

    const isFormValid = useMemo(() => Boolean(subject && text), [subject, text])

    const clearFormAction = () => {
        setSubject('')
        setText('')
    }


    const [formDisabled, setFormDisabled] = useState(false)
    const [isMessageSuccessfullySent, setIsMessageSuccessfullySent] = useState(true)
    const [showFeedbackInfo, setShowFeedbackInfo] = useState(false)


    const {
        loading,
        setLoading,
        loadingProgressValue,
        resetLoadingProgressValue
    } = useFakeLoadingHook()


    const [disableButtonAction, setDisableButtonAction] = useState(false)

    const {booleanSwitch: formError, setBooleanSwitch: setFormError, doBlinkingAnimation: doErrorAnimation} = useStateBlinking()

    const unlockFormAction = async () => {
        setShowFeedbackInfo(false)
        setFormDisabled(false)
        await freezeThreadAndWait(100)
        isMessageSuccessfullySent && clearFormAction()
        setFormError(false)
        resetLoadingProgressValue()
    }


    const submitHandler = async () => {
        setFormDisabled(true)
        if (!isFormValid) {
            setFormDisabled(false)
            await doErrorAnimation()
            return void undefined
        }

        setDisableButtonAction(true)
        setLoading(true)
        await freezeThreadAndWait(700)

        try {
            await sendEmail({
                subject, replyTo: yourEmail, text, signature: yourName
            })

            setIsMessageSuccessfullySent(true)

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


    const {booleanSwitch: subjectAttention, doBlinkingAnimation: doSubjectAttentionAnimation} = useStateBlinking()

    useEffect(() => {
        if (!passedEmailSubject) return void undefined
        setTimeout(doSubjectAttentionAnimation, 800)
    }, [doSubjectAttentionAnimation, passedEmailSubject])


    return <FormControl
        component={'form'}
        onSubmit={async (e: FormEvent) => {
            e?.preventDefault()
            showFeedbackInfo ? await unlockFormAction() : await submitHandler()
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
                    sx={subjectAttention ? {filter: `drop-shadow(0px 0px 1px ${mainTheme.palette.info.main})`} : undefined}
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
                    variant={showFeedbackInfo ? 'contained' : undefined}
                    sx={{
                        my:            '2rem',
                        height:        '3rem',
                        alignItems:    'center',
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
}

export default ContactFormOrganism