import { discussionResolvers } from './discussions/discussionResolver.js';
//import { commentResolvers } from './comments/commentResolver.js';
import { userResolvers } from './user/index.js';
//import postResolvers from './posts/postResolver.js';

export const resolvers = {
  ...discussionResolvers,
  //...commentResolvers,
  ...userResolvers,
  //...postResolvers,
};
