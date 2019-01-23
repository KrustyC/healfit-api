import { AuthenticationError, gql, makeExecutableSchema } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { IObjectId } from 'types/global';
import { IIngridientCreateInput, IIngridientEditInput } from 'types/ingridient';

import Ingridient from '@context/ingridient';
import { authenticatedOnly } from '@helpers/auth';

export const IngridientSchema = makeExecutableSchema({
  typeDefs: gql`
    type Nutrient {
      id: ID!
      name: String!
    }

    type NutrientValue {
      nutrient: Nutrient!
      value: Float!
    }

    type Ingridient {
      id: ID
      name: String!
      calories: Float
      nutrients: [NutrientValue]
      # createdBy: User @relation(name: "User") @TODO Find a way to refer this
    }

    input InputNutrient {
      id: ID!
      name: String!
    }

    input NutrientValueInput {
      nutrient: InputNutrient!
      value: Float!
    }

    input IngridientCreateInput {
      name: String!
      category: ID
      calories: Float
      nutrients: [NutrientValueInput]
    }

    input IngridientEditInput {
      id: ID!
      name: String
      category: ID
      calories: Float
      nutrients: [NutrientValueInput]
    }

    type Query {
      showIngridient(id: ID!): Ingridient
      # list: [Ingridient]
      # search(query: String!): [Ingridient]
    }

    # type Mutation {
    #   create(input: IIngridientCreateInput!): Ingridient
    #   edit(input: IIngridientCreateInput!): Ingridient
    #   delete(id: ID!): Boolean
    # }
  `,
});

export const IngridientResolvers = {
  Query: {
    showIngridient: async (_: object, id: IObjectId) => Ingridient.show(id),
  },
  // Mutation: {
  //   login: async (_: object, data: LoginInput) => auth.login(data),
  //   signup: async (_: object, data: SignupInput) => auth.signup(data),
  //   verifyAccount: async (_: object, data: VerifyAccountInput) =>
  //     Account.verifyAccount(data),
  //   forgottenPassword: async (_: object, data: ForgottenPasswordInput) =>
  //     auth.forgottenPassword(data),
  //   resetPassword: async (_: object, data: ResetPasswordInput) =>
  //     Account.resetPassword(data),
  // },
};