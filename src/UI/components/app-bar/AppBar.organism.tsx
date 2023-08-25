import { AppLinkAtom }                       from '@/src/UI/components/AppLink.atom'
import { CompanyNameAtom }                   from '@/src/UI/components/CompanyName.atom'
import { mainTheme }                         from '@/src/UI/styles/theme'
import ContactMailIcon                       from '@mui/icons-material/ContactMail'
import AppBar                                from '@mui/material/AppBar'
import Box                                   from '@mui/material/Box'
import Button                                from '@mui/material/Button'
import IconButton                            from '@mui/material/IconButton'
import Toolbar                               from '@mui/material/Toolbar'
import Typography                            from '@mui/material/Typography'
import useScrollTrigger                      from '@mui/material/useScrollTrigger'
import React, { cloneElement, ReactElement } from 'react'

import scss from './appBar.module.scss'




const ElevationScroll = ({children}: { children: ReactElement }): ReactElement => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold:         0
    })

    return cloneElement(children, {
        elevation: trigger ? 1 : 0
    })
}

export const AppBarOrganism = (): ReactElement => {

    return (
        <>
            <ElevationScroll>
                <AppBar
                    className={scss.host}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter:  'blur(5px) saturate(160%) contrast(45%) brightness(140%)',
                        borderTop:       `4px solid ${mainTheme.palette.primary.main}`
                    }}>
                    <Toolbar
                        sx={{
                            padding: '0 !important'
                        }}
                    >
                        <AppLinkAtom href="/">
                            <Button
                                variant={'text'}
                                size="large"
                                sx={{px: 2, py: 3, color: mainTheme.palette.primary.main}}
                            >
                                <CompanyNameAtom fullName={true}/>
                            </Button>
                        </AppLinkAtom>

                        <Box sx={{flex: 1}}/>

                        <AppLinkAtom href="/contact">
                            <IconButton
                                color={'primary'}
                                sx={{px: 2, py: 2}}
                            >
                                <Typography
                                    variant="button"
                                    noWrap
                                    sx={{mr: 1}}
                                >
                                    contact
                                </Typography>
                                <ContactMailIcon/>
                            </IconButton>
                        </AppLinkAtom>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </>
    )
}