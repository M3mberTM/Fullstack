import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from "expo-constants";

const {apolloUri} = Constants.expoConfig.extra
const createApolloClient = () => {
  return new ApolloClient({
    uri: `${apolloUri}/graphql`,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;