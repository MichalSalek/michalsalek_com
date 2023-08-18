import { ErrorTrackerLoadScript }       from '@/src/layers/application/ErrorTracker'
import { Head, Html, Main, NextScript } from 'next/document'




export default function Document() {
    return (<Html lang="en">
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        <ErrorTrackerLoadScript/>
        </body>
    </Html>)
}
