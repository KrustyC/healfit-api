import { ILimitSkipInput, IObjectId } from 'types/global';
import { IIngridient, IIngridientCreateInput } from 'types/ingridient';
import IngridientService from './services';

const ingridientService = new IngridientService();

export default {
  create: (data: IIngridientCreateInput): Promise<IIngridient> =>
    ingridientService.create(data),
  list: (data: ILimitSkipInput): Promise<IIngridient[]> =>
    ingridientService.list(data),
  show: (id: IObjectId): Promise<IIngridient> => ingridientService.show(id),
};
