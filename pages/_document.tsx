import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/core/styles';


type Props = {
    styleTags: any;
};

export default class MyDocument extends Document<Props> {
    static getInitialProps({ renderPage }: any) {
        const sheet = new ServerStyleSheet();

        const page = renderPage((App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        );

        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
    }

    render() {
        return (
            <Html lang="ja">
                <Head>
                    <meta charSet="utf-8" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                        data-viewport-units-buggyfill="ignore"
                    />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                        data-viewport-units-buggyfill="ignore" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        data-viewport-units-buggyfill="ignore" />

                    {this.props.styleTags}
                </Head>
                <body style={{ backgroundColor: "#f9f9f9", margin: 0, minHeight: "100vh" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
// MyDocument.getInitialProps = async (ctx) => {
//     // Resolution order
//     //
//     // On the server:
//     // 1. app.getInitialProps
//     // 2. page.getInitialProps
//     // 3. document.getInitialProps
//     // 4. app.render
//     // 5. page.render
//     // 6. document.render
//     //
//     // On the server with error:
//     // 1. document.getInitialProps
//     // 2. app.render
//     // 3. page.render
//     // 4. document.render
//     //
//     // On the client
//     // 1. app.getInitialProps
//     // 2. page.getInitialProps
//     // 3. app.render
//     // 4. page.render

//     // Render app and page and get the context of the page with collected side effects.
//     const sheets = new ServerStyleSheets();
//     const originalRenderPage = ctx.renderPage;

//     ctx.renderPage = () =>
//         originalRenderPage({
//             enhanceApp: (App: any) => (props: any) => sheets.collect(<App {...props} />),
//         });

//     const initialProps = await Document.getInitialProps(ctx);

//     return {
//         ...initialProps,
//         // Styles fragment is rendered after the app and page rendering finish.
//         styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
//     };
// };