import AccountContext, { IAccountContext } from '@context/account';
import { AuthenticationError } from 'apollo-server';
import { IContext, IObjectId } from 'types/global';
import {
  IMealEventAddInput,
  IMealPlanEvent,
  IMealPlanRangeInput,
} from 'types/mealPlan';
import MealPlanRepo from '../repo';

export default class MealPlanService {
  public mealPlanEventRepo: MealPlanRepo;
  public accountContext: IAccountContext;

  constructor() {
    this.mealPlanEventRepo = new MealPlanRepo();
    this.accountContext = AccountContext;
  }

  public async findForUserInRange(
    range: IMealPlanRangeInput,
    ctx: IContext
  ): Promise<IMealPlanEvent> {
    // return this.mealPlanEventRepo;
    return [];
  }

  public async addMealEvent(
    data: IMealEventAddInput,
    ctx: IContext
  ): Promise<boolean> {
    const creator = await this.accountContext.findBy(ctx.user._id, '_id');
    if (!creator) {
      throw new AuthenticationError('Provided user does not exist ');
    }
    return true;
  }
}
