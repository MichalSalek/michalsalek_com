import { AppRoutes }    from '@/src/layers/core/routes.config'
import { AppLinkAtom }  from '@/src/UI/components/AppLink.atom'
import Button           from '@mui/material/Button'
import { ReactElement } from 'react'




export const LinkButtonAtom = ({href, content}: { href: AppRoutes, content: string }): ReactElement =>
    <AppLinkAtom
        href={href}><Button
        size={'large'}
        fullWidth={true}>
        {content}
    </Button></AppLinkAtom>
