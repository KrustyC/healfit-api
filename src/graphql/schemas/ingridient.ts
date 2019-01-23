import { gql, makeExecutableSchema } from 'apollo-server';
import { IObjectId } from 'types/global';

import Ingridient from '@context/ingridient';
import { adminOnly } from '@helpers/auth';

export const IngridientSchema = makeExecutableSchema({
  typeDefs: gql`
    type SubNutrient {
      name: String!
    }

    type Nutrient {
      id: ID!
      name: String!
      subString: [SubNutrient]
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

    input SubNutrientsInput {
      name: String!
    }

    input NutrientCreateInput {
      name: String!
      subNutrients: [SubNutrientsInput]
    }

    type Query {
      showIngridient(id: ID!): Ingridient
      # list: [Ingridient]
      # search(query: String!): [Ingridient]
    }

    type IngridientMutation {
      createNutrient(input: NutrientCreateInput!): Nutrient
      #   edit(input: IIngridientCreateInput!): Ingridient
      #   delete(id: ID!): Boolean
    }
  `,
});

export const IngridientResolvers = {
  IngridientMutation: {
    createNutrient: adminOnly(Ingridient.nutrient.create),
  },
  Query: {
    showIngridient: async (_: object, id: IObjectId) =>
      Ingridient.ingridient.show(id),
  },
};
