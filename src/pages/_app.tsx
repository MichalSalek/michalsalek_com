import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import localFont         from 'next/font/local'




const font = localFont({src: [
    {
      path: '../../public/fonts/Mona-Sans-Light.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Mona-Sans-Medium.woff2',
      weight: '700',
      style: 'normal',
    }
  ]})

export default function App({Component, pageProps}: AppProps) {
    return <main className={font.className}>
            <Component {...pageProps} />
        </main>
}
