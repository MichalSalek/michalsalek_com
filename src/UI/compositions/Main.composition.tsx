import { GeneralPageProps } from '@/src/pages/_app'
import { BreadcrumbsAtom }  from '@/src/UI/components/breadcrumbs/Breadcrumbs.atom'
import { FooterPartial }    from '@/src/UI/partials/Footer.partial'
import { HeaderPartial }    from '@/src/UI/partials/Header.partial'
import { mainTheme }        from '@/src/UI/styles/theme'
import Box                  from '@mui/material/Box'
import Container            from '@mui/material/Container'
import CssBaseline          from '@mui/material/CssBaseline'
import { ThemeProvider }    from '@mui/material/styles'
import localFont            from 'next/font/local'
import Head                 from 'next/head'
import { ReactElement }     from 'react'




// const font = localFont({
//     src:      [{
//         path: '../styles/fonts/Mona-Sans-Bold.woff2', weight: '400', style: 'normal'
//     }, {
//         path: '../styles/fonts/Mona-Sans-Medium.woff2', weight: '600', style: 'bold'
//     }],
//     display:  'swap',
//     fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol']
// })


type Props = {
    children: ReactElement,
} & GeneralPageProps


export const MainComposition = ({children, title}: Props): ReactElement => {

    const getTitle = (): string => title ? '– ' + title : ''

    return <>

        <CssBaseline/>

        <main
            // className={font.className}
            style={{marginTop: '7rem'}}>

            <Head>
                <title>{String('Atomic Concept ' + getTitle())}</title>
                <meta name="description" content="Digital services"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <ThemeProvider theme={mainTheme}>

                <HeaderPartial/>

                <Container maxWidth={'xl'}>
                    <Box sx={{minHeight: '100vh'}} component={'section'} id={'main-app-content-box'}>

                        <Container><BreadcrumbsAtom/></Container>

                        {children}
                    </Box>

                </Container>

                <FooterPartial/>

            </ThemeProvider>

        </main>
    </>
}
