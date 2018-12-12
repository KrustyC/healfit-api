import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import config from 'config';
import { LoginInput, LoginOutput, SignupInput, IAccount } from 'types/account';

// import Mailer from 'mailer'
// import { CONFIRM_EMAIL } from '../../library/mailer/types'
import AccountContext from '../account';

export default class Auth {
  async signup(data: SignupInput): Promise<IAccount> {
    const doesAccountExist = await AccountContext.emailExists(data.input.email);

    if (doesAccountExist) {
      throw new Error('Email address already exists');
    }

    const { token, account } = await AccountContext.create(data);

    // Send the email with the token
    // const mailer = new Mailer()
    // const params = {
    //   name: account.firstName,
    //   confirmLink: `${config('appUrl)}/confirm-email?email={account.email}&token=${token.token}`
    // }
    // mailer.sendEmail(CONFIRM_EMAIL, [account], params)

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
