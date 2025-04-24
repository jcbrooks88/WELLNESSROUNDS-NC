import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../mongoDB/models/User.js";
import { generateAccessToken, generateRefreshToken } from "../../../utils/generateToken.js";
import { ENV } from "../../../utils/configLoader.js";

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
  }
};
