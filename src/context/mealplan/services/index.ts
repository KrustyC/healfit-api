import { ILimitSkipInput, IObjectId } from 'types/global';
import { IMealPlanEvent } from 'types/mealPlan';
import MealPlanRepo from '../repo';

export default class MealPlanService {
  public mealPlanEventRepo: MealPlanRepo;

  constructor() {
    this.mealPlanEventRepo = new MealPlanRepo();
  }
}
