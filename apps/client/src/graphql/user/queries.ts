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
