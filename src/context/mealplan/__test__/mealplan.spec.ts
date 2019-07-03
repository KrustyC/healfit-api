import { expect } from 'chai';
import 'mocha';
import moment from 'moment';
import mongoose from 'mongoose';
import { IContext } from 'types/global';
import { IMealEventAddInput, IWorkoutEventAddInput } from 'types/mealPlan';
import '../../../../tests';
import { fakeAccount } from '../../../../tests/stub/account';
import { fakeRecipe } from '../../../../tests/stub/recipe';

import { Account } from '../../account/schema';
import MealPlanContext from '../index';

describe('Meal Plan Context', () => {
  const user1 = fakeAccount({
    // _id: new mongoose.mongo.ObjectID('5d1c935b0a13de0022030159'),
  });

  const recipe1 = fakeRecipe({ createdBy: user1._id });
  const recipe2 = fakeRecipe({ createdBy: user1._id });

  before(async () => {
    try {
      await user1.save();
      await recipe1.save();
      await recipe2.save();
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('Error here', e);
    }
  });

  it('should find all events within a given range of dates', async () => {
    const data: IWorkoutEventAddInput = {
      input: {
        endTime: new Date('2018-08-28T12:30:00+05:30'),
        startTime: new Date('2018-08-28T12:30:00+06:30'),
      },
    };

    const ctx: IContext = {
      user: {
        _id: user1._id,
        email: user1.email,
        firstName: user1.firstName,
        lastName: user1.lastName,
      },
    };

    const result = await MealPlanContext.addWorkoutEvent(data, ctx);

    expect(result).to.have.property('_id');
    expect(result).to.have.property('owner');
    expect(result).to.have.property('startTime', 21600);
    expect(result).to.have.property('endTime', 25200);
    expect(result).to.have.property('type', 'WorkoutEvent');
  });

  it('should create a new MealEvent', async () => {
    const data: IMealEventAddInput = {
      input: {
        endTime: new Date('2018-08-28T12:30:00+05:30'),
        mealType: 'mt-1',
        recipes: [recipe1._id],
        startTime: new Date('2018-08-28T12:30:00+06:30'),
      },
    };

    const ctx: IContext = {
      user: {
        _id: user1._id,
        email: user1.email,
        firstName: user1.firstName,
        lastName: user1.lastName,
      },
    };

    const result = await MealPlanContext.addMealEvent(data, ctx);

    expect(result).to.have.property('_id');
    expect(result).to.have.property('owner');
    expect(result).to.have.property('startTime', 21600);
    expect(result).to.have.property('endTime', 25200);
    expect(result).to.have.property('mealType', 'mt-1');
    expect(result).to.have.property('type', 'MealEvent');
    expect(result.recipes)
      .to.be.an('array')
      .that.include(recipe1._id);
  });

  it('should create a new WorkoutEvent', async () => {
    const data: IWorkoutEventAddInput = {
      input: {
        endTime: new Date('2018-08-28T12:30:00+05:30'),
        startTime: new Date('2018-08-28T12:30:00+06:30'),
      },
    };

    const ctx: IContext = {
      user: {
        _id: user1._id,
        email: user1.email,
        firstName: user1.firstName,
        lastName: user1.lastName,
      },
    };

    const result = await MealPlanContext.addWorkoutEvent(data, ctx);

    expect(result).to.have.property('_id');
    expect(result).to.have.property('owner');
    expect(result).to.have.property('startTime', 21600);
    expect(result).to.have.property('endTime', 25200);
    expect(result).to.have.property('type', 'WorkoutEvent');
  });
});
