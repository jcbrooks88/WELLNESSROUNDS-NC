import { AuthenticationError } from "apollo-server-express";
import { GraphQLError } from "graphql";
import { generateToken } from "../../../utils/generateToken.js";
import { User } from "../../../mongoDB/models/User.js";

export const userMutations = {
  register: async (_: any, { username, email, password, firstName, lastName }: any) => {
    const user = await User.create({ username, email, password, firstName, lastName });

    const token = generateToken({ _id: user._id.toString(), username: user.username, email: user.email });
    return { ...user.toObject(), token };
  },

  login: async (_: any, { email, password }: { email: string; password: string }) => {
    const user = await User.findOne({ email });
    if (!user || !(await (user as any).isCorrectPassword(password))) {
      throw new AuthenticationError("Invalid credentials");
    }

    const token = generateToken({ _id: user._id.toString(), username: user.username, email: user.email });
    return { ...user.toObject(), token };
  },

  updateAbout: async (_: any, { about }: { about: string }, context: any) => {
    if (!context.user) throw new GraphQLError("Unauthorized");
    return await User.findByIdAndUpdate(context.user._id, { about }, { new: true });
  },
};
