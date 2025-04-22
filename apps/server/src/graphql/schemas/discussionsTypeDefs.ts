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
    # Returns all discussions
    getDiscussions: [Discussion]

    # Returns a single discussion by ID
    getDiscussionByID(id: ID!): Discussion

    # Search discussions by title and/or keywords
    searchDiscussions(title: String, keywords: [String!]): [Discussion]
  }

  type Mutation {
    createDiscussion(title: String!, content: String!, keywords: [String!]!): Discussion
  }
`;
