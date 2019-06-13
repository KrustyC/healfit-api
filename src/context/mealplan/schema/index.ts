import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IMealPlanEvent } from 'types/mealPlan';

/**
 * date is equal to timestampStart / 86400
 * date is equal to timestampStart % 86400
 * date is equal to timestampEnd % 86400
 */

const MealPlanEventSchema = new mongoose.Schema(
  {
    // date only represent tha actuale day without time
    date: Number,
    // endTime is an integer representing the hour of the day where the event terminates
    endTime: Number,
    owner: { _id: false, type: 'ObjectId', ref: 'account' },
    // startTime is an integer representing the hour of the day where the event terminates
    startTime: Number,
  },
  { discriminatorKey: 'type', timestamps: true }
);

// @TODO @TODO @TODO @TODO @TODO @TODO @TODO @TODO @
// @                                               @
// @----ADD TEST----ADD TEST----ADD TEST----ADD TES@
// @                                               @
// @TODO @TODO @TODO @TODO @TODO @TODO @TODO @TODO @

// MealPlanEventSchema.index({ name: 'text' });

export const MealPlanEvent: Model<IMealPlanEvent> = mongoose.model<
  IMealPlanEvent
>('MealPlanEvent', MealPlanEventSchema);

const MealPlanSchema = new mongoose.Schema({ recipes: [], mealType: Number });
