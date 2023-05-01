import { FooterPartial } from '@/src/core/layout/partials/Footer.partial'
import { HeaderPartial } from '@/src/core/layout/partials/Header.partial'
import { mainTheme }     from '@/src/core/layout/styles/theme'
import { ThemeProvider } from '@mui/material'
import Box               from '@mui/material/Box'
import localFont         from 'next/font/local'
import Head              from 'next/head'
import { ReactNode }     from 'react'
import scss              from './main.module.scss'




const font = localFont({
    src: [{
        path: '../styles/fonts/Mona-Sans-Light.woff2', weight: '400', style: 'normal'
    }, {
        path: '../styles/fonts/Mona-Sans-Medium.woff2', weight: '700', style: 'normal'
    }]
})



export const MainComposition = ({children}: { children: ReactNode }): JSX.Element => {
    return <main className={[font.className, scss.host].join(' ')}>

        <Head>
            <title>Atomic Contept</title>
            <meta name="description" content="Digital services"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <ThemeProvider theme={mainTheme}>

            <HeaderPartial/>

            <Box sx={{minHeight: '100vh'}}>
                {children}
            </Box>

            <FooterPartial/>

        </ThemeProvider>
    </main>
}
