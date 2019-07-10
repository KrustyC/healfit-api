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
    endTime: { type: Date, required: true },
    owner: { _id: false, type: 'ObjectId', ref: 'account' },
    startTime: { type: Date, required: true },
    timezoneOffset: Number,
  },
  {
    discriminatorKey: 'type',
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// MealPlanEventSchema.index({ name: 'text' });

MealPlanEventSchema.virtual('start').get(function() {
  return new Date(this.startTime.getTime() - this.timezoneOffset * 60000);
});

MealPlanEventSchema.virtual('end').get(function() {
  return new Date(this.endTime.getTime() - this.timezoneOffset * 60000);
});

export const MealPlanEvent: Model<IMealPlanEvent> = mongoose.model<
  IMealPlanEvent
>('MealPlanEvent', MealPlanEventSchema);
