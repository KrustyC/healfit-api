import { IObjectId } from 'types/global';
import { INutrient, INutrientCreateInput } from 'types/ingridient';
import NutrientRepo from '../repos/nutrient';

export default class NutritionService {
  public nutrientRepo: NutrientRepo;

  constructor() {
    this.nutrientRepo = new NutrientRepo();
  }

  public async list(): Promise<INutrient[]> {
    return this.nutrientRepo.findBy();
  }

  public async create(data: INutrientCreateInput): Promise<INutrient> {
    return this.nutrientRepo.create(data);
  }

  public async delete(id: IObjectId): Promise<boolean> {
    return this.nutrientRepo.delete(id);
  }
}
