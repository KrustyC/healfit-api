import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from './global';

export interface IMealPlanEvent extends Document {
  _id: IObjectId;
  type: number;
  start: Date;
  end: Date;
  // owner: { _id: false; type: 'ObjectId'; ref: 'account' };
}

export interface IWorkoutEvent extends IMealPlanEvent {
  _id: IObjectId;
  excercises: [];
  workoutType: number;
}

export interface IMealEvent extends IMealPlanEvent {
  _id: IObjectId;
  recipes: [];
  mealType: number;
}

export interface IMealPlanRangeInput {
  input: {
    startDay: Date;
    endDay: Date;
  }
}

export interface IMealEventAddInput {
  input: {
    startTime: Date;
    endTime: Date;
    recipes: [IObjectId];
    mealType: string;
  };
}

export interface IWorkoutEventAddInput {
  input: {
    startTime: Date;
    endTime: Date;
  };
}
