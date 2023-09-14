import { brown, indigo } from '@mui/material/colors'




export const appColors = {
    main: indigo[900],
    mainLight: indigo[50],
    secondary: brown[900],
    transparentWhite: 'rgba(255,255,255,0.85)',
    white: '#fff'
} as const

export const appStyles = {
    cardBoxShadow: {boxShadow: '14px 14px 0px -6px #000000'}
} as const