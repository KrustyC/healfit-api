import AccountContext, { IAccountContext } from '@context/account';
import RecipeContext, { IRecipeContext } from '@context/recipe';
import { AuthenticationError } from 'apollo-server';
import { IContext, IObjectId } from 'types/global';
import {
  IMealEvent,
  IMealEventAddInput,
  IMealEventEditInput,
  IMealMacro,
  IMealPlanEvent,
  IMealPlanRangeInput,
  IWorkoutEvent,
  IWorkoutEventAddInput,
  IWorkoutEventEditInput,
} from 'types/mealPlan';
import MealPlanRepo from '../repo';
import MealEventRepo from '../repo/MealEventRepo';
import WorkoutEventRepo from '../repo/WorkoutEventRepo';

export default class MealPlanService {
  public mealPlanEventRepo: MealPlanRepo;
  public mealEventRepo: MealEventRepo;
  public workoutEventRepo: WorkoutEventRepo;
  public accountContext: IAccountContext;
  public recipeContext: IRecipeContext;

  constructor() {
    this.mealPlanEventRepo = new MealPlanRepo();
    this.mealEventRepo = new MealEventRepo();
    this.workoutEventRepo = new WorkoutEventRepo();
    this.accountContext = AccountContext;
    this.recipeContext = RecipeContext;
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
      throw new AuthenticationError('Provided user does not exist');
    }

    return this.mealEventRepo.create(data, creator);
  }

  public async editMealEvent(
    data: IMealEventEditInput,
    ctx: IContext
  ): Promise<IMealEvent> {
    const event = await this.mealEventRepo.findOneBy({
      _id: data.input._id,
      owner: ctx.user._id,
    });

    if (!event) {
      throw new Error('Provided event does not exist');
    }

    return this.mealEventRepo.edit(data);
  }

  public async addWorkoutEvent(
    data: IWorkoutEventAddInput,
    ctx: IContext
  ): Promise<IWorkoutEvent> {
    const creator = await this.accountContext.findBy(ctx.user._id, '_id');

    if (!creator) {
      throw new AuthenticationError('Provided user does not exist');
    }

    const created = await this.workoutEventRepo.create(data, creator);

    return created;
  }

  public async editWorkoutEvent(
    data: IWorkoutEventEditInput,
    ctx: IContext
  ): Promise<IWorkoutEvent> {
    const event = await this.workoutEventRepo.findOneBy({
      _id: data.input._id,
      owner: ctx.user._id,
    });

    if (!event) {
      throw new Error('Provided event does not exist');
    }

    return this.workoutEventRepo.edit(data);
  }

  public async deleteEvent(id: IObjectId, ctx: IContext): Promise<boolean> {
    const event = await this.mealPlanEventRepo.findOneBy({
      _id: id,
      owner: ctx.user._id,
    });

    if (!event) {
      throw new Error('Provided event does not exist');
    }

    await this.mealPlanEventRepo.hardDelete({ _id: id });

    return true;
  }

  public async findBy(field: string, fieldName: string) {
    return this.mealPlanEventRepo.findOneBy({ [fieldName]: field });
  }

  public async getMealMacros(mealId: IObjectId): Promise<IMealMacro> {
    const event = await this.mealPlanEventRepo.findById(mealId);
    const recipes = await this.recipeContext.findByIds(event.recipes);

    const macros: IMealMacro = recipes.reduce(
      (acc, recipe) => ({
        calories: acc.calories + recipe.calories,
        carbs: acc.carbs + recipe.carbohydrates,
        fat: acc.fat + recipe.fat,
        protein: acc.protein + recipe.protein,
      }),
      { calories: 0, carbs: 0, fat: 0, protein: 0 }
    );

    return macros;
  }
}
