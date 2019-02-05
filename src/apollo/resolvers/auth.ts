import {
  IForgottenPasswordInput,
  ILoginInput,
  IResetPasswordInput,
  ISignupInput,
  IVerifyAccountInput,
} from 'types/account';

import Account from '@context/account';
import Auth from '@context/auth';
import { authenticatedOnly } from '@helpers/auth';

const auth = new Auth();

const currentUserInfo = async (
  _: object,
  __: object,
  context: { user: object }
) => {
  // @TODO This object should be an account of some sort
  return { user: context.user };
};

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
    currentUserInfo: authenticatedOnly(currentUserInfo),
  },
};
