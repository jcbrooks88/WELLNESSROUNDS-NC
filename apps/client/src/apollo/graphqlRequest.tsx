import client from '../apollo/apolloClient';
import { DocumentNode } from "@apollo/client";

export const graphqlRequest = async (
  query: DocumentNode,
  variables: Record<string, any> = {},
  context: { headers?: Record<string, string> } = {}
) => {
  try {
    const result = await client.query({
      query,
      variables,
      context,
      fetchPolicy: "no-cache",
    });
    return result.data;
  } catch (error) {
    console.error("GraphQL Request Error:", error);
    throw error;
  }
};