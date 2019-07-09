import { IContext, ILimitSkipInput, IObjectId } from 'types/global';
import {
  IMealEvent,
  IMealEventAddInput,
  IMealEventEditInput,
  IMealPlanEvent,
  IMealPlanRangeInput,
  IWorkoutEvent,
  IWorkoutEventAddInput,
  IWorkoutEventEditInput,
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
  deleteEvent: (id: IObjectId, ctx: IContext): Promise<boolean> =>
    mealPlanService.deleteEvent(id, ctx),
  editMealEvent: (
    data: IMealEventEditInput,
    ctx: IContext
  ): Promise<IMealEvent> => mealPlanService.editMealEvent(data, ctx),
  editWorkoutEvent: (
    data: IWorkoutEventEditInput,
    ctx: IContext
  ): Promise<IWorkoutEvent> => mealPlanService.editWorkoutEvent(data, ctx),
  findWithinRange: (
    data: IMealPlanRangeInput,
    ctx: IContext
  ): Promise<Array<IMealEvent | IWorkoutEvent>> =>
    mealPlanService.findWithinRange(data, ctx),
};
