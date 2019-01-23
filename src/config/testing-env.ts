export const env = 'testing';

export const API_PORT = '3050';
export const jwtSecret = 'a-aws-secret';

export const tmpFolder = '/tmp';

export const dbConfig = {
  connectionString: null,
  name: 'musotest',
  pass: '',
  user: '',
};

// App Configurationexport const API_PORT = process.env.API_PORT;
export const appUrl = process.env.APP_URL;

export const apolloConfig = {
  engine: {
    apiKey: '',
  },
};

// Send In Blue Configuration
export const sendInBlue = {
  apiKey: '',
  recipientCatchAll: '',
  sender: '',
};
