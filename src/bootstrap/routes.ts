import { Router, Request, Response } from 'express';
import path from 'path';

import * as AppController from '../controllers/AppController';

export default () => {
  const api = Router();

  api.get('/', (_: Request, res: Response) => {
    res.status(200).send('Hello world!');
  });

  api.get('/welcome', AppController.welcome);

  return api;
};
