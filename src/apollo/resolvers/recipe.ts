import Recipe from '@context/recipe';
import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
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
    createRecipe: async (
      _: object,
      data: IRecipeCreateInput,
      account: IContext
    ): Promise<IRecipe> => Recipe.create(data, account),
    // deleteRecipe: async (_: object, data: IDeleteData): Promise<boolean> =>
    //   Recipe.delete(data.id),
    // editRecipe: async (
    //   _: object,
    //   data: IRecipeEditInput
    // ): Promise<boolean> => Recipe.update(data),
  },
  Query: {
    recipe: async (_: object, id: IObjectId): Promise<IRecipe> =>
      Recipe.show(id),
    recipes: async (_: object, args: ILimitSkipInput): Promise<IRecipe[]> =>
      Recipe.list(args),
    recipesByName: async (_: object, args: INameInput): Promise<IRecipe[]> =>
      Recipe.searchByName(args.name),
  },
};
