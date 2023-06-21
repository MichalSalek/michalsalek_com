import { AppLinkAtom }                       from '@/src/UI/components/_atoms/AppLink.atom'
import { CompanyNameAtom }                   from '@/src/UI/components/CompanyName.atom'
import ContactMailIcon                       from '@mui/icons-material/ContactMail'
import AppBar                                from '@mui/material/AppBar'
import Box                                   from '@mui/material/Box'
import Button                                from '@mui/material/Button'
import IconButton                            from '@mui/material/IconButton'
import Toolbar                               from '@mui/material/Toolbar'
import Typography                            from '@mui/material/Typography'
import useScrollTrigger                      from '@mui/material/useScrollTrigger'
import React, { cloneElement, ReactElement } from 'react'




const ElevationScroll = ({children}: { children: ReactElement }): ReactElement => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    })

    return cloneElement(children, {
        elevation: trigger ? 1 : 0
    })
}

export const AppBarOrganism = (): ReactElement => {

    return (
        <>
            <ElevationScroll>
                <AppBar sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px) saturate(160%) contrast(45%) brightness(140%)'
                }}>
                    <Toolbar
                        sx={{padding: '0 !important'}}
                    >
                        <AppLinkAtom href="/">
                            <Button
                                variant={'text'}
                                size="large"
                                sx={{padding: 0}}
                            >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    sx={{p: 3}}
                                >
                                    <CompanyNameAtom fullName={true}/>
                                </Typography>
                            </Button>
                        </AppLinkAtom>

                        <Box sx={{flex: 1}}/>

                        <AppLinkAtom href="/contact">
                            <IconButton
                                size="large"
                                color={'primary'}
                                sx={{p: 3, borderRadius: 0}}
                            >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    sx={{mx: 3}}
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