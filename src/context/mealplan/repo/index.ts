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
    const { date, startTime, endTime } = this.getFormattedDates(
      data.input.startTime,
      data.input.endTime
    );

    const mealEventData = {
      date,
      endTime,
      mealType: data.input.mealType,
      owner: user._id,
      recipes: data.input.recipes,
      startTime,
    };

    const recipe = new MealEvent(mealEventData);
    return recipe.save();
  }

  public async createWorkoutEvent(
    data: IWorkoutEventAddInput,
    user: IAccount
  ): Promise<IWorkoutEvent> {
    const { date, startTime, endTime } = this.getFormattedDates(
      data.input.startTime,
      data.input.endTime
    );

    const workoutEventData = {
      date,
      endTime,
      owner: user._id,
      startTime,
    };

    const recipe = new WorkoutEvent(workoutEventData);
    return recipe.save();
  }

  private getFormattedDates(startDate: Date, endDate: Date) {
    const date = moment(startDate).unix() / 86400;
    const startTime = moment(startDate).unix() % 86400;
    const endTime = moment(endDate).unix() % 86400;

    return {
      date,
      endTime,
      startTime,
    };
  }
}
