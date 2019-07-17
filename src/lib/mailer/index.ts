import _ from 'lodash';
import request from 'request';

import config from 'config';
import * as emailTemplates from './templates';

interface IRecipient {
  email: string;
}

interface IOptions {
  method: string;
  url: string;
  headers: object;
  json: boolean;
}

export default class Mailer {
  public options: IOptions;
  public sender: string;
  public name: string;

  constructor() {
    this.options = {
      headers: {
        'api-key': config('sendInBlue.apiKey'),
      },
      json: true,
      method: 'POST',
      url: 'https://api.sendinblue.com/v3/smtp/email',
    };
    this.name = 'Healfit Team';
    this.sender = config('sendInBlue.sender');
  }

  public getRecipients(recipients: object[]) {
    if (config('env') === 'development') {
      return [{ email: config('sendInBlue.recipientCatchAll') }];
    }
    return _.map(recipients, ({ email }: IRecipient) => ({ email }));
  }

  public getEmailInfo(emailTemplate: string, params: any) {
    switch (emailTemplate) {
      case emailTemplates.CONFIRM_EMAIL:
        return {
          params: {
            CONFIRM_LINK: params.confirmLink,
            NAME: params.name,
          },
          templateId: 1,
        };
      case emailTemplates.RESET_PASSWORD_EMAIL:
        return {
          params: {
            NAME: params.name,
            RESET_PASSWORD_LINK: params.resetPasswordLink,
          },
          templateId: 6,
        };
      default:
        throw new Error('Email type does not exists!');
    }
  }

  public sendEmail(
    emailTemplate: string,
    recipients: object[],
    params: object
  ) {
    const emailInfo = this.getEmailInfo(emailTemplate, params);

    const options = {
      ...this.options,
      body: {
        sender: { email: this.sender },
        to: this.getRecipients(recipients),
        ...emailInfo,
      },
    };

    request(options, (error: any) => {
      if (error) {
        throw new Error(error);
      }
    });
  }
}
