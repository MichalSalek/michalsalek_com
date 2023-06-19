import { MainComposition }   from '@/src/UI/compositions/Main.composition'
import '@/src/UI/styles/globals.scss'
import { NextComponentType } from 'next/dist/shared/lib/utils'
import React                 from 'react'




export type GeneralPageProps = { title: string }

type Props = {
    Component: any | NextComponentType<GeneralPageProps>
    pageProps: GeneralPageProps
}

const App = ({Component, pageProps}: Props) => {

    return <>

        <MainComposition title={pageProps.title}>

            <Component {...pageProps}/>

        </MainComposition>

    </>
}

export default App
