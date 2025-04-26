import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Users {
    user {
      _id
      username
      email
      discussions {
        _id
        title
        content
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      _id
      username
      email
      discussions {
        _id
        title
        content
      }
    }
  }
`;

// Fetch user profile by username
export const GET_USER_PROFILE = gql`
  query GetUserProfile($username: String!) {
    user(username: $username) {
      _id
      username
      firstName
      lastName
      email
      aboutMe
      avatarUrl
      workHistory {
        position
        description
        company
        startDate
        endDate
      }
      profileComments {
        _id
        text
        author {
          username
        }
      }
    }
  }
`;

