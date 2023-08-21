import { AppRoutes }               from '@/src/layers/core/routes.config'
import { AppLinkAtom }             from '@/src/UI/components/AppLink.atom'
import { Typography }              from '@mui/material'
import { ReactElement, ReactNode } from 'react'




export const LinkButtonAtom = ({href, content}: { href: AppRoutes, content: string | ReactNode }): ReactElement =>
    <AppLinkAtom
        href={href}>
        <Typography
            variant={'button'}
            width={'100%'}
            component={'span'}
            display={'block'}
            textAlign={'center'}
            color={'inherit'}>
            {content}
        </Typography>
    </AppLinkAtom>
