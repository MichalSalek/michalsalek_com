import { AppRoutes }             from '@/src/layers/core/routes.config'
import { InfoTextBlockMolecule } from '@/src/UI/components/InfoTextBlock.molecule'
import { LinkButtonAtom }        from '@/src/UI/components/LinkButton.atom'
import { Typography }            from '@mui/material'
import { ReactElement }          from 'react'




type Props = {
    objectOfInterest: string
}
export const GoToContactFormMolecule = ({objectOfInterest}: Props): ReactElement => {


    return <><Typography variant="h3">Do you want to talk? Use the link below to ask for a details. We will respond to you as soon as possible. </Typography>

        <InfoTextBlockMolecule data={[
            {
                content: <LinkButtonAtom content={`I have question about ${objectOfInterest}`} href={`/contact?about=${objectOfInterest}`}/>
            },
            {
                content: <LinkButtonAtom content={`I want to ask a general question`} href={'/contact'}/>
            }
        ]}/>
    </>
}
