import { gql, makeExecutableSchema, AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { ObjectId } from 'types/global';
import { IngridientCreateInput } from 'types/ingridient';

import Ingridient from 'context/ingridient';
import { authenticatedOnly } from 'helpers/auth';

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
      # createdBy: User @relation(name: "User")
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
    #   create(input: IngridientCreateInput!): Ingridient
    #   edit(input: IngridientEditInput!): Ingridient
    #   delete(id: ID!): Boolean
    # }
  `,
});


export const IngridientResolvers = {
  Query: {
    showIngridient: async (_: Object, id: ObjectId) => Ingridient.show(id),
  },
  // Mutation: {
  //   login: async (_: Object, data: LoginInput) => auth.login(data),
  //   signup: async (_: Object, data: SignupInput) => auth.signup(data),
  //   verifyAccount: async (_: Object, data: VerifyAccountInput) =>
  //     Account.verifyAccount(data),
  //   forgottenPassword: async (_: Object, data: ForgottenPasswordInput) =>
  //     auth.forgottenPassword(data),
  //   resetPassword: async (_: Object, data: ResetPasswordInput) =>
  //     Account.resetPassword(data),
  // },
};
