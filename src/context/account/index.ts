import {
  IAccount,
  IAccountWithToken,
  IAccountWithPasswordResetToken,
  SignupInput,
  VerifyAccountInput,
  ForgottenPasswordInput,
  ResetPasswordInput
} from 'types/account';
import AccountService from './service';

const accountService = new AccountService();

export default {
  emailExists: (email: string) => accountService.emailExists(email),
  findBy: (field: string, fieldName: string): Promise<IAccount> =>
    accountService.findBy(field, fieldName),
  findForLogin: (email: string): Promise<IAccount> =>
    accountService.findForLogin(email),
  create: (data: SignupInput): Promise<IAccountWithToken> =>
    accountService.createAccount(data),
  verifyAccount: (data: VerifyAccountInput): Promise<Boolean> =>
    accountService.verifyAccount(data),
  forgottenPassword: (data: ForgottenPasswordInput): Promise<IAccountWithPasswordResetToken> =>
    accountService.forgottenPassword(data),
  resetPassword: (data: ResetPasswordInput): Promise<Boolean> =>
    accountService.resetPassword(data),
};
