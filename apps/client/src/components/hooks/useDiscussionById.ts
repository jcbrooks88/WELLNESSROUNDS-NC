import { gql, useQuery } from "@apollo/client";

export const GET_DISCUSSION_BY_ID = gql`
  query GetDiscussionById($id: ID!) {
    getDiscussionById(id: $id) {
      _id
      title
      content
      keywords
      author {
        username
      }
    }
  }
`;

export const useDiscussionById = (id: string) => {
  const { data, loading, error } = useQuery(GET_DISCUSSION_BY_ID, {
    variables: { id },
  });

  return {
    discussion: data?.getDiscussionById,
    loading,
    error,
  };
};

// Apollo Hook for Single Discussion