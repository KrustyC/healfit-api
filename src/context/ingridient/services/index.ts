import { ILimitSkipInput, IObjectId } from 'types/global';
import { IIngridient, IIngridientCreateInput } from 'types/ingridient';
import IngridientRepo from '../repo';

export default class IngridientService {
  public ingridientRepo: IngridientRepo;

  constructor() {
    this.ingridientRepo = new IngridientRepo();
  }

  public async create(data: IIngridientCreateInput): Promise<IIngridient> {
    console.log(data);
    return this.ingridientRepo.create(data);
  }

  public async list(data: ILimitSkipInput): Promise<IIngridient[]> {
    const limitQuery = { limit: data.limit || 5000, skip: data.skip || 0 };

    return this.ingridientRepo.findBy({}, {}, [], limitQuery);
  }

  public async findBy(field: string, fieldName: string) {
    return this.ingridientRepo.findOneBy({ [fieldName]: field });
  }

  public async show(id: IObjectId): Promise<IIngridient> {
    return this.ingridientRepo.findOneBy({ _id: id });
  }
}
