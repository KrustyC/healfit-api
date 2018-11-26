import { Request, Response } from 'express';

import AppContext from 'context/app';

export function welcome(_: Request, res: Response) {
  res.status(200).send(AppContext.welcome());
}
