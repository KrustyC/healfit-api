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
    owner: async (mealPlanEvent: { owner: IObjectId }): Promise<IAccount> =>
      Account.findBy(mealPlanEvent.owner, '_id'),
    recipes: async (mealEvent: { recipes: IObjectId[] }): Promise<IRecipe[]> =>
      Recipe.findByIds(mealEvent.recipes),
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
    findWithinRange: async (
      _: object,
      input: IMealPlanRangeInput,
      ctx: IContext
    ): Promise<Array<IMealEvent | IWorkoutEvent>> =>
      MealPlan.findWithinRange(input, ctx),
  },
};
