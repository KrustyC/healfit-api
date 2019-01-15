import { getTime, addDays } from 'date-fns';
import { IAccount, IAccountToken } from 'types/account';
import crypto from 'crypto';

import Repository from 'lib/Repository';
import { AccountVerificationToken } from '../schema/accountVerificationToken';

export default class AccountRepo extends Repository {
  constructor() {
    super(AccountVerificationToken);
  }

  async findByTokenValue(value: string): Promise<IAccountToken | null> {
    const token = await this.findOneBy({
      token: value,
    });

    if (!token) {
      return null;
    }

    return new AccountVerificationToken(token);
  }

  async create(account: IAccount): Promise<IAccountToken> {
    const token = crypto.randomBytes(32).toString('hex');

    const accountVerificationToken = new AccountVerificationToken({
      token,
      account,
      expireAt: addDays(new Date(), 7),
    });
    return accountVerificationToken.save();
  }

  async invalidate(token: IAccountToken): Promise<boolean> {
    return !!(await this.update(
      {
        _id: token._id,
      },
      {
        $set: { expireAt: new Date() }, // Immedaitely expire the token so it can't be re used again
      }
    ));
  }
}
