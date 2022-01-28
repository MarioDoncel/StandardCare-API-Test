import { NextFunction, Response, Request } from 'express';

import DatabaseError from '../../../errors/DatabaseError';
import { IMetrics } from '../../../interfaces/Metrics';
import { getMetricsService } from '../services/getMetrics.service';

export const getEngagementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IMetrics | undefined> => {
  const { vendorName } = res.locals; // I assume the vendor name comes from an authentication middleware, because in the documentation is described as get YOUR current metrics.
  try {
    const metrics: IMetrics = await getMetricsService(vendorName);
    const { engagement } = metrics;

    res.status(200).json(engagement);
  } catch (error) {
    next(error);
  }

  return undefined;
};
