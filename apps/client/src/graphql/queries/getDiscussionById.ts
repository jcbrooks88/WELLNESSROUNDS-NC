import { gql } from "@apollo/client";

export const GET_DISCUSSION_BY_ID = gql`
  query GetDiscussionById($id: ID!) {
    getDiscussionById(id: $id) {
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
