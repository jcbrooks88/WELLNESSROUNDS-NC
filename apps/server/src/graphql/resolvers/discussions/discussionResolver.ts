import Discussion from '../../../mongoDB/models/Discussion.js';

export const discussionResolvers = {
  Query: {
    discussions: async () => Discussion.find().populate('author'),
    getDiscussion: async (_: any, { id }: { id: string }) =>
      Discussion.findById(id).populate('author'),
    searchDiscussions: async (_: any, { title, keywords }: { title: string; keywords: string[] }) =>
      Discussion.find({
        title: { $regex: title, $options: 'i' },
        keywords: { $in: keywords },
      }),
  },
  Mutation: {
    createDiscussion: async (
      _: any,
      { title, content, keywords }: { title: string; content: string; keywords: string[] },
      context: any
    ) => {
      const username = context.user?.username;
      const author = context.user?._id;
      return Discussion.create({ title, content, keywords, username, author });
    },
  },
};
