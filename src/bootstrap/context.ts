import AccountContext from '@context/account';
import { AuthenticationError } from 'apollo-server';
import { Request } from 'express';

const context = async ({ req }: { req: Request }) => {
  // get the user token from the headers
  if (!req.user) {
    return null;
  }
  console.log(req.user);
  return { user: req.user };
};

export default context;
