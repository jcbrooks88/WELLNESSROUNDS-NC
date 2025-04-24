import { gql } from '@apollo/client';

export const CREATE_DISCUSSION = gql`
  mutation CreateDiscussion($title: String!, $content: String!) {
    createDiscussion(title: $title, content: $content) {
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
