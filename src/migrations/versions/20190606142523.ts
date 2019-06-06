import { Recipe as RecipeModel } from '../../context/recipe/schema';

export default function Version20190606142523() {
  return {
    execute: async () => {
      // migration

      await RecipeModel.collection.dropIndexes();
      return true;
    },
  };
}
