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

    return new ApolloClient({
        // connectToDevTools: IS_BROWSER,
        // ssrMode: !IS_BROWSER, // Disables forceFetch on the server (so queries are only run once)
        link: httpLink,
        cache: new InMemoryCache().restore(initialState || {})
    });
}