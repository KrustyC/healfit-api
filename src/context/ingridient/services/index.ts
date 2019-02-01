import { IObjectId } from 'types/global';
import { IIngridient, IIngridientCreateInput } from 'types/ingridient';
import IngridientRepo from '../repo';

export default class IngridientService {
  public ingridientRepo: IngridientRepo;

  constructor() {
    this.ingridientRepo = new IngridientRepo();
  }

  public async create(
    ingridient: IIngridientCreateInput
  ): Promise<IIngridient> {
    return this.ingridientRepo.create(ingridient);
  }

  public async list(limit = Infinity, skip = 0): Promise<IIngridient[]> {
    const options = {
      limit,
      skip,
    };

    return this.ingridientRepo.findBy({}, {}, [], options);
  }

  public async findBy(field: string, fieldName: string) {
    return this.ingridientRepo.findOneBy({ [fieldName]: field });
  }

  public async show(id: IObjectId): Promise<IIngridient> {
    return this.ingridientRepo.findOneBy({ _id: id });
  }
}
