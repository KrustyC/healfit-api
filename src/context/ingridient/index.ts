import { IObjectId } from 'types/global';
import { IIngridient, IIngridientCreateInput } from 'types/ingridient';
import IngridientService from './services';

const ingridientService = new IngridientService();

export default {
  create: (data: IIngridientCreateInput): Promise<IIngridient> =>
    ingridientService.create(data),
  list: (limit?: number, skip?: number): Promise<IIngridient[]> =>
    ingridientService.list(limit, skip),
  show: (id: IObjectId): Promise<IIngridient> => ingridientService.show(id),
};
