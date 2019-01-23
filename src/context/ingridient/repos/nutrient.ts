import Repository from '@lib/Repository';
import { IObjectId } from 'types/global';
import { INutrient, INutrientCreateInput } from 'types/ingridient';
import { Nutrient } from '../schema/Nutrient';

export default class NutrientRepo extends Repository {
  constructor() {
    super(Nutrient);
  }

  public async create(data: INutrientCreateInput): Promise<INutrient> {
    const nutrient = new Nutrient(data.input);
    return nutrient;
  }

  public async delete(id: IObjectId): Promise<boolean> {
    const nutrient = await this.findById(id);

    if (!nutrient) {
      throw new Error('Provided nutrient does not exists!');
    }

    return true;
  }
}
