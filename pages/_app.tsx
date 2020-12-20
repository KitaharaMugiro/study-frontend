import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import MyAppBar from '../components/templates/MyAppBar';
import { createClient } from '../graphQL/ApolloClient';
import { ApolloProvider } from '@apollo/client';
import "../css/background.css"
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MyColors } from '../const/MyColors';
import { Provider as JotaiProvider } from 'jotai'
import { Spacer60 } from '../components/atoms/Spacer';
import Utils from '../models/logics/Utils';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: MyColors.theme,
            contrastText: "#fff"
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

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
            <ThemeProvider theme={theme}>
                <JotaiProvider>
                    <ApolloProvider client={client}>
                        <MyAppBar />

                        <Spacer60 />
                        <Flex>
                            <Component {...pageProps} />
                        </Flex>
                    </ApolloProvider>
                </JotaiProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

const Flex = styled.div`
display : flex;
flex-grow: 2;

`