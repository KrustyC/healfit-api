import mongoose, { Schema, Document, Model } from 'mongoose';
import { ObjectId } from 'types/global';

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

export interface IAccountToken extends Document {
  _id: ObjectId;
  token: string;
  account: ObjectId;
  isExpired: Function;
}

export interface IAccountPasswordResetToken extends Document {
  _id: ObjectId;
  token: string;
  user: ObjectId;
  isExpired: Function;
}

export interface IAccountWithToken {
  account: IAccount;
  token: IAccountToken;
}

export interface IAccountWithPasswordResetToken {
  account: IAccount;
  token: IAccountPasswordResetToken;
}

export interface LoginInput {
  input: {
    email: string;
    password: string;
  };
}

export interface LoginOutput {
  account: IAccount;
  token: string;
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

export interface VerifyAccountInput {
  input: {
    email: string;
    token: string;
  };
}

export interface ForgottenPasswordInput {
  input: {
    email: string;
  };
}

export interface ResetPasswordInput {
  input: {
    email: string;
    token: string;
    newPassword: string;
  };
}
