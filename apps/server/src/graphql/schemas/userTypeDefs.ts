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
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): AuthPayload!
  }
`;
