import bcrypt from "bcrypt"; // 👈 Add this to the top
import { User } from '../../../mongoDB/models/User.js';
import { generateToken } from '../../../utils/generateToken.js';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, context: { user: { id: string } }) => {
      if (!context.user) throw new Error('Not authenticated');
      return await User.findById(context.user.id);
    }
  },

  Mutation: {
    register: async (
      _: any,
      { username, email, password }: { username: string; email: string; password: string }
    ) => {
      const user = new User({ username, email, password });
      await user.save();

      const token = generateToken({
        _id: user._id.toString(),
        email: user.email as string,
        username: user.username as string,
      });

      return { ...user.toObject(), token };
    },

    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('No user found with this email');

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Incorrect password');

        const token = generateToken({
          _id: user._id.toString(),
          email: user.email as string,
          username: user.username as string,
        });

        return { ...user.toObject(), token };
      } catch (err) {
        console.error("Login error:", err);
        throw new Error("Server error during login");
      }
    }
  }
};
