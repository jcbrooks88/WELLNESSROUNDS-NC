import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
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
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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
