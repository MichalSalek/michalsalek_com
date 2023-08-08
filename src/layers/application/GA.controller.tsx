import { isProductionEnv }                           from '@msalek/utils'
import { ReactElement, useEffect, useRef, useState } from 'react'




export const GAController = (): null => {

    const runOnce = useRef(false)

    useEffect(() => {
        if (!isProductionEnv(true)) return () => undefined
        if (runOnce.current) return () => undefined
        runOnce.current = true

        const __next = document.querySelector('#__next')
        const script1 = document.createElement('script')
        script1.defer = true
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-KTZFFWKZ41'

        const script2 = document.createElement('script')
        script2.innerHTML = 'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'G-KTZFFWKZ41\');'


        setTimeout(() => {

            __next?.append(script1)
            __next?.append(script2)


        }, 500)

    }, [])

    return null
}
