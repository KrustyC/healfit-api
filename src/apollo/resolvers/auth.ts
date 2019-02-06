import {
  IForgottenPasswordInput,
  ILoginInput,
  IResetPasswordInput,
  ISignupInput,
  IVerifyAccountInput,
} from 'types/account';
import { IContext } from 'types/global';

import Account from '@context/account';
import Auth from '@context/auth';

const auth = new Auth();

export default {
  Mutation: {
    forgottenPassword: async (_: object, data: IForgottenPasswordInput) =>
      auth.forgottenPassword(data),
    login: async (_: object, data: ILoginInput) => auth.login(data),
    resetPassword: async (_: object, data: IResetPasswordInput) =>
      Account.resetPassword(data),
    signup: async (_: object, data: ISignupInput) => auth.signup(data),
    verifyAccount: async (_: object, data: IVerifyAccountInput) =>
      Account.verifyAccount(data),
  },
  Query: {
    currentAccountInfo: (_: any, __: any, context: IContext) =>
      Account.currentAccountInfo(context),
  },
};
