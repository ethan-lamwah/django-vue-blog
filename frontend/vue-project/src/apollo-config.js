import {
  ApolloClient,
  // createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
// import { createApolloProvider } from "@vue/apollo-option";

// HTTP connection to the API
// const httpLink = createHttpLink({
//   uri: "http://127.0.0.1:8000/graphql", // Django
// });

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  // link: httpLink,
  cache,
  uri: "http://127.0.0.1:8000/graphql",
  connectToDevTools: true,
});

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient,
// });

// export default apolloProvider;
export default apolloClient;
