import express from 'express';

import engagementRouter from './measures/engagement.routes';

const analyticsRouter = express.Router();

analyticsRouter.use('/engagement', engagementRouter);

export default analyticsRouter;
