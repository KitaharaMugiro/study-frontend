import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import fetch from "isomorphic-unfetch";

const IS_BROWSER = !!process.browser;
if (!IS_BROWSER) {
    global.fetch = fetch;
}

const URI_ENDPOINT = "https://mojybntbl2.execute-api.ap-northeast-1.amazonaws.com/dev/graphql";
//const URI_ENDPOINT = "http://localhost:5000/dev/graphql";

export function createClient(initialState: any) {
    const httpLink = new HttpLink({
        uri: URI_ENDPOINT, // Server URL (must be absolute)
    })

    const mock = "ws://localhost:4000"
    const wsUrl = "ws://subsc-publi-56p3fp6993ag-1378467411.ap-northeast-1.elb.amazonaws.com"
    const wsLink = new WebSocketLink({
        uri: mock,
        options: {
            reconnect: true
        }
    });
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );
    return new ApolloClient({
        // connectToDevTools: IS_BROWSER,
        // ssrMode: !IS_BROWSER, // Disables forceFetch on the server (so queries are only run once)
        link: splitLink,
        cache: new InMemoryCache().restore(initialState || {})
    });
}