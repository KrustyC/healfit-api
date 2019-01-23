import { AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';

const checkUserIsAuthenticated = async (
  _: object,
  __: object,
  context: { user: object }
) => {
  if (!context.user) {
    throw new AuthenticationError('Must be authenticated');
  }
};

export const authenticatedOnly = (resolver: any) =>
  combineResolvers(checkUserIsAuthenticated, resolver);
