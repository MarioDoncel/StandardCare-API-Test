import express, { Request, Response, NextFunction } from 'express';

import { getEngagementController } from '../../useCases/metrics/controllers/getEngagement.controller';
import { updateEngagementController } from '../../useCases/metrics/controllers/updateEngagement.controller';

const engagementRouter = express.Router();

engagementRouter.get('/', getEngagementController);

engagementRouter.put('/', updateEngagementController);

export default engagementRouter;
