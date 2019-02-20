import Repository from '@lib/Repository';
import { IAccount } from 'types/account';
import { IRecipe, IRecipeCreateInput } from 'types/recipe';
import { Recipe } from '../schema';

export default class RecipeRepo extends Repository {
  constructor() {
    super(Recipe);
  }

  public async create(
    data: IRecipeCreateInput,
    user: IAccount
  ): Promise<IRecipe> {
    const recipeData = {
      ...data.input,
      createdBy: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
      },
    };

    const recipe = new Recipe(recipeData);

    return recipe.save();
  }
}
