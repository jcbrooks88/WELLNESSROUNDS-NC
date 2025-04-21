import { AuthenticationError } from "apollo-server-express";
import { GraphQLError } from "graphql";
import { generateToken } from "../../../utils/generateToken.js";
import { User } from "../../../mongoDB/models/User.js";
import bcrypt from "bcrypt";


export const userMutations = {
  register: async (_: any, { username, firstName, lastName, email, password }: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return newUser;
  },

  login: async (_: any, { email, password }: { email: string; password: string }) => {
    const user = await User.findOne({ email });
    if (!user || !(await (user as any).isCorrectPassword(password))) {
      throw new AuthenticationError("Invalid credentials");
    }

    const token = generateToken({ _id: user._id.toString(), username: user.username, email: user.email });
    return { ...user.toObject(), token };
  },
};

