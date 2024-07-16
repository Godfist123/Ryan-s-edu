import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from "./constants";

// Create an HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
});

// Create an authentication link to add the authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create a custom link to remove __typename from variables
const removeTypenameLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: string, value: any) =>
      key === "__typename" ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation);
});

// Combine the links
const link = ApolloLink.from([authLink, removeTypenameLink, httpLink]);

// Initialize the Apollo Client
export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});
