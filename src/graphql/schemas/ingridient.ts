import { gql, makeExecutableSchema } from 'apollo-server';
import { IObjectId } from 'types/global';

import Ingridient from '@context/ingridient';
import { adminOnly } from '@helpers/auth';

export const IngridientSchema = makeExecutableSchema({
  typeDefs: gql`
    type Carbohydrates {
      fiber: Float
      sugar: Float
    }

    type Fats {
      monounsaturated: Float
      polyunsaturated: Float
      saturated: Float
    }

    type Nutrients {
      carbohydrate: Carbohydrates
      cholesterol: Float
      fat: Fats
      potassium: Float
      protein: Float
      sodium: Float
    }

    type Ingridient {
      id: ID
      name: String!
      calories: Int
      nutrients: Nutrients
    }

    input CarbohydratesInput {
      fiber: Float
      sugar: Float
    }

    input FatsInput {
      monounsaturated: Float
      polyunsaturated: Float
      saturated: Float
    }

    input NutrientsInput {
      carbohydrate: CarbohydratesInput
      cholesterol: Float
      fat: FatsInput
      potassium: Float
      protein: Float
      sodium: Float
    }

    input IngridientCreateInput {
      name: String!
      category: ID
      calories: Int
      nutrients: NutrientsInput
    }

    input IngridientEditInput {
      id: ID!
      name: String
      category: ID
      calories: Int
      nutrients: NutrientsInput
    }

    type Query {
      showIngridient(id: ID!): Ingridient
      # list: [Ingridient]
      # search(query: String!): [Ingridient]
    }

    type Mutation {
      addIngridient(input: IngridientCreateInput!): Ingridient
      #   edit(input: IIngridientCreateInput!): Ingridient
      #   delete(id: ID!): Boolean
    }
  `,
});

export const IngridientResolvers = {
  Mutation: {
    addIngridient: adminOnly(Ingridient.create),
  },
  Query: {
    showIngridient: async (_: object, id: IObjectId) => Ingridient.show(id),
  },
};
