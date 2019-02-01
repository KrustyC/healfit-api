import Repository from '@lib/Repository';
import { IIngridient, IIngridientCreateInput } from 'types/ingridient';
import { Ingridient } from '../schema';

export default class IngridientRepo extends Repository {
  constructor() {
    super(Ingridient);
  }

  public async create(
    ingridientInput: IIngridientCreateInput
  ): Promise<IIngridient> {
    const ingridient = new Ingridient(ingridientInput);
    return ingridient.save();
  }
}
