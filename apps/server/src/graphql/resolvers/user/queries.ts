import { AuthenticationError } from "apollo-server-express";
import { User } from "../../../mongoDB/models/User.js";
import Discussion from "../../../mongoDB/models/Discussion.js";

export const userQueries = {
  user: async (_: any, __: any, context: any) => {
    if (!context.user) throw new AuthenticationError("You must be logged in.");
    const user = await User.findById(context.user._id).select("_id username email");
    if (!user) throw new Error("User not found.");
    return user;
  },

  me: async (_: any, __: any, context: any) => {
    if (!context.user) throw new AuthenticationError("You must be logged in.");
    const user = await User.findById(context.user._id).lean();
    if (!user) throw new Error("User not found.");
    const discussions = await Discussion.find({ author: user._id }).lean();
    return {
      ...user,
      discussions,
    };
  }
};
