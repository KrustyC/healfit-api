import { differenceInDays } from 'date-fns';
import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { IAccountToken } from 'types/account';

export interface IAccountTokenModel extends IAccountToken {
  isExpired(): Promise<boolean>;
}

const accountVerificationTokenSchema = new mongoose.Schema(
  {
    account: { _id: false, type: 'ObjectId', ref: 'account' },
    expiredAt: { type: String, required: true },
    token: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

accountVerificationTokenSchema.methods.isExpired = function() {
  return new Promise(resolve => {
    if (differenceInDays(this.expiredAt, new Date()) <= 0) {
      return resolve(true);
    }
    return resolve(false);
  });
};

export const AccountVerificationToken: Model<
  IAccountTokenModel
> = mongoose.model<IAccountTokenModel>(
  'AccountVerificationToken',
  accountVerificationTokenSchema
);
