import { isProductionEnv } from '@msalek/utils'




export const googleAnalyticsScriptLoader = (): void => {
    if (!isProductionEnv(true)) return undefined

    const __next = document.querySelector('#__next')
    const script1 = document.createElement('script')
    script1.defer = true
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-KTZFFWKZ41'

    const script2 = document.createElement('script')
    script2.innerHTML = 'window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'G-KTZFFWKZ41\');'

    __next?.append(script1)
    __next?.append(script2)

}
