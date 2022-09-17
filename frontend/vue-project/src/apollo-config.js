import { ApolloClient, InMemoryCache } from "@apollo/client/core";

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  // link: httpLink,
  cache,
  uri: "http://127.0.0.1:8000/graphql", //django graphql
  connectToDevTools: true,
});

export default apolloClient;
