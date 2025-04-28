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
  query GetUserProfile {
    me {
      _id
      username
      firstName
      lastName
      email
      aboutMe
      avatarUrl
      discussions {
        _id
        title
        createdAt
      }
      workHistory {
        _id
        position
        company
        startDate
        endDate
        description
      }
      profileComments {
        _id
        text
        author {
          _id
          username
          avatarUrl
        }
      }
    }
  }
`;
