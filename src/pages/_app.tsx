import { errorTrackerScriptLoader }           from '@/src/layers/application/errorTracker'
import { googleAnalyticsScriptLoader }        from '@/src/layers/application/googleAnalytics'
import { useRouteChangeTransitionController } from '@/src/layers/core/useRouteChangeTransition.controller'
import { MainComposition }                    from '@/src/UI/compositions/Main.composition'
import '@/src/UI/styles/globals.scss'
import { ControllersComposition }             from '@msalek/controllers'
import { NextComponentType }                  from 'next/dist/shared/lib/utils'




export type GeneralPageProps = { title: string }

type Props = {
    Component: any | NextComponentType<GeneralPageProps>
    pageProps: GeneralPageProps
}

const App = ({Component, pageProps}: Props) => {

    return <>

        <ControllersComposition
            userInteractionFunctions={
                [
                    googleAnalyticsScriptLoader,
                    errorTrackerScriptLoader
                ]}
            hookControllers={[
                useRouteChangeTransitionController
            ]}/>

        <MainComposition title={pageProps.title}>

            <Component {...pageProps}/>

        </MainComposition>



    </>
}

export default App
