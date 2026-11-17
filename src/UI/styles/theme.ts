import { appColors, appStyles } from '@/src/UI/styles/constants'
import { createTheme }                                   from '@mui/material/styles'
import { Theme }                                         from '@mui/system'




export const mainTheme: Theme = createTheme({
    palette:    {
        primary:   {
            main: appColors.main
        },
        secondary: {
            main: appColors.secondary
        }
    },
    typography: {
        ...appStyles.appFontFamily,
        fontSize:    12,
        allVariants: {
            color: appColors.main
        },
        h1:          {
            fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            fontWeight: '600',
            marginTop: '1rem',
            marginBottom: '1rem'
        },
        h2:          {
            fontSize: 'clamp(2rem, 3vw, 2.75rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginTop: '5rem',
            marginBottom: '1rem',
            fontWeight: '600'
        },
        h3:          {
            fontSize:                        '1.3rem',
            fontWeight:                      '500',
            marginBottom:                    '1rem'
        },
        caption:     {
            opacity:  0.8,
            fontSize: 6,
            color:    appColors.mainLight
        },
        body1:       {
            fontSize:                        'clamp(1rem, 1.3vw, 1.1rem)',
            fontWeight:                      '400',
            color:                           appColors.secondary,
            marginTop:                       '2rem'
        },
        body2:       {
            fontSize:                        '1rem',
            color:                           appColors.secondary,
            marginTop:                       '0.3rem'
        }
    },
    components: {
        MuiStack: {
            styleOverrides: {root: {
                minHeight: '100%', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'row', flexWrap: 'wrap', columnGap: '32px', rowGap: '16px'
            }}
        },
        MuiDivider:       {
            styleOverrides: {
                root: {
                    margin: '5rem'
                }
            }
        },
        MuiButton:        {
            defaultProps:   {
                variant: 'outlined'
            },
            styleOverrides: {
                root: {
                    alignItems: 'flex-end'
                }
            }
        },
        MuiInputBase:     {
            styleOverrides: {
                root: {
                    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: appColors.main
                }
            }
        },
        MuiCard:          {
            styleOverrides: {
                root: {
                    minWidth: 'min(310px, 100%)',
                    maxWidth: 375,
                    width:    '100%'
                }
            }
        },
        MuiTypography:    {
            styleOverrides: {
                root: {
                    '&.MuiTypography-button': {
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        padding:     '0.5rem 1rem'
                    }
                }
            }
        }
    }
})
