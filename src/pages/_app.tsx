import { MainComposition } from '@/core/layout/compositions/Main.composition'
import '@/core/layout/styles/globals.scss'
import type { AppProps }   from 'next/app'




export default function App({Component, pageProps}: AppProps) {
    return <>

        <MainComposition>
            <Component {...pageProps} />
        </MainComposition>

    </>
}
