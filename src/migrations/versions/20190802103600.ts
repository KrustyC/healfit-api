import { RecipeSchema } from '../../context/recipe/schema';

export default function Version20190802103600() {
  return {
    execute: async () => {
      const recipes = await RecipeSchema.collection.find();
      recipes.forEach(recipe => {
        const { createdBy } = recipe;
        if (createdBy.hasOwnProperty('name')) {
          RecipeSchema.collection.update(
            { _id: recipe._id },
            {
              $set: { createdBy: createdBy.id },
            }
          );
        }
      });
      return true;
    },
  };
}
