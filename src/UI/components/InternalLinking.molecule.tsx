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


const ButtonWithProps = ({href, content}: { href: AppRoutes, content: string }): ReactElement =>
    <Button
        size={'large'}
        fullWidth={true}>
        <AppLinkAtom
            href={href}>
            {content}
        </AppLinkAtom>
    </Button>


export const InternalLinkingMolecule = ({itemsToShow}: Props): ReactElement => {
    const router = useRouter()

    const showThisPathLink = (itemToShow: AppRoutes): boolean => itemsToShow
        .filter(path => path !== router.pathname) // Guard to not show a current router internal link.
        .includes(itemToShow)



    return <aside>
        <Typography variant={'h3'}>See how we can help you with other creative areas</Typography>

        <InfoTextBlockMolecule data={[


            showThisPathLink('/software/architecture') && {
                heading: <>Read about <strong>architecture</strong> solutions:</>,
                content: <ButtonWithProps href={'/software/architecture'} content={'Software architecture'}/>
            },


            showThisPathLink('/software/backend') && {
                heading: <>Try our <strong>backend</strong> services:</>,
                content: <ButtonWithProps href={'/software/backend'} content={'Server solutions'}/>
            },


            showThisPathLink('/software/frontend') && {
                heading: <>Check out <strong>frontend</strong> services:</>,
                content: <ButtonWithProps href={'/software/frontend'} content={'User Interface solutions'}/>
            },


            showThisPathLink('/sound/soundtracks') && {
                heading: <>Check out <strong>sound and music making</strong> services:</>,
                content: <ButtonWithProps href={'/sound/soundtracks'} content={'backtracks and soundtracks'}/>
            },


            showThisPathLink('/sound/studio') && {
                heading: <>Read about <strong>mix and mastering</strong> studio services:</>,
                content: <ButtonWithProps href={'/sound/studio'} content={'Music studio serviecs'}/>
            }


        ].filter(Boolean) as InfoTextBlockMoleculeData}/>
    </aside>
}
