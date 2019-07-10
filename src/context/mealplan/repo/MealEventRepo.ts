import Repository from '@lib/Repository';
import { IAccount } from 'types/account';

import {
  IMealEvent,
  IMealEventAddInput,
  IMealEventEditInput,
} from 'types/mealPlan';
import { MealEvent } from '../schema/MealEvent';

export default class IMealEventRepo extends Repository {
  constructor() {
    super(MealEvent);
  }

  public async create(
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

    const mealEvent = new MealEvent(mealEventData);
    return mealEvent.save();
  }

  public async edit(data: IMealEventEditInput): Promise<IMealEvent> {
    const query = { _id: data.input._id };
    const set = {
      endTime: data.input.endTime,
      mealType: data.input.mealType,
      recipes: data.input.recipes,
      startTime: data.input.startTime,
      timezoneOffset: data.input.startTime.getTimezoneOffset(),
    };

    return this.findOneAndUpdate(query, set);
  }
}
