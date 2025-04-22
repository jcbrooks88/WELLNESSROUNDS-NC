import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../../mongoDB/models/User.js';
import { generateRefreshToken } from '../../../utils/generateToken.js';

const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';

const Query = {
  me: async (_: any, __: any, context: { user: { id: string } }) => {
    if (!context.user) throw new Error('Not authenticated');
    return await User.findById(context.user.id);
  }
};

const Mutation = {
  register: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
    const user = new User({ username, email, password });
    await user.save();

    const token = generateRefreshToken({ _id: user._id, email: user.email, username: user.username });
    const refreshToken = jwt.sign({ _id: user._id }, REFRESH_SECRET, { expiresIn: '7d' });

    return { ...user.toObject(), token, user };
  },

  login: async (_: any, { email, password }: { email: string; password: string }, { res }: { res: any }) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('No user found with this email');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Incorrect password');

    const token = generateRefreshToken({ _id: user._id, email: user.email, username: user.username });
    const refreshToken = jwt.sign({ _id: user._id }, REFRESH_SECRET, { expiresIn: '7d' });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // change to true in production with HTTPS
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { ...user.toObject(), token, user };
  },

  refreshAccessToken: async (_: any, __: any, { req }: { req: import('express').Request; res: import('express').Response }) => {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error('No refresh token found');

    try {
      const decoded = jwt.verify(token, REFRESH_SECRET) as { _id: string };
      const user = await User.findById(decoded._id);
      if (!user) throw new Error('User not found');

      const newAccessToken = generateRefreshToken({ _id: user._id, email: user.email, username: user.username });

      return { ...user.toObject(), token: newAccessToken, user };
    } catch (err) {
      throw new Error('Invalid or expired refresh token');
    }
  }
};

export const userResolver = {
  Query,
  Mutation
};
