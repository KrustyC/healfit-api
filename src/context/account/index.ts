import {
  IAccount,
  IAccountWithPasswordResetToken,
  IAccountWithToken,
  IForgottenPasswordInput,
  IResetPasswordInput,
  ISignupInput,
  IVerifyAccountInput,
} from 'types/account';
import { IContext } from 'types/global';
import AccountService from './service';

const accountService = new AccountService();

export default {
  create: (data: ISignupInput): Promise<IAccountWithToken> =>
    accountService.createAccount(data),
  currentAccountInfo: (context: IContext): Promise<IAccount> =>
    accountService.currentAccountInfo(context),
  emailExists: (email: string) => accountService.emailExists(email),
  findBy: (field: string, fieldName: string): Promise<IAccount> =>
    accountService.findBy(field, fieldName),
  findForLogin: (email: string): Promise<IAccount> =>
    accountService.findForLogin(email),
  forgottenPassword: (
    data: IForgottenPasswordInput
  ): Promise<IAccountWithPasswordResetToken> =>
    accountService.forgottenPassword(data),
  resetPassword: (data: IResetPasswordInput): Promise<boolean> =>
    accountService.resetPassword(data),
  verifyAccount: (data: IVerifyAccountInput): Promise<boolean> =>
    accountService.verifyAccount(data),
};
