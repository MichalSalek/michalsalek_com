import { GeneralPageProps } from '@/src/pages/_app'
import { BreadcrumbsAtom }  from '@/src/UI/components/breadcrumbs/Breadcrumbs.atom'
import { FooterPartial }    from '@/src/UI/partials/Footer.partial'
import { HeaderPartial }    from '@/src/UI/partials/Header.partial'
import { mainTheme }        from '@/src/UI/styles/theme'
import { ThemeProvider }    from '@mui/material'
import Box                  from '@mui/material/Box'
import Container            from '@mui/material/Container'
import localFont            from 'next/font/local'
import Head                 from 'next/head'
import { ReactElement }     from 'react'




const font = localFont({
    src: [{
        path: '../styles/fonts/Mona-Sans-Light.woff2', weight: '400', style: 'normal'
    }, {
        path: '../styles/fonts/Mona-Sans-Medium.woff2', weight: '700', style: 'normal'
    }]
})


type Props = {
    children: ReactElement,
} & GeneralPageProps


export const MainComposition = ({children, title}: Props): ReactElement => {

    const getTitle = (): string => title ? '– ' + title : ''

    return <main className={font.className} style={{marginTop: '7rem'}}>

        <Head>
            <title>{String('Atomic Concept ' + getTitle())}</title>
            <meta name="description" content="Digital services"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <ThemeProvider theme={mainTheme}>

            <HeaderPartial/>

            <Box sx={{minHeight: '100vh'}}>

                <Container><BreadcrumbsAtom/></Container>


                {children}
            </Box>

            <FooterPartial/>

        </ThemeProvider>
    </main>
}
