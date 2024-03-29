import { brown, indigo } from '@mui/material/colors'




export const appColors = {
    main:             indigo[900],
    mainLight:        indigo[50],
    secondary:        brown[900],
    transparentWhite: 'rgba(255,255,255,0.85)',
    white:            '#fff'
} as const

export const appStyles = {
    cardBoxShadow: {boxShadow: '14px 14px 0px -6px #000000'},
    appFontFamily: {
        fontFamily: [
                        'Mona Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
                    ].join(',')
    }
} as const

export const appBreakpoints = {
    md: '600px',
    lg: '900px',
    xl: '1200px',

} as const
type Breakpoint = keyof typeof appBreakpoints
export const getBreakpointMediaQuery = (breakpoint: Breakpoint) => `@media (min-width:${appBreakpoints[breakpoint]})`
