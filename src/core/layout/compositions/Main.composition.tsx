import { mainTheme }     from '@/core/layout/styles/theme'
import { ThemeProvider } from '@mui/material'
import localFont         from 'next/font/local'
import Head              from 'next/head'
import { ReactNode }     from 'react'




const font = localFont({
    src: [{
        path: '../styles/fonts/Mona-Sans-Light.woff2', weight: '400', style: 'normal'
    }, {
        path: '../styles/fonts/Mona-Sans-Medium.woff2', weight: '700', style: 'normal'
    }]
})



export const MainComposition = ({children}: { children: ReactNode }): JSX.Element => {
    return <main className={font.className}>

        <Head>
            <title>Atomic Contept</title>
            <meta name="description" content="Digital services"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <ThemeProvider theme={mainTheme}>
            {children}
        </ThemeProvider>
    </main>
}
