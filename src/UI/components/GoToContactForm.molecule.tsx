import { InfoTextBlockMolecule } from '@/src/UI/components/InfoTextBlock.molecule'
import { Typography }            from '@mui/material'
import Button                    from '@mui/material/Button'
import { ReactElement }          from 'react'




type Props = {
    objectOfInterest: string
}
export const GoToContactFormMolecule = ({objectOfInterest}: Props): ReactElement => {


    return <><Typography variant="h3">Do you want to talk? Use the link below to ask for a details. We will respond to you as soon as possible. </Typography>

        <InfoTextBlockMolecule data={[
            {
                content: <Button size={'large'} fullWidth={true}>I have question about {objectOfInterest}</Button>
            },
            {
                content: <Button size={'large'} fullWidth={true}>I want to ask a general question</Button>
            }
        ]}/>
    </>
}
