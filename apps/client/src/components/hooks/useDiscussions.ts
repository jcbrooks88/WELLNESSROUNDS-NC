import { gql, useQuery } from "@apollo/client";

export const GET_DISCUSSIONS = gql`
  query {
    getDiscussions {
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

export const useDiscussions = () => {
  const { data, loading, error } = useQuery(GET_DISCUSSIONS);
  return {
    discussions: data?.getDiscussions || [],
    loading,
    error,
  };
};
