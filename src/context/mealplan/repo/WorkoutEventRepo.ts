import Repository from '@lib/Repository';
import { IAccount } from 'types/account';

import {
  IWorkoutEvent,
  IWorkoutEventAddInput,
  IWorkoutEventEditInput,
} from 'types/mealPlan';
import { MealPlanEvent } from '../schema';
import { WorkoutEvent } from '../schema/WorkoutEvent';

export default class IWorkoutPlanEventRepo extends Repository {
  constructor() {
    super(MealPlanEvent);
  }

  public async create(
    data: IWorkoutEventAddInput,
    user: IAccount
  ): Promise<IWorkoutEvent> {
    const workoutEventData = {
      endTime: data.input.endTime,
      owner: user._id,
      startTime: data.input.startTime,
      timezoneOffset: data.input.startTime.getTimezoneOffset(),
    };

    const workoutEvent = new WorkoutEvent(workoutEventData);
    return workoutEvent.save();
  }

  public async edit(data: IWorkoutEventEditInput): Promise<IWorkoutEvent> {
    const query = { _id: data.input._id };
    const set = {
      endTime: data.input.endTime,
      startTime: data.input.startTime,
      timezoneOffset: data.input.startTime.getTimezoneOffset(),
    };

    return this.findOneAndUpdate(query, set);
  }
}
