import { NextRouter, useRouter }          from 'next/router'
import { useCallback, useEffect, useRef } from 'react'




export const useRouteChangeTransitionController = () => {
    const router: NextRouter = useRouter()

    const element = useRef(typeof document === 'object' ? document.querySelector('#main-app-content-box') : null)

    const handleStart = useCallback(() => {
        element.current?.classList.add('app-routing-transition')
    }, [])

    const handleStop = useCallback(() => {
        setTimeout(() => {
            element.current?.classList.remove('app-routing-transition')
        }, 50)
    }, [])

    useEffect(() => {
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)
        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [handleStart, handleStop, router])

}
