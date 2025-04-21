import { authenticate } from '../utils/auth.js';

export const context = ({ req }: { req?: any }) => {
  if (!req || !req.headers) {
    console.warn("No request object found in context");
    return { user: null };
  }

  const user = authenticate(req);
  return { user };
};
