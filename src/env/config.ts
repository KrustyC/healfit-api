import dotenv from 'dotenv'

dotenv.config();

export const env = process.env.ENVIRONMENT;

// App Configuration
export const API_PORT = process.env.API_PORT;
export const JWT_SECRET = process.env.JWT_SECRET;

// Database Configuration
export const dbConfig = {
  connectionString: process.env.DB_CONNECTION_STRING || null,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
};
