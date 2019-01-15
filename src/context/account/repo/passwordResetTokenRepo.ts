import { addDays } from 'date-fns';
import crypto from 'crypto';
import { IAccount, IAccountPasswordResetToken } from 'types/account';
import Repository from 'lib/Repository';
import { AccountPasswordResetToken } from '../schema/accountPasswordResetToken';

export default class AccountRepo extends Repository {
  constructor() {
    super(AccountPasswordResetToken);
  }

  async findByTokenValue(
    value: string
  ): Promise<IAccountPasswordResetToken | null> {
    const token = await this.findOneBy({
      token: value,
    });

    if (!token) {
      return null;
    }

    return new AccountPasswordResetToken(token);
  }

  async create(account: IAccount): Promise<IAccountPasswordResetToken> {
    const token = crypto.randomBytes(32).toString('hex');

    const accountPasswordResetToken = new AccountPasswordResetToken({
      token,
      account,
      expireAt: addDays(new Date(), 2),
    });
    return accountPasswordResetToken.save();
  }

  async invalidate(token: IAccountPasswordResetToken): Promise<boolean> {
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
