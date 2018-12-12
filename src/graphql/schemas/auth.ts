import { gql, makeExecutableSchema } from 'apollo-server';
import { LoginInput, SignupInput, VerifyAccountInput } from 'types/account';

import Auth from 'context/auth';
import Account from 'context/account';

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

    type Mutation {
      login(input: LoginInput!): AuthAccount
      signup(input: SignupInput!): User
      verifyAccount(input: VerifyAccountInput!): Boolean
      # forgottenPassword
      # resetPassword
    }
  `,
});

export const AuthResolvers = {
  Mutation: {
    login: async (_: Object, data: LoginInput) => auth.login(data),
    signup: async (_: Object, data: SignupInput) => auth.signup(data),
    verifyAccount: async (_: Object, data: VerifyAccountInput) =>
      Account.verifyAccount(data),
  },
};
