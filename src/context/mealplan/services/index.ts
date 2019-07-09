import AccountContext, { IAccountContext } from '@context/account';
import { AuthenticationError } from 'apollo-server';
import moment from 'moment';
import { IContext, IObjectId } from 'types/global';
import {
  IMealEvent,
  IMealEventAddInput,
  IMealEventEditInput,
  IMealPlanEvent,
  IMealPlanRangeInput,
  IWorkoutEvent,
  IWorkoutEventAddInput,
  IWorkoutEventEditInput,
} from 'types/mealPlan';
import MealPlanRepo from '../repo';

export default class MealPlanService {
  public mealPlanEventRepo: MealPlanRepo;
  public accountContext: IAccountContext;

  constructor() {
    this.mealPlanEventRepo = new MealPlanRepo();
    this.accountContext = AccountContext;
  }

  public async findWithinRange(
    range: IMealPlanRangeInput,
    ctx: IContext
  ): Promise<[IMealEvent | IWorkoutEvent]> {
    const { startDay, endDay } = range.input;

    const startRange = new Date(
      startDay.getFullYear(),
      startDay.getMonth(),
      startDay.getDate(),
      1,
      0,
      0
    );

    const endRange = new Date(
      endDay.getFullYear(),
      endDay.getMonth(),
      endDay.getDate() + 1,
      0,
      59,
      59
    );

    const query = {
      endTime: {
        $lte: endRange,
      },
      owner: ctx.user._id,
      startTime: {
        $gte: startRange,
      },
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

  public async editMealEvent(
    data: IMealEventEditInput,
    ctx: IContext
  ): Promise<IMealEvent> {
    const event = await this.mealPlanEventRepo.findBy({
      _id: data.input._id,
      owner: ctx.user._id,
    });

    if (!event) {
      throw new Error('Provided evenet does not exist ');
    }

    return event;
  }

  public async addWorkoutEvent(
    data: IWorkoutEventAddInput,
    ctx: IContext
  ): Promise<IWorkoutEvent> {
    const creator = await this.accountContext.findBy(ctx.user._id, '_id');

    if (!creator) {
      throw new AuthenticationError('Provided user does not exist ');
    }

    const created = await this.mealPlanEventRepo.createWorkoutEvent(
      data,
      creator
    );

    return created;
  }

  public async editWorkoutEvent(
    data: IWorkoutEventEditInput,
    ctx: IContext
  ): Promise<IWorkoutEvent> {
    const event = await this.mealPlanEventRepo.findBy({
      _id: data.input._id,
      owner: ctx.user._id,
    });

    if (!event) {
      throw new Error('Provided event does not exist');
    }

    return event;
  }

  public async deleteEvent(id: IObjectId, ctx: IContext): Promise<boolean> {
    const event = await this.mealPlanEventRepo.findBy({
      _id: id,
      owner: ctx.user._id,
    });

    if (!event) {
      throw new Error('Provided event does not exist ');
    }

    return event;
  }
}
