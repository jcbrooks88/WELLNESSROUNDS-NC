import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}

`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken {
    refreshAccessToken {
      token
    }
  }
`;
