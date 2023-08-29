import { AppLinkAtom }                        from '@/src/UI/components/AppLink.atom'
import { CompanyNameAtom }                    from '@/src/UI/components/CompanyName.atom'
import { appColors }                          from '@/src/UI/styles/colors'
import { mainTheme }                          from '@/src/UI/styles/theme'
import Container              from '@mui/material/Container'
import Typography              from '@mui/material/Typography'
import Stack                                  from '@mui/material/Stack'
import React, { CSSProperties, ReactElement } from 'react'




export const FooterPartial = (): ReactElement => {

    const singleLinkStyle: CSSProperties | { [key: string]: CSSProperties } = {
        color:          appColors.white,
        textDecoration: 'underline',
        '&:hover':      {
            fontWeight: 'bold'
        }
    }

    return <>
        <Stack mt={30} pb={1}
               component={'footer'}
               sx={{
                   background: mainTheme.palette.primary.main,
                   color:      'white'
               }}>

            <Container>

                <Stack sx={{
                    alignItems:    'flex-start',
                    flexDirection: 'column'
                }}>

                    <Stack width={'100%'}>
                        <Typography variant={'body1'} style={{color: 'white'}}>
                            <CompanyNameAtom redirectOnClick={true}/>
                        </Typography>
                    </Stack>

                    <Stack alignItems={'baseline'} flexDirection={'column'} rowGap={1}>

                        <AppLinkAtom href="/software">
                            <Typography
                                variant={'body1'}
                                sx={singleLinkStyle}>
                                <strong>Software</strong> services
                            </Typography>
                        </AppLinkAtom>

                        <AppLinkAtom href="/sound">
                            <Typography
                                variant={'body1'}
                                sx={singleLinkStyle}>
                                <strong>Sound</strong> services
                            </Typography>
                        </AppLinkAtom>

                        <AppLinkAtom href="/contact">
                            <Typography
                                variant="body1"
                                sx={singleLinkStyle}>
                                <strong>Contact</strong> form
                            </Typography>
                        </AppLinkAtom>

                    </Stack>



                    <Stack width={'100%'} mt={'2rem'}>
                        <Typography
                            variant={'body2'}
                            fontFamily={'verdana'}
                            color={appColors.transparentWhite}
                            fontSize={'0.7rem'}
                        >Atomic Concept - Michał Sałek | VAT PL9442267029</Typography>
                    </Stack>

                </Stack>
            </Container>
        </Stack>
    </>
}
// zrobić niebieski underscore dla linków