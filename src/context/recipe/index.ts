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
  findByIds: (ids: IObjectId[]): Promise<IRecipe[]> =>
    recipeService.findByIds(ids),
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

export interface IRecipeContext {
  create: (data: IRecipeCreateInput, ctx: IContext) => Promise<IRecipe>;
  delete: (id: IObjectId) => Promise<boolean>;
  edit: (data: IRecipeEditInput, ctx: IContext) => Promise<IRecipe>;
  findByIds: (ids: IObjectId[]) => Promise<IRecipe[]>;
  likeOrDislike: (data: IRecipeLikeInput, ctx: IContext) => Promise<boolean>;
  list: (data: ILimitSkipInput) => Promise<IRecipe[]>;
  rate: (data: IRecipeRateInput, ctx: IContext) => Promise<IRecipeRating>;
  rating: (recipeId: IObjectId) => Promise<number>;
  ratings: (recipeId: IObjectId) => Promise<IRecipeRating[]>;
  searchByTitle: (name: string) => Promise<IRecipe[]>;
  show: (slug: string) => Promise<IRecipe>;
}
