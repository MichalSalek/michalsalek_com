import { createTheme }      from '@mui/material'
import { blueGrey, indigo } from '@mui/material/colors'




export const mainTheme = createTheme({
    palette: {
        primary: {
            main: indigo[600]
        }
    },
    typography: {
        fontFamily: [
            'Mona Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
        ].join(','),
        fontSize: 10,
        allVariants: {
            color: indigo[900]
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                caption: {
                    opacity: 0.8,
                    fontSize: 8,
                    color: indigo[50]
                }
            }
        },
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
            }
        }
    }
})
