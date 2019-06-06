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
  likeOrDislike: (data: IRecipeLikeInput, ctx: IContext): Promise<boolean> =>
    recipeService.likeOrDislike(data, ctx),
  list: (data: ILimitSkipInput): Promise<IRecipe[]> => recipeService.list(data),
  rate: (data: IRecipeRateInput, ctx: IContext): Promise<IRecipeRating> =>
    recipeService.rate(data, ctx),
  rating: (recipeId: IObjectId): Promise<number> =>
    recipeService.rating(recipeId),
  ratings: (recipeId: IObjectId): Promise<IRecipeRating[]> =>
    recipeService.ratings(recipeId),
  searchByTitle: (name: string): Promise<IRecipe[]> =>
    recipeService.searchByTitle(name),
  show: (slug: string): Promise<IRecipe> => recipeService.show(slug),
};
