import { AuthenticationError, gql, makeExecutableSchema } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import {
  IForgottenPasswordInput,
  ILoginInput,
  IResetPasswordInput,
  ISignupInput,
  IVerifyAccountInput,
} from 'types/account';

import Account from '@context/account';
import Auth from '@context/auth';
import { authenticatedOnly } from '@helpers/auth';

const auth = new Auth();

export const AuthSchema = makeExecutableSchema({
  typeDefs: gql`
    type User {
      firstName: String
      lastName: String
    }

    type AuthAccount {
      account: User
      token: String
    }

    input LoginInput {
      email: String!
      password: String!
    }

    input SignupInput {
      type: Int!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    }

    input VerifyAccountInput {
      token: String!
    }

    input ForgottenPassword {
      email: String!
    }

    input ResetPasswordInput {
      token: String!
      password: String!
    }

    type UserInfo {
      user: User
    }

    type Query {
      currentUserInfo: UserInfo
    }

    type Mutation {
      login(input: LoginInput!): AuthAccount
      signup(input: SignupInput!): User
      verifyAccount(input: VerifyAccountInput!): Boolean
      forgottenPassword(input: ForgottenPassword): Boolean
      resetPassword(input: ResetPasswordInput): Boolean
    }
  `,
});

const currentUserInfo = async (
  _: object,
  __: object,
  context: { user: object }
) => {
  // @TODO This object should be an account of some sort
  return { user: context.user };
};

export const AuthResolvers = {
  Mutation: {
    forgottenPassword: async (_: object, data: IForgottenPasswordInput) =>
      auth.forgottenPassword(data),
    login: async (_: object, data: ILoginInput) => console.log(data),
    resetPassword: async (_: object, data: IResetPasswordInput) =>
      Account.resetPassword(data),
    signup: async (_: object, data: ISignupInput) => auth.signup(data),
    verifyAccount: async (_: object, data: IVerifyAccountInput) =>
      Account.verifyAccount(data),
  },
  Query: {
    currentUserInfo: authenticatedOnly(currentUserInfo),
  },
};
