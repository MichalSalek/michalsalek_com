import { AppRoutes }                                        from '@/src/layers/core/routes.config'
import { AppLinkAtom }                                      from '@/src/UI/components/_atoms/AppLink.atom'
import { InfoTextBlockMolecule, InfoTextBlockMoleculeData } from '@/src/UI/components/InfoTextBlock.molecule'
import { Typography }                                       from '@mui/material'
import Button                                               from '@mui/material/Button'
import { useRouter }                                        from 'next/router'
import { ReactElement }                                     from 'react'




type Props = {
    itemsToShow: AppRoutes[]
}


export const InternalLinkingMolecule = ({itemsToShow}: Props): ReactElement => {
    const router = useRouter()

    const showThisPathLink = (itemToShow: AppRoutes): boolean => itemsToShow
        .filter(path => path !== router.pathname) // Guard to not show a current router internal link.
        .includes(itemToShow)



    return <aside>
        <Typography variant={'h3'}>See how we can help your business with other software areas</Typography>

        <InfoTextBlockMolecule data={[


            showThisPathLink('/software/architecture') && {
                heading: <>Read about <strong>architecture</strong> solutions:</>,
                content: <Button size={'large'}><AppLinkAtom href={'/software/architecture'}>Software architecture</AppLinkAtom></Button>
            },


            showThisPathLink('/software/backend') && {
                heading: <>Try our <strong>backend</strong> services:</>,
                content: <Button size={'large'}><AppLinkAtom href={'/software/backend'}>Server solutions</AppLinkAtom></Button>
            },


            showThisPathLink('/software/frontend') && {
                heading: <>Check out <strong>frontend</strong> services:</>,
                content: <Button size={'large'}><AppLinkAtom href={'/software/frontend'}>User Interface solutions</AppLinkAtom></Button>
            }


        ].filter(Boolean) as InfoTextBlockMoleculeData}/>
    </aside>
}
