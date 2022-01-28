import { NextFunction, Request, Response } from 'express';

import { ICensus } from '../../../interfaces/Census';
import { receiveCensusService } from '../services/receiveCensus.service';

export const receiveCensusController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  // i didn't understand if the census users comes from a client or from a vendor.
  const clientCensus: ICensus[] = req.body;

  try {
    await receiveCensusService(clientCensus);

    return res.status(201).send('Success');
  } catch (error) {
    next(error);
    return undefined;
  }
};
