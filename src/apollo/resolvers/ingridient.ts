import Ingridient from '@context/ingridient';
import { ILimitSkipInput, IObjectId } from 'types/global';
import { IIngridientCreateInput } from 'types/ingridient';

export default {
  Mutation: {
    addIngridient: async (_: object, data: IIngridientCreateInput) =>
      Ingridient.create(data),
  },
  Query: {
    ingridients: async (_: object, args: ILimitSkipInput) =>
      Ingridient.list(args),
    showIngridient: async (_: object, id: IObjectId) => Ingridient.show(id),
  },
};
