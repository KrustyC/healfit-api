import { addDays } from 'date-fns';
import { IAccount, IAccountPasswordResetToken } from 'types/account';
import Repository from 'lib/Repository';
import { AccountPasswordResetToken } from '../schema/accountPasswordResetToken';

export default class AccountRepo extends Repository {
  constructor() {
    super(AccountPasswordResetToken);
  }

  async findForAccount(
    value: string,
    account: IAccount
  ): Promise<IAccountPasswordResetToken | null> {
    const token = await this.findOneBy({
      token: value,
      account,
    });

    if (!token) {
      return null;
    }

    return new AccountPasswordResetToken(token);
  }

  async create(account: IAccount): Promise<IAccountPasswordResetToken> {
    const token = 'NEED TO GENERATE IT RANDOMLY';

    const accountPasswordResetToken = new AccountPasswordResetToken({
      token,
      account,
      expireAt: addDays(new Date(), 1),
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
