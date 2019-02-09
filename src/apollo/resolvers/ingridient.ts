import Ingridient from '@context/ingridient';
import { ILimitSkipInput, IObjectId } from 'types/global';
import {
  IIngridient,
  IIngridientCreateInput,
  IIngridientEditInput,
} from 'types/ingridient';

interface IDeleteData {
  id: IObjectId;
}

interface INameInput {
  name: string;
}

export default {
  Mutation: {
    addIngridient: async (
      _: object,
      data: IIngridientCreateInput
    ): Promise<IIngridient> => Ingridient.create(data),
    deleteIngridient: async (_: object, data: IDeleteData): Promise<boolean> =>
      Ingridient.delete(data.id),
    updateIngridient: async (
      _: object,
      data: IIngridientEditInput
    ): Promise<boolean> => Ingridient.update(data),
  },
  Query: {
    ingridient: async (_: object, id: IObjectId): Promise<IIngridient> =>
      Ingridient.show(id),
    ingridients: async (
      _: object,
      args: ILimitSkipInput
    ): Promise<IIngridient[]> => Ingridient.list(args),
    searchIngridientsByName: async (
      _: object,
      args: INameInput
    ): Promise<IIngridient[]> => Ingridient.searchByName(args.name),
  },
};
