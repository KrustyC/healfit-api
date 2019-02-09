import { ILimitSkipInput, IObjectId } from 'types/global';
import {
  IIngridient,
  IIngridientCreateInput,
  IIngridientEditInput,
} from 'types/ingridient';
import IngridientRepo from '../repo';

export default class IngridientService {
  public ingridientRepo: IngridientRepo;

  constructor() {
    this.ingridientRepo = new IngridientRepo();
  }

  public async create(data: IIngridientCreateInput): Promise<IIngridient> {
    return this.ingridientRepo.create(data);
  }

  public async update(data: IIngridientEditInput): Promise<boolean> {
    const ingridient = data.input;
    try {
      await this.ingridientRepo.findOneAndUpdate(
        { _id: ingridient.id },
        {
          $set: {
            calories: ingridient.calories,
            category: ingridient.category,
            name: ingridient.name,
            nutrients: ingridient.nutrients,
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
      await this.ingridientRepo.hardDelete({ _id: id });
      return true;
    } catch (error) {
      return false;
    }
  }

  public async searchByName(name: string): Promise<IIngridient[]> {
    const regex = new RegExp(name.split(' ').join('|'), 'gi');
    const query = {
      $or: [
        {
          $text: {
            $search: name,
          },
        },
        {
          name: {
            $regex: regex,
          },
        },
      ],
    };

    return this.ingridientRepo.findBy(query, {}, [], { limit: 25 });
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
