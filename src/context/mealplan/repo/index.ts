import Repository from '@lib/Repository';
import moment from 'moment';
import { IAccount } from 'types/account';
import { ITimezonedDate } from 'types/global';

import {
  IMealEvent,
  IMealEventAddInput,
  IMealPlanEvent,
  IWorkoutEvent,
  IWorkoutEventAddInput,
} from 'types/mealPlan';
import { MealPlanEvent } from '../schema';
import { MealEvent } from '../schema/MealEvent';
import { WorkoutEvent } from '../schema/WorkoutEvent';

export default class IMealPlanEventRepo extends Repository {
  constructor() {
    super(MealPlanEvent);
  }

  public async createMealEvent(
    data: IMealEventAddInput,
    user: IAccount
  ): Promise<IMealEvent> {
    const mealEventData = {
      endTime: data.input.endTime,
      mealType: data.input.mealType,
      owner: user._id,
      recipes: data.input.recipes,
      startTime: data.input.startTime,
      timezoneOffset: data.input.startTime.getTimezoneOffset(),
    };

    const recipe = new MealEvent(mealEventData);
    return recipe.save();
  }

  public async createWorkoutEvent(
    data: IWorkoutEventAddInput,
    user: IAccount
  ): Promise<IWorkoutEvent> {
    const workoutEventData = {
      endTime: data.input.endTime,
      owner: user._id,
      startTime: data.input.startTime,
      timezoneOffset: data.input.startTime.getTimezoneOffset(),
    };

    const recipe = new WorkoutEvent(workoutEventData);
    return recipe.save();
  }
}
