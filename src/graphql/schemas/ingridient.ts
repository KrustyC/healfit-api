import { gql, makeExecutableSchema } from 'apollo-server';
import { IObjectId } from 'types/global';

import Ingridient from '@context/ingridient';
import { adminOnly } from '@helpers/auth';

export const IngridientSchema = makeExecutableSchema({
  typeDefs: gql`
    type NutrientValue {
      nutrient: Nutrient!
      value: Float!
    }

    type Ingridient {
      id: ID
      name: String!
      calories: Float
      nutrients: {
        carbohydrate: {
          fiber: Number
          sugar: Number
        }
        cholesterol: Number
        fat: {
          monounsaturated: Number
          polyunsaturated: Number
          saturated: Number
        }
        potassium: Number
        protein: Number
        sodium: Number
      }
      # createdBy: User @relation(name: "User") @TODO Find a way to refer this
    }

    input IngridientCreateInput {
      name: String!
      category: ID
      calories: Float
      nutrients: {
        carbohydrate: {
          fiber: Number
          sugar: Number
        }
        cholesterol: Number
        fat: {
          monounsaturated: Number
          polyunsaturated: Number
          saturated: Number
        }
        potassium: Number
        protein: Number
        sodium: Number
      }
    }

    input IngridientEditInput {
      id: ID!
      name: String
      category: ID
      calories: Float
      nutrients: {
        carbohydrate: {
          fiber: Number
          sugar: Number
        }
        cholesterol: Number
        fat: {
          monounsaturated: Number
          polyunsaturated: Number
          saturated: Number
        }
        potassium: Number
        protein: Number
        sodium: Number
      }
    }

    type Query {
      showIngridient(id: ID!): Ingridient
      # list: [Ingridient]
      # search(query: String!): [Ingridient]
    }

    extend type Mutation {
      addNutrient(input: NutrientCreateInput!): Nutrient
      #   edit(input: IIngridientCreateInput!): Ingridient
      #   delete(id: ID!): Boolean
    }
  `,
});

export const IngridientResolvers = {
  IngridientMutation: {
    addIngridient: adminOnly(Ingridient.create),
  },
  Query: {
    showIngridient: async (_: object, id: IObjectId) => Ingridient.show(id),
  },
};
