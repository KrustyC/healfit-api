import AccountContext, { IAccountContext } from '@context/account';
import { AuthenticationError } from 'apollo-server';
import moment from 'moment';
import { IContext, IObjectId } from 'types/global';
import {
  IMealEvent,
  IMealEventAddInput,
  IMealPlanEvent,
  IMealPlanRangeInput,
  IWorkoutEvent,
  IWorkoutEventAddInput,
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
    const startDate = moment(range.input.startDay).unix() / 86400;
    const endDate = moment(range.input.endDay).unix() / 86400;

    const query = {
      day: {
        $gte: startDate,
        $lt: endDate,
      },
      owner: ctx.user._id,
    };

    return this.mealPlanEventRepo.findBy(query);
  }

  public async addMealEvent(
    data: IMealEventAddInput,
    ctx: IContext
  ): Promise<IMealEvent> {
    const creator = await this.accountContext.findBy(ctx.user._id, '_id');

    if (!creator) {
      throw new AuthenticationError('Provided user does not exist ');
    }

    return this.mealPlanEventRepo.createMealEvent(data, creator);
  }

  public async addWorkoutEvent(
    data: IWorkoutEventAddInput,
    ctx: IContext
  ): Promise<IWorkoutEvent> {
    const creator = await this.accountContext.findBy(ctx.user._id, '_id');

    if (!creator) {
      throw new AuthenticationError('Provided user does not exist ');
    }

    return this.mealPlanEventRepo.createWorkoutEvent(data, creator);
  }
}
