import IngredientsCategories from '@valueobjects/IngredientsCategories';
import Measurements from '@valueobjects/Measurements';

const globalData = {
  ingredientsCategories: IngredientsCategories.indexedList(),
  measurements: Measurements.indexedList(),
};

export default {
  Mutation: {
    hello: () => 'Hello! Mutations are working!',
  },
  Query: {
    globalData: () => globalData,
  },
};
