import { gql, useMutation } from "@apollo/client";

// Define the mutation
export const CREATE_DISCUSSION = gql`
  mutation CreateDiscussion($title: String!, $content: String!, $keywords: [String!]!) {
    createDiscussion(title: $title, content: $content, keywords: $keywords) {
      _id
      title
      content
      keywords
      createdAt
      author {
        username
      }
    }
  }
`;

// Define input and response types
interface CreateDiscussionInput {
  title: string;
  content: string;
  keywords: string[];
}

interface CreateDiscussionResponse {
  createDiscussion: {
    _id: string;
    title: string;
    content: string;
    keywords: string[];
    createdAt: string;
    author: {
      username: string;
    };
  };
}

export const useCreateDiscussion = () => {
  const [createDiscussionMutation, { data, loading, error }] = useMutation<
    CreateDiscussionResponse,
    CreateDiscussionInput
  >(CREATE_DISCUSSION);

  const createDiscussion = async (input: CreateDiscussionInput) => {
    try {
      const result = await createDiscussionMutation({
        variables: input,
      });

      return result.data?.createDiscussion;
    } catch (err) {
      console.error("❌ Failed to create discussion:", err);
      throw err;
    }
  };

  return {
    createDiscussion,
    data,
    loading,
    error,
  };
};
