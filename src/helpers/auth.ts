import { AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers'

const checkUserIsAuthenticated = async (_: Object, __: Object, context: { user: Object }) => {
  if (!context.user) {
    throw new AuthenticationError('Must be authenticated');
  }
}

export const authenticatedOnly = (resolver: any) => combineResolvers(
  checkUserIsAuthenticated,
  resolver
)