import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from './global';

export interface IMealPlanEvent extends Document {
  _id: IObjectId;
  type: string;
  start: Date;
  end: Date;
  // owner: { _id: false; type: 'ObjectId'; ref: 'account' };
}

export interface IWorkoutEvent extends IMealPlanEvent {
  _id: IObjectId;
  excercises: [];
  workoutType: number;
}

export interface IMealMacro {
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
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
export interface IMealEventEditInput {
  input: {
    _id: IObjectId;
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


export interface IWorkoutEventEditInput {
  input: {
    _id: IObjectId;
    startTime: Date;
    endTime: Date;
  };
}