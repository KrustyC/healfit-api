import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { differenceInDays } from 'date-fns';
import { IAccountPasswordResetToken } from 'types/account';

export interface IAccountPasswordResetTokenModel extends IAccountPasswordResetToken {
  isExpired(): Promise<boolean>;
}

const accountPasswordResetTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    expireAt: { type: String, required: true },
    account: { _id: false, type: 'ObjectId', ref: 'account' },
  },
  { timestamps: true }
);

accountPasswordResetTokenSchema.methods.isExpired = function() {
  return new Promise(resolve => {
    console.log(differenceInDays(this.expireAt, new Date()));
    if (differenceInDays(this.expireAt, new Date()) <= 0) {
      return resolve(true);
    }
    return resolve(false);
  });
};

export const AccountPasswordResetToken: Model<
  IAccountPasswordResetTokenModel
> = mongoose.model<IAccountPasswordResetTokenModel>(
  'AccountPasswordResetToken',
  accountPasswordResetTokenSchema
);
