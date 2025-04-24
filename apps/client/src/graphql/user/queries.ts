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

export const ME_QUERY = gql`
  query Me {
    me {
      _id
      username
      email
      discussions {
        _id
        title
      }
    }
  }
`;
