import { NextFunction, Request, Response } from 'express';

import AppError from '../../../errors/AppError';
import { ICensus } from '../../../interfaces/Census';
import { parseCSVToCensus } from '../../../utils/parseCSVtoCensus';
import { receiveCensusService } from '../services/receiveCensus.service';

export const receiveCensusController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  // i didn't understand if the census users comes from a client or from a vendor.
  const { file } = req;
  const { clientName } = req.body;
  if (file) {
    try {
      const clientCensus: ICensus[] = await parseCSVToCensus(file, clientName);

      await receiveCensusService(clientCensus);

      return res.status(201).send('Success');
    } catch (error) {
      next(error);
      return undefined;
    }
  }
  throw new AppError('File not uploaded', '', 400);
};
