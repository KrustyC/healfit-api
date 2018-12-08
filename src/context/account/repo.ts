import toLower from 'lodash/toLower';
import { SignupInput, IAccount } from 'types/global'
import Repository from '../../lib/Repository';
import { Account } from './schema';

export default class AccountRepo extends Repository {
  constructor() {
    super(Account);
  }

  async exists(email: string): Promise<boolean> {
    const account = await this.findOneBy({ email: toLower(email) })
    return !!account
  }

  async findForLogin(email: string): Promise<IAccount> {
    const account = await this.findOneBy({ email: toLower(email) })
    if (!account) {
      throw Error()
    }
    return new Account(account)
  }

  async create(data: SignupInput): Promise<IAccount> {
    const { firstName, lastName, email, password, type } = data.input
    let kind = null

    // @TOTO Create a dict to map type to kind
    if (type === 1) {
      kind = 'User'
    }

    // if (type === 2) {
    //   kind = 'Nutritionist'
    // }

    // if (type === 3) {
    //   kind = 'PersonalTrainer'
    // }

    const account = new Account({ firstName, lastName, email, password, kind })
    return account.save()
  }
}
