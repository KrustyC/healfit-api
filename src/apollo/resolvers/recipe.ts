import Account from '@context/account';
import Recipe from '@context/recipe';
import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import {
  IRecipe,
  IRecipeCreateInput,
  IRecipeEditInput,
  IRecipeLikeInput,
  IRecipeRateInput,
  IRecipeRating,
} from 'types/recipe';

import { IAccount } from 'types/account';

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
    likeOrDislikeRecipe: async (
      _: object,
      data: IRecipeLikeInput,
      ctx: IContext
    ): Promise<boolean> => Recipe.likeOrDislike(data, ctx),
    rateRecipe: async (
      _: object,
      data: IRecipeRateInput,
      ctx: IContext
    ): Promise<IRecipeRating> => Recipe.rate(data, ctx),
  },
  Query: {
    recipe: async (_: object, { slug }: { slug: string }): Promise<IRecipe> =>
      Recipe.show(slug),
    recipes: async (_: object, args: ILimitSkipInput): Promise<IRecipe[]> =>
      Recipe.list(args),
    recipesByTitle: async (
      _: object,
      { title }: { title: string }
    ): Promise<IRecipe[]> => Recipe.searchByTitle(title),
  },
  Recipe: {
    createdBy: async (recipe: { createdBy: IObjectId }): Promise<IAccount> =>
      Account.findBy(recipe.createdBy, '_id'),
    rating: async (recipe: { _id: IObjectId }): Promise<number> =>
      Recipe.rating(recipe._id),
    ratings: async (recipe: { _id: IObjectId }): Promise<IRecipeRating[]> =>
      Recipe.ratings(recipe._id),
  },
};
