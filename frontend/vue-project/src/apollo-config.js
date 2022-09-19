import { ApolloClient, InMemoryCache } from "@apollo/client/core";

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  // link: httpLink,
  cache,
  uri: import.meta.env.VITE_GRAPHQL_URI, //django graphql
  connectToDevTools: false,
});

export default apolloClient;
