import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import { IRecipe, IRecipeCreateInput, IRecipeEditInput } from 'types/recipe';
import RecipeService from './services';

const recipeService = new RecipeService();

export default {
  create: (data: IRecipeCreateInput, account: IContext): Promise<IRecipe> =>
    recipeService.create(data, account),
  delete: (id: IObjectId): Promise<boolean> => recipeService.delete(id),
  list: (data: ILimitSkipInput): Promise<IRecipe[]> => recipeService.list(data),
  searchByName: (name: string): Promise<IRecipe[]> =>
    recipeService.searchByName(name),
  show: (id: IObjectId): Promise<IRecipe> => recipeService.show(id),
  //   update: (data: IRecipeEditInput): Promise<boolean> =>
  //     recipeService.update(data),
};
