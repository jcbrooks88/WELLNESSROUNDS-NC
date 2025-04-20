import client from './apolloClient';
import { DocumentNode } from "@apollo/client";

export const graphqlMutation = async (
mutation: DocumentNode, variables: Record<string, any> = {}) => {
  try {
    const result = await client.mutate({
      mutation,
      variables,
      context: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    return result.data;
  } catch (error) {
    console.error("GraphQL Mutation Error:", error);
    throw error;
  }
};
