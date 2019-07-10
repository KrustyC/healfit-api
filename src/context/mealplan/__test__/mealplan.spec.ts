import chai, { expect } from 'chai';
import chaiDatetime from 'chai-datetime';
import 'mocha';

import { IContext, IObjectId } from 'types/global';
import {
  IMealEventAddInput,
  IMealEventEditInput,
  IMealPlanRangeInput,
  IWorkoutEventAddInput,
  IWorkoutEventEditInput,
} from 'types/mealPlan';
import '../../../../tests';
import { fakeAccount } from '../../../../tests/stub/account';
import { fakeMealEvent } from '../../../../tests/stub/mealEvent';
import { fakeRecipe } from '../../../../tests/stub/recipe';
import { fakeWorkoutEvent } from '../../../../tests/stub/workoutEvent';

import { Account } from '../../account/schema';
import MealPlanContext from '../index';

chai.use(chaiDatetime);

describe('Meal Plan Context', () => {
  const user1 = fakeAccount({});
  const user2 = fakeAccount({});

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

  const mealEvent5 = fakeMealEvent({
    endTime: new Date('2019-09-28T15:30:00'),
    owner: user2._id,
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
      await user2.save();
      await recipe1.save();
      await recipe2.save();
      await mealEvent1.save();
      await mealEvent2.save();
      await mealEvent3.save();
      await mealEvent4.save();
      await mealEvent5.save();
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

  describe('Meal Event', () => {
    it('should create a new MealEvent', async () => {
      const data: IMealEventAddInput = {
        input: {
          endTime: new Date('2019-08-28T13:30:00'),
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
      expect(result)
        .to.have.property('startTime')
        .to.equalDate(new Date('2019-08-28T12:30:00'));
      expect(result)
        .to.have.property('endTime')
        .to.equalDate(new Date('2019-08-28T13:30:00'));
      expect(result).to.have.property('mealType', 'mt-1');
      expect(result).to.have.property('type', 'MealEvent');
      expect(result.recipes)
        .to.be.an('array')
        .that.include(recipe1._id);
    });

    it('should edit a MealEvent', async () => {
      const data: IMealEventEditInput = {
        input: {
          _id: mealEvent4._id,
          endTime: new Date('2019-11-28T15:30:00'),
          mealType: 'mt-2',
          recipes: [recipe2._id],
          startTime: new Date('2019-11-28T14:30:00'),
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

      const result = await MealPlanContext.editMealEvent(data, ctx);

      expect(result).to.have.property('_id');
      expect(result).to.have.property('owner');
      expect(result)
        .to.have.property('startTime')
        .to.equalDate(new Date('2019-11-28T14:30:00'));
      expect(result)
        .to.have.property('endTime')
        .to.equalDate(new Date('2019-11-28T15:30:00'));
      expect(result).to.have.property('mealType', 'mt-2');
      expect(result).to.have.property('type', 'MealEvent');

      expect(result.recipes).to.be.an('array');

      const recipes = result.recipes.map((id: IObjectId) => id.toString());
      expect(recipes)
        .to.be.an('array')
        .that.include(recipe2._id.toString());

      // Ensure recipe 1 is removed
      expect(recipes)
        .to.be.an('array')
        .that.not.include(recipe1._id.toString());
    });

    it('should reject editing a MealEvent if the owner is not correct', async () => {
      const data: IMealEventEditInput = {
        input: {
          _id: mealEvent2._id,
          endTime: new Date('2019-11-28T15:30:00'),
          mealType: 'mt-2',
          recipes: [recipe2._id],
          startTime: new Date('2019-11-28T14:30:00'),
        },
      };

      const ctx: IContext = {
        user: {
          _id: user2._id,
          email: user2.email,
          firstName: user2.firstName,
          lastName: user2.lastName,
        },
      };

      try {
        await MealPlanContext.editMealEvent(data, ctx);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('Workout Event', () => {
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
      expect(result)
        .to.have.property('startTime')
        .to.equalDate(new Date('2019-08-28T12:30:00'));
      expect(result)
        .to.have.property('endTime')
        .to.equalDate(new Date('2019-08-28T13:30:00'));
      expect(result).to.have.property('type', 'WorkoutEvent');
    });

    it('should edit a WorkoutEvent', async () => {
      const data: IWorkoutEventEditInput = {
        input: {
          _id: workoutEvent1._id,
          endTime: new Date('2019-11-28T15:30:00'),
          startTime: new Date('2019-11-28T14:30:00'),
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

      const result = await MealPlanContext.editWorkoutEvent(data, ctx);

      expect(result).to.have.property('_id');
      expect(result).to.have.property('owner');
      expect(result)
        .to.have.property('startTime')
        .to.equalDate(new Date('2019-11-28T14:30:00'));
      expect(result)
        .to.have.property('endTime')
        .to.equalDate(new Date('2019-11-28T15:30:00'));
      expect(result).to.have.property('type', 'WorkoutEvent');
    });

    it('should reject editing a WorkoutEvent if the owner is not correct', async () => {
      const data: IWorkoutEventEditInput = {
        input: {
          _id: workoutEvent2._id,
          endTime: new Date('2019-08-28T13:30:00'),
          startTime: new Date('2019-08-28T12:30:00'),
        },
      };

      const ctx: IContext = {
        user: {
          _id: user2._id,
          email: user2.email,
          firstName: user2.firstName,
          lastName: user2.lastName,
        },
      };

      try {
        await MealPlanContext.editWorkoutEvent(data, ctx);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  it('should delete an event', async () => {
    const ctx: IContext = {
      user: {
        _id: user1._id,
        email: user1.email,
        firstName: user1.firstName,
        lastName: user1.lastName,
      },
    };

    await MealPlanContext.deleteEvent(mealEvent1._id, ctx);

    const expected = await MealPlanContext.findBy(
      mealEvent1._id.toString(),
      '_id'
    );

    expect(expected).to.be.a('null');
  });

  it('should throw an error when deleting, if the user is not the owner', async () => {
    const ctx: IContext = {
      user: {
        _id: user1._id,
        email: user1.email,
        firstName: user1.firstName,
        lastName: user1.lastName,
      },
    };

    try {
      await MealPlanContext.deleteEvent(mealEvent5._id, ctx);
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});
