import Repository from '@lib/Repository';
import crypto from 'crypto';
import { addDays } from 'date-fns';
import { IAccount, IAccountPasswordResetToken } from 'types/account';
import { AccountPasswordResetToken } from '../schema/accountPasswordResetToken';

export default class AccountRepo extends Repository {
  constructor() {
    super(AccountPasswordResetToken);
  }

  public async findByTokenValue(
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

  public async create(account: IAccount): Promise<IAccountPasswordResetToken> {
    const token = crypto.randomBytes(32).toString('hex');

    const accountPasswordResetToken = new AccountPasswordResetToken({
      account,
      expiredAt: addDays(new Date(), 2),
      token,
    });
    return accountPasswordResetToken.save();
  }

  public async invalidate(token: IAccountPasswordResetToken): Promise<boolean> {
    return !!(await this.update(
      {
        _id: token._id,
      },
      {
        $set: { expiredAt: new Date() }, // Immedaitely expire the token so it can't be re used again
      }
    ));
  }
}
