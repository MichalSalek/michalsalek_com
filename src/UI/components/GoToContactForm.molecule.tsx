import { InfoTextBlockMoleculeLazy } from '@/src/UI/components/_lazyComponents.aggregate'
import { LinkButtonAtom }            from '@/src/UI/components/LinkButton.atom'
import Typography                from '@mui/material/Typography'
import { ReactElement }              from 'react'




type Props = {
    objectOfInterest: string
}
export const GoToContactFormMolecule = ({objectOfInterest}: Props): ReactElement => {


    return <>
        <Typography variant="h3">Do you want to talk?</Typography>
        <Typography variant="body2" mb={5}> Use the link below to ask for a details. We will respond to you as soon as possible.</Typography>


        <InfoTextBlockMoleculeLazy
            data={[
                {
                    heading: <>The article interested you?</>,
                    content: <LinkButtonAtom content={<>Ask about <strong>{' '}{objectOfInterest}</strong></>} href={`/contact?about=${objectOfInterest}`}/>
                },
                {
                    heading: <>I just have a question</>,
                    content: <LinkButtonAtom content={`General question`} href={'/contact'}/>
                }
            ]}/>
    </>
}
