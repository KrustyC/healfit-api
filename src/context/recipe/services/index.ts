import AccountContext, { IAccountContext } from '@context/account';
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
    const rec = await this.recipeRepo.create(data, creator);
    console.log(rec);
    return rec;
  }

  // public async update(data: IRecipeEditInput): Promise<boolean> {
  //   const recipe = data.input;
  //   try {
  //     await this.recipeRepo.findOneAndUpdate(
  //       { _id: recipe.id },
  //       {
  //         $set: {
  //           calories: recipe.calories,
  //           category: recipe.category,
  //           name: recipe.name,
  //           nutrients: recipe.nutrients,
  //         },
  //       }
  //     );
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // }

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

  public async show(id: IObjectId): Promise<IRecipe> {
    return this.recipeRepo.findOneBy({ _id: id });
  }
}
