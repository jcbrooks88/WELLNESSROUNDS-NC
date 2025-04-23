import { gql } from "@apollo/client";

export const SEARCH_DISCUSSIONS_QUERY = gql`
  query SearchDiscussions($title: String, $keywords: [String!]) {
    searchDiscussions(title: $title, keywords: $keywords) {
      _id
      title
      content
      createdAt
      author {
        username
      }
    }
  }
`;
