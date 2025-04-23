import { useMutation } from "@apollo/client";
import { CREATE_DISCUSSION } from "../mutations/createDiscussion";
import { CreateDiscussionInput, CreateDiscussionResponse } from "../types/discussion";

export const useCreateDiscussion = () => {
  const [createDiscussionMutation, { data, loading, error }] = useMutation<
    CreateDiscussionResponse,
    CreateDiscussionInput
  >(CREATE_DISCUSSION);

  const createDiscussion = async (input: CreateDiscussionInput) => {
    try {
      const result = await createDiscussionMutation({ variables: input });
      return result.data?.createDiscussion;
    } catch (err) {
      console.error("❌ Failed to create discussion:", err);
      throw err;
    }
  };

  return { createDiscussion, data, loading, error };
};
