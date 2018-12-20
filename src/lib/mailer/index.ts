import _ from 'lodash'
import request from 'request'

import config from 'config'
import * as emailTemplates from './templates';

interface Recipient {
  email: string;
}

interface Options {
  method: string;
  url: string;
  headers: Object;
  json: Boolean;
}

export default class Mailer {
  options: Options
  sender: string

  constructor() {
    this.options = {
      method: 'POST',
      url: 'https://api.sendinblue.com/v3/smtp/email',
      headers: {
        'api-key': config('sendInBlue.apiKey')
      },
      json: true
    }
    this.sender = config('sendInBlue.sender')
  }

  getRecipients(recipients: Array<Object>) {
    if (config('env') === 'development') {
      return [{ email: config('sendInBlue.recipientCatchAll') }]
    }
    return _.map(recipients, ({ email }: Recipient) => ({ email }))
  }

  getEmailInfo(emailTemplate: string, params: any) {
    switch (emailTemplate) {
      case emailTemplates.CONFIRM_EMAIL:
        return {
          templateId: 1,
          params: {
            NAME: params.name,
            CONFIRM_LINK: params.confirmLink
          }
        }
      case emailTemplates.RESET_PASSWORD_EMAIL:
        return {
          templateId: 5,
          params: {
            NAME: params.name,
            RESET_PASSWORD_LINK: params.resetPasswordLink
          }
        }
      default:
        throw new Error('Email type does not exists!')
    }
  }

  sendEmail(emailTemplate: string, recipients: Array<Object>, params: Object) {
    const emailInfo = this.getEmailInfo(emailTemplate, params)

    const options = {
      ...this.options,
      body: {
        sender: { email: this.sender },
        to: this.getRecipients(recipients),
        ...emailInfo
      }
    }

    request(options, (error: any) => {
      if (error) {
        throw new Error(error)
      }
      console.log('Email sent')
    })
  }
}