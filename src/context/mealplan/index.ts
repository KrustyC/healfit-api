import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import {
  IMealEvent,
  IMealEventAddInput,
  IMealPlanEvent,
  IMealPlanRangeInput,
  IWorkoutEvent,
  IWorkoutEventAddInput,
} from 'types/mealPlan';
import MealPlanService from './services';

const mealPlanService = new MealPlanService();

export default {
  addMealEvent: (
    data: IMealEventAddInput,
    ctx: IContext
  ): Promise<IMealEvent> => mealPlanService.addMealEvent(data, ctx),
  addWorkoutEvent: (
    data: IWorkoutEventAddInput,
    ctx: IContext
  ): Promise<IWorkoutEvent> => mealPlanService.addWorkoutEvent(data, ctx),
  findWithinRange: (
    data: IMealPlanRangeInput,
    ctx: IContext
  ): Promise<[IMealPlanEvent]> => mealPlanService.findWithinRange(data, ctx),

  hello: () => 'Hello world!',
  // list: (): Promise<IMealPlanEvent> => mealPlanService.list(),
};
