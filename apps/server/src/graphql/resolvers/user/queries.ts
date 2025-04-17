import { AuthenticationError } from "apollo-server-express";
import { Comment } from "../../../mongoDB/models/Comment.js";
import Discussion from "../../../mongoDB/models/Discussion.js";
import { User } from "../../../mongoDB/models/User.js";

export const userQueries = {
  me: async (_: any, __: any, context: any) => {
    if (!context.user) throw new AuthenticationError("You must be logged in.");

    const user = await User.findById(context.user._id).lean();
    if (!user) throw new Error("User not found.");

    const comments = await Comment.find({ author: user._id }).populate("post", "_id title").lean();
    const discussions = await Discussion.find({ author: user._id }).lean();

    return {
      ...user,
      comments,
      discussions,
    };
  },
};
