import express, { Request, Response, NextFunction } from 'express';

import { MetricsModel } from '../../Database/model/Metrics';
import { IMetrics } from '../../interfaces/Metrics';
import { getEngagementController } from '../../useCases/metrics/controllers/getEngagement.controller';

const engagementRouter = express.Router();

engagementRouter.get('/', getEngagementController);

engagementRouter.put(
  '/',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<IMetrics | undefined> => {
    const engagement: number = req.body;
    const { vendorName } = res.locals; // I assume the vendor name comes from an authentication middleware.

    try {
      const updatedMetrics = await MetricsModel.findOneAndUpdate(
        { vendorName },
        { engagement, updateDate: Date.now() },
        {
          new: true,
          upsert: true,
        }
      );

      res.status(200).json(updatedMetrics);
    } catch (error) {
      next(error);
    }
    return undefined;
  }
);

export default engagementRouter;
