import { IObjectId } from 'types/global';
import { INutrient, INutrientCreateInput } from 'types/ingridient';
import NutrientService from './services/nutrient';

const nutrientService = new NutrientService();

export default {
  ingridient: {
    show: (id: IObjectId) => console.log(id),
  },
  nutrient: {
    create: (nutrient: INutrientCreateInput): Promise<INutrient> =>
      nutrientService.create(nutrient),
    list: (): Promise<INutrient[]> => nutrientService.list(),
  },
};
