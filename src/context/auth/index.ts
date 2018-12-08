import jwt from 'jsonwebtoken'
import pick from 'lodash/pick'
import { LoginInput, SignupInput, IAccount } from 'types/global'

// import { BadRequestError } from '../../library/errors'
// import Mailer from '../../library/mailer'
// import { CONFIRM_EMAIL } from '../../library/mailer/types'
import AccountContext from '../account'
import config from '../../env'

const generateToken = (account: IAccount) => {
  const payload = pick(account.toObject(), ['_id', 'email', 'firstName', 'lastName', 'kind'])
  return jwt.sign(payload, config('jwtSecret'), { expiresIn: '7d' })
}

export const signup = async (data: SignupInput) => {
  const doesAccountExist = await AccountContext.exists(data.input.email)
  if (doesAccountExist) {
    // throw new BadRequestError({ data: { email: 'Email address already exists' } })
  }

  // @TODO if type not in set then throw the error below
  // throw Errors.BadRequestError(400, null, null, { msg: 'Types need to be provided' })

  const account = await AccountContext.create(data)

  // const mailer = new Mailer()
  // const params = {
  //   name: account.firstName,
  //   confirmLink: 'https://wwww.example.com'
  // }
  // mailer.sendEmail(CONFIRM_EMAIL, [account], params)

  const token = generateToken(account)
  return { account, token }
}

export const login = async (data: LoginInput) => {
  const { email, password } = data.input
  
  const account: IAccount = await AccountContext.findForLogin(email)

  if (!account) {
    // throw new BadRequestError({ data: { email: 'Email address does not exist' } })
    return null
  }

  const isPasswordCorrect = await account.comparePassword(password)

  if (!isPasswordCorrect) {
    // throw new BadRequestError({ data: { password: 'This password is incorrect' } })
  }

  const token = generateToken(account)
  return { account, token }
}