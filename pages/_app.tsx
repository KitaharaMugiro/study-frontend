import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import MyAppBar from '../components/templates/MyAppBar';
import Spacer from '../components/atoms/Spacer';
import { createClient } from '../graphQL/ApolloClient';
import { ApolloProvider } from '@apollo/client';
import "../css/background.css"

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;
    const [client, setClient] = useState<any>(null)
    useEffect(() => {
        const client = createClient(null)
        setClient(client)
    }, [])

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);


    if (client === null) return "wait"
    console.log(client)
    return (
        <React.Fragment>
            <Head>
                <title>My page</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <MyAppBar />
            <Spacer space={50} />
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </React.Fragment>
    );
}
