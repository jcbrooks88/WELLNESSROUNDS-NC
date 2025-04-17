import { Comment } from '../../../mongoDB/models/Comment.js';

export const commentResolvers = {
  Query: {
    getCommentsByPost: async (_: any, { postId }: { postId: string }) =>
      Comment.find({ post: postId }).sort({ createdAt: -1 }),
  },
  Mutation: {
    addComment: async (
      _: any,
      { postId, content, username }: { postId: string; content: string; username: string }
    ) => {
      return Comment.create({ post: postId, content, username });
    },
  },
};
