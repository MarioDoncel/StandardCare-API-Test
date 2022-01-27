import express, { Request, Response, NextFunction } from 'express';

import metricsRoutes from './metrics.routes';
import usersRoutes from './users.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello Ryan, server is running! ');
});

routes.use('/metrics', metricsRoutes);
routes.use('/users', usersRoutes);

export default routes;
