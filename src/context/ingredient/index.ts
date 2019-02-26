import { ILimitSkipInput, IObjectId } from 'types/global';
import {
  IIngredient,
  IIngredientCreateInput,
  IIngredientEditInput,
} from 'types/ingredient';
import IngredientService from './services';

const ingredientService = new IngredientService();

export default {
  create: (data: IIngredientCreateInput): Promise<IIngredient> =>
    ingredientService.create(data),
  delete: (id: IObjectId): Promise<boolean> => ingredientService.delete(id),
  list: (data: ILimitSkipInput): Promise<IIngredient[]> =>
    ingredientService.list(data),
  searchByName: (name: string): Promise<IIngredient[]> =>
    ingredientService.searchByName(name),
  show: (id: IObjectId): Promise<IIngredient> => ingredientService.show(id),
  update: (data: IIngredientEditInput): Promise<boolean> =>
    ingredientService.update(data),
};
