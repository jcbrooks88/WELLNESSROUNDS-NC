import { ApolloClient, InMemoryCache } from '@apollo/client';
import { DocumentNode } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});

export const graphqlMutation = async (
  mutation: DocumentNode,
  variables: Record<string, any> = {}
) => {
  try {
    const result = await client.mutate({
      mutation,
      variables,
    });
    return result.data;
  } catch (error) {
    console.error("GraphQL Mutation Error:", error);
    throw error;
  }
};

