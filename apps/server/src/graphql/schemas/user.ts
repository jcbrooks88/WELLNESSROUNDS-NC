import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String!
    discussions: [Discussion]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    user: User
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
  }
`;
