import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  scalar Upload

  type User {
    _id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String!
    discussions: [Discussion]
    aboutMe: String
    avatarUrl: String
    workHistory: [String]
    profileComments: [ProfileComment]
  }

  type ProfileComment {
    _id: ID!
    text: String!
    author: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    user(username: String!): User
  }

  type Mutation {
    register(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthPayload

    login(email: String!, password: String!): AuthPayload

    refreshAccessToken: AuthPayload

    updateAboutMe(aboutMe: String!): User

    uploadAvatar(file: Upload!): User

    addProfileComment(username: String!, text: String!): ProfileComment
  }
`;
