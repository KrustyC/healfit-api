import { differenceInDays } from 'date-fns';
import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IAccountPasswordResetToken } from 'types/account';

export interface IAccountPasswordResetTokenModel
  extends IAccountPasswordResetToken {
  isExpired(): Promise<boolean>;
}

const accountPasswordResetTokenSchema = new mongoose.Schema(
  {
    account: { _id: false, type: 'ObjectId', ref: 'account' },
    expiredAt: { type: String, required: true },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

accountPasswordResetTokenSchema.methods.isExpired = function() {
  return new Promise(resolve => {
    if (differenceInDays(this.expiredAt, new Date()) <= 0) {
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
