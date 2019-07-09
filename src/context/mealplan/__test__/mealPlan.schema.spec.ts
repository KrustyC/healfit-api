import { expect } from 'chai';
import 'mocha';
import moment from 'moment';
import '../../../../tests';
import { MealEvent } from '../schema/MealEvent';

describe('Meal Plan Schema', () => {
  it('should create a new MealEvent', async () => {
    const date = moment().unix() / 86400;

    const startTime = moment().unix() % 86400;
    const endTime = moment().unix() % 86400;

    const mealEvent = new MealEvent({
      date,
      endTime,
      mealType: 'mt-1',
      recipes: [],
      startTime,
    });

    const result = await mealEvent.save();
    expect(result).to.have.property('startTime');
  });
});
