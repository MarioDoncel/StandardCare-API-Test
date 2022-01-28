import { NextFunction, Request, Response } from 'express';

import { IMetrics } from '../../../interfaces/Metrics';
import { updateEngagementService } from '../services/updateEngagement.service';

export const updateEngagementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IMetrics | undefined> => {
  const engagement: number = req.body;
  const { vendorName } = res.locals; // I assume the vendor name comes from an authentication middleware, because in the documentation is described as get YOUR current metrics.

  try {
    const updatedMetrics: IMetrics = await updateEngagementService(
      vendorName,
      engagement
    );

    res.status(200).json(updatedMetrics);
  } catch (error) {
    next(error);
  }
  return undefined;
};
