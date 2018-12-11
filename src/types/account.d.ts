import mongoose, { Schema, Document, Model } from 'mongoose';
import { ObjectId } from 'types/global'

export interface LoginInput {
  input: {
    email: string;
    password: string;
  };
}

export interface SignupInput {
  input: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    type: Number;
  };
}

export interface IAccount extends Document {
  _id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  kind: string;
  comparePassword: Function;
  isAccountConfirmed: Function;
}
