import AccountContext, { IAccountContext } from '@context/account';
import { AuthenticationError } from 'apollo-server';
import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import { IRecipe, IRecipeCreateInput, IRecipeEditInput } from 'types/recipe';
import RecipeRepo from '../repo';

export default class RecipeService {
  public recipeRepo: RecipeRepo;
  public accountContext: IAccountContext;

  constructor() {
    this.recipeRepo = new RecipeRepo();
    this.accountContext = AccountContext;
  }

  public async create(
    data: IRecipeCreateInput,
    ctx: IContext
  ): Promise<IRecipe> {
    const creator = await this.accountContext.findBy(ctx.user._id, '_id');
    return this.recipeRepo.create(data, creator);
  }

  public async edit(data: IRecipeEditInput, ctx: IContext): Promise<IRecipe> {
    const { input } = data;

    const recipe = await this.recipeRepo.findOneBy({
      slug: input.slug,
    });

    const isUserOwner =
      ctx.user._id.toString() === recipe.createdBy.id.toString();
    if (!isUserOwner) {
      throw new AuthenticationError(
        'You are not authorized to edit this recipe.'
      );
    }

    try {
      const updated = await this.recipeRepo.findOneAndUpdate(
        { slug: input.slug },
        {
          $set: {
            calories: input.calories,
            carbohydrates: input.carbohydrates,
            category: input.category,
            description: input.description,
            fat: input.fat,
            ingredients: input.ingredients,
            level: input.level,
            protein: input.protein,
            servings: input.servings,
            title: input.title,
            totalTime: input.totalTime,
          },
        }
      );

      return updated;
    } catch (error) {
      throw Error('Could not edit this recipe');
    }
  }

  public async delete(id: IObjectId): Promise<boolean> {
    try {
      await this.recipeRepo.hardDelete({ _id: id });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async searchByName(name: string): Promise<IRecipe[]> {
    const projection = {};
    const options = { limit: 25 };
    const textSearchQuery = {
      $text: {
        $search: name,
      },
    };

    const result = await this.recipeRepo.findBy(
      textSearchQuery,
      projection,
      [],
      options
    );

    if (result.length > 0) {
      return result;
    }

    // If it doesn't match a full text, then we'll look for a regex
    const regexQuery = {
      name: {
        $regex: new RegExp(name.split(' ').join('|'), 'gi'),
      },
    };

    return this.recipeRepo.findBy(regexQuery, projection, [], options);
  }

  public async list(data: ILimitSkipInput): Promise<IRecipe[]> {
    const limitQuery = { limit: data.limit || 5000, skip: data.skip || 0 };

    return this.recipeRepo.findBy({}, {}, [], limitQuery);
  }

  public async findBy(field: string, fieldName: string) {
    return this.recipeRepo.findOneBy({ [fieldName]: field });
  }

  public async show(slug: string): Promise<IRecipe> {
    return this.recipeRepo.findOneBy({ slug });
  }
}
