export const appColors = {
    main:             '#202522',
    mainLight:        '#f1f2f1',
    secondary:        '#353c38',
    transparentWhite: 'rgba(255,255,255,0.85)',
    white:            '#fff'
} as const

export const appStyles = {
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
