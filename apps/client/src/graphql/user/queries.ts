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
      aboutMe
      avatarUrl
      workHistory
      profileComments {
        id
        text
        author {
          username
        }
      }
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
  mutation AddProfileComment($username: String!, $text: String!) {
    addProfileComment(username: $username, text: $text) {
      _id
      text
      author {
        username
      }
    }
  }
`;
