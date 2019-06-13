import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IMealEvent } from 'types/mealPlan';
import { MealPlanEvent } from './index';

const MealEventSchema = new mongoose.Schema({
  mealType: Number, // ('Breakfast', 'Snack', 'Dinner'...) --- Use codes so it cna potentially be translated
  recipes: [],
});

export const MealEvent: Model<IMealEvent> = MealPlanEvent.discriminator(
  'MealPlanEvent',
  MealEventSchema
);
