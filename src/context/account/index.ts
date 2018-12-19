import {
  IAccount,
  IAccountWithToken,
  SignupInput,
  VerifyAccountInput,
  ForgottenPasswordInput,
  ResetPasswordInput
} from 'types/account';
import AccountService from './service';

const accountService = new AccountService();

export default {
  emailExists: (email: string) => accountService.emailExists(email),
  findForLogin: (email: string): Promise<IAccount> =>
    accountService.findForLogin(email),
  create: (data: SignupInput): Promise<IAccountWithToken> =>
    accountService.createAccount(data),
  verifyAccount: (data: VerifyAccountInput): Promise<Boolean> =>
    accountService.verifyAccount(data),
  forgottenPassword: (data: ForgottenPasswordInput): Promise<Boolean> =>
    accountService.forgottenPassword(data),
  resetPassword: (data: ResetPasswordInput): Promise<Boolean> =>
    accountService.resetPassword(data),
};
