import IngridientsCategories from '@valueobjects/IngridientsCategories';

const globalData = {
  ingridientsCategories: IngridientsCategories.indexedList(),
};

export default {
  Mutation: {
    hello: () => 'Hello! Mutations are working!',
  },
  Query: {
    globalData: () => globalData,
  },
};
