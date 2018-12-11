import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';
import { LoginInput, SignupInput, IAccount } from 'types/account';

// import { BadRequestError } from '../../library/errors'
// import Mailer from '../../library/mailer'
// import { CONFIRM_EMAIL } from '../../library/mailer/types'
import AccountContext from '../account';
import config from '../../env';

const generateToken = (account: IAccount) => {
  const payload = pick(account.toObject(), [
    '_id',
    'email',
    'firstName',
    'lastName',
    'kind',
  ]);
  return jwt.sign(payload, config('jwtSecret'), { expiresIn: '7d' });
};

export const signup = async (data: SignupInput) => {
  const doesAccountExist = await AccountContext.exists(data.input.email);
  if (doesAccountExist) {
    throw new Error('Email address already exists');
  }

  const account = await AccountContext.create(data);

  // const mailer = new Mailer()
  // const params = {
  //   name: account.firstName,
  //   confirmLink: 'https://wwww.example.com'
  // }
  // mailer.sendEmail(CONFIRM_EMAIL, [account], params)

  const token = generateToken(account);
  return { account, token };
};

export const login = async (data: LoginInput) => {
  const { email, password } = data.input;

  const account = await AccountContext.findForLogin(email);

  if (!account) {
    throw new Error('Email address does not exist');
  }

  if (!(await account.isAccountConfirmed())) {
    throw new Error('Email address has not been cofnirmed yet');
  }

  if (!(await account.comparePassword(password))) {
    throw new Error('Incorrect password, please try again');
  }

  const token = generateToken(account);
  return { account, token };
};
