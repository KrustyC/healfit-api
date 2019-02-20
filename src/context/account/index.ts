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
  emailExists: (email: string): Promise<boolean> =>
    accountService.emailExists(email),
  findBy: (field: any, fieldName: string): Promise<IAccount> =>
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

export interface IAccountContext {
  create: (data: ISignupInput) => Promise<IAccountWithToken>;
  currentAccountInfo: (context: IContext) => Promise<IAccount>;
  emailExists: (email: string) => Promise<boolean>;
  findBy: (field: any, fieldName: string) => Promise<IAccount>;
  findForLogin: (email: string) => Promise<IAccount>;
  forgottenPassword: (
    data: IForgottenPasswordInput
  ) => Promise<IAccountWithPasswordResetToken>;
  resetPassword: (data: IResetPasswordInput) => Promise<boolean>;
  verifyAccount: (data: IVerifyAccountInput) => Promise<boolean>;
}
