import { gql } from "@apollo/client";

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
