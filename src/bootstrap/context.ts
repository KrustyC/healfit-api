import AccountContext from '@context/account';
import { AuthenticationError } from 'apollo-server';
import { Request } from 'express';

const context = async ({ req }: { req: Request }) => {
  // get the user token from the headers
  if (!req.user) {
    return null;
  }
  const user = await AccountContext.findBy(req.user.email, 'email');

  if (!user) {
    throw new AuthenticationError('The provided token is not valid!');
  }

  return { user };
};

export default context;
