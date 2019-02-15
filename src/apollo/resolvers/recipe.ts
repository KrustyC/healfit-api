// import Recipe from '@context/Recipe';
import { ILimitSkipInput, IObjectId } from 'types/global';
import {
  IRecipe,
  IRecipeCreateInput,
  // IRecipeEditInput,
} from 'types/recipe';

interface IDeleteData {
  id: IObjectId;
}

interface INameInput {
  name: string;
}

export default {
  Mutation: {
    createRecipe: async (_: object, data: IRecipeCreateInput) => console.log(data),
    // createRecipe: async (
    //   _: object,
    //   data: IRecipeCreateInput
    // ): Promise<IRecipe> => Recipe.create(data),
    // deleteRecipe: async (_: object, data: IDeleteData): Promise<boolean> =>
    //   Recipe.delete(data.id),
    // editRecipe: async (
    //   _: object,
    //   data: IRecipeEditInput
    // ): Promise<boolean> => Recipe.update(data),
  },
  // Query: {
  //   Recipe: async (_: object, id: IObjectId): Promise<IRecipe> =>
  //     Recipe.show(id),
  //   Recipes: async (
  //     _: object,
  //     args: ILimitSkipInput
  //   ): Promise<IRecipe[]> => Recipe.list(args),
  //   RecipesByName: async (
  //     _: object,
  //     args: INameInput
  //   ): Promise<IRecipe[]> => Recipe.searchByName(args.name),
  // },
};
