import _ from 'lodash';
import mongoose, { Model } from 'mongoose';
import { differenceInDays } from 'date-fns';
import { IAccountToken } from 'types/account';

export interface IAccountTokenModel extends IAccountToken {
  isExpired(): Promise<boolean>;
}

const accountVerificationTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    expireAt: { type: String, required: true },
    account: { _id: false, type: 'ObjectId', ref: 'account' },
  },
  { timestamps: true }
);

accountVerificationTokenSchema.methods.isExpired = function() {
  return new Promise(resolve => {
    console.log(differenceInDays(this.expireAt, new Date()));
    if (differenceInDays(this.expireAt, new Date()) <= 0) {
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
