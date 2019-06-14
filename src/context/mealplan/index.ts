import { ILimitSkipInput, IObjectId } from 'types/global';
import { IMealPlanEvent } from 'types/mealPlan';
import MealPlanService from './services';

const mealPlanService = new MealPlanService();

export default {
  hello: () => 'Hello world!',
  list: (): Promise<IMealPlanEvent> => mealPlanService.list(),
  // create: (data: IMealPlanEventCreateInput): Promise<IMealPlanEvent> =>
  //   mealPlanService.create(data),
};
