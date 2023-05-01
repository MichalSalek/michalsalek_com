import { MainComposition } from '@/src/core/layout/compositions/Main.composition'
import '@/src/core/layout/styles/globals.scss'
import type { AppProps }   from 'next/app'




export default function App({Component, pageProps}: AppProps) {
    return <>

        <MainComposition>
            <Component {...pageProps} />
        </MainComposition>

    </>
}
