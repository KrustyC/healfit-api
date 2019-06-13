import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IWorkoutEvent } from 'types/mealPlan';
import { MealPlanEvent } from './index';

const WorkoutSchema = new mongoose.Schema({
  excercises: [],
  workoutType: Number, // ('Cardio', 'Weight Lifting', 'Sport'...) --- Use codes so it can potentially be translated
});

export const WorkoutEvent: Model<IWorkoutEvent> = MealPlanEvent.discriminator(
  'WorkoutPlanEvent',
  WorkoutSchema
);
