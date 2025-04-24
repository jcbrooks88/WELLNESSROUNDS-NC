import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink,} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI, // Make sure this is set in .env
  credentials: "include", // Allow cookies to be sent (useful for refresh tokens)
});

// Auth link to add token to Authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Export a factory function to create the Apollo Client
export const createApolloClient = () =>
  new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });
