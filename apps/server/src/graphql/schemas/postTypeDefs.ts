import { gql } from "apollo-server-express";

export const postTypeDefs = gql`
  type Post {
    _id: ID!
    content: String!
    author: User!
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    createPost(content: String!): Post
  }
`;
