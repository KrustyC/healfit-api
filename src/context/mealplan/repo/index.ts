import Repository from '@lib/Repository';
import moment from 'moment';
import { IAccount } from 'types/account';
import { IMealEventAddInput, IMealPlanEvent } from 'types/mealPlan';
import { MealPlanEvent } from '../schema';
import { MealEvent } from '../schema/MealEvent';

// import { WorkoutEvent } from '../schema/WorkoutEvent';

export default class IMealPlanEventRepo extends Repository {
  constructor() {
    super(MealPlanEvent);
  }

  public async createMealEvent(data: IMealEventAddInput, user: IAccount) {
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

  public async createWorkoutEvent() {
    // new WorkoutEvent({})
    return null;
  }

  private getFormattedDates(startDate: string, endDate: string) {
    const date =
      moment(startDate)
        .utc()
        .format('X') / 86400;

    const startTime =
      moment(startDate)
        .utc()
        .format('X') % 86400;

    const endTime =
      moment(endDate)
        .utc()
        .format('X') % 86400;

    return {
      date,
      endTime,
      startTime,
    };
  }
}
