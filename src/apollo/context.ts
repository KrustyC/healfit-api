import { Request } from 'express';

const context = async ({ req }: { req: Request }) => {
  // get the user token from the headers
  if (!req.user) {
    return null;
  }

  return { user: req.user };
};

export default context;
