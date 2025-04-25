import { useQuery, useMutation } from '@apollo/client';
import { GET_DISCUSSIONS } from '../graphql/discussion/queries';
import { CREATE_DISCUSSION } from '../graphql/discussion/mutations';
import { GET_DISCUSSION_BY_ID } from '../graphql/discussion/queries';


export const getDiscussionByID = (id?: string) =>
  useQuery(GET_DISCUSSION_BY_ID, {
    variables: { id },
    skip: !id,
  });


export function useDiscussions() {
  const { data, loading, error } = useQuery(GET_DISCUSSIONS);
  return { discussions: data?.getDiscussions || [], loading, error };
}

export function useCreateDiscussion() {
  return useMutation(CREATE_DISCUSSION);
}