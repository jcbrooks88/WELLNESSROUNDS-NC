import { gql } from '@apollo/client';

export const GET_DISCUSSIONS = gql`
  query {
    getDiscussions {
      _id
      title
      content
      createdAt
      keywords
      author {
        username
      }
    }
  }
`;

export const GET_DISCUSSION_BY_ID = gql`
  query GetDiscussionByID($id: ID!) {
    getDiscussionByID(id: $id) {
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

export const SEARCH_DISCUSSIONS_QUERY = gql`
  query {
    searchDiscussions {
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
