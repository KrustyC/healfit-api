import faker from 'faker';
import _ from 'lodash';
import mongoose from 'mongoose';
import { IAccount } from '../../src/types/account';
import { IObjectId } from '../../src/types/global';

import { Account } from '../../src/context/account/schema';

const { ObjectId: MongooseObjectId } = mongoose.mongo;

interface IAccountData {
  _id?: IObjectId;
  accountConfirmedAt?: Date;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  roles?: string;
}

export function fakeAccount(data: IAccountData): IAccount {
  return new Account({
    _id: data._id ? new MongooseObjectId(data._id) : new MongooseObjectId(),
    accountConfirmedAt: data.accountConfirmedAt || new Date(),
    email: data.email || faker.internet.email(),
    firstName: data.firstName || faker.name.firstName(),
    lastName: data.lastName || faker.name.lastName(),
    password: data.password || faker.internet.password(),
    roles: data.password || 'USER',
  });
}
