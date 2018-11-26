import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import connectToDb from './dbconnection';
import router from './routes';

const app = express();

// initialise middleware
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ type: '*/*', limit: '50mb' }));

// SERVER SETUP
// ====================================================================================
app.use('/', router());

// eslint-disable-next-line
const server = http.createServer(app);

export function startAPI(config: any) {
  connectToDb(config);

  const instance = process.env.NODE_APP_INSTANCE || '0';
  const port = parseInt(config('API_PORT'), 10) + parseInt(instance, 10);

  server.listen(port);

  console.log('Server listening on: ', port);
}

export const api = app;
