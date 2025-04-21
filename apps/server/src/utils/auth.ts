import jwt from 'jsonwebtoken';

export const authenticate = (req: any) => {
  const authHeader = req?.headers?.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
};
