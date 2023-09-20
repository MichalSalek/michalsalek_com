import { AppRoute }    from '@/src/layers/core/routes.config'
import { AppLinkAtom } from '@/src/UI/components/AppLink.atom'
import { appColors, appStyles } from '@/src/UI/styles/constants'
import { mainTheme }            from '@/src/UI/styles/theme'
import Button                      from '@mui/material/Button'
import Typography              from '@mui/material/Typography'
import { ReactElement, ReactNode } from 'react'




export const LinkButtonAtom = ({href, content}: { href: AppRoute, content: string | ReactNode }): ReactElement =>
    <AppLinkAtom
        href={href}>
        <Button
            variant={'contained'}
            fullWidth
            sx={{
                display: 'inline-block',
                backgroundColor: appColors.white,
                color: mainTheme.palette.secondary.main,
                borderWidth: '1px',
                borderColor: 'transparent',
                borderStyle: 'solid',
                '&:hover': {
                    color: appColors.white,
                    borderColor: appColors.white
                },
                ...appStyles.cardBoxShadow
            }}
        >{content}</Button>
    </AppLinkAtom>
