import { appColors, appStyles } from '@/src/UI/styles/constants'
import { createTheme }          from '@mui/material/styles'
import { Theme }                from '@mui/system'





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
            fontSize:                    '12vw',
            '@media (min-width:600px)':  {
                fontSize: '7vw'
            },
            '@media (min-width:900px)':  {
                fontSize: '5vw'
            },
            '@media (min-width:1200px)': {
                fontSize: '4rem'
            },
            marginTop:                   '1rem',
            marginBottom:                '1rem'
        },
        h2:          {
            fontSize:                    '8vw',
            '@media (min-width:600px)':  {
                fontSize: '4vw'
            },
            '@media (min-width:900px)':  {
                fontSize: '3vw'
            },
            '@media (min-width:1200px)': {
                fontSize: '2.5rem'
            },
            marginTop:                   '5rem',
            marginBottom:                '1rem',
            fontWeight:                  '400'
        },
        h3:          {
            fontSize:                    '5vw',
            fontWeight:                  '500',
            '@media (min-width:600px)':  {
                fontSize: '2.5vw'
            },
            '@media (min-width:900px)':  {
                fontSize: '2vw'
            },
            '@media (min-width:1200px)': {
                fontSize: '1.3rem'
            },
            marginBottom:                '1rem'
        },
        caption:     {
            opacity:  0.8,
            fontSize: 6,
            color:    appColors.mainLight,
            filter:   `drop-shadow(0px 0px 0.5px ${appColors.main})`
        },
        body1:       {
            fontSize:                    '4.2vw',
            '@media (min-width:600px)':  {
                fontSize: '2.2vw'
            },
            '@media (min-width:900px)':  {
                fontSize: '1.8vw'
            },
            '@media (min-width:1200px)': {
                fontSize: '1.1rem'
            },
            fontWeight:                  '400',
            color:                       appColors.secondary,
            marginTop:                   '2rem'
        },
        body2:       {
            fontSize:                    '4vw',
            '@media (min-width:600px)':  {
                fontSize: '2vw'
            },
            '@media (min-width:900px)':  {
                fontSize: '1.6vw'
            },
            '@media (min-width:1200px)': {
                fontSize: '1rem'
            },
            color:                       appColors.secondary,
            marginTop:                   '0.3rem'
        }
    },
    components: {
        MuiDivider:       {
            styleOverrides: {
                root: {
                    margin: '5rem'
                }
            }
        },
        MuiContainer:     {
            defaultProps: {

                // @ts-ignore
                component: 'section'
            }
        },
        MuiStack:         {
            defaultProps: {
                minHeight:      '100%',
                alignItems:     'center',
                justifyContent: 'center',
                flexDirection:  'row',
                flexWrap:       'wrap',
                columnGap:      4,
                rowGap:         2,

                // @ts-ignore
                component: 'section'
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
                    minWidth: 310,
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
