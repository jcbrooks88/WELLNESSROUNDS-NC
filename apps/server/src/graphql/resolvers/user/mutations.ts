import { AuthenticationError } from "apollo-server-express";
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
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new AuthenticationError("Invalid credentials");
      }

      console.log("Preparing to generate token with payload:", {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
      });
      
  
      const token = generateToken({
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
      });
  
      return { ...user.toObject(), token };
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login error stack:", err.stack);
      } else {
        console.error("An unknown error occurred during login");
      }
      console.error("Login error name:", err instanceof Error ? err.name : "Unknown error");
      console.error("Login error message:", err instanceof Error ? err.message : "Unknown error");
      throw new Error("Server error during login");
    }    
  },
};


