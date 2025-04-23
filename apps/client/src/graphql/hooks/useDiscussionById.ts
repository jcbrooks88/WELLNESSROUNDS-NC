import { useQuery } from "@apollo/client";
import { GET_DISCUSSION_BY_ID } from "../queries/getDiscussionById";
import { Discussion } from "../types/discussion";

interface GetDiscussionByIdResponse {
  getDiscussionById: Discussion;
}

export const useDiscussionById = (id: string) => {
  const { data, loading, error } = useQuery<GetDiscussionByIdResponse>(GET_DISCUSSION_BY_ID, {
    variables: { id },
  });

  return {
    discussion: data?.getDiscussionById,
    loading,
    error,
  };
};
