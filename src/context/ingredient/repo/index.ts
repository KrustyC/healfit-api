import Repository from '@lib/Repository';
import { IIngredient, IIngredientCreateInput } from 'types/ingredient';
import { Ingredient } from '../schema';

export default class IngredientRepo extends Repository {
  constructor() {
    super(Ingredient);
  }

  public async create(data: IIngredientCreateInput): Promise<IIngredient> {
    const ingredient = new Ingredient(data.input);
    return ingredient.save();
  }
}
