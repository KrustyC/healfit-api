import { AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { IAccount } from 'types/account';

const checkUserIsAuthenticated = async (
  _: object,
  __: object,
  context: { user: IAccount | null }
) => {
  if (!context.user) {
    throw new AuthenticationError('Must be authenticated');
  }
};

const checkUserIsAdmin = async (
  first: object,
  args: object,
  context: { user: IAccount | null }
) => {
  // if (!context.user || !context.user.isAdmin) {
  //   throw new AuthenticationError('Must be admin');
  // }
  console.log(first, args, context);
};

export const authenticatedOnly = (resolver: any) =>
  combineResolvers(checkUserIsAuthenticated, resolver);

export const adminOnly = (resolver: any) =>
  combineResolvers(checkUserIsAdmin, resolver);
