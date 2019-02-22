import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import { IRecipe, IRecipeCreateInput, IRecipeEditInput } from 'types/recipe';
import RecipeService from './services';

const recipeService = new RecipeService();

export default {
  create: (data: IRecipeCreateInput, ctx: IContext): Promise<IRecipe> =>
    recipeService.create(data, ctx),
  delete: (id: IObjectId): Promise<boolean> => recipeService.delete(id),
  edit: (data: IRecipeEditInput, ctx: IContext): Promise<IRecipe> =>
    recipeService.edit(data, ctx),
  list: (data: ILimitSkipInput): Promise<IRecipe[]> => recipeService.list(data),
  searchByName: (name: string): Promise<IRecipe[]> =>
    recipeService.searchByName(name),
  show: (id: IObjectId): Promise<IRecipe> => recipeService.show(id),
};
