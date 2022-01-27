import express from 'express';

import engagementRouter from './metrics/engagement.routes';

const metricsRoutes = express.Router();

metricsRoutes.use('/engagement', engagementRouter);

export default metricsRoutes;
