import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import { IMealEvent, IMealEventAddInput, IMealPlanEvent } from 'types/mealPlan';
import MealPlanService from './services';

const mealPlanService = new MealPlanService();

export default {
  addMealEvent: (
    data: IMealEventAddInput,
    ctx: IContext
  ): Promise<IMealEvent> => mealPlanService.addMealEvent(data, ctx),
  hello: () => 'Hello world!',
  // list: (): Promise<IMealPlanEvent> => mealPlanService.list(),
};
