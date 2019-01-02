import { gql, makeExecutableSchema, AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers'
import {
  LoginInput,
  SignupInput,
  VerifyAccountInput,
  ForgottenPasswordInput,
  ResetPasswordInput
} from 'types/account';

import Auth from 'context/auth';
import Account from 'context/account';
import { authenticatedOnly } from 'helpers/auth';

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
      email: String!
      token: String!
    }

    input ForgottenPassword {
      email: String!
    }

    input ResetPasswordInput {
      email: String!
      token: String!
      newPassword: String!
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

const currentUserInfo = async (_: Object, __: Object, context: { user: Object }) => { //@TODO This object should be an account of some sort
  return { user: context.user }
}

export const AuthResolvers = {
  Query: {
    currentUserInfo: authenticatedOnly(currentUserInfo)
  },
  Mutation: {
    login: async (_: Object, data: LoginInput) => auth.login(data),
    signup: async (_: Object, data: SignupInput) => auth.signup(data),
    verifyAccount: async (_: Object, data: VerifyAccountInput) =>
      Account.verifyAccount(data),
    forgottenPassword: async (_: Object, data: ForgottenPasswordInput) =>
      auth.forgottenPassword(data),
    resetPassword: async (_: Object, data: ResetPasswordInput) =>
      Account.resetPassword(data),
  },
};
