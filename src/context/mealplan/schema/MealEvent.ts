import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IMealEvent } from 'types/mealPlan';
import { MealPlanEvent } from './index';

const MealEventSchema = new mongoose.Schema({
  mealType: String, // ('Breakfast', 'Snack', 'Dinner'...) --- Use codes so it cna potentially be translated
  recipes: [], // @TODO This needs to contain, name, id, picture and slug of recipe
});

export const MealEvent: Model<IMealEvent> = MealPlanEvent.discriminator(
  'MealEvent',
  MealEventSchema
);
