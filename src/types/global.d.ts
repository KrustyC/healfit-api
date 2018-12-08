import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ObjectId extends mongoose.Types.ObjectId {
  // nothing here
}

export interface LoginInput {
  input: {
    email: string
    password: string
  }
}

export interface SignupInput {
  input: {
    email: string
    firstName: string
    lastName: string
    password: string
    type: Number
  }
}

export interface IAccount extends Document {
  _id: ObjectId
  email: string
  firstName: string
  lastName: string
  password: string
  kind: string
  comparePassword: Function
}

