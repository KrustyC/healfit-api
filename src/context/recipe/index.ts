import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import {
  IRecipe,
  IRecipeCreateInput,
  IRecipeEditInput,
  IRecipeLikeInput,
  IRecipeRateInput,
  IRecipeRating,
} from 'types/recipe';
import RecipeService from './services';

const recipeService = new RecipeService();

export default {
  create: (data: IRecipeCreateInput, ctx: IContext): Promise<IRecipe> =>
    recipeService.create(data, ctx),
  delete: (id: IObjectId): Promise<boolean> => recipeService.delete(id),
  edit: (data: IRecipeEditInput, ctx: IContext): Promise<IRecipe> =>
    recipeService.edit(data, ctx),
  like: (data: IRecipeLikeInput, ctx: IContext): Promise<IRecipe> =>
    recipeService.like(data, ctx),
  list: (data: ILimitSkipInput): Promise<IRecipe[]> => recipeService.list(data),
  rate: (data: IRecipeRateInput, ctx: IContext): Promise<IRecipeRating> =>
    recipeService.rate(data, ctx),
  ratings: (recipeId: IObjectId): Promise<IRecipeRating[]> =>
    recipeService.ratings(recipeId),
  searchByName: (name: string): Promise<IRecipe[]> =>
    recipeService.searchByName(name),
  show: (slug: string): Promise<IRecipe> => recipeService.show(slug),
};
