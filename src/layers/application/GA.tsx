import { isProductionEnv } from '@msalek/utils'
import { ReactElement }    from 'react'




export const GA = (): ReactElement | null =>
    isProductionEnv(true) ? <>
        <script
            defer
            src="https://www.googletagmanager.com/gtag/js?id=G-KTZFFWKZ41"
        />

        <script
            id={'GA-init'}
            dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-KTZFFWKZ41');`
            }}/>

    </> : null

