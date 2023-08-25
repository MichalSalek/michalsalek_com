import { AppRoutes }                                        from '@/src/layers/core/routes.config'
import { InfoTextBlockMoleculeLazy }                        from '@/src/UI/components/_lazyComponents.aggregate'
import { InfoTextBlockMoleculeData } from '@/src/UI/components/InfoTextBlock.molecule'
import { LinkButtonAtom }                                   from '@/src/UI/components/LinkButton.atom'
import { Typography }                                       from '@mui/material'
import { useRouter }                                        from 'next/router'
import { ReactElement }                                     from 'react'




export type InternalLinkingMoleculeProps = {
    itemsToShow?: AppRoutes[]
}




const InternalLinkingMolecule = ({itemsToShow}: InternalLinkingMoleculeProps): ReactElement | null => {
    const router = useRouter()

    if (!itemsToShow) return null

    const showThisPathLink = (itemToShow: AppRoutes): boolean => itemsToShow
        .filter(path => path !== router.pathname) // Guard to not show a current router internal link.
        .includes(itemToShow)


    return <aside>
        <Typography variant="h3">See how we can help you</Typography>
        <Typography variant="body2" mb={5}>with other creative areas</Typography>


        <InfoTextBlockMoleculeLazy data={[


            showThisPathLink('/software/architecture') && {
                heading: <>Read about <strong>architecture</strong> solutions:</>,
                content: <LinkButtonAtom href={'/software/architecture'} content={'Software architecture'}/>
            },


            showThisPathLink('/software/backend') && {
                heading: <>Try our <strong>backend</strong> services:</>,
                content: <LinkButtonAtom href={'/software/backend'} content={'Server solutions'}/>
            },


            showThisPathLink('/software/frontend') && {
                heading: <>Check out <strong>frontend</strong> services:</>,
                content: <LinkButtonAtom href={'/software/frontend'} content={'User Interface solutions'}/>
            },


            showThisPathLink('/sound/soundtracks') && {
                heading: <>Check out <strong>sound and music making</strong> services:</>,
                content: <LinkButtonAtom href={'/sound/soundtracks'} content={'backtracks and soundtracks'}/>
            },


            showThisPathLink('/sound/studio') && {
                heading: <>Read about <strong>mix and mastering</strong> studio services:</>,
                content: <LinkButtonAtom href={'/sound/studio'} content={'Music studio serviecs'}/>
            }


        ].filter(Boolean) as InfoTextBlockMoleculeData}/>
    </aside>
}

export default InternalLinkingMolecule
