import jwt from 'jsonwebtoken';

interface UserPayload {
  _id: string;
  email: string;
  username: string;
}

export const generateToken = (user: UserPayload): string => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.TOKEN_EXPIRES_IN || '4h';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: user._id, email: user.email },
    secret,
    { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] }
  );
};
