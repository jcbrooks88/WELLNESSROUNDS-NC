import Discussion from '../../../mongoDB/models/Discussion.js';

export const discussionResolvers = {
  Query: {
    // Returns all discussions
    getDiscussions: async () => {
      return await Discussion.find().populate('author');
    },

    // Returns a single discussion by ID
    getDiscussionByID: async (_: any, { id }: { id: string }) => {
      return await Discussion.findById(id).populate('author');
    },

    // Search by title and/or keywords
    searchDiscussions: async (
      _: any,
      { title, keywords }: { title?: string; keywords?: string[] }
    ) => {
      const filters = [];
      if (title) {
        filters.push({ title: { $regex: title, $options: 'i' } });
      }
      if (keywords && keywords.length > 0) {
        filters.push({ keywords: { $in: keywords } });
      }

      const query = filters.length > 0 ? { $or: filters } : {};
      return await Discussion.find(query).populate('author');
    },
  },

  Mutation: {
    createDiscussion: async (
      _: any,
      { title, content, keywords }: { title: string; content: string; keywords: string[] },
      context: any
    ) => {
      const username = context.user?.username;
      const author = context.user?._id;

      if (!author) {
        throw new Error('Authentication required');
      }

      return await Discussion.create({ title, content, keywords, author });
    },
  },
};
