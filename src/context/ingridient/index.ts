import { ILimitSkipInput, IObjectId } from 'types/global';
import {
  IIngridient,
  IIngridientCreateInput,
  IIngridientEditInput,
} from 'types/ingridient';
import IngridientService from './services';

const ingridientService = new IngridientService();

export default {
  create: (data: IIngridientCreateInput): Promise<IIngridient> =>
    ingridientService.create(data),
  delete: (id: IObjectId): Promise<boolean> => ingridientService.delete(id),
  list: (data: ILimitSkipInput): Promise<IIngridient[]> =>
    ingridientService.list(data),
  show: (id: IObjectId): Promise<IIngridient> => ingridientService.show(id),
  update: (data: IIngridientEditInput): Promise<boolean> =>
    ingridientService.update(data),
};
