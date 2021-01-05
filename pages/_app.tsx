import { ApolloProvider } from '@apollo/client';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider as JotaiProvider } from 'jotai';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { use100vh } from 'react-div-100vh';
import styled from 'styled-components';
import { Spacer60 } from '../components/atoms/Spacer';
import MyAppBar from '../components/templates/MyAppBar';
import { MyColors } from '../const/MyColors';
import "../css/background.css";
import { createClient } from '../graphQL/ApolloClient';

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

    const _height = use100vh()
    const height = _height ? _height : '100vh'

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);


    const renderClientSide = (client: any) => {
        if (!client) return
        return (<ThemeProvider theme={theme}>
            <JotaiProvider>
                <ApolloProvider client={client}>
                    <Flex>
                        <MyAppBar />
                        <Component {...pageProps} />
                    </Flex>
                </ApolloProvider>
            </JotaiProvider>
        </ThemeProvider>)
    }
    return (
        <React.Fragment>
            <Head>
                <title>Study Room</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="https://d3ljbqx864ivof.cloudfront.net" />
                <meta name="twitter:title" content="Study Room" />
                <meta name="twitter:description" content="勉強に集中をしたい人向けの勉強管理ツール" />
                <meta name="twitter:image" content='https://planmaker.s3-ap-northeast-1.amazonaws.com/ogp/studyroom_ogp.png' />
            </Head>
            <Background style={{ height: height }}>
                {renderClientSide(client)}
            </Background>
        </React.Fragment>
    );
}

const Flex = styled.div`
display : flex;
flex-grow: 2;
flex-direction: column;
overflow:hidden;
overscroll-behavior: contain;
-webkit-overflow-scrolling: contain;
`

const Background = styled.div`
  background-color: ${MyColors.background};
  position: relative;
  z-index: 1;
  background-position: 50%;
  background-size: cover;
  overflow:hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: contain;
  touch-action: none;
`