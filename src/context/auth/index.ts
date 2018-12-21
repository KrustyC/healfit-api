import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import config from 'config';
import { LoginInput, LoginOutput, SignupInput, IAccount, ForgottenPasswordInput, IAccountWithPasswordResetToken } from 'types/account';
import Mailer from 'lib/mailer'
import { CONFIRM_EMAIL, RESET_PASSWORD_EMAIL } from 'lib/mailer/templates'

import AccountContext from '../account';

export default class Auth {
  mailer: Mailer

  constructor() {
    this.mailer = new Mailer()
  }

  async signup(data: SignupInput): Promise<IAccount> {
    const doesAccountExist = await AccountContext.emailExists(data.input.email);

    if (doesAccountExist) {
      throw new Error('Email address already exists');
    }

    const { token, account } = await AccountContext.create(data);

    // Send the email with the token
    const params = {
      name: account.firstName,
      confirmLink: `${config('appUrl')}/auth/verify-account?token=${token.token}&email=${account.email}`
    }
    this.mailer.sendEmail(CONFIRM_EMAIL, [account], params)

    return account;
  }

  async login(data: LoginInput): Promise<LoginOutput> {
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

    const token = this._generateToken(account);
    return { account, token };
  }

  async forgottenPassword(data: ForgottenPasswordInput): Promise<Boolean> {
    const { account, token } = await AccountContext.forgottenPassword(data);

    if (!account || !token) {
      throw new Error('Something went wrong!')
    }
    // Send email with token and shit
    const params = {
      name: account.firstName,
      resetPasswordLink: `${config('appUrl')}/auth/reset-password?token=${token.token}&email=${account.email}`
    }
    this.mailer.sendEmail(RESET_PASSWORD_EMAIL, [account], params)

    return true
  }

  _generateToken = (account: IAccount): string => {
    const payload = pick(account.toObject(), [
      '_id',
      'email',
      'firstName',
      'lastName',
      'kind',
    ]);
    return jwt.sign(payload, config('jwtSecret'), { expiresIn: '7d' });
  };
}
