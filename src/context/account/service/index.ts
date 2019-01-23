import {
  IAccount,
  IAccountWithPasswordResetToken,
  IAccountWithToken,
  IForgottenPasswordInput,
  IResetPasswordInput,
  ISignupInput,
  IVerifyAccountInput,
} from 'types/account';
import AccountRepo from '../repo';
import AccountVerificationTokenRepo from '../repo/accountVerificationTokenRepo';
import PasswordResetTokenRepo from '../repo/passwordResetTokenRepo';

export default class AccountService {
  public accountRepo: AccountRepo;
  public accountVerificationTokenRepo: AccountVerificationTokenRepo;
  public passwordResetTokenRepo: PasswordResetTokenRepo;

  constructor() {
    this.accountRepo = new AccountRepo();
    this.accountVerificationTokenRepo = new AccountVerificationTokenRepo();
    this.passwordResetTokenRepo = new PasswordResetTokenRepo();
  }

  public async findBy(field: string, fieldName: string) {
    return this.accountRepo.findOneBy({ [fieldName]: field });
  }

  public async findForLogin(email: string): Promise<IAccount> {
    return this.accountRepo.findForLogin(email);
  }

  public async emailExists(email: string): Promise<boolean> {
    return this.accountRepo.exists(email);
  }

  public async createAccount(data: ISignupInput): Promise<IAccountWithToken> {
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

  public async verifyAccount(data: IVerifyAccountInput): Promise<boolean> {
    const token = await this.accountVerificationTokenRepo.findByTokenValue(
      data.input.token
    );

    if (!token) {
      throw new Error('The provided is invalid!');
    }

    if (await token.isExpired()) {
      throw new Error('The provided token is expired!');
    }

    const account = await this.accountRepo.findById(token.account);

    const verifyResult = await this.accountRepo.verify(account);
    if (!verifyResult) {
      throw new Error(
        'Sorry, we could not verify your account! Please try again later!'
      );
    }

    const invalidateResult = await this.accountVerificationTokenRepo.invalidate(
      token
    );

    if (!invalidateResult) {
      throw new Error(
        'Sorry, we could not verify your account! Please try again later!'
      );
    }

    return true;
  }

  public async forgottenPassword(
    data: IForgottenPasswordInput
  ): Promise<IAccountWithPasswordResetToken> {
    const {
      input: { email },
    } = data;
    const account = await this.accountRepo.findOneBy({ email });
    const token = await this.passwordResetTokenRepo.create(account);

    return {
      account,
      token,
    };
  }

  public async resetPassword(data: IResetPasswordInput): Promise<boolean> {
    const token = await this.passwordResetTokenRepo.findByTokenValue(
      data.input.token
    );

    if (!token) {
      throw new Error('The provided token does not exist!');
    }

    if (await token.isExpired()) {
      throw new Error('The provided token is expired!');
    }

    const account = await this.accountRepo.findById(token.account);

    const passwordResetResult = await this.accountRepo.resetPassword(
      account,
      data.input.password
    );

    if (!passwordResetResult) {
      throw new Error(
        'Sorry, we could not reset your password! Please try again later!'
      );
    }

    const invalidateResult = await this.passwordResetTokenRepo.invalidate(
      token
    );

    if (!invalidateResult) {
      throw new Error(
        'Sorry, we could not reset your password! Please try again later!'
      );
    }

    return true;
  }
}
