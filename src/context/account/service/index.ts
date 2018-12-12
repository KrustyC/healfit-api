import {
  SignupInput,
  IAccountWithToken,
  IAccount,
  VerifyAccountInput,
} from 'types/account';
import AccountRepo from '../repo';
import AccountVerificationTokenRepo from '../repo/accountVerificationTokenRepo';

export default class AccountService {
  accountRepo: AccountRepo;
  accountVerificationTokenRepo: AccountVerificationTokenRepo;

  constructor() {
    this.accountRepo = new AccountRepo();
    this.accountVerificationTokenRepo = new AccountVerificationTokenRepo();
  }

  async findForLogin(email: string): Promise<IAccount> {
    return this.accountRepo.findForLogin(email);
  }

  async emailExists(email: string): Promise<boolean> {
    return this.accountRepo.exists(email);
  }

  async createAccount(data: SignupInput): Promise<IAccountWithToken> {
    if (await this.accountRepo.exists(data.input.email)) {
      throw new Error('An account with this email already exists');
    }
    const account = await this.accountRepo.create(data);
    const token = await this.accountVerificationTokenRepo.create(account);

    return {
      account,
      token,
    };
  }

  async verifyAccount(data: VerifyAccountInput): Promise<Boolean> {
    const account = await this.accountRepo.findOneBy({
      email: data.input.email,
    });

    const token = await this.accountVerificationTokenRepo.findForAccount(
      data.input.token,
      account
    );

    if (!token) {
      throw new Error('The provided token does not exist!');
    }

    if (await token.isExpired()) {
      throw new Error('The provided token is expired!');
    }

    // If here then the token exists and is valid so we invalidate and terminate
    const verifyResult = await this.accountRepo.verify(account);
    if (!verifyResult) {
      throw new Error(
        'Sorry, we could not verify your accoun! Please try again later!'
      );
    }

    const invalidateResult = await this.accountVerificationTokenRepo.invalidate(
      token
    );

    if (!invalidateResult) {
      throw new Error(
        'Sorry, we could not verify your accoun! Please try again later!'
      );
    }

    return true;
  }
}
