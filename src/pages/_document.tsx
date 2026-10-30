import Document, { Head, Html, Main, NextScript, type DocumentContext, type DocumentProps } from 'next/document';
import { DocumentHeadTags, documentGetInitialProps, type DocumentHeadTagsProps } from '@mui/material-nextjs/v16-pagesRouter';

export default class SiteDocument extends Document<DocumentProps & DocumentHeadTagsProps> {
    static async getInitialProps(ctx: DocumentContext) {
        return documentGetInitialProps(ctx);
    }
    render() {
        const locale = this.props.__NEXT_DATA__.props.pageProps.locale ?? 'en';
        return <Html lang={locale}>
            <Head><DocumentHeadTags {...this.props}/></Head>
            <body><Main/><NextScript/></body>
        </Html>;
    }
}
