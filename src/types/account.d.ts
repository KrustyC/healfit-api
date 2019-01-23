import mongoose, { Document, Model, Schema } from 'mongoose';
import { IObjectId } from 'types/global';

export interface IAccount extends Document {
  _id: IObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  kind: string;
  isAdmin: boolean;
  comparePassword: (cadidatePassword: string) => Promise<boolean>;
  isAccountConfirmed: () => Promise<boolean>;
}

export interface IAccountToken extends Document {
  _id: IObjectId;
  token: string;
  account: IObjectId;
  isExpired: () => Promise<boolean>;
}

export interface IAccountPasswordResetToken extends Document {
  _id: IObjectId;
  token: string;
  account: IObjectId;
  isExpired: () => Promise<boolean>;
}

export interface IAccountWithToken {
  account: IAccount;
  token: IAccountToken;
}

export interface IAccountWithPasswordResetToken {
  account: IAccount;
  token: IAccountPasswordResetToken;
}

export interface ILoginInput {
  input: {
    email: string;
    password: string;
  };
}

export interface ILoginOutput {
  account: IAccount;
  token: string;
}

export interface ISignupInput {
  input: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    type: number;
  };
}

export interface IVerifyAccountInput {
  input: {
    email: string;
    token: string;
  };
}

export interface IForgottenPasswordInput {
  input: {
    email: string;
  };
}

export interface IResetPasswordInput {
  input: {
    token: string;
    password: string;
  };
}
