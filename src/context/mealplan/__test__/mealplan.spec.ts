import { expect } from 'chai';
import 'mocha';
import moment from 'moment';
import { IContext } from 'types/global';
import { IMealEventAddInput } from 'types/mealPlan';
import '../../../../tests';
import { fakeRecipe } from '../../../../tests/stub/recipe';

import { Account } from '../../account/schema';
import MealPlanContext from '../index';

describe('Meal Plan Context', () => {
  const user1 = new Account({
    email: 'davide.crestini94@gmail.com',
    firstName: 'Davide',
    lastName: 'Crestini',
    password: '11111111',
    roles: 'ADMIN',
  });
  const recipe1 = fakeRecipe({ createdBy: user1._id });
  const recipe2 = fakeRecipe({ createdBy: user1._id });

  beforeEach(async done => {
    await recipe1.save();
    await recipe2.save();
    await user1.save();
    done();
  });

  it('should create a new MealEvent', async () => {
    const data: IMealEventAddInput = {
      input: {
        endTime: new Date('2018-08-28T12:30:00+05:30'),
        mealType: 'mt-1',
        recipes: [recipe1._id],
        startTime: new Date('2018-08-28T12:30:00+05:30'),
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
    console.log(result);
    expect(result).to.have.property('startTime');
  });
});
