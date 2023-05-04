import { MainComposition } from '@/src/core/layout/compositions/Main.composition'
import '@/src/core/layout/styles/globals.scss'
import type { AppProps }   from 'next/app'




export type GeneralPageProps = { title: string }
export default function App({Component, pageProps}: AppProps<GeneralPageProps>) {

    return <>

        <MainComposition title={pageProps.title}>
            <Component {...pageProps} />
        </MainComposition>

    </>
}
