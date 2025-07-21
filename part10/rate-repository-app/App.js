import Main from "./src/components/Main";
import {StatusBar} from 'expo-status-bar'
import {NativeRouter} from "react-router-native";
import {ApolloProvider} from "@apollo/client";
import createApolloClient from './src/utils/apolloClient';
import Constants from "expo-constants";

const apolloClient = createApolloClient();

export default function App() {
    console.log('Config: ', Constants.expoConfig)
    return (
        <>
            <NativeRouter>
                <ApolloProvider client={apolloClient}>
                    <Main/>
                </ApolloProvider>
            </NativeRouter>
            <StatusBar style={'auto'}/>
        </>
    );
}
