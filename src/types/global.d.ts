import mongoose, { Document, Model, Schema } from 'mongoose';

// tslint:disable-next-line
export interface IObjectId extends mongoose.Types.ObjectId {
  // nothing here
}

export interface ILimitSkipInput {
  limit: number;
  skip: number;
}

export interface IContext {
  user: {
    _id: IObjectId;
    email: string;
    firstName: string;
    lastName: string;
  }
}

export interface ITimezonedDate {
  date: number; // it's a timestamp
  timezone: string;
}
