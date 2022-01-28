import { NextFunction, Request, Response } from 'express';

import { ICensus } from '../../../interfaces/Census';
import { getCensusByClientService } from '../services/getCensusByClient.service';

export const getCensusByClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { clientName } = req.params;
  try {
    const census: ICensus[] = await getCensusByClientService(clientName);

    return res.status(200).json(census);
  } catch (error) {
    next(error);
  }
  return undefined;
};
