import { gql, makeExecutableSchema } from 'apollo-server';
import { LoginInput, SignupInput } from 'types/account';

import { login, signup } from 'context/auth';

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

    type Mutation {
      login(input: LoginInput): AuthAccount
      signup(input: SignupInput): AuthAccount
    }
  `,
});

export const AuthResolvers = {
  Mutation: {
    login: async (_: Object, data: LoginInput) => login(data),
    signup: async (_: Object, data: SignupInput) => signup(data),
  },
};
