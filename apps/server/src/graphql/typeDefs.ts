import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    token: String
  }

  type Post {
    _id: ID!
    content: String!
    author: User!
  }

  type Query {
    me: User
    posts: [Post]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    createPost(content: String!): Post
  }
`;
