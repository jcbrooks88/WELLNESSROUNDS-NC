import Post from '../../../mongoDB/models/Post.js';
import mongoose from 'mongoose';

const postResolvers = {
  Query: {
    getAllPosts: async () => {
      return await Post.find()
        .populate('author')
        .populate({
          path: 'comments',
          populate: { path: 'author' },
        })
        .sort({ createdAt: -1 })
        .exec();
    },

    getPostById: async (_: any, { postId }: { postId: string }) => {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid postId');
      }

      const post = await Post.findById(postId)
        .populate('author')
        .populate({
          path: 'comments',
          populate: { path: 'author' },
        })
        .exec();

      if (!post) {
        throw new Error('Post not found');
      }

      return post;
    },
  },

  Mutation: {
    createPost: async (
      _: any,
      { content }: { content: string },
      { user }: any
    ) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      const newPost = new Post({
        content,
        username: user.username,
        author: user._id,
      });

      await newPost.save();
      await newPost.populate('author');
      return newPost;
    },

    deletePost: async (_: any, { postId }: { postId: string }, { user }: any) => {
      if (!user) {
        throw new Error('Authentication required');
      }

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new Error('Invalid postId');
      }

      const post = await Post.findById(postId);
      if (!post) throw new Error('Post not found');

      if (String(post.author) !== String(user._id)) {
        throw new Error('Unauthorized');
      }

      await post.deleteOne();
      return post;
    },
  },
};

export default postResolvers;
