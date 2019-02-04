import Mailer from '@lib/mailer';
import { CONFIRM_EMAIL, RESET_PASSWORD_EMAIL } from '@lib/mailer/templates';
import config from 'config';
import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import {
  IAccount,
  IAccountWithPasswordResetToken,
  IForgottenPasswordInput,
  ILoginInput,
  ILoginOutput,
  ISignupInput,
} from 'types/account';

import AccountContext from '../account';

export default class Auth {
  public mailer: Mailer;

  constructor() {
    this.mailer = new Mailer();
  }

  public async signup(data: ISignupInput): Promise<IAccount> {
    console.log('Here', data);
    const doesAccountExist = await AccountContext.emailExists(data.input.email);

    if (doesAccountExist) {
      throw new Error('Email address already exists');
    }

    const { token, account } = await AccountContext.create(data);

    // Send the email with the token
    const params = {
      confirmLink: `${config('appUrl')}/auth/verify-account?token=${
        token.token
      }`,
      name: account.firstName,
    };
    this.mailer.sendEmail(CONFIRM_EMAIL, [account], params);

    return account;
  }

  public async login(data: ILoginInput): Promise<ILoginOutput> {
    const { email, password } = data.input;

    const account = await AccountContext.findForLogin(email);

    if (!account) {
      throw new Error('Email address does not exist');
    }

    if (!(await account.isAccountConfirmed())) {
      throw new Error('Email address has not been confirmed yet');
    }

    if (!(await account.comparePassword(password))) {
      throw new Error('Incorrect password, please try again');
    }

    const token = this.generateToken(account);
    return { account, token };
  }

  public async forgottenPassword(
    data: IForgottenPasswordInput
  ): Promise<boolean> {
    const { account, token } = await AccountContext.forgottenPassword(data);

    if (!account) {
      return false;
    }

    const params = {
      name: account.firstName,
      resetPasswordLink: `${config('appUrl')}/auth/reset-password?token=${
        token.token
      }`,
    };

    // Send email with token and shit
    this.mailer.sendEmail(RESET_PASSWORD_EMAIL, [account], params);

    return true;
  }

  public generateToken = (account: IAccount): string => {
    const payload = pick(account.toObject(), [
      '_id',
      'email',
      'firstName',
      'lastName',
      'roles',
      'kind',
    ]);
    return jwt.sign(payload, config('jwtSecret'), { expiresIn: '7d' });
  };
}
