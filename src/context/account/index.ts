import {
  IAccount,
  IAccountWithToken,
  SignupInput,
  VerifyAccountInput,
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
};
