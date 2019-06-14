import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from './global';

export interface IMealPlanEvent extends Document {
  _id: IObjectId;
  type: number;
  start: number; // probably this should just come out as start (date + startTime)
  end: number;
  // owner: { _id: false; type: 'ObjectId'; ref: 'account' };
}

export interface IWorkoutEvent extends Document {
  _id: IObjectId;
  excercises: [];
  workoutType: number;
}

export interface IMealEvent extends Document {
  _id: IObjectId;
  recipes: [];
  mealType: number;
}

export interface IMealPlanRangeInput extends Document {
  input: {
    startDay: Date;
    endDay: Date;
  }
}

export interface IMealEventAddInput extends Document {
  input: {
    startTime: string;
    endTime: string;
    recipes: [IObjectId];
    mealType: number;
  };
}
