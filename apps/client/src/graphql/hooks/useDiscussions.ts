import { useQuery } from "@apollo/client";
import { GET_DISCUSSIONS } from "../queries/getDiscussions";
import { Discussion } from "../types/discussion";

interface GetDiscussionsResponse {
  getDiscussions: Discussion[];
}

export const useDiscussions = () => {
  const { data, loading, error } = useQuery<GetDiscussionsResponse>(GET_DISCUSSIONS);
  return {
    discussions: data?.getDiscussions || [],
    loading,
    error,
  };
};
