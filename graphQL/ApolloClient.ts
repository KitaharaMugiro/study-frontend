import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from "isomorphic-unfetch";

const IS_BROWSER = !!process.browser;
if (!IS_BROWSER) {
    global.fetch = fetch;
}

const URI_ENDPOINT = "https://mojybntbl2.execute-api.ap-northeast-1.amazonaws.com/dev/graphql";
//const URI_ENDPOINT = "http://localhost:5000/dev/graphql";

export function createClient(initialState: any) {
    return new ApolloClient({
        // connectToDevTools: IS_BROWSER,
        // ssrMode: !IS_BROWSER, // Disables forceFetch on the server (so queries are only run once)
        link: new HttpLink({
            uri: URI_ENDPOINT, // Server URL (must be absolute)
        }),
        cache: new InMemoryCache().restore(initialState || {})
    });
}