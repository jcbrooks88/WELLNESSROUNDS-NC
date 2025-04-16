import { authenticate } from '../utils/auth.js';

export const context = ({ req }: { req: any }) => {
  const user = authenticate(req);
  return { user };
};
