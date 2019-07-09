import Account from '@context/account';
import MealPlan from '@context/mealplan';
import Recipe from '@context/recipe';
import { IContext, IObjectId } from 'types/global';
import {
  IMealEvent,
  IMealEventAddInput,
  IMealPlanRangeInput,
  IWorkoutEvent,
  IWorkoutEventAddInput,
} from 'types/mealPlan';

import { IRecipe } from 'types/recipe';

import { IAccount } from 'types/account';

export default {
  MealEvent: {
    recipes: async (mealEvent: { recipes: IObjectId[] }): Promise<IRecipe[]> =>
      Recipe.findByIds(mealEvent.recipes),
  },
  MealPlanEvent: {
    __resolveType(obj: any) {
      if (obj.type === 'MealEvent') {
        return 'MealEvent';
      }

      if (obj.type === 'WorkoutEvent') {
        return 'WorkoutEvent';
      }

      return null;
    },
    owner: async (mealPlanEvent: { owner: IObjectId }): Promise<IAccount> =>
      Account.findBy(mealPlanEvent.owner, '_id'),
  },
  Mutation: {
    addMealEvent: async (
      _: object,
      data: IMealEventAddInput,
      ctx: IContext
    ): Promise<IMealEvent> => MealPlan.addMealEvent(data, ctx),
    addWorkoutEvent: async (
      _: object,
      data: IWorkoutEventAddInput,
      ctx: IContext
    ): Promise<IWorkoutEvent> => MealPlan.addWorkoutEvent(data, ctx),
  },
  Query: {
    mealPlanEvents: async (
      _: object,
      input: IMealPlanRangeInput,
      ctx: IContext
    ): Promise<Array<IMealEvent | IWorkoutEvent>> =>
      MealPlan.findWithinRange(input, ctx),
  },
};
