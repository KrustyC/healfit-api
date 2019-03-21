import Repository from '@lib/Repository';
import { IAccount } from 'types/account';
import { IRecipe, IRecipeRating } from 'types/recipe';
import { RecipeRating } from '../schema/rating';

export default class RecipeRatingRepo extends Repository {
  constructor() {
    super(RecipeRating);
  }

  public async create(
    rating: number,
    recipe: IRecipe,
    user: IAccount
  ): Promise<IRecipeRating> {
    const ratingData = {
      rating,
      recipeId: recipe.id,
      userId: user.id,
    };

    const recipeRating = new RecipeRating(ratingData);
    return recipeRating.save();
  }
}
