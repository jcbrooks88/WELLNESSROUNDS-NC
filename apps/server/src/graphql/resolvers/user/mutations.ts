import { AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../mongoDB/models/User.js";
import { generateAccessToken, generateRefreshToken } from "../../../utils/generateToken.js";
import { ENV } from "../../../utils/configLoader.js";
import { uploadFileToStorage } from "../../../utils/uploadFileToStorage.js"; // If you have one, else remove

export const userMutations = {
  register: async (_: any, args: any, { res }: any) => {
    const { username, firstName, lastName, email, password } = args;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, firstName, lastName, email, password: hashedPassword });
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    if (res) {
      res.cookie("jid", refreshToken, {
        httpOnly: true,
        path: "/graphql",
        secure: ENV.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: accessToken,
      user: user.toObject(),
    };
  },

  login: async (_: any, { email, password }: any, { res }: any) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    if (res) {
      res.cookie("jid", refreshToken, {
        httpOnly: true,
        path: "/graphql",
        secure: ENV.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    return {
      token: accessToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  },

  refreshAccessToken: async (_: any, __: any, context: any) => {
    const token = context.req?.cookies?.jid;
    if (!token) throw new Error("No refresh token found");

    try {
      const decoded: any = jwt.verify(token, ENV.REFRESH_SECRET);
      const newAccessToken = generateAccessToken(decoded.data);
      return { token: newAccessToken };
    } catch (err) {
      console.error("Refresh token error:", err);
      throw new Error("Invalid or expired refresh token");
    }
  },

  updateAboutMe: async (_: any, { aboutMe }: any, context: any) => {
    if (!context.user) throw new AuthenticationError("You must be logged in.");
    const user = await User.findById(context.user._id);
    if (!user) throw new Error("User not found.");

    user.aboutMe = aboutMe;
    await user.save();
    return user.toObject();
  },

  uploadAvatar: async (_: any, { file }: any, context: any) => {
    if (!context.user) throw new AuthenticationError("You must be logged in.");

    const { createReadStream, filename } = await file;
    const stream = createReadStream();

    // Mock upload for now — you can replace with real S3 or Cloudinary logic
    const avatarUrl = await uploadFileToStorage(stream, filename); // if no uploadFileToStorage, mock URL

    const user = await User.findById(context.user._id);
    if (!user) throw new Error("User not found.");

    user.avatarUrl = avatarUrl;
    await user.save();
    return user.toObject();
  },

  addProfileComment: async (_: any, { username, text }: any, context: any) => {
    if (!context.user) throw new AuthenticationError("You must be logged in.");

    const targetUser = await User.findOne({ username });
    if (!targetUser) throw new Error("User not found.");

    const newComment = {
      text,
      author: context.user._id,
    };

    targetUser.profileComments.push(newComment as any);
    await targetUser.save();

    return newComment;
  }
};
