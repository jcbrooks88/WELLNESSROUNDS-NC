import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    discussions: [Discussion!]!
  }

   type AuthPayload {
    _id: ID!
    username: String!
    email: String!
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    refreshAccessToken: AuthPayload!
    register(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthPayload!
  }
`;
