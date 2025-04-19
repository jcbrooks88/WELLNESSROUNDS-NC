import { gql, useMutation } from "@apollo/client";

export const CREATE_DISCUSSION = gql`
  mutation CreateDiscussion($title: String!, $content: String!, $keywords: [String!]!) {
    createDiscussion(title: $title, content: $content, keywords: $keywords) {
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

export const useCreateDiscussion = () => {
  const [createDiscussionMutation, { data, loading, error }] = useMutation(CREATE_DISCUSSION);

  const createDiscussion = async ({
    title,
    content,
    keywords,
  }: {
    title: string;
    content: string;
    keywords: string[];
  }) => {
    try {
      const result = await createDiscussionMutation({
        variables: { title, content, keywords },
      });
      return result.data?.createDiscussion;
    } catch (err) {
      console.error("Failed to create discussion:", err);
      throw err;
    }
  };

  return { createDiscussion, data, loading, error };
};
