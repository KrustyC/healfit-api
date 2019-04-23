import IngredientsCategories from '@valueobjects/IngredientsCategories';
import Measurements from '@valueobjects/Measurements';
import RecipeCategories from '@valueobjects/RecipeCategories';
import RecipeLevels from '@valueobjects/RecipeLevels';

const globalData = {
  ingredientsCategories: IngredientsCategories.indexedList(),
  measurements: Measurements.indexedList(),
  recipeCategories: RecipeCategories.indexedList(),
  recipeLevels: RecipeLevels.indexedList(),
};

export default {
  Mutation: {
    hello: () => 'Hello! Mutations are working!',
  },
  Query: {
    globalData: () => globalData,
  },
};
