import Repository from '@lib/Repository';
import slugify from 'slugify';
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
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
      },
      slug: slugify(data.input.title, {
        lower: true,
      }),
    };

    const recipe = new Recipe(recipeData);
    console.log('here 3', recipe)
    return recipe.save();
  }
}
