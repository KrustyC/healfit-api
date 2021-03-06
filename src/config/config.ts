import dotenv from 'dotenv';

dotenv.config();

export const env = process.env.ENVIRONMENT;

// App Configuration
export const API_PORT = process.env.API_PORT;
export const appUrl = process.env.APP_URL;
export const jwtSecret = process.env.JWT_SECRET;

// Database Configuration
export const dbConfig = {
  connectionString: process.env.DB_CONNECTION_STRING || null,
  name: process.env.DB_NAME,
  pass: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
};

export const apolloConfig = {
  engine: {
    apiKey: process.env.APOLLO_ENGINE_API_KEY,
  },
};

// Send In Blue Configuration
export const sendInBlue = {
  apiKey: process.env.SENDINBLUE_API_KEY,
  recipientCatchAll: process.env.RECIPIENT_CATCH_ALL,
  sender: process.env.EMAIL_SENDER,
};
