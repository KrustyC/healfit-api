import IngridientsCategories from '@valueobjects/IngridientsCategories';
import Measurements from '@valueobjects/Measurements';

const globalData = {
  ingridientsCategories: IngridientsCategories.indexedList(),
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
