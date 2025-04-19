import { gql } from 'apollo-server-express';

export const discussionTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
  }

  type Discussion {
    _id: ID!
    title: String!
    content: String!
    keywords: [String!]!
    author: User!
  }

  type Query {
    getDiscussions: [Discussion]
  }

  type Mutation {
    createDiscussion(title: String!, content: String!, keywords: [String!]!): Discussion
  }
`;

