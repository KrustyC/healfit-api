import _ from 'lodash'
import bcrypt from 'bcrypt-nodejs'
import mongoose, { Schema, Model } from 'mongoose'
import { IAccount } from 'types/global'

const options = { discriminatorKey: 'kind', timestamps: true }

export interface IAccountModel extends IAccount {
  comparePassword(): Promise<boolean>
}

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  updatedAt: Date,
  createdAt: Date
}, options)

accountSchema.pre<IAccountModel>('save', function (next) {
  const account = this
  account.password = bcrypt.hashSync(account.password, bcrypt.genSaltSync(12))
  account.email = account.email.toLowerCase()
  next()
})

accountSchema.methods.comparePassword = function(candidatePassword: string) {
  return new Promise((resolve, reject) => (
    bcrypt.compare(candidatePassword, this.password, (err: object, isMatch: boolean) => {
      if (err) {
        return reject()
      }
      return resolve(isMatch)
    })
  ))
}

accountSchema.pre<IAccountModel>('update', function (next) {
  const account = this
  const data = {}

  if (account.isModified('password')) {
    _.set(data, 'password', bcrypt.hashSync(account.password, bcrypt.genSaltSync(12)))
  }

  if (account.isModified('email')) {
    _.set(data, 'email', account.email.toLowerCase())
  }

  next()
})

export const Account: Model<IAccountModel> = mongoose.model<IAccountModel>('Account', accountSchema);
