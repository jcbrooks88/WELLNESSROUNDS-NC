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

// Mutation: Update "About Me" section
export const UPDATE_ABOUT_ME = gql`
  mutation UpdateAboutMe($aboutMe: String!) {
    updateAboutMe(aboutMe: $aboutMe) {
      _id
      aboutMe
    }
  }
`;

// Mutation: Upload new avatar
export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      avatarUrl
    }
  }
`;

// Mutation: Add a comment to user's profile
export const ADD_PROFILE_COMMENT = gql`
  mutation AddProfileComment($userId: ID!, $text: String!) {
    addProfileComment(userId: $userId, text: $text) {
      _id
      text
      author {
        username
      }
    }
  }
`;

export const UPDATE_USER_PROFILE_FIELD = gql`
  mutation UpdateUserProfileField($input: UpdateUserFieldInput!) {
    updateUserProfileField(input: $input) {
      success
      message
      updatedUser {
        username
        location
        role
      }
    }
  }
`;
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      _id
      username
      location
      role
      aboutMe
    }
  }
`;
