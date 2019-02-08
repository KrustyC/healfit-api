import IngridientsCategories from '@valueobjects/IngridientsCategories';

const initialData = {
  ingridientsCategories: IngridientsCategories.indexedList(),
};

export default {
  Mutation: {
    hello: () => 'Hello! Mutations are working!',
  },
  Query: {
    init: () => initialData,
  },
};
