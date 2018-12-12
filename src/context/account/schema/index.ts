import _ from 'lodash';
import bcrypt from 'bcrypt-nodejs';
import mongoose, { Model } from 'mongoose';
import { IAccount } from 'types/account';

const options = { discriminatorKey: 'kind', timestamps: true };

export interface IAccountModel extends IAccount {
  comparePassword(): Promise<boolean>;
}

const accountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    accountConfirmedAt: Date,
  },
  options
);

accountSchema.pre<IAccountModel>('save', function(next) {
  const account = this;
  account.password = bcrypt.hashSync(account.password, bcrypt.genSaltSync(12));
  account.email = account.email.toLowerCase();
  next();
});

accountSchema.methods.comparePassword = function(candidatePassword: string) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(
      candidatePassword,
      this.password,
      (err: object, isMatch: boolean) => {
        if (err) {
          return reject();
        }
        return resolve(isMatch);
      }
    )
  );
};

accountSchema.methods.isAccountConfirmed = function() {
  return new Promise(resolve => {
    if (
      _.isNull(this.accountConfirmedAt) ||
      _.isUndefined(this.accountConfirmedAt)
    ) {
      return resolve(false);
    }
    return resolve(true);
  });
};

export const Account: Model<IAccountModel> = mongoose.model<IAccountModel>(
  'Account',
  accountSchema
);
