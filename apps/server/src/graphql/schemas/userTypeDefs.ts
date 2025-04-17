import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

   type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }

  extend type Mutation {
    register(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User!
  }
`;
