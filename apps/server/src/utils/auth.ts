import jwt from "jsonwebtoken";
import { Request } from "express";

const secret = process.env.JWT_SECRET!;
const expiration = "2h";

export function signToken({ _id, email, username }: { _id: string, email: string, username: string }) {
  return jwt.sign({ _id, email, username }, secret, { expiresIn: expiration });
}

export function authMiddleware({ req }: { req: Request }) {
  const token = req.headers.authorization?.split(" ").pop() || "";
  if (!token) return req;

  try {
    const decoded = jwt.verify(token, secret);
    (req as any).user = decoded;
  } catch {
    console.warn("Invalid token");
  }

  return req;
}
