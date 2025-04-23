import { gql } from "@apollo/client";

export const GET_DISCUSSIONS = gql`
  query {
    getDiscussions {
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
