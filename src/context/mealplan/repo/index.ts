import Repository from '@lib/Repository';
import { IMealPlanEvent } from 'types/mealPlan';
import { MealPlanEvent } from '../schema';
// import { MealEvent } from '../schema/MealEvent';
// import { WorkoutEvent } from '../schema/WorkoutEvent';

export default class IMealPlanEventRepo extends Repository {
  constructor() {
    super(MealPlanEvent);
  }

  public async createMealEvent() {
    // new MealEvent({})
    return null;
  }

  public async createWorkoutEvent() {
    // new WorkoutEvent({})
    return null;
  }
}
