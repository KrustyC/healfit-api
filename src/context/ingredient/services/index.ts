import { ILimitSkipInput, IObjectId } from 'types/global';
import {
  IIngredient,
  IIngredientCreateInput,
  IIngredientEditInput,
} from 'types/ingredient';
import IngredientRepo from '../repo';

export default class IngredientService {
  public ingredientRepo: IngredientRepo;

  constructor() {
    this.ingredientRepo = new IngredientRepo();
  }

  public async create(data: IIngredientCreateInput): Promise<IIngredient> {
    return this.ingredientRepo.create(data);
  }

  public async update(data: IIngredientEditInput): Promise<boolean> {
    const ingredient = data.input;
    try {
      await this.ingredientRepo.findOneAndUpdate(
        { _id: ingredient.id },
        {
          $set: {
            calories: ingredient.calories,
            category: ingredient.category,
            name: ingredient.name,
            nutrients: ingredient.nutrients,
          },
        }
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  public async delete(id: IObjectId): Promise<boolean> {
    try {
      await this.ingredientRepo.hardDelete({ _id: id });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async searchByName(name: string): Promise<IIngredient[]> {
    const projection = {};
    const options = { limit: 25 };
    const textSearchQuery = {
      $text: {
        $search: `"${name}"`,
      },
    };

    const result = await this.ingredientRepo.findBy(
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

    return this.ingredientRepo.findBy(regexQuery, projection, [], options);
  }

  public async list(data: ILimitSkipInput): Promise<IIngredient[]> {
    const options = {
      limit: data.limit || 50,
      skip: data.skip || 0,
      sort: 'name',
    };

    return this.ingredientRepo.findBy({}, {}, [], options);
  }

  public async findBy(field: string, fieldName: string) {
    return this.ingredientRepo.findOneBy({ [fieldName]: field });
  }

  public async show(id: IObjectId): Promise<IIngredient> {
    return this.ingredientRepo.findOneBy({ _id: id });
  }
}
