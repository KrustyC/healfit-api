import { ILimitSkipInput, IObjectId } from 'types/global';
import { IMealPlanEvent } from 'types/mealPlan';
import MealPlanService from './services';

const mealPlanService = new MealPlanService();

export default {
  // create: (data: IMealPlanEventCreateInput): Promise<IMealPlanEvent> =>
  //   mealPlanService.create(data),
};
