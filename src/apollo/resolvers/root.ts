import IngredientsCategories from '@valueobjects/IngredientsCategories';
import MealTypes from '@valueobjects/MealTypes';
import Measurements from '@valueobjects/Measurements';
import RecipeCategories from '@valueobjects/RecipeCategories';
import RecipeLevels from '@valueobjects/RecipeLevels';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const globalData = {
  ingredientsCategories: IngredientsCategories.indexedList(),
  mealTypes: MealTypes.indexedList(),
  measurements: Measurements.indexedList(),
  recipeCategories: RecipeCategories.indexedList(),
  recipeLevels: RecipeLevels.indexedList(),
};

export default {
  Date: new GraphQLScalarType({
    description: 'Date custom scalar type',
    name: 'Date',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
  Mutation: {
    hello: () => 'Hello! Mutations are working!',
  },
  Query: {
    globalData: () => globalData,
  },
};
