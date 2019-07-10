import Repository from '@lib/Repository';
import { IAccount } from 'types/account';

import {
  IMealEvent,
  IMealEventAddInput,
  IMealEventEditInput,
  IWorkoutEvent,
  IWorkoutEventAddInput,
  IWorkoutEventEditInput,
} from 'types/mealPlan';
import { MealPlanEvent } from '../schema';
import { MealEvent } from '../schema/MealEvent';
import { WorkoutEvent } from '../schema/WorkoutEvent';

export default class IMealPlanEventRepo extends Repository {
  constructor() {
    super(MealPlanEvent);
  }
}
