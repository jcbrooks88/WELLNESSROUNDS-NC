import { userQueries } from "./queries.js";
import { userResolver } from "./mutations.js";

export const userResolvers = {
  Query: {
    ...userResolver.Query,
    ...userQueries,
    // ...otherResolvers.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    // ...otherResolvers.Mutation
  }
};
