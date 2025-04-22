import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Users {
    users {
      _id
      username
      email
    }
  }
`;

export const GET_DISCUSSIONS = gql`
  query {
    getDiscussions {
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

export const GET_DISCUSSION_BY_ID = gql`
  query GetDiscussionById($id: ID!) {
    getDiscussion(id: $id) {
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

