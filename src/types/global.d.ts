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
    _id: IObjectId
  }
}