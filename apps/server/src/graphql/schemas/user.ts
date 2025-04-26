import { gql } from "apollo-server-express";

export const userTypeDefs = gql`

  type User {
    _id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String!
    discussions: [Discussion]
    aboutMe: String
    avatarUrl: String
    workHistory: [WorkHistory]
    profileComments: [ProfileComment]
  }

  type WorkHistory {
  _id: ID!
  position: String!
  company: String!
  startDate: String
  endDate: String
  description: String
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

    addProfileComment(username: String!, text: String!): ProfileComment
  }
`;
