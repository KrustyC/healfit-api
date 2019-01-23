import Repository from '@lib/Repository';
import bcrypt from 'bcrypt-nodejs';
import toLower from 'lodash/toLower';
import { IAccount, ISignupInput } from 'types/account';
import { Account } from '../schema';

export default class AccountRepo extends Repository {
  constructor() {
    super(Account);
  }

  public async exists(email: string): Promise<boolean> {
    const account = await this.findOneBy({ email: toLower(email) });
    return !!account;
  }

  public async findForLogin(email: string): Promise<IAccount> {
    const account = await this.findOneBy({ email: toLower(email) });

    if (!account) {
      throw new Error('Invalid email!');
    }

    return new Account(account);
  }

  public async create(data: ISignupInput): Promise<IAccount> {
    const { firstName, lastName, email, password, type } = data.input;
    let kind = null;

    // @TOTO Create a dict to map type to kind
    if (type === 1) {
      kind = 'User';
    }

    // if (type === 2) {
    //   kind = 'Nutritionist'
    // }

    // if (type === 3) {
    //   kind = 'PersonalTrainer'
    // }

    const account = new Account({ firstName, lastName, email, password, kind });
    return account.save();
  }

  public async verify(account: IAccount): Promise<boolean> {
    return !!this.findOneAndUpdate(
      {
        _id: account._id,
      },
      {
        $set: { accountConfirmedAt: new Date() },
      }
    );
  }

  public async resetPassword(
    account: IAccount,
    newPassword: string
  ): Promise<boolean> {
    return !!this.findOneAndUpdate(
      {
        _id: account._id,
      },
      {
        $set: {
          password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(12)),
        },
      }
    );
  }
}
