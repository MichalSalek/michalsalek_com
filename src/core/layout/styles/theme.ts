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
        caption: {
            opacity: 0.8,
            fontSize: 7,
            color: indigo[50],
            filter: `drop-shadow(0px 0px 1px ${indigo[500]})`
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
                gap: 5
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
        }
    }
})
