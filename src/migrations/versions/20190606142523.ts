import { RecipeSchema } from '../../context/recipe/schema';

export default function Version20190606142523() {
  return {
    execute: async () => {
      // migration

      await RecipeSchema.collection.dropIndexes();
      return true;
    },
  };
}
