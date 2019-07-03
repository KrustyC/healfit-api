import { expect } from 'chai';
import 'mocha';
import moment from 'moment';
import mongoose from 'mongoose';
import { IContext } from 'types/global';
import {
  IMealEventAddInput,
  IMealPlanRangeInput,
  IWorkoutEventAddInput,
} from 'types/mealPlan';
import '../../../../tests';
import { fakeAccount } from '../../../../tests/stub/account';
import { fakeMealEvent } from '../../../../tests/stub/mealEvent';
import { fakeRecipe } from '../../../../tests/stub/recipe';
import { fakeWorkoutEvent } from '../../../../tests/stub/workoutEvent';

import { Account } from '../../account/schema';
import MealPlanContext from '../index';

describe('Meal Plan Context', () => {
  const user1 = fakeAccount({
    // _id: new mongoose.mongo.ObjectID('5d1c935b0a13de0022030159'),
  });

  const recipe1 = fakeRecipe({ createdBy: user1._id });
  const recipe2 = fakeRecipe({ createdBy: user1._id });

  const mealEvent1 = fakeMealEvent({
    endTime: new Date('2019-08-28T13:30:00'),
    owner: user1._id,
    startTime: new Date('2019-08-28T12:30:00'),
  });
  const mealEvent2 = fakeMealEvent({
    endTime: new Date('2019-08-29T13:30:00'),
    owner: user1._id,
    startTime: new Date('2019-08-29T12:30:00'),
  });
  const mealEvent3 = fakeMealEvent({
    endTime: new Date('2019-08-30T13:30:00'),
    owner: user1._id,
    startTime: new Date('2019-08-30T12:30:00'),
  });
  const mealEvent4 = fakeMealEvent({
    endTime: new Date('2019-09-28T15:30:00'),
    owner: user1._id,
    startTime: new Date('2019-08-28T13:30:00'),
  });

  const workoutEvent1 = fakeWorkoutEvent({
    endTime: new Date('2019-08-28T15:30:00'),
    owner: user1._id,
    startTime: new Date('2019-08-28T13:30:00'),
  });

  const workoutEvent2 = fakeWorkoutEvent({
    endTime: new Date('2019-09-28T14:30:00'),
    owner: user1._id,
    startTime: new Date('2019-09-28T12:30:00'),
  });

  before(async () => {
    try {
      await user1.save();
      await recipe1.save();
      await recipe2.save();
      await mealEvent1.save();
      await mealEvent2.save();
      await mealEvent3.save();
      await mealEvent4.save();
      await workoutEvent1.save();
      await workoutEvent2.save();
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('Error here', e);
    }
  });

  it('should find all events within a given range of dates', async () => {
    const data: IMealPlanRangeInput = {
      input: {
        endDay: new Date('2019-08-30'),
        startDay: new Date('2019-08-24'),
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

    const events = await MealPlanContext.findWithinRange(data, ctx);

    expect(events).to.be.an('array');
    expect(events).to.have.lengthOf(4);
    const eventIds = events.map(({ _id }) => _id.toString());

    expect(eventIds).to.include(mealEvent1._id.toString());
    expect(eventIds).to.include(mealEvent2._id.toString());
    expect(eventIds).to.include(mealEvent3._id.toString());
    expect(eventIds).to.include(workoutEvent1._id.toString());

    expect(eventIds).to.not.include(mealEvent4._id.toString());
    expect(eventIds).to.not.include(workoutEvent2._id.toString());
  });

  it('should create a new MealEvent', async () => {
    const data: IMealEventAddInput = {
      input: {
        endTime: new Date('2019-08-28T12:30:00'),
        mealType: 'mt-1',
        recipes: [recipe1._id],
        startTime: new Date('2019-08-28T12:30:00'),
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
        endTime: new Date('2019-08-28T13:30:00'),
        startTime: new Date('2019-08-28T12:30:00'),
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
    // expect(result).to.have.property('startTime', 21600);
    // expect(result).to.have.property('endTime', 25200);
    expect(result).to.have.property('type', 'WorkoutEvent');
  });
});
