import { createTheme }   from '@mui/material'
import { brown, indigo } from '@mui/material/colors'




export const mainTheme = createTheme({
    palette: {
        primary: {
            main: indigo[900]
        },
        secondary: {
            main: brown[900]
        }
    },
    typography: {
        allVariants: {
            color: indigo[900]
        },
        fontFamily: [
            'Mona Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
        ].join(','),
        fontSize: 12,
        h1: {
            fontSize: '12vw',
            '@media (min-width:600px)': {
                fontSize: '7vw'
            },
            '@media (min-width:900px)': {
                fontSize: '5vw'
            },
            '@media (min-width:1200px)': {
                fontSize: '4rem'
            },
            marginTop: '1rem'
        },
        h2: {
            fontSize: '8vw',
            '@media (min-width:600px)': {
                fontSize: '4vw'
            },
            '@media (min-width:900px)': {
                fontSize: '3vw'
            },
            '@media (min-width:1200px)': {
                fontSize: '2rem'
            },
            marginTop: '3rem'
        },
        h3: {
            fontSize: '4vw',
            '@media (min-width:600px)': {
                fontSize: '2.2vw'
            },
            '@media (min-width:900px)': {
                fontSize: '1.8vw'
            },
            '@media (min-width:1200px)': {
                fontSize: '1.3rem'
            },
            marginBottom: '1rem'
        },
        caption: {
            opacity: 0.8,
            fontSize: 7,
            color: indigo[50],
            filter: `drop-shadow(0px 0px 0.5px ${indigo[900]})`
        },
        body1: {
            color: brown[900],
            marginTop: '0.5rem'
        },
        body2: {
            color: brown[900]
        },
        button: {
            fontSize: '0.6rem',
            color: indigo[50]
        }
    },
    components: {
        MuiStack: {
            defaultProps: {
                minHeight: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 4,
                rowGap: 2

            }
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            },
            styleOverrides: {
                root: {
                    alignItems: 'flex-end'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    width: 310
                }
            }
        }
    }
})
