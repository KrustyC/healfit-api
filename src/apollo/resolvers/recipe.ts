import Recipe from '@context/recipe';
import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import { IRecipe, IRecipeCreateInput, IRecipeEditInput } from 'types/recipe';

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
      ctx: IContext
    ): Promise<IRecipe> => Recipe.create(data, ctx),
    // deleteRecipe: async (_: object, data: IDeleteData): Promise<boolean> =>
    //   Recipe.delete(data.id),
    editRecipe: async (
      _: object,
      data: IRecipeEditInput,
      ctx: IContext
    ): Promise<IRecipe> => Recipe.edit(data, ctx),
  },
  Query: {
    recipe: async (_: object, { id }: { id: IObjectId }): Promise<IRecipe> =>
      Recipe.show(id),
    recipes: async (_: object, args: ILimitSkipInput): Promise<IRecipe[]> =>
      Recipe.list(args),
    recipesByName: async (_: object, args: INameInput): Promise<IRecipe[]> =>
      Recipe.searchByName(args.name),
  },
};
