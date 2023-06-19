import { CompanyNameAtom }                   from '@/src/UI/components/CompanyName.atom'
import ContactMailIcon                       from '@mui/icons-material/ContactMail'
import AppBar                                from '@mui/material/AppBar'
import Box                                   from '@mui/material/Box'
import Button                                from '@mui/material/Button'
import IconButton                            from '@mui/material/IconButton'
import Toolbar                               from '@mui/material/Toolbar'
import Typography                            from '@mui/material/Typography'
import useScrollTrigger                      from '@mui/material/useScrollTrigger'
import Link                                  from 'next/link'
import React, { cloneElement, ReactElement } from 'react'
import scss                                  from 'src/UI/components/app-bar/appBar.module.scss'




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
                <AppBar className={scss.navbar}>
                    <Toolbar>
                        <Link href="/">
                            <Button
                                variant={'text'}
                                size="large"
                                sx={{padding: 0}}
                            >
                                <Typography
                                    variant="h6"
                                    noWrap
                                >
                                    <CompanyNameAtom fullName={true}/>
                                </Typography>
                            </Button>
                        </Link>

                        <Box sx={{flex: 1}}/>

                        <Link href="/src/pages/contact">
                            <IconButton
                                size="large"
                                color={'primary'}

                            >
                                <ContactMailIcon/>
                            </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </>
    )
}